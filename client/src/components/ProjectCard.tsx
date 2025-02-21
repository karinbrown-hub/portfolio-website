
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const renderContent = () => {
    if (project.embedUrl) {
      return (
        <iframe
          src={project.embedUrl}
          className="w-full aspect-video"
          allowFullScreen
        />
      );
    }
    
    if (project.imageUrl?.endsWith('.pdf')) {
      return (
        <iframe
          src={project.imageUrl}
          className="w-full aspect-video"
        />
      );
    }

    return (
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    );
  };

  return (
    <motion.div variants={item}>
      <Link href={`/portfolio/${project.id}`}>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card className="overflow-hidden cursor-pointer group">
              <div className="aspect-video overflow-hidden">
                {renderContent()}
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
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="space-y-2">
              <h4 className="font-semibold">{project.title}</h4>
              <p className="text-sm">{project.description}</p>
              <div className="text-sm">
                <p><strong>Tools:</strong> {project.details.tools.join(', ')}</p>
                <p><strong>Duration:</strong> {project.details.duration}</p>
                <p><strong>Deliverables:</strong> {project.details.deliverables.join(', ')}</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </Link>
    </motion.div>
  );
}
