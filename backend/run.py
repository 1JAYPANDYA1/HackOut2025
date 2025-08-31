# from app import create_app

# app = create_app()

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000, debug=True)


# from app import create_app

# app = create_app()

# if __name__ == "__main__":
#     app.run(debug=True)
# # run.py
from flask import Flask
from app.routes.predict_routes import predict_bp

def create_app():
    app = Flask(__name__)
    app.register_blueprint(predict_bp, url_prefix="/api")
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
