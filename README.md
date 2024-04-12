# Simple Database explorer - frontend

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

## Features
- Next.js 14 with App Router for page routing
- React Hook Form for form handling and validation
- Server Actions for making API requests instead of direct fetch calls
- Pagination implemented for data tables
- Notification implementation with react-toastify
- Table view implementation with AgGrid
- Jest for unit testing and write down 3 testing cases
- Playwright for E2E testing and write down 3 testing cases

## Tech stacks
- Next.js 14: Server actions
- TypeScript
- tailwind css
- React Hook Form
- React-toastify
- AgGrid
- Jest
- Playwright

## Challenges
- Next.js 14 new features including server actions and intercept routing
    - While using server actions for fetching the data, localhost domain for the backend didn't work out.
    - Spent much time on it and figured out I should use 127.0.0.1 instead
- Displaying data with ag-grid-react library
    - Famous for fast performance and a lot of customization features
    - Too complex configuration and spent much time on it
- Configuration issue with Jest and Playwright

## Screens
- Login Page & Validation
![Field Validation](./images/image.png)

- Login Page & Authentication & Notification
![Login Failed](./images/image-1.png)
![Login Success](./images/image-2.png)

- Schema View Screen
![Schema view](./images/image-3.png)

- Table View Screen
![Table View](./images/image-4.png)

- Table Content View Screen
![Intercept routing](./images/image-5.png)
![Table Content View](./images/image-6.png)
