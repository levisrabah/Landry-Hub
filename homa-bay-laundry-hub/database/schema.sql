-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL, -- admin, customer, provider
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Providers table
CREATE TABLE providers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    age INTEGER,
    location VARCHAR(255),
    ethnicity VARCHAR(50),
    contact_info VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    profile_photo VARCHAR(255),
    before_after_photos JSONB, -- Stores JSON data for before/after photos
    availability JSONB, -- Stores JSON data for availability schedule
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL, -- Washing, Drying, Ready, etc.
    scheduled_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    mpesa_receipt VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    provider_id INTEGER REFERENCES providers(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages table
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);