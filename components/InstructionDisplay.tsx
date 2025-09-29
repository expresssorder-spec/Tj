
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface InstructionDisplayProps {
  instructions: string;
}

export const InstructionDisplay: React.FC<InstructionDisplayProps> = ({ instructions }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const instructionSteps = instructions.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="bg-slate-900/70 border border-slate-700 rounded-lg p-6 relative">
      <button 
        onClick={handleCopy}
        className="absolute top-4 left-4 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-slate-300"
        aria-label="Copy instructions"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <div className="space-y-4">
        {instructionSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 border border-blue-400 text-blue-300 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                </div>
                <p className="text-slate-300 pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
            </div>
        ))}
      </div>
    </div>
  );
};
