
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { HtmlInputForm } from './components/HtmlInputForm';
import { LocatorList } from './components/LocatorList';
import { FilterControls } from './components/FilterControls';
import { extractLocatorsFromHtml } from './services/domParserService';
import { ElementInfo, Locator } from './types';
import { translations, Translations } from './locales';
import { Github, Code, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [htmlInput, setHtmlInput] = useState<string>('');
  const [elementLocators, setElementLocators] = useState<ElementInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [selectedLocatorType, setSelectedLocatorType] = useState<string>('');

  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ja'>(() => {
    const storedLang = localStorage.getItem('language');
    if (storedLang === 'en' || storedLang === 'ja') {
      return storedLang;
    }
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'ja' ? 'ja' : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const handleLanguageToggle = () => {
    setCurrentLanguage(prevLang => (prevLang === 'en' ? 'ja' : 'en'));
  };

  const t = translations[currentLanguage];

  const handleHtmlInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlInput(event.target.value);
    if (error) setError(null);
  }, [error]);

  const handleSubmit = useCallback(async () => {
    if (!htmlInput.trim()) {
      setError(t.errorHtmlEmpty);
      setElementLocators([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    setElementLocators([]);
    setSearchTerm('');
    setSelectedTag('');
    setSelectedLocatorType('');
    
    await new Promise(resolve => setTimeout(resolve, 100)); 
    
    try {
      const locators = extractLocatorsFromHtml(htmlInput);
      setElementLocators(locators);
      if (locators.length === 0 && htmlInput.trim()) {
        setError(t.errorNoElements);
      }
    } catch (e) {
      console.error("Error parsing HTML:", e);
      setError(t.errorParseHtml);
      setElementLocators([]);
    } finally {
      setIsLoading(false);
    }
  }, [htmlInput, t]);

  const handleClear = useCallback(() => {
    setHtmlInput('');
    setElementLocators([]);
    setError(null);
    setIsLoading(false);
    setSearchTerm('');
    setSelectedTag('');
    setSelectedLocatorType('');
  }, []);

  const uniqueTagNames = useMemo(() => {
    const tags = new Set<string>();
    elementLocators.forEach(el => tags.add(el.tagName.toUpperCase()));
    return Array.from(tags).sort();
  }, [elementLocators]);

  const locatorTypes = useMemo(() => {
    const types = new Set<string>();
    elementLocators.forEach(el => el.locators.forEach(loc => types.add(loc.type)));
    ["ID", "CSS Selector", "XPath"].forEach(type => types.add(type));
    return Array.from(types).sort();
  }, [elementLocators]);

  const filteredElementLocators = useMemo(() => {
    let filtered = elementLocators;
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(el => 
        el.tagName.toLowerCase().includes(lowerSearchTerm) ||
        (el.id && el.id.toLowerCase().includes(lowerSearchTerm)) ||
        (el.name && el.name.toLowerCase().includes(lowerSearchTerm)) ||
        (el.classes && el.classes.some(c => c.toLowerCase().includes(lowerSearchTerm))) ||
        (el.textContentSample && el.textContentSample.toLowerCase().includes(lowerSearchTerm)) ||
        (el.locators.some(loc => loc.value.toLowerCase().includes(lowerSearchTerm))) ||
        (Object.entries(el.attributes).some(([key, value]) => 
            key.toLowerCase().includes(lowerSearchTerm) || 
            value.toLowerCase().includes(lowerSearchTerm)
        ))
      );
    }
    if (selectedTag) filtered = filtered.filter(el => el.tagName.toUpperCase() === selectedTag.toUpperCase());
    if (selectedLocatorType) filtered = filtered.filter(el => el.locators.some(loc => loc.type === selectedLocatorType));
    return filtered;
  }, [elementLocators, searchTerm, selectedTag, selectedLocatorType]);
  
  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedTag('');
    setSelectedLocatorType('');
  }, []);

  const hasActiveFilters = !!(searchTerm || selectedTag || selectedLocatorType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 p-4 sm:p-6 lg:p-8 relative">
      <button
        onClick={handleLanguageToggle}
        className="fixed top-4 right-4 z-50 flex flex-col items-center justify-center px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-700 shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label={currentLanguage === 'en' ? t.switchToJapanese : t.switchToEnglish}
        title={currentLanguage === 'en' ? t.switchToJapanese : t.switchToEnglish}
      >
        <Globe size={20} className="mb-0.5" />
        <span className="text-xs font-medium">
          {currentLanguage === 'en' ? t.languageToggleEn : t.languageToggleJa}
        </span>
      </button>

      <header className="mb-8 pt-8 sm:pt-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
           <Code size={40} className="text-sky-600" />
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            {t.appTitle}
          </h1>
        </div>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto">
          {t.appSubtitle}
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <HtmlInputForm
          htmlInput={htmlInput}
          onHtmlInputChange={handleHtmlInputChange}
          onSubmit={handleSubmit}
          onClear={handleClear}
          isLoading={isLoading}
          t={t}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <p className="font-semibold">{t.errorLabel}</p>
            <p>{error}</p>
          </div>
        )}

        {elementLocators.length > 0 && !isLoading && (
          <FilterControls
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            selectedTag={selectedTag}
            onSelectedTagChange={setSelectedTag}
            tagNames={uniqueTagNames}
            selectedLocatorType={selectedLocatorType}
            onSelectedLocatorTypeChange={setSelectedLocatorType}
            locatorTypes={locatorTypes}
            onResetFilters={handleResetFilters}
            resultCount={filteredElementLocators.length}
            totalCount={elementLocators.length}
            t={t}
          />
        )}

        <LocatorList 
            elementLocators={filteredElementLocators} 
            isLoading={isLoading}
            hasActiveFilters={hasActiveFilters}
            originalElementCount={elementLocators.length}
            t={t}
        />
      </main>
      
      <footer className="mt-12 text-center text-xs text-slate-600 space-y-1">
        <p>
          {t.footerAuthor} <br />
          {t.footerCompany}
        </p>
        <p>
          <a 
            href="https://github.com/rakusvn-dhtanh"
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1 hover:text-sky-600 transition-colors"
          >
            <Github size={14} /> {t.footerGithub}
          </a>
        </p>
        <p>{t.footerBuiltWith}</p>
      </footer>
    </div>
  );
};

export default App;