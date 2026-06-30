from app import db
from models.user import User
from models.fortune import FortuneTransaction

class FortuneService:
    @staticmethod
    def add_transaction(user_id, amount, type='earn', source='', description='', reference_id=None):
        user = User.query.get(user_id)
        if not user:
            return None
        
        transaction = FortuneTransaction(
            user_id=user_id,
            amount=amount,
            type=type,
            source=source,
            description=description,
            reference_id=reference_id
        )
        
        db.session.add(transaction)
        
        if type == 'earn':
            user.fortune_light = (user.fortune_light or 0) + amount
        elif type == 'spend':
            user.fortune_light = max(0, (user.fortune_light or 0) - amount)
        
        FortuneService._update_level(user)
        
        return transaction
    
    @staticmethod
    def _update_level(user):
        fortune = user.fortune_light or 0
        if fortune < 100:
            user.level = 1
        elif fortune < 300:
            user.level = 2
        elif fortune < 600:
            user.level = 3
        elif fortune < 1000:
            user.level = 4
        else:
            user.level = 5
