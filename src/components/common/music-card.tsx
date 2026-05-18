import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Music, Play, Pause, RotateCcw, Loader2 } from "lucide-react";
import { useIsMobile } from "@/components/hooks/use-mobile";

/* ─── Types ─────────────────────────────────────────────────── */
interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  duration: string;
}

interface LyricLine {
  time: number;  // seconds
  text: string;
}

/* ─── Constants ─────────────────────────────────────────────── */
const PLAYLIST_ID   = '5kOmwbcTJZKsKng0LPqejg';
const SPOTIFY_TOKEN = 'BQAaB_mRPbDgI0_L65tQUDzs99c6JeJ46woSuSfRn08B7DeJ7ttQsrwK1SNnEIuiRKR0RVQD8mUg4PuC3pFbGU7CHTZuYLpOFRAcXJtKoBI8xjiY_O_n0sCiUQ-7DvpJzoQ-ELRM2SYRWUHZFtnqyIJ9vnugnMMroMsfDBeVJvjonQswmo_KUMYSRpLkQvum-VD1tIoxDB9dhBHQ43LRcTX3tDaZfamu0rbC1zg9Npz5zn-Ew8u_gYGiMNwpSn-_cA13e0FhOAzPrGlB6GgRr0QyDiVAcmjdSTeFXlrvsD4OlEljMFm-yvr1dFjkaVL3xigODQ';

/* ─── LRC Parser ─────────────────────────────────────────────── */
function parseLRC(lrc: string): LyricLine[] {
  const lines: LyricLine[] = [];
  const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
  for (const line of lrc.split('\n')) {
    const m = line.match(regex);
    if (m) {
      const t = parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3]) / (m[3].length === 2 ? 100 : 1000);
      const text = m[4].trim();
      if (text) lines.push({ time: t, text });
    }
  }
  return lines.sort((a, b) => a.time - b.time);
}

