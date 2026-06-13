import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      nav: {
        works: "Ishlar", services: "Xizmatlar", process: "Jarayon", contact: "Aloqa", order: "ZAKAZ BERISH",
      },
      hero: {
        eyebrow: "ARXITEKTURA · MAKET · DIZAYN",
        title_line1: "Loyihangizni",
        title_line2: "Ko'rinishga keltiring",
        subtitle: "Arxitektura binolarining aniq va premium maketlari. Har bir loyiha uchun individual yondashuv va professional sifat.",
        cta_works: "ISHLARNI KO'RISH",
        cta_contact: "ALOQA",
      },
      stats: {
        projects: "Bajarilgan loyiha",
        experience: "Yillik tajriba",
        satisfaction: "Mijoz mamnuniyati",
        cities: "Shahar bo'ylab",
      },
      projects: {
        eyebrow: "PORTFEL", title: "Bajarilgan ishlar", all: "BARCHASI →",
      },
      services: {
        eyebrow: "XIZMATLAR", title: "Nima qilamiz",
        items: [
          { title: "Arxitektura Maketi", desc: "Binolar, komplekslar va shaharsozlik loyihalarining aniq va batafsil maketlari. Har bir detal qo'l bilan ishlanadi.", tag: "Asosiy xizmat" },
          { title: "Konsepsiya Modeli", desc: "Loyiha boshlang'ich bosqichida vizual kommunikatsiya uchun soddalashtirilgan konsepsiya maketlari.", tag: "Tez bajariladi" },
          { title: "Prezentatsion Maket", desc: "Investorlar va mijozlar uchun maxsus ishlangan premium sifatli namoyish maketlari.", tag: "Premium" },
          { title: "Interyer Modeli", desc: "Xona planirovkasi va interyer dizaynini ko'rsatuvchi kesim maketlari va detallar.", tag: "Ichki dizayn" },
        ],
      },
      process: {
        eyebrow: "JARAYON", title: "Qanday ishlaymiz",
      },
      contact: {
        eyebrow: "ALOQA", title: "Bog'laning",
        name: "Ismingiz", phone: "Telefon raqam", message: "Xabar", send: "Yuborish",
      },
      footer: {
        rights: "Barcha huquqlar himoyalangan",
      },
    },
  },

  ru: {
    translation: {
      nav: {
        works: "Работы", services: "Услуги", process: "Процесс", contact: "Контакты", order: "ЗАКАЗАТЬ",
      },
      hero: {
        eyebrow: "АРХИТЕКТУРА · МАКЕТ · ДИЗАЙН",
        title_line1: "Воплотите ваш",
        title_line2: "проект в реальность",
        subtitle: "Точные и премиальные макеты архитектурных зданий. Индивидуальный подход и профессиональное качество для каждого проекта.",
        cta_works: "СМОТРЕТЬ РАБОТЫ",
        cta_contact: "СВЯЗАТЬСЯ",
      },
      stats: {
        projects: "Выполненных проектов",
        experience: "Лет опыта",
        satisfaction: "Довольных клиентов",
        cities: "Городов",
      },
      projects: {
        eyebrow: "ПОРТФОЛИО", title: "Выполненные работы", all: "ВСЕ РАБОТЫ →",
      },
      services: {
        eyebrow: "УСЛУГИ", title: "Что мы делаем",
        items: [
          { title: "Архитектурный макет", desc: "Точные и детализированные макеты зданий, комплексов и градостроительных проектов. Каждая деталь выполнена вручную.", tag: "Основная услуга" },
          { title: "Концептуальная модель", desc: "Упрощённые концептуальные макеты для визуальной коммуникации на начальном этапе проекта.", tag: "Быстро" },
          { title: "Презентационный макет", desc: "Премиальные демонстрационные макеты, специально созданные для инвесторов и клиентов.", tag: "Премиум" },
          { title: "Модель интерьера", desc: "Разрезные макеты и детали, показывающие планировку помещений и дизайн интерьера.", tag: "Интерьер" },
        ],
      },
      process: {
        eyebrow: "ПРОЦЕСС", title: "Как мы работаем",
      },
      contact: {
        eyebrow: "КОНТАКТЫ", title: "Свяжитесь с нами",
        name: "Ваше имя", phone: "Номер телефона", message: "Сообщение", send: "Отправить",
      },
      footer: {
        rights: "Все права защищены",
      },
    },
  },

  en: {
    translation: {
      nav: {
        works: "Works", services: "Services", process: "Process", contact: "Contact", order: "GET A QUOTE",
      },
      hero: {
        eyebrow: "ARCHITECTURE · SCALE MODEL · DESIGN",
        title_line1: "Bring your project",
        title_line2: "to life",
        subtitle: "Precise and premium architectural scale models. An individual approach and professional quality for every project.",
        cta_works: "VIEW OUR WORK",
        cta_contact: "CONTACT",
      },
      stats: {
        projects: "Completed projects",
        experience: "Years of experience",
        satisfaction: "Client satisfaction",
        cities: "Cities covered",
      },
      projects: {
        eyebrow: "PORTFOLIO", title: "Completed works", all: "ALL WORKS →",
      },
      services: {
        eyebrow: "SERVICES", title: "What we do",
        items: [
          { title: "Architectural Model", desc: "Precise and detailed scale models of buildings, complexes and urban development projects. Every detail handcrafted.", tag: "Core service" },
          { title: "Concept Model", desc: "Simplified concept models for visual communication at the early stage of a project.", tag: "Fast turnaround" },
          { title: "Presentation Model", desc: "Premium quality display models specially crafted for investors and clients.", tag: "Premium" },
          { title: "Interior Model", desc: "Cross-section models and details showing room layout and interior design.", tag: "Interior" },
        ],
      },
      process: {
        eyebrow: "PROCESS", title: "How we work",
      },
      contact: {
        eyebrow: "CONTACT", title: "Get in touch",
        name: "Your name", phone: "Phone number", message: "Message", send: "Send",
      },
      footer: {
        rights: "All rights reserved",
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "uz",
    fallbackLng: "uz",
    interpolation: { escapeValue: false },
  });

export default i18n;