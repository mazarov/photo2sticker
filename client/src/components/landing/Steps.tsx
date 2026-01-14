import { motion } from "framer-motion";
import { Upload, Wand2, Sticker } from "lucide-react";

export function Steps() {
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-white" />,
      title: "Choose a Photo",
      description: "Upload any portrait or photo from your gallery.",
      bgClass: "bg-blue-500",
      shadowClass: "shadow-blue-500/20"
    },
    {
      icon: <Wand2 className="w-8 h-8 text-white" />,
      title: "AI Magic",
      description: "Our AI analyzes the emotion and style instantly.",
      bgClass: "bg-purple-500",
      shadowClass: "shadow-purple-500/20"
    },
    {
      icon: <Sticker className="w-8 h-8 text-white" />,
      title: "Get Sticker",
      description: "Receive your ready-to-use Telegram sticker.",
      bgClass: "bg-pink-500",
      shadowClass: "shadow-pink-500/20"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 rounded-full" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center z-10"
            >
              <div className={`w-24 h-24 rounded-3xl ${step.bgClass} shadow-lg ${step.shadowClass} flex items-center justify-center mb-6 rotate-3 hover:rotate-0 transition-transform duration-300`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}