# Branda V2 Frontend Developer Screening Answers

## Task 2: Frontend Performance and Problem Solving

### Slow initial page load & rendering strategy
- **Root Cause**: Could be due to large initial JavaScript payloads or relying too much on Client Components.
- **Solution**: Shift rendering to the server where possible. I'd use Server Components for content-heavy pages (like listing or detail pages) and only use Client Components for interactive elements (like the add-to-cart button or filters). Utilizing SSR or ISR would significantly reduce the Time To First Byte (TTFB).

### Images taking too long to load
- **Root Cause**: Unoptimized images, serving large formats, or lacking lazy loading.
- **Solution**: Use `next/image` to automatically serve optimized formats (like WebP/AVIF), compress images, resize them based on device width, and lazy load images off-screen. Use `priority` on the LCP image (e.g., product hero image).

### Poor mobile performance
- **Root Cause**: Loading desktop-sized assets, blocking main thread with heavy JS, or non-responsive styling.
- **Solution**: Implement mobile-first CSS with Tailwind, ensuring touch targets are large enough. Defer non-critical scripts and minimize main thread work by code-splitting routes and components.

### Excessive API requests & API request optimization
- **Root Cause**: Component remounts triggering duplicate fetches, or lack of caching.
- **Solution**: In Next.js App Router, `fetch` requests are cached by default. For client-side requests, I'd use React Query or SWR for deduping, caching, and background revalidation. Batching and debouncing user inputs (like search bars) will reduce rapid-fire network requests.

### Components re-rendering unnecessarily
- **Root Cause**: Unstable references passed as props or missing memoization.
- **Solution**: Use `useMemo` for expensive calculations and `useCallback` for functions passed down to child components. Use React Developer Tools Profiler to identify render bottlenecks.

### Large JavaScript bundle size
- **Root Cause**: Importing entire libraries (like lodash) instead of specific modules, or not code-splitting.
- **Solution**: Use dynamic imports (`next/dynamic`) for components not immediately visible (like modals or below-the-fold content). Use bundle analyzer to identify and tree-shake unused dependencies.

### Core Web Vitals (LCP, INP, CLS)
- **LCP (Largest Contentful Paint)**: Optimize the main hero image with `priority` and fast CDN delivery.
- **INP (Interaction to Next Paint)**: Keep the main thread free by avoiding heavy JS execution on user interactions.
- **CLS (Cumulative Layout Shift)**: Define explicit `width` and `height` for images to reserve space before loading. Avoid injecting dynamic content above existing content without reserving space.


## Task 3: Code Quality and Architecture

### Component architecture and reusable components
I structure components by domain and reusability (e.g., `components/ui` for primitives like Buttons and Inputs, and `components/features` for domain-specific components like ProductCard or CartSummary). 

### Folder and file structure in the Next.js App Router
```
src/
  app/
    [market]/
      (shop)/
        page.tsx
        category/[slug]/page.tsx
        product/[id]/page.tsx
      cart/page.tsx
      layout.tsx
  components/
    ui/
    product/
    layout/
  lib/
  hooks/
  store/
  types/
```

### State management
- **Server State**: Managed via Next.js native `fetch` caching and Server Components for initial load. For complex client-fetching, React Query or SWR.
- **Client State**: Zustand for global state (like Cart state) because it's lightweight and easy to set up without Context boilerplate. Local state via `useState`.

### Form handling and validation
React Hook Form paired with Zod for schema validation. This ensures type safety from the form input all the way to the API request, with minimal re-renders.

### Error handling
Use Next.js `error.tsx` boundaries to catch render errors. For API errors, standard try/catch blocks with toast notifications for the user.

### Authentication and user state
Use NextAuth.js (Auth.js) for handling sessions, social logins, and JWTs. Protected routes are handled via Next.js Middleware to redirect unauthenticated users before page render.

### Multi-market, multi-currency and localization
Use dynamic route segments `/[market]` to handle different regions (e.g., `/ng` or `/us`). 
Currency formatting and content can be derived from the `market` parameter. 
Use `metadata` API in Next.js to inject proper `hreflang` tags and localized Open Graph data per market.

### Responsive design approach
Mobile-first design using Tailwind CSS utility classes (e.g., `flex-col md:flex-row`).

### Code maintainability, testing and documentation
- ESLint and Prettier for strict formatting.
- TypeScript for static typing.
- Jest and React Testing Library for unit testing UI components.
- Playwright for end-to-end user flows (like checkout).

### Git and version control workflow
Feature branch workflow. `main` for production, `develop` for staging. PRs require peer review and passing CI checks (linting, testing, building) before merging.


## Task 4: Website and Product Review (www.branda.com.ng)

### 3 things working well:
1. **Clear Value Proposition**: The website clearly states what it does immediately above the fold.
2. **Visual Hierarchy**: Categories are distinct and visually separated.
3. **Consistent Branding**: The color scheme aligns with a professional branding service.

