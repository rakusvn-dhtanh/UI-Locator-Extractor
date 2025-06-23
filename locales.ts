
export interface Translations {
  appTitle: string;
  appSubtitle: string;
  pasteHtmlLabel: string;
  textareaPlaceholder: string;
  clearButton: string;
  extractButton: string;
  extractingButton: string;
  tipLabel: string;
  errorLabel: string;
  errorHtmlEmpty: string;
  errorNoElements: string;
  errorParseHtml: string;
  filterControlsTitle: string;
  filterResultCount: (shown: number, total: number) => string;
  filterShowingAll: (total: number) => string;
  omniSearchLabel: string;
  omniSearchPlaceholder: string;
  tagFilterLabel: string;
  allTagsOption: string;
  locatorTypeFilterLabel: string;
  allLocatorTypesOption: string;
  resetFiltersButton: string;
  loadingMessage: string;
  extractingLocatorsMessage: string;
  noFilterMatchTitle: string;
  noFilterMatchSuggestion: string;
  filteredElementsTitle: string;
  foundElementsTitle: string;
  originalElementCountInfo: (count: number) => string;
  elementsDescriptionDefault: string;
  elementsDescriptionFiltered: string;
  locatorItemIdLabel: string;
  locatorItemNameLabel: string;
  locatorItemClassesLabel: string;
  locatorItemTextLabel: string;
  locatorItemOtherAttrsLabel: string;
  potentialLocatorsLabel: string;
  copyLocatorTooltip: string;
  noSpecificLocatorsMessage: string;
  footerAuthor: string;
  footerCompany: string;
  footerGithub: string;
  footerBuiltWith: string;
  languageToggleEn: string;
  languageToggleJa: string;
  switchToJapanese: string;
  switchToEnglish: string;
}

