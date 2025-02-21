
import { contacts, projects, type Contact, type InsertContact, type Project } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectsByCategory(category: string): Promise<Project[]>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private projects: Map<number, Project>;
  private contactId: number;
  private projectId: number;

  constructor() {
    this.contacts = new Map();
    this.projects = new Map();
    this.contactId = 1;
    this.projectId = 1;
    this.initializeProjects();
  }

  private initializeProjects() {
    const sampleProjects: Omit<Project, "id">[] = [
      {
        title: "Stella Solutions Instagram Post",
        description: "Instagram post for Stella Solutions",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGeza57pg0/mrQzHX6QQDajyFz6ATZcGw/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Instagram Post"]
        }
      },
      {
        title: "Modern Fashion Product Instagram Post",
        description: "Instagram post for a modern fashion product",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGezti-ar8/n_se9eJBPka59SVwwt1kOQ/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Instagram Post"]
        }
      },
      {
        title: "T-Shirt Mockup Design 1",
        description: "T-Shirt mockup design",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGft8vfHj8/S9g3INcNfrSTCYXarfkYwg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["T-Shirt Design"]
        }
      },
      {
        title: "T-Shirt Mockup Design 2",
        description: "T-Shirt mockup design",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGftwXX24k/DxQZRpuu2QF28dwCzu53GA/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["T-Shirt Design"]
        }
      },
      {
        title: "Stella Solutions Instagram Post",
        description: "Instagram post for Stella Solutions",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGeza57pg0/mrQzHX6QQDajyFz6ATZcGw/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Instagram Post"]
        }
      },
      {
        title: "Modern Fashion Product Instagram Post",
        description: "Instagram post for a modern fashion product",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGezti-ar8/n_se9eJBPka59SVwwt1kOQ/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Instagram Post"]
        }
      },
      {
        title: "T-Shirt Mockup Design 1",
        description: "T-Shirt mockup design",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGft8vfHj8/S9g3INcNfrSTCYXarfkYwg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["T-Shirt Design"]
        }
      },
      {
        title: "T-Shirt Mockup Design 2",
        description: "T-Shirt mockup design",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGftwXX24k/DxQZRpuu2QF28dwCzu53GA/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["T-Shirt Design"]
        }
      },
      {
        title: "Menu Infographic",
        description: "Infographic for a menu",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGfXNxC7lQ/ykvstvaTAhJHQV5g2GaoEA/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Infographic"]
        }
      },
      {
        title: "Stella Solutions Brochure",
        description: "Brochure for Stella Solutions",
        category: "digital-marketing",
        embedUrl: "https://www.canva.com/design/DAGezdLJ7aM/2KY7XDO42ohON27Ny9_bxg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Brochure"]
        }
      },
      {
        title: "Social Media Marketing Plan",
        description: "Social media marketing plan presentation",
        category: "digital-marketing",
        embedUrl: "https://www.canva.com/design/DAGfXK4U_DA/XxTCM4o7TViA12DFCbePrQ/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 month",
          deliverables: ["Presentation"]
        }
      },
      {
        title: "Project Management Plan - Rossette",
        description: "Project management plan presentation",
        category: "virtual-assistance",
        embedUrl: "https://www.canva.com/design/DAGfX83iwp8/dqvSxKL7NIpeTR37sREw0w/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 month",
          deliverables: ["Presentation"]
        }
      },
      {
        title: "Travel Itinerary",
        description: "Travel itinerary presentation",
        category: "virtual-assistance",
        embedUrl: "https://docs.google.com/presentation/d/e/2PACX-1vSofcngmO4YIfjFxSiWctAMbN6GBXYppG-fNgXQ32A_tyRDKrbjwvkfDX2q-0zLksIUpfhRI2SaxVGV/embed?start=true&loop=true&delayms=3000",
        details: {
          tools: ["Canva"],
          duration: "1 month",
          deliverables: ["Presentation"]
        }
      }
    ];

    sampleProjects.forEach(project => {
      const id = this.projectId++;
      this.projects.set(id, { ...project, id });
    });
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.contactId++;
    const newContact = {
      ...contact,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.category === category
    );
  }
}

export const storage = new MemStorage();
