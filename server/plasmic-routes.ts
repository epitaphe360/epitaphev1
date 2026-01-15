import { Router } from "express";
import type { Express } from "express";

interface GrapesPage {
  id: string;
  name: string;
  path: string;
  html: string;
  css: string;
  status: "draft" | "published";
  lastModified: string;
}

// Base de données en mémoire (à remplacer par votre vraie DB)
let grapesPages: GrapesPage[] = [];

export function registerGrapesRoutes(app: Express) {
  const router = Router();

  // Lister toutes les pages
  router.get("/pages", (req, res) => {
    res.json(grapesPages);
  });

  // Obtenir une page spécifique
  router.get("/pages/:id", (req, res) => {
    const { id } = req.params;
    const page = grapesPages.find((p) => p.id === id);
    
    if (!page) {
      return res.status(404).json({ error: "Page non trouvée" });
    }

    res.json(page);
  });

  // Créer une nouvelle page
  router.post("/pages", (req, res) => {
    const newPage: GrapesPage = {
      id: Date.now().toString(),
      html: "",
      css: "",
      ...req.body,
      lastModified: new Date().toISOString(),
    };
    grapesPages.push(newPage);
    res.status(201).json(newPage);
  });

  // Mettre à jour une page
  router.put("/pages/:id", (req, res) => {
    const { id } = req.params;
    const index = grapesPages.findIndex((p) => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: "Page non trouvée" });
    }

    grapesPages[index] = {
      ...grapesPages[index],
      ...req.body,
      lastModified: new Date().toISOString(),
    };

    res.json(grapesPages[index]);
  });

  // Supprimer une page
  router.delete("/pages/:id", (req, res) => {
    const { id } = req.params;
    const index = grapesPages.findIndex((p) => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: "Page non trouvée" });
    }

    grapesPages.splice(index, 1);
    res.status(204).send();
  });

  // Obtenir une page par son chemin
  router.get("/pages/by-path", (req, res) => {
    const { path } = req.query;
    const page = grapesPages.find((p) => p.path === path && p.status === "published");
    
    if (!page) {
      return res.status(404).json({ error: "Page non trouvée" });
    }

    res.json(page);
  });

  app.use("/api/grapes", router);
}
