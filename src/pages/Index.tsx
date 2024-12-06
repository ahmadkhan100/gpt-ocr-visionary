import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { TextOutput } from '@/components/TextOutput';
import { toast } from 'sonner';
import { ocr } from 'llama-ocr';

const Index = () => {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [codeSnippet] = useState(`import { ocr } from 'llama-ocr';

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1e1e1e] p-2 rounded">
              <span className="text-white font-mono text-xl">&lt;/&gt;</span>
            </div>
            <h1 className="text-2xl font-bold">GPT-OCR</h1>
            <span className="text-sm text-gray-500">powered by together.ai</span>
          </div>
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
            <pre className="language-typescript">
              <code>
                <span className="text-[#569CD6]">import</span>{" "}
                <span className="text-[#9CDCFE]">{"{"}</span>{" "}
                <span className="text-[#DCDCAA]">ocr</span>{" "}
                <span className="text-[#9CDCFE]">{"}"}</span>{" "}
                <span className="text-[#569CD6]">from</span>{" "}
                <span className="text-[#CE9178]">'llama-ocr'</span>;

                <span className="text-[#569CD6]">const</span>{" "}
                <span className="text-[#DCDCAA]">markdown</span>{" "}
                <span className="text-[#569CD6]">=</span>{" "}
                <span className="text-[#569CD6]">await</span>{" "}
                <span className="text-[#DCDCAA]">ocr</span>
                <span className="text-[#9CDCFE]">({"{"}</span>
                {"\n  "}
                <span className="text-[#9CDCFE]">filePath:</span>{" "}
                <span className="text-[#CE9178]">'./trader-receipt.jpg'</span>,
                {"\n  "}
                <span className="text-[#9CDCFE]">apiKey:</span>{" "}
                <span className="text-[#9CDCFE]">process.env.TOGETHER_API_KEY</span>
                {"\n"}
                <span className="text-[#9CDCFE]">{"}"}</span>);
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;