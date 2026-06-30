from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from models.user import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'message': '缺少请求数据'}), 400
    
    code = data.get('code')
    user_info = data.get('userInfo', {})
    
    openid = f"mock_openid_{hash(str(code)) if code else 'anonymous'}"
    
    user = User.query.filter_by(openid=openid).first()
    if not user:
        user = User(
            openid=openid,
            nickname=user_info.get('nickName', '游客'),
            avatar_url=user_info.get('avatarUrl', '')
        )
        db.session.add(user)
        db.session.commit()
    
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        'success': True,
        'data': {
            'token': access_token,
            'user': user.to_dict()
        }
    })

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': '用户不存在'}), 404
    
    return jsonify({'success': True, 'data': user.to_dict()})

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    if not user:
        return jsonify({'success': False, 'message': '用户不存在'}), 404
    
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'message': '缺少请求数据'}), 400
    
    for field in ['nickname', 'avatar_url', 'phone', 'age_zone', 'zen_sound_enabled', 'language', 'font_size']:
        if field in data:
            setattr(user, field, data[field])
    
    db.session.commit()
    return jsonify({'success': True, 'data': user.to_dict()})
