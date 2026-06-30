from flask import Blueprint, request, jsonify
from app import db
from models.user import User
from models.checkin import CheckIn
from models.badge import UserBadge

leaderboard_bp = Blueprint('leaderboard', __name__)

@leaderboard_bp.route('/<leaderboard_type>', methods=['GET'])
def get_leaderboard(leaderboard_type):
    period = request.args.get('period', 'total')
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)
    
    if leaderboard_type == 'fortune':
        users = User.query.order_by(User.fortune_light.desc()).all()
        data = [{
            'rank': i + 1,
            'user_id': u.id,
            'nickname': u.nickname,
            'avatar_url': u.avatar_url,
            'value': u.fortune_light,
            'unit': '福光'
        } for i, u in enumerate(users)]
    
    elif leaderboard_type == 'badge':
        users = User.query.all()
        data = [{
            'rank': i + 1,
            'user_id': u.id,
            'nickname': u.nickname,
            'avatar_url': u.avatar_url,
            'value': UserBadge.query.filter_by(user_id=u.id).count(),
            'unit': '枚'
        } for i, u in enumerate(sorted(users, key=lambda u: UserBadge.query.filter_by(user_id=u.id).count(), reverse=True))]
    
    elif leaderboard_type == 'checkin':
        users = User.query.all()
        data = [{
            'rank': i + 1,
            'user_id': u.id,
            'nickname': u.nickname,
            'avatar_url': u.avatar_url,
            'value': CheckIn.query.filter_by(user_id=u.id).count(),
            'unit': '次'
        } for i, u in enumerate(sorted(users, key=lambda u: CheckIn.query.filter_by(user_id=u.id).count(), reverse=True))]
    
    else:
        users = User.query.order_by(User.fortune_light.desc()).all()
        data = [{
            'rank': i + 1,
            'user_id': u.id,
            'nickname': u.nickname,
            'avatar_url': u.avatar_url,
            'value': u.fortune_light,
            'unit': '福光'
        } for i, u in enumerate(users)]
    
    return jsonify({
        'success': True,
        'data': data[:per_page]
    })
