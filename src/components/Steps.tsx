
import { ReactNode } from "react";

interface StepProps {
  number: number;
  title: string;
  children: ReactNode;
}

export const Step = ({ number, title, children }: StepProps) => {
  return (
    <div className="flex group">
      <div className="mr-4 flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-medium text-sm group-hover:scale-110 transition-transform">
          {number}
        </div>
        <div className="w-px h-full bg-border group-last:hidden mt-2" />
      </div>
      <div className="pb-8 pt-1">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
};

interface StepsProps {
  children: ReactNode;
}

export const Steps = ({ children }: StepsProps) => {
  return <div className="space-y-0">{children}</div>;
};
