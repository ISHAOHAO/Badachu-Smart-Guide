import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from config import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_name=None):
    if config_name is None:
        config_name = os.environ.get('FLASK_CONFIG', 'default')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    from routes.auth import auth_bp
    from routes.spots import spots_bp
    from routes.checkin import checkin_bp
    from routes.badge import badge_bp
    from routes.fortune import fortune_bp
    from routes.quiz import quiz_bp
    from routes.leaderboard import leaderboard_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(spots_bp, url_prefix='/api/v1/spots')
    app.register_blueprint(checkin_bp, url_prefix='/api/v1/checkin')
    app.register_blueprint(badge_bp, url_prefix='/api/v1/badges')
    app.register_blueprint(fortune_bp, url_prefix='/api/v1/fortune')
    app.register_blueprint(quiz_bp, url_prefix='/api/v1/quiz')
    app.register_blueprint(leaderboard_bp, url_prefix='/api/v1/leaderboard')
    
    @app.route('/api/v1/health')
    def health_check():
        return {'status': 'ok', 'message': '八大处智慧导览 API 运行中'}
    
    return app

if __name__ == '__main__':
    app = create_app(os.environ.get('FLASK_CONFIG', 'development'))
    app.run(host='0.0.0.0', port=5000, debug=True)
