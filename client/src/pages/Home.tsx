import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import SkillsSection from "@/components/SkillsSection";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
        <ProjectCarousel />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-muted/50 py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills & Expertise</h2>
          <SkillsSection />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </motion.section>
    </div>
  );
}
