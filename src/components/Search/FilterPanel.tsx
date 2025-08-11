import React from 'react';
import { FilterPanelProps } from '../../types';
import { Filter, Heart, ArrowUpDown, ArrowUp, ArrowDown, X } from 'lucide-react';
import Button from '../UI/Button';

const FilterPanel: React.FC<FilterPanelProps> = ({
  availableTags, selectedTags, onTagsChange, showFavorites, onFavoritesChange, 
  sortBy, sortOrder, onSortChange
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      onSortChange(newSortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(newSortBy, 'desc');
    }
  };

  const sortOptions = [
    { key: 'updated', label: 'Last Updated' },
    { key: 'created', label: 'Created Date' },
    { key: 'name', label: 'Name' },
    { key: 'usage', label: 'Usage Count' },
  ];

  const getSortIcon = (optionKey: string) => {
    if (sortBy !== optionKey) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex items-center space-x-2">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Quick Filter</h4>
        <Button
          variant={showFavorites ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onFavoritesChange(!showFavorites)}
          className="w-full justify-start"
        >
          <Heart className={`w-4 h-4 mr-2 ${showFavorites ? 'fill-current' : ''}`} />
          Favorites Only
        </Button>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Sort By</h4>
        <div className="space-y-1">
          {sortOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSortChange(option.key)}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                sortBy === option.key ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <span>{option.label}</span>
              {getSortIcon(option.key)}
            </button>
          ))}
        </div>
      </div>

      {availableTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Tags</h4>
            {selectedTags.length > 0 && (
              <button onClick={() => onTagsChange([])} className="text-xs text-gray-500 hover:text-gray-700">
                Clear all
              </button>
            )}
          </div>
          
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {tag}
                  <button onClick={() => handleTagToggle(tag)} className="ml-1 hover:text-blue-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
          
          <div className="max-h-40 overflow-y-auto space-y-1">
            {availableTags.filter(tag => !selectedTags.includes(tag)).map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
