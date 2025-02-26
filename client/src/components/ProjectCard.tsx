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
  return (
    <motion.div variants={item}>
      <Link href={`/portfolio/${project.id}`}>
        <HoverCard>
          <HoverCardTrigger asChild>
            <Card className="overflow-hidden cursor-pointer group">
              <div className="aspect-video overflow-hidden">
                {project.embedUrl ? (
                 <iframe
                 src={project.embedUrl}
                 title={project.title}  // Add a title for accessibility
                 className="w-full aspect-video"
                 allowFullScreen
                 loading="lazy"  // Lazy load the iframe
                 sandbox="allow-scripts allow-same-origin"  // Restrict iframe capabilities
                 onError={(e) => {
                   console.error("Failed to load iframe:", e);
                   // Optionally, you can set a fallback state here
                 }}
               />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <p className="text-muted-foreground">No preview available</p>
                  </div>
                )}
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