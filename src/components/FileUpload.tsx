import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload = ({ onFileSelect }: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onFileSelect(file);
      } else {
        toast.error('Please upload an image file');
      }
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const clearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div
      {...getRootProps()}
      className={`relative w-full h-64 border-2 border-dashed rounded-lg transition-colors cursor-pointer
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}
        ${preview ? 'p-2' : 'p-8'}`}
    >
      <input {...getInputProps()} />
      
      {preview ? (
        <div className="relative h-full">
          <img src={preview} alt="Preview" className="h-full mx-auto object-contain rounded" />
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-gray-500">
          <Upload className="w-12 h-12 mb-4" />
          <p className="text-lg mb-2">Drop your image here</p>
          <p className="text-sm">or click to select</p>
        </div>
      )}
    </div>
  );
};