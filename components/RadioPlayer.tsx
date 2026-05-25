/**
 * RadioPlayer Component
 * 
 * Persistent audio player that shows:
 * - Current playing track/show
 * - Play/pause controls
 * - Current time / duration
 * - Volume control
 * - Next show info
 * 
 * Usage: <RadioPlayer />
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, SkipForward, Music } from 'lucide-react';

interface CurrentRadioData {
  current: {
    show: {
      id: string;
      title: string;
      slug: string;
      description?: string;
      imageUrl?: string;
      curator: {
        id: string;
        name?: string;
        slug: string;
        imageUrl?: string;
      };
      playlist?: {
        items: Array<{
          track: {
            id: string;
            title: string;
            duration: number;
            audioUrl: string;
            artist: {
              id: string;
              name?: string;
              slug: string;
            };
          };
        }>;
      };
    };
    startAt: string;
    endAt: string;
  } | null;
  next: {
    show: {
      id: string;
      title: string;
      slug: string;
    };
    startAt: string;
  } | null;
  streamUrl: string | null;
}

export default function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [radioData, setRadioData] = useState<CurrentRadioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch current radio metadata
  useEffect(() => {
    const fetchRadioData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/radio/current');
        if (!response.ok) throw new Error('Failed to fetch radio metadata');
        
        const data = await response.json();
        setRadioData(data.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching radio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRadioData();
    
    // Refresh metadata every minute
    const interval = setInterval(fetchRadioData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Setup audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !radioData?.streamUrl) return;

    audio.src = radioData.streamUrl;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [radioData?.streamUrl]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch (err) {
      console.error('Playback error:', err);
      setError('Could not start playback');
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentShow = radioData?.current?.show;
  const nextShow = radioData?.next?.show;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-gray-900 border-t border-gray-700 z-50">
      <audio ref={audioRef} crossOrigin="anonymous" />

      {/* Player Container */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Error Message */}
        {error && (
          <div className="mb-2 p-2 bg-red-900/30 border border-red-700 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Main Player */}
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <div className="flex-shrink-0 w-16 h-16 bg-gray-800 rounded overflow-hidden">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center animate-pulse">
                <Music className="w-8 h-8 text-gray-600" />
              </div>
            ) : currentShow?.imageUrl ? (
              <Image
                src={currentShow.imageUrl}
                alt={currentShow.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <Music className="w-8 h-8 text-gray-500" />
              </div>
            )}
          </div>

          {/* Show Info */}
          <div className="flex-1 min-w-0">
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
                <div className="h-3 bg-gray-700 rounded w-24 animate-pulse" />
              </div>
            ) : currentShow ? (
              <>
                <h3 className="text-white font-semibold truncate">
                  {currentShow.title}
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  {currentShow.curator?.name || 'Unknown Host'}
                </p>
                {nextShow && (
                  <p className="text-gray-500 text-xs mt-1">
                    Next: {nextShow.title}
                  </p>
                )}
              </>
            ) : (
              <div className="text-gray-400">
                <h3 className="font-semibold">No show currently live</h3>
                {nextShow && (
                  <p className="text-sm">Next: {nextShow.title}</p>
                )}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-xs">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = parseFloat(e.target.value);
                }
              }}
              className="w-full h-1 bg-gray-700 rounded cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              disabled={loading || !radioData?.streamUrl}
              className="p-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 text-white rounded-full transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleMuteToggle}
                className="p-1 text-gray-400 hover:text-white transition"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-700 rounded cursor-pointer accent-red-500"
                aria-label="Volume"
              />
            </div>

            {/* Next Show Button */}
            {nextShow && (
              <button
                className="p-2 text-gray-400 hover:text-white transition"
                title={`Next: ${nextShow.title}`}
              >
                <SkipForward className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Current Playlist (if available) */}
        {currentShow?.playlist?.items && currentShow.playlist.items.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-2">
              Playlist
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 max-h-20 overflow-auto">
              {currentShow.playlist.items.map((item, idx) => (
                <div
                  key={item.track.id}
                  className="p-2 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer transition text-xs truncate"
                >
                  <div className="text-white truncate">{item.track.title}</div>
                  <div className="text-gray-500 truncate">
                    {item.track.artist?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
