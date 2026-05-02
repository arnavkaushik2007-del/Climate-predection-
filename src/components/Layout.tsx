import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Globe, Menu, X, Zap, BarChart3, GitCompare, Database, BookOpen, Info, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "@/components/ChatBot";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { to: "/", label: "Home", icon: Globe },
  { to: "/predict", label: "Predict", icon: Zap },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/models", label: "Models", icon: GitCompare },
  { to: "/explorer", label: "Data Explorer", icon: Database },
  { to: "/education", label: "Education", icon: BookOpen },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/about", label: "About", icon: Info },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 glass border-b border-white/[0.06]">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight group">
            <div className="relative">
              <Globe className="h-7 w-7 text-primary transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            </div>
            <span className="text-gradient">ClimateCast</span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === item.to
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {pathname === item.to && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary active:scale-95 transition-all"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/[0.06] glass overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      pathname === item.to
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/[0.06] glass py-8">
        <div className="container text-center text-sm text-muted-foreground space-y-1">
          <p className="font-semibold text-gradient">ClimateCast</p>
          <p>AI-Powered Climate Intelligence Platform</p>
          <p className="text-xs">Built with Machine Learning for a safer tomorrow.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
