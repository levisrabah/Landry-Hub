from app import db
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    provider_id = db.Column(db.Integer, db.ForeignKey('providers.id'))
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    status = db.Column(db.String(50))
    scheduled_at = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    payment = db.relationship('Payment', backref='booking', uselist=False)
    review = db.relationship('Review', backref='booking', uselist=False) 