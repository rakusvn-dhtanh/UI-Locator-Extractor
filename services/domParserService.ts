import { ElementInfo, Locator } from '../types';

const IGNORED_TAGS = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'META', 'LINK', 'TITLE', 'HEAD', 'HTML'];

// Helper to get only direct text content, not from children
function getDirectTextContent(element: Element): string {
  let text = "";
  if (element.childNodes && element.childNodes.length > 0) {
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.nodeValue || '';
      }
    }
  }
  return text.trim().replace(/\s+/g, ' ');
}

// Helper for full XPath
function getElementXPath(element: Element, documentContext: Document): string | null {
  if (element && element.id) {
    // Check if ID is unique in the context of the parsed document
    // Note: CSS.escape is for CSS selectors, not strictly necessary for XPath id value but good for consistency if reused.
    // XPath requires escaping single quotes within the string literal.
    const elementsWithSameId = documentContext.querySelectorAll(`#${CSS.escape(element.id)}`);
    if (elementsWithSameId.length === 1 && elementsWithSameId[0] === element) {
        return `//*[@id='${element.id.replace(/'/g, "\\'")}']`;
    }
  }

  const paths: string[] = [];
  let currentElement: Node | null = element;

  while (currentElement && currentElement.nodeType === Node.ELEMENT_NODE) {
    const el = currentElement as Element;
    let segment = el.nodeName.toLowerCase();

    // If 'el' is the 'html' or 'body' tag, it's a root for our XPath relative to the document.
    // Add its segment and terminate.
    if (el === documentContext.documentElement || el === documentContext.body) {
      paths.unshift(segment);
      break;
    }

    const parentNode = el.parentNode;

    // If there's no parent, or parent is not an Element (e.g., it's the Document itself, or a DocumentFragment),
    // we cannot continue up the chain by finding indexed siblings under an Element parent.
    // The current 'el' is the "highest" element in this part of the path that we can describe with an index.
    if (!parentNode || parentNode.nodeType !== Node.ELEMENT_NODE) {
      // The segment for the current 'el' needs to be added as is (without index from parent).
      paths.unshift(segment);
      break;
    }
    
    // parentNode is guaranteed to be an Element here.
    const parentElement = parentNode as Element;

    // Find all sibling elements of the same tag name to determine if an index is needed.
    const sameTagSiblings = Array.from(parentElement.children).filter(
      (child) => child.nodeName === el.nodeName
    );

    if (sameTagSiblings.length > 1) {
      // Find the 1-based index of 'el' among its same-tagged siblings.
      const index = sameTagSiblings.indexOf(el) + 1;
      if (index > 0) { // Should always be > 0 if el is in sameTagSiblings
          segment += `[${index}]`;
      }
    }

    paths.unshift(segment); // Add the (potentially indexed) segment for 'el'.
    currentElement = parentElement; // Move up to the parent element.
  }

  if (paths.length === 0 && element.nodeName) { // Handle case where element might be detached or loop didn't run
    paths.push(element.nodeName.toLowerCase());
  } else if (paths.length === 0) {
    return null; // Cannot determine path
  }
  
  // Ensure the path starts with a single '/'
  let joinedPath = paths.join('/');
  if (paths.length > 0 && paths[0] !== 'html' && paths[0] !== 'body') {
    // If path doesn't start from html or body (e.g. for a fragment), prepend // to indicate relative path from anywhere
    // Or, if it's a single element path from a fragment, just /tagname is fine.
    // For consistency with typical XPath, if it's not absolute from root, // is common.
    // However, the logic constructs paths from specific roots (html/body) or from top of fragment.
    // A path like "div/span" is valid if div is the root of context. Prepending / makes it /div/span.
  }
  return '/' + joinedPath;
}


