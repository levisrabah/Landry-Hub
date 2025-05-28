# providers.py
from math import ceil
from flask import request, Blueprint
from app.models import Provider, Review  # Add this import for Provider and Review models
from flask import jsonify
from sqlalchemy import func
from app import db

providers_bp = Blueprint('providers', __name__)

@providers_bp.route('/', methods=['GET'])
def list_providers():
    # Pagination
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    
    # Filters
    filters = {
        'is_verified': True,
    }
    
    if request.args.get('min_rating'):
        filters['min_rating'] = request.args.get('min_rating', type=float)
    if request.args.get('location'):
        filters['location'] = request.args.get('location')
    if request.args.get('ethnicity'):
        filters['ethnicity'] = request.args.get('ethnicity')
    
    # Base query
    query = Provider.query.filter_by(**{k:v for k,v in filters.items() if k != 'min_rating'})
    
    # Average rating filter
    if 'min_rating' in filters:
        query = query.join(Review).group_by(Provider.id)
        query = query.having(func.avg(Review.rating) >= filters['min_rating'])
    
    # Pagination
    paginated = query.paginate(page=page, per_page=per_page, error_out=False)
    providers = paginated.items
    
    # Build response
    result = {
        'providers': [{
            'id': p.id,
            'user_id': p.user_id,
            'name': p.user.name,  # Assuming backref to user
            'location': p.location,
            'profile_photo': p.profile_photo,
            'average_rating': db.session.query(func.avg(Review.rating))
                      .filter(Review.provider_id == p.id).scalar() or 0
        } for p in providers],
        'meta': {
            'page': page,
            'per_page': per_page,
            'total_pages': ceil(paginated.total / per_page),
            'total_items': paginated.total
        }
    }
    
    return jsonify(result), 200