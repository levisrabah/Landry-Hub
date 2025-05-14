from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

integrations_bp = Blueprint('integrations', __name__, url_prefix='/api/integrations')

# --- Twilio SMS/WhatsApp Notification Stubs ---
@integrations_bp.route('/notify', methods=['POST'])
@jwt_required()
def send_notification():
    data = request.get_json()
    to = data.get('to')
    message = data.get('message')
    channel = data.get('channel', 'sms')  # 'sms' or 'whatsapp'
    # In production, send via Twilio
    return jsonify({'message': f'Simulated {channel} sent to {to}', 'body': message}), 200

# --- Google Maps Geolocation/Filtering Stubs ---
@integrations_bp.route('/nearby-providers', methods=['POST'])
def nearby_providers():
    data = request.get_json()
    lat = data.get('lat')
    lng = data.get('lng')
    radius_km = data.get('radius_km', 5)
    # In production, use Google Maps API to filter providers
    # For now, return a simulated list
    return jsonify({
        'providers': [
            {'id': 1, 'name': 'Simulated Provider 1', 'distance_km': 1.2},
            {'id': 2, 'name': 'Simulated Provider 2', 'distance_km': 2.8}
        ],
        'center': {'lat': lat, 'lng': lng},
        'radius_km': radius_km
    }), 200 