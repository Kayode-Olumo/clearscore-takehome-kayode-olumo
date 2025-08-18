# ClearScore Insights Application

## Introduction

This is my submission for the ClearScore tech test. The task was to implement a small, production-ready slice of a design system that powers an "Insights" feature. The goal was to show how I structure a Next.js application, handle business logic, and implement designs in a clean and maintainable way.

The feature focuses on three insights: Public information, Credit utilisation, and Electoral roll, each displayed as cards that adapt to screen size. Logic is driven by the credit report JSON, with conditional styling and language for "On Track" / "Off Track" states. As a stretch, clicking the Electoral Roll card opens a drawer with additional details from a secondary dataset.

---

## Solution Overview

This project demonstrates:
- **Responsive Layouts**: Cards are horizontally scrollable on small and medium screens, and displayed in a grid on larger screens.
- **Design System Elements**: Reusable components such as Card, Pill, and Drawer are placed in a `ui/elements` folder to form the foundation of a design system.
- **Business Logic**: On/off track states are derived directly from the provided credit report JSON.
- **Data Integration**: 
  - The credit report is fetched from the provided API.
  - Additional insight details are retrieved for the Electoral Roll card from a second API.
- **Scalable Structure**: The codebase is organised into features, ui, lib, and styles folders, making it easy to extend and maintain.
- **Styling**: Tailwind CSS is used with custom design tokens and utility classes to stay consistent with the design spec.

---

## Approach

### 1. Design System First
Broke the UI into reusable primitives (Card, Pill, Drawer) under `src/ui/elements`. Each maps directly to values defined in the design tokens.

### 2. Feature Encapsulation
All insight-related code is grouped in `src/features/insights`, keeping business logic, API calls, and rendering self-contained.

### 3. Responsive Layouts
- **Small/Medium**: Horizontal scroll with two cards fully visible and part of a third.
- **Large/X-Large**: Grid layout with equal card height and consistent spacing.

### 4. Business Logic
- **Public Info**: Off track if any CCJs or insolvencies exist.
- **Credit Utilisation**: Off track if balance is at least 50% of limit.
- **Electoral Roll**: Off track if the user is not currently registered.

### 5. Drawer Interaction
Clicking the Electoral Roll card loads and displays additional details. The drawer spans the full width on mobile, but becomes a right-hand panel from medium breakpoint upwards.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with custom design tokens)
- **HTTP Client**: Axios (wrapped in `lib/http.ts`)
- **Testing**: Jest with React Testing Library
- **Utilities**: clsx, tailwind-merge for class management

---

## Project Structure

```
src/
 ├─ app/                  # Next.js App Router
 │   ├─ layout.tsx
 │   ├─ page.tsx
 │   └─ globals.css       # Tailwind + custom design tokens
 │
 ├─ features/
 │   └─ insights/         # Insights feature
 │       ├─ components/
 │       │   ├─ InsightsSection.tsx
 │       │   ├─ InsightCard.tsx
 │       │   └─ __tests__/
 │       ├─ lib/
 │       │   ├─ insights.ts      # Business logic
 │       │   ├─ hooks.ts         # Custom hooks
 │       │   └─ types.ts         # TypeScript types
 │       └─ index.ts
 │
 ├─ ui/
 │   └─ elements/         # Reusable design system elements
 │       ├─ Card.tsx
 │       ├─ Pill.tsx
 │       └─ Drawer.tsx
 │
 ├─ lib/
 │   ├─ api.ts            # API calls
 │   └─ http.ts           # Axios instance
 │
 └─ styles/
     └─ components.ts     # Component specific styles
```

---

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Kayode-Olumo/clearscore-takehome-kayode-olumo.git
   cd clearscore-takehome-kayode-olumo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_REPORT_URL=your_credit_report_api_url
   NEXT_PUBLIC_INSIGHT_DETAILS_URL=your_insight_details_api_url
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   ```

4. **Run the dev server:**
   ```bash
   npm run dev
   ```

5. **Open http://localhost:3000** in your browser.

## Live Preview

You can also view the live application at: [https://clearscore-takehome-kayode-olumo.vercel.app/](https://clearscore-takehome-kayode-olumo.vercel.app/)

---

## Testing

The project includes component and business logic tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

---

## Design System

The application uses a custom design system with:
- **Design Tokens**: Defined in `globals.css` with CSS custom properties
- **Component Styles**: Centralized in `styles/components.ts` using Tailwind utilities
- **Responsive Breakpoints**: Custom breakpoints (small: 375px, medium: 768px, large: 1024px, xlarge: 1280px)
- **Typography**: Custom font sizes and ClearScore Clarity font family
- **Spacing**: Consistent spacing scale using CSS custom properties

---

## Notes and Considerations

- **Timeboxed**: Approximately four hours, in line with the brief.
- **Fonts**: CSClarity-Regular and CSClarity-Bold are referenced but mocked locally. In a production environment they would be embedded or imported properly.
- **Styling**: Follows the provided tokens, though fine-tuning against the official ClearScore design system may be required.
- **Error Handling**: Basic error handling for API failures and loading states.
- **Accessibility**: ARIA attributes and semantic HTML for the drawer component.

---

## Future Improvements

If I had more time, I would focus on three main areas:

### UX polish
- Add loading skeletons while data is being fetched.
- Refine the drawer with better transitions, focus management, and escape key support.
- Improve hover and active states for interactive elements.

### Performance
- Introduce caching with SWR or React Query to reduce unnecessary API calls.
- Add error boundaries to handle failures gracefully.
- Optimise the horizontal scroll experience on mobile.

### Testing / QA
- Expand test coverage to include more edge cases.
- Add integration tests for the drawer interaction.
- Run accessibility checks (axe, Lighthouse) to ensure compliance.
