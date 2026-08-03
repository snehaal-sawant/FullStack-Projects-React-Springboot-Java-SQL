import hero1 from "../../assets/images/Hero/hero1.jpg";
import hero2 from "../../assets/images/Hero/hero2.jpg";

export const heroSlides = [
  {
    id: 1,

    badge: "TRUSTED FINANCIAL PARTNER",

    title: "Empowering Your",

    highlight: "Financial Growth",

    description:
      "Explore loans, investments, insurance and payment solutions designed for individuals and businesses.",

    image: hero1,

    primaryButton: {
      text: "Explore Services",
      path: "/services",
    },

    secondaryButton: {
      text: "Talk to Advisor",
      path: "/contact",
    },

    stats: [
      {
        value: "30+",
        label: "Bank Partners",
      },
      {
        value: "₹500Cr+",
        label: "Loans Processed",
      },
      {
        value: "10K+",
        label: "Happy Customers",
      },
    ],
  },

  {
    id: 2,

    badge: "BUILD YOUR FUTURE",

    title: "Insurance That Cares",

    highlight: "For Every Tomorrow",

    description:
      "From life to health to motor - protect what matters most with plans built around you.",

    image: hero2,

    primaryButton: {
      text: "Start Investing",
      path: "/investments",
    },

    secondaryButton: {
      text: "View Plans",
      path: "/plans",
    },

    stats: [
      {
        value: "500+",
        label: "Investment Plans",
      },
      {
        value: "₹4.2Cr",
        label: "Monthly Investments",
      },
      {
        value: "15+",
        label: "Years of Trust",
      },
    ],
  },
];