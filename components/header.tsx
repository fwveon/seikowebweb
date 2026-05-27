import Link from 'next/link'

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
            <span className="text-xl font-bold text-primary-foreground">S</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Seiko<span className="text-primary">Scripts</span>
          </span>
        </Link>


      </div>
    </header>
  )
}
