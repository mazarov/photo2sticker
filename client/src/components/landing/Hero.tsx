import { motion } from "framer-motion";
import { TelegramButton } from "./TelegramButton";
import heroBg from "@assets/generated_images/dark_navy_seamless_pattern_with_doodle_icons.png";

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-10">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-4xl mx-auto space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight leading-tight text-white drop-shadow-xl">
          Turn Your Photos <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-pulse-glow inline-block">
            Instantly into Stickers
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
          Upload a photo — get a ready-to-use Telegram sticker. <br className="hidden md:block"/>
          No editing. No skills. Just one click.
        </p>

        <div className="pt-8">
          <TelegramButton text="Create Stickers in Telegram" />
        </div>
      </motion.div>
    </div>
  );
}