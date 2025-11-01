// Firebase 配置和初始化
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBs5eWEiabOSZrP5LqQSvDeJ8L3pDjTyu8",
    authDomain: "comment-526a0.firebaseapp.com",
    databaseURL: "https://comment-526a0-default-rtdb.firebaseio.com",
    projectId: "comment-526a0",
    storageBucket: "comment-526a0.firebasestorage.app",
    messagingSenderId: "450500622985",
    appId: "1:450500622985:web:19ea2335e274de8be82458",
    measurementId: "G-N1H2NCGLGR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 题目数据
const questions = [
    {
        id: 1,
        type: 'choice',
        text: '首先，你是怎么看待这份小问卷的？',
        options: [
            'A. 觉得还好，能通过题目更清晰地梳理自己的想法，也愿意之后和你聊聊答题时的感受',
            'B. 有点疑惑，不太明白为什么要做这类测试，希望你能说说做测试的初衷',
            'C. 会有点不舒服，感觉像是在被 "试探"，更希望我们通过日常聊天了解彼此，而不是靠测试',
            'D. 没什么特别感觉，只是按选项选了答案，对测试本身没太多想法',
            'E. 觉得挺有意义的，能帮我们发现相处中没聊到的点，之后如果有类似的沟通方式也愿意尝试'
        ]
    },
    {
        id: 2,
        type: 'choice',
        text: '在小说《围城》里有名言："城外的人想进去，城里的人想出来。" 你如何看待它在现代情感中的意义？',
        options: [
            'A. 它揭示了人性的普遍弱点，需要双方时刻共同警醒和努力珍惜。',
            'B. 认为这更多是特定时代的产物，现代关系更注重共同成长和创造"城堡"的乐趣。',
            'C. 偶尔对"城"外的风景好奇是人之常情，但重要的是知道自己的心在哪里。',
            'D. 感情需要经营，找到让"城"内生活丰富多彩的方法是关键。'
        ]
    },
    {
        id: 3,
        type: 'choice',
        text: '在朋友面前，你会如何谈论我？',
        options: [
            'A. 经常提起我的优点，言语间充满自豪。',
            'B. 客观地提起，有好有坏，但总体是积极的。',
            'C. 很少主动提起我。',
            'D. 偶尔会抱怨我的一些缺点。'
        ]
    },
    {
        id: 4,
        type: 'choice',
        text: '欣赏美术馆的画作时，你更倾向于：',
        options: [
            'A. 专注于一幅最让你感动的作品，反复品味其中的细节和情感。',
            'B. 带着开放的心态浏览整个展厅，不错过任何一种美的可能性。',
            'C. 喜欢和同伴一起讨论，分享彼此对艺术的不同见解，在交流中获得乐趣。',
            'D. 寻找那些背后有深刻爱情故事的画作，并为之动容。'
        ]
    },
    {
        id: 5,
        type: 'choice',
        text: '你做了一件可能会让我生气的事（比如，瞒着我偷偷干了些我不让干的事），你会：',
        options: [
            'A. 找个好时机主动向我坦白，并解释原因。',
            'B. 尽量瞒着，能瞒多久是多久。',
            'C. 等我发现的时候再解释，并希望我能理解。',
            'D. 先跟朋友商量，看看怎么说我才不会生气。'
        ]
    },
    {
        id: 6,
        type: 'choice',
        text: '你认为"红颜知己"或"蓝颜知己"在一段稳定的恋爱关系中是怎样的存在？',
        options: [
            'A. 一个危险的信号，任何模糊不清的界限都可能对感情造成伤害。',
            'B. 可以接受，但前提是必须让伴侣知晓并认识这位朋友，做到完全透明。',
            'C. 这是个人社交自由的一部分，只要自己内心坦荡，就无需过多解释。',
            'D. 真正的知己会自觉地尊重你的伴侣，并主动保持恰当的距离。'
        ]
    },
    {
        id: 7,
        type: 'choice',
        text: '除了"我爱你"，哪一句话最能让你感到温暖和安心？',
        options: [
            'A. "有我在，别怕。" —— 给予安全感',
            'B. "我为你感到骄傲。" —— 给予价值感',
            'C. "我们一起去……" —— 给予参与感',
            'D. "我理解你。" —— 给予认同感'
        ]
    },
    {
        id: 8,
        type: 'choice',
        text: '在一部文艺电影里，主角遇到了一个与自己灵魂格外契合的陌生人。你更欣赏哪种结局？',
        options: [
            'A. 主角坚守住了对伴侣的承诺，将这份相遇化作一段美丽而短暂的回忆。',
            'B. 主角勇敢地追求内心感觉，选择了新的可能性。',
            'C. 主角将这位"灵魂伴侣"变成了可以与自己伴侣共同分享的好朋友。',
            'D. 电影采用开放式结局，留给观众无限的想象空间。'
        ]
    },
    {
        id: 9,
        type: 'choice',
        text: '你内心深处，相信"一生只会真正深爱一个人"的说法吗？',
        options: [
            'A. 坚信不疑，真爱是独一无二的。',
            'B. 不太相信，这更像是一种美好的愿望。',
            'C. 不确定，也许因人而异，无法一概而论。'
        ]
    },
    {
        id: 10,
        type: 'choice',
        text: '当你取得一项重大成就时，你最渴望得到哪种形式的祝贺？',
        options: [
            'A. 伴侣为你举办一个只有你们两个人的温馨庆祝。',
            'B. 伴侣在社交媒体上"炫耀"你的成就，让所有朋友都知道。',
            'C. 伴侣认真地与你复盘成功的喜悦和不易，给予精神上的深刻共鸣。',
            'D. 一份精心挑选的、有特殊意义的礼物。'
        ]
    },
    {
        id: 11,
        type: 'choice',
        text: '当朋友不经意问起"你将来想过什么样的生活"时，你会如何描述我们的关系？',
        options: [
            'A. "我想和我现在的另一半，一起过XX样的生活。"',
            'B. "我有个伴侣，我们还在磨合和探索未来。"',
            'C. 只会说自己的想法，比如事业、生活状态等，不会主动提及我。',
            'D. "还没想好呢，顺其自然吧。"'
        ]
    },
    {
        id: 12,
        type: 'choice',
        text: '如果伴侣因为工作需要，必须与一位你不太喜欢的异性频繁接触，你会：',
        options: [
            'A. 压下自己的不快，选择相信伴侣的专业和人品。',
            'B. 坦诚地表达自己的忧虑，但强调是自己的"小情绪"，希望他能理解。',
            'C. 主动找机会认识这位同事，用友好的方式"宣告主权"。',
            'D. 对伴侣提出一些保持距离的建议，比如减少非必要的工作外接触。'
        ]
    },
    {
        id: 13,
        type: 'choice',
        text: '柏拉图曾探讨过"精神恋爱"，你认为在现代社会，纯粹的精神共鸣是否可能动摇一段既有的亲密关系？',
        options: [
            'A. 极有可能，精神上的出轨有时比身体上的更具颠覆性。',
            'B. 不太可能，只要没有物理接触，精神上的欣赏和交流是可以接受的。',
            'C. 这取决于关系的深度，根基牢固的感情不惧怕任何形式的考验。',
            'D. 关键在于"度"，适度的精神交流可以丰富人生，过度则会越界。'
        ]
    },
    {
        id: 14,
        type: 'choice',
        text: '当我认真地提出一个希望你改进的小建议时（比如某个生活习惯），你的第一反应通常是？',
        options: [
            'A. 认真倾听，思考是否有道理，愿意为了我们共同的生活做出改变。',
            'B. 感到被指责，会有些不快，并下意识为自己辩护。',
            'C. 口头上答应"好好好"，但过后还是老样子。',
            'D. 反过来也指出我的一个缺点，觉得这样才"公平"。'
        ]
    },
    {
        id: 15,
        type: 'choice',
        text: '你如何理解"安全感"这个词？',
        options: [
            'A. 他的未来规划里，处处都有我的位置。',
            'B. 无论我变成什么样子，他都依然爱我、接纳我。',
            'C. 我可以放心地在他面前展现自己最脆弱、最不堪的一面。',
            'D. 他能主动地与其他异性保持让我安心的距离。'
        ]
    },
    {
        id: 16,
        type: 'choice',
        text: '如果我送的礼物，恰好不是你喜欢的风格，你会？',
        options: [
            'A. 依然开心地收下，因为心意比礼物本身更重要。',
            'B. 收下并感谢，然后找机会温和地告诉我你的真实喜好。',
            'C. 嘴上说喜欢，但事后可能会悄悄处理掉。',
            'D. 勉强收下，但脸上会流露出一丝失望。'
        ]
    },
    {
        id: 17,
        type: 'choice',
        text: '哪种情况会让你对这段感情的"忠诚度"产生最大的动摇？',
        options: [
            'A. 发现伴侣对另一位异性产生了精神上的依赖和欣赏。',
            'B. 发现伴侣对自己有所隐瞒，哪怕是小事。',
            'C. 伴侣开始频繁地抱怨、指责，不再像以前那样包容。',
            'D. 在我最需要他/她的时候，他/她却不在身边。'
        ]
    },
    {
        id: 18,
        type: 'choice',
        text: '你是否愿意和我分享你最脆弱、最不堪的一面？',
        options: [
            'A. 当然，爱一个人就应该接纳他的全部。',
            'B. 会有所保留，有些事情只想自己知道。',
            'C. 只有在感觉非常安全和被信任的时候才会。',
            'D. 不太愿意，希望在爱人面前永远保持最好的形象。'
        ]
    },
    {
        id: 19,
        type: 'choice',
        text: '如果可以为你们的关系选择一个"守护神兽"，你会选：',
        options: [
            'A. 忠诚的狗狗，代表不离不弃的陪伴。',
            'B. 优雅的猫咪，代表独立又亲昵的平衡。',
            'C. 智慧的海豚，代表在情感的海洋里能默契沟通。',
            'D. 比翼鸟，代表永远相伴，共同飞翔。'
        ]
    },
    {
        id: 20,
        type: 'choice',
        text: '你认为情侣吵架时，最不应该触碰的"红线"是什么？',
        options: [
            'A. 轻易说"分手"。',
            'B. 翻旧账，把问题扩大化。',
            'C. 拒绝沟通，玩"冷暴力"。',
            'D. 人身攻击，说出非常伤人的话。'
        ]
    },
    {
        id: 21,
        type: 'choice',
        text: '若你对我某些方面存在不满，你会选择怎样的方式处理？',
        options: [
            'A. 直接坦诚沟通，明确指出问题所在，并共同探讨解决方案',
            'B. 先梳理清楚自己的想法，再找合适时机严肃沟通，避免情绪化表达',
            'C. 暂时搁置，若问题持续存在，再郑重提出并要求对方重视',
            'D. 不会主动提及，但若不满累积到一定程度，会集中爆发或直接疏远'
        ]
    },
    {
        id: 22,
        type: 'choice',
        text: '争吵过后，我们和好了。对于之前的问题，你希望是怎样的处理方式？',
        options: [
            'A. 翻篇了就让它彻底过去，不再提起。',
            'B. 虽然和好了，但心里还需要时间慢慢消化。',
            'C. 希望能一起复盘，避免以后再犯同样的错误。',
            'D. 表面翻篇，但心里记下了，以后吵架可能还会提起。'
        ]
    },
    {
        id: 23,
        type: 'choice',
        text: '穆尼尔·纳素夫说："如果你对一个人有感觉，你会觉得他身上有光。" 在长久的关系里，你如何理解这道"光"？',
        options: [
            'A. 它是最初吸引我的特质，需要时时擦拭，让它保持明亮。',
            'B. 这道光会随着时间转化，从耀眼的激情变成温暖的炉火。',
            'C. 两个人在一起，是彼此互为光源，照亮对方的世界。',
            'D. 当生活归于平淡，需要用心去发现对方身上新的、更细微的光芒。'
        ]
    },
    {
        id: 24,
        type: 'choice',
        text: '假如我遇到了事业或学业上的重大挫折，情绪特别低落，你觉得你会怎么做？',
        options: [
            'A. 耐心陪伴，用行动和语言告诉我"无论如何我都在"。',
            'B. 给我一些个人空间让我冷静，同时默默做好后勤支持。',
            'C. 积极地帮我分析原因，出谋划策，想办法解决问题。',
            'D. 感到很焦虑，为我们的未来担忧，甚至会有些不知所措。'
        ]
    },
    {
        id: 25,
        type: 'choice',
        text: '朋友向你抱怨，说自己的伴侣依然和前任保持着"纯友谊"，你会如何劝解？',
        options: [
            'A. "这是一个危险信号，\'纯友谊\'往往是自欺欺人。"',
            'B. "关键在于边界感，以及他们是否对你足够坦诚。"',
            'C. "信任是基础，但也要让你的伴侣知道你的不安。"',
            'D. "这需要具体情况具体分析，不能一概而论。"'
        ]
    },
    {
        id: 26,
        type: 'choice',
        text: '你如何看待"为了爱情而放弃个人重要的东西"（比如事业、梦想）？',
        options: [
            'A. 这是伟大而浪漫的牺牲，是真爱的体现。',
            'B. 不太理智，好的爱情应该是互相成就，而不是单方面牺牲。',
            'C. 看放弃的是什么，如果是小事可以，但核心追求不行。',
            'D. 这可能是一种情感绑架，会让关系失衡。'
        ]
    },
    {
        id: 27,
        type: 'choice',
        text: '看到电影中主角因遇到"灵魂伴侣"而出轨的情节，你的内心感受是：',
        options: [
            'A. 艺术是夸张的，现实中"灵魂伴侣"更多是经营出来的。',
            'B. 对主角的处境抱有同情，情感的复杂性难以用道德简单评判。',
            'C. 无论理由多么动人，都无法认同背叛现有承诺的行为。',
            'D. 这是一个警示，提醒自己要不断深化与伴侣的精神交流。'
        ]
    },
    {
        id: 28,
        type: 'choice',
        text: '如果有位很有魅力的异性同事/同学，明显对你很有好感并主动示好，你会如何处理？',
        options: [
            'A. 明确告知自己有伴侣，并刻意保持工作/学习之外的距离。',
            'B. 正常来往，但会把这些事当成趣闻讲给我听，保持透明。',
            'C. 享受这种被欣赏的感觉，但会守住底线，不主动也不拒绝。',
            'D. 为了避免误会，会主动减少和这个人的所有非必要接触。'
        ]
    },
    {
        id: 29,
        type: 'choice',
        text: '如果你的好朋友不太看好我，在你面前说我的不是，你会怎么办？',
        options: [
            'A. 坚定地维护我，告诉朋友"这是我的选择，请你尊重"。',
            'B. 试着在我和朋友之间调和，但如果矛盾太大，会减少三方见面的机会。',
            'C. 听着朋友的抱怨，虽然不认同，但也不会激烈反驳，避免伤和气。',
            'D. 开始动摇，觉得朋友的意见可能也有道理。'
        ]
    },
    {
        id: 30,
        type: 'choice',
        text: '"妥协"这个词，在你的情感词典里更接近于：',
        options: [
            'A. 一种"爱的艺术"，是心甘情愿的相互靠近。',
            'B. 一种"策略"，为了更长远的目标而做出的必要让步。',
            'C. 一种"消耗"，偶尔为之可以，多了会感到疲惫。',
            'D. 一个中性词，是任何关系都无法避免的磨合过程。'
        ]
    },
    {
        id: 31,
        type: 'choice',
        text: '在社交场合，伴侣的哪种行为会让你感到特别安心和骄傲？',
        options: [
            'A. 在与人交谈时，眼神总会不时地寻找你，与你进行片刻的交流。',
            'B. 在向别人介绍你时，言语和神情中充满了欣赏和自豪。',
            'C. 当有人表达对你的欣赏时，他/她表现出"与有荣焉"的喜悦。',
            'D. 能自然地拒绝其他异性的过度热情或暧昧试探。'
        ]
    },
    {
        id: 32,
        type: 'choice',
        text: '在你心里，怎样才算是"出轨"？',
        options: [
            'A. 只有发生了亲密关系才算。',
            'B. 与他人产生精神依赖和暧昧聊天，即使没有身体接触也算。',
            'C. 对别人有好感不算，但有实际的单独约会行为就算。',
            'D. 以上B和C都算，任何对我们关系不忠诚的精神或身体行为都算。'
        ]
    },
    {
        id: 33,
        type: 'choice',
        text: '在异地恋期间，如果身边出现一位非常关心你的优秀异性，你会？',
        options: [
            'A. 明确拒绝对方，并把这件事告诉我，让我安心。',
            'B. 和对方保持朋友距离，但不会告诉我，避免不必要的争吵。',
            'C. 内心可能会有些动摇，但会努力克制。',
            'D. 重新评估我和你的关系，再决定如何回应对方。'
        ]
    },
    {
        id: 34,
        type: 'choice',
        text: '如果因为现实原因，我们不得不长期异地，你会如何看待我们的未来？',
        options: [
            'A. 如果短期内无法解决，可能会认真考虑是否要继续。',
            'B. 距离也是一种考验，我会更加珍惜和努力维系这份感情。',
            'C. 顺其自然，相信只要感情够深，就能经得起考验。'
        ]
    },
    {
        id: 35,
        type: 'choice',
        text: '如果你有一个可以对任何人使用一次"读心术"的机会，你会：',
        options: [
            'A. 用在我身上，不是为了探查，而是想更深地理解我，知道如何更好地爱我。',
            'B. 不会用在我身上，因为你相信我们之间的沟通和信任，胜过任何魔法。',
            'C. 放弃这个机会，因为探索未知的秘密，远不如创造共同的美好回忆。'
        ]
    },
    {
        id: 36,
        type: 'choice',
        text: '这是一个纯粹的假设：如果有一天，我情感上对他人动了心，但立刻意识到错误并向你坦白，你会如何面对？',
        options: [
            'A. 会看在过往感情和你的坦诚上，认真考虑给一次机会，之后一起努力修复信任',
            'B. 无法接受，信任一旦破碎就很难重建，直接选择结束这段关系',
            'C. 不立刻做决定，先暂时拉开距离冷静一段时间，再根据你的后续表现做判断',
            'D. 可以原谅，但会有心理隔阂，之后会忍不住更在意你的言行，很难完全信任',
            'E. 不确定，得结合当时的具体情境、你犯错的细节以及我的真实感受，才能最终决定'
        ]
    },
    {
        id: 37,
        type: 'choice',
        text: '一句真诚的道歉，对你而言最重要的是什么？',
        options: [
            'A. 速度。在第一时间承认错误，而不是辩解。',
            'B. 深度。能清晰地认识到自己的行为对你造成的伤害。',
            'C. 态度。言辞和神情都流露出真正的悔意。',
            'D. 行动。有具体的、可行的弥补措施和杜绝再犯的计划。'
        ]
    },
    {
        id: 38,
        type: 'choice',
        text: '当我们关系陷入僵局时，恰好有一位很棒的追求者出现，你的第一反应是？',
        options: [
            'A. 先集中精力处理好我们之间的问题，不给外界机会。',
            'B. 可能会动摇，并把新追求者作为衡量我们关系的一个参照。',
            'C. 在解决我们问题的同时，也会和新的追求者保持接触。'
        ]
    },
    {
        id: 39,
        type: 'choice',
        text: '当伴侣分享一个你完全无法理解的笑话时，你会：',
        options: [
            'A. 陪着他笑，快乐的氛围最重要。',
            'B. 诚实地说"我没get到"，然后让他解释一下。',
            'C. 试着从他的角度去理解，为什么他会觉得好笑。',
            'D. 转移话题，聊点别的。'
        ]
    },
    {
        id: 40,
        type: 'choice',
        text: '若沉浸于游戏时心生烦闷，你会将这份未散的情绪，带入与我的相处之中吗？',
        options: [
            'A. 不会，会先调整好状态，不让坏情绪影响彼此',
            'B. 可能会不经意流露，但若对方察觉，会及时说明并道歉',
            'C. 偶尔会，暂时没精力掩饰，希望对方能理解',
            'D. 会不自觉带入，需要对方的陪伴或安慰来缓解'
        ]
    },
    {
        id: 41,
        type: 'text',
        text: '回顾我们走过的路，你认为我们关系中最宝贵的是什么？'
    },
    {
        id: 42,
        type: 'text',
        text: '有没有什么话题，是你一直想和我聊，却又不知道如何开口的？'
    },
    {
        id: 43,
        type: 'text',
        text: '你有没有哪个藏在心里的小小梦想，是希望我能陪你一起去完成的？'
    },
    {
        id: 44,
        type: 'text',
        text: '如果让你给我贴五个"优点"的标签，会是什么？'
    },
    {
        id: 45,
        type: 'text',
        text: '如果可以回到我们刚认识的时候，你会对当时的自己说什么？'
    },
    {
        id: 46,
        type: 'text',
        text: '在你心里，最理想的"我们"是什么样子的？可以试着描述一下吗？'
    },
    {
        id: 47,
        type: 'text',
        text: '如果可以让我在某些方面作出改变，你希望是什么？（限50字）'
    },
    {
        id: 48,
        type: 'text',
        text: '有没有哪一次，我无意中说的话或做的事，让你感触很深？'
    },
    {
        id: 49,
        type: 'text',
        text: '讲一件关于我的、你觉得很傻的怪癖吧。'
    },
    {
        id: 50,
        type: 'text',
        text: '回想一下，有没有哪个我们共度的、看似平凡的瞬间，却让你在心里记了很久？'
    }
];

