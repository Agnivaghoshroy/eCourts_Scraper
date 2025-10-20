import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { CauseListForm } from './components/CauseListForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Toaster } from './components/ui/sonner';
import { Card } from './components/ui/card';
import { Scale, Sparkles, Shield, Zap, ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';

export interface CauseListResult {
  caseNumber: string;
  serialNumber: string;
  courtName: string;
  listingDate: string;
  pdfUrl?: string;
}

export default function App() {
  const [showApp, setShowApp] = useState(false);
  const [results, setResults] = useState<CauseListResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Show landing page if not entered app yet
  if (!showApp) {
    return <LandingPage onEnterApp={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <Toaster />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
                  <Scale className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-white bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  eCourts India Cause List Scraper
                </h1>
                <p className="text-blue-200/80 text-sm mt-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Real-time court listings and cause list downloads
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApp(false)}
                className="text-blue-400 hover:text-blue-300 hover:bg-white/10 transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/80 text-sm">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <CauseListForm 
              onResults={setResults} 
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <ResultsDisplay results={results} loading={loading} />
          </div>
        </div>

        {/* Info Section */}
        <Card className="mt-12 p-8 bg-gradient-to-br from-blue-950/50 to-purple-950/50 border border-blue-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-blue-400/30 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white">How It Works</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Zap, text: 'Select State, District, Court Complex, and Court Name from cascading dropdowns' },
                { icon: Sparkles, text: 'Choose a date to fetch the cause list' },
                { icon: Scale, text: 'Download individual court cause lists or all courts in a complex' },
                { icon: Shield, text: 'All data is fetched in real-time from eCourts India services' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <item.icon className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-200/90 text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative mt-20 py-8 border-t border-white/10 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-blue-200/60 text-sm">
            Data source: <a href="https://services.ecourts.gov.in/ecourtindia_v6/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline">eCourts India</a>
          </p>
          <p className="mt-2 text-blue-200/40 text-sm">This tool is for educational and informational purposes only</p>
        </div>
      </footer>
    </div>
  );
}
