import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Code, Lightbulb, Target } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Driven by a deep love for creating beautiful and functional digital experiences."
    },
    {
      icon: Code,
      title: "Expertise",
      description: "Years of experience in web development, design, and digital marketing."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Always exploring new technologies and creative solutions."
    },
    {
      icon: Target,
      title: "Results",
      description: "Focused on delivering high-quality work that exceeds expectations."
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-lg text-muted-foreground mb-8">
            I'm a passionate digital creator specializing in web development, graphic design, 
            and digital marketing. With years of experience helping businesses grow their online 
            presence, I bring creativity and technical expertise to every project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Background</h2>
              <p className="text-muted-foreground">
                With a background in computer science and design, I've spent the last several 
                years working with clients across various industries. My approach combines 
                technical expertise with creative problem-solving to deliver outstanding results.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">My Approach</h2>
              <p className="text-muted-foreground">
                I believe in creating solutions that not only look great but also deliver real 
                value. Every project starts with understanding your unique needs and goals, 
                followed by a strategic approach to achieve the best possible outcomes.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
