'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  isLoading: boolean
  videoTitle: string
}

export function DeleteModal({ isOpen, onClose, onConfirm, isLoading, videoTitle }: DeleteModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 space-y-4">
          {/* Icon */}
          <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>

          {/* Content */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Delete Video</h2>
            <p className="text-muted-foreground">
              Are you sure you want to delete{' '}
              <span className="font-medium text-foreground">{videoTitle}</span>?
              This action cannot be undone.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-border hover:bg-secondary"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              variant="destructive"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
