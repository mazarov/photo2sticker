import { Hero } from "@/components/landing/Hero";
import { Transformation } from "@/components/landing/Transformation";
import { Steps } from "@/components/landing/Steps";
import { TelegramButton } from "@/components/landing/TelegramButton";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
            <span className="text-2xl">✌️</span>
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-tight">Lovable</span>
        </div>
      </nav>

      <main>
        <Hero />
        <Transformation />
        <Steps />
        
        <section className="py-24 pb-32 text-center px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-8">
              Ready to make some magic?
            </h2>
            <TelegramButton size="lg" className="scale-125" />
          </motion.div>
        </section>
      </main>

      {/* Sticky Mobile CTA - only visible on small screens when scrolling past hero */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <TelegramButton className="w-full shadow-2xl" />
      </div>

      <footer className="py-8 text-center text-muted-foreground text-sm relative z-10">
        <p>© 2026 Lovable. All rights reserved.</p>
      </footer>
    </div>
  );
}