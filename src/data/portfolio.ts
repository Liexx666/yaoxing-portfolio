import { localized, shared, type LocalizedText } from '../i18n/types'

export type Project = {
  id: string
  name: LocalizedText
  detailName: LocalizedText
  category: LocalizedText
  summary: LocalizedText
  technologies: LocalizedText[]
  contributions: LocalizedText[]
  href: string
  linkLabel: LocalizedText
  sourceHref: string
  caseStudy?: {
    title: LocalizedText
    role: LocalizedText
    challenge: LocalizedText
    approach: LocalizedText
    takeaway: LocalizedText
  }
  screenshot: {
    src: string
    width: number
    height: number
    alt: LocalizedText
    caption: LocalizedText
  }
}

export const profile = {
  displayName: 'YaoXing',
  monogramLines: ['Yao', 'Xing'],
  fullName: localized('YaoXing', '李耀星'),
  role: localized('Software Engineering Student', '软件工程专业学生'),
  university: localized('Monash University', '蒙纳士大学'),
  degree: localized('Bachelor of Software Engineering (Honours)', '软件工程（荣誉）本科'),
  educationPeriod: localized('Feb 2025 — End of 2028 (expected)', '2025 年 2 月入学 — 预计 2028 年底毕业'),
  background: localized('I was born in Shanghai in 2006.', '我于 2006 年出生于上海。'),
  github: 'https://github.com/Liexx666',
  // Public contact and both resume translations explicitly selected by the owner.
  email: 'liexx999@163.com' as string | null,
  resumePdf: localized('/resume/yaoxing-resume-en.pdf', '/resume/yaoxing-resume.pdf'),
  introduction: localized(
    'I’m a software engineering student at Monash University, exploring the space between thoughtful ideas and dependable software.',
    '我是蒙纳士大学软件工程专业的学生，正在探索如何将有价值的想法，转化为可靠的软件。',
  ),
  about: localized(
    'I enjoy understanding how things work, then making them work better. From a team-built Agile platform to game interactions in Java, I’m learning to turn complex problems into clear, useful experiences.',
    '我喜欢弄清事物如何运作，再思考怎样让它变得更好。从与团队开发敏捷协作平台，到用 Java 实现游戏交互，我正在学习把复杂问题转化为清晰、实用的体验。',
  ),
  interests: [
    localized('Programming', '编程'),
    localized('Gaming & Valorant', '游戏与 Valorant'),
    localized('Guitar & jazz', '吉他与爵士乐'),
    localized('British & American TV', '英剧美剧'),
    localized('Technology', '技术探索'),
  ],
}

