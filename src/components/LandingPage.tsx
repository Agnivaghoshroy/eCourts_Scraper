import { Button } from './ui/button';
import { Card } from './ui/card';
import { Scale, FileText, Download, Calendar, Zap, Shield, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2.5 rounded-2xl">
                  <Scale className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  eCourts Scraper
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white/80 text-sm">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 group hover:bg-blue-500/20 transition-all duration-300">
              <Sparkles className="w-4 h-4 text-blue-400 group-hover:animate-pulse" />
              <span className="text-blue-200 text-sm">Real-time Court Data Access</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              eCourts India
            </h2>
            <h3 className="text-4xl md:text-6xl mb-8 text-white">
              Cause List Scraper
            </h3>
            
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Access and download cause lists from Indian eCourts in real-time. 
              Select your state, district, court complex, and get instant access to court listings with downloadable PDFs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={onEnterApp}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 h-14 px-8 text-lg group"
              >
                Launch Application
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-blue-500/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 h-14 px-8 text-lg"
                onClick={() => window.open('https://services.ecourts.gov.in/ecourtindia_v6/', '_blank')}
              >
                Visit eCourts India
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Scale,
                title: 'Court Selection',
                description: 'Cascading dropdowns for State, District, Court Complex, and Court Name selection',
                gradient: 'from-blue-500 to-cyan-500'
              },
              {
                icon: Calendar,
                title: 'Date Selection',
                description: 'Choose any date to fetch cause lists - today, tomorrow, or any future date',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                icon: Download,
                title: 'PDF Downloads',
                description: 'Download cause lists as PDF files for individual courts or entire complexes',
                gradient: 'from-cyan-500 to-blue-500'
              },
              {
                icon: FileText,
                title: 'Case Information',
                description: 'View case numbers, serial numbers, court names, and listing dates',
                gradient: 'from-pink-500 to-purple-500'
              },
              {
                icon: Zap,
                title: 'Real-time Data',
                description: 'All data fetched in real-time from eCourts India services',
                gradient: 'from-blue-500 to-purple-500'
              },
              {
                icon: Shield,
                title: 'Reliable Access',
                description: 'Direct access to official eCourts data with consistent availability',
                gradient: 'from-purple-500 to-cyan-500'
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-500/20 backdrop-blur-xl p-6 hover:border-blue-400/40 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity`} />
                  <div className={`relative bg-gradient-to-r ${feature.gradient} p-3 rounded-xl inline-block`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200/70 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* How It Works Section */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 border border-blue-500/20 backdrop-blur-xl p-8 mb-16 hover:border-blue-400/30 transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-3xl text-white mb-2">How It Works</h3>
              <p className="text-blue-200/70">Simple steps to access court cause lists</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '01', title: 'Select Location', description: 'Choose State, District, and Court Complex' },
                { step: '02', title: 'Pick Court', description: 'Select specific court or all courts in complex' },
                { step: '03', title: 'Choose Date', description: 'Select the date for cause list' },
                { step: '04', title: 'Download PDF', description: 'Get instant PDF downloads of cause lists' }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4 mx-auto w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
                      <span className="text-2xl text-white">{item.step}</span>
                    </div>
                  </div>
                  <h4 className="text-white mb-2">{item.title}</h4>
                  <p className="text-blue-200/70 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Benefits Section */}
          <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-500/20 backdrop-blur-xl p-8 hover:border-blue-400/30 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl text-white mb-6">Why Use This Tool?</h3>
                <div className="space-y-4">
                  {[
                    'Quick access to cause lists without navigating complex government websites',
                    'Download multiple court listings at once',
                    'User-friendly interface with cascading selections',
                    'Real-time data directly from eCourts India',
                    'PDF downloads for offline access',
                    'No registration or login required'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <p className="text-blue-200/90">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl" />
                <div className="relative bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                      <FileText className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-blue-200/90 text-lg mb-6">
                      Ready to access court cause lists?
                    </p>
                    <Button
                      onClick={onEnterApp}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 w-full h-12 group"
                    >
                      Get Started Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
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
