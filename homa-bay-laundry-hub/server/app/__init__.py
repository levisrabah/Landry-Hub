from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_migrate import Migrate
from config import Config

# Extensions
mail = Mail()
db = SQLAlchemy()
jwt = JWTManager()  # Initialize JWTManager first
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configure JWT settings
    app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = Config.JWT_ACCESS_TOKEN_EXPIRES
    app.config['JWT_IDENTITY_CLAIM'] = 'identity'  # Explicitly set identity claim
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)  
    mail.init_app(app)
    migrate.init_app(app, db)

    # Register blueprints
    from .routes.auth import auth_bp
    from .routes.providers import providers_bp
    from .routes.services import services_bp
    from .routes.bookings import bookings_bp
    from .routes.payments import payments_bp
    from .routes.reviews import reviews_bp
    from .routes.admin import admin_bp
    from .routes.integrations import integrations_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(providers_bp)
    app.register_blueprint(services_bp)
    app.register_blueprint(bookings_bp)
    app.register_blueprint(payments_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(integrations_bp)

    # Add JWT claims loader (optional but recommended)
    @jwt.user_identity_loader
    def user_identity_lookup(user):
        """Convert user object to identity dictionary"""
        return {
            'id': str(user.id),
            'role': user.role
        }

    return app