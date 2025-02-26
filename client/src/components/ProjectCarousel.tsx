import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../designs"; // Import only getProjects from designs.ts
import type { Project as SharedProject } from "@shared/schema"; // Import Project type from shared schema

export type Project = SharedProject;

export default function ProjectCarousel() {
  const [projects, setProjects] = useState<Project[]>([]); // Use Project type from shared schema
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data: Project[]) => {
        // Ensure that embedUrl is set to null if it's undefined
        const projectsWithCorrectEmbedUrl = data.map(project => ({
          ...project,
          embedUrl: project.embedUrl ?? null, // Convert undefined to null
        }));
        setProjects(projectsWithCorrectEmbedUrl);
        setIsLoading(false);
      })
      .catch((error: Error) => {
        console.error("Error loading projects:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[300px] rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {projects.map((project) => (
          <CarouselItem
            key={project.id}
            className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
          >
            <ProjectCard project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}