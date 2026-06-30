from flask import Blueprint, jsonify
from models.spot import Spot

spots_bp = Blueprint('spots', __name__)

@spots_bp.route('', methods=['GET'])
def get_spots():
    spots = Spot.query.filter_by(is_hidden=False).order_by(Spot.id).all()
    return jsonify({
        'success': True,
        'data': [spot.to_dict() for spot in spots]
    })

@spots_bp.route('/<int:spot_id>', methods=['GET'])
def get_spot_detail(spot_id):
    spot = Spot.query.get(spot_id)
    if not spot:
        return jsonify({'success': False, 'message': '景点不存在'}), 404
    
    return jsonify({'success': True, 'data': spot.to_dict()})
