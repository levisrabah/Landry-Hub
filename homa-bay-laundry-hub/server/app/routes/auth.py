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
    data = request.form
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'provider')  # Default to provider
    location = data.get('location')
    profile_photo = None

    # Validate required fields
    if not all([name, email, password, location]):
        return jsonify({'error': 'Missing required fields'}), 400

    # Handle profile photo upload
    if 'profilePhoto' in request.files:
        file = request.files['profilePhoto']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            profile_photo = os.path.join(UPLOAD_FOLDER, filename)
            os.makedirs(os.path.dirname(profile_photo), exist_ok=True)
            file.save(profile_photo)
        else:
            return jsonify({'error': 'Invalid file type for profile photo'}), 400

    # Create user
    user = User(name=name, email=email, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    # Create provider profile
    if role == 'provider':
        provider = Provider(user_id=user.id, location=location, profile_photo=profile_photo)
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
        return jsonify({
            'success': True,
            'access_token': access_token,
            'user': {
                'id': user.id,
                'email': user.email,
                'role': user.role
            }
        })
    return jsonify({'success': False, 'error': 'Invalid credentials'}), 401

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