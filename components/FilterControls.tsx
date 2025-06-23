
import React from 'react';
import { Search, Tag, ListFilter, RotateCcw } from 'lucide-react';
import { Translations } from '../locales';

interface FilterControlsProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedTag: string;
  onSelectedTagChange: (tag: string) => void;
  tagNames: string[];
  selectedLocatorType: string;
  onSelectedLocatorTypeChange: (type: string) => void;
  locatorTypes: string[];
  onResetFilters: () => void;
  resultCount: number;
  totalCount: number;
  t: Translations;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  onSearchTermChange,
  selectedTag,
  onSelectedTagChange,
  tagNames,
  selectedLocatorType,
  onSelectedLocatorTypeChange,
  locatorTypes,
  onResetFilters,
  resultCount,
  totalCount,
  t,
}) => {
  const hasFiltersApplied = searchTerm || selectedTag || selectedLocatorType;

  return (
    <details className="mt-6 bg-white shadow-lg rounded-lg group" open>
        <summary className="p-4 sm:p-5 cursor-pointer list-none flex justify-between items-center font-semibold text-slate-700 hover:bg-slate-50 rounded-t-lg transition-colors">
            {t.filterControlsTitle}
            <span className="text-sm font-normal text-slate-500">
                {hasFiltersApplied ? t.filterResultCount(resultCount, totalCount) : t.filterShowingAll(totalCount)}
            </span>
            <svg className="w-5 h-5 transform group-open:rotate-180 transition-transform duration-200 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
        </summary>
        <div className="p-4 sm:p-5 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 items-end">
            <div>
            <label htmlFor="omniSearch" className="block text-sm font-medium text-slate-600 mb-1">
                <Search size={14} className="inline mr-1" />
                {t.omniSearchLabel}
            </label>
            <input
                type="text"
                id="omniSearch"
                placeholder={t.omniSearchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white text-slate-900 placeholder-slate-500"
            />
            </div>

            <div>
            <label htmlFor="tagFilter" className="block text-sm font-medium text-slate-600 mb-1">
                <Tag size={14} className="inline mr-1" />
                {t.tagFilterLabel}
            </label>
            <select
                id="tagFilter"
                value={selectedTag}
                onChange={(e) => onSelectedTagChange(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white text-slate-900"
            >
                <option value="">{t.allTagsOption}</option>
                {tagNames.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
            </div>

            <div>
            <label htmlFor="locatorTypeFilter" className="block text-sm font-medium text-slate-600 mb-1">
                <ListFilter size={14} className="inline mr-1" />
                {t.locatorTypeFilterLabel}
            </label>
            <select
                id="locatorTypeFilter"
                value={selectedLocatorType}
                onChange={(e) => onSelectedLocatorTypeChange(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white text-slate-900"
            >
                <option value="">{t.allLocatorTypesOption}</option>
                {locatorTypes.map(type => (
                <option key={type} value={type}>{type}</option>
                ))}
            </select>
            </div>
        </div>
        <div className="flex justify-end mt-4">
            <button
            onClick={onResetFilters}
            disabled={!hasFiltersApplied}
            className="flex items-center justify-center px-5 py-2 border border-slate-300 text-slate-600 rounded-md shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <RotateCcw size={16} className="mr-2" />
            {t.resetFiltersButton}
            </button>
        </div>
        </div>
    </details>
  );
};
