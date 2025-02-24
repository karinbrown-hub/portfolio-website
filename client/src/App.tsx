import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter"; // Removed useHashLocation
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "@/components/Navigation";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import ProjectDetails from "@/pages/ProjectDetails";
import NotFound from "@/pages/not-found";

function Router() {
  const [location, setLocation] = useLocation();

  // Handle hash-based routing
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const path = hash.replace("#", "");
      setLocation(path);
    }
  }, [setLocation]);

  // Handle redirect from 404.html
  useEffect(() => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location) {
      setLocation(redirect);
    }
  }, [location, setLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/portfolio" component={Portfolio} />
          <Route path="/portfolio/:id" component={ProjectDetails} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;