export const translations: Record<'en' | 'ja', Translations> = {
  en: {
    appTitle: "UI Locator Extractor",
    appSubtitle: "Paste the HTML source code of a webpage (typically the content within the <body> tag) to identify potential CSS selectors and XPath locators for its UI elements.",
    pasteHtmlLabel: "Paste HTML Content Here:",
    textareaPlaceholder: "e.g. <body>...</body> or <div>...</div>",
    clearButton: "Clear",
    extractButton: "Extract Locators",
    extractingButton: "Extracting...",
    tipLabel: "Tip: For best results, paste the content of the `<body>` tag or a specific HTML fragment.",
    errorLabel: "Error:",
    errorHtmlEmpty: "HTML input cannot be empty.",
    errorNoElements: "No locatable elements found. Ensure valid HTML content (usually from <body>) was pasted.",
    errorParseHtml: "Failed to parse HTML. Please ensure it's valid and well-formed. Check console for details.",
    filterControlsTitle: "Advanced Search & Filters",
    filterResultCount: (shown, total) => `${shown} of ${total} shown`,
    filterShowingAll: (total) => `Showing all ${total} elements`,
    omniSearchLabel: "Omni-Search",
    omniSearchPlaceholder: "Search tag, id, class, text, locator...",
    tagFilterLabel: "Filter by Tag Name",
    allTagsOption: "All Tags",
    locatorTypeFilterLabel: "Filter by Locator Type",
    allLocatorTypesOption: "All Locator Types",
    resetFiltersButton: "Reset Filters",
    loadingMessage: "Loading...",
    extractingLocatorsMessage: "Extracting locators, please wait...",
    noFilterMatchTitle: "No Elements Match Filters",
    noFilterMatchSuggestion: "Try adjusting your search or filter criteria.",
    filteredElementsTitle: "Filtered Elements",
    foundElementsTitle: "Found Elements",
    originalElementCountInfo: (count) => `Originally ${count} elements found.`,
    elementsDescriptionDefault: "Below are the elements found in the provided HTML, along with their potential locators.",
    elementsDescriptionFiltered: "Below are the elements matching your criteria in the provided HTML, along with their potential locators.",
    locatorItemIdLabel: "ID:",
    locatorItemNameLabel: "Name:",
    locatorItemClassesLabel: "Classes:",
    locatorItemTextLabel: "Text:",
    locatorItemOtherAttrsLabel: "Other Attrs:",
    potentialLocatorsLabel: "Potential Locators:",
    copyLocatorTooltip: "Copy locator",
    noSpecificLocatorsMessage: "No specific locators generated for this element beyond tag name.",
    footerAuthor: "Author: Tuan Anh Do Hoang",
    footerCompany: "Company: Rakus Vietnam Co., Ltd.",
    footerGithub: "GitHub Profile",
    footerBuiltWith: "Built with React, TypeScript, and Tailwind CSS.",
    languageToggleEn: "EN",
    languageToggleJa: "JA",
    switchToJapanese: "Switch to Japanese",
    switchToEnglish: "Switch to English",
  },
  ja: {
    appTitle: "UIロケーター抽出ツール",
    appSubtitle: "ウェブページのHTMLソースコード（通常は<body>タグ内のコンテンツ）を貼り付けて、UI要素の潜在的なCSSセレクターとXPathロケーターを特定します。",
    pasteHtmlLabel: "HTMLコンテンツをここに貼り付け:",
    textareaPlaceholder: "例: <body>...</body> または <div>...</div>",
    clearButton: "クリア",
    extractButton: "ロケーターを抽出",
    extractingButton: "抽出中...",
    tipLabel: "ヒント: 最良の結果を得るには、`<body>`タグのコンテンツまたは特定のHTMLフラグメントを貼り付けてください。",
    errorLabel: "エラー:",
    errorHtmlEmpty: "HTML入力は空にできません。",
    errorNoElements: "検索可能な要素が見つかりませんでした。有効なHTMLコンテンツ（通常は<body>から）が貼り付けられていることを確認してください。",
    errorParseHtml: "HTMLの解析に失敗しました。有効で整形式であることを確認してください。詳細はコンソールを確認してください。",
    filterControlsTitle: "高度な検索とフィルター",
    filterResultCount: (shown, total) => `${total}件中${shown}件表示`,
    filterShowingAll: (total) => `全${total}件表示中`,
    omniSearchLabel: "オムニサーチ",
    omniSearchPlaceholder: "タグ、ID、クラス、テキスト、ロケーターを検索...",
    tagFilterLabel: "タグ名でフィルター",
    allTagsOption: "すべてのタグ",
    locatorTypeFilterLabel: "ロケータータイプでフィルター",
    allLocatorTypesOption: "すべてのロケータータイプ",
    resetFiltersButton: "フィルターをリセット",
    loadingMessage: "読み込み中...",
    extractingLocatorsMessage: "ロケーターを抽出しています、お待ちください...",
    noFilterMatchTitle: "フィルターに一致する要素がありません",
    noFilterMatchSuggestion: "検索またはフィルターの条件を調整してみてください。",
    filteredElementsTitle: "フィルターされた要素",
    foundElementsTitle: "見つかった要素",
    originalElementCountInfo: (count) => `元々${count}個の要素が見つかりました。`,
    elementsDescriptionDefault: "以下は、提供されたHTMLで見つかった要素とその潜在的なロケーターです。",
    elementsDescriptionFiltered: "以下は、指定された基準に一致するHTML内の要素とその潜在的なロケーターです。",
    locatorItemIdLabel: "ID:",
    locatorItemNameLabel: "名前:",
    locatorItemClassesLabel: "クラス:",
    locatorItemTextLabel: "テキスト:",
    locatorItemOtherAttrsLabel: "その他の属性:",
    potentialLocatorsLabel: "潜在的なロケーター:",
    copyLocatorTooltip: "ロケーターをコピー",
    noSpecificLocatorsMessage: "この要素に対してタグ名以外の特定のロケーターは生成されませんでした。",
    footerAuthor: "作成者: ド・ホアン・トゥアン・アイン",
    footerCompany: "会社: 株式会社ラクスマベトナム",
    footerGithub: "GitHubプロファイル",
    footerBuiltWith: "React、TypeScript、Tailwind CSSで構築",
    languageToggleEn: "英語",
    languageToggleJa: "日本語",
    switchToJapanese: "日本語に切り替え",
    switchToEnglish: "英語に切り替え",
  }
};
