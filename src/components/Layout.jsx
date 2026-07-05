import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardCheck, Home, PlusCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-ragda-dark">
      {/* Header */}
      <header className="bg-ragda-primary border-b border-ragda-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-ragda-accent p-2 rounded-lg">
              <ClipboardCheck className="w-6 h-6 text-ragda-dark" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Ragdalion Assessment</h1>
              <p className="text-xs text-ragda-accent">IT & OT Customer Visit Checklist</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                isActive('/') ? 'bg-ragda-accent text-ragda-dark font-bold' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => navigate('/new')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                isActive('/new') ? 'bg-ragda-accent text-ragda-dark font-bold' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              New Assessment
            </button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <nav className="md:hidden border-t border-ragda-border px-4 py-2 space-y-1">
            <button
              onClick={() => { navigate('/'); setMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 w-full"
            >
              <Home className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => { navigate('/new'); setMenuOpen(false); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 w-full"
            >
              <PlusCircle className="w-4 h-4" /> New Assessment
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-ragda-border py-4 text-center text-xs text-white/40">
        &copy; {new Date().getFullYear()} PT Ragdalion Revolusi Industri - Assessment Tool v1.0
      </footer>
    </div>
  );
}
