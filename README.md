# Voltify — React Electronics Store

A frontend-only electronics e-commerce class project built with React, Vite, React Router, and CSS.

## Features

- Responsive modern layout
- Home, Products, Product Details, Cart, Checkout, About, and Contact pages
- React Router navigation
- Static product data (no database or backend)
- Search, category filters, and sorting
- Add to cart, change quantities, and remove products
- Cart persists in browser `localStorage`
- Demo checkout and demo contact/newsletter forms
- Responsive mobile navigation
- Product cards, rating display, toast notifications, and empty states

## Requirements

- Node.js (LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Create a production build

```bash
npm run build
npm run preview
```

## Important notes

- There is no database, server, authentication, or real payment processing.
- Products are defined in `src/data/products.js`.
- Cart state is managed by React and saved in browser `localStorage`.
- Product illustrations use emoji/CSS, so the project does not need product-image downloads.
- Google Fonts are loaded from the internet; system fallback fonts are included.
- The checkout is a visual demo and does not create a real order.
