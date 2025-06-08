from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Provider
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

UPLOAD_FOLDER = 'uploads/profile_photos'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@auth_bp.route('/register', methods=['POST'])
def register():
    profile_photo_path = None

    # Handle profile photo upload
    if 'profilePhoto' in request.files:
        file = request.files['profilePhoto']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            profile_photo_path = os.path.join(UPLOAD_FOLDER, filename)

            # Ensure the directory exists before saving
            os.makedirs(os.path.dirname(profile_photo_path), exist_ok=True)
            file.save(profile_photo_path)
        else:
            return jsonify({'error': 'Invalid file type for profile photo'}), 400

    data = request.form
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')  # 'customer' or 'provider'
    phone = data.get('phone')
    location = data.get('location') if role == 'provider' else None

    # Validate required fields
    if not all([name, email, password, role]):
        return jsonify({'error': 'Missing required fields'}), 400
    if role not in ['customer', 'provider', 'admin']:
        return jsonify({'error': 'Invalid role'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    # Create user
    user = User(name=name, email=email, role=role, phone=phone)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    # If provider, create provider profile
    if role == 'provider':
        if not location:
            return jsonify({'error': 'Location is required for providers'}), 400
        provider = Provider(
            user_id=user.id,
            location=location,
            profile_photo=profile_photo_path
        )
        db.session.add(provider)
        db.session.commit()

    return jsonify({'message': 'Registration successful'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity={'id': user.id, 'role': user.role})
        return jsonify({'access_token': access_token, 'user': {'id': user.id, 'email': user.email, 'role': user.role}})
    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    identity = get_jwt_identity()
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
    return jsonify({'message': 'Logged out'}), 200