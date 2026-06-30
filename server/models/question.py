from app import db
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'
    
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50))
    difficulty = db.Column(db.String(20))  # easy, medium, hard
    question_text = db.Column(db.Text, nullable=False)
    options = db.Column(db.JSON, nullable=False)
    correct_answer = db.Column(db.Integer, nullable=False)
    explanation = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'difficulty': self.difficulty,
            'question_text': self.question_text,
            'options': self.options,
            'explanation': self.explanation
        }
    
    def to_quiz_dict(self):
        return {
            'id': self.id,
            'category': self.category,
            'difficulty': self.difficulty,
            'question_text': self.question_text,
            'options': self.options
        }