### 5 areas for improvement:
1. **Mobile Navigation**: The mobile menu could be more intuitive and less cluttered.
2. **Image Loading Speeds**: High-resolution images seem unoptimized, causing layout shifts and slow LCP.
3. **Accessibility**: Some text contrasts are low, and keyboard navigation lacks proper focus indicators.
4. **Search Functionality**: Search could be improved with auto-suggestions or faster debouncing.
5. **Checkout Flow**: The steps to checkout feel slightly disjointed and could be streamlined into a single-page or clearer multi-step wizard.

### 3 practical improvements to prioritize for V2:
1. **Implement `next/image` & Responsive Loading**: To fix performance and CLS issues across the 4 international markets.
2. **Streamlined Internationalization Architecture**: Introduce a robust `/[market]` routing strategy with localized pricing (Naira, USD, GBP, CAD) to improve SEO and user trust.
3. **Revamped Component Library**: Build a strict, accessible UI component system (using Radix UI or similar) to ensure consistency across the expanded platform.


## Task 5: Short Answer Questions

**1. Describe a frontend project you have worked on...**
I worked on the Ogwugo Food Web and mobile application. My role was building the frontend for both the web and mobile and connecting all the APIs and endpoints. It had a whole lot of complex functionalities like the rider location tracking on the admin dashboard, and some other features. It also had a large user database, so I ensured I made it optimized and easy to navigate without any lags.

**2. Which frontend technologies and frameworks are you strongest in...**
I am strongest in React, React Native, Next.js, and TypeScript. I have extensive experience leveraging Next.js App Router for hybrid rendering strategies, API routes, and optimized assets, coupled with Tailwind CSS for rapid, maintainable styling.

**3. When would you choose SSR, SSG, ISR or client-side rendering...**
- **SSG**: For static pages that rarely change (About Us, Terms).
- **ISR**: For product catalogs where data changes occasionally but fast loading is critical.
- **SSR**: For highly dynamic, user-specific pages or real-time inventory checks.
- **CSR**: For highly interactive dashboards or components like complex calculators behind authentication.

**4. How do you decide between Server Components and Client Components?**
I default to Server Components for everything (data fetching, layout, static content). I only add the `"use client"` directive when I need interactivity (onClick, hooks like useState/useEffect) or browser APIs.

**5. How do you usually identify and fix slow frontend performance?**
I use Lighthouse for high-level metrics (Core Web Vitals) and React Profiler to catch unnecessary re-renders. I fix issues by lazy loading heavy components, optimizing images, memoizing callbacks, and verifying efficient network caching.

**6. What is your approach to building reusable and scalable React components?**
I separate logic from presentation. I build highly configurable UI primitives (Buttons, Modals) using polymorphic props or composition. I ensure strict typing with TypeScript and document usage via Storybook.

**7. How do you handle API loading, error and empty states in Next.js?**
I use `loading.tsx` to automatically render skeletons during Server Component transitions. `error.tsx` catches and displays fallback UI for failures. For empty states, I return specific semantic UI components when data arrays are empty.

**8. How would you handle SEO for a multi-market site with localized content?**
I would use subfolder routing (`/us`, `/ng`) to separate markets without diluting domain authority. I'd dynamically generate metadata (title, descriptions) and use `<link rel="alternate" hreflang="...">` tags in the `<head>` to indicate language/region variants to search engines.

**9. How do you ensure a website works properly across different screen sizes and browsers?**
I adopt a mobile-first responsive strategy with CSS grid/flexbox. I use BrowserStack for cross-browser testing (Safari, Chrome, Firefox) and rely on Autoprefixer (via PostCSS/Tailwind) for vendor prefixes.

**10. What tools do you use for debugging frontend issues?**
Chrome DevTools (Network tab for API issues, Elements for CSS), React Developer Tools (for state/props and profiling), and Sentry for catching runtime errors in production.

**11. What steps do you take to improve Core Web Vitals?**
- LCP: Preload hero images, implement SSR/SSG.
- CLS: Define explicit dimensions for all media, avoid dynamic DOM injection above existing content.
- INP: Minimize main thread work, defer non-essential scripts, and use `startTransition` for non-urgent UI updates.

**12. Describe a difficult frontend bug you encountered and how you solved it.**
A tricky bug involved a memory leak in a real-time dashboard caused by un-cleared WebSocket connections and stale closures inside `useEffect`. I solved it by returning a cleanup function in the effect that explicitly disconnected the socket and properly managed dependency arrays to prevent stale state.

**13. How do you ensure your code remains maintainable when working on a large product with multiple developers?**
I enforce strict ESLint rules, Prettier formatting, and TypeScript compiler checks. I write modular code following a feature-based folder structure, require unit tests for critical business logic, and maintain clear README documentation.
