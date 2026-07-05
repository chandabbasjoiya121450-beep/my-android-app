// Self-contained JavaScript for Harf Font Studio (escaped unicode sets)
const ALPHABET_MAPS = {
  "Bold Serif": "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
  "Italic Serif": "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧0123456789",
  "Bold Italic": "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛0123456789",
  "Sans-Serif": "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫",
  "Sans Bold": "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵",
  "Sans Italic": "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789",
  "Sans Bold Italic": "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789",
  "Monospace": "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
  "Double-Struck": "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
  "Script": "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789",
  "Bold Script": "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃0123456789",
  "Fraktur": "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷0123456789",
  "Bold Fraktur": "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟0123456789",
  "Circles": "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨",
  "Filled Circles": "🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩🄀❶❷❸❹❺❻❼❽❾",
  "Squares": "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉0123456789",
  "Filled Squares": "🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉0123456789",
  "Parenthesized": "⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵0⑴⑵⑶⑷⑸⑹⑺⑻⑼",
  "Fullwidth": "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９",
  "Small Caps": "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘɂʀꜱᴛᴜᴠᴡxʏᴢᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘɂʀꜱᴛᴜᴠᴡxʏᴢ0123456789"
};
const upsideDownMap = {
  "a": "ɐ",
  "b": "q",
  "c": "ɔ",
  "d": "p",
  "e": "ǝ",
  "f": "ɟ",
  "g": "ƃ",
  "h": "ɥ",
  "i": "ᴉ",
  "j": "ɾ",
  "k": "ʞ",
  "l": "l",
  "m": "ɯ",
  "n": "u",
  "o": "o",
  "p": "d",
  "q": "b",
  "r": "ɹ",
  "s": "s",
  "t": "ʇ",
  "u": "n",
  "v": "ʌ",
  "w": "ʍ",
  "x": "x",
  "y": "ʎ",
  "z": "z",
  "A": "∀",
  "B": "ᗹ",
  "C": "Ɔ",
  "D": "ᗡ",
  "E": "Ǝ",
  "F": "Ⅎ",
  "G": "⅁",
  "H": "H",
  "I": "I",
  "J": "ſ",
  "K": "ʞ",
  "L": "⅂",
  "M": "W",
  "N": "N",
  "O": "O",
  "P": "Ԁ",
  "Q": "⅌",
  "R": "ᴚ",
  "S": "S",
  "T": "┴",
  "U": "∩",
  "V": "Ʌ",
  "W": "M",
  "X": "X",
  "Y": "⅄",
  "Z": "Z",
  "0": "0",
  "1": "Ɩ",
  "2": "ㄹ",
  "3": "Ɛ",
  "4": "߈",
  "5": "Ͳ",
  "6": "9",
  "7": "Ɫ",
  "8": "8",
  "9": "6",
  ".": "˙",
  ",": "'",
  "'": ",",
  "\"": "„",
  "?": "¿",
  "!": "¡",
  "(": ")",
  ")": "(",
  "[": "]",
  "]": "[",
  "{": "}",
  "}": "{",
  "<": ">",
  ">": "<",
  "_": "‾"
};
const mirroredMap = {
  "A": "A",
  "B": "ᙯ",
  "C": "Ɔ",
  "D": "ᗡ",
  "E": "Ǝ",
  "F": "Ⅎ",
  "G": "⅁",
  "H": "H",
  "I": "I",
  "J": "ᙼ",
  "K": "Ɐ",
  "L": "⅂",
  "M": "M",
  "N": "ᴎ",
  "O": "O",
  "P": "ꟼ",
  "Q": "Q",
  "R": "Я",
  "S": "Ꞔ",
  "T": "T",
  "U": "U",
  "V": "V",
  "W": "W",
  "X": "X",
  "Y": "⅄",
  "Z": "Ɽ",
  "a": "ɒ",
  "b": "d",
  "c": "ɔ",
  "d": "b",
  "e": "ɘ",
  "f": "ლ",
  "g": "ɡ",
  "h": "ʜ",
  "i": "i",
  "j": "ɾ",
  "k": "ʞ",
  "l": "l",
  "m": "m",
  "n": "ᴎ",
  "o": "o",
  "p": "q",
  "q": "p",
  "r": "ɹ",
  "s": "ʂ",
  "t": "ʇ",
  "u": "u",
  "v": "v",
  "w": "w",
  "x": "x",
  "y": "ʎ",
  "z": "z",
  "1": "Ɩ",
  "2": "S",
  "3": "Ɛ",
  "4": "߈",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9"
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Zalgo Combining Marks
const zalgoUp = ["\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306", "\u0310", "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a", "\u0309", "\u0349", "\u033e", "\u0348", "\u0315", "\u0317", "\u0316", "\u0312", "\u0313", "\u0314", "\u033d", "\u030f", "\u0300", "\u0301", "\u0302", "\u0303", "\u030b", "\u030c", "\u031a"];
const zalgoDown = ["\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e", "\u031f", "\u0320", "\u0324", "\u0325", "\u0326", "\u0329", "\u032a", "\u032b", "\u032c", "\u032d", "\u032e", "\u032f", "\u0330", "\u0331", "\u0332", "\u0333", "\u0339", "\u033a", "\u033b", "\u033c", "\u0345", "\u0347", "\u0348", "\u0349", "\u034d", "\u034e", "\u0353", "\u0354", "\u0355", "\u0356", "\u0359", "\u035a", "\u0323"];
const zalgoMid = ["\u0315", "\u0321", "\u0322", "\u0327", "\u0328", "\u0334", "\u0335", "\u0336", "\u034f", "\u035c", "\u035d", "\u035e", "\u035f", "\u0360", "\u0362", "\u0338", "\u0337", "\u0322", "\u0327", "\u0328"];

function makeZalgoText(text) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        result += text[i];
        if (text[i] === ' ') continue;
        const numUp = Math.floor(Math.random() * 2) + 1;
        const numDown = Math.floor(Math.random() * 2) + 1;
        const numMid = Math.floor(Math.random() * 1);
        for (let j = 0; j < numUp; j++) {
            result += zalgoUp[Math.floor(Math.random() * zalgoUp.length)];
        }
        for (let j = 0; j < numDown; j++) {
            result += zalgoDown[Math.floor(Math.random() * zalgoDown.length)];
        }
        for (let j = 0; j < numMid; j++) {
            result += zalgoMid[Math.floor(Math.random() * zalgoMid.length)];
        }
    }
    return result;
}

