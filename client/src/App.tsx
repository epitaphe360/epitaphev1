import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import DynamicPage from "@/pages/dynamic-page";
import ReferencesPage from "@/pages/references";
import BlogPage from "@/pages/blog";
import BlogArticlePage from "@/pages/blog-article";
import SolutionPage from "@/pages/solution";
import NotFound from "@/pages/not-found";
// CMS Dashboard imports
import { DashboardLayout } from "../../cms-dashboard/layouts/DashboardLayout";
import { NewLoginPage } from "../../cms-dashboard/pages/NewLoginPage";
import { DashboardPage } from "../../cms-dashboard/pages/DashboardPage";
import MenuManagement from "../../cms-dashboard/pages/menu/MenuManagement";
import BlogManagement from "../../cms-dashboard/pages/blog/BlogManagement";
import PageManagement from "../../cms-dashboard/pages/website/PageManagement";
import SolutionManagement from "../../cms-dashboard/pages/solutions/SolutionManagement";
import { ArticlesList } from "../../cms-dashboard/pages/articles";
import { ArticleForm } from "../../cms-dashboard/pages/articles";
import { EventsList } from "../../cms-dashboard/pages/events";
import { EventForm } from "../../cms-dashboard/pages/events";
import { PagesList } from "../../cms-dashboard/pages/pages";
import { PageForm } from "../../cms-dashboard/pages/pages";
import { MediaLibrary } from "../../cms-dashboard/pages/MediaLibrary";
import { CategoriesList } from "../../cms-dashboard/pages/categories";
import { UsersList } from "../../cms-dashboard/pages/users";
import { GeneralSettings, SEOSettings, IntegrationSettings } from "../../cms-dashboard/pages/settings";
import { VisualEditorManagement } from "../../cms-dashboard/pages/plasmic";
import GrapesJSEditor from "../../cms-dashboard/pages/plasmic/GrapesJSEditor";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/nos-references" component={ReferencesPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogArticlePage} />
      <Route path="/solutions/:slug" component={SolutionPage} />
      <Route path="/page/:slug" component={DynamicPage} />
      
      {/* CMS Admin Routes */}
      <Route path="/admin/login" component={NewLoginPage} />
      
      {/* Dashboard */}
      <Route path="/admin">
        {() => (
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Articles */}
      <Route path="/admin/articles">
        {() => (
          <DashboardLayout>
            <ArticlesList />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/articles/new">
        {() => (
          <DashboardLayout>
            <ArticleForm />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/articles/:id/edit">
        {(params) => (
          <DashboardLayout>
            <ArticleForm />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Events */}
      <Route path="/admin/events">
        {() => (
          <DashboardLayout>
            <EventsList />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/events/new">
        {() => (
          <DashboardLayout>
            <EventForm />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/events/:id/edit">
        {(params) => (
          <DashboardLayout>
            <EventForm />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Pages */}
      <Route path="/admin/pages">
        {() => (
          <DashboardLayout>
            <PagesList />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/pages/new">
        {() => (
          <DashboardLayout>
            <PageForm />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/pages/:id/edit">
        {(params) => (
          <DashboardLayout>
            <PageForm />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Visual Editor */}
      <Route path="/admin/visual-editor">
        {() => (
          <DashboardLayout>
            <VisualEditorManagement />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/visual-editor/edit/:pageId">
        {(params) => (
          <DashboardLayout>
            <GrapesJSEditor />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Media */}
      <Route path="/admin/media">
        {() => (
          <DashboardLayout>
            <MediaLibrary />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Categories */}
      <Route path="/admin/categories">
        {() => (
          <DashboardLayout>
            <CategoriesList />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Users */}
      <Route path="/admin/users">
        {() => (
          <DashboardLayout>
            <UsersList />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Settings */}
      <Route path="/admin/settings/general">
        {() => (
          <DashboardLayout>
            <GeneralSettings />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/settings/seo">
        {() => (
          <DashboardLayout>
            <SEOSettings />
          </DashboardLayout>
        )}
      </Route>
      <Route path="/admin/settings/integrations">
        {() => (
          <DashboardLayout>
            <IntegrationSettings />
          </DashboardLayout>
        )}
      </Route>
      
      {/* Legacy routes */}
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
