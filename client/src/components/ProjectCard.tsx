import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={item}>
      <Link href={`/portfolio/${project.id}`}>
        <Card className="overflow-hidden cursor-pointer group">
          <div className="aspect-video overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <CardContent className="pt-6">
            <Badge className="mb-3">{project.category}</Badge>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
