"""Build the approved English resume. Optional tooling; not part of the web build.
Run with Python + reportlab. The source DOCX is never edited by this script.
"""
from pathlib import Path
import os
import reportlab
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph, Spacer
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/resume/yaoxing-resume-en.pdf'
FONT_DIR = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts'
FALLBACK = Path(reportlab.__file__).parent / 'fonts'
regular = FONT_DIR / 'arial.ttf'
bold = FONT_DIR / 'arialbd.ttf'
pdfmetrics.registerFont(TTFont('Resume', str(regular if regular.exists() else FALLBACK / 'Vera.ttf')))
pdfmetrics.registerFont(TTFont('ResumeBold', str(bold if bold.exists() else FALLBACK / 'VeraBd.ttf')))
pdfmetrics.registerFontFamily('Resume', normal='Resume', bold='ResumeBold', italic='Resume', boldItalic='ResumeBold')
INK = colors.HexColor('#243449')
MUTED = colors.HexColor('#46566b')
ACCENT = colors.HexColor('#345477')
WIDTH, HEIGHT = A4
MARGIN = 36
LEFT_WIDTH = 155
GAP = 25
RIGHT_WIDTH = WIDTH - MARGIN * 2 - LEFT_WIDTH - GAP
BODY_TOP = HEIGHT - 142
BOTTOM = 34

styles = {
    'section': ParagraphStyle('section', fontName='ResumeBold', fontSize=13.2, leading=17, textColor=ACCENT, spaceAfter=12),
    'heading': ParagraphStyle('heading', fontName='ResumeBold', fontSize=10.6, leading=14, textColor=INK, spaceAfter=5),
    'sub': ParagraphStyle('sub', fontName='ResumeBold', fontSize=9.7, leading=13.2, textColor=INK, spaceAfter=4),
    'body': ParagraphStyle('body', fontName='Resume', fontSize=10, leading=14, textColor=INK, spaceAfter=8, alignment=TA_LEFT),
    'meta': ParagraphStyle('meta', fontName='Resume', fontSize=8.9, leading=12.2, textColor=MUTED, spaceAfter=6),
    'url': ParagraphStyle('url', fontName='Resume', fontSize=8.1, leading=11, textColor=ACCENT, spaceAfter=9, splitLongWords=True),
}

def para(text, kind='body'):
    return Paragraph(text, styles[kind])

def gap(height):
    return Spacer(1, height)

# Faithful translation of every substantive source item. Education dates use
# the owner's correction. No new project achievements or qualifications added.
left = [
    para('EDUCATION', 'section'),
    para('Monash University', 'heading'),
    para('Bachelor of Software Engineering (Honours)'),
    para('Feb 2025 - End of 2028<br/>(expected)'),
    para('Entering third year in<br/>Semester 1, 2027'),
    para('<b>WAM 75.4 / GPA 3.0</b><br/>IELTS 6.5'),
    gap(13),
    para('TECHNICAL TOOLS', 'section'),
    para('Programming &amp; Systems', 'sub'),
    para('Java, Python, C++<br/>Linux, Shell scripting'),
    para('Collaboration &amp; Delivery', 'sub'),
    para('Git, GitHub, GitLab<br/>Jira, Scrum iterations<br/>Google Docs, Word, Excel'),
    gap(13),
    para('CERTIFICATES &amp; STUDY', 'section'),
    para('TestMu AI<br/>Professional Certificate', 'sub'),
    para('Software Testing<br/>Test Automation'),
    para('Further Study', 'sub'),
    para('ISTQB 4.0+ Foundation Level exam preparation'),
    para('Test-Driven Development (TDD)'),
    para('Agile software development and code quality'),
]
right = [
    para('PROJECT EXPERIENCE', 'section'),
    para('Roguelike Game', 'heading'),
    para('Java / GitHub - Team of four', 'meta'),
    para('<link href="https://github.com/Liexx666/fit2099-Roguelike-game">github.com/Liexx666/fit2099-Roguelike-game</link>', 'url'),
    para('Implemented interactions between the player, map objects and enemies; handled trigger conditions and state changes, and synchronised results with the game interface.'),
    para('Checked interface values against internal data before and after interactions, merged code with teammates, and completed functional testing, integration verification and the course demonstration.'),
    gap(9),
    para('AgileFlow - Agile Project Management', 'heading'),
    para('Python / Django / GitLab / Jira - Team QA', 'meta'),
    para('<link href="https://agileflow-deploy.onrender.com/login/">agileflow-deploy.onrender.com/login/</link>', 'url'),
    para('Boards &amp; Task Management', 'sub'),
    para('Implemented sign-in/out, task creation and assignment, and drag-and-drop cards. Contributed to Sprint boards and burndown charts so the team could update task status and track remaining iteration work.'),
    para('Quality Assurance &amp; Regression Testing', 'sub'),
    para('Served as team QA, designing and executing test cases against acceptance criteria. Verified page interactions, API responses and access permissions, and recorded defect reproduction steps and expected results.'),
    para('Reproduced work-time attribution errors across midnight and precision issues in short time records. Rechecked page and API results after fixes; all 40 Django automated checks passed, including 6 time-precision checks.'),
    gap(9),
    para('ALGORITHMS &amp; TEST AUTOMATION', 'section'),
    para('Data Structures &amp; Algorithms', 'sub'),
    para('Selected linked lists, stacks, queues, hash tables, binary search trees and heaps for lookup, insertion and priority scheduling. Implemented merge sort using divide and conquer, maintained AVL tree balance through rotations, and compared best/worst-case time complexity and space costs.'),
    para('Python Testing Practice', 'sub'),
    para('Used pytest for parametrised test cases, exception assertions and fixtures; isolated dependencies with monkeypatch and checked coverage with pytest-cov.'),
]

