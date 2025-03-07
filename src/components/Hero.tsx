
import { ArrowRight, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById("document-form");
    if (formElement) {
      window.scrollTo({
        top: formElement.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/50 border border-accent-foreground/10 text-sm font-medium text-accent-foreground/80 mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
            <FileDown className="w-4 h-4 mr-2" />
            Automated Document Retrieval
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            Effortless Maharashtra
            <br />
            <span className="text-primary">Document Downloads</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            Automate the process of retrieving Index-II documents from the
            Maharashtra government website with just a few clicks.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in opacity-0" style={{ animationDelay: "0.7s" }}>
            <Button size="lg" className="group" onClick={scrollToForm}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/help">
                Learn More
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
