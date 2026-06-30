from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.user import User
from models.fortune import FortuneTransaction
from services.fortune_service import FortuneService

fortune_bp = Blueprint('fortune', __name__)

@fortune_bp.route('/balance', methods=['GET'])
@jwt_required()
def get_balance():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    
    return jsonify({
        'success': True,
        'data': {'fortune_light': user.fortune_light if user else 0}
    })

@fortune_bp.route('/transactions', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = int(get_jwt_identity())
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    pagination = FortuneTransaction.query.filter_by(user_id=user_id)\
        .order_by(FortuneTransaction.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'success': True,
        'data': {
            'items': [t.to_dict() for t in pagination.items],
            'total': pagination.total
        }
    })

@fortune_bp.route('/exchange', methods=['POST'])
@jwt_required()
def exchange():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    if not data or not data.get('item') or not data.get('cost'):
        return jsonify({'success': False, 'message': '缺少兑换信息'}), 400
    
    cost = data.get('cost', 0)
    item = data.get('item', '')
    
    user = User.query.get(user_id)
    if not user or user.fortune_light < cost:
        return jsonify({'success': False, 'message': '福光不足'}), 400
    
    FortuneService.add_transaction(
        user_id=user_id,
        amount=cost,
        type='spend',
        source='exchange',
        description=f"兑换: {item}"
    )
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'message': '兑换成功',
        'data': {'fortune_light': user.fortune_light}
    })
