
import React from 'react';
import { ElementInfo } from '../types';
import { LocatorItem } from './LocatorItem';
import { Loader2, Info, FilterX } from 'lucide-react';
import { Translations } from '../locales';

interface LocatorListProps {
  elementLocators: ElementInfo[];
  isLoading: boolean;
  hasActiveFilters?: boolean;
  originalElementCount?: number;
  t: Translations;
}

export const LocatorList: React.FC<LocatorListProps> = ({ 
    elementLocators, 
    isLoading, 
    hasActiveFilters,
    originalElementCount,
    t
}) => {
  if (isLoading) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center text-slate-600 p-10 bg-white shadow-lg rounded-lg">
        <Loader2 size={48} className="animate-spin text-sky-500" />
        <p className="mt-4 text-lg">{t.extractingLocatorsMessage}</p>
      </div>
    );
  }

  if (originalElementCount === 0 && !isLoading) {
    return null; 
  }
  
  if (elementLocators.length === 0 && hasActiveFilters) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center text-slate-600 p-10 bg-white shadow-lg rounded-lg">
        <FilterX size={48} className="text-amber-500" />
        <p className="mt-4 text-lg font-semibold">{t.noFilterMatchTitle}</p>
        <p className="text-sm">{t.noFilterMatchSuggestion}</p>
      </div>
    );
  }
  
  if (elementLocators.length === 0 && !hasActiveFilters && originalElementCount !== undefined && originalElementCount > 0) {
      return null; 
  }

  if (elementLocators.length === 0 && originalElementCount === undefined) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-baseline">
        <h2 className="text-2xl font-semibold text-slate-700">
          {hasActiveFilters ? t.filteredElementsTitle : t.foundElementsTitle} 
          <span className="text-lg font-normal text-slate-500"> ({elementLocators.length})</span>
        </h2>
        {hasActiveFilters && originalElementCount && originalElementCount > elementLocators.length && (
            <p className="text-sm text-slate-500 mt-1 sm:mt-0">
                {t.originalElementCountInfo(originalElementCount)}
            </p>
        )}
      </div>
      
      {elementLocators.length > 0 && (
        <p className="mb-6 text-sm text-slate-600">
          {hasActiveFilters ? t.elementsDescriptionFiltered : t.elementsDescriptionDefault}
        </p>
      )}
      
      <div className="space-y-6">
        {elementLocators.map((elementInfo) => (
          <LocatorItem key={elementInfo.key} elementInfo={elementInfo} t={t} />
        ))}
      </div>
    </div>
  );
};
