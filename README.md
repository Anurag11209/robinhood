# Stockfolio - Stock Trading Platform Documentation
## Project Overview
Stockfolio is a modern stock trading platform built with Next.js, Tailwind CSS, and Radix UI. It provides users with a simplified interface to view market data, manage their portfolio, and execute trades. This documentation provides a comprehensive guide to the project's structure, components, and usage.
### Key Features
*   **Market Overview:** Displays trending stocks, top gainers, and top losers.
*   **Stock Search:** Allows users to search for specific stocks and view detailed information.
*   **Stock Details:** Provides real-time stock prices, charts, news, and key statistics.
*   **Trading:** Enables users to buy and sell stocks.
*   **Portfolio Management:** Tracks user's portfolio value, holdings, and transaction history.
*   **Watchlist:** Allows users to create a personalized watchlist of stocks.
*   **Theme Toggle:** Supports light and dark themes.
### Supported Platforms or Requirements
*   Modern web browsers (Chrome, Firefox, Safari, Edge)
*   Node.js (v18 or higher)
*   npm or yarn package manager
## Getting Started
### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
    
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    
### Setup
1.  **Configure environment variables:**
    *   This project uses mock data, so no API keys are required for basic functionality. However, if you plan to integrate with a real stock API, you'll need to set up the appropriate environment variables.
2.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    
    This will start the Next.js development server, and you can access the application at `http://localhost:3000`.
## Code Structure
The project is organized into the following directories:
*   `app/`: Contains the Next.js application routes and pages.
*   `components/`: Contains reusable UI components.
*   `hooks/`: Contains custom React hooks.
*   `lib/`: Contains utility functions and API service logic.
*   `public/`: Contains static assets such as images and fonts.
*   `styles/`: Contains global CSS styles.
### Key Components
*   **`app/`**
    *   `portfolio/page.tsx`: Displays the user's portfolio summary, holdings, and transaction history.
    *   `stock/[symbol]/page.tsx`: Displays detailed information for a specific stock.
    *   `page.tsx`: The home page, displaying market overview, watchlist, and portfolio value.
    *   `layout.tsx`: The root layout component, providing the basic structure and theme provider.
*   **`components/ui/`**: Contains reusable UI components built with Radix UI and Tailwind CSS.
*   **`components/`**
    *   `portfolio-history.tsx`: Displays the user's transaction history.
    *   `portfolio-holdings.tsx`: Displays the user's current stock holdings.
    *   `portfolio-summary.tsx`: Displays a summary of the user's portfolio value and performance.
    *   `portfolio-value.tsx`: Displays a chart of the user's portfolio value over time.
    *   `search-stocks.tsx`: Implements the stock search functionality.
    *   `stock-actions.tsx`: Provides the UI for buying and selling stocks.
    *   `stock-chart.tsx`: Displays a chart of the stock's price history.
    *   `stock-info.tsx`: Displays key statistics for a stock.
    *   `stock-list.tsx`: Displays a list of top stocks.
    *   `stock-news.tsx`: Displays recent news articles related to a stock.
    *   `theme-provider.tsx`: Provides the theme context for the application.
    *   `theme-toggle.tsx`: Allows users to switch between light and dark themes.
    *   `watch-list.tsx`: Displays the user's watchlist of stocks.
*   **`lib/`**
    *   `portfolio.ts`: Contains mock functions for fetching and managing portfolio data.
    *   `stock-api.ts`: Contains mock functions for fetching stock data and news.
    *   `utils.ts`: Contains utility functions for common tasks.
*   **`hooks/`**
    *   `use-mobile.tsx`: Custom hook to detect mobile devices.
    *   `use-toast.ts`: Custom hook to manage toast notifications.
## API Documentation
This project uses mock API functions within `lib/portfolio.ts` and `lib/stock-api.ts` to simulate data fetching. In a real application, these would be replaced with actual API calls to a backend server or third-party stock data provider.
