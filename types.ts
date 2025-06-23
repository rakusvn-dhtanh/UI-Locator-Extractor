export interface Locator {
  type: string; // e.g., "ID", "CSS Selector", "XPath"
  value: string;
  description?: string; // e.g. "Unique ID", "Class-based selector"
}

export interface ElementInfo {
  key: string; // Unique key for React list rendering
  tagName: string;
  id?: string;
  name?: string;
  classes?: string[];
  textContentSample?: string; // A short sample of text content
  attributes: Record<string, string>; // Store all attributes
  locators: Locator[];
}

// Ensure process.env.API_KEY is declared for TypeScript if it were to be used,
// although this app doesn't use Gemini API. Included for completeness of setup.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY?: string;
    }
  }
}
