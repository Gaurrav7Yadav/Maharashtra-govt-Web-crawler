
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step } from "@/components/Steps";

const Help = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-10">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl font-bold animate-fade-in">How to Use Document Fetcher</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
            Learn how to efficiently download Index-II documents from the Maharashtra government website.
          </p>
        </div>

        <div className="space-y-12">
          <Card className="backdrop-blur-card animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Follow these steps to download Index-II documents from igrmaharashtra.gov.in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Steps>
                <Step number={1} title="Enter Location Details">
                  <p>
                    Select your district and the year from which you want to download documents. Choose carefully as this will filter the available documents.
                  </p>
                </Step>
                <Step number={2} title="Specify Area Information">
                  <p>
                    Enter the taluka and village name to narrow down your search. These fields are required for accurate document retrieval.
                  </p>
                </Step>
                <Step number={3} title="Choose Document Numbers">
                  <p>
                    Select whether you want to download a single document, a range of documents, or all documents from the selected year. 
                    If you select a range, specify the starting and ending document numbers.
                  </p>
                </Step>
                <Step number={4} title="Review and Download">
                  <p>
                    Verify your selection details and click "Start Download" to begin the process. The application will connect to the government website and download the requested documents.
                  </p>
                </Step>
              </Steps>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-card animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">What are Index-II documents?</h3>
                <p className="text-muted-foreground">
                  Index-II documents are official property records maintained by the Maharashtra government that contain details about property transactions, such as sales, leases, mortgages, etc.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Where are the downloaded files saved?</h3>
                <p className="text-muted-foreground">
                  Downloaded files are saved to your default browser download location. They are usually organized by district, taluka, and village in separate folders.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Can I download documents from multiple years at once?</h3>
                <p className="text-muted-foreground">
                  Currently, the system allows downloading documents from one year at a time. For documents from multiple years, you'll need to complete separate download operations.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">What if I get an error during download?</h3>
                <p className="text-muted-foreground">
                  If you encounter errors, check your internet connection and try again. The system will automatically retry failed downloads up to three times. If problems persist, try downloading a smaller batch of documents.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-card animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
            <CardHeader>
              <CardTitle>Tips for Efficient Document Retrieval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 list-disc pl-5">
                <li>Download documents in smaller batches (50-100) for more reliable results</li>
                <li>Save your frequently used locations for quicker access in future sessions</li>
                <li>Check your download folder regularly and organize downloaded documents</li>
                <li>Use a stable internet connection for uninterrupted downloads</li>
                <li>If you know the exact document number, use the single document option for faster retrieval</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
