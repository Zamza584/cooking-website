# Cooking Website

A modern, responsive Next.js web application for discovering, sharing, and managing recipes. Browse curated recipes, add your own creations, mark favorites, and enjoy an elegant cooking experience.

## Features

**Recipe Discovery**

- Browse a curated collection of recipes
- View detailed recipe information with ingredients and instructions
- High-quality recipe images

**Full-Screen Hero Video**

- Immersive cooking video in the hero section
- Auto-plays on page load
- Responsive design for all screen sizes

**Favorites System**

- Mark recipes as favorites with one click
- Persistent favorites saved to browser storage
- Dedicated favorites page to view all saved recipes

**Add New Recipes**

- Create custom recipes with image upload
- Support for ingredients and step-by-step instructions
- Custom validation with user-friendly error messages
- Images stored as data URLs for easy sharing

**Recipe Management**

- Delete user-added recipes directly from recipe detail pages
- Automatic page redirect after deletion
- Clean, intuitive UI

**Responsive Design**

- Mobile-first approach
- Hamburger menu on small screens
- Optimized for desktop, tablet, and mobile
- Smooth scroll-triggered navbar darkening

**Modern UI/UX**

- Beautiful typography with Google Fonts (Playfair Display, Lora)
- Warm, inviting color palette (beige + dark accents)
- Custom toast notifications (no browser alerts)
- Smooth animations and transitions

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library:** [React 18](https://react.dev/)
- **Styling:** Plain CSS (no framework)
- **Storage:** localStorage (client-side persistence)
- **Fonts:** [Google Fonts](https://fonts.google.com/) (Playfair Display, Lora)
- **Build Tool:** Node.js + npm

## Installation

### Prerequisites

- Node.js 16+ and npm installed on your machine

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Zamza584/cooking-website.git
   cd cooking-website
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the site.

## Usage

### Browsing Recipes

- Visit the **Recipes** page to see all available recipes
- Click **View Recipe** on any recipe card to see full details
- Use the **Explore Recipes** button on the home page to get started

### Managing Favorites

- Click the heart button on any recipe card to save it as a favorite
- Visit the **Favorites** page to see all your saved recipes
- Click the heart again to remove from favorites

### Adding Recipes

- Click **Add Recipe** in the navigation menu
- Fill in recipe details: name, description, prep/cook time, ingredients, instructions
- Upload a recipe image (image upload required)
- Submit to save your recipe (stored locally in your browser)

### Deleting Recipes

- On a recipe detail page, if the recipe was added by you, click the **Delete Recipe** button
- Confirm deletion—the recipe will be removed from your collection

## Project Structure

```
cooking-website/
├── app/
│   ├── globals.css          # Global styles & responsive design
│   ├── layout.jsx           # Root layout (Navbar, Footer)
│   ├── page.jsx             # Home page (Hero + featured recipes)
│   ├── add/
│   │   └── page.jsx         # Add Recipe form
│   ├── recipes/
│   │   └── page.jsx         # All recipes page
│   ├── recipe/
│   │   └── [id]/
│   │       └── page.jsx     # Individual recipe detail page
│   └── favorites/
│       └── page.jsx         # Favorites page
├── components/
│   ├── Navbar.jsx           # Navigation bar with mobile hamburger menu
│   ├── Footer.jsx           # Footer component
│   ├── Hero.jsx             # Hero section with video
│   ├── RecipeCard.jsx       # Recipe card display
│   ├── RecipesList.jsx      # Recipe grid with filtering
│   ├── FavoriteButton.jsx   # Favorite toggle button
│   └── Toast.jsx            # Custom toast notifications
├── data/
│   └── recipes.jsx          # Seed recipes data
├── jsconfig.json            # Path aliases (@/)
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies & scripts
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Key Technologies Explained

### Next.js App Router

This project uses the modern App Router pattern for file-based routing. Pages are automatically created from the directory structure in the `app/` folder.

### Client Components

Pages and components that use browser APIs (like `localStorage`) are marked with `"use client"` at the top. This tells Next.js to render them on the client side.

### localStorage for Persistence

- **Favorites:** Stored under the key `"favorites"` as an array of recipe IDs
- **Added Recipes:** Stored under the key `"addedRecipes"` as an array of recipe objects
- Images are stored as data URLs to keep everything local

### Custom Validation

Instead of browser default validation popups, the app uses custom validation with toast notifications for a better UX.

## Development

### Build for Production

```bash
npm run build
npm start
```

### Run Linter

```bash
npm run lint
```

## Features Under the Hood

### Event-Based Updates

The app uses custom events (`recipesUpdated`, `favoritesUpdated`) to keep components in sync when data changes without a page reload.

### Image Upload

Images are converted to data URLs using the FileReader API, allowing images to be stored in localStorage without a backend.

### Responsive Navbar

The navbar includes:

- Scroll-triggered darkening effect
- Mobile hamburger menu (visible on screens < 768px)
- Semi-transparent menu overlay with smooth animations

## Data Persistence

All data is stored **locally in your browser** using the `localStorage` API:

- Favorites persist across page refreshes
- User-added recipes persist across sessions
- Clearing browser storage will reset all custom data

Note: For production deployment with multiple users, consider implementing a backend database (Firebase, MongoDB, PostgreSQL, etc.).

## Future Enhancements

- Backend API for server-side recipe storage
- User authentication and accounts
- Recipe search and filtering
- Ratings and comments system
- Email recipe sharing
- Print-friendly recipe view
- Dark mode toggle
- Recipe categories/tags

## License

This project is open source and available for personal and educational use.

## Author

Created as a modern cooking recipe website with Next.js and React.

Made with the help of AI.

---

**Enjoy cooking!**

For questions or issues, please open an issue on the GitHub repository.