// 全局变量
let currentQuestionIndex = 0;
let answers = [];
let startTime = null;
let questionStartTime = null;
let timerInterval = null;
let currentQuizId = null;
let analysisResult = null;

// AI配置
const AI_CONFIG = {
    apiUrl: 'https://one.ocoolai.com/v1/chat/completions',
    apiKey: 'sk-nNWV2k1WDyR2GsE117A7027714E74a428fC442330e6dE1D7',
    model: 'gemini-2.5-pro'
};

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// 页面加载时启动流星效果
window.addEventListener('DOMContentLoaded', () => {
    createMeteors();
});

// 创建流星
function createMeteors() {
    setInterval(() => {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';

        // 随机起始位置
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight * 0.5;

        meteor.style.left = startX + 'px';
        meteor.style.top = startY + 'px';

        // 随机动画时长（1-2秒）
        const duration = 1 + Math.random();
        meteor.style.animationDuration = duration + 's';

        document.body.appendChild(meteor);

        // 动画结束后移除元素
        setTimeout(() => {
            meteor.remove();
        }, duration * 1000);
    }, 3000); // 每3秒创建一颗流星
}

// 开始答题
window.startQuiz = function () {
    document.querySelector('.start-page').classList.remove('active');
    document.querySelector('.question-page').classList.add('active');

    startTime = new Date();
    loadQuestion(0);
    startTimer();
}

