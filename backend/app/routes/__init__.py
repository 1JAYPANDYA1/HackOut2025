# from flask import Flask
# from flask_cors import CORS

# def create_app():
#     app = Flask(__name__)
#     CORS(app)

#     # Register routes
#     from app.routes.predict_routes import predict_bp
#     app.register_blueprint(predict_bp, url_prefix="/api")

#     return app
# app/routes/__init__.py
from flask import Flask
from .predict_routes import predict_bp


def register_routes(app: Flask):
    app.register_blueprint(predict_routes)
