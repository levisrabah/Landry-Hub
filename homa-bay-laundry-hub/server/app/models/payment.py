from app import db
from datetime import datetime

class Payment(db.Model):
    __tablename__ = 'payments'
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'))
    amount = db.Column(db.Numeric(10,2))
    status = db.Column(db.String(50))
    mpesa_receipt = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow) 