// Base symbols list for input quick insert
const quickDecorators = ["﷽", "ﷺ", "ﷻ", "ؑ", "ؓ", "ؒ", "ؔ", "ؕ", "★", "✿", "ღ", "꧁", "꧂", "♥", "✨", "👑"];

// Decorative Wrappers presets
const wrappers = [
    { name: "Ornate Stars", wrap: t => `★彡 ${t} 彡★` },
    { name: "Royal Wings", wrap: t => `꧁•⊹٭ ${t} ٭⊹•꧂` },
    { name: "Crown Accent", wrap: t => `👑 ${t} 👑` },
    { name: "Heart Frame", wrap: t => `ღ꧁ ${t} ꧂ღ` },
    { name: "Lover Hearts", wrap: t => `💖 ${t} 💖` },
    { name: "Retro Block", wrap: t => `░▒▓█ ${t} █▓▒░` },
    { name: "Mystic Cross", wrap: t => `༒☬ ${t} ☬༒` },
    { name: "Blossom Flower", wrap: t => `✿.｡.:* ${t} *.:｡.✿` },
    { name: "Bullet Wave", wrap: t => `•´¯\`•. ${t} .•´¯\`••` },
    { name: "Gold Brackets", wrap: t => `【 ${t} 】` },
    { name: "Classic Brackets", wrap: t => `『 ${t} 』` },
    { name: "Aesthetic Border", wrap: t => `✧○ꊞ ${t} ꊞ○✧` },
    { name: "Sparkling Border", wrap: t => `✨✦ ${t} ✦✨` },
    { name: "Diamond Frame", wrap: t => `◇◆ ${t} ◆◇` },
    { name: "Swords Border", wrap: t => `⚔️ ${t} ⚔️` },
    { name: "Music Notes", wrap: t => `♫♪ ${t} ♪♫` },
    { name: "Infinity Accent", wrap: t => `∞ ${t} ∞` },
    { name: "Check Mark", wrap: t => `✓ ${t} ✓` },
    { name: "Trophy Accent", wrap: t => `🏆 ${t} 🏆` },
    { name: "Fire Glow", wrap: t => `🔥 ${t} 🔥` }
];