export const projects: Project[] = [
  {
    id: 'agileflow',
    name: shared('AgileFlow'),
    detailName: localized('AgileFlow', 'AgileFlow 敏捷项目管理平台'),
    category: localized('TEAM PROJECT · WEB APPLICATION', '团队项目 · Web 应用'),
    summary: localized(
      'An Agile project management platform built with Python and Django. My main role was QA: acceptance testing, defect reporting, and regression checks.',
      '一个使用 Python 和 Django 构建的敏捷项目管理平台。我主要负责 QA 测试，包括验收测试、缺陷反馈和回归检查。',
    ),
    technologies: [shared('Python'), shared('Django'), shared('Scrum'), localized('Testing', '软件测试')],
    contributions: [
      localized('Designed and executed acceptance tests for page interactions, API responses, and access permissions as team QA.', '担任团队 QA，针对页面交互、接口响应和访问权限设计并执行验收测试。'),
      localized('Recorded defect reproduction steps and expected results, then rechecked fixes during regression testing.', '记录缺陷的复现步骤和预期结果，并在修复后进行回归检查。'),
      localized('Used a test-case checklist to align test readiness and progress with developers.', '通过测试用例清单与开发者对齐待测内容和测试进度。'),
      localized('Investigated work-time attribution across midnight and precision of short time records.', '排查跨午夜工时归属问题，以及短时工时记录的精度问题。'),
    ],
    caseStudy: {
      title: localized('Keeping development and QA in sync.', '让开发与测试进度对齐。'),
      role: localized('My main responsibility was QA: translating acceptance criteria into test cases and checking the behaviour of the application.', '我主要负责 QA，将验收条件转化为测试用例，并验证应用的实际表现。'),
      challenge: localized('Keeping testing aligned with development progress was a challenge. I needed a clearer view of which features were ready to test and which issues still needed follow-up.', '开发与测试进度有时难以对齐，需要更清楚地确认哪些功能可以开始测试，哪些问题仍待跟进。'),
      approach: localized('I used a test-case checklist to organise items to test and points to confirm, then reviewed them with developers to align our progress.', '我用测试用例清单整理待测内容和待确认事项，再与开发者逐项核对，让双方对进度有共同的理解。'),
      takeaway: localized('The checklist gave our discussions a concrete reference. I learned that QA also means making test readiness and outstanding work clear to the team.', '清单为沟通提供了具体依据。这让我认识到，QA 不只是发现问题，也需要让团队清楚测试条件和未完成事项。'),
    },
    sourceHref: 'https://github.com/Liexx666/agileflow-deploy',
    screenshot: {
      src: '/images/projects/agileflow-board.png',
      width: 1440,
      height: 1000,
      alt: localized(
        'AgileFlow running locally in City / Cyber Night dark mode: Sprint 3 Kanban board with six demo tasks.',
        '本地运行的 AgileFlow Sprint 看板，使用 City / Cyber Night 赛博城市壁纸与深色模式，包含六项示例任务。',
      ),
      caption: localized('Cyber Night · dark mode · local demo', '赛博城市壁纸 · 深色模式 · 本地示例'),
    },
    href: 'https://agileflow-deploy.onrender.com/login/',
    linkLabel: localized('Visit application', '访问应用'),
  },
  {
    id: 'roguelike',
    name: localized('A world of interactions.', '用交互，构建一个世界。'),
    detailName: localized('Roguelike game', 'Roguelike 游戏'),
    category: localized('TEAM PROJECT · JAVA GAME', '团队项目 · Java 游戏'),
    summary: localized(
      'A Roguelike game built in a team of four. Bringing player actions, world objects, and game state together.',
      '与四人团队共同开发的 Roguelike 游戏，将玩家操作、地图对象和游戏状态连接起来。',
    ),
    technologies: [shared('Java'), localized('OOP', '面向对象'), shared('Git'), localized('Integration testing', '集成测试')],
    contributions: [
      localized('Implemented interactions between the player, map objects, and enemies.', '实现玩家与地图道具、敌人之间的交互逻辑。'),
      localized('Handled trigger conditions and state changes, synchronising results with the game interface.', '处理触发条件与状态变化，并将结果同步到游戏界面。'),
      localized('Verified interface values against internal data and collaborated on code integration and testing.', '核对界面数值与内部数据，并与队友协作完成代码合并和测试。'),
    ],
    sourceHref: 'https://github.com/Liexx666/fit2099-Roguelike-game',
    screenshot: {
      src: '/images/projects/roguelike-terminal.png',
      width: 979,
      height: 1033,
      alt: localized(
        'The running Java ASCII game: a facility map, player characters and a menu of movement, equipment and inventory actions.',
        '正在运行的 Java ASCII 游戏：设施地图、玩家角色，以及移动、装备和物品操作菜单。',
      ),
      caption: localized('Actual Java console capture · local run', 'Java ASCII 游戏真实终端截图 · 本地运行'),
    },
    href: 'https://github.com/Liexx666/fit2099-Roguelike-game',
    linkLabel: localized('View on GitHub', '在 GitHub 查看'),
  },
]

export const skillGroups = [
  { title: localized('Languages', '编程语言'), icon: 'code', items: [shared('Python'), shared('C++'), shared('Java')] },
  { title: localized('Building', '开发基础'), icon: 'layers', items: [shared('Django'), localized('Data structures', '数据结构'), localized('Algorithms', '算法'), localized('Object-oriented design', '面向对象设计')] },
  { title: localized('Quality', '质量保障'), icon: 'test', items: [shared('pytest'), localized('Test automation', '自动化测试'), localized('Software testing', '软件测试'), localized('TDD practice', '测试驱动开发实践')] },
  { title: localized('Workflow', '协作与工具'), icon: 'terminal', items: [shared('Git & GitHub'), shared('GitLab'), shared('Jira'), shared('Scrum'), localized('Linux & Shell', 'Linux 与 Shell')] },
] as const

export const hobbies = {
  valorant: {
    account: 'Kn1ghT9#KniT9',
    chinaAccount: 'Kn1ghT9#4533',
    image: '/images/valorant-rank.png',
    description: localized(
      'I love the focus and teamwork in Valorant. In 2026, I won the Monash Cup championship and was named the tournament MVP.',
      '我喜欢 Valorant 中的专注与团队协作。2026 年，我拿下了 Monash Cup 冠军，并获得赛事 MVP。',
    ),
    training: localized(
      'Previously participated in youth training at JDG (Jingdong Gaming).',
      '曾在 JDG（Jingdong Gaming）参加青训。',
    ),
  },
  guitar: {
    image: '/images/guitar-photo.jpg',
    photoSource: 'https://unsplash.com/photos/a-close-up-of-an-acoustic-guitar-on-a-black-background-kXK4dYneOpo',
    photoCredit: 'Chris Hardy / Unsplash',
    description: localized(
      'Away from the keyboard, I enjoy playing guitar. Jazz is my favourite kind of music — I love its rhythm and room for expression.',
      '离开键盘，我喜欢弹吉他。最喜欢的音乐是爵士乐（Jazz），喜欢它的节奏，也喜欢音乐中自由表达的空间。',
    ),
  },
  shows: [
    localized('Slow Horses', '流人'),
    localized('Bodyguard', '贴身保镖'),
    localized('The Capture', '真相捕捉'),
    localized('Sherlock (BBC)', '福尔摩斯（BBC 版）'),
  ],
}
