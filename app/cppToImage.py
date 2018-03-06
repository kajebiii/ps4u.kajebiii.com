from PIL import Image, ImageFont, ImageDraw
import re
from flask import url_for

def tf(x):
    res = ""
    for i in range(0, len(x)):
        if x[i]=='\t':
            res += " "
            while(len(res)%4!=0):
                res = res + " "
        else:
            res = res + x[i]
    return res

def mylength(x):
    ret = 0
    for i in range(0, len(x)):
        ret += 1
        if x[i]=='\t':
            while ret%4!=0:
                ret = ret + 1
    return ret

keyword = "alignas alignof and and_eq asm atomic_cancel atomic_commit atomic_noexcept auto bitand bitor bool break case catch char char16_t char32_t class compl concept const constexpr const_cast continue decltype default delete do double dynamic_cast else enum explicit export extern false float for friend goto if import inline int long module mutable namespace new noexcept not not_eq nullptr operator or or_eq private protected public register reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch synchronized template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor xor_eq".split(" ")

normal = 0
pre = 1
onelinecomment = 2
multilinecomment = 3
multip = 11
multip2 = 12
normalc = 4
doublequote = 5
doublequotex = 6
doubleignore = 9
singlequote = 7
singlequotex = 8
singleignore = 10


COLOR_WHITE = "white"
COLOR_BLACK = "black"
COLOR_BROWN = "brown"
COLOR_DARKDARKBLUE = "#004444"
COLOR_GRAY = "gray"
COLOR_GREEN = "green"
COLOR_BLUE = "blue"
COLOR_PURPLE = "purple"

def morning():
    global COLOR_WHITE, COLOR_BLACK, COLOR_BROWN, COLOR_DARKDARKBLUE, COLOR_GRAY, COLOR_GREEN, COLOR_BLUE, COLOR_PURPLE
    COLOR_WHITE = "white"
    COLOR_BLACK = "black"
    COLOR_BROWN = "brown"
    COLOR_DARKDARKBLUE = "#004444"
    COLOR_GRAY = "gray"
    COLOR_GREEN = "green"
    COLOR_BLUE = "blue"
    COLOR_PURPLE = "purple"

def evening():
    global COLOR_WHITE, COLOR_BLACK, COLOR_BROWN, COLOR_DARKDARKBLUE, COLOR_GRAY, COLOR_GREEN, COLOR_BLUE, COLOR_PURPLE
    COLOR_WHITE = "black"
    COLOR_BLACK = "white"
    COLOR_BROWN = "brown"
    COLOR_DARKDARKBLUE = "#c0ffee"
    COLOR_GRAY = "#cccccc"
    COLOR_GREEN = "#22ff22"
    COLOR_BLUE = "#00cccc"
    COLOR_PURPLE = "#aaaa00"

def color(State):
    if State == normal:
        return COLOR_BLACK
    if State == pre:
        return COLOR_BROWN
    if State == onelinecomment:
        return COLOR_GREEN
    if State == multilinecomment:
        return COLOR_GREEN
    if State == multip:
        return COLOR_GREEN
    if State == multip2:
        return COLOR_GREEN
    if State == normalc:
        return COLOR_GREEN
    if State == doublequote:
        return COLOR_GRAY
    if State == doublequotex:
        return COLOR_GRAY
    if State == doubleignore:
        return COLOR_GRAY
    if State == singlequote:
        return COLOR_GRAY
    if State == singleignore:
        return COLOR_GRAY
    if State == singlequotex:
        return COLOR_GRAY


def next(nowState, b, c, d):
    if nowState == pre:
        if c == '\n':
            return normal
        return pre
    if nowState == normal:
        if c == '#':
            return pre
        if c == '/' and d == '/':
            return onelinecomment
        if c == '/' and d == '*':
            return multip
        if c == '\"':
            return doublequote
        if c == '\'':
            return singlequote
        return normal
    if nowState == doublequote:
        if c == '\"' and b != '\\':
            return doublequotex
        if b == '\\' and c == '\\':
            return doubleignore
        return doublequote
    if nowState == doublequotex:
        return normal
    if nowState == doubleignore:
        if c == '\"':
            return doublequotex
        return doublequote
    if nowState == singlequote:
        if c == "\'" and b != '\\':
            return singlequotex
        if b == '\\' and c == '\\':
            return singleignore
        return singlequote
    if nowState == singlequotex:
        return normal
    if nowState == singleignore:
        if c == "\'":
            return singlequotex
        return singlequote
    if nowState == onelinecomment:
        if c == '\n':
            return normal
        return onelinecomment
    if nowState == multip:
        return multip2
    if nowState == multip2:
        return multilinecomment
    if nowState == multilinecomment:
        if b == '*' and c == '/':
            return normalc;
        return multilinecomment
    if nowState == normalc:
        return normal

    # will be error..

