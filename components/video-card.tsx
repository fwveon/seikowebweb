'use client'

import { Play, FileText, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Video } from '@/lib/types'

interface VideoCardProps {
  video: Video
  index: number
}

export function VideoCard({ video, index }: VideoCardProps) {
  return (
    <Card 
      className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards',
        opacity: 0,
      }}
    >
      {/* Thumbnail with Play Overlay */}
      <a
        href={video.youtube_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden"
      >
        <img
          src={video.thumbnail_url}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </div>
      </a>

      <CardContent className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>

        {/* Description */}
        {video.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {video.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            asChild
            variant="default"
            size="sm"
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <a href={video.script_url} target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4 mr-2" />
              Script
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border hover:border-primary hover:bg-primary/10"
          >
            <a href={video.youtube_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              <span className="sr-only">Watch on YouTube</span>
            </a>
          </Button>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  )
}
