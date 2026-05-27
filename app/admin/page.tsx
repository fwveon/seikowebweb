import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/admin-header'
import { VideoTable } from '@/components/admin/video-table'
import type { Video } from '@/lib/types'

export const revalidate = 0

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  const ADMIN_EMAIL = 'rhianamedrano5@gmail.com'

  if (!user) {
    redirect('/auth/login')
  }

  if (user.email !== ADMIN_EMAIL) {
    redirect('/')
  }

  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage your video scripts</p>
          </div>

          <VideoTable videos={(videos as Video[]) || []} />
        </div>
      </main>
    </div>
  )
}
