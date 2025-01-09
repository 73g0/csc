import ThemeSwitcher from './theme-switcher'

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cheat Sheet Club</h1>
        <ThemeSwitcher />
      </div>
    </header>
  )
}

