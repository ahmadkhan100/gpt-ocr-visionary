import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TextOutput } from '@/components/TextOutput';
import { toast } from 'sonner';

const Index = () => {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    // Simulate OCR processing
    setTimeout(() => {
      setExtractedText('Sample extracted text from the image.\nThis is a placeholder for the actual OCR result.');
      setIsProcessing(false);
      toast.success('Text extracted successfully');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">GPT-OCR</h1>
          <p className="text-gray-600">Extract text from images instantly</p>
        </div>

        <FileUpload onFileSelect={handleFileSelect} />
        
        <TextOutput text={extractedText} isLoading={isProcessing} />
      </div>
    </div>
  );
};

export default Index;