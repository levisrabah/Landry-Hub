from flask import Blueprint, request, jsonify
from app import db
from app.models import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'customer' or 'provider'
    phone = data.get('phone')

    if not all([name, email, password, role]):
        return jsonify({'error': 'Missing required fields'}), 400
    if role not in ['customer', 'provider', 'admin']:  # Added 'admin' to valid roles
        return jsonify({'error': 'Invalid role'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    user = User(name=name, email=email, role=role, phone=phone)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Registration successful'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not all([email, password]):
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(
        identity={
            'id': str(user.id),  # Ensure it's a string
            'role': user.role     # Embed role to avoid DB queries
        }
    )
    
    return jsonify({
        'access_token': access_token,
        'user': {
            'id': user.id,
            'role': user.role,
            'name': user.name,
            'email': user.email
        }
    }), 200
@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    identity = get_jwt_identity()  # Contains {'id': user_id, 'role': role}
    user = User.query.get(identity['id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({
        'id': user.id,
        'role': user.role,
        'name': user.name,
        'email': user.email
    }), 200
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # Placeholder – JWT tokens are stateless unless you use token blacklisting
    return jsonify({'message': 'Logged out'}), 200