// 启动计时器
function startTimer() {
    let elapsedSeconds = 0;
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        document.querySelector('.timer').textContent = '⏱ ' + formatTime(elapsedSeconds);
    }, 1000);
}

// 加载问题
function loadQuestion(index) {
    currentQuestionIndex = index;
    questionStartTime = new Date();

    const question = questions[index];
    const totalQuestions = questions.length;

    // 更新进度
    document.querySelector('.question-number').textContent = `${index + 1}/${totalQuestions}`;
    const progressPercent = ((index + 1) / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progressPercent + '%';

    // 更新题目类型徽章
    const badge = document.getElementById('questionTypeBadge');
    badge.textContent = question.type === 'choice' ? '选择题' : '主观题';

    // 更新题目文本
    document.getElementById('questionText').textContent = question.text;

    // 显示对应的答题区域
    const optionsContainer = document.getElementById('optionsContainer');
    const textAnswerContainer = document.getElementById('textAnswerContainer');
    const nextBtn = document.getElementById('nextBtn');

    if (question.type === 'choice') {
        // 选择题
        optionsContainer.style.display = 'flex';
        textAnswerContainer.style.display = 'none';

        // 渲染选项
        optionsContainer.innerHTML = '';
        question.options.forEach((option, i) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            optionDiv.onclick = () => selectOption(i);

            optionDiv.innerHTML = `
                <div class="option-content">
                    <div class="option-radio"></div>
                    <div class="option-text">${option}</div>
                </div>
            `;

            // 恢复之前的选择
            if (answers[index] && answers[index].answer === i) {
                optionDiv.classList.add('selected');
                nextBtn.disabled = false;
            }

            optionsContainer.appendChild(optionDiv);
        });
    } else {
        // 主观题
        optionsContainer.style.display = 'none';
        textAnswerContainer.style.display = 'block';

        const textAnswer = document.getElementById('textAnswer');
        textAnswer.value = answers[index] ? answers[index].answer : '';

        // 更新字数统计
        updateCharCount();

        // 根据是否有内容决定按钮状态
        nextBtn.disabled = textAnswer.value.trim().length === 0;

        // 绑定输入事件
        textAnswer.oninput = () => {
            updateCharCount();
            nextBtn.disabled = textAnswer.value.trim().length === 0;
        };
    }

    // 更新上一题按钮状态
    document.getElementById('prevBtn').disabled = index === 0;
}