// Localization System
const translations = {
    en: {
        title: "Harf",
        subtitle: "Convert text to stylish fonts & design calligraphy cards",
        tabEnglish: "English Fonts",
        tabUrduText: "Urdu Decorative",
        tabUrduCard: "Calligraphy Card Studio",
        placeholderEn: "Type your text here...",
        placeholderUr: "یہاں اپنا اردو متن لکھیں...",
        placeholderSubtext: "e.g. Allama Iqbal / علامہ اقبال",
        inputHeading: "Enter Your Text",
        quickDecorators: "Quick Add Symbols:",
        searchStyles: "Search font style...",
        headingEnglish: "Stylish Font Variations",
        headingUrdu: "Decorated Urdu Variations",
        previewHeader: "Live Card Preview",
        downloadBtn: "Download Card (PNG)",
        controlsHeading: "Card Studio Controls",
        ctrlFont: "Choose Calligraphy Style",
        ctrlSize: "Font Size",
        ctrlBg: "Background Style",
        ctrlFrame: "Border Frame",
        ctrlGlow: "Glow & Shadow Blur",
        ctrlTextColor: "Text Color",
        ctrlGlowColor: "Glow Color",
        ctrlSubtext: "Signature / Poet Name",
        quickInsertCard: "Quick Add Decorators to Canvas:",
        noFrame: "No Border",
        goldFrame: "Classic Gold Border",
        thinFrame: "Minimalist Border",
        doubleFrame: "Royal Double Border",
        copyBtn: "Copy",
        copied: "Copied!",
        toastCopied: "Copied to clipboard!",
        footer: "Crafted with ♥ • Harf © 2026",
        defaultEnText: "Stay Creative",
        defaultUrText: "حرف و قلم خطاطی اسٹوڈیو"
    },
    ur: {
        title: "حرف",
        subtitle: "سادہ الفاظ کو خوبصورت فونٹس میں تبدیل کریں اور خطاطی کارڈز بنائیں",
        tabEnglish: "انگریزی فونٹس",
        tabUrduText: "اردو سجاوٹ",
        tabUrduCard: "خطاطی کارڈ اسٹوڈیو",
        placeholderEn: "...یہاں انگریزی لکھیں",
        placeholderUr: "...یہاں اپنا اردو متن لکھیں",
        placeholderSubtext: "جیسے: علامہ اقبال",
        inputHeading: "اپنا متن درج کریں",
        quickDecorators: "سجاوٹی علامات:",
        searchStyles: "انداز تلاش کریں...",
        headingEnglish: "خوبصورت انگریزی فونٹس",
        headingUrdu: "سجے ہوئے اردو فونٹس",
        previewHeader: "لائیو کارڈ کا منظر",
        downloadBtn: "کارڈ ڈاؤن لوڈ کریں (PNG)",
        controlsHeading: "کارڈ اسٹوڈیو کنٹرولز",
        ctrlFont: "خطاطی کا انداز منتخب کریں",
        ctrlSize: "فونٹ سائز",
        ctrlBg: "پس منظر کا انداز",
        ctrlFrame: "بارڈر فریم",
        ctrlGlow: "چمک اور سائے کا پھیلاؤ",
        ctrlTextColor: "متن کا رنگ",
        ctrlGlowColor: "چمک کا رنگ",
        ctrlSubtext: "دستخط / شاعر کا نام",
        quickInsertCard: "کینوس پر سجاوٹ شامل کریں:",
        noFrame: "بغیر بارڈر",
        goldFrame: "شاہی سنہرا بارڈر",
        thinFrame: "سادہ بارڈر",
        doubleFrame: "ڈبل شاہی فریم",
        copyBtn: "کاپی کریں",
        copied: "کاپی ہو گیا!",
        toastCopied: "کلپ بورڈ پر کاپی ہو گیا!",
        footer: "خلوص کے ساتھ تیار کردہ • حرف © 2026",
        defaultEnText: "کوشش کامیابی کی کنجی ہے",
        defaultUrText: "حرف و قلم خطاطی اسٹوڈیو"
    }
};

