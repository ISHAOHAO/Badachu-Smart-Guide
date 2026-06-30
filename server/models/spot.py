from app import db
from datetime import datetime

class Spot(db.Model):
    __tablename__ = 'spots'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    temple_order = db.Column(db.String(20))
    subtitle = db.Column(db.String(100))
    description = db.Column(db.Text)
    history = db.Column(db.Text)
    culture = db.Column(db.Text)
    founded = db.Column(db.String(100))
    images = db.Column(db.JSON, default=list)
    audio_url = db.Column(db.String(500))
    video_url = db.Column(db.String(500))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    opening_hours = db.Column(db.String(50))
    visit_duration = db.Column(db.String(50))
    highlights = db.Column(db.JSON, default=list)
    badge_id = db.Column(db.Integer, db.ForeignKey('badges.id'))
    is_hidden = db.Column(db.Boolean, default=False)
    checkin_count = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'temple_order': self.temple_order,
            'subtitle': self.subtitle,
            'description': self.description,
            'history': self.history,
            'culture': self.culture,
            'founded': self.founded,
            'images': self.images or [],
            'audio_url': self.audio_url,
            'video_url': self.video_url,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'opening_hours': self.opening_hours,
            'visit_duration': self.visit_duration,
            'highlights': self.highlights or [],
            'badge_id': self.badge_id,
            'is_hidden': self.is_hidden,
            'checkin_count': self.checkin_count
        }

class HiddenSpot(db.Model):
    __tablename__ = 'hidden_spots'
    
    id = db.Column(db.String(20), primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    hint = db.Column(db.String(200))
    zen_sound = db.Column(db.String(50))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    radius = db.Column(db.Integer, default=50)
    badge_name = db.Column(db.String(50))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'hint': self.hint,
            'zen_sound': self.zen_sound,
            'latitude': self.latitude,
            'longitude': self.longitude,
            'radius': self.radius,
            'badge_name': self.badge_name,
            'is_active': self.is_active
        }
