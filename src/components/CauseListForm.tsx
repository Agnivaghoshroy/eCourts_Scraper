import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Download, Calendar, FileText, Loader2 } from 'lucide-react';
import { eCourtsAPI } from '../services/eCourtsAPI';
import type { CauseListResult } from '../App';

interface CauseListFormProps {
  onResults: (results: CauseListResult[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export function CauseListForm({ onResults, loading, setLoading }: CauseListFormProps) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedComplex, setSelectedComplex] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [downloadAll, setDownloadAll] = useState(false);

  const [states, setStates] = useState<Array<{ code: string; name: string }>>([]);
  const [districts, setDistricts] = useState<Array<{ code: string; name: string }>>([]);
  const [complexes, setComplexes] = useState<Array<{ code: string; name: string }>>([]);
  const [courts, setCourts] = useState<Array<{ code: string; name: string }>>([]);

  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingComplexes, setLoadingComplexes] = useState(false);
  const [loadingCourts, setLoadingCourts] = useState(false);

  // Fetch states on mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoadingStates(true);
        const data = await eCourtsAPI.getStates();
        setStates(data);
      } catch (error) {
        toast.error('Failed to fetch states');
        console.error(error);
      } finally {
        setLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  // Fetch districts when state changes
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict('');
      return;
    }

    const fetchDistricts = async () => {
      try {
        setLoadingDistricts(true);
        setSelectedDistrict('');
        setSelectedComplex('');
        setSelectedCourt('');
        const data = await eCourtsAPI.getDistricts(selectedState);
        setDistricts(data);
      } catch (error) {
        toast.error('Failed to fetch districts');
        console.error(error);
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, [selectedState]);

  // Fetch court complexes when district changes
  useEffect(() => {
    if (!selectedDistrict) {
      setComplexes([]);
      setSelectedComplex('');
      return;
    }

    const fetchComplexes = async () => {
      try {
        setLoadingComplexes(true);
        setSelectedComplex('');
        setSelectedCourt('');
        const data = await eCourtsAPI.getCourtComplexes(selectedState, selectedDistrict);
        setComplexes(data);
      } catch (error) {
        toast.error('Failed to fetch court complexes');
        console.error(error);
      } finally {
        setLoadingComplexes(false);
      }
    };
    fetchComplexes();
  }, [selectedState, selectedDistrict]);

  // Fetch courts when complex changes
  useEffect(() => {
    if (!selectedComplex) {
      setCourts([]);
      setSelectedCourt('');
      return;
    }

    const fetchCourts = async () => {
      try {
        setLoadingCourts(true);
        setSelectedCourt('');
        const data = await eCourtsAPI.getCourts(selectedState, selectedDistrict, selectedComplex);
        setCourts(data);
      } catch (error) {
        toast.error('Failed to fetch courts');
        console.error(error);
      } finally {
        setLoadingCourts(false);
      }
    };
    fetchCourts();
  }, [selectedState, selectedDistrict, selectedComplex]);

  const handleFetchCauseList = async () => {
    if (!selectedState || !selectedDistrict || !selectedComplex) {
      toast.error('Please select State, District, and Court Complex');
      return;
    }

    if (!downloadAll && !selectedCourt) {
      toast.error('Please select a Court or enable "Download All Courts"');
      return;
    }

    try {
      setLoading(true);
      
      if (downloadAll) {
        // Download all courts in the complex
        toast.info('Fetching cause lists for all courts in the complex...');
        const allResults = await eCourtsAPI.getCauseListForAllCourts(
          selectedState,
          selectedDistrict,
          selectedComplex,
          selectedDate
        );
        onResults(allResults);
        
        // Trigger PDF downloads
        for (const court of courts) {
          await eCourtsAPI.downloadCauseListPDF(
            selectedState,
            selectedDistrict,
            selectedComplex,
            court.code,
            selectedDate
          );
        }
        
        toast.success(`Downloaded ${courts.length} cause list(s) successfully`);
      } else {
        // Download single court
        toast.info('Fetching cause list...');
        const results = await eCourtsAPI.getCauseList(
          selectedState,
          selectedDistrict,
          selectedComplex,
          selectedCourt,
          selectedDate
        );
        onResults(results);
        
        // Trigger PDF download
        await eCourtsAPI.downloadCauseListPDF(
          selectedState,
          selectedDistrict,
          selectedComplex,
          selectedCourt,
          selectedDate
        );
        
        toast.success('Cause list downloaded successfully');
      }
    } catch (error) {
      toast.error('Failed to fetch cause list');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/90 border border-blue-500/20 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardTitle className="flex items-center gap-3 text-white relative">
          <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          Fetch Cause List
        </CardTitle>
        <CardDescription className="text-blue-200/70 relative">
          Select court details and date to download cause list
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 relative">
        {/* State Selector */}
        <div className="space-y-2 group/item">
          <Label htmlFor="state" className="text-blue-200 flex items-center gap-2">
            State
            <span className="text-blue-400/60 text-xs">*</span>
          </Label>
          <Select value={selectedState} onValueChange={setSelectedState} disabled={loadingStates}>
            <SelectTrigger id="state" className="bg-slate-900/50 border-blue-500/30 text-white hover:border-blue-400/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50">
              <SelectValue placeholder={loadingStates ? "Loading states..." : "Select State"} />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-blue-500/30">
              {states.map((state) => (
                <SelectItem key={state.code} value={state.code} className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District Selector */}
        <div className="space-y-2 group/item">
          <Label htmlFor="district" className="text-blue-200 flex items-center gap-2">
            District
            <span className="text-blue-400/60 text-xs">*</span>
          </Label>
          <Select 
            value={selectedDistrict} 
            onValueChange={setSelectedDistrict}
            disabled={!selectedState || loadingDistricts}
          >
            <SelectTrigger id="district" className="bg-slate-900/50 border-blue-500/30 text-white hover:border-blue-400/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50">
              <SelectValue placeholder={
                !selectedState ? "Select state first" :
                loadingDistricts ? "Loading districts..." :
                "Select District"
              } />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-blue-500/30">
              {districts.map((district) => (
                <SelectItem key={district.code} value={district.code} className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Court Complex Selector */}
        <div className="space-y-2 group/item">
          <Label htmlFor="complex" className="text-blue-200 flex items-center gap-2">
            Court Complex
            <span className="text-blue-400/60 text-xs">*</span>
          </Label>
          <Select 
            value={selectedComplex} 
            onValueChange={setSelectedComplex}
            disabled={!selectedDistrict || loadingComplexes}
          >
            <SelectTrigger id="complex" className="bg-slate-900/50 border-blue-500/30 text-white hover:border-blue-400/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50">
              <SelectValue placeholder={
                !selectedDistrict ? "Select district first" :
                loadingComplexes ? "Loading complexes..." :
                "Select Court Complex"
              } />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-blue-500/30">
              {complexes.map((complex) => (
                <SelectItem key={complex.code} value={complex.code} className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                  {complex.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Court Name Selector */}
        <div className="space-y-2 group/item">
          <Label htmlFor="court" className="text-blue-200 flex items-center gap-2">
            Court Name
            {!downloadAll && <span className="text-blue-400/60 text-xs">*</span>}
          </Label>
          <Select 
            value={selectedCourt} 
            onValueChange={setSelectedCourt}
            disabled={!selectedComplex || loadingCourts || downloadAll}
          >
            <SelectTrigger id="court" className="bg-slate-900/50 border-blue-500/30 text-white hover:border-blue-400/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50">
              <SelectValue placeholder={
                !selectedComplex ? "Select court complex first" :
                downloadAll ? "All courts selected" :
                loadingCourts ? "Loading courts..." :
                "Select Court"
              } />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-blue-500/30">
              {courts.map((court) => (
                <SelectItem key={court.code} value={court.code} className="text-white hover:bg-blue-500/20 focus:bg-blue-500/20">
                  {court.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Download All Checkbox */}
        <div className="flex items-center space-x-3 pt-3 px-4 py-3 rounded-lg bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/10 transition-all duration-300">
          <Checkbox 
            id="downloadAll" 
            checked={downloadAll}
            onCheckedChange={(checked) => setDownloadAll(checked as boolean)}
            disabled={!selectedComplex}
            className="border-blue-400/50 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label 
            htmlFor="downloadAll" 
            className="text-sm cursor-pointer text-blue-200/90 flex-1"
          >
            Download all courts in this complex
          </Label>
        </div>

        {/* Date Selector */}
        <div className="space-y-2 group/item">
          <Label htmlFor="date" className="flex items-center gap-2 text-blue-200">
            <Calendar className="w-4 h-4 text-blue-400" />
            Cause List Date
            <span className="text-blue-400/60 text-xs">*</span>
          </Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-900/50 border-blue-500/30 text-white hover:border-blue-400/50 transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 [color-scheme:dark]"
          />
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleFetchCauseList}
          disabled={loading || !selectedState || !selectedDistrict || !selectedComplex || (!selectedCourt && !downloadAll)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none group/btn mt-6 h-12"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
              Download Cause List PDF
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