// 选择选项
window.selectOption = function (optionIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => {
        if (i === optionIndex) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
    });

    document.getElementById('nextBtn').disabled = false;
}

// 更新字数统计
function updateCharCount() {
    const textAnswer = document.getElementById('textAnswer');
    const charCount = document.getElementById('charCount');
    charCount.textContent = textAnswer.value.length;
}

// 上一题
window.prevQuestion = function () {
    if (currentQuestionIndex > 0) {
        saveCurrentAnswer();
        loadQuestion(currentQuestionIndex - 1);
    }
}

// 下一题
window.nextQuestion = function () {
    const question = questions[currentQuestionIndex];

    // 验证是否已作答
    if (question.type === 'choice') {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            return; // 未选择，不允许进入下一题
        }
    } else {
        const textAnswer = document.getElementById('textAnswer').value.trim();
        if (!textAnswer) {
            return; // 未填写，不允许进入下一题
        }
    }

    saveCurrentAnswer();

    if (currentQuestionIndex < questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        // 完成答题
        finishQuiz();
    }
}

// 保存当前答案
function saveCurrentAnswer() {
    const question = questions[currentQuestionIndex];
    const answerTime = Math.floor((new Date() - questionStartTime) / 1000);

    if (question.type === 'choice') {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            const optionIndex = Array.from(document.querySelectorAll('.option')).indexOf(selectedOption);
            answers[currentQuestionIndex] = {
                questionId: question.id,
                questionText: question.text,
                questionType: 'choice',
                answer: optionIndex,
                answerText: question.options[optionIndex],
                answerTime: answerTime,
                timestamp: new Date().toISOString()
            };
        }
    } else {
        const textAnswer = document.getElementById('textAnswer').value.trim();
        if (textAnswer) {
            answers[currentQuestionIndex] = {
                questionId: question.id,
                questionText: question.text,
                questionType: 'text',
                answer: textAnswer,
                answerTime: answerTime,
                timestamp: new Date().toISOString()
            };
        }
    }
}

