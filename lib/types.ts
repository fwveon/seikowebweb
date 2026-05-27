export interface Video {
  id: string
  title: string
  description: string | null
  thumbnail_url: string
  youtube_url: string
  script_url: string
  created_at: string
  updated_at: string
}

export interface VideoFormData {
  title: string
  description: string
  thumbnail_url: string
  youtube_url: string
  script_url: string
}
