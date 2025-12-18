This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

<!-- =================================================================================================== -->

root
|
|-- public
|   |
|   |-- asset
|       |
|       |-- icon        # Icon statis (favicon, menu icon, dll)
|       |-- logo        # Logo aplikasi / brand
|
|-- src
|   |
|   |-- app
|   |   |
|   |   |-- (admin)     # Route group halaman admin
|   |   |-- (register)  # Route group halaman registrasi
|   |   |-- layout.jsx  # Root layout aplikasi
|   |   |-- page.jsx    # Entry page (homepage)
|   |
|   |-- components
|   |   |
|   |   |-- content
|   |   |   |
|   |   |   |-- dashboard   # Komponen khusus fitur dashboard
|   |   |   |-- home        # Komponen konten halaman home
|   |   |   |-- sign-up     # Komponen konten halaman sign up
|   |   |
|   |   |-- form
|   |   |   |
|   |   |   |-- login       # Form login
|   |   |   |-- register    # Form register
|   |   |
|   |   |-- global
|   |   |   |
|   |   |   |-- navbar.jsx  # Navbar global
|   |   |   |-- footer.jsx  # Footer global
|   |   |
|   |   |-- layout
|   |       |
|   |       |-- sidebar.jsx # Layout sidebar
|   |       |-- header.jsx  # Layout header
|   |
|   |-- ui
|   |   |
|   |   |-- button.jsx         # Reusable button component
|   |   |-- input.jsx          # Reusable input component
|   |   |-- dialog.jsx         # Dialog / modal component
|   |   |-- dropdown-menu.jsx  # Dropdown menu component
|   |   |-- calendar.jsx       # Calendar component
|   |   |-- sidebar.jsx        # Sidebar UI component
|   |   |-- spinner.jsx        # Loading spinner
|   |   |-- tooltip.jsx        # Tooltip component
|   |
|   |-- constants
|   |   |
|   |   |-- routes.js       # Konstanta routing
|   |   |-- config.js       # Konfigurasi global
|   |
|   |-- hooks
|   |   |
|   |   |-- useAuth.js      # Custom hook auth
|   |   |-- useDebounce.js  # Custom hook debounce
|   |
|   |-- lib
|       |
|       |-- axios.js        # Axios instance & interceptor
|       |-- helper.js        # function converter
|
|-- package.json
|-- README.md