// 完成答题
async function finishQuiz() {
    clearInterval(timerInterval);

    const endTime = new Date();
    const totalTimeSeconds = Math.floor((endTime - startTime) / 1000);

    // 准备数据
    const quizData = {
        answers: answers,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        totalTimeSeconds: totalTimeSeconds,
        completeTime: endTime.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }),
        submittedAt: Date.now()
    };

    // 保存到 localStorage（作为备份）
    localStorage.setItem('quizData', JSON.stringify(quizData));

    // 上传到 Firebase
    try {
        const quizzesRef = ref(database, 'quizzes');
        const newQuizRef = push(quizzesRef);
        currentQuizId = newQuizRef.key;
        await set(newQuizRef, quizData);
        console.log('数据已成功上传到 Firebase，ID:', currentQuizId);
    } catch (error) {
        console.error('上传到 Firebase 失败:', error);
        alert('数据上传失败，但已保存到本地');
    }

    // 显示完成页面
    document.querySelector('.question-page').classList.remove('active');
    document.querySelector('.complete-page').classList.add('active');

    // 显示统计信息
    document.getElementById('totalTime').textContent = formatTime(totalTimeSeconds);
    document.getElementById('completeTime').textContent = quizData.completeTime;
}

// AI分析功能
window.startAIAnalysis = async function () {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span>分析中...</span>';

    // 切换到分析页面
    document.querySelector('.complete-page').classList.remove('active');
    document.querySelector('.analysis-page').classList.add('active');

    try {
        // 调用AI分析
        const analysis = await analyzeWithAI(answers);
        analysisResult = analysis;

        // 显示结果
        displayAnalysisResult(analysis);

        // 自动保存到Firebase
        await saveAnalysisToFirebase(analysis);
    } catch (error) {
        console.error('AI分析失败:', error);
        document.getElementById('analysisLoading').innerHTML = `
            <div style="color: #f44336; padding: 40px; text-align: center;">
                <h3 style="margin-bottom: 15px;">😢 分析失败</h3>
                <p style="margin-bottom: 20px; color: #666;">${error.message}</p>
                <button onclick="retryAnalysis()" style="padding: 12px 30px; border-radius: 50px; border: none; background: linear-gradient(135deg, #a8c0ff 0%, #3f2b96 100%); color: white; cursor: pointer; font-size: 16px; font-weight: 600;">
                    重新分析
                </button>
                <button onclick="location.reload()" style="margin-left: 10px; padding: 12px 30px; border-radius: 50px; border: 2px solid #ddd; background: white; color: #666; cursor: pointer; font-size: 16px; font-weight: 600;">
                    返回首页
                </button>
            </div>
        `;
    }
}

