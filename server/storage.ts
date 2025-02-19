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

    // Initialize with sample projects
    this.initializeProjects();
  }

  private initializeProjects() {
    const sampleProjects: Omit<Project, "id">[] = [
      {
        title: "Brand Identity Design",
        description: "Complete brand redesign for a tech startup",
        category: "graphic-design",
        imageUrl: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
        details: {
          tools: ["Adobe Illustrator", "Photoshop"],
          duration: "2 months",
          deliverables: ["Logo", "Brand Guidelines", "Marketing Materials"]
        }
      },
      {
        title: "E-commerce Website",
        description: "Full-stack e-commerce solution with modern UI",
        category: "web-development",
        imageUrl: "https://images.unsplash.com/photo-1661956602116-aa6865609028",
        details: {
          tools: ["React", "Node.js", "PostgreSQL"],
          duration: "3 months",
          deliverables: ["Website", "Admin Dashboard", "API Documentation"]
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
