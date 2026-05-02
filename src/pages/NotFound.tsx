import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="flex-1 flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-8xl font-black text-gradient">404</h1>
          <p className="text-xl text-muted-foreground">Page not found</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:brightness-110 active:scale-[0.97] transition-all glow-primary"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
