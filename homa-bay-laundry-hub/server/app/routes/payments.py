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
@jwt_required()
def initiate_payment():
    data = request.get_json()
    payment_type = data.get('type')  # 'booking' or 'registration'
    amount = data.get('amount')
    phone = data.get('phone')  # M-Pesa phone number
    
    if not all([payment_type, amount, phone]):
        return jsonify({'error': 'Missing required fields'}), 400

    user_id = get_jwt_identity()['id']
    
    if payment_type == 'booking':
        booking_id = data.get('booking_id')
        booking = Booking.query.get(booking_id)
        if not booking or booking.customer_id != user_id:
            return jsonify({'error': 'Invalid booking'}), 400
        
        # In production: Call actual M-Pesa API here
        payment = Payment(
            booking_id=booking_id,
            amount=amount,
            status='Pending',
            mpesa_receipt=f"SIM_{datetime.utcnow().timestamp()}",
            payment_type='booking'
        )
        
    elif payment_type == 'registration':
        provider = Provider.query.filter_by(user_id=user_id).first()
        if not provider:
            return jsonify({'error': 'Provider not found'}), 404
        
        # Create a dummy booking for registration payments
        reg_booking = Booking(
            customer_id=user_id,
            provider_id=provider.id,
            service_id=None,
            status='Completed',
            scheduled_at=datetime.utcnow(),
            completed_at=datetime.utcnow(),
            is_registration_payment=True
        )
        db.session.add(reg_booking)
        db.session.flush()  # Get the ID
        
        payment = Payment(
            booking_id=reg_booking.id,
            amount=amount,
            status='Completed',  # Registration payments complete immediately
            mpesa_receipt=f"REG_{datetime.utcnow().timestamp()}",
            payment_type='registration'
        )
    
    db.session.add(payment)
    db.session.commit()
    
    return jsonify({
        'message': 'Payment initiated',
        'payment_id': payment.id,
        'mpesa_receipt': payment.mpesa_receipt,
        'status': payment.status
    }), 201

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