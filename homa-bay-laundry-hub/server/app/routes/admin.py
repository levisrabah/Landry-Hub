from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.utils.roles import role_required
from app.models import User, Provider, Booking, Payment
from app import db
from sqlalchemy import func

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@role_required('admin')
def dashboard():
    users_count = User.query.count()
    providers_count = Provider.query.count()
    bookings_count = Booking.query.count()
    revenue = db.session.query(func.sum(Payment.amount)).scalar() or 0
    return jsonify({
        'users': users_count,
        'providers': providers_count,
        'bookings': bookings_count,
        'revenue': float(revenue)
    }), 200

@admin_bp.route('/analytics', methods=['GET'])
@jwt_required()
@role_required('admin')
def analytics():
    # Example: bookings per status
    status_counts = db.session.query(Booking.status, func.count(Booking.id)).group_by(Booking.status).all()
    return jsonify({
        'bookings_by_status': {status: count for status, count in status_counts}
    }), 200

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
@role_required('admin')
def list_users():
    users = User.query.all()
    return jsonify([
        {'id': u.id, 'name': u.name, 'email': u.email, 'role': u.role, 'phone': u.phone} for u in users
    ]), 200

@admin_bp.route('/providers', methods=['GET'])
@jwt_required()
@role_required('admin')
def list_providers():
    providers = Provider.query.all()
    return jsonify([
        {'id': p.id, 'user_id': p.user_id, 'is_verified': p.is_verified, 'location': p.location} for p in providers
    ]), 200

@admin_bp.route('/bookings', methods=['GET'])
@jwt_required()
@role_required('admin')
def list_bookings():
    bookings = Booking.query.all()
    return jsonify([
        {'id': b.id, 'customer_id': b.customer_id, 'provider_id': b.provider_id, 'status': b.status} for b in bookings
    ]), 200

@admin_bp.route('/providers/<int:provider_id>/approve', methods=['POST'])
@jwt_required()
@role_required('admin')
def approve_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    provider.is_verified = True
    db.session.commit()
    return jsonify({'message': f'Provider {provider_id} approved'}), 200

@admin_bp.route('/providers/<int:provider_id>/reject', methods=['POST'])
@jwt_required()
@role_required('admin')
def reject_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    provider.is_verified = False
    db.session.commit()
    return jsonify({'message': f'Provider {provider_id} rejected'}), 200 