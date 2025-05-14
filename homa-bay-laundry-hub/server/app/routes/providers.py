from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Provider, User
from app.utils.roles import role_required

providers_bp = Blueprint('providers', __name__, url_prefix='/api/providers')

@providers_bp.route('/me', methods=['GET'])
@jwt_required()
@role_required('provider')
def get_my_profile():
    identity = get_jwt_identity()
    provider = Provider.query.filter_by(user_id=identity['id']).first()
    if not provider:
        return jsonify({'error': 'Provider profile not found'}), 404
    return jsonify({
        'id': provider.id,
        'age': provider.age,
        'location': provider.location,
        'ethnicity': provider.ethnicity,
        'contact_info': provider.contact_info,
        'is_verified': provider.is_verified,
        'profile_photo': provider.profile_photo,
        'before_after_photos': provider.before_after_photos,
        'availability': provider.availability
    }), 200

@providers_bp.route('/register', methods=['POST'])
@jwt_required()
@role_required('provider')
def register_provider():
    identity = get_jwt_identity()
    data = request.get_json()
    # Simulate M-Pesa payment check (should be replaced with real check)
    if not data.get('mpesa_paid', False):
        return jsonify({'error': 'Ksh.100 registration fee required (M-Pesa)'}), 402
    if Provider.query.filter_by(user_id=identity['id']).first():
        return jsonify({'error': 'Provider profile already exists'}), 400
    provider = Provider(
        user_id=identity['id'],
        age=data.get('age'),
        location=data.get('location'),
        ethnicity=data.get('ethnicity'),
        contact_info=data.get('contact_info'),
        profile_photo=data.get('profile_photo'),
        before_after_photos=data.get('before_after_photos', []),
        availability=data.get('availability', {})
    )
    db.session.add(provider)
    db.session.commit()
    return jsonify({'message': 'Provider profile created'}), 201

@providers_bp.route('/me', methods=['PUT'])
@jwt_required()
@role_required('provider')
def update_my_profile():
    identity = get_jwt_identity()
    provider = Provider.query.filter_by(user_id=identity['id']).first()
    if not provider:
        return jsonify({'error': 'Provider profile not found'}), 404
    data = request.get_json()
    provider.age = data.get('age', provider.age)
    provider.location = data.get('location', provider.location)
    provider.ethnicity = data.get('ethnicity', provider.ethnicity)
    provider.contact_info = data.get('contact_info', provider.contact_info)
    provider.profile_photo = data.get('profile_photo', provider.profile_photo)
    provider.before_after_photos = data.get('before_after_photos', provider.before_after_photos)
    provider.availability = data.get('availability', provider.availability)
    db.session.commit()
    return jsonify({'message': 'Provider profile updated'}), 200

@providers_bp.route('/', methods=['GET'])
def list_providers():
    providers = Provider.query.filter_by(is_verified=True).all()
    result = []
    for p in providers:
        result.append({
            'id': p.id,
            'user_id': p.user_id,
            'age': p.age,
            'location': p.location,
            'ethnicity': p.ethnicity,
            'contact_info': p.contact_info,
            'is_verified': p.is_verified,
            'profile_photo': p.profile_photo,
            'before_after_photos': p.before_after_photos,
            'availability': p.availability
        })
    return jsonify(result), 200

@providers_bp.route('/<int:provider_id>', methods=['GET'])
def get_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    return jsonify({
        'id': provider.id,
        'user_id': provider.user_id,
        'age': provider.age,
        'location': provider.location,
        'ethnicity': provider.ethnicity,
        'contact_info': provider.contact_info,
        'is_verified': provider.is_verified,
        'profile_photo': provider.profile_photo,
        'before_after_photos': provider.before_after_photos,
        'availability': provider.availability
    }), 200

@providers_bp.route('/<int:provider_id>/verify', methods=['POST'])
@jwt_required()
@role_required('admin')
def verify_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    provider.is_verified = True
    db.session.commit()
    return jsonify({'message': f'Provider {provider_id} verified'}), 200

@providers_bp.route('/<int:provider_id>/unverify', methods=['POST'])
@jwt_required()
@role_required('admin')
def unverify_provider(provider_id):
    provider = Provider.query.get_or_404(provider_id)
    provider.is_verified = False
    db.session.commit()
    return jsonify({'message': f'Provider {provider_id} unverified'}), 200 