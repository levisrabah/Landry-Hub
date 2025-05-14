from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Service, Provider
from app.utils.roles import role_required

services_bp = Blueprint('services', __name__, url_prefix='/api/services')

@services_bp.route('/', methods=['GET'])
def list_services():
    services = Service.query.all()
    result = []
    for s in services:
        result.append({
            'id': s.id,
            'provider_id': s.provider_id,
            'name': s.name,
            'description': s.description,
            'price': float(s.price),
            'created_at': s.created_at,
        })
    return jsonify(result), 200

@services_bp.route('/<int:service_id>', methods=['GET'])
def get_service(service_id):
    s = Service.query.get_or_404(service_id)
    return jsonify({
        'id': s.id,
        'provider_id': s.provider_id,
        'name': s.name,
        'description': s.description,
        'price': float(s.price),
        'created_at': s.created_at,
    }), 200

@services_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('provider')
def create_service():
    identity = get_jwt_identity()
    provider = Provider.query.filter_by(user_id=identity['id']).first()
    if not provider or not provider.is_verified:
        return jsonify({'error': 'Only verified providers can add services'}), 403
    data = request.get_json()
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    if not all([name, price]):
        return jsonify({'error': 'Missing required fields'}), 400
    service = Service(
        provider_id=provider.id,
        name=name,
        description=description,
        price=price
    )
    db.session.add(service)
    db.session.commit()
    return jsonify({'message': 'Service created', 'id': service.id}), 201

@services_bp.route('/<int:service_id>', methods=['PUT'])
@jwt_required()
@role_required('provider')
def update_service(service_id):
    identity = get_jwt_identity()
    provider = Provider.query.filter_by(user_id=identity['id']).first()
    service = Service.query.get_or_404(service_id)
    if not provider or service.provider_id != provider.id:
        return jsonify({'error': 'Unauthorized'}), 403
    data = request.get_json()
    service.name = data.get('name', service.name)
    service.description = data.get('description', service.description)
    service.price = data.get('price', service.price)
    db.session.commit()
    return jsonify({'message': 'Service updated'}), 200

@services_bp.route('/<int:service_id>', methods=['DELETE'])
@jwt_required()
@role_required('provider')
def delete_service(service_id):
    identity = get_jwt_identity()
    provider = Provider.query.filter_by(user_id=identity['id']).first()
    service = Service.query.get_or_404(service_id)
    if not provider or service.provider_id != provider.id:
        return jsonify({'error': 'Unauthorized'}), 403
    db.session.delete(service)
    db.session.commit()
    return jsonify({'message': 'Service deleted'}), 200 