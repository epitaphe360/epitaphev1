import type { Express } from "express";
import type { PageContent, BlogPost, Solution, NavigationStructure, MenuLink } from "../cms-dashboard/types/website-types";

// Temporary in-memory storage (replace with actual database)
const mockData = {
  pages: [] as PageContent[],
  posts: [] as BlogPost[],
  solutions: [] as Solution[],
  navigations: [] as NavigationStructure[]
};

export function registerAdminRoutes(app: Express) {
  // Authentication middleware (simplified)
  const requireAuth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    // TODO: Implement proper JWT verification
    if (!token) {
      return res.status(401).json({ error: 'Token manquant' });
    }
    next();
  };

  // ========================
  // PAGES MANAGEMENT
  // ========================
  
  // Get all pages
  app.get('/api/admin/pages', requireAuth, (req, res) => {
    res.json(mockData.pages);
  });

  // Get page by ID
  app.get('/api/admin/pages/:id', requireAuth, (req, res) => {
    const page = mockData.pages.find(p => p.id === req.params.id);
    if (!page) return res.status(404).json({ error: 'Page non trouvée' });
    res.json(page);
  });

  // Create page
  app.post('/api/admin/pages', requireAuth, (req, res) => {
    const newPage: PageContent = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockData.pages.push(newPage);
    res.status(201).json(newPage);
  });

  // Update page
  app.put('/api/admin/pages/:id', requireAuth, (req, res) => {
    const index = mockData.pages.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Page non trouvée' });
    
    mockData.pages[index] = {
      ...mockData.pages[index],
      ...req.body,
      updatedAt: new Date()
    };
    res.json(mockData.pages[index]);
  });

  // Update page status
  app.put('/api/admin/pages/:id/status', requireAuth, (req, res) => {
    const index = mockData.pages.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Page non trouvée' });
    
    mockData.pages[index].status = req.body.status;
    mockData.pages[index].updatedAt = new Date();
    res.json(mockData.pages[index]);
  });

  // Delete page
  app.delete('/api/admin/pages/:id', requireAuth, (req, res) => {
    const index = mockData.pages.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Page non trouvée' });
    
    mockData.pages.splice(index, 1);
    res.json({ success: true });
  });

  // ========================
  // BLOG MANAGEMENT
  // ========================
  
  // Get all posts
  app.get('/api/admin/posts', requireAuth, (req, res) => {
    let posts = mockData.posts;
    
    if (req.query.status && req.query.status !== 'all') {
      posts = posts.filter(p => p.status === req.query.status);
    }
    
    res.json(posts);
  });

  // Create post
  app.post('/api/admin/posts', requireAuth, (req, res) => {
    const newPost: BlogPost = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockData.posts.push(newPost);
    res.status(201).json(newPost);
  });

  // Update post
  app.put('/api/admin/posts/:id', requireAuth, (req, res) => {
    const index = mockData.posts.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Article non trouvé' });
    
    mockData.posts[index] = {
      ...mockData.posts[index],
      ...req.body,
      updatedAt: new Date()
    };
    res.json(mockData.posts[index]);
  });

  // Update post status
  app.put('/api/admin/posts/:id/status', requireAuth, (req, res) => {
    const index = mockData.posts.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Article non trouvé' });
    
    mockData.posts[index].status = req.body.status;
    mockData.posts[index].updatedAt = new Date();
    res.json(mockData.posts[index]);
  });

  // Delete post
  app.delete('/api/admin/posts/:id', requireAuth, (req, res) => {
    const index = mockData.posts.findIndex(p => p.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Article non trouvé' });
    
    mockData.posts.splice(index, 1);
    res.json({ success: true });
  });

  // ========================
  // SOLUTIONS MANAGEMENT
  // ========================
  
  // Get all solutions
  app.get('/api/admin/solutions', requireAuth, (req, res) => {
    res.json(mockData.solutions.sort((a, b) => a.order - b.order));
  });

  // Get solution categories
  app.get('/api/admin/solutions/categories', requireAuth, (req, res) => {
    const categories = [...new Set(mockData.solutions.map(s => s.category))];
    res.json(categories);
  });

  // Create solution
  app.post('/api/admin/solutions', requireAuth, (req, res) => {
    const newSolution: Solution = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockData.solutions.push(newSolution);
    res.status(201).json(newSolution);
  });

  // Update solution
  app.put('/api/admin/solutions/:id', requireAuth, (req, res) => {
    const index = mockData.solutions.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Solution non trouvée' });
    
    mockData.solutions[index] = {
      ...mockData.solutions[index],
      ...req.body,
      updatedAt: new Date()
    };
    res.json(mockData.solutions[index]);
  });

  // Update solution status
  app.put('/api/admin/solutions/:id/status', requireAuth, (req, res) => {
    const index = mockData.solutions.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Solution non trouvée' });
    
    mockData.solutions[index].isActive = req.body.isActive;
    mockData.solutions[index].updatedAt = new Date();
    res.json(mockData.solutions[index]);
  });

  // Delete solution
  app.delete('/api/admin/solutions/:id', requireAuth, (req, res) => {
    const index = mockData.solutions.findIndex(s => s.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Solution non trouvée' });
    
    mockData.solutions.splice(index, 1);
    res.json({ success: true });
  });

  // ========================
  // NAVIGATION MANAGEMENT
  // ========================
  
  // Get all navigations
  app.get('/api/admin/navigations', requireAuth, (req, res) => {
    res.json(mockData.navigations);
  });

  // Create navigation
  app.post('/api/admin/navigations', requireAuth, (req, res) => {
    const newNavigation: NavigationStructure = {
      ...req.body,
      id: Date.now().toString(),
      updatedAt: new Date()
    };
    mockData.navigations.push(newNavigation);
    res.status(201).json(newNavigation);
  });

  // Update navigation
  app.put('/api/admin/navigations/:id', requireAuth, (req, res) => {
    const index = mockData.navigations.findIndex(n => n.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Navigation non trouvée' });
    
    mockData.navigations[index] = {
      ...mockData.navigations[index],
      ...req.body,
      updatedAt: new Date()
    };
    res.json(mockData.navigations[index]);
  });

  // Delete navigation
  app.delete('/api/admin/navigations/:id', requireAuth, (req, res) => {
    const index = mockData.navigations.findIndex(n => n.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Navigation non trouvée' });
    
    mockData.navigations.splice(index, 1);
    res.json({ success: true });
  });

  // ========================
  // AUTHENTICATION
  // ========================
  
  // Login
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    
    // TODO: Implement proper authentication
    if (email === 'admin@epitaph.ma' && password === 'admin123') {
      const token = 'mock-jwt-token-' + Date.now();
      res.json({ 
        token, 
        user: { 
          id: '1', 
          email, 
          name: 'Admin', 
          role: 'ADMIN' 
        } 
      });
    } else {
      res.status(401).json({ error: 'Identifiants invalides' });
    }
  });

  // Get current user
  app.get('/api/admin/me', requireAuth, (req, res) => {
    res.json({ 
      id: '1', 
      email: 'admin@epitaph.ma', 
      name: 'Admin', 
      role: 'ADMIN' 
    });
  });

  // Initialize with sample data if empty
  if (mockData.navigations.length === 0) {
    mockData.navigations.push({
      id: '1',
      name: 'Navigation principale',
      location: 'header',
      isActive: true,
      updatedAt: new Date(),
      links: [
        { id: '1', label: 'A propos', href: '/', hash: '#about', hasSubmenu: false, order: 0, isActive: true },
        { id: '2', label: 'Nos métiers', href: '#', hasSubmenu: true, order: 1, isActive: true, submenu: [] },
        { id: '3', label: 'Nos solutions', href: '#', hasSubmenu: true, order: 2, isActive: true, submenu: [] },
        { id: '4', label: 'Nos références', href: '/nos-references', hasSubmenu: false, order: 3, isActive: true },
        { id: '5', label: 'Ressources', href: '/blog', hasSubmenu: false, order: 4, isActive: true },
        { id: '6', label: 'Contact', href: '/', hash: '#contact', hasSubmenu: false, order: 5, isActive: true }
      ]
    });
  }
}