export function extractLocatorsFromHtml(htmlString: string): ElementInfo[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const results: ElementInfo[] = [];
  
  const rootElementForQuery = doc.body && doc.body.childNodes.length > 0 ? doc.body : doc.documentElement;

  if (!rootElementForQuery) {
    console.warn("No processable content found in parsed HTML.");
    return [];
  }
  
  const allElements = Array.from(rootElementForQuery.querySelectorAll("*"));

  allElements.forEach((element, index) => {
    const tagName = element.tagName.toLowerCase();

    if (IGNORED_TAGS.includes(element.tagName.toUpperCase())) {
      return;
    }

    const id = element.id || undefined;
    const name = element.getAttribute('name') || undefined;
    const classes = Array.from(element.classList);
    const directText = getDirectTextContent(element);
    const textContentSample = directText.substring(0, 70) + (directText.length > 70 ? "..." : "");
    
    const attributes: Record<string, string> = {};
    Array.from(element.attributes).forEach(attr => {
        attributes[attr.name] = attr.value;
    });

    const locators: Locator[] = [];

    // 1. ID
    if (id) {
      locators.push({ type: "ID", value: id, description: "Direct ID attribute" });
      locators.push({ type: "CSS Selector", value: `#${CSS.escape(id)}`, description: "CSS by ID" });
      locators.push({ type: "XPath", value: `//*[@id='${id.replace(/'/g, "\\'")}']`, description: "XPath by ID" });
    }

    // 2. Name
    if (name) {
      locators.push({ type: "CSS Selector", value: `${tagName}[name='${name.replace(/'/g, "\\'")}']`, description: "CSS by name attribute" });
      locators.push({ type: "XPath", value: `//${tagName}[@name='${name.replace(/'/g, "\\'")}']`, description: "XPath by name attribute" });
    }

    // 3. Class Names
    if (classes.length > 0) {
      const safeClasses = classes.map(c => CSS.escape(c));
      locators.push({ type: "CSS Selector", value: `${tagName}.${safeClasses.join('.')}`, description: "CSS by tag and classes" });
      locators.push({ type: "XPath", value: `//${tagName}[${classes.map(c => `contains(@class, '${c.replace(/'/g, "\\'")}')`).join(' and ')}]`, description: "XPath by tag and classes" });
    }
    
    // 4. Tag name only (less specific)
    locators.push({ type: "CSS Selector", value: tagName, description: "CSS by tag name"});

    // 5. Full XPath
    const fullXPath = getElementXPath(element, doc);
    if (fullXPath && !locators.some(l => l.type === "XPath" && l.value === fullXPath)) { 
         locators.push({ type: "XPath", value: fullXPath, description: "Calculated Full XPath" });
    }

    // 6. Link Text (for <a> tags)
    if (tagName === 'a' && directText) {
        const escapedText = directText.replace(/'/g, "\\'");
        locators.push({ type: "XPath", value: `//a[normalize-space(.)='${escapedText}']`, description: "XPath by exact link text" });
         locators.push({ type: "XPath", value: `//a[contains(normalize-space(.), '${escapedText.substring(0,50)}')]`, description: "XPath by partial link text" }); // substring to avoid overly long xpaths
    }
    
    // 7. Text Content (for any tag with significant direct text)
    if (directText && directText.length > 0 && directText.length < 100 && tagName !== 'a') { 
        const escapedText = directText.replace(/'/g, "\\'");
        locators.push({ type: "XPath", value: `//${tagName}[normalize-space(.)='${escapedText}']`, description: "XPath by exact direct text" });
        if (directText.length > 5) { 
            locators.push({ type: "XPath", value: `//${tagName}[contains(normalize-space(.), '${escapedText.substring(0,50)}')]`, description: "XPath by partial direct text" }); // substring
        }
    }
    
    // 8. Other unique attributes (e.g. aria-label, data-testid)
    ['data-testid', 'data-cy', 'aria-label', 'placeholder', 'title', 'alt'].forEach(attrName => {
        const attrValue = element.getAttribute(attrName);
        if (attrValue) {
            const escapedAttrValue = attrValue.replace(/'/g, "\\'");
            locators.push({ type: "CSS Selector", value: `${tagName}[${attrName}='${escapedAttrValue}']`, description: `CSS by ${attrName}` });
            locators.push({ type: "XPath", value: `//${tagName}[@${attrName}='${escapedAttrValue}']`, description: `XPath by ${attrName}` });
        }
    });

    // Remove duplicate locators based on value
    const uniqueLocators = Array.from(new Map(locators.map(item => [item.value, item])).values());

    results.push({
      key: `${tagName}-${id || ''}-${index}`, 
      tagName,
      id,
      name,
      classes,
      textContentSample,
      attributes,
      locators: uniqueLocators,
    });
  });

  return results;
}
