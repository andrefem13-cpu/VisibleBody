import { useState } from 'react';
import { Upload } from 'lucide-react';
import Header from './components/Header.jsx';
import DisclaimerBanner from './components/DisclaimerBanner.jsx';
import BodyViewer from './components/BodyViewer/BodyViewer.jsx';
import InsightPanel from './components/InsightPanel/InsightPanel.jsx';
import UploadModal from './components/UploadFlow/UploadModal.jsx';

export default function App() {
  const [mode, setMode] = useState('patient'); // 'patient' | 'clinician'
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const scanContext = scanResult?.affectedRegions?.[0]?.description;

  const handleUploadComplete = (result, regionHint) => {
    setScanResult(result);
    if (regionHint) setSelectedRegionId(regionHint);
  };

  return (
    <div className="h-full flex flex-col">
      <DisclaimerBanner />
      <Header
        mode={mode}
        setMode={setMode}
        onSelectRegion={setSelectedRegionId}
        onUploadClick={() => setUploadOpen(true)}
      />
      <main className="flex-1 relative overflow-hidden">
        <BodyViewer
          selectedRegionId={selectedRegionId}
          onRegionSelect={setSelectedRegionId}
          scanResult={scanResult}
        />
        <InsightPanel
          regionId={selectedRegionId}
          mode={mode}
          scanContext={scanContext}
          onClose={() => setSelectedRegionId(null)}
        />
        <button
          onClick={() => setUploadOpen(true)}
          className="md:hidden fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent-teal text-bg-primary text-sm font-medium shadow-lg"
        >
          <Upload size={16} /> Upload scan
        </button>
      </main>
      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onComplete={handleUploadComplete}
      />
    </div>
  );
}
