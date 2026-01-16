import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { registerAdminRoutes } from "./admin-routes";
import { db } from "./db";
import { pages, articles, events, categories, media } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ success: true, id: message.id });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid form data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // API publiques (alias pour /api/admin/*)
  // Pages
  app.get("/api/pages", async (req, res) => {
    try {
      const result = await db.select().from(pages);
      res.json({ data: result, total: result.length });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des pages' });
    }
  });

  // Articles
  app.get("/api/articles", async (req, res) => {
    try {
      const result = await db.select().from(articles);
      res.json({ data: result, total: result.length });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
    }
  });

  // Events
  app.get("/api/events", async (req, res) => {
    try {
      const result = await db.select().from(events);
      res.json({ data: result, total: result.length });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const result = await db.select().from(categories);
      res.json({ data: result, total: result.length });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
    }
  });

  // Media
  app.get("/api/media", async (req, res) => {
    try {
      const result = await db.select().from(media);
      res.json({ data: result, total: result.length });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des fichiers média' });
    }
  });

  // Register CMS admin routes
  registerAdminRoutes(app);

  return httpServer;
}
