# providers.py
from math import ceil
from flask import request, Blueprint, jsonify
from app.models import Provider, Review  # Import Provider and Review models
from sqlalchemy import func
from app import db

providers_bp = Blueprint('providers', __name__, url_prefix='/api/providers')

@providers_bp.route('/', methods=['GET'])
def list_providers():
    """
    List providers with optional filters and pagination.
    Filters include location, ethnicity, and minimum rating.
    """
    # Pagination parameters
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)

    # Filters
    filters = {'is_verified': True}  # Only show verified providers
    if request.args.get('location'):
        filters['location'] = request.args.get('location')
    if request.args.get('ethnicity'):
        filters['ethnicity'] = request.args.get('ethnicity')

    # Base query
    query = Provider.query.filter_by(**filters)

    # Minimum rating filter
    min_rating = request.args.get('min_rating', type=float)
    if min_rating:
        query = query.outerjoin(Review).group_by(Provider.id)
        query = query.having(func.avg(Review.rating) >= min_rating)

    # Pagination
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    providers = paginated.items

    # Build response
    result = {
        'providers': [{
            'id': p.id,
            'user_id': p.user_id,
            'name': p.user.name,  # Assuming backref to User model
            'location': p.location,
            'profile_photo': p.profile_photo,
            'average_rating': round(db.session.query(func.avg(Review.rating))
                                    .filter(Review.provider_id == p.id).scalar() or 0, 2)
        } for p in providers],
        'meta': {
            'page': page,
            'per_page': per_page,
            'total_pages': ceil(paginated.total / per_page),
            'total_items': paginated.total
        }
    }

    return jsonify(result), 200