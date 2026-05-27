'use client'

import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { VideoCard } from './video-card'
import type { Video } from '@/lib/types'

interface VideoGridProps {
  videos: Video[]
}

export function VideoGrid({ videos }: VideoGridProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return videos
    const query = searchQuery.toLowerCase()
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.description?.toLowerCase().includes(query)
    )
  }, [videos, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search videos and scripts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>

      {/* Video Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            {searchQuery ? 'No videos found matching your search.' : 'No videos available yet.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      )}
    </div>
  )
}
