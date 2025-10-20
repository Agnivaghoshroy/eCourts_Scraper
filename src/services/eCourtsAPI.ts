import type { CauseListResult } from '../App';

/**
 * eCourts India API Service
 * 
 * IMPORTANT: This is a demonstration implementation.
 * 
 * In a production environment, you would need:
 * 1. A backend proxy server to avoid CORS issues
 * 2. Proper API authentication if required by eCourts
 * 3. Rate limiting and error handling
 * 4. PDF generation/download handling
 * 
 * The eCourts website uses a complex form-based submission system.
 * Real implementation would require:
 * - Fetching CSRF tokens
 * - Maintaining session cookies
 * - Reverse engineering their API endpoints
 * - Handling captchas if present
 */

const BASE_URL = 'https://services.ecourts.gov.in/ecourtindia_v6';

// Mock data for demonstration
const MOCK_STATES = [
  { code: '1', name: 'Andhra Pradesh' },
  { code: '2', name: 'Arunachal Pradesh' },
  { code: '3', name: 'Assam' },
  { code: '4', name: 'Bihar' },
  { code: '5', name: 'Chhattisgarh' },
  { code: '6', name: 'Delhi' },
  { code: '7', name: 'Goa' },
  { code: '8', name: 'Gujarat' },
  { code: '9', name: 'Haryana' },
  { code: '10', name: 'Himachal Pradesh' },
  { code: '11', name: 'Jharkhand' },
  { code: '12', name: 'Karnataka' },
  { code: '13', name: 'Kerala' },
  { code: '14', name: 'Madhya Pradesh' },
  { code: '15', name: 'Maharashtra' },
  { code: '16', name: 'Manipur' },
  { code: '17', name: 'Meghalaya' },
  { code: '18', name: 'Mizoram' },
  { code: '19', name: 'Nagaland' },
  { code: '20', name: 'Odisha' },
  { code: '21', name: 'Punjab' },
  { code: '22', name: 'Rajasthan' },
  { code: '23', name: 'Sikkim' },
  { code: '24', name: 'Tamil Nadu' },
  { code: '25', name: 'Telangana' },
  { code: '26', name: 'Tripura' },
  { code: '27', name: 'Uttar Pradesh' },
  { code: '28', name: 'Uttarakhand' },
  { code: '29', name: 'West Bengal' },
];

const MOCK_DISTRICTS: Record<string, Array<{ code: string; name: string }>> = {
  '6': [
    { code: '6-1', name: 'Central Delhi' },
    { code: '6-2', name: 'East Delhi' },
    { code: '6-3', name: 'New Delhi' },
    { code: '6-4', name: 'North Delhi' },
    { code: '6-5', name: 'South Delhi' },
    { code: '6-6', name: 'West Delhi' },
  ],
  '15': [
    { code: '15-1', name: 'Mumbai City' },
    { code: '15-2', name: 'Mumbai Suburban' },
    { code: '15-3', name: 'Pune' },
    { code: '15-4', name: 'Thane' },
    { code: '15-5', name: 'Nagpur' },
  ],
};

const MOCK_COMPLEXES: Record<string, Array<{ code: string; name: string }>> = {
  '6-3': [
    { code: '6-3-1', name: 'Patiala House Courts Complex' },
    { code: '6-3-2', name: 'Tis Hazari Courts Complex' },
    { code: '6-3-3', name: 'Saket Courts Complex' },
    { code: '6-3-4', name: 'Karkardooma Courts Complex' },
    { code: '6-3-5', name: 'Rohini Courts Complex' },
  ],
  '15-3': [
    { code: '15-3-1', name: 'Shivajinagar Court Complex' },
    { code: '15-3-2', name: 'Civil Court Pune' },
  ],
};

const MOCK_COURTS: Record<string, Array<{ code: string; name: string }>> = {
  '6-3-1': [
    { code: '6-3-1-1', name: 'Court No. 1 - District Judge' },
    { code: '6-3-1-2', name: 'Court No. 2 - Additional District Judge' },
    { code: '6-3-1-3', name: 'Court No. 3 - Civil Judge' },
    { code: '6-3-1-4', name: 'Court No. 4 - Metropolitan Magistrate' },
    { code: '6-3-1-5', name: 'Court No. 5 - Special Court' },
  ],
  '6-3-2': [
    { code: '6-3-2-1', name: 'Court No. 1 - District Judge' },
    { code: '6-3-2-2', name: 'Court No. 2 - Additional Sessions Judge' },
    { code: '6-3-2-3', name: 'Court No. 3 - Civil Judge Senior Division' },
  ],
};

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate mock cause list data
const generateMockCauseList = (courtCode: string, date: string): CauseListResult[] => {
  const courtName = MOCK_COURTS[courtCode.split('-').slice(0, 4).join('-')]?.find(
    c => c.code === courtCode
  )?.name || 'Unknown Court';

  const caseTypes = ['CRL', 'CIV', 'FAM', 'ARB', 'COM'];
  const numberOfCases = Math.floor(Math.random() * 15) + 5;

  return Array.from({ length: numberOfCases }, (_, i) => ({
    caseNumber: `${caseTypes[Math.floor(Math.random() * caseTypes.length)]}/${Math.floor(Math.random() * 9000) + 1000}/${new Date(date).getFullYear()}`,
    serialNumber: (i + 1).toString(),
    courtName,
    listingDate: date,
    pdfUrl: `${BASE_URL}/cause_list_pdf?court=${courtCode}&date=${date}`,
  }));
};

