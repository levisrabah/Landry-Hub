from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Booking, Provider, Service, User
from app.utils.roles import role_required
from datetime import datetime

bookings_bp = Blueprint('bookings', __name__, url_prefix='/api/bookings')

@bookings_bp.route('/', methods=['GET'])
@jwt_required()
def list_my_bookings():
    identity = get_jwt_identity()
    role = identity['role']
    if role == 'customer':
        bookings = Booking.query.filter_by(customer_id=identity['id']).all()
    elif role == 'provider':
        provider = Provider.query.filter_by(user_id=identity['id']).first()
        if not provider:
            return jsonify({'error': 'Provider profile not found'}), 404
        bookings = Booking.query.filter_by(provider_id=provider.id).all()
    else:
        return jsonify({'error': 'Unauthorized'}), 403
    result = []
    for b in bookings:
        result.append({
            'id': b.id,
            'customer_id': b.customer_id,
            'provider_id': b.provider_id,
            'service_id': b.service_id,
            'status': b.status,
            'scheduled_at': b.scheduled_at,
            'completed_at': b.completed_at,
            'created_at': b.created_at
        })
    return jsonify(result), 200

@bookings_bp.route('/<int:booking_id>', methods=['GET'])
@jwt_required()
def get_booking(booking_id):
    identity = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    if identity['role'] == 'customer' and booking.customer_id != identity['id']:
        return jsonify({'error': 'Unauthorized'}), 403
    if identity['role'] == 'provider':
        provider = Provider.query.filter_by(user_id=identity['id']).first()
        if not provider or booking.provider_id != provider.id:
            return jsonify({'error': 'Unauthorized'}), 403
    return jsonify({
        'id': booking.id,
        'customer_id': booking.customer_id,
        'provider_id': booking.provider_id,
        'service_id': booking.service_id,
        'status': booking.status,
        'scheduled_at': booking.scheduled_at,
        'completed_at': booking.completed_at,
        'created_at': booking.created_at
    }), 200

@bookings_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('customer')
def create_booking():
    identity = get_jwt_identity()
    data = request.get_json()
    service_id = data.get('service_id')
    scheduled_at = data.get('scheduled_at')
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'error': 'Service not found'}), 404
    provider_id = service.provider_id
    booking = Booking(
        customer_id=identity['id'],
        provider_id=provider_id,
        service_id=service_id,
        status='Pending',
        scheduled_at=scheduled_at
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify({'message': 'Booking created', 'id': booking.id}), 201

@bookings_bp.route('/<int:booking_id>/status', methods=['POST'])
@jwt_required()
def update_status(booking_id):
    identity = get_jwt_identity()
    booking = Booking.query.get_or_404(booking_id)
    data = request.get_json()
    new_status = data.get('status')
    allowed_statuses = ['Pending', 'Accepted', 'Rejected', 'Washing', 'Drying', 'Ready', 'Completed']
    if new_status not in allowed_statuses:
        return jsonify({'error': 'Invalid status'}), 400
    # Only provider can accept/reject or update status
    if identity['role'] == 'provider':
        provider = Provider.query.filter_by(user_id=identity['id']).first()
        if not provider or booking.provider_id != provider.id:
            return jsonify({'error': 'Unauthorized'}), 403
        # Only allow certain transitions
        if booking.status == 'Pending' and new_status in ['Accepted', 'Rejected']:
            booking.status = new_status
        elif booking.status in ['Accepted', 'Washing', 'Drying'] and new_status in ['Washing', 'Drying', 'Ready', 'Completed']:
            booking.status = new_status
            if new_status == 'Completed':
                booking.completed_at = datetime.utcnow()
        else:
            return jsonify({'error': 'Invalid status transition'}), 400
    # Customer can only mark as completed if status is Ready
    elif identity['role'] == 'customer' and booking.customer_id == identity['id']:
        if booking.status == 'Ready' and new_status == 'Completed':
            booking.status = 'Completed'
            booking.completed_at = datetime.utcnow()
        else:
            return jsonify({'error': 'Invalid status transition'}), 400
    else:
        return jsonify({'error': 'Unauthorized'}), 403
    db.session.commit()
    return jsonify({'message': f'Status updated to {booking.status}'}), 200 