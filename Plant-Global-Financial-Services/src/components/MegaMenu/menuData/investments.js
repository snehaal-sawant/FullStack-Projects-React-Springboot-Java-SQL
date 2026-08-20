import {FaExchangeAlt, FaHome} from "react-icons/fa";
import { AiFillGold, AiOutlineGold } from "react-icons/ai";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaHouseCircleCheck, FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { BiSolidBuildingHouse } from "react-icons/bi";

export const investments = [
   {
    id: "equity-investment-services",
    title: "Equity Investment Services",
    cards: [
      {
        id: "stock-broking",
        title: "Stock Broking",
        description: "Enables buying and selling of shares in the stock market.",
        icon: AiFillGold,
        path: "investments/stock-broking",
      },
      {
        id: "demat-account-services",
        title: "Demat Account Services",
        description: "Electronic storage facility for shares and securities.",
        icon: AiOutlineGold,
        path: "investments/demat-account-services",
      },
      {
        id: "equity-trading",
        title: "Equity Trading",
        description: "Direct investment in listed company shares.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/equity-trading",
      },
      {
        id: "ipo-investment-services",
        title: "IPO Investment Services",
        description: "Access to invest in companies during their public listing stage.",
        icon: FaHouseCircleCheck,
        path: "investments/ipo-investment-services",
      },
      {
        id: "exchange-traded-funds",
        title: "Exchange Traded Funds (ETFs)",
        description: "Market-traded funds that track indices, sectors, or commodities.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/exchange-traded-funds",
      },
      {
        id: "international-equity-investments",
        title: "International Equity Investments",
        description: "Investment opportunities in global stock markets.",
        icon: FaHouseCircleCheck,
        path: "investments/international-equity-investments",
      },
    ]
  },

  {
    id: "mutual-fund-managed-investments",
    title: "Mutual Fund & Managed Investments",
    cards: [
      {
        id: "mutual-funds",
        title: "Mutual Funds",
        description: "Professionally managed pooled investments across asset classes.",
        icon: AiFillGold,
        path: "investments/mutual-funds",
      },
      {
        id: "systematic-investment-plan",
        title: "SIP (Systematic Investment Plan)",
        description: "Regular periodic investment method into mutual funds.",
        icon: AiOutlineGold,
        path: "investments/systematic-investment-plan",
      },
      {
        id: "portfolio-management-services",
        title: "Portfolio Management Services (PMS)",
        description: "Customized portfolio management for high-net-worth investors.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/portfolio-management-services",
      },
      {
        id: "wealth-management",
        title: "Wealth Management",
        description: "Holistic investment and financial advisory services.",
        icon: FaHouseCircleCheck,
        path: "investments/wealth-management",
      },
      {
        id: "robo-advisory-services",
        title: "Robo-Advisory Services",
        description: "Automated portfolio recommendations based on investor profile.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/robo-advisory-services",
      },
      {
        id: "alternative-investment-funds",
        title: "Alternative Investment Funds (AIFs)",
        description: "Investments in private equity, hedge funds, and other alternative assets.",
        icon: FaHouseCircleCheck,
        path: "investments/alternative-investment-funds",
      },
    ]
  },

  {
    id: "fixed-Income-safe-investments",
    title: "Fixed Income & Safe Investments",
    cards: [
      {
        id: "Fixed Deposits (FDs)",
        title: "Fixed Deposits (FDs)",
        description: "Low-risk investments offering fixed interest returns.",
        icon: AiFillGold,
        path: "investments/fixed-Income-safe-investments",
      },
      {
        id: "bonds-and-debentures",
        title: "Bonds & Debentures",
        description: "Debt investment instruments issued by governments or companies.",
        icon: AiOutlineGold,
        path: "investments/bonds-and-debentures",
      },
      {
        id: "government-securities",
        title: "Government Securities (G-Secs)",
        description: "Sovereign-backed fixed income investment products.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/government-securities",
      },
      {
        id: "corporate-deposits",
        title: "Corporate Deposits",
        description: "Fixed tenure deposits offered by companies with interest payouts.",
        icon: FaHouseCircleCheck,
        path: "investments/corporate-deposits",
      },
      {
        id: "recurring-deposits",
        title: "Recurring Deposits (RDs)",
        description: "Monthly investment deposits with guaranteed returns.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/recurring-deposits",
      },
    ]
  },

  {
    id: "retirement-and-long-term-planning",
    title: "Retirement & Long-Term Planning",
    cards: [
      {
        id: "retirement-planning",
        title: "Retirement Planning",
        description: "Investment solutions focused on post-retirement financial security.",
        icon: AiFillGold,
        path: "investments/retirement-planning",
      },
      {
        id: "national-pension-system",
        title: "National Pension System (NPS)",
        description: "Government-supported pension and retirement savings scheme.",
        icon: AiOutlineGold,
        path: "investments/national-pension-system",
      },
      {
        id: "pension-funds",
        title: "Pension Funds",
        description: "Managed funds designed to generate retirement income.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/pension-funds",
      },
      {
        id: "annuity-plans",
        title: "Annuity Plans",
        description: "Investment products providing regular income after retirement.",
        icon: FaHouseCircleCheck,
        path: "investments/annuity-plans",
      },
    ]
  },

  {
    id: "tax-saving-investments",
    title: "Tax Saving Investments",
    cards: [
      {
        id: "elss-mutual-funds",
        title: "ELSS Mutual Funds",
        description: "Tax-saving mutual funds with equity exposure and lock-in period.",
        icon: AiFillGold,
        path: "investments/elss-mutual-funds",
      },
      {
        id: "tax-saving-fixed-deposits",
        title: "Tax Saving Fixed Deposits",
        description: "Fixed deposits eligible for tax deductions under applicable laws",
        icon: AiOutlineGold,
        path: "investments/tax-saving-fixed-deposits",
      },
      {
        id: "public-provident-fund",
        title: "Public Provident Fund (PPF)",
        description: "Long-term government-backed tax-saving investment scheme.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/public-provident-fund",
      },
      {
        id: "sukanya-samriddhi-yojana",
        title: "Sukanya Samriddhi Yojana",
        description: "Savings scheme focused on the financial future of girl children.",
        icon: FaHouseCircleCheck,
        path: "investments/sukanya-samriddhi-yojana",
      },
      {
        id: "national-savings-certificate",
        title: "National Savings Certificate (NSC)",
        description: "Government-backed tax-saving fixed income instrument.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/national-savings-certificate",
      },
    ]
  },

  {
    id: "commodity-real-asset",
    title: "Commodity & Real Asset Investments",
    cards: [
      {
        id: "gold-investments",
        title: "Gold Investments",
        description: "Investment in physical, digital, or ETF-based gold products.",
        icon: AiFillGold,
        path: "investments/gold-investments",
      },
      {
        id: "silver-investments",
        title: "Silver Investments",
        description: "Investment options linked to silver commodities.",
        icon: AiOutlineGold,
        path: "investments/silver-investments",
      },
      {
        id: "real-estate-investments",
        title: "Real Estate Investments",
        description: "Investment opportunities in residential or commercial properties.",
        icon: MdOutlineRealEstateAgent,
        path: "investments/real-estate-investments",
      },
      {
        id: "real-estate-investments-trusts",
        title: "REITs (Real Estate Investment Trusts)",
        description: "Market-traded instruments investing in income-generating properties.",
        icon: FaHouseCircleCheck,
        path: "investments/real-estate-investments-trusts",
      },
    ]
  },

  {
    id: "advisory-financial-planning-services",
    title: "Advisory & Financial Planning Services",
    cards: [
      {
        id: "financial-planning",
        title: "Financial Planning",
        description: "Goal-based planning for savings, investments, and wealth creation.",
        icon: FaMoneyBillTrendUp,
        path: "investments/financial-planning",
      },
      {
        id: "risk-profiling",
        title: "Risk Profiling",
        description: "Assessment of investor risk appetite before investment planning.",
        icon: FaMoneyBillTransfer,
        path: "investments/risk-profiling",
      },
      {
        id: "estate-planning",
        title: "Estate Planning",
        description: "Structuring assets and investments for wealth transfer.",
        icon: BiSolidBuildingHouse,
        path: "investments/estate-planning",
      },
      {
        id: "investment-advisory",
        title: "Investment Advisory",
        description: "Professional guidance on investment opportunities and portfolio strategy.",
        icon: GrMoney,
        path: "investments/investment-advisory",
      },
    ]
  }
];