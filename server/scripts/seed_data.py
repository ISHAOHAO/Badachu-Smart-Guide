import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app, db
from models.spot import Spot, HiddenSpot
from models.badge import Badge
from models.question import Question

def seed_spots():
    spots = [
        Spot(id=1, name='长安寺', temple_order='第一处', subtitle='明代古刹·观音道场',
            description='长安寺始建于明代弘治十七年（1504年），主要供奉观世音菩萨。规模虽不大，但以精美佛像造像著称。',
            history='长安寺历经明清两代多次重修，是八大处中规模较小的寺庙之一。',
            culture='长安寺体现大乘佛教慈悲救世精神，观音信仰是其主要文化特色。',
            founded='明代弘治十七年(1504年)', opening_hours='08:00-17:00', visit_duration='约30分钟',
            latitude=39.9585, longitude=116.1785, badge_id=1,
            highlights=['明代铜佛像', '观音文化', '古建筑群']),
        Spot(id=2, name='灵光寺', temple_order='第二处', subtitle='唐代古刹·佛牙舍利',
            description='灵光寺始建于唐代，是八大处中规模最大、保存最完好的寺庙。寺内有著名的佛牙舍利塔，高51米。',
            history='灵光寺历经千年沧桑，现存建筑多为明清时期重建。佛牙舍利塔始建于1958-1964年。',
            culture='佛牙舍利是佛教至高无上的圣物之一，全球仅存两颗。',
            founded='唐代', opening_hours='08:00-17:00', visit_duration='约60分钟',
            latitude=39.9605, longitude=116.1805, badge_id=2,
            highlights=['佛牙舍利塔', '千年古刹', '佛教朝圣地']),
        Spot(id=3, name='三山庵', temple_order='第三处', subtitle='金代古刹·禅修胜地',
            description='三山庵始建于金代，小巧雅致，因地处三山之间而得名，环境清幽，是理想的禅修之所。',
            history='三山庵虽规模不大，但地理位置独特，处于三山环抱之中。',
            culture='三山庵体现佛教禅修文化，适合静思冥想。',
            founded='金代', opening_hours='08:00-17:00', visit_duration='约25分钟',
            latitude=39.9615, longitude=116.1815, badge_id=3,
            highlights=['三山美景', '禅修文化', '清幽环境']),
        Spot(id=4, name='大悲寺', temple_order='第四处', subtitle='元代古刹·壁画珍宝',
            description='大悲寺始建于元代，以精美的元代壁画著称，是现存较为完整的佛教艺术珍品。',
            history='大悲寺的元代壁画是北京地区保存最完整的古代壁画之一。',
            culture='大悲寺以观音菩萨为主题，体现了大乘佛教的慈悲精神。',
            founded='元代', opening_hours='08:00-17:00', visit_duration='约40分钟',
            latitude=39.9625, longitude=116.1825, badge_id=4,
            highlights=['元代壁画', '佛教艺术', '观音文化']),
        Spot(id=5, name='龙泉庵', temple_order='第五处', subtitle='龙泉胜景·水韵禅心',
            description='龙泉庵以龙泉胜景闻名，泉水清甜甘冽，体现水无定性的哲学思想。',
            history='龙泉庵的泉水常年不竭，是八大处重要的自然景观之一。',
            culture='龙泉之水体现佛教水无定性，随心所转的哲学思想。',
            founded='明代', opening_hours='08:00-17:00', visit_duration='约35分钟',
            latitude=39.9635, longitude=116.1835, badge_id=5,
            highlights=['龙泉胜景', '品茗文化', '自然风光']),
        Spot(id=6, name='香界寺', temple_order='第六处', subtitle='清代皇家寺院',
            description='香界寺是清代皇家寺院，保存了完整的清代建筑群，多位皇帝曾在此留下墨宝。',
            history='康熙、乾隆等皇帝曾多次到此巡游，并御笔题写匾额和诗词。',
            culture='香界寺体现皇家佛教文化特色。',
            founded='清代', opening_hours='08:00-17:00', visit_duration='约45分钟',
            latitude=39.9645, longitude=116.1845, badge_id=6,
            highlights=['清代建筑群', '御笔墨宝', '皇家文化']),
        Spot(id=7, name='宝珠洞', temple_order='第七处', subtitle='天然洞穴·造化神奇',
            description='宝珠洞因天然岩石洞穴而得名，是独特的自然与人文景观结合体。',
            history='宝珠洞是一处天然形成的岩石洞穴，洞内曾供奉佛像。',
            culture='宝珠洞体现佛教与自然和谐共生的理念。',
            founded='明代', opening_hours='08:00-17:00', visit_duration='约30分钟',
            latitude=39.9655, longitude=116.1855, badge_id=7,
            highlights=['天然洞穴', '自然奇观', '人文融合']),
        Spot(id=8, name='证果寺', temple_order='第八处', subtitle='唐代古刹·千年见证',
            description='证果寺始建于唐代，是八大处中历史最悠久的寺庙，见证了八大处地区佛教文化的发展历程。',
            history='证果寺始建于唐代，是八大处地区最早的佛教寺院之一。',
            culture='证果寺体现佛教在唐代北京的传播和发展。',
            founded='唐代', opening_hours='08:00-17:00', visit_duration='约35分钟',
            latitude=39.9665, longitude=116.1865, badge_id=8,
            highlights=['千年历史', '唐代古刹', '佛教传承']),
    ]
    db.session.add_all(spots)

