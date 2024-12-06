import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface TextOutputProps {
  text: string;
  isLoading: boolean;
}

export const TextOutput = ({ text, isLoading }: TextOutputProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } catch (err) {
      toast.error('Failed to copy text');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-48 bg-white rounded-lg p-4 animate-pulse">
        <div className="h-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white rounded-lg shadow-sm">
      <div className="absolute top-4 right-4">
        <button
          onClick={copyToClipboard}
          className="p-2 text-gray-500 hover:text-primary transition-colors"
          title="Copy to clipboard"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 min-h-[12rem] max-h-[24rem] overflow-y-auto">
        {text ? (
          <p className="whitespace-pre-wrap">{text}</p>
        ) : (
          <p className="text-gray-400 text-center mt-12">
            Upload an image to see the extracted text here
          </p>
        )}
      </div>
    </div>
  );
};