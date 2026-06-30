from app import db
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    openid = db.Column(db.String(100), unique=True)
    nickname = db.Column(db.String(50))
    avatar_url = db.Column(db.String(500))
    phone = db.Column(db.String(20))
    fortune_light = db.Column(db.Integer, default=0)
    level = db.Column(db.Integer, default=1)
    age_zone = db.Column(db.String(20), default='adult')
    zen_sound_enabled = db.Column(db.Boolean, default=True)
    language = db.Column(db.String(10), default='zh')
    font_size = db.Column(db.String(10), default='normal')
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    checkins = db.relationship('CheckIn', backref='user', lazy='dynamic')
    badges = db.relationship('UserBadge', backref='user', lazy='dynamic')
    transactions = db.relationship('FortuneTransaction', backref='user', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'nickname': self.nickname,
            'avatar_url': self.avatar_url,
            'phone': self.phone,
            'fortune_light': self.fortune_light,
            'level': self.level,
            'age_zone': self.age_zone,
            'zen_sound_enabled': self.zen_sound_enabled,
            'language': self.language,
            'font_size': self.font_size,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'last_login_at': self.last_login_at.isoformat() if self.last_login_at else None
        }
