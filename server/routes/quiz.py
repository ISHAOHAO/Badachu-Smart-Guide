from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.user import User
from models.question import Question
from services.fortune_service import FortuneService

quiz_bp = Blueprint('quiz', __name__)

@quiz_bp.route('/questions', methods=['GET'])
def get_questions():
    category = request.args.get('category')
    difficulty = request.args.get('difficulty')
    
    query = Question.query.filter_by(is_active=True)
    if category:
        query = query.filter_by(category=category)
    if difficulty:
        query = query.filter_by(difficulty=difficulty)
    
    questions = query.all()
    
    return jsonify({
        'success': True,
        'data': [q.to_quiz_dict() for q in questions]
    })

@quiz_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_answer():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    if not data or not data.get('question_id') or data.get('answer') is None:
        return jsonify({'success': False, 'message': '缺少答题信息'}), 400
    
    question = Question.query.get(data['question_id'])
    if not question:
        return jsonify({'success': False, 'message': '题目不存在'}), 404
    
    is_correct = data['answer'] == question.correct_answer
    
    if is_correct:
        FortuneService.add_transaction(
            user_id=user_id,
            amount=15,
            type='earn',
            source='quiz',
            description=f"答对: {question.question_text[:20]}..."
        )
        db.session.commit()
    
    return jsonify({
        'success': True,
        'data': {
            'is_correct': is_correct,
            'correct_answer': question.correct_answer,
            'explanation': question.explanation,
            'fortune_earned': 15 if is_correct else 0
        }
    })
