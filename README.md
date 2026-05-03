# MacroZone

MacroZone is a learning React Native app for tracking meals, calories, and macronutrients. The mobile app is built with Expo Router, Clerk authentication, and a small Express + Prisma backend.

## Features

- Email/password authentication with Clerk.
- Google and GitHub OAuth login.
- Protected app routes: signed-out users go to auth screens, signed-in users go to the tabs.
- Meal diary with create, list, delete one meal, and clear all meals actions.
- Backend persistence through Express, Prisma, and PostgreSQL.
- User-scoped meals via the `x-user-id` request header.
- Dashboard with daily calorie, protein, carbs, and fat totals.
- Recent meals section on the home screen.
- Swipe-to-delete meal rows with confirmation.
- Copy daily macro summary to clipboard.
- Share daily macro summary with the native share sheet.
- Optional meal reminders with local notification scheduling.
- Light and dark theme support based on the system setting.
- Bottom tab navigation for Home, Add Meal, and Diary.
- Glass-style status bar overlay where the platform supports it.

## Tech Stack

- React Native 0.83
- Expo 55
- Expo Router
- Clerk Expo SDK
- Express
- Prisma
- PostgreSQL
- TypeScript

## Project Structure

```text
src/
  app/                 Expo Router screens and layouts
  components/          Reusable UI components
  hooks/               App hooks, including meal API access
  styles/              Theme colors and global styles
  utils/               Notification helpers
server/
  prisma/              Prisma schema
  src/controllers/     Express route handlers
  src/routes/          Express routers
  src/prisma.ts        Prisma client
```

## Environment Variables

Create `.env` in the project root:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
DATABASE_URL=postgresql://user:password@localhost:5432/macrozone
```

Create `server/.env`:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/macrozone
```

`DATABASE_URL` is used by Prisma. `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` is used by the Expo app.

## Installation

Install mobile app dependencies:

```bash
npm install
```

Install server dependencies:

```bash
cd server
npm install
```

## Database Setup

From the `server` folder, generate Prisma Client and apply the schema to your PostgreSQL database:

```bash
npx prisma generate
npx prisma db push
```

## Running The Project

Start the backend:

```bash
cd server
npm run dev
```

The API runs on:

```text
http://localhost:3001
```

Start the mobile app from the project root:

```bash
npm run start
```

Then open the app in Expo Go, an iOS simulator, an Android emulator, or a development build.

If you test on a physical device, update `src/config/api.ts` so `API_URL` points to your computer's local network IP instead of `localhost`.

## Available Scripts

From the project root:

```bash
npm run start
npm run ios
npm run android
npm run web
npm run lint
```

From `server/`:

```bash
npm run dev
```

## Useful Checks

Run TypeScript checks:

```bash
npx tsc --noEmit
cd server && npx tsc --noEmit
```

Run Expo lint:

```bash
npm run lint
```
