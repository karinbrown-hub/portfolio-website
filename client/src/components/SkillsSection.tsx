import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Monitor, Palette, TrendingUp, Code } from "lucide-react";

const skills = [
  {
    category: "Web Development",
    icon: Code,
    skills: [
      { name: "React/Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Node.js", level: 80 }
    ]
  },
  {
    category: "Graphic Design",
    icon: Palette,
    skills: [
      { name: "Adobe Illustrator", level: 85 },
      { name: "Adobe Photoshop", level: 80 },
      { name: "UI/UX Design", level: 75 }
    ]
  },
  {
    category: "Digital Marketing",
    icon: TrendingUp,
    skills: [
      { name: "SEO", level: 75 },
      { name: "Social Media", level: 85 },
      { name: "Content Strategy", level: 80 }
    ]
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function SkillsSection() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {skills.map((category, index) => (
        <motion.div key={index} variants={item}>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center mb-6">
                <category.icon className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-bold">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
