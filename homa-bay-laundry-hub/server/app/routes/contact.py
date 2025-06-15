from flask import Blueprint, request, jsonify
from app import db
from app.models import ContactMessage

contact_bp = Blueprint('contact', __name__, url_prefix='/api/contact')

@contact_bp.route('/', methods=['POST'])
def send_message():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not all([name, email, message]):
        return jsonify({'error': 'All fields are required'}), 400

    # Save the message to the database 
    contact_message = ContactMessage(name=name, email=email, message=message)
    db.session.add(contact_message)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Message sent successfully'}), 201