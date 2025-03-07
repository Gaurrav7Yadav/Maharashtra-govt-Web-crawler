import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, ArrowRight, Download, DownloadCloud, FileDown } from "lucide-react";
import { downloadDocuments } from "@/utils/downloadService";
import ProgressIndicator from "./ProgressIndicator";

const DUMMY_DISTRICTS = [
  "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", 
  "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", 
  "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", 
  "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", 
  "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", 
  "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
];

const YEARS = Array.from({ length: 24 }, (_, i) => (2000 + i).toString());

const DocumentForm = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [downloadedDocuments, setDownloadedDocuments] = useState(0);
  
  const [formData, setFormData] = useState({
    district: "",
    taluka: "",
    village: "",
    year: new Date().getFullYear().toString(),
    documentNumberStart: "",
    documentNumberEnd: "",
    downloadType: "range" as "range" | "single" | "all",
  });
  
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const nextStep = () => {
    if (step === 1 && !formData.district) {
      toast({
        title: "District Required",
        description: "Please select a district to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step === 2) {
      if (!formData.taluka || !formData.village) {
        toast({
          title: "Missing Information",
          description: "Please enter both taluka and village to continue.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setStep((prev) => prev + 1);
  };
  
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.downloadType === "range" && 
        (!formData.documentNumberStart || !formData.documentNumberEnd)) {
      toast({
        title: "Document Numbers Required",
        description: "Please enter both start and end document numbers.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.downloadType === "single" && !formData.documentNumberStart) {
      toast({
        title: "Document Number Required",
        description: "Please enter a document number.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      let total = 0;
      if (formData.downloadType === "range") {
        total = parseInt(formData.documentNumberEnd) - parseInt(formData.documentNumberStart) + 1;
      } else if (formData.downloadType === "single") {
        total = 1;
      } else {
        total = 50;
      }
      
      setTotalDocuments(total);
      
      toast({
        title: "Download Started",
        description: `Preparing to download ${total} documents. Files will appear in your downloads folder.`,
      });
      
      const result = await downloadDocuments(
        formData,
        (downloaded, total) => {
          setDownloadedDocuments(downloaded);
          setProgress(Math.floor((downloaded / total) * 100));
          
          if (total > 5 && downloaded % 5 === 0 && downloaded < total) {
            toast({
              title: "Download Progress",
              description: `${downloaded} of ${total} documents downloaded.`,
            });
          }
        }
      );
      
      toast({
        title: "Download Complete",
        description: `Successfully downloaded ${result.count} documents to your downloads folder.`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setStep(1);
      setProgress(0);
      setTotalDocuments(0);
      setDownloadedDocuments(0);
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Select
                value={formData.district}
                onValueChange={(value) => handleChange("district", value)}
              >
                <SelectTrigger id="district" className="w-full">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  {DUMMY_DISTRICTS.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select
                value={formData.year}
                onValueChange={(value) => handleChange("year", value)}
              >
                <SelectTrigger id="year" className="w-full">
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label htmlFor="taluka">Taluka</Label>
              <Input
                id="taluka"
                placeholder="Enter Taluka Name"
                value={formData.taluka}
                onChange={(e) => handleChange("taluka", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="village">Village</Label>
              <Input
                id="village"
                placeholder="Enter Village Name"
                value={formData.village}
                onChange={(e) => handleChange("village", e.target.value)}
              />
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2">
              <Label>Download Type</Label>
              <RadioGroup
                value={formData.downloadType}
                onValueChange={(value: "range" | "single" | "all") => 
                  handleChange("downloadType", value)
                }
                className="grid grid-cols-1 gap-4 pt-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="range" id="range" />
                  <Label htmlFor="range" className="flex-1 cursor-pointer">Document Number Range</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="flex-1 cursor-pointer">Single Document</Label>
                </div>
                <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="flex-1 cursor-pointer">All Documents for Selected Year</Label>
                </div>
              </RadioGroup>
            </div>
            
            {formData.downloadType === "range" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="docStart">Start Document Number</Label>
                  <Input
                    id="docStart"
                    type="number"
                    placeholder="e.g. 1"
                    value={formData.documentNumberStart}
                    onChange={(e) => handleChange("documentNumberStart", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="docEnd">End Document Number</Label>
                  <Input
                    id="docEnd"
                    type="number"
                    placeholder="e.g. 100"
                    value={formData.documentNumberEnd}
                    onChange={(e) => handleChange("documentNumberEnd", e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {formData.downloadType === "single" && (
              <div className="space-y-2">
                <Label htmlFor="docSingle">Document Number</Label>
                <Input
                  id="docSingle"
                  type="number"
                  placeholder="e.g. 42"
                  value={formData.documentNumberStart}
                  onChange={(e) => handleChange("documentNumberStart", e.target.value)}
                />
              </div>
            )}
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-accent/50 p-4 rounded-lg border border-border">
              <h3 className="font-medium mb-4">Review Your Information</h3>
              <dl className="space-y-2 text-sm">
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">District:</dt>
                  <dd className="font-medium">{formData.district}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Taluka:</dt>
                  <dd className="font-medium">{formData.taluka}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Village:</dt>
                  <dd className="font-medium">{formData.village}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Year:</dt>
                  <dd className="font-medium">{formData.year}</dd>
                </div>
                <div className="grid grid-cols-2">
                  <dt className="text-muted-foreground">Download Type:</dt>
                  <dd className="font-medium capitalize">{formData.downloadType}</dd>
                </div>
                
                {formData.downloadType === "range" && (
                  <>
                    <div className="grid grid-cols-2">
                      <dt className="text-muted-foreground">Document Range:</dt>
                      <dd className="font-medium">
                        {formData.documentNumberStart} to {formData.documentNumberEnd}
                      </dd>
                    </div>
                  </>
                )}
                
                {formData.downloadType === "single" && (
                  <div className="grid grid-cols-2">
                    <dt className="text-muted-foreground">Document Number:</dt>
                    <dd className="font-medium">{formData.documentNumberStart}</dd>
                  </div>
                )}
              </dl>
            </div>
            
            {isLoading && (
              <ProgressIndicator 
                progress={progress} 
                downloaded={downloadedDocuments}
                total={totalDocuments}
              />
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const renderStepIndicator = () => {
    return (
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4].map((stepNumber) => (
          <div
            key={stepNumber}
            className={`flex flex-col items-center ${
              stepNumber < step
                ? "text-primary"
                : stepNumber === step
                ? "text-foreground"
                : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-2 transition-all ${
                stepNumber < step
                  ? "bg-primary border-primary text-primary-foreground"
                  : stepNumber === step
                  ? "border-primary"
                  : "border-muted"
              }`}
            >
              {stepNumber}
            </div>
            <span className="text-xs font-medium hidden sm:block">
              {stepNumber === 1
                ? "Location"
                : stepNumber === 2
                ? "Details"
                : stepNumber === 3
                ? "Documents"
                : "Review"}
            </span>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <section id="document-form" className="py-10">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-6 md:p-8 backdrop-blur-card bg-background/70 shadow-lg border border-border/50">
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Document Fetcher</h2>
                <p className="text-muted-foreground">
                  Enter information to download Index-II documents
                </p>
              </div>
              
              {renderStepIndicator()}
              
              {renderStepContent()}
              
              <div className="flex justify-between pt-4">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <DownloadCloud className="mr-2 h-4 w-4 animate-bounce" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <FileDown className="mr-2 h-4 w-4" />
                        Start Download
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default DocumentForm;