let currentLang = 'en';
let activeTab = 'english';
let currentBgPreset = 'midnight-mesh';

const defaultEnglishInput = "Beautiful Calligraphy";
const defaultUrduInput = "ادب پہلا قرینہ ہے محبت کے قرینوں میں";

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initQuickDecorators();
    document.getElementById("main-input").value = defaultEnglishInput;
    lucide.createIcons();
    setLanguage(currentLang);
    onTextInput();
});

function initQuickDecorators() {
    const list = document.getElementById("decorators-list");
    list.innerHTML = "";
    quickDecorators.forEach(symbol => {
        const badge = document.createElement("button");
        badge.className = "decor-badge";
        badge.textContent = symbol;
        badge.onclick = () => insertTextAtCursor(symbol);
        list.appendChild(badge);
    });
}

function insertTextAtCursor(text) {
    const textarea = document.getElementById("main-input");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    textarea.value = value.substring(0, start) + text + value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + text.length;
    textarea.focus();
    onTextInput();
}

function clearInput() {
    const textarea = document.getElementById("main-input");
    textarea.value = "";
    textarea.focus();
    onTextInput();
}

// ==========================================================================
// Tab Management
// ==========================================================================
function switchTab(tabId) {
    activeTab = tabId;
    document.querySelectorAll(".tab-link").forEach(btn => btn.classList.remove("active"));
    document.getElementById(`tab-btn-${tabId}`).classList.add("active");
    
    document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
    document.getElementById(`pane-${tabId}`).classList.add("active");
    
    const textarea = document.getElementById("main-input");
    if (tabId === 'english') {
        textarea.setAttribute("dir", "ltr");
        textarea.placeholder = translations[currentLang].placeholderEn;
        if (textarea.value.trim() === "" || textarea.value === defaultUrduInput) {
            textarea.value = defaultEnglishInput;
        }
    } else {
        textarea.setAttribute("dir", "rtl");
        textarea.placeholder = translations[currentLang].placeholderUr;
        if (textarea.value.trim() === "" || textarea.value === defaultEnglishInput) {
            textarea.value = defaultUrduInput;
        }
    }
    onTextInput();
}

