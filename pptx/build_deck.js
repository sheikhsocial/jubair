// Build the Jubair scholarship-defense deck.  Run:  node pptx/build_deck.js
// Needs: pptxgenjs, react, react-dom, react-icons, sharp  (npm i)  and python3 (for fade transitions)
const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const path = require("path");
const { execFileSync } = require("child_process");

const IMG = (n) => path.join(__dirname, "..", "assets", "img", n + ".jpg");
const OUT = path.join(__dirname, "Jubair_Jiangsu_Scholarship_Defense_Premium.pptx");

// ---- palette: ink black, seal red, gold, rice white --------------------------------
const INK = "14110F", CARD = "221C18", RED = "C8322B", GOLD = "E0B25A", TEXT = "F7F1E8", MUTED = "B9AEA0";
const HEAD = "Cambria", BODY = "Calibri", CJK = "Microsoft YaHei";
const W = 13.333, H = 7.5, M = 0.6;

async function icon(Comp, color = "#FFFFFF") {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color, size: 256 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.title = "Jiangsu Provincial Scholarship Defense – Jubair Md Ariful Islam";
  pres.author = "Jubair Md Ariful Islam (王子)";
  pres.company = "Huai'an University";

  const ic = {
    trophy: await icon(fa.FaTrophy), teacher: await icon(fa.FaChalkboardTeacher),
    hands: await icon(fa.FaHandsHelping), mic: await icon(fa.FaMicrophoneAlt),
    check: await icon(fa.FaCheckCircle), route: await icon(fa.FaRoute), hand: await icon(fa.FaHandHoldingHeart),
    book: await icon(fa.FaBookOpen), chart: await icon(fa.FaChartLine), globe: await icon(fa.FaGlobeAsia),
    coins: await icon(fa.FaCoins), landmark: await icon(fa.FaLandmark), industry: await icon(fa.FaIndustry),
    comments: await icon(fa.FaComments), flag: await icon(fa.FaFlag),
  };

  // ---- shared frame ------------------------------------------------------------------
  let n = 0;
  const seal = (s, ch, x, y, size = 0.62) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: size, h: size, fill: { color: RED }, rectRadius: 0.06, objectName: "Seal" });
    s.addText(ch, { x, y, w: size, h: size, align: "center", valign: "middle", fontFace: CJK, fontSize: size * 38, bold: true, color: "FFFFFF", margin: 0, isTextBox: true });
  };
  function base(kicker, title, ch, notes) {
    n++;
    const s = pres.addSlide();
    s.background = { color: INK };
    seal(s, ch, M, 0.5);
    s.addText(kicker, { x: M + 0.8, y: 0.5, w: 9, h: 0.62, fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 3, valign: "middle", margin: 0, isTextBox: true });
    s.addText(title, { x: M, y: 1.2, w: W - 2 * M, h: 0.85, fontFace: HEAD, fontSize: 38, bold: true, color: TEXT, valign: "middle", margin: 0, isTextBox: true });
    s.addText("Jubair Md Ariful Islam · 王子", { x: M, y: 7.0, w: 6, h: 0.3, fontFace: BODY, fontSize: 10, color: MUTED, margin: 0, isTextBox: true });
    s.addText(String(n).padStart(2, "0") + " / 11", { x: W - M - 2, y: 7.0, w: 2, h: 0.3, fontFace: BODY, fontSize: 10, color: MUTED, align: "right", margin: 0, isTextBox: true });
    s.addNotes(notes);
    return s;
  }
  const card = (s, x, y, w, h, name = "Card") =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: CARD }, line: { color: "3A312A", width: 0.75 }, rectRadius: 0.12, objectName: name });
  const photo = (s, file, x, y, w, h, alt) => {
    s.addImage({ path: IMG(file), x, y, w, h, altText: alt, objectName: alt });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { type: "none" }, line: { color: GOLD, width: 1.5 }, objectName: "Frame " + alt });
  };
  const disc = (s, key, x, y, d = 0.62) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: RED }, objectName: "Icon disc" });
    s.addImage({ data: ic[key], x: x + d * 0.24, y: y + d * 0.24, w: d * 0.52, h: d * 0.52, altText: key + " icon" });
  };

  // ================= 1. TITLE =========================================================
  n++;
  let s = pres.addSlide();
  s.background = { color: INK };
  s.addImage({ path: IMG("cal_title"), x: W - 5.43, y: 0, w: 5.43, h: 7.5, altText: "Jubair holding his calligraphy 自强不息" });
  seal(s, "王", M, 0.55, 0.8);
  s.addText("JIANGSU SCHOLARSHIP  ·  CATEGORY A DEFENSE", { x: M + 1.05, y: 0.55, w: 6, h: 0.8, fontFace: BODY, fontSize: 12, bold: true, color: GOLD, charSpacing: 3, valign: "middle", margin: 0, isTextBox: true });
  s.addText("自强不息", { x: M, y: 1.75, w: 7.2, h: 1.6, fontFace: CJK, fontSize: 88, bold: true, color: GOLD, margin: 0, valign: "middle", isTextBox: true });
  s.addText("Strive Without Rest", { x: M, y: 3.35, w: 7.2, h: 0.9, fontFace: HEAD, fontSize: 46, bold: true, color: TEXT, margin: 0, valign: "middle", isTextBox: true });
  s.addText("Ink, voice and service: a Bangladeshi scholar's year at Huai'an University", { x: M, y: 4.3, w: 6.9, h: 0.8, fontFace: BODY, fontSize: 18, italic: true, color: MUTED, margin: 0, valign: "top", isTextBox: true });
  s.addText([
    { text: "Jubair Md Ariful Islam  ·  王子", options: { bold: true, fontSize: 22, color: TEXT, breakLine: true } },
    { text: "Master's candidate, International Business  ·  Class GMIB2501", options: { fontSize: 15, color: MUTED, breakLine: true } },
    { text: "School of International Education, Huai'an University", options: { fontSize: 15, color: MUTED } },
  ], { x: M, y: 5.4, w: 7, h: 1.4, fontFace: BODY, margin: 0, valign: "top", isTextBox: true });
  s.addNotes("Greet the committee. I am Jubair Md Ariful Islam, Chinese name 王子, master's candidate in International Business, class GMIB2501, from Bangladesh. The calligraphy in my hands reads 自强不息, 'strive without rest', the spirit of my year. I will cover three things: my academic achievements, my other accomplishments, and my activities.");

  // ================= 2. YEAR AT A GLANCE ==============================================
  s = base("MY YEAR AT A GLANCE", "Scholar. Artist. Host and helper.", "年",
    "In one slide: academically I moved from Category B to Category A and passed HSK 3 within a year. Beyond class I earned a provincial calligraphy award and completed original research. In activities I hosted, volunteered and received a Service Award. The next slides show the evidence.");
  const cols = [
    ["学", "A", "Academic achievements", ["Category B → Category A", "Highest marks in my major", "HSK 3 · 250 / 300"], "book"],
    ["艺", "1st", "Accomplishments", ["Provincial calligraphy award", "Research paper under peer review", "Still practising the brush"], "trophy"],
    ["行", "5+", "Activities & service", ["Hosted Chinese festivals", "Service Award for assisting SIE", "Class monitor · Student Council VP"], "hands"],
  ];
  const cw = 3.85, gap = 0.34;
  cols.forEach((c, i) => {
    const x = M + i * (cw + gap);
    card(s, x, 2.35, cw, 4.35);
    seal(s, c[0], x + 0.35, 2.7, 0.62);
    s.addText(c[2].toUpperCase(), { x: x + 1.1, y: 2.7, w: cw - 1.3, h: 0.62, fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 2, valign: "middle", margin: 0, isTextBox: true });
    s.addText(i === 0 ? "B → A" : i === 1 ? "Provincial" : "Service Award", { x: x + 0.35, y: 3.5, w: cw - 0.7, h: 0.9, fontFace: HEAD, fontSize: i === 0 ? 48 : 34, bold: true, color: TEXT, margin: 0, valign: "middle", isTextBox: true });
    s.addText(c[3].map((t, k) => ({ text: t, options: { bullet: true, breakLine: k < 2 } })), { x: x + 0.35, y: 4.65, w: cw - 0.7, h: 1.8, fontFace: BODY, fontSize: 16, color: TEXT, paraSpaceAfter: 8, margin: 0, valign: "top", isTextBox: true });
  });

  // ================= 3. B -> A ========================================================
  s = base("1 · ACADEMIC ACHIEVEMENTS", "From Category B to Category A", "学",
    "In my first year I was awarded the Category B scholarship. After the annual review, the University awarded me Category A. The reasons: the highest marks in my major in the department, helping teachers, volunteering in university programs, and hosting Chinese events.");
  card(s, M, 2.3, 3.7, 1.55);
  s.addText([{ text: "YEAR 1 · AWARDED", options: { fontSize: 11, bold: true, color: MUTED, charSpacing: 2, breakLine: true } }, { text: "Category B", options: { fontSize: 32, bold: true, color: TEXT, fontFace: HEAD } }],
    { x: M + 0.3, y: 2.3, w: 3.2, h: 1.55, valign: "middle", margin: 0, fontFace: BODY, isTextBox: true });
  s.addText("Annual Review  ·  年度考核", { x: 4.5, y: 2.45, w: 4.33, h: 0.4, align: "center", fontFace: BODY, fontSize: 13, bold: true, color: GOLD, margin: 0, isTextBox: true });
  s.addShape(pres.shapes.RIGHT_ARROW, { x: 4.6, y: 2.9, w: 4.13, h: 0.5, fill: { color: GOLD }, objectName: "Arrow" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: W - M - 3.7, y: 2.3, w: 3.7, h: 1.55, fill: { color: RED }, rectRadius: 0.12, objectName: "Category A card" });
  s.addText([{ text: "THE UNIVERSITY AWARDED", options: { fontSize: 11, bold: true, color: "FFE9D6", charSpacing: 2, breakLine: true } }, { text: "Category A", options: { fontSize: 32, bold: true, color: "FFFFFF", fontFace: HEAD } }],
    { x: W - M - 3.4, y: 2.3, w: 3.2, h: 1.55, valign: "middle", margin: 0, fontFace: BODY, isTextBox: true });
  s.addText("HOW I EARNED IT", { x: M, y: 4.2, w: 6, h: 0.35, fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 3, margin: 0, isTextBox: true });
  const how = [["check", "Top marks", "Highest marks in my major's department"], ["teacher", "Helped teachers", "Supported staff, including on 2026 admission day"], ["hands", "Volunteered", "Took part in university programs and events"], ["mic", "Hosted events", "Hosted Chinese events, incl. the Mid-Autumn Festival"]];
  how.forEach((h, i) => {
    const x = M + i * 3.11;
    card(s, x, 4.65, 2.8, 2.15);
    disc(s, h[0], x + 0.25, 4.88);
    s.addText(h[1], { x: x + 0.25, y: 5.6, w: 2.4, h: 0.4, fontFace: HEAD, fontSize: 20, bold: true, color: TEXT, margin: 0, isTextBox: true });
    s.addText(h[2], { x: x + 0.25, y: 6.0, w: 2.4, h: 0.7, fontFace: BODY, fontSize: 14, color: MUTED, margin: 0, valign: "top", isTextBox: true });
  });

  // ================= 4. HSK ===========================================================
  s = base("1 · ACADEMIC ACHIEVEMENTS", "HSK 3 within a year", "语",
    "I achieved HSK Level 3 within a year, scoring 250 out of 300 against a pass mark of 180. Listening 95 and Reading 94 are my strongest sections; Writing at 61 is where I am still improving. Speaking was taken at Elementary level with 70, pass mark 60. Chinese lets me host, volunteer and connect with classmates.");
  s.addText([{ text: "250", options: { fontSize: 96, bold: true, color: GOLD, fontFace: HEAD } }, { text: " / 300", options: { fontSize: 36, color: MUTED, fontFace: HEAD } }],
    { x: M, y: 2.2, w: 6.6, h: 1.4, valign: "middle", margin: 0, isTextBox: true });
  s.addText("HSK Level 3 total score · pass mark 180 · tested 16 May 2026", { x: M, y: 3.6, w: 6.8, h: 0.4, fontFace: BODY, fontSize: 15, color: TEXT, margin: 0, isTextBox: true });
  [["Listening 95 and Reading 94: top-tier results", "check"], ["Used every day: in class, on stage and in service", "mic"], ["Writing (61) is my next target: I keep practising", "route"]].forEach((r, i) => {
    disc(s, r[1], M, 4.35 + i * 0.85, 0.55);
    s.addText(r[0], { x: M + 0.8, y: 4.35 + i * 0.85, w: 5.8, h: 0.55, fontFace: BODY, fontSize: 16, color: TEXT, valign: "middle", margin: 0, isTextBox: true });
  });
  photo(s, "hsk_scores", 7.9, 2.2, 4.83, 2.68, "HSK 3 score report excerpt");
  s.addChart(pres.charts.BAR, [{ name: "Score (out of 100)", labels: ["Listening", "Reading", "Writing", "Speaking*"], values: [95, 94, 61, 70] }], {
    x: 7.9, y: 4.95, w: 4.83, h: 1.8, barDir: "bar", chartColors: [RED], barGapWidthPct: 45,
    showValue: true, dataLabelColor: TEXT, dataLabelFontSize: 12, dataLabelFontFace: "+mn-lt", dataLabelPosition: "outEnd",
    catAxisLabelColor: TEXT, catAxisLabelFontSize: 12, catAxisLabelFontFace: "+mn-lt", catAxisOrientation: "maxMin",
    valAxisHidden: true, valAxisMinVal: 0, valAxisMaxVal: 110, valGridLine: { style: "none" }, catGridLine: { style: "none" }, showLegend: false,
  });
  s.addText("*Speaking taken at Elementary level (pass mark 60)", { x: 7.9, y: 6.75, w: 4.83, h: 0.25, fontFace: BODY, fontSize: 10, color: MUTED, margin: 0, isTextBox: true });

  // ================= 5. RESEARCH ======================================================
  s = base("2 · RESEARCH & ACCOMPLISHMENTS", "Research beyond the classroom", "研",
    "Beyond coursework I contributed to a completed, original research paper on Chinese mining foreign direct investment in Zambia, 2000 to 2024. It is currently under peer review at International Studies of Economics. It is not yet published, so I describe the topic and status only.");
  card(s, M, 2.3, 6.6, 4.5);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: M + 0.4, y: 2.65, w: 3.2, h: 0.42, fill: { color: RED }, rectRadius: 0.2, objectName: "Status pill" });
  s.addText("UNDER PEER REVIEW", { x: M + 0.4, y: 2.65, w: 3.2, h: 0.42, align: "center", valign: "middle", fontFace: BODY, fontSize: 12, bold: true, color: "FFFFFF", charSpacing: 2, margin: 0, isTextBox: true });
  s.addText("Chinese Mining Foreign Direct Investment in Zambia, 2000–2024", { x: M + 0.4, y: 3.3, w: 5.9, h: 1.9, fontFace: HEAD, fontSize: 28, bold: true, color: TEXT, valign: "top", margin: 0, isTextBox: true });
  s.addText("中国在赞比亚采矿业的外国直接投资（2000—2024）", { x: M + 0.4, y: 5.2, w: 5.8, h: 0.5, fontFace: CJK, fontSize: 15, color: GOLD, margin: 0, isTextBox: true });
  s.addText("Submitted to International Studies of Economics · completed original research · not yet published", { x: M + 0.4, y: 5.8, w: 5.8, h: 0.8, fontFace: BODY, fontSize: 14, italic: true, color: MUTED, valign: "top", margin: 0, isTextBox: true });
  s.addText("WHAT THE PAPER EXAMINES", { x: 7.6, y: 2.3, w: 5.1, h: 0.35, fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 3, margin: 0, isTextBox: true });
  [["chart", "Commodity cycles", "How price swings shape investment"], ["globe", "Belt and Road effects", "The influence of the BRI"], ["landmark", "Institutional determinants", "Rules and governance that attract capital"], ["industry", "From state-owned to private", "The shift in who invests"]].forEach((r, i) => {
    const y = 2.85 + i * 1.0;
    disc(s, r[0], 7.6, y, 0.65);
    s.addText([{ text: r[1], options: { bold: true, fontSize: 18, color: TEXT, fontFace: HEAD, breakLine: true } }, { text: r[2], options: { fontSize: 14, color: MUTED } }],
      { x: 8.5, y, w: 4.2, h: 0.65, valign: "middle", margin: 0, fontFace: BODY, isTextBox: true });
  });

  // ================= 6. CALLIGRAPHY ===================================================
  s = base("2 · ACCOMPLISHMENTS · INK", "Provincial calligraphy award · 书法", "艺",
    "In Jiangsu Province's 2025 'Read Jiangsu' creative contest for international students, my calligraphy work 'Liu Zi Du Su' was honored as Excellent Calligraphy Work, issued by the Jiangsu Higher Education Association's committee on international student education. I keep practising, including the calligraphy class at SIE. The piece in my hands reads 自强不息.");
  photo(s, "cert_award", M, 2.3, 3.45, 4.6, "Honor certificate, Excellent Calligraphy Work");
  photo(s, "ceremony", 4.3, 2.3, 4.6, 2.59, "Award ceremony with honor certificates");
  s.addText([
    { text: "优秀书法作品 · Excellent Calligraphy Work", options: { bold: true, fontSize: 17, color: GOLD, fontFace: HEAD, breakLine: true } },
    { text: "Jiangsu 2025 “Read Jiangsu” contest for international students. My piece: 《留子读“苏”》. Issued by the Jiangsu Higher Education Association.", options: { fontSize: 14, color: TEXT } },
  ], { x: 4.3, y: 5.1, w: 4.6, h: 1.8, fontFace: BODY, margin: 0, valign: "top", paraSpaceAfter: 6, isTextBox: true });
  photo(s, "cal_brush", 9.2, 2.3, 3.53, 4.6, "Jubair with his brush calligraphy 自强不息");

  // ================= 7. HOSTING =======================================================
  s = base("3 · ACTIVITIES · VOICE", "A voice for Chinese celebrations", "主",
    "I hosted the Mid-Autumn Festival at Huai'an University on 29 September 2025, and other Chinese events as well. Standing on stage with a microphone helped me practise Chinese and build confidence. At the New Year celebration on 29 December I wrote my own 福, the character for fortune.");
  photo(s, "host_hero", M, 2.3, 6.2, 4.13, "Jubair co-hosting the Mid-Autumn Festival");
  s.addText("Co-hosting the Mid-Autumn Festival, 29 Sep 2025", { x: M, y: 6.5, w: 6.2, h: 0.35, fontFace: BODY, fontSize: 13, italic: true, color: MUTED, margin: 0, isTextBox: true });
  photo(s, "host_stage", 7.1, 2.3, 2.7, 2.7, "Hosting on stage");
  photo(s, "host_fu", 10.03, 2.3, 2.7, 2.7, "New Year celebration with the 福 character");
  s.addText([
    { text: "Mid-Autumn Festival host", options: { bullet: true, breakLine: true } },
    { text: "Hosted Chinese cultural events", options: { bullet: true, breakLine: true } },
    { text: "New Year celebration, 29 Dec 2025: my own 福", options: { bullet: true } },
  ], { x: 7.1, y: 5.3, w: 5.63, h: 1.5, fontFace: BODY, fontSize: 17, color: TEXT, paraSpaceAfter: 8, margin: 0, valign: "top", isTextBox: true });

  // ================= 8. SERVICE =======================================================
  s = base("3 · ACTIVITIES · SERVICE", "Service that earned an award", "服",
    "On the 2026 new-student admission day I assisted the School of International Education. I helped teachers, made the process easier and more comfortable for new students, and guided them through each step. For assisting SIE I received a Service Award.");
  photo(s, "admission", M, 2.3, 6.9, 4.6, "SIE volunteers at the 2026 admission-day help desk");
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 8.0, y: 2.3, w: 4.73, h: 1.35, fill: { color: RED }, rectRadius: 0.12, objectName: "Award card" });
  s.addImage({ data: ic.trophy, x: 8.3, y: 2.65, w: 0.65, h: 0.65, altText: "trophy" });
  s.addText([{ text: "SERVICE AWARD", options: { fontSize: 12, bold: true, color: "FFE9D6", charSpacing: 3, breakLine: true } }, { text: "For assisting the School of International Education", options: { fontSize: 16, bold: true, color: "FFFFFF" } }],
    { x: 9.15, y: 2.3, w: 3.4, h: 1.35, valign: "middle", margin: 0, fontFace: BODY, isTextBox: true });
  [["check", "Made check-in easier", "A smoother, more comfortable day for new students"], ["route", "Guided every step", "Walked them through the proper processes"], ["teacher", "Supported teachers", "Worked with staff and the SIE volunteer team"]].forEach((r, i) => {
    const y = 3.95 + i * 1.0;
    disc(s, r[0], 8.0, y, 0.65);
    s.addText([{ text: r[1], options: { bold: true, fontSize: 18, color: TEXT, fontFace: HEAD, breakLine: true } }, { text: r[2], options: { fontSize: 14, color: MUTED } }],
      { x: 8.9, y, w: 3.83, h: 0.65, valign: "middle", margin: 0, fontFace: BODY, isTextBox: true });
  });

  // ================= 9. BRIDGING ======================================================
  s = base("3 · ACTIVITIES · BRIDGE", "Bridging languages and cultures", "桥",
    "I volunteered with the English language club and helped Chinese students improve their spoken English in an easier way, and it worked. I also helped international students understand Chinese culture. Language and culture are how I give back to the community that hosts me.");
  photo(s, "english", M, 2.3, 5.4, 4.05, "Helping Chinese students with spoken English");
  photo(s, "culture", 6.3, 2.3, 2.28, 4.05, "Helping international students understand Chinese culture");
  s.addText("Volunteer English-speaking help · Helping international students explore China", { x: M, y: 6.45, w: 8, h: 0.35, fontFace: BODY, fontSize: 12, italic: true, color: MUTED, margin: 0, isTextBox: true });
  [["comments", "Spoken English, made easier", "Helped Chinese students improve their English speaking in a simpler way, and it worked."], ["globe", "Understanding China", "Helped international students understand the culture of China."]].forEach((r, i) => {
    const y = 2.3 + i * 2.2;
    disc(s, r[0], 8.95, y, 0.65);
    s.addText(r[1], { x: 9.8, y, w: 2.93, h: 0.65, fontFace: HEAD, fontSize: 18, bold: true, color: TEXT, valign: "middle", margin: 0, isTextBox: true });
    s.addText(r[2], { x: 8.95, y: y + 0.8, w: 3.78, h: 1.2, fontFace: BODY, fontSize: 15, color: MUTED, valign: "top", margin: 0, isTextBox: true });
  });

  // ================= 10. TIMELINE =====================================================
  s = base("3 · ACTIVITIES · THE YEAR", "One year, many stops", "年",
    "A quick tour of the year, from class monitor and the Mid-Autumn Festival to the HSK 3 result and the 2026 admission day: a Chinese chess class, a high-speed rail seminar, the English language club, the Zhou Enlai Memorial Hall tour, the provincial calligraphy award, the Huai'an Marathon and the calligraphy class. I was also elected Vice President of the Student Council Academic Department in November 2025.");
  const tl = [
    ["JUL 2025", "Class monitor, International Business", 0], ["29 SEP 2025", "Hosted the Mid-Autumn Festival", 0], ["3 NOV", "Chinese chess class", 0], ["8 NOV", "High-speed rail seminar", 0],
    ["13 NOV", "Volunteered, English language club", 0], ["NOV 2025", "Elected VP, Student Council Academic Dept.", 0], ["15 DEC", "Study tour, Zhou Enlai Memorial Hall", 0], ["29 DEC", "Jiangsu calligraphy award · New Year celebration", 1],
    ["12 APR 2026", "Volunteer, Huai'an Marathon", 0], ["9 MAY", "Calligraphy class at SIE", 0], ["16 MAY", "Passed HSK 3 · 250 / 300", 1], ["2026", "Admission-day helper · Service Award", 1],
  ];
  tl.forEach((t, i) => {
    const x = M + (i % 4) * 3.1, y = 2.25 + Math.floor(i / 4) * 1.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.85, h: 1.35, fill: { color: t[2] ? RED : CARD }, line: { color: t[2] ? RED : "3A312A", width: 0.75 }, rectRadius: 0.1, objectName: "Event card" });
    s.addText([{ text: t[0], options: { fontSize: 12, bold: true, color: t[2] ? "FFE9D6" : GOLD, charSpacing: 2, breakLine: true } }, { text: t[1], options: { fontSize: 15, color: "FFFFFF" } }],
      { x: x + 0.2, y, w: 2.45, h: 1.35, fontFace: BODY, valign: "middle", margin: 0, isTextBox: true });
  });

  // ================= 11. CLOSING ======================================================
  n++;
  s = pres.addSlide();
  s.background = { color: INK };
  seal(s, "谢", M, 0.5);
  s.addText("WHY CATEGORY A", { x: M + 0.8, y: 0.5, w: 8, h: 0.62, fontFace: BODY, fontSize: 13, bold: true, color: GOLD, charSpacing: 3, valign: "middle", margin: 0, isTextBox: true });
  s.addText("自强不息", { x: M, y: 1.15, w: W - 2 * M, h: 1.5, fontFace: CJK, fontSize: 80, bold: true, color: GOLD, margin: 0, valign: "middle", isTextBox: true });
  s.addText("I will keep striving.", { x: M, y: 2.65, w: 9, h: 0.7, fontFace: HEAD, fontSize: 34, bold: true, color: TEXT, margin: 0, valign: "middle", isTextBox: true });
  [["学", "A scholar", "Highest marks in my major's department · HSK 3, 250 / 300, within a year"], ["艺", "An artist", "Provincial award for Excellent Calligraphy Work · original research under review"], ["行", "A host and helper", "Hosted Chinese events · Service Award for assisting SIE · class monitor and volunteer"]].forEach((c, i) => {
    const x = M + i * 4.17;
    card(s, x, 3.75, 3.85, 2.45);
    seal(s, c[0], x + 0.3, 4.0, 0.6);
    s.addText(c[1], { x: x + 1.05, y: 4.0, w: 2.6, h: 0.6, fontFace: HEAD, fontSize: 21, bold: true, color: TEXT, valign: "middle", margin: 0, isTextBox: true });
    s.addText(c[2], { x: x + 0.3, y: 4.8, w: 3.3, h: 1.3, fontFace: BODY, fontSize: 14, color: MUTED, valign: "top", margin: 0, isTextBox: true });
  });
  s.addText("谢谢各位老师  ·  Thank you", { x: M, y: 6.45, w: 8, h: 0.5, fontFace: HEAD, fontSize: 24, bold: true, color: TEXT, margin: 0, valign: "middle", isTextBox: true });
  s.addText("11 / 11", { x: W - M - 2, y: 7.0, w: 2, h: 0.3, fontFace: BODY, fontSize: 10, color: MUTED, align: "right", margin: 0, isTextBox: true });
  s.addNotes("Close: I am a scholar, an artist, and a host and helper. I respectfully ask the committee to consider my Category A scholarship. I will keep striving without rest. Thank you, 谢谢. Then take questions.");

  await pres.writeFile({ fileName: OUT });
  // fade transition on every slide (PowerPoint: Transitions tab shows 'Fade')
  execFileSync("python3", [path.join(__dirname, "add_transitions.py"), OUT], { stdio: "inherit" });
  console.log("Wrote", OUT);
})();
