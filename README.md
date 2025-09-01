# Books and Authors Collection App

## What's This About?

A simple app to help you keep track of your favourite books and authors. It has two tabs — one for adding books and another for authors — with nice touches like dropdown menus and validation to make sure you don’t miss anything important.  

It’s designed to work smoothly on mobile, tablet, and desktop.  

---

## Features

- **Responsive design**: Works well on mobile and desktop  
- **Smart dropdowns**: Multi-select genres, scrollable year lists  
- **Real-time validation**: Errors show instantly and clear when fixed  
- **Feedback**: Toast notifications when you add items  
- **Clean UI**: Split-screen layout with gradient background  

---

## How It Works

### Structure
- Reusable components for UI  
- Custom hooks for logic (validation, dropdowns, toast)  

### Forms
- Separate forms for books and authors  
- Real-time validation with instant error clearing  
- Genre picker with multiple selections displayed as chips  

### Interactions
- Toast notifications slide in on success  
- Smooth hover and click states  
- Adaptive layout across screen sizes  

### Data Fields
- **Books**: Title, genres (multi-select), publication year (1800+)  
- **Authors**: First name, last name, birth year (1900+)  
- All fields are **required and validated**  

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) — React framework  
- [TypeScript](https://www.typescriptlang.org/) — Static typing  
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling  
- Custom React hooks — Reusable logic  

---

## Getting Started

Clone the repo and run locally:

```bash
# Grab the code
git clone <your-repo-url>
cd books-authors-app

# Install dependencies
npm install

# Start the dev server
npm run dev