// ==========================================================================
// Language Switching & Translation Rendering
// ==========================================================================
function setLanguage(lang) {
    currentLang = lang;
    document.getElementById("btn-lang-en").classList.toggle("active", lang === 'en');
    document.getElementById("btn-lang-ur").classList.toggle("active", lang === 'ur');
    
    const isRtl = lang === 'ur';
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    
    document.getElementById("app-title").textContent = translations[lang].title;
    document.getElementById("app-subtitle").textContent = translations[lang].subtitle;
    
    document.getElementById("label-tab-english").textContent = translations[lang].tabEnglish;
    document.getElementById("label-tab-urdu-text").textContent = translations[lang].tabUrduText;
    document.getElementById("label-tab-calligraphy").textContent = translations[lang].tabUrduCard;
    
    document.getElementById("label-input-heading").textContent = translations[lang].inputHeading;
    document.getElementById("label-quick-decorators").textContent = translations[lang].quickDecorators;
    
    document.getElementById("font-search").placeholder = translations[lang].searchStyles;
    document.getElementById("heading-english-results").textContent = translations[lang].headingEnglish;
    document.getElementById("heading-urdu-text-results").textContent = translations[lang].headingUrdu;
    
    document.getElementById("label-preview-header").textContent = translations[lang].previewHeader;
    document.getElementById("label-download-btn").textContent = translations[lang].downloadBtn;
    
    document.getElementById("label-controls-heading").textContent = translations[lang].controlsHeading;
    document.getElementById("label-ctrl-font").textContent = translations[lang].ctrlFont;
    document.getElementById("label-ctrl-size").textContent = translations[lang].ctrlSize;
    document.getElementById("label-ctrl-bg").textContent = translations[lang].ctrlBg;
    document.getElementById("label-ctrl-frame").textContent = translations[lang].ctrlFrame;
    document.getElementById("label-ctrl-glow").textContent = translations[lang].ctrlGlow;
    document.getElementById("label-ctrl-text-color").textContent = translations[lang].ctrlTextColor;
    document.getElementById("label-ctrl-glow-color").textContent = translations[lang].ctrlGlowColor;
    document.getElementById("label-ctrl-subtext").textContent = translations[lang].ctrlSubtext;
    document.getElementById("label-quick-insert-card").textContent = translations[lang].quickInsertCard;
    
    document.getElementById("opt-frame-none").textContent = translations[lang].noFrame;
    document.getElementById("opt-frame-gold").textContent = translations[lang].goldFrame;
    document.getElementById("opt-frame-thin").textContent = translations[lang].thinFrame;
    document.getElementById("opt-frame-double").textContent = translations[lang].doubleFrame;
    
    document.getElementById("label-footer").textContent = translations[lang].footer;
    
    const textarea = document.getElementById("main-input");
    if (activeTab === 'english') {
        textarea.placeholder = translations[lang].placeholderEn;
    } else {
        textarea.placeholder = translations[lang].placeholderUr;
    }
    document.getElementById("ctrl-subtext").placeholder = translations[lang].placeholderSubtext;
    
    onTextInput();
}

// ==========================================================================
// Text Processing & Font Generators
// ==========================================================================
function onTextInput() {
    const text = document.getElementById("main-input").value;
    
    if (activeTab === 'english') {
        renderEnglishFonts(text);
    } else if (activeTab === 'urdu-text') {
        renderUrduTextVariations(text);
    } else if (activeTab === 'calligraphy') {
        renderCalligraphyCardText(text);
    }
}

// Convert English text using 1-to-1 Unicode maps
function convertEnglishText(text, styleMap) {
    if (!text) return "";
    const mapChars = Array.from(styleMap);
    let output = "";
    
    for (const char of text) {
        const idx = ALPHABET.indexOf(char);
        if (idx !== -1 && idx < mapChars.length) {
            output += mapChars[idx];
        } else {
            output += char;
        }
    }
    return output;
}

// Automated generator: creates hundreds of styles by combining maps and wrappers!
function generateHundredsOfStyles(text) {
    const results = [];
    
    // Base font mappings
    const baseFonts = {};
    for (const [fontName, styleMap] of Object.entries(ALPHABET_MAPS)) {
        baseFonts[fontName] = convertEnglishText(text, styleMap);
    }
    
    // Complex base fonts
    baseFonts["Upside Down"] = Array.from(text).reverse().map(c => upsideDownMap[c] || c).join("");
    baseFonts["Mirrored"] = Array.from(text).reverse().map(c => mirroredMap[c] || c).join("");
    baseFonts["Small Caps"] = convertEnglishText(text, ALPHABET_MAPS["Small Caps"]);
    baseFonts["Strikethrough"] = Array.from(text).map(c => c + "\u0336").join("");
    baseFonts["Underline"] = Array.from(text).map(c => c + "\u0332").join("");
    baseFonts["Double Underline"] = Array.from(text).map(c => c + "\u0333").join("");
    baseFonts["Slash-Through"] = Array.from(text).map(c => c + "\u0337").join("");
    baseFonts["Wavy Underline"] = Array.from(text).map(c => c + "\u0330").join("");
    
    // Add raw base fonts
    for (const [name, val] of Object.entries(baseFonts)) {
        results.push({ name: name, value: val });
    }
    
    // Spaced variants
    results.push({ name: "Spaced Plain", value: Array.from(text).join(" ") });
    results.push({ name: "Spaced Small Caps", value: Array.from(baseFonts["Small Caps"]).join(" ") });
    results.push({ name: "Spaced Cursive", value: Array.from(baseFonts["Bold Script"]).join(" ") });
    results.push({ name: "Glitch (Zalgo)", value: makeZalgoText(text) });
    
    // Cross combinations (10 fonts * 20 wrappers = 200 combinations!)
    const comboFonts = ["Bold Serif", "Bold Italic", "Script", "Bold Script", "Double-Struck", "Fraktur", "Bold Fraktur", "Circles", "Squares", "Small Caps"];
    
    comboFonts.forEach(fontKey => {
        if (!baseFonts[fontKey]) return;
        const fontText = baseFonts[fontKey];
        wrappers.forEach(w => {
            results.push({
                name: `${fontKey} + ${w.name}`,
                value: w.wrap(fontText)
            });
        });
    });
    
    return results;
}

