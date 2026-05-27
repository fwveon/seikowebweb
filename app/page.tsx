import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { VideoGrid } from '@/components/video-grid'
import type { Video } from '@/lib/types'

export const revalidate = 0

export default async function HomePage() {
  const supabase = await createClient()
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                Welcome to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  SeikoScripts
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Browse our collection of YouTube video scripts. Find the content you need and download scripts for your reference.
              </p>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <VideoGrid videos={(videos as Video[]) || []} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