def seed_hidden_spots():
    hidden_spots = [
        HiddenSpot(id='h1', name='古树佛影', hint='一棵百年古松树旁', zen_sound='风铃声', latitude=39.9595, longitude=116.1795, radius=50, badge_name='古树守护者'),
        HiddenSpot(id='h2', name='洞天福地', hint='宝珠洞旁的小石洞', zen_sound='空灵梵音', latitude=39.9650, longitude=116.1850, radius=50, badge_name='洞天探秘者'),
        HiddenSpot(id='h3', name='泉眼源头', hint='龙泉的上游泉眼', zen_sound='流水声', latitude=39.9630, longitude=116.1830, radius=50, badge_name='寻泉人'),
        HiddenSpot(id='h4', name='塔影夕照', hint='佛牙舍利塔的最佳观景位置', zen_sound='晚钟声', latitude=39.9600, longitude=116.1800, radius=50, badge_name='夕阳捕手'),
        HiddenSpot(id='h5', name='禅房花木', hint='香界寺后院的一处禅房', zen_sound='木鱼声', latitude=39.9640, longitude=116.1840, radius=50, badge_name='禅心发现者'),
        HiddenSpot(id='h6', name='山巅回望', hint='虎头山的一处观景台', zen_sound='风声与钟声合奏', latitude=39.9670, longitude=116.1870, radius=50, badge_name='登高望远者'),
    ]
    db.session.add_all(hidden_spots)

def seed_badges():
    badges = [
        Badge(id=1, name='长安寺徽章', type='temple', spot_id='1', description='打卡长安寺获得', fortune_reward=20, condition='在长安寺打卡'),
        Badge(id=2, name='灵光寺徽章', type='temple', spot_id='2', description='打卡灵光寺获得', fortune_reward=20, condition='在灵光寺打卡'),
        Badge(id=3, name='三山庵徽章', type='temple', spot_id='3', description='打卡三山庵获得', fortune_reward=20, condition='在三山庵打卡'),
        Badge(id=4, name='大悲寺徽章', type='temple', spot_id='4', description='打卡大悲寺获得', fortune_reward=20, condition='在大悲寺打卡'),
        Badge(id=5, name='龙泉庵徽章', type='temple', spot_id='5', description='打卡龙泉庵获得', fortune_reward=20, condition='在龙泉庵打卡'),
        Badge(id=6, name='香界寺徽章', type='temple', spot_id='6', description='打卡香界寺获得', fortune_reward=20, condition='在香界寺打卡'),
        Badge(id=7, name='宝珠洞徽章', type='temple', spot_id='7', description='打卡宝珠洞获得', fortune_reward=20, condition='在宝珠洞打卡'),
        Badge(id=8, name='证果寺徽章', type='temple', spot_id='8', description='打卡证果寺获得', fortune_reward=20, condition='在证果寺打卡'),
        Badge(id=9, name='古树守护者', type='hidden', spot_id='h1', description='发现隐藏点古树佛影', fortune_reward=50, condition='找到古树佛影'),
        Badge(id=10, name='洞天探秘者', type='hidden', spot_id='h2', description='发现隐藏点洞天福地', fortune_reward=50, condition='找到洞天福地'),
        Badge(id=11, name='寻泉人', type='hidden', spot_id='h3', description='发现隐藏点泉眼源头', fortune_reward=50, condition='找到泉眼源头'),
        Badge(id=12, name='夕阳捕手', type='hidden', spot_id='h4', description='发现隐藏点塔影夕照', fortune_reward=50, condition='找到塔影夕照'),
        Badge(id=13, name='禅心发现者', type='hidden', spot_id='h5', description='发现隐藏点禅房花木', fortune_reward=50, condition='找到禅房花木'),
        Badge(id=14, name='登高望远者', type='hidden', spot_id='h6', description='发现隐藏点山巅回望', fortune_reward=50, condition='找到山巅回望'),
        Badge(id=15, name='初探八大处', type='achievement', description='首次打卡', fortune_reward=50, condition='完成首次打卡'),
        Badge(id=16, name='文化探索者', type='achievement', description='打卡4处寺庙', fortune_reward=100, condition='打卡4处寺庙'),
        Badge(id=17, name='佛教朝圣者', type='achievement', description='打卡全部8处寺庙', fortune_reward=200, condition='打卡全部8处寺庙'),
        Badge(id=18, name='发现者大师', type='achievement', description='打卡全部6个隐藏点', fortune_reward=300, condition='打卡全部6个隐藏点'),
        Badge(id=19, name='禅音追踪者', type='achievement', description='连续发现3个隐藏点', fortune_reward=200, condition='连续发现3个隐藏点'),
        Badge(id=20, name='摄影达人', type='achievement', description='拍照超过10张', fortune_reward=100, condition='拍照超过10张'),
        Badge(id=21, name='文化学者', type='achievement', description='完成所有文化问答', fortune_reward=200, condition='完成所有文化问答'),
    ]
    db.session.add_all(badges)