// English font generators renderer
function renderEnglishFonts(rawText) {
    const text = rawText.trim() || translations[currentLang].defaultEnText;
    const grid = document.getElementById("english-fonts-grid");
    grid.innerHTML = "";
    
    const filterQuery = document.getElementById("font-search").value.toLowerCase();
    
    // Automatically generate hundreds of combinations!
    const allStyles = generateHundredsOfStyles(text);
    
    allStyles.forEach(style => {
        if (filterQuery && !style.name.toLowerCase().includes(filterQuery)) return;
        createFontCard(grid, style.name, style.value);
    });
}

// Urdu text variations renderer
function renderUrduTextVariations(rawText) {
    const text = rawText.trim() || translations[currentLang].defaultUrText;
    const grid = document.getElementById("urdu-text-grid");
    grid.innerHTML = "";
    
    // Create decorated varieties for Urdu (combine wrappers and base text)
    const results = [];
    results.push({ name: "Simple Urdu (سادہ)", value: text });
    
    // Apply all 20 wrappers to Urdu text to get 20+ styles
    wrappers.forEach(w => {
        results.push({
            name: `Urdu • ${w.name}`,
            value: w.wrap(text)
        });
    });
    
    results.forEach(style => {
        createFontCard(grid, style.name, style.value);
    });
}

// Card Helper Creator
function createFontCard(gridElement, fontTitle, styledText) {
    const card = document.createElement("div");
    card.className = "font-card card-glass";
    
    const info = document.createElement("div");
    info.className = "font-info";
    
    const nameSpan = document.createElement("span");
    nameSpan.className = "font-name";
    nameSpan.textContent = fontTitle;
    
    info.appendChild(nameSpan);
    
    const preview = document.createElement("div");
    preview.className = "font-preview";
    preview.textContent = styledText;
    
    if (activeTab === "urdu-text" || fontTitle.startsWith("Urdu")) {
        preview.style.fontFamily = "'Noto Nastaliq Urdu', serif";
    }
    
    const actionBar = document.createElement("div");
    actionBar.className = "card-action-bar";
    
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-card-btn";
    copyBtn.innerHTML = `<i data-lucide="copy"></i><span>${translations[currentLang].copyBtn}</span>`;
    copyBtn.onclick = () => copyTextToClipboard(styledText, copyBtn);
    
    actionBar.appendChild(copyBtn);
    
    card.appendChild(info);
    card.appendChild(preview);
    card.appendChild(actionBar);
    
    gridElement.appendChild(card);
    lucide.createIcons();
}

function filterFonts() {
    onTextInput();
}

// ==========================================================================
// Calligraphy Card Studio Logic
// ==========================================================================
function renderCalligraphyCardText(rawText) {
    const text = rawText.trim() || translations[currentLang].defaultUrText;
    const cardText = document.getElementById("card-text-display");
    cardText.textContent = text;
    
    updateCardStyle();
}

function selectBgPreset(buttonElement) {
    document.querySelectorAll(".bg-preset-btn").forEach(btn => btn.classList.remove("active"));
    buttonElement.classList.add("active");
    
    currentBgPreset = buttonElement.dataset.preset;
    
    const card = document.getElementById("calligraphy-card");
    card.className = `calligraphy-card preset-${currentBgPreset}`;
    
    updateCardStyle();
}

