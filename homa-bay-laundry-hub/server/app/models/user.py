from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # admin, customer, provider
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    provider_profile = db.relationship('Provider', backref='user', uselist=False, lazy=True)
    customer_bookings = db.relationship('Booking', backref='customer', lazy=True, foreign_keys='Booking.customer_id')
    customer_reviews = db.relationship('Review', backref='reviewer', lazy=True, foreign_keys='Review.customer_id')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)