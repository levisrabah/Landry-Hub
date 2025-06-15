# Laundry Hub Frontend (client)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
2. **Set up environment variables:**
   - Create a `.env` file in the root of `client/` with:
     ```env
     VITE_API_URL=http://localhost:5000
     ```
   - Adjust the URL if your backend runs elsewhere.
3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## API Utilities

The frontend uses modular API utilities in `src/api/` to interact with the backend:

- `auth.tsx`: Authentication (login, logout, get current user)
- `bookings.ts`: Bookings (CRUD, status updates)
- `providers.ts`: List/filter providers
- `services.ts`: CRUD for provider services
- `payments.ts`: Initiate M-Pesa payments
- `reviews.ts`: List/create reviews
- `admin.ts`: Admin actions (approve/reject providers, analytics, user/provider/booking management)
- `integrations.ts`: Integrations (Twilio notifications, Google Maps provider search)

All protected endpoints use JWT from localStorage (managed by AuthContext).

## New Dependencies
- [axios](https://github.com/axios/axios) for API calls
- [react-hot-toast](https://react-hot-toast.com/) for notifications
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) (optional, for animations)

## Next Steps
- Build and enhance UI components and pages for a stunning, mobile-first experience.
- See project plan for details. 