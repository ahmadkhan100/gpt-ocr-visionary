import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TextOutput } from '@/components/TextOutput';
import { toast } from 'sonner';
import { ocr } from 'llama-ocr';

const Index = () => {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [codeSnippet, setCodeSnippet] = useState(`import { ocr } from 'llama-ocr';

const markdown = await ocr({
  filePath: './trader-receipt.jpg',
  apiKey: process.env.TOGETHER_API_KEY
});`);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result as string;
        const base64Image = base64String.split(',')[1];
        
        const result = await ocr({
          filePath: base64Image,
          apiKey: process.env.TOGETHER_API_KEY || ''
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
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Upload an image to turn it into structured markdown</h1>
          <p className="text-gray-600 italic">(PDF support soon!)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Image:</h2>
            <FileUpload onFileSelect={handleFileSelect} />
            <p className="text-blue-500 text-sm text-center hover:underline cursor-pointer">
              Need an example image? Try ours.
            </p>
          </div>

          {/* Markdown Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Markdown:</h2>
            <TextOutput text={extractedText} isLoading={isProcessing} />
          </div>
        </div>

        {/* Code Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Code:</h2>
          <div className="bg-[#1e1e1e] text-white rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre>{codeSnippet}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;