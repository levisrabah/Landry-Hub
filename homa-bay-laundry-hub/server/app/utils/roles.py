from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify

def role_required(*roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            identity = get_jwt_identity()
            if not identity or identity.get('role') not in roles:
                return jsonify({'error': 'Unauthorized'}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator 