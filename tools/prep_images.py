"""Crop + optimise Jubair's photos for the deck (PPTX and web share these).
Usage: python tools/prep_images.py <folder with the original JPGs>
The HSK image is cropped to the score tables only, so the certificate number,
admission-ticket numbers and ID photo are NOT published."""
import sys, os
from PIL import Image
src = sys.argv[1] if len(sys.argv) > 1 else "originals"
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "img")
os.makedirs(out, exist_ok=True)

def save(name, im, maxw=1500):
    if im.width > maxw: im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.convert("RGB").save(os.path.join(out, name + ".jpg"), quality=84, optimize=True, progressive=True)

def crop(f, ratio, fx=.5, fy=.5, name=None, maxw=1500):
    im = Image.open(os.path.join(src, f)); w, h = im.size
    cw, ch = (w, w/ratio) if w/h <= ratio else (h*ratio, h)
    x = min(max(fx*w - cw/2, 0), w - cw); y = min(max(fy*h - ch/2, 0), h - ch)
    save(name, im.crop((round(x), round(y), round(x+cw), round(y+ch))), maxw)

crop("My_Calligraphy_at_Jiangsu_Provincial_Level_Competition.jpg", 5.43/7.5, .5, .5, "cal_title")
crop("My_Calligraphy_at_Jiangsu_Provincial_Level_Competition.jpg", 3.53/4.6, .5, .55, "cal_brush")
crop("Calligraphy_Award_Certificate.jpg", .75, name="cert_award")
crop("Calligraphy_Award_Jiangsu_Provincial_Level.jpg", 4.6/2.59, name="ceremony")
crop("Hosted_Mid_Autumn_Festival__Huai_an_University.jpg", 1.5, name="host_hero")
crop("Mid_Autumn_Festival_Hosted.jpg", 1, .45, .5, "host_stage")
crop("Application_Form_for_Huai_an_University_Academic_Scholarship_and_Individual_Awards_for_International_Postgraduate_Students.jpg", 1, .45, .55, "host_fu")
crop("Mid_Autumn_Festival_Host.jpg", 1.5, name="host_bench")
crop("Helped_Teachers_on_the_day_of_2026_new_students_admission_day.jpg", 1.5, name="admission")
crop("Helped_Other_Chinese_Students_to_learn_Speaking_English_and_volunteered.jpg", 4/3, name="english")
crop("Helping_international_students_to_understand_the_culture_of_china.jpg", 2.28/4.05, name="culture")
save("hsk_scores", Image.open(os.path.join(src, "HSK_3_Certificate.jpg")).crop((125, 865, 1115, 1415)))
print("done ->", os.path.abspath(out))
