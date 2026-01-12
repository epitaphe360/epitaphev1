import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import ReferencesPage from "@/pages/references";
import BlogPage from "@/pages/blog";
import BlogArticlePage from "@/pages/blog-article";
import SolutionPage from "@/pages/solution";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nos-references" component={ReferencesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogArticlePage} />
      <Route path="/solutions/:slug" component={SolutionPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="epitaphe-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
