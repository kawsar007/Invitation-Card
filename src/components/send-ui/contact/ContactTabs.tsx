import { TabType } from '@/types/sendContact';
import { Eye, Filter, Search } from 'lucide-react';
import React from 'react';

interface ContactTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const ContactTabs: React.FC<ContactTabsProps> = ({
  activeTab,
  onTabChange,
  searchTerm,
  onSearchChange
}) => {
  const tabs = [
    { key: 'All' as TabType, label: 'All', count: 2 },
    { key: 'Unsent' as TabType, label: 'Unsent', count: 2 },
    { key: 'Unopened' as TabType, label: 'Unopened', count: 0 },
    { key: 'Opened' as TabType, label: 'Opened', count: 0 }
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex space-x-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`px-3 py-2 text-sm font-medium rounded ${activeTab === tab.key
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
          <Filter size={16} />
          <span>Custom Filters</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900">
          <Eye size={16} />
          <span>View Preferences</span>
        </button>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Mailing List"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};