// 重试分析
window.retryAnalysis = function () {
    document.getElementById('analysisLoading').innerHTML = `
        <div class="loading-spinner"></div>
        <p>AI正在重新分析你的答案...</p>
        <p class="loading-tip">请稍候</p>
    `;
    setTimeout(() => window.startAIAnalysis(), 500);
}

// 保存分析结果到Firebase
async function saveAnalysisToFirebase(analysis) {
    if (!currentQuizId) {
        console.warn('没有quiz ID，无法保存');
        return;
    }

    try {
        const quizRef = ref(database, `quizzes/${currentQuizId}`);
        const currentData = JSON.parse(localStorage.getItem('quizData'));
        await set(quizRef, {
            ...currentData,
            analysis: analysis,
            analyzedAt: new Date().toISOString()
        });
        console.log('分析结果已自动保存到Firebase');
    } catch (error) {
        console.error('自动保存失败:', error);
    }
}

// 调用AI API进行分析
async function analyzeWithAI(answers) {
    // 构建提示词
    const prompt = buildAnalysisPrompt(answers);

    try {
        const response = await fetch(AI_CONFIG.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: '你是一位专业的情感关系分析师。你必须严格按照JSON格式返回分析结果，不要添加任何额外的文字说明。每个描述要简洁精炼，控制在50-80字以内。'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.5,
                max_tokens: 6000
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误响应:', errorText);
            throw new Error(`API请求失败: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('AI原始响应:', data);

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
            throw new Error('API响应格式异常');
        }

        const analysisText = data.choices[0].message.content;
        console.log('AI返回的文本:', analysisText);

        // 解析AI返回的JSON
        return parseAIResponse(analysisText);
    } catch (error) {
        console.error('AI分析过程出错:', error);
        throw error;
    }
}

// 构建分析提示词
function buildAnalysisPrompt(answers) {
    let answersText = '以下是小宗对这份情感问卷的完整回答：\n\n';

    answers.forEach((answer, index) => {
        answersText += `第${answer.questionId}题：${answer.questionText}\n`;
        if (answer.questionType === 'choice') {
            answersText += `回答：${answer.answerText}\n`;
        } else {
            answersText += `回答：${answer.answer}\n`;
        }
        answersText += `用时：${answer.answerTime}秒\n\n`;
    });

    return `${answersText}

小宗是我的女朋友，请根据小宗的回答，进行全面深入的情感关系分析。

**重要：你必须只返回一个有效的JSON对象，不要添加任何说明文字、标题或markdown格式。**

**分析维度**（必须包含以下8个维度）：
1. 支持与倡导程度（0-100分）：评估小宗在关系中对伴侣的支持态度、在朋友面前的表现等
2. 透明度与诚实程度（0-100分）：评估小宗对坦诚沟通的态度、处理问题的方式等
3. 情感可靠程度（0-100分）：评估小宗在困难时刻的陪伴、情感支持的稳定性等
4. 情感忠诚度（0-100分）：评估小宗对精神出轨、暧昧关系的态度和界限感
5. 身体忠诚度（0-100分）：评估小宗对身体背叛的态度和原则
6. 信任与安全感（0-100分）：评估小宗提供安全感的能力、对信任的理解等
7. 成长与包容度（0-100分）：评估小宗对关系中磨合、妥协的态度，接纳能力等
8. 未来规划意识（0-100分）：评估小宗对长期关系的看法、对未来的规划等

**严格按照以下JSON格式输出**：

{
  "overallScore": 85,
  "scoreDescription": "一句话评价，不超过30字",
  "dimensions": [
    {"name": "支持与倡导程度", "score": 88, "description": "50-80字的分析"},
    {"name": "透明度与诚实程度", "score": 82, "description": "50-80字的分析"},
    {"name": "情感可靠程度", "score": 90, "description": "50-80字的分析"},
    {"name": "情感忠诚度", "score": 85, "description": "50-80字的分析"},
    {"name": "身体忠诚度", "score": 95, "description": "50-80字的分析"},
    {"name": "信任与安全感", "score": 80, "description": "50-80字的分析"},
    {"name": "成长与包容度", "score": 78, "description": "50-80字的分析"},
    {"name": "未来规划意识", "score": 83, "description": "50-80字的分析"}
  ],
  "strengths": [
    "小宗的优点1，不超过50字",
    "小宗的优点2，不超过50字",
    "小宗的优点3，不超过50字"
  ],
  "suggestions": [
    "给小宗的建议1，不超过100字",
    "给小宗的建议2，不超过100字",
    "给小宗的建议3，不超过100字"
  ],
  "encouragement": "给小宗的温暖鼓励，100-150字，要真诚温柔",
  "summary": "对小宗的综合评价，150-200字，客观温和"
}

**严格要求**：
1. 只输出JSON，不要markdown代码块
2. dimensions必须包含8个元素，顺序和名称必须完全一致
3. 所有score是0-100的整数
4. description控制在50-80字，客观分析小宗的表现
5. strengths和suggestions各3条，每条不超过50字
6. encouragement控制在100-150字，要温暖、真诚，称呼小宗
7. summary控制在150-200字，全面客观地评价小宗
8. 确保JSON完整且可解析，语气温和友善

现在请开始分析并输出JSON：`;
}

// 解析AI响应
function parseAIResponse(text) {
    try {
        // 清理文本，移除markdown代码块标记
        let cleanText = text.trim();

        // 移除可能的markdown代码块
        cleanText = cleanText.replace(/```json\s*/g, '');
        cleanText = cleanText.replace(/```\s*/g, '');

        // 查找JSON对象
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('无法找到JSON对象，原文本:', text);
            throw new Error('AI响应中没有找到JSON格式的数据');
        }

        let jsonStr = jsonMatch[0];
        console.log('提取的JSON字符串长度:', jsonStr.length);

        // 检查JSON是否被截断
        if (!jsonStr.endsWith('}')) {
            console.warn('JSON可能被截断，尝试修复...');
            // 尝试补全JSON
            jsonStr = tryFixTruncatedJSON(jsonStr);
        }

        // 尝试修复常见的JSON错误
        let fixedJson = jsonStr
            // 移除注释
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*/g, '')
            // 修复尾随逗号
            .replace(/,(\s*[}\]])/g, '$1')
            // 确保属性名有引号
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2":');

        const parsed = JSON.parse(fixedJson);

        // 验证必需字段
        if (!parsed.overallScore || !parsed.dimensions || !Array.isArray(parsed.dimensions)) {
            throw new Error('AI响应缺少必需字段');
        }

        // 确保dimensions有8个元素
        if (parsed.dimensions.length < 8) {
            console.warn('维度数量不足8个，当前:', parsed.dimensions.length);
            // 补全缺少的维度
            const dimensionNames = [
                "支持与倡导程度", "透明度与诚实程度", "情感可靠程度",
                "情感忠诚度", "身体忠诚度", "信任与安全感",
                "成长与包容度", "未来规划意识"
            ];
            while (parsed.dimensions.length < 8) {
                parsed.dimensions.push({
                    name: dimensionNames[parsed.dimensions.length] || "未知维度",
                    score: 60,
                    description: "分析数据不完整"
                });
            }
        }

        return parsed;
    } catch (error) {
        console.error('解析错误详情:', error);
        console.error('原始文本长度:', text.length);
        console.error('原始文本预览:', text.substring(0, 500) + '...');
        throw new Error(`AI响应解析失败: ${error.message}`);
    }
}

// 尝试修复被截断的JSON
function tryFixTruncatedJSON(jsonStr) {
    console.log('尝试修复被截断的JSON...');

    // 找到最后一个完整的对象
    let depth = 0;
    let lastCompletePos = -1;

    for (let i = 0; i < jsonStr.length; i++) {
        if (jsonStr[i] === '{' || jsonStr[i] === '[') {
            depth++;
        } else if (jsonStr[i] === '}' || jsonStr[i] === ']') {
            depth--;
            if (depth === 1) { // dimensions数组层级
                lastCompletePos = i;
            }
        }
    }

    if (lastCompletePos > 0) {
        // 截取到最后一个完整的维度
        let fixed = jsonStr.substring(0, lastCompletePos + 1);

        // 补全结构
        if (!fixed.includes('"strengths"')) {
            fixed += ',\n  "strengths": ["分析过程被截断，请重试"],';
            fixed += '\n  "suggestions": ["分析过程被截断，请重试"],';
            fixed += '\n  "encouragement": "分析过程被截断，请重试",';
            fixed += '\n  "summary": "分析过程被截断，请重试"';
        }

        // 关闭数组和对象
        const openBrackets = (fixed.match(/\[/g) || []).length;
        const closeBrackets = (fixed.match(/\]/g) || []).length;
        const openBraces = (fixed.match(/\{/g) || []).length;
        const closeBraces = (fixed.match(/\}/g) || []).length;

        fixed += ']'.repeat(Math.max(0, openBrackets - closeBrackets));
        fixed += '}'.repeat(Math.max(0, openBraces - closeBraces));

        console.log('修复后的JSON长度:', fixed.length);
        return fixed;
    }

    return jsonStr;
}

// 显示分析结果
function displayAnalysisResult(analysis) {
    // 隐藏加载动画
    document.getElementById('analysisLoading').style.display = 'none';
    document.getElementById('analysisContent').style.display = 'block';

    // 显示综合得分
    const scoreCircle = document.getElementById('overallScore');
    const scoreDesc = document.getElementById('scoreDesc');
    scoreCircle.textContent = analysis.overallScore;
    scoreDesc.textContent = analysis.scoreDescription;

    // 创建雷达图
    createRadarChart(analysis.dimensions);

    // 显示各维度详情
    displayDimensions(analysis.dimensions);

    // 显示AI反馈
    displayFeedback(analysis);
}

// 创建雷达图
function createRadarChart(dimensions) {
    const ctx = document.getElementById('radarChart').getContext('2d');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: dimensions.map(d => d.name),
            datasets: [{
                label: '得分',
                data: dimensions.map(d => d.score),
                backgroundColor: 'rgba(168, 192, 255, 0.2)',
                borderColor: 'rgba(168, 192, 255, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(63, 43, 150, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(168, 192, 255, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// 显示各维度卡片
function displayDimensions(dimensions) {
    const grid = document.getElementById('dimensionsGrid');
    grid.innerHTML = '';

    dimensions.forEach(dim => {
        const card = document.createElement('div');
        card.className = 'dimension-card';
        card.innerHTML = `
            <div class="dimension-name">${dim.name}</div>
            <div class="dimension-bar">
                <div class="dimension-bar-fill" style="width: ${dim.score}%"></div>
            </div>
            <div class="dimension-score">${dim.score}分</div>
            <p style="font-size: 14px; color: #666; margin-top: 10px; line-height: 1.6;">${dim.description}</p>
        `;
        grid.appendChild(card);
    });
}

// 显示AI反馈
function displayFeedback(analysis) {
    const feedbackDiv = document.getElementById('aiFeedback');

    let html = '';

    // 优势
    if (analysis.strengths && analysis.strengths.length > 0) {
        html += '<div class="feedback-section">';
        html += '<h4>闪光点</h4>';
        analysis.strengths.forEach(strength => {
            html += `<p>• ${strength}</p>`;
        });
        html += '</div>';
    }

    // 建议
    if (analysis.suggestions && analysis.suggestions.length > 0) {
        html += '<div class="feedback-section">';
        html += '<h4>温馨建议</h4>';
        analysis.suggestions.forEach(suggestion => {
            html += `<p>• ${suggestion}</p>`;
        });
        html += '</div>';
    }

    // 总结
    if (analysis.summary) {
        html += '<div class="feedback-section">';
        html += '<h4>综合评价</h4>';
        html += `<p>${analysis.summary}</p>`;
        html += '</div>';
    }

    // 鼓励
    if (analysis.encouragement) {
        html += '<div class="feedback-section">';
        html += '<h4>真心话</h4>';
        html += `<p>${analysis.encouragement}</p>`;
        html += '</div>';
    }

    feedbackDiv.innerHTML = html;
}

// 保存分析结果（手动触发）
window.saveAnalysisResult = async function () {
    if (!analysisResult) {
        alert('没有分析结果可保存');
        return;
    }

    // 导出为JSON文件
    const jsonStr = JSON.stringify({
        answers: answers,
        analysis: analysisResult,
        exportTime: new Date().toISOString()
    }, null, 2);

    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `问卷分析结果_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('✅ 分析结果已下载到本地！\n同时已自动保存到云端。');
}

// 查看完整报告
window.viewFullReport = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

