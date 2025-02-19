import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, TrendingUp, Clock } from "lucide-react";

// Skills arranged in a 2x2 grid:
// [Web Development] [Graphic Design]
// [Digital Marketing] [Virtual Assistant]
const skills = [
  {
    category: "Web Development",
    icon: Code,
    skills: [
      "React/Next.js",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Responsive Design"
    ]
  },
  {
    category: "Graphic Design",
    icon: Palette,
    skills: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "UI/UX Design",
      "Brand Identity",
      "Visual Design"
    ]
  },
  {
    category: "Digital Marketing",
    icon: TrendingUp,
    skills: [
      "SEO Optimization",
      "Social Media Strategy",
      "Content Marketing",
      "Analytics",
      "Campaign Management"
    ]
  },
  {
    category: "Virtual Assistant",
    icon: Clock,
    skills: [
      "Project Management",
      "Calendar Management",
      "Email Management",
      "Travel Planning",
      "Administrative Support"
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
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4"
    >
      {skills.map((skill, index) => {
        const Icon = skill.icon;
        return (
          <motion.div key={index} variants={item}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-6">
                  <Icon className="w-6 h-6 text-primary mr-3" />
                  <h3 className="text-xl font-bold">{skill.category}</h3>
                </div>

                <ul className="space-y-2">
                  {skill.skills.map((skillItem, skillIndex) => (
                    <li 
                      key={skillIndex}
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="w-2 h-2 bg-primary/40 rounded-full mr-2" />
                      {skillItem}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}