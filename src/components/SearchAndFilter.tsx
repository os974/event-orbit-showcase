
import React from 'react';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchAndFilterProps {
  searchTerm: string;
  filterCategory: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  filterCategory,
  onSearchChange,
  onFilterChange
}) => {
  return (
    <div className="mb-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-white/80 border-slate-200"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-600" />
            <select
              value={filterCategory}
              onChange={(e) => onFilterChange(e.target.value)}
              className="px-3 py-2 bg-white/80 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="networking">Networking</option>
              <option value="training">Training</option>
              <option value="webinar">Webinar</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
