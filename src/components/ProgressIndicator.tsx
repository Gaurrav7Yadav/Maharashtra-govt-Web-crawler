
import { Progress } from "@/components/ui/progress";
import { FileCheck, Download, Globe, AlertCircle } from "lucide-react";

interface ProgressIndicatorProps {
  progress: number;
  downloaded: number;
  total: number;
}

const ProgressIndicator = ({ progress, downloaded, total }: ProgressIndicatorProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-2 flex justify-between text-sm">
        <span>Downloading documents...</span>
        <span>
          {downloaded} of {total} complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      
      <div className="mt-6 space-y-2">
        <div className="flex items-start space-x-3">
          <div className="bg-primary/10 rounded-full p-1 mt-0.5">
            {downloaded > 0 ? (
              <FileCheck className="h-4 w-4 text-primary" />
            ) : (
              <Globe className="h-4 w-4 text-primary animate-pulse" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">
              {downloaded > 0 ? (
                <>Document #{downloaded} downloaded</>
              ) : (
                <>Connecting to government website...</>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {downloaded > 0 ? (
                <>Files are being saved to your downloads folder</>
              ) : (
                <>Establishing connection to igrmaharashtra.gov.in</>
              )}
            </p>
          </div>
        </div>
        
        {downloaded > 0 && (
          <div className="mt-2 text-xs text-muted-foreground">
            <p>Download speed may vary based on your internet connection and government website response time.</p>
            <p className="mt-1">Your browser might show a notification about multiple downloads.</p>
            <p className="mt-1 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" /> 
              If downloads fail, try a smaller batch or check if the website requires login.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;
