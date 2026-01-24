import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export function serveStatic(app: Express) {
  // Handle both ESM and CJS contexts
  let basePath: string;
  
  // Try multiple possible paths for the public directory
  const possiblePaths = [
    path.resolve(process.cwd(), "dist", "public"),           // Railway: /app/dist/public
    path.resolve(process.cwd(), "public"),                   // Alternative
    path.join(__dirname, "public"),                          // Relative to script
    path.join(__dirname, "..", "public"),                    // One level up
  ];
  
  const distPath = possiblePaths.find(p => fs.existsSync(p));
  
  if (!distPath) {
    console.error('❌ Could not find public directory. Tried:', possiblePaths);
    console.error('📁 Current working directory:', process.cwd());
    console.error('📁 __dirname:', __dirname);
    throw new Error(
      `Could not find the build directory. Tried: ${possiblePaths.join(', ')}`,
    );
  }
  
  console.log('✅ Serving static files from:', distPath);

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
