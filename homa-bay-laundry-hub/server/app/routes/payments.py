# payments.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Payment, Booking, Provider
from app.utils.roles import role_required
from datetime import datetime
import hashlib
import os

payments_bp = Blueprint('payments', __name__, url_prefix='/api/payments')

# Simulated M-Pesa credentials (replace with real ones in production)
MPESA_CONSUMER_KEY = os.getenv('MPESA_CONSUMER_KEY', 'simulated_consumer_key')
MPESA_CONSUMER_SECRET = os.getenv('MPESA_CONSUMER_SECRET', 'simulated_secret')

class PaymentService:
    @staticmethod
    def generate_mpesa_password():
        """Generate simulated M-Pesa password"""
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        return hashlib.sha256(f"{MPESA_CONSUMER_KEY}{MPESA_CONSUMER_SECRET}{timestamp}".encode()).hexdigest()

@payments_bp.route('/initiate', methods=['POST'])
def initiate_payment():
    data = request.get_json()
    booking_id = data.get('bookingId')
    method = data.get('method')

    if not booking_id or not method:
        return jsonify({'success': False, 'data': None, 'error': 'Missing booking ID or payment method.'}), 400

    # Simulate payment logic
    if method == 'mpesa':
        # Simulate M-Pesa payment
        return jsonify({'success': True, 'data': 'M-Pesa payment initiated.', 'error': None}), 200
    elif method == 'card':
        # Simulate card payment
        return jsonify({'success': True, 'data': 'Card payment initiated.', 'error': None}), 200
    else:
        return jsonify({'success': False, 'data': None, 'error': 'Invalid payment method.'}), 400

@payments_bp.route('/webhook/mpesa', methods=['POST'])
def mpesa_webhook():
    """Handle real M-Pesa callback"""
    data = request.get_json()
    
    # Verify the callback is from M-Pesa (in production)
    # This is a simulation:
    receipt = data.get('receipt')
    status = data.get('status')
    
    payment = Payment.query.filter_by(mpesa_receipt=receipt).first()
    if payment:
        payment.status = status
        db.session.commit()
        
        # Update related booking if needed
        if payment.booking and status == 'Completed':
            payment.booking.status = 'Confirmed'
            db.session.commit()
    
    return jsonify({'message': 'Callback received'}), 200