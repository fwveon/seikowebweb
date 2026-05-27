'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
              <span className="text-xl font-bold text-primary-foreground">S</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Admin <span className="text-primary">Panel</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            {user.email}
          </span>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Link>
          </Button>
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="border-border hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
