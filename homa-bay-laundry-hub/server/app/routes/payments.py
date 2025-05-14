from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Payment, Booking, Provider
from app.utils.roles import role_required
from datetime import datetime

payments_bp = Blueprint('payments', __name__, url_prefix='/api/payments')

@payments_bp.route('/initiate', methods=['POST'])
@jwt_required()
def initiate_payment():
    data = request.get_json()
    payment_type = data.get('type')  # 'booking' or 'provider_registration'
    amount = data.get('amount')
    user = get_jwt_identity()
    # Simulate M-Pesa STK Push
    # In production, call Safaricom Daraja API here
    if payment_type == 'booking':
        booking_id = data.get('booking_id')
        booking = Booking.query.get(booking_id)
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        payment = Payment(
            booking_id=booking_id,
            amount=amount,
            status='Pending',
            mpesa_receipt='SIMULATED_RECEIPT_' + str(datetime.utcnow().timestamp())
        )
        db.session.add(payment)
        db.session.commit()
        return jsonify({'message': 'Payment initiated (simulated)', 'payment_id': payment.id}), 201
    elif payment_type == 'provider_registration':
        provider_id = data.get('provider_id')
        provider = Provider.query.get(provider_id)
        if not provider:
            return jsonify({'error': 'Provider not found'}), 404
        # In real implementation, link payment to provider registration
        payment = Payment(
            booking_id=None,
            amount=amount,
            status='Completed',  # Simulate instant success
            mpesa_receipt='SIMULATED_RECEIPT_' + str(datetime.utcnow().timestamp())
        )
        db.session.add(payment)
        db.session.commit()
        return jsonify({'message': 'Provider registration payment successful (simulated)', 'payment_id': payment.id}), 201
    else:
        return jsonify({'error': 'Invalid payment type'}), 400

@payments_bp.route('/status/<int:payment_id>', methods=['GET'])
@jwt_required()
def payment_status(payment_id):
    payment = Payment.query.get_or_404(payment_id)
    return jsonify({
        'id': payment.id,
        'booking_id': payment.booking_id,
        'amount': float(payment.amount),
        'status': payment.status,
        'mpesa_receipt': payment.mpesa_receipt,
        'created_at': payment.created_at
    }), 200 