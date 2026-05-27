'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Pencil, Trash2, ExternalLink, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VideoModal } from './video-modal'
import { DeleteModal } from './delete-modal'
import { createClient } from '@/lib/supabase/client'
import type { Video, VideoFormData } from '@/lib/types'

interface VideoTableProps {
  videos: Video[]
}

export function VideoTable({ videos }: VideoTableProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [deletingVideo, setDeletingVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAdd = async (data: VideoFormData) => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from('videos').insert([data])
      if (error) throw error
      setIsAddModalOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error adding video:', error)
      alert('Failed to add video')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = async (data: VideoFormData) => {
    if (!editingVideo) return
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('videos')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', editingVideo.id)
      if (error) throw error
      setEditingVideo(null)
      router.refresh()
    } catch (error) {
      console.error('Error updating video:', error)
      alert('Failed to update video')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingVideo) return
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', deletingVideo.id)
      if (error) throw error
      setDeletingVideo(null)
      router.refresh()
    } catch (error) {
      console.error('Error deleting video:', error)
      alert('Failed to delete video')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Videos ({videos.length})</CardTitle>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Video
          </Button>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No videos yet. Add your first video to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/30 transition-colors"
                >
                  {/* Thumbnail */}
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-32 h-18 object-cover rounded-md flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{video.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                      {video.description || 'No description'}
                    </p>
                    <div className="flex gap-3 mt-2">
                      <a
                        href={video.youtube_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> YouTube
                      </a>
                      <a
                        href={video.script_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" /> Script
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingVideo(video)}
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-primary hover:bg-primary/10"
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      onClick={() => setDeletingVideo(video)}
                      variant="outline"
                      size="sm"
                      className="border-border hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Modal */}
      <VideoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAdd}
        isLoading={isLoading}
        title="Add New Video"
      />

      {/* Edit Modal */}
      <VideoModal
        isOpen={!!editingVideo}
        onClose={() => setEditingVideo(null)}
        onSubmit={handleEdit}
        isLoading={isLoading}
        title="Edit Video"
        initialData={editingVideo || undefined}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deletingVideo}
        onClose={() => setDeletingVideo(null)}
        onConfirm={handleDelete}
        isLoading={isLoading}
        videoTitle={deletingVideo?.title || ''}
      />
    </>
  )
}
