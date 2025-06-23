
import React, { useState, useCallback } from 'react';
import { ElementInfo, Locator } from '../types';
import { Translations } from '../locales';
import { Copy, CheckCircle, Tag, Hash, VenetianMask, CodeXml, TextQuote, ListTree } from 'lucide-react';

interface LocatorItemProps {
  elementInfo: ElementInfo;
  t: Translations;
}

const AttributePill: React.FC<{ name: string; value: string }> = ({ name, value }) => (
  <span className="inline-block bg-slate-100 rounded-full px-2.5 py-0.5 text-xs font-semibold text-slate-600 mr-1.5 mb-1.5">
    {name}: <span className="font-normal opacity-80">{`"${value}"`}</span>
  </span>
);


export const LocatorItem: React.FC<LocatorItemProps> = ({ elementInfo, t }) => {
  const [copiedLocator, setCopiedLocator] = useState<string | null>(null);

  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedLocator(text);
      setTimeout(() => setCopiedLocator(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      alert("Failed to copy. Please try manually.");
    });
  }, []);

  const getIconForType = (type: string) => {
    if (type.toLowerCase().includes('id')) return <Hash size={16} className="mr-2 text-pink-500" />;
    if (type.toLowerCase().includes('css')) return <CodeXml size={16} className="mr-2 text-blue-500" />;
    if (type.toLowerCase().includes('xpath')) return <ListTree size={16} className="mr-2 text-green-500" />;
    return <Tag size={16} className="mr-2 text-slate-500" />;
  };
  
  const relevantAttributes = Object.entries(elementInfo.attributes)
    .filter(([key]) => !['id', 'class', 'name', 'style'].includes(key.toLowerCase()) && key.toLowerCase() !== 'value')
    .slice(0, 5); 

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl">
      <div className="p-5 sm:p-6 border-b border-slate-200">
        <h3 className="text-xl font-semibold text-sky-600 flex items-center">
          <Tag size={22} className="mr-2 opacity-80" />
          &lt;{elementInfo.tagName.toUpperCase()}&gt;
        </h3>
        <div className="mt-2 text-xs space-y-1 text-slate-500">
          {elementInfo.id && (
            <p className="flex items-center"><Hash size={14} className="mr-1.5 text-pink-500 opacity-70" /> {t.locatorItemIdLabel} <span className="font-mono ml-1 p-0.5 bg-slate-100 rounded text-pink-600">{elementInfo.id}</span></p>
          )}
          {elementInfo.name && (
            <p className="flex items-center"><VenetianMask size={14} className="mr-1.5 text-indigo-500 opacity-70" /> {t.locatorItemNameLabel} <span className="font-mono ml-1 p-0.5 bg-slate-100 rounded text-indigo-600">{elementInfo.name}</span></p>
          )}
          {elementInfo.classes && elementInfo.classes.length > 0 && (
            <p className="flex items-start"><CodeXml size={14} className="mr-1.5 text-purple-500 opacity-70 mt-0.5" /> {t.locatorItemClassesLabel} {elementInfo.classes.map(c => <span key={c} className="font-mono ml-1 p-0.5 bg-slate-100 rounded text-purple-600">{c}</span>)}</p>
          )}
          {elementInfo.textContentSample && (
             <p className="flex items-start"><TextQuote size={14} className="mr-1.5 text-amber-600 opacity-70 mt-0.5" /> {t.locatorItemTextLabel} <em className="ml-1 text-slate-500 truncate max-w-md">"{elementInfo.textContentSample}"</em></p>
          )}
          {relevantAttributes.length > 0 && (
            <div className="pt-1">
              <span className="font-medium text-slate-600">{t.locatorItemOtherAttrsLabel} </span>
              {relevantAttributes.map(([key, value]) => (
                <AttributePill key={key} name={key} value={value} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5 sm:p-6">
        <h4 className="text-sm font-semibold mb-3 text-slate-700">{t.potentialLocatorsLabel}</h4>
        <ul className="space-y-2">
          {elementInfo.locators.map((locator, index) => (
            <li key={`${locator.type}-${index}`} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-md group">
              <div className="flex items-center overflow-hidden">
                {getIconForType(locator.type)}
                <span className="text-xs font-semibold text-slate-500 w-28 shrink-0">{locator.type}:</span>
                <code className="ml-2 text-sm text-sky-700 truncate" title={locator.value}>{locator.value}</code>
              </div>
              <button
                onClick={() => handleCopy(locator.value)}
                title={t.copyLocatorTooltip}
                className="ml-3 p-1.5 rounded-md text-slate-400 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              >
                {copiedLocator === locator.value ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
              </button>
            </li>
          ))}
        </ul>
        {elementInfo.locators.length === 0 && <p className="text-sm text-slate-500">{t.noSpecificLocatorsMessage}</p>}
      </div>
    </div>
  );
};
