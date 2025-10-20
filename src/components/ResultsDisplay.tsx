import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { FileText, Download, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import type { CauseListResult } from '../App';
import { Alert, AlertDescription } from './ui/alert';

interface ResultsDisplayProps {
  results: CauseListResult[];
  loading: boolean;
}

export function ResultsDisplay({ results, loading }: ResultsDisplayProps) {
  const handleDownloadPDF = (pdfUrl?: string) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white">Cause List Results</CardTitle>
          <CardDescription className="text-blue-200/70">Fetching data from eCourts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
              <Loader2 className="w-16 h-16 text-blue-400 animate-spin relative" />
            </div>
            <p className="text-blue-200/80 mt-6">Loading cause list data...</p>
            <div className="flex gap-1 mt-4">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl hover:border-blue-400/30 transition-all duration-300 group">
        <CardHeader>
          <CardTitle className="text-white">Cause List Results</CardTitle>
          <CardDescription className="text-blue-200/70">Your results will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-all duration-300" />
              <div className="bg-blue-500/10 p-6 rounded-2xl mb-6 group-hover:bg-blue-500/20 transition-all duration-300 relative border border-blue-500/20">
                <FileText className="w-16 h-16 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
              </div>
            </div>
            <p className="text-blue-200/80">No results yet</p>
            <p className="text-blue-300/50 text-sm mt-2 max-w-xs">
              Select court details and fetch cause list to see results
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardTitle className="flex items-center justify-between text-white relative">
          <span className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            Cause List Results
          </span>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg">
            {results.length} cases
          </Badge>
        </CardTitle>
        <CardDescription className="text-blue-200/70 relative">
          Showing cause list entries for the selected court and date
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <Alert className="mb-6 bg-green-500/10 border-green-500/30 backdrop-blur-sm">
          <FileText className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-200/90">
            PDF files have been downloaded to your browser's download folder
          </AlertDescription>
        </Alert>

        <div className="border border-blue-500/20 rounded-xl overflow-hidden bg-slate-900/50 backdrop-blur-sm shadow-xl">
          <Table>
            <TableHeader>
              <TableRow className="border-blue-500/20 hover:bg-blue-500/5">
                <TableHead className="text-blue-300">S.No.</TableHead>
                <TableHead className="text-blue-300">Case Number</TableHead>
                <TableHead className="text-blue-300">Court Name</TableHead>
                <TableHead className="text-blue-300">Listing Date</TableHead>
                <TableHead className="text-right text-blue-300">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <TableRow 
                  key={index} 
                  className="border-blue-500/10 hover:bg-blue-500/10 transition-all duration-200 group/row"
                  style={{ 
                    animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both` 
                  }}
                >
                  <TableCell>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 hover:bg-blue-500/30 transition-colors">
                      {result.serialNumber}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white group-hover/row:text-blue-300 transition-colors">
                    {result.caseNumber}
                  </TableCell>
                  <TableCell className="text-sm text-blue-200/80 group-hover/row:text-blue-200 transition-colors">
                    {result.courtName}
                  </TableCell>
                  <TableCell className="text-sm text-blue-200/80 group-hover/row:text-blue-200 transition-colors">
                    {result.listingDate}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.pdfUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadPDF(result.pdfUrl)}
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 transition-all duration-200"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-sm text-blue-200/80">
            <strong className="text-blue-300">Note:</strong> This data is fetched in real-time from eCourts India services.
            PDF downloads are triggered automatically when available.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
