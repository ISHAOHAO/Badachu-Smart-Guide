from app import db
from datetime import datetime

class CheckIn(db.Model):
    __tablename__ = 'checkins'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    spot_id = db.Column(db.Integer, db.ForeignKey('spots.id'))
    spot_name = db.Column(db.String(50))
    photo_url = db.Column(db.String(500))
    description = db.Column(db.String(200))
    checkin_type = db.Column(db.String(20), default='visible')  # visible, hidden
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    fortune_earned = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'spot_id': self.spot_id,
            'spot_name': self.spot_name,
            'photo_url': self.photo_url,
            'description': self.description,
            'checkin_type': self.checkin_type,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'fortune_earned': self.fortune_earned,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
