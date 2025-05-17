from functools import wraps
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from flask import jsonify
from app.models import User  # Import User model for fallback lookup

def role_required(*roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            # Verify JWT is present and valid
            verify_jwt_in_request()
            
            identity = get_jwt_identity()
            
            # Case 1: Identity is a dictionary (preferred)
            if isinstance(identity, dict):
                user_role = identity.get('role')
                if not user_role:
                    return jsonify({"error": "Role missing in token"}), 422
            
            # Case 2: Identity is just a user ID (fallback)
            else:
                try:
                    user = User.query.get(identity)
                    if not user:
                        return jsonify({"error": "User not found"}), 404
                    user_role = user.role
                except Exception as e:
                    return jsonify({"error": "Invalid user identity"}), 422
            
            # Final role verification
            if user_role not in roles:
                return jsonify({
                    "error": "Forbidden",
                    "message": f"Requires one of these roles: {', '.join(roles)}"
                }), 403
            
            return fn(*args, **kwargs)
        return wrapper
    return decorator