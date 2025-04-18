# Next.js E-commerce Product Page

## Project Setup

This project is a modern e-commerce product page built with:

-   **Next.js**: React framework for production
-   **TypeScript**: For type safety
-   **Tailwind CSS**: For styling
-   **Various UI components**: Custom-built and potentially from UI libraries

## Key Technical Decisions

-   **Tailwind CSS Configuration**: Custom color theming with product-specific colors
-   **Component Architecture**: Modular components for product display, cart interactions
-   **Dark Mode Support**: Built-in theme switching capability
-   **Responsive Design**: Mobile-first approach for all components
-   **E-commerce Component Structure**:
    -   Product display components (Gallery, Info, Selectors)
    -   Interactive UI elements (QuantitySelector, ColorSelector, SizeSelector)
    -   Cart management with sliding drawer interface
    -   Expandable sections for product details
-   **State Management**: React hooks for cart functionality and theme control
-   **Client-side Rendering**: App uses client components for interactive elements
-   **Accessibility Features**: Proper ARIA attributes in navigation and interactive components
-   **Dynamic Product Loading**: Product data fetched and displayed with loading states
-   **Responsive Image Handling**: Zoomable product images with color-specific selection

## How to Run the Project

1. **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

2. **Start development server**:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

3. **Open browser**: Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production**:
    ```bash
    npm run build
    npm start
    ```
