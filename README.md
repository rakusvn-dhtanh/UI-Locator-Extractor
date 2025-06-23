[English](#english-version) | [日本語 (Japanese)](#日本語版-japanese-version)

<a name="english-version"></a>
## English Version

# UI Locator Extractor 🚀

A web application that parses pasted HTML content to extract various CSS and XPath locators for UI elements. This tool is designed to assist web developers, QA engineers, and anyone involved in web scraping or test automation by providing multiple ways to identify elements on a page.

## ✨ Key Features

*   📄 **HTML Parsing**: Accepts raw HTML string input.
*   🎯 **Comprehensive Locator Extraction**:
    *   `#️⃣` **ID**: `elementId`
    *   🎨 **CSS Selectors**:
        *   By ID: `#elementId`
        *   By Name: `tagName[name='elementName']`
        *   By Class(es): `tagName.class1.class2`
        *   By Tag Name: `tagName`
        *   By Common Attributes: `tagName[data-testid='value']`, `tagName[aria-label='value']`, etc.
    *   🌳 **XPath Locators**:
        *   By ID: `//*[@id='elementId']`
        *   By Name: `//tagName[@name='elementName']`
        *   By Class(es): `//tagName[contains(@class, 'class1') and ...] `
        *   By Tag Name (less specific, usually combined with index in full XPath)
        *   By Text Content: `//tagName[normalize-space(.)='Exact Text']`, `//tagName[contains(normalize-space(.), 'Partial Text')]` (especially for `<a>` tags)
        *   By Common Attributes: `//tagName[@attribute='value']`
        *   Full Calculated XPath: e.g., `/html/body/div[1]/p[2]`
*   ℹ️ **Detailed Element Information**: Displays tag name, ID, name attribute, CSS classes, a sample of text content, and other relevant HTML attributes.
*   📋 **Easy Copy-to-Clipboard**: Quickly copy any generated locator with a single click.
*   🔬 **Advanced Filtering**:
    *   **Omni-Search**: Search across all element properties (tag, ID, class, text, attributes, locator values).
    *   **Tag Name Filter**: Show elements only of a specific tag type (e.g., `DIV`, `INPUT`).
    *   **Locator Type Filter**: Show elements that have a specific type of locator (e.g., "XPath", "CSS Selector").
*   🌐 **Multi-language Support**: Interface available in English and Japanese.
*   🖌️ **User-Friendly Interface**:
    *   📱💻 Responsive design for usability on different screen sizes.
    *   ✔️ Clear loading states, error messages, and user feedback.
    *   🗑️ Option to easily clear input and results.

## ▶️ Running the Application Locally

This project uses TypeScript with JSX (`.tsx` files) and is set up to be built using `esbuild` and run with `live-server`.

1.  **Clone the Repository**:
    If you haven't already, clone the project to your local machine.
    ```bash
    # Replace <repository-url> with the actual URL
    git clone <repository-url>
    cd <repository-directory-name>
    ```

2.  **Install Dependencies**:
    This command reads the `package.json` file and installs all necessary dependencies (like React, Lucide-React) and development tools (like TypeScript, esbuild, live-server) into the `node_modules` directory.
    ```bash
    npm install
    ```

3.  **Build the Application**:
    This command uses `esbuild` to transpile the TypeScript/JSX code from `index.tsx` and its imports, bundle them together, and create a single JavaScript file named `index.js` in the project root.
    ```bash
    npm run build
    ```
    You can also run `npm run typecheck` to check for TypeScript errors without building.

4.  **Run the Application**:
    This command starts `live-server`, a simple local development server, which will serve the `index.html` file and the bundled `index.js`. It will automatically open the application in your default web browser.
    ```bash
    npm start
    ```
    Alternatively, after running `npm run build`, you can manually start `live-server` from the project root:
    ```bash
    npx live-server .
    ```
    Any changes to the `.tsx` or `.ts` source files will require you to re-run `npm run build` to see the updates in the browser (live-server might auto-reload the page, but it won't re-run the build automatically).

## 📖 How to Use (Once Running)

1.  ✂️ **Obtain HTML**:
    *   Open the webpage you want to inspect in your browser.
    *   Use your browser's Developer Tools (usually by right-clicking an element and selecting "Inspect" or "Inspect Element").
    *   Find the HTML element or section you're interested in. You can copy the HTML for a specific element (often "Copy OuterHTML") or a larger section, even the entire `<body>` content.
2.  ⌨️ **Paste HTML**:
    *   Navigate to the UI Locator Extractor application running locally.
    *   Paste the copied HTML code into the large text area provided.
3.  ⚙️ **Extract Locators**:
    *   Click the "Extract Locators" button.
4.  👀 **View Results**:
    *   The application will process the HTML and display a list of found UI elements below the input form.
    *   Each item in the list will show:
        *   The element's tag name (e.g., `<DIV>`, `<BUTTON>`).
        *   Key identifiers like ID, name, classes, and a snippet of its text content.
        *   A list of "Potential Locators" (ID, CSS, XPath).
5.  📋 **Copy Locators**:
    *   Hover over a locator entry. A copy icon will appear.
    *   Click the copy icon next to the desired locator string. It will be copied to your clipboard. A confirmation checkmark will briefly appear.
6.  🔍 **Filter Results (Optional)**:
    *   If you have many results, use the "Advanced Search & Filters" section (open by default, can be collapsed).
    *   **Omni-Search**: Type keywords to search across all data.
    *   **Filter by Tag Name**: Select a tag from the dropdown to see only elements of that type.
    *   **Filter by Locator Type**: Select a locator type from the dropdown to see only elements that have at least one locator of that type.
    *   Click "Reset Filters" to clear all active filters.
7.  🗑️ **Clear Input**:
    *   Click the "Clear" button to remove the HTML from the input area and clear any displayed results.
8.  🌐 **Switch Language**:
    *   Click the language toggle button (showing "EN" or "JA") in the top-right corner to switch the UI language between English and Japanese.

## 💻 Technical Stack

*   ⚛️ **Frontend Library**: React
*   📘 **Language**: TypeScript with JSX (`.tsx`)
*   🔨 **Build Tool**: esbuild (for fast bundling and transpilation)
*   📦 **Package Manager**: npm
*   🌬️ **Styling**: Tailwind CSS (via CDN)
*   ✨ **Icons**: Lucide React (via npm)
*   🧩 **HTML Parsing**: Browser's native `DOMParser` API.

## 🗺️ Locator Generation Strategy

The application employs a series of strategies to generate robust and varied locators:

*   🏷️ **Direct Attributes**: Leverages `id`, `name`, and `class` attributes directly for both CSS and XPath.
*   `< >` **Tag Name**: Uses the element's tag name as a basic selector.
*   🎯 **Attribute Selectors**: Targets common and testing-friendly attributes like `data-testid`, `data-cy`, `aria-label`, `placeholder`, `title`, and `alt`.
*   💬 **Text Content**: For `<a>` tags and other elements with distinguishable text, it generates XPath locators based on exact or partial text matches.
*   🧭 **Full XPath**: Calculates a precise XPath from the root of the parsed HTML fragment to the element, including indices for sibling elements of the same type.
*   ➕ **Combination**: Combines tag name with classes or attributes for more specific CSS and XPath locators.
*   🛡️ **Uniqueness and Escaping**: Ensures CSS selectors for IDs are properly escaped. IDs are preferred for XPath if unique within the parsed context. Quotes within attribute values are escaped for XPath. Duplicate locator values are automatically removed.

The tool aims to provide a practical set of locators, prioritizing those that are generally more resilient to page changes (like IDs and custom data attributes).

## 👤 Author

*   **Name**: Tuan Anh Do Hoang
*   **Company**: 🏢 Rakus Vietnam Co., Ltd.
*   **GitHub Profile**: 🔗 <a href="https://github.com/rakusvn-dhtanh" target="_blank" rel="noopener noreferrer">https://github.com/rakusvn-dhtanh</a>

---
*This README provides an overview of the UI Locator Extractor application, its features, setup, and usage instructions.*

---

<a name="日本語版-japanese-version"></a>
## 日本語版 (Japanese Version)

# UIロケーター抽出ツール 🚀

貼り付けられたHTMLコンテンツを解析し、UI要素のさまざまなCSSセレクターおよびXPathロケーターを抽出するウェブアプリケーションです。このツールは、ウェブ開発者、QAエンジニア、およびウェブスクレイピングやテスト自動化に関わるすべての人々を支援し、ページ上の要素を特定するための複数の方法を提供することを目的としています。

## ✨ 主な機能

*   📄 **HTML解析**: RAW HTML文字列入力を受け付けます。
*   🎯 **包括的なロケーター抽出**:
    *   `#️⃣` **ID**: `elementId`
    *   🎨 **CSSセレクター**:
        *   ID別: `#elementId`
        *   Name属性別: `tagName[name='elementName']`
        *   クラス別: `tagName.class1.class2`
        *   タグ名別: `tagName`
        *   共通属性別: `tagName[data-testid='value']`, `tagName[aria-label='value']`, など。
    *   🌳 **XPathロケーター**:
        *   ID別: `//*[@id='elementId']`
        *   Name属性別: `//tagName[@name='elementName']`
        *   クラス別: `//tagName[contains(@class, 'class1') and ...] `
        *   タグ名別 (具体性は低いが、通常は完全XPathでインデックスと組み合わせて使用)
        *   テキストコンテンツ別: `//tagName[normalize-space(.)='正確なテキスト']`, `//tagName[contains(normalize-space(.), '部分的なテキスト')]` (特に `<a>` タグの場合)
        *   共通属性別: `//tagName[@attribute='value']`
        *   計算された完全なXPath: 例 `/html/body/div[1]/p[2]`
*   ℹ️ **詳細な要素情報**: タグ名、ID、name属性、CSSクラス、テキストコンテンツのサンプル、およびその他の関連するHTML属性を表示します。
*   📋 **クリップボードへ簡単コピー**: 生成されたロケーターをワンクリックで迅速にコピーします。
*   🔬 **高度なフィルタリング**:
    *   **オムニサーチ**: すべての要素プロパティ（タグ、ID、クラス、テキスト、属性、ロケーター値）を横断して検索します。
    *   **タグ名フィルター**: 特定のタグタイプ（例：`DIV`、`INPUT`）の要素のみを表示します。
    *   **ロケータータイプフィルター**: 特定のタイプのロケーター（例："XPath"、"CSS Selector"）を持つ要素のみを表示します。
*   🌐 **多言語対応**: インターフェースは英語と日本語で利用可能です。
*   🖌️ **使いやすいインターフェース**:
    *   📱💻 さまざまな画面サイズでの使いやすさを考慮したレスポンシブデザイン。
    *   ✔️ 明確な読み込み状態、エラーメッセージ、およびユーザーフィードバック。
    *   🗑️ 入力と結果を簡単にクリアするオプション。

## ▶️ アプリケーションをローカルで実行する

このプロジェクトはTypeScriptとJSX（`.tsx`ファイル）を使用しており、`esbuild`でビルドし、`live-server`で実行するように設定されています。

1.  **リポジトリをクローンする**:
    まだクローンしていない場合は、プロジェクトをローカルマシンにクローンします。
    ```bash
    # <repository-url> を実際のリポジトリURLに置き換えてください
    git clone <repository-url>
    cd <repository-directory-name>
    ```

2.  **依存関係をインストールする**:
    このコマンドは`package.json`ファイルを読み込み、必要なすべての依存関係（React、Lucide-Reactなど）と開発ツール（TypeScript、esbuild、live-serverなど）を`node_modules`ディレクトリにインストールします。
    ```bash
    npm install
    ```

3.  **アプリケーションをビルドする**:
    このコマンドは`esbuild`を使用して、`index.tsx`とそのインポートからTypeScript/JSXコードをトランスパイルし、それらをバンドルして、プロジェクトルートに`index.js`という名前の単一のJavaScriptファイルを作成します。
    ```bash
    npm run build
    ```
    `npm run typecheck`を実行して、ビルドせずにTypeScriptのエラーをチェックすることもできます。

4.  **アプリケーションを実行する**:
    このコマンドは、`index.html`ファイルとバンドルされた`index.js`を提供するシンプルなローカル開発サーバーである`live-server`を起動します。デフォルトのウェブブラウザでアプリケーションが自動的に開きます。
    ```bash
    npm start
    ```
    または、`npm run build`を実行した後、プロジェクトルートから手動で`live-server`を起動することもできます。
    ```bash
    npx live-server .
    ```
    `.tsx`または`.ts`ソースファイルへの変更は、ブラウザで更新を確認するために`npm run build`を再実行する必要があります（live-serverはページを自動リロードする場合がありますが、ビルドを自動的に再実行しません）。

## 📖 使い方 (実行後)

1.  ✂️ **HTMLを取得する**:
    *   ブラウザで検査したいウェブページを開きます。
    *   ブラウザの開発者ツールを使用します（通常、要素を右クリックして「検証」または「要素を調査」を選択）。
    *   関心のあるHTML要素またはセクションを見つけます。特定の要素のHTML（多くの場合「OuterHTMLをコピー」）またはより大きなセクション、あるいは`<body>`コンテンツ全体をコピーできます。
2.  ⌨️ **HTMLを貼り付ける**:
    *   ローカルで実行されているUIロケーター抽出アプリケーションに移動します。
    *   コピーしたHTMLコードを提供された大きなテキストエリアに貼り付けます。
3.  ⚙️ **ロケーターを抽出する**:
    *   「ロケーターを抽出」ボタンをクリックします。
4.  👀 **結果を表示する**:
    *   アプリケーションがHTMLを処理し、入力フォームの下に見つかったUI要素のリストを表示します。
    *   リストの各項目には以下が表示されます:
        *   要素のタグ名（例：`<DIV>`、`<BUTTON>`）。
        *   ID、name、クラスなどの主要な識別子、およびそのテキストコンテンツのスニペット。
        *   「潜在的なロケーター」（ID、CSS、XPath）のリスト。
5.  📋 **ロケーターをコピーする**:
    *   ロケーターエントリにマウスオーバーします。コピーアイコンが表示されます。
    *   目的のロケータ文字列の横にあるコピーアイコンをクリックします。クリップボードにコピーされます。確認のチェックマークが短時間表示されます。
6.  🔍 **結果をフィルタリングする (オプション)**:
    *   結果が多い場合は、「高度な検索とフィルター」セクションを使用します（デフォルトで開いており、折りたたむことができます）。
    *   **オムニサーチ**: すべてのデータを横断してキーワードを入力します。
    *   **タグ名でフィルター**: ドロップダウンからタグを選択して、そのタイプの要素のみを表示します。
    *   **ロケータータイプでフィルター**: ドロップダウンからロケータータイプを選択して、そのタイプのロケーターを少なくとも1つ持つ要素のみを表示します。
    *   「フィルターをリセット」をクリックして、すべてのアクティブなフィルターをクリアします。
7.  🗑️ **入力をクリアする**:
    *   「クリア」ボタンをクリックして、入力エリアからHTMLを削除し、表示されている結果をクリアします。
8.  🌐 **言語を切り替える**:
    *   右上隅にある言語切り替えボタン（「EN」または「JA」と表示）をクリックして、UI言語を英語と日本語の間で切り替えます。

## 💻 技術スタック

*   ⚛️ **フロントエンドライブラリ**: React
*   📘 **言語**: TypeScript (JSX使用 - `.tsx`)
*   🔨 **ビルドツール**: esbuild (高速なバンドルとトランスパイルのため)
*   📦 **パッケージマネージャー**: npm
*   🌬️ **スタイリング**: Tailwind CSS (CDN経由)
*   ✨ **アイコン**: Lucide React (npm経由)
*   🧩 **HTML解析**: ブラウザネイティブの `DOMParser` API

## 🗺️ ロケーター生成戦略

このアプリケーションは、堅牢で多様なロケーターを生成するために一連の戦略を採用しています。

*   🏷️ **直接属性**: `id`、`name`、`class`属性をCSSとXPathの両方に直接活用します。
*   `< >` **タグ名**: 要素のタグ名を基本的なセレクターとして使用します。
*   🎯 **属性セレクター**: `data-testid`、`data-cy`、`aria-label`、`placeholder`、`title`、`alt`のような一般的でテストに適した属性をターゲットにします。
*   💬 **テキストコンテンツ**: `<a>`タグや識別可能なテキストを持つ他の要素に対して、完全一致または部分一致に基づいてXPathロケーターを生成します。
*   🧭 **完全XPath**: 解析されたHTMLフラグメントのルートから要素までの正確なXPathを計算します（同じタイプの兄弟要素のインデックスを含む）。
*   ➕ **組み合わせ**: タグ名とクラスまたは属性を組み合わせて、より具体的なCSSおよびXPathロケーターを作成します。
*   🛡️ **一意性とエスケープ**: ID用のCSSセレクターが適切にエスケープされるようにします。解析されたコンテキスト内で一意であれば、XPathではIDが優先されます。属性値内の引用符は XPath 用にエスケープされます。重複するロケーター値は自動的に削除されます。

このツールは、一般的にページの変更に対してより耐性のあるロケーター（IDやカスタムデータ属性など）を優先して、実用的なロケーターセットを提供することを目指しています。

## 👤 作成者

*   **名前**: ド・ホアン・トゥアン・アイン (Tuan Anh Do Hoang)
*   **会社**: 🏢 株式会社ラクスマベトナム (Rakus Vietnam Co., Ltd.)
*   **GitHub プロファイル**: 🔗 <a href="https://github.com/rakusvn-dhtanh" target="_blank" rel="noopener noreferrer">https://github.com/rakusvn-dhtanh</a>

---
*このREADMEは、UIロケーター抽出アプリケーションの概要、機能、セットアップ、および使用方法について説明しています。*