from app import db
from datetime import datetime

class Provider(db.Model):
    __tablename__ = 'providers'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    age = db.Column(db.Integer)
    location = db.Column(db.String(255))
    ethnicity = db.Column(db.String(50))
    contact_info = db.Column(db.String(100))
    is_verified = db.Column(db.Boolean, default=False)
    profile_photo = db.Column(db.String(255))
    before_after_photos = db.Column(db.JSON)   
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    services = db.relationship('Service', backref='provider', lazy=True, cascade='all, delete-orphan')
    provider_bookings = db.relationship('Booking', backref='service_provider', lazy=True, foreign_keys='Booking.provider_id')
    provider_reviews = db.relationship('Review', backref='provider', lazy=True, foreign_keys='Review.provider_id')