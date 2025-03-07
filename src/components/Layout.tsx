
import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <div className="fixed inset-0 bg-gradient-radial from-transparent to-accent/10 -z-10" />
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {children}
      </main>
      <footer className="py-8 border-t border-border/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Document Fetcher for Maharashtra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