function addDecorToCard(symbol) {
    const subtextInput = document.getElementById("ctrl-subtext");
    const cursor = subtextInput.selectionStart;
    const value = subtextInput.value;
    subtextInput.value = value.substring(0, cursor) + symbol + value.substring(subtextInput.selectionEnd);
    subtextInput.focus();
    updateCardStyle();
}

function updateCardStyle() {
    const card = document.getElementById("calligraphy-card");
    const cardText = document.getElementById("card-text-display");
    const cardSubtext = document.getElementById("card-subtext-display");
    const frameElement = card.querySelector(".card-border-frame");
    
    const fontSelect = document.getElementById("ctrl-font");
    cardText.style.fontFamily = fontSelect.value;
    
    const sizeVal = document.getElementById("ctrl-size").value;
    document.getElementById("val-size").textContent = `${sizeVal}px`;
    cardText.style.fontSize = `${sizeVal}px`;
    
    const textColor = document.getElementById("ctrl-text-color").value;
    cardText.style.color = textColor;
    document.querySelector("#ctrl-text-color").nextElementSibling.textContent = textColor;
    
    const glowBlur = document.getElementById("ctrl-glow").value;
    document.getElementById("val-glow").textContent = `${glowBlur}px`;
    const glowColor = document.getElementById("ctrl-glow-color").value;
    document.querySelector("#ctrl-glow-color").nextElementSibling.textContent = glowColor;
    
    if (parseInt(glowBlur) > 0) {
        cardText.style.textShadow = `0 0 ${glowBlur}px ${glowColor}, 0 0 ${parseInt(glowBlur)/2}px ${textColor}`;
    } else {
        cardText.style.textShadow = "none";
    }
    
    const frameSelect = document.getElementById("ctrl-frame").value;
    frameElement.className = "card-border-frame";
    if (frameSelect !== 'none') {
        frameElement.classList.add(`border-${frameSelect}`);
    }
    
    const subtext = document.getElementById("ctrl-subtext").value;
    cardSubtext.textContent = subtext;
    if (subtext) {
        cardSubtext.style.display = "block";
    } else {
        cardSubtext.style.display = "none";
    }
}