def seed_questions():
    questions = [
        Question(category='佛教基础', difficulty='easy', question_text='佛教的创始人是谁？', options=['释迦牟尼', '孔子', '老子', '耶稣'], correct_answer=0, explanation='佛教由释迦牟尼（佛陀）在古印度创立'),
        Question(category='八大处历史', difficulty='easy', question_text='八大处公园位于北京哪个区？', options=['海淀区', '石景山区', '朝阳区', '丰台区'], correct_answer=1, explanation='八大处公园位于北京市石景山区西山余脉'),
        Question(category='佛教基础', difficulty='medium', question_text='以下哪一个是佛教三宝之一？', options=['佛', '道', '儒', '法'], correct_answer=0, explanation='佛教三宝是佛、法、僧'),
        Question(category='八大处历史', difficulty='medium', question_text='八大处中哪座寺庙供奉着佛牙舍利？', options=['长安寺', '灵光寺', '大悲寺', '证果寺'], correct_answer=1, explanation='灵光寺佛牙舍利塔供奉着世界级佛教圣物佛牙舍利'),
        Question(category='佛教基础', difficulty='hard', question_text='涅槃在佛教中指的是什么？', options=['死亡', '觉悟解脱', '重生', '轮回'], correct_answer=1, explanation='涅槃指烦恼永远断除，达到觉悟解脱的境界'),
        Question(category='八大处历史', difficulty='hard', question_text='八大处中历史最悠久的寺庙是哪一座？', options=['灵光寺', '三山庵', '证果寺', '香界寺'], correct_answer=2, explanation='证果寺始建于唐代，是八大处中历史最悠久的寺庙'),
        Question(category='寺庙建筑', difficulty='medium', question_text='佛牙舍利塔的高度是多少？', options=['39米', '51米', '67米', '88米'], correct_answer=1, explanation='佛牙舍利塔高51米'),
        Question(category='佛教基础', difficulty='easy', question_text='佛教中的四谛不包括以下哪一项？', options=['苦谛', '集谛', '道谛', '爱谛'], correct_answer=3, explanation='四谛包括苦谛、集谛、灭谛、道谛'),
        Question(category='八大处历史', difficulty='medium', question_text='八大处的总面积约为多少？', options=['153公顷', '253公顷', '353公顷', '453公顷'], correct_answer=1, explanation='八大处公园占地面积约253公顷'),
        Question(category='寺庙建筑', difficulty='hard', question_text='大悲寺以什么艺术形式著称？', options=['雕塑', '壁画', '书法', '建筑'], correct_answer=1, explanation='大悲寺以精美的元代壁画著称'),
    ]
    db.session.add_all(questions)

def seed_all():
    app = create_app('development')
    with app.app_context():
        db.drop_all()
        db.create_all()
        seed_spots()
        seed_hidden_spots()
        seed_badges()
        seed_questions()
        db.session.commit()
        print('[OK] Seed data created successfully!')

if __name__ == '__main__':
    seed_all()
