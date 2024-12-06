import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TextOutput } from '@/components/TextOutput';
import { toast } from 'sonner';
import { ocr } from 'llama-ocr';

const Index = () => {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      // Convert File to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result as string;
        const base64Image = base64String.split(',')[1];
        
        // Process with llama-ocr
        const result = await ocr({
          filePath: base64Image,
          apiKey: process.env.TOGETHER_API_KEY || '' // You'll need to set this up
        });

        setExtractedText(result);
        toast.success('Text extracted successfully');
      };
    } catch (error) {
      console.error('OCR Error:', error);
      toast.error('Failed to extract text from image');
      setExtractedText('');
    } finally {
      setIsProcessing(false);
    }
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