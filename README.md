# Branda V2 - Frontend Developer Screening

This project is a Next.js (App Router) based frontend for the Branda V2 branding ecosystem. It features multi-market support (Nigeria, USA, UK, Canada), a responsive product catalog, a shopping cart, and a checkout mock.

## Setup Instructions

1. **Install Dependencies**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The root URL automatically redirects to the default market (`/ng`).

3. **Build for Production**
   ```bash
   npm run build
   npm run start
   ```

## Key Decisions

### Architecture & Routing
- Used **Next.js App Router** for its modern server-centric routing.
- Implemented **Multi-market routing** using dynamic segments (`src/app/[market]`). This means `/ng` and `/us` have distinct URLs for SEO purposes, but share the same layout and page components.
- Default market redirects from `/` to `/ng`.

### State Management
- **Client State**: Used **Zustand** (`src/store/useCart.ts`) for the shopping cart. It's lightweight, avoids React Context re-render hell, and perfectly suited for global client-side state.

### Data Fetching
- For this screening, mock data (`src/data/mockData.ts`) is used.
- In a real scenario, Server Components would fetch from the API directly.
- Next.js default caching mechanism makes the initial payload incredibly fast.

### Styling
- **Tailwind CSS** for responsive, mobile-first utility classes.

### Vercel Deployment
To deploy this project:
1. Push this code to a GitHub repository.
2. Go to Vercel, import the repository.
3. Vercel will auto-detect Next.js and build it. No extra configuration required.

---

## Written Answers

(Please refer to `ANSWERS.md` in the root directory for the detailed responses to Tasks 2, 3, 4, and 5).