def height_of(items, width):
    return sum(item.wrap(width, HEIGHT)[1] + item.getSpaceAfter() for item in items)

# Fail rather than silently clip text or shrink it to an unreadable size.
for label, items, width in [('left', left, LEFT_WIDTH), ('right', right, RIGHT_WIDTH)]:
    needed = height_of(items, width)
    available = BODY_TOP - BOTTOM
    print(f'{label}: {needed:.1f}pt used / {available:.1f}pt available')
    if needed > available:
        raise ValueError(f'{label} column overflows by {needed - available:.1f}pt; revise layout before exporting')

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
pdf.setTitle('YaoXing Li - Software Engineering Resume')
pdf.setAuthor('YaoXing Li')
pdf.setSubject('English translation of the owner-provided Chinese resume, with corrected education dates')
pdf.setFillColor(INK)
pdf.setFont('ResumeBold', 29)
pdf.drawString(MARGIN, HEIGHT - 52, 'YAOXING LI')
pdf.setFont('Resume', 10)
pdf.drawString(MARGIN, HEIGHT - 73, 'SOFTWARE ENGINEERING STUDENT')
pdf.setFont('Resume', 9.6)
pdf.drawString(MARGIN, HEIGHT - 96, 'liexx999@163.com   /   +86 15301698659')
pdf.linkURL('mailto:liexx999@163.com', (MARGIN, HEIGHT - 99, MARGIN + 102, HEIGHT - 86), relative=0)
pdf.setFillColor(ACCENT)
pdf.drawString(MARGIN, HEIGHT - 112, 'github.com/Liexx666')
pdf.linkURL('https://github.com/Liexx666', (MARGIN, HEIGHT - 115, MARGIN + 105, HEIGHT - 102), relative=0)
pdf.setStrokeColor(ACCENT)
pdf.setLineWidth(.8)
pdf.line(MARGIN, HEIGHT - 124, WIDTH - MARGIN, HEIGHT - 124)

def draw_stack(items, x, top, width):
    y = top
    for item in items:
        _, height = item.wrap(width, HEIGHT)
        item.drawOn(pdf, x, y - height)
        y -= height + item.getSpaceAfter()

draw_stack(left, MARGIN, BODY_TOP, LEFT_WIDTH)
draw_stack(right, MARGIN + LEFT_WIDTH + GAP, BODY_TOP, RIGHT_WIDTH)
pdf.showPage()
pdf.save()
print('English resume exported:', OUTPUT)