export const eCourtsAPI = {
  /**
   * Fetch list of states
   */
  async getStates(): Promise<Array<{ code: string; name: string }>> {
    await delay(500);
    
    // In real implementation, this would be:
    // const response = await fetch(`${BASE_URL}/api/states`);
    // return await response.json();
    
    return MOCK_STATES;
  },

  /**
   * Fetch districts for a given state
   */
  async getDistricts(stateCode: string): Promise<Array<{ code: string; name: string }>> {
    await delay(600);
    
    // Generate mock districts if not in our predefined list
    if (!MOCK_DISTRICTS[stateCode]) {
      const stateName = MOCK_STATES.find(s => s.code === stateCode)?.name || 'Unknown';
      return [
        { code: `${stateCode}-1`, name: `${stateName} District 1` },
        { code: `${stateCode}-2`, name: `${stateName} District 2` },
        { code: `${stateCode}-3`, name: `${stateName} District 3` },
      ];
    }
    
    return MOCK_DISTRICTS[stateCode];
  },

  /**
   * Fetch court complexes for a given state and district
   */
  async getCourtComplexes(
    stateCode: string,
    districtCode: string
  ): Promise<Array<{ code: string; name: string }>> {
    await delay(700);
    
    if (!MOCK_COMPLEXES[districtCode]) {
      return [
        { code: `${districtCode}-1`, name: 'District Court Complex' },
        { code: `${districtCode}-2`, name: 'Sessions Court Complex' },
      ];
    }
    
    return MOCK_COMPLEXES[districtCode];
  },

  /**
   * Fetch courts for a given complex
   */
  async getCourts(
    stateCode: string,
    districtCode: string,
    complexCode: string
  ): Promise<Array<{ code: string; name: string }>> {
    await delay(800);
    
    if (!MOCK_COURTS[complexCode]) {
      return [
        { code: `${complexCode}-1`, name: 'Court No. 1' },
        { code: `${complexCode}-2`, name: 'Court No. 2' },
        { code: `${complexCode}-3`, name: 'Court No. 3' },
        { code: `${complexCode}-4`, name: 'Court No. 4' },
      ];
    }
    
    return MOCK_COURTS[complexCode];
  },

  /**
   * Fetch cause list for a specific court and date
   */
  async getCauseList(
    stateCode: string,
    districtCode: string,
    complexCode: string,
    courtCode: string,
    date: string
  ): Promise<CauseListResult[]> {
    await delay(1200);
    
    // In real implementation:
    // const response = await fetch(`${BASE_URL}/api/cause_list`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ stateCode, districtCode, complexCode, courtCode, date })
    // });
    // return await response.json();
    
    return generateMockCauseList(courtCode, date);
  },

  /**
   * Fetch cause lists for all courts in a complex
   */
  async getCauseListForAllCourts(
    stateCode: string,
    districtCode: string,
    complexCode: string,
    date: string
  ): Promise<CauseListResult[]> {
    await delay(1500);
    
    const courts = await this.getCourts(stateCode, districtCode, complexCode);
    const allResults: CauseListResult[] = [];
    
    for (const court of courts) {
      const results = generateMockCauseList(court.code, date);
      allResults.push(...results);
    }
    
    return allResults;
  },

  /**
   * Download cause list PDF
   * In real implementation, this would trigger a PDF download from the server
   */
  async downloadCauseListPDF(
    stateCode: string,
    districtCode: string,
    complexCode: string,
    courtCode: string,
    date: string
  ): Promise<void> {
    await delay(500);
    
    // In real implementation, this would:
    // 1. Fetch the PDF from the eCourts server
    // 2. Create a blob from the response
    // 3. Trigger a download
    
    // For demonstration, we'll create a mock download link
    const courtName = MOCK_COURTS[complexCode]?.find(c => c.code === courtCode)?.name || 'Court';
    const fileName = `CauseList_${courtName.replace(/\s+/g, '_')}_${date}.pdf`;
    
    // In a real implementation, you would download the actual PDF:
    // const response = await fetch(`${BASE_URL}/cause_list_pdf?...`);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = fileName;
    // a.click();
    
    console.log(`Mock PDF download triggered: ${fileName}`);
    
    // Create a PDF file for demonstration
    const content = `eCourts India - Cause List\n\nCourt: ${courtName}\nDate: ${date}\n\nThis is a mock PDF file for demonstration purposes.\n\nIn a real implementation, this would be fetched from:\n${BASE_URL}/cause_list_pdf\n\nState: ${stateCode}\nDistrict: ${districtCode}\nComplex: ${complexCode}\nCourt: ${courtCode}\nDate: ${date}`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },
};
