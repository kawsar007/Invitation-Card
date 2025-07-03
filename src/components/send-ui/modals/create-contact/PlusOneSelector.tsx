import { plusOneOptions } from '@/components/send-ui/constant';
import { HelpCircle } from 'lucide-react';
import React from 'react';

interface PlusOneSelectorProps {
  plusOneCount: number;
  setPlusOneCount: (count: number) => void;
}

export const PlusOneSelector: React.FC<PlusOneSelectorProps> = ({
  plusOneCount,
  setPlusOneCount
}) => (
  <div className="mb-6">
    <div className="flex items-center space-x-2 mb-2">
      <label className="text-sm font-medium text-gray-700">Allow +1?</label>
      <HelpCircle size={16} className="text-gray-400" />
    </div>
    <select
      value={plusOneCount}
      onChange={(e) => setPlusOneCount(parseInt(e.target.value))}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {plusOneOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);