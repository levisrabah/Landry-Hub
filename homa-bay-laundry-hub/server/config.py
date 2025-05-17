import os
from datetime import timedelta
from dotenv import load_dotenv

load_dotenv()

class Config:
    # App Configuration
    SECRET_KEY = os.getenv('SECRET_KEY', 'super-secret-key-change-me')
    
    # Database Configuration
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'super-secure-jwt-secret-change-me')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)  # 1 hour expiration
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)  # 30 days for refresh tokens
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'
    JWT_IDENTITY_CLAIM = 'identity'  # For dictionary-based identity
    
    # Email Configuration
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    
    # M-Pesa Payment Configuration
    MPESA_CONSUMER_KEY = os.getenv('MPESA_CONSUMER_KEY')
    MPESA_CONSUMER_SECRET = os.getenv('MPESA_CONSUMER_SECRET')
    MPESA_SHORTCODE = os.getenv('MPESA_SHORTCODE')
    MPESA_PASSKEY = os.getenv('MPESA_PASSKEY')
    
    # Google Services
    GOOGLE_MAPS_API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
    
    # Twilio Configuration
    TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
    TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
    
    # Security Headers Configuration
    SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', 'True') == 'True'
    REMEMBER_COOKIE_SECURE = os.getenv('REMEMBER_COOKIE_SECURE', 'True') == 'True'
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Rate Limiting (Optional)
    RATELIMIT_STORAGE_URL = os.getenv('REDIS_URL', 'memory://')
    RATELIMIT_STRATEGY = 'fixed-window'
    
    # CORS Configuration (Optional)
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '').split(',')