import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      login: {
        title: "Welcome Back 👋",
        subtitle: "Today is a new day. Sign in to start managing your green credits.",
        email: "Email",
        emailPlaceholder: "Example@email.com",
        password: "Password",
        passPlaceholder: "At least 8 characters",
        forgot: "Forgot Password?",
        signin: "Sign in",
        or: "Or sign in with",
        google: "Sign in with Google",
        facebook: "Sign in with Facebook",
        noAccount: "Don't have an account?",
        signup: "Sign up",
        copyright: "© 2026 S.A.B.Z. ALL RIGHTS RESERVED",
        adminPortal: "Admin Portal",
        userPortal: "User Portal",
        empId: "Employee ID",
        adminKey: "Secret Key",
        adminKeyPlaceholder: "Enter .env root key",
        selectRole: "Select your access level",
        submitAdmin: "Access Dashboard",
        createAccount: "Create Account"
      },
      nav: { works: "How it works", impact: "Our Impact", rewards: "Rewards", account: "Account" },
      hero: {
        subtitle: "A Circular Economy Initiative",
        title: "Transforming Chiniot's Waste\nInto Green Wealth!",
        scroll: "scroll down"
      },
      s1: {
        subtitle: "Get Started",
        title: "Deposit Your Household\nOrganic Waste",
        desc: "Bring your daily organic waste to the nearest S.A.B.Z. Bio-Hub in Chiniot. Simply scan your unique QR code at the station, weigh your deposit, and our system will automatically register your contribution. Every kilogram counts towards a cleaner city and personal rewards.",
        btn: "read more"
      },
      s2: {
        subtitle: "Industrial Synergy",
        title: "The Chiniot\nSawdust Connection",
        desc: "Chiniot is world-renowned for its wooden furniture. We partner with local carpenters to collect waste sawdust. When combined with your household organic waste in our bio-hubs, it creates the perfect carbon-to-nitrogen ratio for accelerated, high-quality composting."
      },
      s3: {
        subtitle: "Rewards",
        title: "Earn & Redeem\nGreen Credits",
        desc: "For every kilogram of waste successfully logged, you earn S.A.B.Z. Green Credits. Track your balance on your digital dashboard and redeem them for municipal tax discounts, utility bill reductions, or fresh organic compost for your own gardens."
      },
      footer: {
        slogan: "Get out there & transform your city's waste into sustainable wealth!",
        copyright: "Copyright 2026 S.A.B.Z. Terms & Privacy",
        more: "More on S.A.B.Z",
        partners: "Partners",
        links: { about: "About Us", impact: "Impact Reports", contact: "Contact Us", muni: "Chiniot Municipality", union: "Furniture Union", press: "Press" }
      },
      pages: {
        back: "Back to Home",
        contact: {
          title: "Get in Touch",
          desc: "Whether you are a municipality looking to deploy Bio-Hubs, a citizen with a question, or an investor interested in sustainable agrotech, we want to hear from you.",
          hq: "Headquarters",
          hqL1: "NUTECH University Campus",
          hqL2: "Sector I-12, Islamabad",
          hqL3: "(Operations in Chiniot City)",
          emailTitle: "Email Us",
          fname: "First Name",
          lname: "Last Name",
          emailLabel: "Email Address",
          msgLabel: "Message",
          msgPlaceholder: "How can we help you?",
          submit: "Send Message"
        },
        process: {
          title: "The Circular Economy in Action",
          desc: "Nature doesn't create waste. In a true circular economy, every byproduct is a resource for the next cycle. Here is how S.A.B.Z. transforms your daily kitchen scraps into high-yield agricultural fertilizer.",
          s1Title: "Deposit & Log",
          s1Desc: "Citizens drop off organic waste at neighborhood Bio-Hubs. The IoT scale logs the exact weight and assigns S.A.B.Z. credits to the user's digital wallet.",
          s2Title: "Synergistic Shredding",
          s2Desc: "Waste is transported to our central facility where it is shredded and mixed with locally sourced Chiniot sawdust to achieve the perfect Carbon-to-Nitrogen ratio.",
          s3Title: "Aerobic Decomposition",
          s3Desc: "The mixture is placed in climate-controlled windrows. Microorganisms break down the organic matter over 4-6 weeks while temperature and moisture are strictly monitored.",
          s4Title: "Curing & Testing",
          s4Desc: "The compost matures, stabilizing its nutrient profile. We conduct rigorous quality testing to ensure the final product is free of pathogens and rich in organic carbon.",
          s5Title: "Return to Earth",
          s5Desc: "The finished organic fertilizer is distributed to local farmers and community gardens, revitalizing the soil and closing the circular economy loop.",
          ctaTitle: "Be Part of the Cycle",
          ctaDesc: "Start logging your waste today and reduce Chiniot's landfill footprint.",
          ctaBtn: "Log Waste Now"
        },
        about: {
          title: "About The S.A.B.Z. Team",
          desc: "We are a collective of NUTECH engineering students and community builders driven by a unified passion: merging agrotech with environmental sustainability.",
          jawad: "Computer Engineering undergrad focused on leveraging IoT architectures for civic infrastructure and community wellbeing.",
          mubarra: "Agrotech enthusiast driving the integration of circular economy principles and community-led sustainability protocols.",
          sami: "Operations and environmental strategy specialist ensuring robust deployment of our bio-waste zeroing systems."
        },
        partners: {
          title: "Cooperative Partnerships",
          desc: "Maintaining a green municipality is not a solitary effort. S.A.B.Z. operates as a coalition between civic bodies, local industry, and financial institutions to drive down Chiniot's overall carbon score.",
          p1Title: "Chiniot Municipal Administration",
          p1Desc: "Providing authorized locations for S.A.B.Z. Bio-Hub installations and integrating our metrics directly into the city's tax reduction framework.",
          p2Title: "Furniture & Woodworking Guilds",
          p2Desc: "Local carpenters serving as the primary suppliers of raw sawdust, ensuring a continuous supply of carbon-heavy material for optimized composting.",
          p3Title: "FinTech Integrators",
          p3Desc: "JazzCash and Easypaisa serve as our financial backbone, providing frictionless, instant transfers so users can convert environmental action directly into digital fiat."
        },
        rewards: {
          title: "Earn & Redeem Green Credits",
          desc: "Sustainability should pay off. For every 1 kilogram of organic waste successfully logged at a S.A.B.Z. Bio-Hub, you earn 50 Green Credits. Track your balance in real-time on your dashboard and seamlessly convert your environmental impact into financial rewards.",
          r1Title: "Municipal Discounts",
          r1Desc: "Redeem your credits directly against Chiniot municipal taxes or monthly utility bill reductions.",
          r2Title: "Mobile Wallets",
          r2Desc: "Instantly transfer equivalent fiat value to our official transaction partners: JazzCash and Easypaisa.",
          r3Title: "Fresh Compost",
          r3Desc: "Trade credits for high-grade, nutrient-dense organic fertilizer generated right from your own community's waste."
        }
      }
    }
  },
  ur: {
    translation: {
      login: {
        title: "خوش آمدید 👋",
        subtitle: "آج ایک نیا دن ہے۔ اپنے گرین کریڈٹس کا انتظام شروع کرنے کے لیے سائن ان کریں۔",
        email: "ای میل",
        emailPlaceholder: "Example@email.com",
        password: "پاس ورڈ",
        passPlaceholder: "کم از کم 8 حروف",
        forgot: "پاس ورڈ بھول گئے؟",
        signin: "سائن ان کریں",
        or: "یا اس کے ذریعے سائن ان کریں",
        google: "Google کے ساتھ سائن ان کریں",
        facebook: "Facebook کے ساتھ سائن ان کریں",
        noAccount: "کیا آپ کا اکاؤنٹ نہیں ہے؟",
        signup: "سائن اپ کریں",
        copyright: "© 2026 S.A.B.Z. جملہ حقوق محفوظ ہیں",
        adminPortal: "ایڈمن پورٹل",
        userPortal: "یوزر پورٹل",
        empId: "ملازم کی شناخت",
        adminKey: "خفیہ کلید",
        adminKeyPlaceholder: "روٹ کلید درج کریں",
        selectRole: "اپنا رسائی لیول منتخب کریں",
        submitAdmin: "ڈیش بورڈ تک رسائی حاصل کریں",
        createAccount: "اکاؤنٹ بنائیں"
      },
      nav: { works: "طریقہ کار", impact: "ہمارا اثر", rewards: "انعامات", account: "اکاؤنٹ" },
      hero: {
        subtitle: "سرکلر اکانومی کا اقدام",
        title: "چنیوٹ کے کچرے کو\nسرسبز دولت میں بدلیں!",
        scroll: "نیچے سکرول کریں"
      },
      s1: {
        subtitle: "آغاز کریں",
        title: "گھریلو نامیاتی\nکچرا جمع کروائیں",
        desc: "اپنا روزمرہ کا نامیاتی کچرا چنیوٹ میں قریبی S.A.B.Z. بائیو ہب پر لائیں۔ بس اسٹیشن پر اپنا منفرد QR کوڈ اسکین کریں، کچرے کا وزن کریں، اور ہمارا نظام خود بخود آپ کا حصہ درج کر لے گا۔ ہر کلوگرام ایک صاف شہر اور ذاتی انعامات کی طرف شمار ہوتا ہے۔",
        btn: "مزید پڑھیں"
      },
      s2: {
        subtitle: "صنعتی اشتراک",
        title: "چنیوٹ کا\nلکڑی کے برادے کا کنکشن",
        desc: "چنیوٹ اپنے لکڑی کے فرنیچر کے لیے عالمی سطح پر مشہور ہے۔ ہم مقامی بڑھئیوں کے ساتھ مل کر لکڑی کا برادہ جمع کرتے ہیں۔ جب اسے ہمارے بائیو ہب میں آپ کے گھریلو نامیاتی کچرے کے ساتھ ملایا جاتا ہے، تو یہ تیز اور اعلیٰ معیار کی کھاد بنانے کے لیے کاربن اور نائٹروجن کا بہترین تناسب بناتا ہے۔"
      },
      s3: {
        subtitle: "انعامات",
        title: "گرین کریڈٹس\nحاصل کریں اور استعمال کریں",
        desc: "کامیابی سے لاگ کیے گئے کچرے کے ہر کلوگرام پر، آپ S.A.B.Z. گرین کریڈٹس حاصل کرتے ہیں۔ اپنے ڈیجیٹل ڈیش بورڈ پر اپنا بیلنس ٹریک کریں اور انہیں میونسپل ٹیکس میں چھوٹ، بجلی کے بلوں میں کمی، یا اپنے باغات کے لیے تازہ نامیاتی کھاد کے لیے استعمال کریں۔"
      },
      footer: {
        slogan: "آگے بڑھیں اور اپنے شہر کے کچرے کو پائیدار دولت میں بدلیں!",
        copyright: "کاپی رائٹ 2026 S.A.B.Z. شرائط اور رازداری",
        more: "مزید جانیے",
        partners: "شراکت دار",
        links: { about: "ہمارے بارے میں", impact: "اثر کی رپورٹس", contact: "رابطہ کریں", muni: "چنیوٹ میونسپلٹی", union: "فرنیچر یونین", press: "پریس" }
      },
      pages: {
        back: "ہوم پیج پر واپس جائیں",
        contact: {
          title: "رابطہ کریں",
          desc: "چاہے آپ بائیو ہبز لگانے والی میونسپلٹی ہوں، سوال پوچھنے والے شہری ہوں، یا پائیدار ایگروٹیک میں دلچسپی رکھنے والے سرمایہ کار ہوں، ہم آپ سے سننا چاہتے ہیں۔",
          hq: "ہیڈ کوارٹرز",
          hqL1: "نیوٹیک (NUTECH) یونیورسٹی کیمپس",
          hqL2: "سیکٹر I-12، اسلام آباد",
          hqL3: "(آپریشنز چنیوٹ شہر میں)",
          emailTitle: "ہمیں ای میل کریں",
          fname: "پہلا نام",
          lname: "آخری نام",
          emailLabel: "ای میل ایڈریس",
          msgLabel: "پیغام",
          msgPlaceholder: "ہم آپ کی کیا مدد کر سکتے ہیں؟",
          submit: "پیغام بھیجیں"
        },
        process: {
          title: "سرکلر اکانومی عملی شکل میں",
          desc: "فطرت کچرا پیدا نہیں کرتی۔ ایک حقیقی سرکلر اکانومی میں، ہر بچ جانے والی چیز اگلے چکر کے لیے ایک وسیلہ ہے۔ یہ ہے کہ کس طرح S.A.B.Z. آپ کے باورچی خانے کے روزمرہ کے کچرے کو اعلیٰ پیداوار والی زرعی کھاد میں بدلتا ہے۔",
          s1Title: "جمع کروائیں اور لاگ کریں",
          s1Desc: "شہری محلے کے بائیو ہبز میں نامیاتی کچرا ڈالتے ہیں۔ IoT اسکیل درست وزن لاگ کرتا ہے اور صارف کے ڈیجیٹل والیٹ میں S.A.B.Z. کریڈٹس شامل کرتا ہے۔",
          s2Title: "مشترکہ شریڈنگ",
          s2Desc: "کچرے کو ہماری مرکزی سہولت میں منتقل کیا جاتا ہے جہاں اسے کاٹا جاتا ہے اور مقامی چنیوٹ کے لکڑی کے برادے کے ساتھ ملایا جاتا ہے تاکہ کاربن اور نائٹروجن کا بہترین تناسب حاصل کیا جا سکے۔",
          s3Title: "ایرروبک گلنا",
          s3Desc: "اس آمیزے کو درجہ حرارت کے کنٹرول والے ونڈروز میں رکھا جاتا ہے۔ مائکروجنزم 4 سے 6 ہفتوں میں نامیاتی مادے کو توڑتے ہیں جبکہ درجہ حرارت اور نمی کی سختی سے نگرانی کی جاتی ہے۔",
          s4Title: "کیورنگ اور ٹیسٹنگ",
          s4Desc: "کمپوسٹ پختہ ہوتی ہے اور اس کا غذائی پروفائل مستحکم ہوتا ہے۔ ہم اس بات کو یقینی بنانے کے لیے سخت کوالٹی ٹیسٹنگ کرتے ہیں کہ حتمی پروڈکٹ جراثیم سے پاک اور نامیاتی کاربن سے بھرپور ہو۔",
          s5Title: "زمین پر واپسی",
          s5Desc: "تیار شدہ نامیاتی کھاد مقامی کسانوں اور کمیونٹی کے باغات میں تقسیم کی جاتی ہے، جس سے مٹی دوبارہ زندہ ہوتی ہے اور سرکلر اکانومی کا چکر مکمل ہوتا ہے۔",
          ctaTitle: "اس چکر کا حصہ بنیں",
          ctaDesc: "آج ہی اپنا کچرا لاگ کرنا شروع کریں اور چنیوٹ کے کچرے کو کم کریں۔",
          ctaBtn: "ابھی کچرا لاگ کریں"
        },
        about: {
          title: "S.A.B.Z. ٹیم کے بارے میں",
          desc: "ہم نیوٹیک (NUTECH) انجینئرنگ کے طلباء اور کمیونٹی بلڈرز کا ایک گروپ ہیں جو ایک مشترکہ جذبے سے کارفرما ہیں: ماحولیاتی پائیداری کے ساتھ ایگروٹیک کا انضمام۔",
          jawad: "کمپیوٹر انجینئرنگ کے طالب علم جو شہری بنیادی ڈھانچے اور کمیونٹی کی فلاح و بہبود کے لیے IoT آرکیٹیکچر کے استعمال پر توجہ مرکوز کیے ہوئے ہیں۔",
          mubarra: "ایگروٹیک کے شیدائی جو سرکلر اکانومی کے اصولوں اور کمیونٹی کی زیر قیادت پائیداری کے پروٹوکول کے انضمام کو فروغ دے رہے ہیں۔",
          sami: "آپریشنز اور ماحولیاتی حکمت عملی کے ماہر جو ہمارے بائیو ویسٹ زیرو کرنے والے نظام کی مضبوط تعیناتی کو یقینی بناتے ہیں۔"
        },
        partners: {
          title: "تعاون پر مبنی شراکت داریاں",
          desc: "سرسبز میونسپلٹی کو برقرار رکھنا کوئی اکیلی کوشش نہیں ہے۔ S.A.B.Z. چنیوٹ کے مجموعی کاربن اسکور کو کم کرنے کے لیے شہری اداروں، مقامی صنعت اور مالیاتی اداروں کے درمیان اتحاد کے طور پر کام کرتا ہے۔",
          p1Title: "چنیوٹ میونسپل ایڈمنسٹریشن",
          p1Desc: "S.A.B.Z. بائیو ہب کی تنصیبات کے لیے مجاز مقامات فراہم کرنا اور ہمارے میٹرکس کو براہ راست شہر کے ٹیکس میں کمی کے فریم ورک میں ضم کرنا۔",
          p2Title: "فرنیچر اور ووڈ ورکنگ گلڈز",
          p2Desc: "مقامی بڑھئی کچے برادے کے بنیادی سپلائرز کے طور پر کام کرتے ہیں، جس سے بہترین کمپوسٹنگ کے لیے کاربن سے بھرپور مواد کی مسلسل فراہمی کو یقینی بنایا جاتا ہے۔",
          p3Title: "فن ٹیک انٹیگریٹرز",
          p3Desc: "JazzCash اور Easypaisa ہماری مالیاتی ریڑھ کی ہڈی کے طور پر کام کرتے ہیں، جو فوری ٹرانسفر فراہم کرتے ہیں تاکہ صارفین ماحولیاتی عمل کو براہ راست ڈیجیٹل رقم میں تبدیل کر سکیں۔"
        },
        rewards: {
          title: "گرین کریڈٹس حاصل کریں اور استعمال کریں",
          desc: "پائیداری کا صلہ ملنا چاہیے۔ S.A.B.Z. بائیو ہب میں کامیابی کے ساتھ لاگ کیے گئے ہر 1 کلوگرام نامیاتی کچرے کے لیے، آپ 50 گرین کریڈٹس حاصل کرتے ہیں۔ اپنے ڈیش بورڈ پر ریئل ٹائم میں اپنے بیلنس کو ٹریک کریں اور اپنے ماحولیاتی اثر کو مالی انعامات میں بغیر کسی رکاوٹ کے تبدیل کریں۔",
          r1Title: "میونسپل ڈسکاؤنٹس",
          r1Desc: "اپنے کریڈٹس کو براہ راست چنیوٹ کے میونسپل ٹیکسوں یا ماہانہ یوٹیلیٹی بلوں میں کمی کے خلاف استعمال کریں۔",
          r2Title: "موبائل والیٹس",
          r2Desc: "ہماری سرکاری لین دین کی شراکت دار کمپنیوں: JazzCash اور Easypaisa پر فوری طور پر مساوی رقم منتقل کریں۔",
          r3Title: "تازہ کمپوسٹ",
          r3Desc: "اپنی ہی کمیونٹی کے کچرے سے تیار کردہ اعلیٰ درجے کی، غذائیت سے بھرپور نامیاتی کھاد کے لیے کریڈٹس کا تبادلہ کریں۔"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;