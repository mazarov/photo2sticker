import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

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
    <div className={className}>
      <Button 
        size={size} 
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] border-none px-4 sm:px-8 py-3 sm:py-6 h-auto text-sm sm:text-lg gap-2 sm:gap-3 transition-all duration-200 w-full sm:w-auto hover:scale-105 active:scale-95 will-change-transform"
      >
        <Send className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
        {text}
      </Button>
    </div>
  );
}