def inv(a, b):
    for i in range(0, len(b)):
        if b[i] == a:
            return True
    return False


def makeImage(code, size=25):
    xx = size
    heightv = xx + 2
    widthv = xx // 2 + 1
    source = code
    sourceline = source.split("\n");
    for i in range(0, len(sourceline)):
        sourceline[i] = tf(sourceline[i]);


    height = heightv * len(sourceline);
    ml = 0;
    for i in range(0, len(sourceline)):
        if ml < mylength(sourceline[i]):
            ml = mylength(sourceline[i]);
    width = widthv * (6 + ml + 2)

    COLOR_WHITE = "#FFFFFF"
    COLOR_BLACK = "#000000"

    image = Image.new('RGB', (width, height), COLOR_WHITE)
    draw = ImageDraw.Draw(image)

    automata = 0
#    print(url_for('static/font', filename='D2Coding.ttf'))
    font = ImageFont.truetype("app/static/font/D2Coding.ttf", xx)
    for i in range(0, len(sourceline)):
        draw.text((5 * widthv - len("" + str(i + 1)) * widthv, heightv * i), str(i+1), font=font, fill=COLOR_BLACK)
        ff = re.split('\s|\<|\>|\(|\)|\[|\]|\*|\+|\-|\/|\||\!|\&|\^|\;|\=|\"|\#|\%|\'|\,|\.|\`|\{|\}|\~', sourceline[i])
        xx = 6 * widthv;
        ind = 0;

        for j in range(0, len(ff)):
            for k in range(0, len(ff[j])):
                val = sourceline[i][ind+1] if ind+1 < len(sourceline[i]) else -1
                automata = next(automata, sourceline[i][ind-1], sourceline[i][ind], val)
                fill = color(automata)
                if color(automata) != COLOR_GREEN and color(automata) != COLOR_BROWN and color(automata) != COLOR_GRAY and inv(ff[j], keyword):
                    fill = COLOR_BLUE

                if color(automata) != COLOR_GREEN and color(automata) != COLOR_BROWN and color(automata) != COLOR_GRAY and bool(re.match(r'^\+?\d+$', ff[j])):
                    fill = COLOR_PURPLE
                draw.text((xx, heightv * i), sourceline[i][ind], font=font, fill=fill)
                xx += widthv
                ind = ind + 1
            if ind < len(sourceline[i]):
                val = sourceline[i][ind+1] if ind+1 < len(sourceline[i]) else -1
                automata = next(automata, sourceline[i][ind-1], sourceline[i][ind], val)
                fill = color(automata)
                if color(automata) != COLOR_GREEN and color(automata) != COLOR_BROWN and color(automata) != COLOR_GRAY:
                    fill = COLOR_DARKDARKBLUE
                draw.text((xx, heightv * i), sourceline[i][ind], font=font, fill=fill)
                xx += widthv
                ind = ind + 1

        xx += widthv
        if i+1 < len(sourceline):
            val1 = sourceline[i][len(sourceline[i])-1] if len(sourceline[i]) > 0 else -1
            val2 = sourceline[i+1][0] if 0 < len(sourceline[i+1]) else -1
            automata = next(automata, val1, '\n', val2)
        else:
            val1 = sourceline[i][len(sourceline[i])-1] if len(sourceline[i]) > 0 else -1
            automata = next(automata, val1, '\n', -1)

    return image

def noneImage(size=25):
    return makeImage("/* kajebiii did not solve this problem. */", size)


def makeImageWithFilePath(code, filePath):
    image = makeImage(code)
    image.save(filePath, optimize=True)

