import { Button } from "@/components/ui/button";
import { ArrowRight, Send } from "lucide-react";
import { motion } from "framer-motion";

export function TelegramButton({ 
  className = "", 
  size = "lg",
  text = "Open in Telegram" 
}: { 
  className?: string; 
  size?: "default" | "sm" | "lg" | "icon";
  text?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button 
        size={size} 
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] border-none px-8 py-6 h-auto text-lg gap-3 transition-all duration-300"
      >
        <Send className="w-6 h-6 fill-white" />
        {text}
      </Button>
    </motion.div>
  );
}