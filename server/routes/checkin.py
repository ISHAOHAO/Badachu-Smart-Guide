from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.checkin import CheckIn
from models.spot import Spot, HiddenSpot
from services.fortune_service import FortuneService

checkin_bp = Blueprint('checkin', __name__)

@checkin_bp.route('', methods=['POST'])
@jwt_required()
def create_checkin():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    if not data or not data.get('spot_id'):
        return jsonify({'success': False, 'message': '缺少景点信息'}), 400
    
    spot_id = data.get('spot_id')
    spot_name = data.get('spot_name', '')
    checkin_type = data.get('checkin_type', 'visible')
    
    checkin = CheckIn(
        user_id=user_id,
        spot_id=spot_id if isinstance(spot_id, int) else None,
        spot_name=spot_name,
        photo_url=data.get('photo_url', ''),
        description=data.get('description', ''),
        checkin_type=checkin_type,
        latitude=data.get('latitude'),
        longitude=data.get('longitude'),
        fortune_earned=50 if checkin_type == 'hidden' else 10
    )
    
    db.session.add(checkin)
    
    if isinstance(spot_id, int):
        spot = Spot.query.get(spot_id)
        if spot:
            spot.checkin_count = (spot.checkin_count or 0) + 1
    
    fortune_amount = 50 if checkin_type == 'hidden' else 10
    FortuneService.add_transaction(
        user_id=user_id,
        amount=fortune_amount,
        type='earn',
        source='hidden_checkin' if checkin_type == 'hidden' else 'checkin',
        description=f"{'隐藏打卡' if checkin_type == 'hidden' else '打卡'}: {spot_name}"
    )
    
    db.session.commit()
    
    return jsonify({
        'success': True,
        'data': checkin.to_dict(),
        'fortune_earned': fortune_amount
    }), 201

@checkin_bp.route('/list', methods=['GET'])
@jwt_required()
def get_checkins():
    user_id = int(get_jwt_identity())
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    
    pagination = CheckIn.query.filter_by(user_id=user_id)\
        .order_by(CheckIn.created_at.desc())\
        .paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        'success': True,
        'data': {
            'items': [c.to_dict() for c in pagination.items],
            'total': pagination.total,
            'pages': pagination.pages,
            'current_page': page
        }
    })

@checkin_bp.route('/nearby-hidden', methods=['POST'])
@jwt_required()
def get_nearby_hidden():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    
    if not latitude or not longitude:
        return jsonify({'success': False, 'message': '缺少位置信息'}), 400
    
    hidden_spots = HiddenSpot.query.filter_by(is_active=True).all()
    nearby = []
    
    for spot in hidden_spots:
        nearby.append(spot.to_dict())
    
    return jsonify({
        'success': True,
        'data': nearby
    })
