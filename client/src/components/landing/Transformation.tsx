import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import beforeImage from "@assets/generated_images/portrait_of_a_smiling_woman_with_pink_hair.png";
import afterImage from "@assets/generated_images/telegram_sticker_style_illustration_of_the_same_woman.png";

export function Transformation() {
  return (
    <section className="py-16 px-4 md:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            From Photo to Sticker
          </h2>
          <p className="text-lg text-muted-foreground">
            Lovable keeps facial features and emotions, adding that magic touch.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
          
          {/* Before Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-card border border-white/10 p-4 rounded-3xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[3/4] w-64 md:w-80 overflow-hidden rounded-2xl bg-black/50 relative">
                <img 
                  src={beforeImage} 
                  alt="Original Photo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <span className="text-white font-bold text-lg">Before</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex flex-col items-center justify-center text-primary z-20"
          >
            <Sparkles className="w-8 h-8 mb-2 animate-bounce" />
            <ArrowRight className="w-12 h-12 md:w-16 md:h-16 stroke-[3px]" />
          </motion.div>

          {/* After Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-100 animate-pulse-glow" />
            <div className="relative bg-gradient-to-br from-card to-card/50 border border-primary/30 p-4 rounded-3xl shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform duration-300 scale-105">
              <div className="aspect-[3/4] w-64 md:w-80 overflow-hidden rounded-2xl bg-black/50 relative flex items-center justify-center">
                 {/* Radial burst background for sticker */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
                
                <img 
                  src={afterImage} 
                  alt="Lovable Sticker" 
                  className="w-[90%] h-[90%] object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-4">
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 
                    After
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}