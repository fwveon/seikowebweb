export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">S</span>
            </div>
            <span className="text-sm text-muted-foreground">
              SeikoScripts - YouTube Video Scripts
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} SeikoScripts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
