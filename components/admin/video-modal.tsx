'use client'

import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        thumbnail_url: initialData.thumbnail_url,
        youtube_url: initialData.youtube_url,
        script_url: initialData.script_url,
      })
      setThumbnailPreview(initialData.thumbnail_url)
    } else {
      setFormData({
        title: '',
        description: '',
        thumbnail_url: '',
        youtube_url: '',
        script_url: '',
      })
      setThumbnailPreview('')
    }
    setThumbnailFile(null)
  }, [initialData, isOpen])

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setThumbnailFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadThumbnail = async () => {
    if (!thumbnailFile) return

    setIsUploading(true)
    try {
      const formDataForUpload = new FormData()
      formDataForUpload.append('file', thumbnailFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataForUpload,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const { url } = await response.json()
      setFormData({ ...formData, thumbnail_url: url })
      setThumbnailFile(null)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload thumbnail')
    } finally {
      setIsUploading(false)
    }
  }

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
            <Label htmlFor="thumbnail_url" className="text-foreground">Thumbnail Image *</Label>
            {thumbnailPreview && (
              <div className="mb-3">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  className="w-full h-40 object-cover rounded-lg border border-border"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Input
                id="thumbnail_url"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                disabled={isUploading}
                className="bg-input border-border text-foreground"
              />
              <Button
                type="button"
                onClick={uploadThumbnail}
                disabled={!thumbnailFile || isUploading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground whitespace-nowrap"
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>
            {formData.thumbnail_url && !thumbnailFile && (
              <p className="text-sm text-muted-foreground">Current thumbnail set ✓</p>
            )}
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