// Advanced Canvas Drawing & High-Res PNG Generator
function downloadCardImage() {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    
    const mainText = document.getElementById("card-text-display").textContent;
    const subtext = document.getElementById("ctrl-subtext").value;
    const selectedFont = document.getElementById("ctrl-font").value;
    const baseFontSize = parseInt(document.getElementById("ctrl-size").value);
    const textColor = document.getElementById("ctrl-text-color").value;
    const glowBlur = parseInt(document.getElementById("ctrl-glow").value);
    const glowColor = document.getElementById("ctrl-glow-color").value;
    const frameStyle = document.getElementById("ctrl-frame").value;
    
    if (currentBgPreset === 'midnight-mesh') {
        let grad = ctx.createRadialGradient(400, 400, 50, 400, 400, 600);
        grad.addColorStop(0, "#202029");
        grad.addColorStop(1, "#0d0d12");
        ctx.fillStyle = grad;
    } else if (currentBgPreset === 'royal-gold') {
        let grad = ctx.createLinearGradient(0, 0, 800, 800);
        grad.addColorStop(0, "#111111");
        grad.addColorStop(0.5, "#29210c");
        grad.addColorStop(1, "#000000");
        ctx.fillStyle = grad;
    } else if (currentBgPreset === 'emerald-glow') {
        let grad = ctx.createRadialGradient(240, 240, 50, 400, 400, 600);
        grad.addColorStop(0, "#0f3d2a");
        grad.addColorStop(1, "#04140e");
        ctx.fillStyle = grad;
    } else if (currentBgPreset === 'sapphire-dream') {
        let grad = ctx.createLinearGradient(0, 0, 800, 800);
        grad.addColorStop(0, "#091730");
        grad.addColorStop(0.5, "#0b224c");
        grad.addColorStop(1, "#040c1c");
        ctx.fillStyle = grad;
    } else if (currentBgPreset === 'neon-sunset') {
        let grad = ctx.createLinearGradient(0, 0, 800, 800);
        grad.addColorStop(0, "#4c0f38");
        grad.addColorStop(0.6, "#22062b");
        grad.addColorStop(1, "#0a0114");
        ctx.fillStyle = grad;
    } else if (currentBgPreset === 'plum-velvet') {
        let grad = ctx.createRadialGradient(560, 240, 50, 400, 400, 600);
        grad.addColorStop(0, "#300c3b");
        grad.addColorStop(1, "#15021c");
        ctx.fillStyle = grad;
    }
    ctx.fillRect(0, 0, 800, 800);
    
    if (frameStyle === 'gold-ornate') {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 8;
        ctx.strokeRect(30, 30, 740, 740);
        ctx.strokeStyle = "rgba(255, 215, 0, 0.4)";
        ctx.lineWidth = 2;
        ctx.strokeRect(45, 45, 710, 710);
        ctx.fillStyle = "#ffd700";
        ctx.fillRect(30, 30, 30, 8);
        ctx.fillRect(30, 30, 8, 30);
        ctx.fillRect(740, 30, 30, 8);
        ctx.fillRect(762, 30, 8, 30);
        ctx.fillRect(30, 762, 30, 8);
        ctx.fillRect(30, 740, 8, 30);
        ctx.fillRect(740, 762, 30, 8);
        ctx.fillRect(762, 740, 8, 30);
    } else if (frameStyle === 'thin-white') {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, 720, 720);
    } else if (frameStyle === 'double-royal') {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 10;
        ctx.strokeRect(30, 30, 740, 740);
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 4;
        ctx.strokeRect(48, 48, 704, 704);
    }
    
    const scaleFactor = 2;
    const finalFontSize = baseFontSize * scaleFactor;
    ctx.font = `${finalFontSize}px ${selectedFont}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (glowBlur > 0) {
        ctx.shadowColor = glowColor;
        ctx.shadowBlur = glowBlur * scaleFactor;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
    
    const maxTextWidth = 650;
    const lineHeight = finalFontSize * 1.6;
    const centerY = subtext ? 360 : 400;
    
    drawWrappedText(ctx, mainText, 400, centerY, maxTextWidth, lineHeight);
    
    if (subtext) {
        ctx.shadowBlur = 0;
        ctx.font = `${20 * scaleFactor}px 'Aref Ruqaa', serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fillText(subtext, 400, 680);
    }
    
    // Download trigger (Android Bridge check + standard browser fallback)
    if (window.AndroidBridge && window.AndroidBridge.downloadImage) {
        window.AndroidBridge.downloadImage(canvas.toDataURL("image/png"));
    } else {
        const link = document.createElement("a");
        link.download = `CalligraphyCard-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    }
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const lines = text.split('\n');
    let allWrappedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const words = lines[i].split(' ');
        let currentLine = '';
        
        for (let n = 0; n < words.length; n++) {
            let testLine = currentLine + words[n] + ' ';
            let metrics = ctx.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                allWrappedLines.push(currentLine.trim());
                currentLine = words[n] + ' ';
            } else {
                currentLine = testLine;
            }
        }
        allWrappedLines.push(currentLine.trim());
    }
    
    const totalHeight = allWrappedLines.length * lineHeight;
    let startY = y - (totalHeight / 2) + (lineHeight / 2);
    
    for (let i = 0; i < allWrappedLines.length; i++) {
        ctx.fillText(allWrappedLines[i], x, startY + (i * lineHeight));
    }
}

// ==========================================================================
// Clipboard Copy & UI Interactions
// ==========================================================================
function copyTextToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHtml = buttonElement.innerHTML;
        buttonElement.classList.add("copied-state");
        buttonElement.innerHTML = `<i data-lucide="check"></i><span>${translations[currentLang].copied}</span>`;
        lucide.createIcons();
        
        showToast(translations[currentLang].toastCopied);
        
        setTimeout(() => {
            buttonElement.classList.remove("copied-state");
            buttonElement.innerHTML = originalHtml;
            lucide.createIcons();
        }, 1500);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
}

function showToast(message) {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    
    toastMsg.textContent = message;
    toast.classList.remove("hidden");
    
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 2500);
}
