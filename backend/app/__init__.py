from flask import Flask

def create_app():
    app = Flask(__name__)

    # Register routes
    from app.routes.predict_routes import predict_bp
    app.register_blueprint(predict_bp, url_prefix="/api")

    return app
