from flask import Flask
from flask_socketio import SocketIO, emit
from app.models import Booking

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

def broadcast_booking_status(booking_id):
    booking = Booking.query.get(booking_id)
    if booking:
        socketio.emit('booking_status_update', {
            'bookingId': booking.id,
            'status': booking.status
        })

# Example usage: Call this function whenever a booking status is updated
# broadcast_booking_status(booking_id)

if __name__ == '__main__':
    socketio.run(app, debug=True)