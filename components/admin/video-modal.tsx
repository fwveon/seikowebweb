'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Video, VideoFormData } from '@/lib/types'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: VideoFormData) => Promise<void>
  isLoading: boolean
  title: string
  initialData?: Video
}

export function VideoModal({ isOpen, onClose, onSubmit, isLoading, title, initialData }: VideoModalProps) {
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    thumbnail_url: '',
    youtube_url: '',
    script_url: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        thumbnail_url: initialData.thumbnail_url,
        youtube_url: initialData.youtube_url,
        script_url: initialData.script_url,
      })
    } else {
      setFormData({
        title: '',
        description: '',
        thumbnail_url: '',
        youtube_url: '',
        script_url: '',
      })
    }
  }, [initialData, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">Video Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter video title"
              required
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter video description"
              rows={3}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnail_url" className="text-foreground">Thumbnail URL *</Label>
            <Input
              id="thumbnail_url"
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="https://img.youtube.com/vi/..."
              required
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube_url" className="text-foreground">YouTube URL *</Label>
            <Input
              id="youtube_url"
              type="url"
              value={formData.youtube_url}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              placeholder="https://youtube.com/watch?v=..."
              required
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="script_url" className="text-foreground">Script Download URL *</Label>
            <Input
              id="script_url"
              type="url"
              value={formData.script_url}
              onChange={(e) => setFormData({ ...formData, script_url: e.target.value })}
              placeholder="https://drive.google.com/..."
              required
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-border hover:bg-secondary"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Video'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
