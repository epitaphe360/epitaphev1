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
// CMS Dashboard imports
import { DashboardLayout } from "../../cms-dashboard/layouts/DashboardLayout";
import { LoginPage } from "../../cms-dashboard/pages/LoginPage";
import { DashboardPage } from "../../cms-dashboard/pages/DashboardPage";
import MenuManagement from "../../cms-dashboard/pages/menu/MenuManagement";
import BlogManagement from "../../cms-dashboard/pages/blog/BlogManagement";
import PageManagement from "../../cms-dashboard/pages/website/PageManagement";
import SolutionManagement from "../../cms-dashboard/pages/solutions/SolutionManagement";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nos-references" component={ReferencesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogArticlePage} />
      <Route path="/solutions/:slug" component={SolutionPage} />
      
      {/* CMS Admin Routes */}
      <Route path="/admin/login" component={LoginPage} />
      <Route path="/admin">
        {() => (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/menus">
        {() => (
          <DashboardLayout>
            <MenuManagement />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/blog">
        {() => (
          <DashboardLayout>
            <BlogManagement />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/pages">
        {() => (
          <DashboardLayout>
            <PageManagement />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/solutions">
        {() => (
          <DashboardLayout>
            <SolutionManagement />
          </DashboardLayout>
        )}
      </Route>
      
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
