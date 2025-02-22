import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendEmail } from "./utils/mail";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);

      // Log the full contents of the contact form
      console.log("Contact form submission:", JSON.stringify(validatedData, null, 2));

      // Send email notification
      const emailResult = await sendEmail({
        to: "karinlawrencebrown@gmail.com",
        subject: "Contact Form Submission",
        text: `
Contact form submission:

Name: ${validatedData.name}
Email: ${validatedData.email}
Message: ${validatedData.message}
        `,
        html: `
<h2>Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Message:</strong> ${validatedData.message}</p>
        `
      });

      if (!emailResult) {
        console.error('Failed to send email notification');
        return res.status(500).json({ message: "Failed to send email notification" });
      }

      res.json(contact);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const projects = category 
        ? await storage.getProjectsByCategory(category)
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}