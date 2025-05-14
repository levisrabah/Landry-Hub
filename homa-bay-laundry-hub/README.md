# HomaBay Laundry Hub

A mobile-first digital marketplace connecting local laundry service providers with customers in Homa-Bay Town, Kenya.

## 🌟 Project Goal
Create a visually appealing, mobile-first full-stack website for discovering, booking, and paying for laundry services. Service providers can register, get verified, receive orders, and manage bookings.

## 👥 User Roles
- **Admin Panel**: Monitor users, approve providers, track revenue, view analytics.
- **Laundry Service Providers**: Register, pay Ksh.100 (M-Pesa), manage profile, accept/reject bookings, view reviews.
- **Customers**: Browse/filter providers, book/pay via M-Pesa, track orders, leave reviews.

## 💳 Payment Integration
- Safaricom Daraja API (M-Pesa STK Push)
- Optional Escrow System

## 📍 Location & Matching
- Google Maps API for geolocation and filtering

## 📣 Notifications
- Real-time SMS/WhatsApp alerts (Twilio)

## ⭐ Trust & Engagement
- Verified badges, loyalty discounts, referral bonuses

## 🌐 Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Python Flask, Flask-JWT-Extended, Flask-Mail, Flask-Migrate
- **Database**: PostgreSQL (SQLAlchemy ORM)
- **Payments**: Safaricom Daraja API
- **Maps**: Google Maps API
- **Notifications**: Twilio

## 📦 Folder Structure
```
homa-bay-laundry-hub/
├── client/        # React frontend
├── server/        # Flask backend
├── database/      # DB schema/migrations
├── .env           # Environment variables
├── README.md
└── docker-compose.yml
```

## 🚀 Getting Started
1. Clone the repo
2. See `client/` and `server/` folders for setup instructions

---

*Built for Homa-Bay Town, Kenya 🇰🇪* 