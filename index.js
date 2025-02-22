// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  contacts;
  projects;
  contactId;
  projectId;
  constructor() {
    this.contacts = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.contactId = 1;
    this.projectId = 1;
    this.initializeProjects();
  }
  initializeProjects() {
    const sampleProjects = [
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
        title: "Coming Soon Instagram Post",
        description: "Coming soon announcement post",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGezW1a_v0/0RgATBKDT0sf1W0JIs50hg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Instagram Post"]
        }
      },
      {
        title: "Modern Fashion Product",
        description: "Modern fashion product announcement post",
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
        description: "T-Shirt mockup design variation",
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
        description: "Infographic design for menu",
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
        description: "Trifold brochure for Stella Solutions",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGezdLJ7aM/2KY7XDO42ohON27Ny9_bxg/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Brochure"]
        }
      },
      {
        title: "Furaha Travel and Tour Brochure",
        description: "A4 brochure for Furaha Travel and Tour",
        category: "graphic-design",
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
        category: "graphic-design",
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
        category: "graphic-design",
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
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGft-rzzDM/vbP3-AvNguxgcBAYzEzo3A/view?embed",
        details: {
          tools: ["Canva"],
          duration: "1 week",
          deliverables: ["Logo"]
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
          tools: ["Google Slides"],
          duration: "1 week",
          deliverables: ["Presentation"]
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
        title: "Brand Guidelines",
        description: "Synergy Labs brand guidelines",
        category: "graphic-design",
        embedUrl: "https://www.canva.com/design/DAGfV9Xpkww/2N6IP8-Q5ikWfvm5u_E1gw/view?embed",
        details: {
          tools: ["Canva"],
          duration: "2 weeks",
          deliverables: ["Brand Guidelines"]
        }
      }
    ];
    sampleProjects.forEach((project) => {
      const id = this.projectId++;
      this.projects.set(id, { ...project, id });
    });
  }
  async createContact(contact) {
    const id = this.contactId++;
    const newContact = {
      ...contact,
      id,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }
  async getProjects() {
    return Array.from(this.projects.values());
  }
  async getProjectById(id) {
    return this.projects.get(id);
  }
  async getProjectsByCategory(category) {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  details: jsonb("details").notNull()
});
var insertContactSchema = createInsertSchema(contacts).omit({ id: true, createdAt: true });
var insertProjectSchema = createInsertSchema(projects).omit({ id: true });
var contactFormSchema = insertContactSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long")
});

// server/routes.ts
import { ZodError } from "zod";

// server/utils/mail.ts
import Mailjet from "node-mailjet";
console.log("MAILJET_API_KEY:", process.env.MAILJET_API_KEY);
if (!process.env.MAILJET_API_KEY) {
  throw new Error("MAILJET_API_KEY environment variable must be set");
}
var MAILJET_API_KEY = process.env.MAILJET_API_KEY.trim();
console.log("Raw API key length:", MAILJET_API_KEY.length);
console.log("Contains underscore:", MAILJET_API_KEY.includes("_"));
console.log("First few chars:", MAILJET_API_KEY.substring(0, 5));
if (!MAILJET_API_KEY.includes("_")) {
  throw new Error("MAILJET_API_KEY must be in format: API_KEY_API_SECRET (contains underscore)");
}
var [apiKey, apiSecret] = MAILJET_API_KEY.split("_");
if (!apiKey || !apiSecret) {
  throw new Error(`Invalid MAILJET_API_KEY format. Expected format: API_KEY_API_SECRET, got key length: ${apiKey?.length || 0}, secret length: ${apiSecret?.length || 0}`);
}
console.log(`API Key length: ${apiKey.length}, Secret length: ${apiSecret.length}`);
var mailjet = new Mailjet({
  apiKey,
  apiSecret
});
console.log("Mailjet client initialized successfully");
async function sendEmail(params) {
  try {
    console.log("Sending email with params:", {
      to: params.to,
      subject: params.subject
      // Log other relevant details
    });
    const result = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "alexanja464@gmail.com",
            Name: "Portfolio Contact Form"
          },
          To: [
            {
              Email: "karinlawrencebrown@gmail.com"
            }
          ],
          Subject: params.subject,
          TextPart: params.text,
          HTMLPart: params.html || params.text
        }
      ]
    });
    console.log("Mailjet API Response:", result.response.data);
    return result.response.status === 200;
  } catch (error) {
    console.error("Mailjet error details:", {
      message: error.message,
      statusCode: error.statusCode,
      errorInfo: error.response?.data
    });
    return false;
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      console.log("Contact form submission:", JSON.stringify(validatedData, null, 2));
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
        console.error("Failed to send email notification");
        return res.status(500).json({ message: "Failed to send email notification" });
      }
      res.json(contact);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });
  app2.get("/api/projects", async (req, res) => {
    try {
      const category = req.query.category;
      const projects2 = category ? await storage.getProjectsByCategory(category) : await storage.getProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  base: "/portfolio-website/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  // Set root to the client folder
  build: {
    outDir: path.resolve(__dirname, "dist"),
    // Output to the dist folder
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5001;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
