from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.badge import Badge, UserBadge

badge_bp = Blueprint('badges', __name__)

@badge_bp.route('', methods=['GET'])
def get_all_badges():
    badges = Badge.query.all()
    return jsonify({
        'success': True,
        'data': [b.to_dict() for b in badges]
    })

@badge_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_badges():
    user_id = int(get_jwt_identity())
    user_badges = UserBadge.query.filter_by(user_id=user_id).all()
    
    return jsonify({
        'success': True,
        'data': [ub.to_dict() for ub in user_badges]
    })
