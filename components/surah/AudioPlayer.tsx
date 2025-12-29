// components/surah/AudioPlayer.tsx
"use client";

import { Card, CardBody, CardHeader, CardTitle } from "@/components/selia/card";
import { Button } from "@/components/selia/button";
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/selia/progress";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  title?: string;
  subtitle?: string;
  qariOptions?: { id: string; name: string; url: string }[];
}

export function AudioPlayer({
  src,
  title,
  subtitle,
  qariOptions,
}: AudioPlayerProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    play,
    pause,
    stop,
    seek,
    setVolume,
    togglePlayPause,
  } = useAudioPlayer(currentSrc);

  const [isMuted, setIsMuted] = useState(false);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(1);
      setIsMuted(false);
    } else {
      setVolume(0);
      setIsMuted(true);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </CardHeader>

      <CardBody className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} max={100}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted">
                {formatTime(currentTime)}
              </span>
              <span className="text-xs text-muted">{formatTime(duration)}</span>
            </div>
          </Progress>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm-icon"
              onClick={togglePlayPause}
              disabled={isLoading}
              progress={isLoading}
            >
              {isPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </Button>

            <Button variant="outline" size="sm-icon" onClick={stop}>
              <RotateCcw className="size-4" />
            </Button>
          </div>

          <Button variant="plain" size="sm-icon" onClick={handleVolumeToggle}>
            {isMuted ? (
              <VolumeX className="size-4" />
            ) : (
              <Volume2 className="size-4" />
            )}
          </Button>
        </div>

        {/* Qari Selection */}
        {qariOptions && qariOptions.length > 1 && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm font-medium text-muted mb-2">Select Qari</p>
            <div className="flex flex-wrap gap-2">
              {qariOptions.map((qari) => (
                <Button
                  key={qari.id}
                  variant={currentSrc === qari.url ? "primary" : "outline"}
                  size="xs"
                  onClick={() => setCurrentSrc(qari.url)}
                >
                  {qari.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
