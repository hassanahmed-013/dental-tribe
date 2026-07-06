# Dental Tribe

A modern website for **Dental Tribe — Dr. Shahab Rafiq & Associates**, Lahore.

Patients can explore treatments, learn about common dental problems, book evening appointments, and contact the clinic via WhatsApp. Clinic staff manage everything through a protected admin dashboard powered by Firebase.

---

## Features

### Public website

| Section | What it does |
|--------|----------------|
| **Hero** | Animated tooth video, live clinic status, WhatsApp booking |
| **Treatments** | 18 procedures with categories and detail pages |
| **Treatment pages** (`/services/:slug`) | Full info + online booking form |
| **Dental problems** | 6 common issues with dedicated info pages |
| **Problem pages** (`/problems/:id`) | Causes, symptoms, recommended treatments |
| **Before & After** | Tabbed slider comparing patient results |
| **Reviews** | Google review text and rating summary |
| **Blog** (`/blog`) | Published articles from Firebase |
| **Contact** (`/contact`) | Address, map, phone, WhatsApp |
| **FAQ & Why Us** | Trust content and common questions |

### Online booking

- Evening slots only — **5:00 PM to 9:30 PM**
- Past dates and already-booked slots are hidden automatically
- Bookings saved to Firebase; optional WhatsApp confirmation after submit

### Admin panel (`/admin/login`)

| Page | Purpose |
|------|---------|
| **Dashboard** | Sync all site content to Firebase |
| **Treatments** | Add, edit, or import the 18 flyer treatments |
| **Appointments** | View online bookings |
| **Blog** | Write and publish posts |

---

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** + **Framer Motion**
- **Firebase** — Authentication & Firestore
- **React Router** — page navigation
- **TanStack Query** — admin data fetching

---

## Project structure

```
dental-tribe-funnel/
├── README.md
└── client/                     ← main app (run npm commands here)
    ├── .env.example            ← copy to .env and fill in
    ├── firestore.rules         ← database security rules
    ├── firebase.json
    ├── public/
    │   └── hero-tooth.mp4      ← hero section animated tooth video
    └── src/
        ├── components/         ← Hero, Navbar, Reviews, etc.
        ├── context/            ← Auth + site content
        ├── data/               ← defaults for services, problems, content
        ├── lib/                  ← Firebase, booking, seed scripts
        └── pages/              ← Home, ServiceDetail, ProblemDetail, admin
```

---

## Firebase collections

| Collection | Stores | Public read | Public write |
|------------|--------|-------------|--------------|
| `services` | Treatments | Yes | No |
| `appointments` | Online bookings | Yes | Create only |
| `blogs` | Blog posts | Yes | No |
| `siteContent` | Clinic info, hero, problems, reviews, before/after | Yes | No |

> The admin UI says **"Treatments"** but the Firestore collection name is **`services`**.

### `siteContent` documents

- `clinic` — name, address, phone, hours
- `home` — hero text, doctor bio, FAQ
- `dentalProblems` — problem cards on homepage
- `beforeAfter` — before/after cases
- `reviews` — patient review text on homepage

---

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) 18+
- A [Firebase](https://console.firebase.google.com) project

### 1. Install and run

```bash
cd client
npm install
cp .env.example .env        # Windows: copy .env.example .env
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### 2. Set up Firebase

1. Create a Firebase project and register a **Web app**
2. Enable **Firestore Database** (production mode, nearest region e.g. `asia-south1`)
3. Enable **Authentication → Email/Password** and add an admin user
4. Copy `firebaseConfig` values into `client/.env`
5. Deploy security rules:

```bash
cd client
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy --only firestore:rules
```

### 3. Seed data

1. Sign in at `/admin/login`
2. **Dashboard** → **Sync All Site Data to Firebase**
3. **Treatments** → **Import Flyer Treatments**

---

## Environment variables

Create `client/.env` from `.env.example`:

```env
# Firebase (required)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Google Reviews (optional — for live rating count on homepage)
VITE_GOOGLE_MAPS_API_KEY=
VITE_GOOGLE_PLACE_ID=ChIJI96jbuIBGTkR8C3WTPAyqL8
VITE_GOOGLE_REVIEWS_URL=https://g.page/r/CfAt1kzwMqi_EAE/review
```

Never commit `.env` to git.

---

## Scripts

```bash
cd client

npm run dev       # local development
npm run build     # production build → dist/
npm run preview   # preview production build
```

---

## Deployment

1. Run `npm run build` inside `client/`
2. Deploy the `dist/` folder to your host (Vercel, Netlify, Firebase Hosting, etc.)
3. Set all `VITE_*` variables on the host
4. Run `firebase deploy --only firestore:rules` when rules change

---

## Routes

| URL | Page |
|-----|------|
| `/` | Homepage |
| `/services/:slug` | Treatment detail + booking |
| `/problems/:id` | Dental problem detail |
| `/blog` | Blog list |
| `/blog/:slug` | Single blog post |
| `/contact` | Contact page |
| `/admin/login` | Admin sign in |
| `/admin` | Admin dashboard |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page / build error | Check terminal for errors; restart `npm run dev` |
| Missing Firebase warning | Create `client/.env`, restart dev server |
| Treatments not showing | Create Firestore DB, deploy rules, import treatments in admin |
| Hero video missing | Ensure `client/public/hero-tooth.mp4` exists |
| Permission denied | Deploy `firestore.rules`; sign in for admin actions |

---

## License

Private project for Dental Tribe clinic. All rights reserved.