/* ─── Component ─────────────────────────────────────────────── */
export default function MusicCard() {
  // Playlist tracks from Spotify API
  const [playlistTracks, setPlaylistTracks]         = useState<SpotifyTrack[]>([]);
  const [playlistLoading, setPlaylistLoading]       = useState(true);
  const [playlistError, setPlaylistError]           = useState(false);

  // Selected track & lyrics
  const [selectedIdx, setSelectedIdx]     = useState(0);
  const [lyricLines, setLyricLines]       = useState<LyricLine[]>([]);
  const [plainLyrics, setPlainLyrics]     = useState('');
  const [lyricsLoading, setLyricsLoading] = useState(false);

  // Simulated playback
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying]     = useState(false);

  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const scrollBoxRef  = useRef<HTMLDivElement | null>(null);

  /* ── Fetch tracks from the embedded playlist ─────────────── */
  useEffect(() => {
    setPlaylistLoading(true);
    setPlaylistError(false);
    fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=50&fields=items(track(id,name,duration_ms,artists))`, {
      headers: { Authorization: `Bearer ${SPOTIFY_TOKEN}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const tracks: SpotifyTrack[] = (data.items ?? [])
          .filter((item: any) => item?.track?.id)
          .map((item: any) => {
            const t = item.track;
            const min = Math.floor(t.duration_ms / 60000);
            const sec = Math.round((t.duration_ms % 60000) / 1000);
            return {
              id: t.id,
              name: t.name,
              artist: t.artists.map((a: any) => a.name).join(', '),
              duration: `${min}:${sec < 10 ? '0' : ''}${sec}`,
            };
          });
        setPlaylistTracks(tracks);
      })
      .catch(() => setPlaylistError(true))
      .finally(() => setPlaylistLoading(false));
  }, []);

  /* ── Fetch lyrics whenever selected track changes ────────── */
  useEffect(() => {
    const track = playlistTracks[selectedIdx];
    if (!track) return;

    setIsPlaying(false);
    setCurrentTime(0);
    setLyricLines([]);
    setPlainLyrics('');
    setLyricsLoading(true);

    // 1st try: lrclib.net for timestamped LRC lyrics
    fetch(
      `https://lrclib.net/api/search?track_name=${encodeURIComponent(track.name)}&artist_name=${encodeURIComponent(track.artist)}`
    )
      .then((r) => r.json())
      .then((data: any[]) => {
        const entry = Array.isArray(data)
          ? (data.find((d) => d.syncedLyrics) ?? data[0])
          : null;

        if (entry?.syncedLyrics) {
          setLyricLines(parseLRC(entry.syncedLyrics));
        } else if (entry?.plainLyrics) {
          setPlainLyrics(entry.plainLyrics);
        } else {
          // 2nd try: lyrics.ovh plain
          return fetch(
            `https://api.lyrics.ovh/v1/${encodeURIComponent(track.artist)}/${encodeURIComponent(track.name)}`
          )
            .then((r) => r.json())
            .then((d) => setPlainLyrics(d.lyrics ?? 'Lyrics not found.'))
            .catch(() => setPlainLyrics('Lyrics not available.'));
        }
      })
      .catch(() => setPlainLyrics('Lyrics not available.'))
      .finally(() => setLyricsLoading(false));
  }, [selectedIdx, playlistTracks]);

  /* ── Simulated timer ─────────────────────────────────────── */
  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => {
    stopTimer();
    if (isPlaying) {
      timerRef.current = setInterval(() => setCurrentTime((t) => t + 0.25), 250);
    }
    return stopTimer;
  }, [isPlaying, stopTimer]);

  /* ── Active lyric line ───────────────────────────────────── */
  const currentLineIdx = lyricLines.reduce(
    (acc, line, idx) => (line.time <= currentTime ? idx : acc), -1
  );

  /* ── Auto-scroll active line ─────────────────────────────── */
  useEffect(() => {
    if (activeLineRef.current && scrollBoxRef.current) {
      const box    = scrollBoxRef.current;
      const el     = activeLineRef.current;
      const offset = el.offsetTop - box.offsetTop - box.clientHeight / 2 + el.clientHeight / 2;
      box.scrollTo({ top: offset, behavior: 'smooth' });
    }
  }, [currentLineIdx]);

  const fmtTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sc = Math.floor(s % 60);
    return `${m}:${sc < 10 ? '0' : ''}${sc}`;
  };

  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-[560px] mt-6">

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Music className="w-4 h-4 text-indigo-400 animate-pulse" />
        <h4 className="text-[10px] font-bold press-start-2p-regular uppercase tracking-widest text-indigo-200">
          My Soundtrack
        </h4>
        <div className="flex items-end gap-[3px] h-3 ml-2">
          <div className="w-[3px] bg-blue-500 rounded-full animate-visualizer-bar-1" />
          <div className="w-[3px] bg-indigo-500 rounded-full animate-visualizer-bar-2" />
          <div className="w-[3px] bg-purple-500 rounded-full animate-visualizer-bar-3" />
          <div className="w-[3px] bg-pink-500 rounded-full animate-visualizer-bar-4" />
        </div>
      </div>

      {/* Cards: side-by-side on desktop, stacked on mobile */}
      <div className={isMobile ? 'flex flex-col gap-3' : 'grid grid-cols-12 gap-13'}>

        {/* Left: Hardcoded Spotify Playlist Embed */}
        <div className={`${
          isMobile ? 'w-full h-[152px]' : 'col-span-7 h-[160px] w-[350px]'
        } rounded-xl overflow-hidden border border-blue-500 bg-black/45 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_28px_rgba(168,85,247,0.45)] hover:border-purple-500/40 transition-all duration-500`}>
          <iframe
            title="Spotify Playlist"
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Right: Synced Lyrics Card */}
        <div className={`${
          isMobile ? 'w-full h-[160px]' : 'col-span-5 h-[160px] w-[400px] ml-auto'
        }`}>
          <Card className="h-full bg-black/50 border border-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:shadow-[0_0_28px_rgba(168,85,247,0.45)] hover:border-purple-500/40 hover:scale-[1.01] transition-all duration-500">
            <CardContent className="p-3 flex flex-col h-full gap-1">

              {/* Controls row */}
              <div className="flex items-center justify-between pb-1 border-b border-indigo-500/20 shrink-0 gap-1">

                {playlistLoading ? (
                  <span className="flex items-center gap-1 text-[7px] text-slate-500 aldrich-regular">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" /> Loading playlist…
                  </span>
                ) : playlistError ? (
                  <span className="text-[7px] text-red-400/70 aldrich-regular">Token expired — refresh to sync</span>
                ) : (
                  <select
                    value={selectedIdx}
                    onChange={(e) => setSelectedIdx(Number(e.target.value))}
                    className="text-[7px] bg-[#0d0d1a] border border-indigo-500/30 rounded px-1 py-0.5 text-indigo-300 cursor-pointer outline-none max-w-[120px] truncate"
                  >
                    {playlistTracks.map((t, i) => (
                      <option key={t.id} value={i} className="bg-[#1a0b2e]">{t.name}</option>
                    ))}
                  </select>
                )}

                {/* Play controls */}
                <div className="flex items-center gap-1 shrink-0">
                  {lyricLines.length > 0 && (
                    <span className="text-[7px] text-slate-500 aldrich-regular tabular-nums">
                      {fmtTime(currentTime)}
                    </span>
                  )}
                  <button
                    onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
                    className="text-slate-500 hover:text-purple-300 transition-colors"
                    title="Reset"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                  </button>
                  {lyricLines.length > 0 && (
                    <button
                      onClick={() => setIsPlaying((p) => !p)}
                      className="text-indigo-400 hover:text-indigo-200 transition-colors"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying
                        ? <Pause className="w-3 h-3 fill-indigo-400" />
                        : <Play  className="w-3 h-3 fill-indigo-400" />
                      }
                    </button>
                  )}
                </div>
              </div>

              {/* Lyrics body */}
              <div ref={scrollBoxRef} className="overflow-y-auto flex-1">
                {playlistError ? (
                  <p className="text-[7.5px] text-slate-500 italic pt-1 aldrich-regular leading-relaxed">
                    Could not load playlist tracks.<br />
                    Spotify token may have expired.
                  </p>

                ) : lyricsLoading ? (
                  <p className="text-[8px] text-slate-500 italic animate-pulse pt-1 aldrich-regular">
                    Fetching lyrics…
                  </p>

                ) : lyricLines.length > 0 ? (
                  <div className="flex flex-col">
                    {lyricLines.map((line, idx) => {
                      const isActive = idx === currentLineIdx;
                      return (
                        <div
                          key={idx}
                          ref={isActive ? activeLineRef : null}
                          className={`text-[7.5px] leading-[1.6] px-0.5 rounded transition-all duration-300 ${
                            isActive
                              ? 'text-purple-300 font-bold scale-[1.04] origin-left'
                              : idx < currentLineIdx
                              ? 'text-slate-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {line.text}
                        </div>
                      );
                    })}
                  </div>

                ) : plainLyrics ? (
                  <pre className="text-[7.5px] text-slate-300 aldrich-regular whitespace-pre-wrap leading-[1.55] font-sans">
                    {plainLyrics}
                  </pre>

                ) : !playlistLoading && playlistTracks.length === 0 ? (
                  <p className="text-[7.5px] text-slate-500 italic pt-1 aldrich-regular">
                    No tracks loaded from playlist.
                  </p>
                ) : (
                  <p className="text-[7.5px] text-slate-500 italic pt-1 aldrich-regular">
                    Lyrics not found for this track.
                  </p>
                )}
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
