import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

export default function DropZone({ onFile }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop: (files) => files[0] && onFile(files[0]),
    accept: {
      'application/dicom': ['.dcm'],
      'application/octet-stream': ['.nii', '.nii.gz'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
        isDragActive ? 'border-accent-teal bg-accent-teal/10' : 'border-bg-border hover:border-accent-teal/50 hover:bg-accent-teal/5'
      }`}
    >
      <input {...getInputProps()} />
      <UploadCloud size={36} className="mx-auto text-accent-teal mb-3" />
      <p className="text-sm text-text-primary font-medium">Drop your scan here, or click to browse</p>
      <p className="text-xs text-text-muted mt-2">DICOM (.dcm), NIfTI (.nii / .nii.gz), JPG, PNG</p>
      <p className="text-xs text-accent-teal mt-4">Your file is processed securely and never stored without your consent.</p>
    </div>
  );
}
