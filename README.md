# Books and Authors Collection App

## What's This About?

I built a simple app to help you keep track of your favourite books and authors. It's got two tabs - one for adding books and another for authors - with some nice touches like dropdown menus and validation to make sure you don't miss anything important.

The whole thing is designed to work well on your phone, tablet, or computer, and I've tried to make it feel smooth and easy to use.

---

## What It Does

Here's what you'll find:
- **Works everywhere**: Looks great on mobile and desktop
- **Smart dropdowns**: Pick multiple genres for books, select years from scrollable lists
- **Helpful validation**: It'll let you know if you've missed something and clear errors as you fix them
- **Nice feedback**: Toast notifications pop up when you successfully add something
- **Clean design**: Split-screen layout with a lovely gradient background

---

## How I Built It

### The Structure
I've split everything into reusable pieces - custom hooks for the logic and components for the UI bits. This makes it easier to maintain and test.

### Forms That Actually Help
- Each form (books and authors) manages its own data
- Validation happens in real-time - fix an error and it disappears
- The genre picker lets you select multiple options and shows them as little chips

### Making It Feel Good
- Toast notifications slide in when you submit something
- Everything responds nicely to clicks and hovers
- The layout adapts smoothly from desktop to mobile

### What Goes Where
- **Books**: Title, genres (multi-select), and publication year (1800 onwards)
- **Authors**: First name, last name, and birth year (1900 onwards)
- All fields are validated and required

---

## Tech I Used

- **Next.js 15** - The React framework
- **TypeScript** - For catching mistakes early
- **Tailwind CSS** - For styling without the headache
- **Custom React hooks** - To keep the logic tidy

---

## Getting It Running

1. **Grab the code:**
   \`\`\`bash
   git clone <your-repo-url>
   cd books-authors-app
   \`\`\`

2. **Install the bits:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Fire it up:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Check it out at http://localhost:3000**

---

## What's Where

\`\`\`
├── app/
│   ├── page.tsx              # The main app
│   ├── layout.tsx            # Page wrapper
│   └── globals.css           # Styles
├── components/
│   ├── toast.tsx             # Success messages
│   ├── multi-select-dropdown.tsx  # Genre picker
│   └── year-dropdown.tsx     # Year selector
├── hooks/
│   ├── use-form-validation.ts # Form checking logic
│   ├── use-toast.ts          # Toast message handling
│   └── use-dropdown.ts       # Dropdown behaviour
└── components/ui/            # Basic UI components
\`\`\`

---

## The Good Bits

### Books Section
- Type in any book title
- Pick from 14 different genres (you can choose several)
- Select publication year from 1800 to now

### Authors Section  
- Add first and last names
- Pick birth year from 1900 to present

### Nice Touches
- Switch between tabs easily
- Errors show up when you submit, disappear when you fix them
- Success messages slide in smoothly
- Your data gets shown as JSON (for now)
- Everything works on mobile

---

## Design Choices

I went for a clean, friendly look:
- **Colours**: Mint green for books, soft purple for authors
- **Typography**: Bold headings with some italic flair
- **Layout**: Plenty of breathing room, consistent spacing
- **Interactions**: Smooth hover effects and focus states

---

## Things to Know

- **No saving yet**: Your data disappears when you refresh (perfect for testing though!)
- **Client-side only**: All validation happens in your browser
- **Modern browsers**: You'll need something reasonably recent
- **Accessible**: I've added proper labels and keyboard support

---

## What I'd Add Next

Given more time, here's what I'd love to improve:

### Better Data Handling
- Save your books and authors locally
- Add a proper database
- Auto-save as you type

### Even Nicer Experience
- Loading spinners for submissions
- Confirmation before clearing forms
- Keyboard shortcuts
- Better mobile gestures

### Quality Stuff
- Proper testing suite
- Accessibility audit
- Performance optimisation
- Error tracking
