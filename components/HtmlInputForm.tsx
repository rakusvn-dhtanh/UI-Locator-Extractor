
import React from 'react';
import { DownloadCloud, Trash2, Loader2, Search } from 'lucide-react';
import { Translations } from '../locales';

interface HtmlInputFormProps {
  htmlInput: string;
  onHtmlInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
  t: Translations;
}

export const HtmlInputForm: React.FC<HtmlInputFormProps> = ({
  htmlInput,
  onHtmlInputChange,
  onSubmit,
  onClear,
  isLoading,
  t,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8">
      <label htmlFor="htmlInput" className="block text-lg font-semibold mb-2 text-slate-700">
        {t.pasteHtmlLabel}
      </label>
      <textarea
        id="htmlInput"
        value={htmlInput}
        onChange={onHtmlInputChange}
        placeholder={t.textareaPlaceholder}
        rows={10}
        className="w-full p-3 border border-slate-300 rounded-md shadow-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors bg-white text-slate-900 placeholder-slate-500 resize-y"
        disabled={isLoading}
      />
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
        <button
          onClick={onClear}
          disabled={isLoading || !htmlInput}
          className="flex items-center justify-center px-6 py-2.5 border border-slate-300 text-slate-600 rounded-md shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} className="mr-2" />
          {t.clearButton}
        </button>
        <button
          onClick={onSubmit}
          disabled={isLoading || !htmlInput.trim()}
          className="flex items-center justify-center px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin mr-2" />
          ) : (
            <Search size={18} className="mr-2" />
          )}
          {isLoading ? t.extractingButton : t.extractButton}
        </button>
      </div>
       <p className="mt-3 text-xs text-slate-500">
        {t.tipLabel}
      </p>
    </div>
  );
};
