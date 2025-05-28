from app import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.id'), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'), nullable=False)
    status = db.Column(db.String(50))  # Washing, Drying, Ready, etc.
    scheduled_at = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    payment = db.relationship('Payment', backref='booking', uselist=False, lazy=True, cascade='all, delete-orphan')
    review = db.relationship('Review', backref='booking', uselist=False, lazy=True, cascade='all, delete-orphan')