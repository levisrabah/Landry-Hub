from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Review, Booking, Provider
from app.utils.roles import role_required

reviews_bp = Blueprint('reviews', __name__, url_prefix='/api/reviews')

@reviews_bp.route('/my', methods=['GET'])
@jwt_required()
@role_required('provider')
def my_reviews():
    identity = get_jwt_identity()
    provider = Provider.query.filter_by(user_id=identity['id']).first()
    if not provider:
        return jsonify({'error': 'Provider profile not found'}), 404
    reviews = Review.query.filter_by(provider_id=provider.id).all()
    result = []
    for r in reviews:
        result.append({
            'id': r.id,
            'booking_id': r.booking_id,
            'customer_id': r.customer_id,
            'provider_id': r.provider_id,
            'rating': r.rating,
            'comment': r.comment,
            'created_at': r.created_at
        })
    return jsonify(result), 200

@reviews_bp.route('/<int:provider_id>', methods=['GET'])
def list_reviews(provider_id):
    reviews = Review.query.filter_by(provider_id=provider_id).all()
    result = []
    for r in reviews:
        result.append({
            'id': r.id,
            'booking_id': r.booking_id,
            'customer_id': r.customer_id,
            'provider_id': r.provider_id,
            'rating': r.rating,
            'comment': r.comment,
            'created_at': r.created_at
        })
    return jsonify(result), 200

@reviews_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('customer')
def create_review():
    identity = get_jwt_identity()
    data = request.get_json()
    booking_id = data.get('booking_id')
    rating = data.get('rating')
    comment = data.get('comment')
    if not all([booking_id, rating]):
        return jsonify({'error': 'Missing required fields'}), 400
    booking = Booking.query.get(booking_id)
    if not booking or booking.customer_id != identity['id']:
        return jsonify({'error': 'Booking not found'}), 404
    if booking.status != 'Completed':
        return jsonify({'error': 'Can only review after completion'}), 400
    if Review.query.filter_by(booking_id=booking_id, customer_id=identity['id']).first():
        return jsonify({'error': 'You have already reviewed this booking'}), 400
    review = Review(
        booking_id=booking_id,
        customer_id=identity['id'],
        provider_id=booking.provider_id,
        rating=rating,
        comment=comment
    )
    db.session.add(review)
    db.session.commit()
    return jsonify({'message': 'Review submitted'}), 201 