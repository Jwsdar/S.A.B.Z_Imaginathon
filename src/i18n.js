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