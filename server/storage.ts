import { contacts, projects, type Contact, type InsertContact, type Project } from "@shared/schema";

export interface IStorage {
  createContact(contact: InsertContact): Promise<Contact>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
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
        embedUrl: "https://www.canva.com/design/DAGeza57pg0/mrQzHX6QQDajyFz6ATZcGw/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Instagram Post"]
        }
      },
      {
        title: "Modern Fashion Product Instagram Post",
        description: "Modern new fashion product announcement instagram post",
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
        embedUrl: "https://www.canva.com/design/DAGftwXX24k/DxQZRpuu2QF28dwCzu53GA/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["T-Shirt Design"]
        }
      },
      {
        title: "Menu Infographic",
        description: "Menu infographic design",
        embedUrl: "https://www.canva.com/design/DAGfXNxC7lQ/ykvstvaTAhJHQV5g2GaoEA/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Infographic"]
        }
      },
      {
        title: "Stella Solutions Brochure",
        description: "Stella Solutions Trifold Brochure",
        embedUrl: "https://www.canva.com/design/DAGezdLJ7aM/2KY7XDO42ohON27Ny9_bxg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Brochure"]
        }
      },
      {
        title: "Furaha Travel and Tour Brochure",
        description: "Furaha Travel And Tour A4 Brochure",
        embedUrl: "https://www.canva.com/design/DAGezMlJwSc/0gKBN-SQ8L8o3nVqzUkHyg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Brochure"]
        }
      },
      {
        title: "Synergy Logo",
        description: "Logo design for Synergy",
        embedUrl: "https://www.canva.com/design/DAGft_fDTR4/2gajDDQJ4BBZmrabul0dXg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Logo"]
        }
      },
      {
        title: "Fusionist Logo",
        description: "Logo design for Fusionist",
        embedUrl: "https://www.canva.com/design/DAGft-B45Q4/uzx-4W6yIZZS0-449l6Orw/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Logo"]
        }
      },
      {
        title: "The Creative Hub Logo",
        description: "Logo design for The Creative Hub",
        embedUrl: "https://www.canva.com/design/DAGft-rzzDM/vbP3-AvNguxgcBAYzEzo3A/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Logo"]
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
}

export const storage = new MemStorage();