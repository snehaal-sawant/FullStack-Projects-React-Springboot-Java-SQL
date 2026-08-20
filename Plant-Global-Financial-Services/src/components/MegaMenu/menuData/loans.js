import {FaExchangeAlt, FaHome} from "react-icons/fa";
import { AiFillGold, AiOutlineGold } from "react-icons/ai";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaHouseCircleCheck, FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { BiSolidBuildingHouse } from "react-icons/bi";

export const loans = [
  {
    id: "housing-loans",
    title: "Housing Loans",
    cards: [
      {
        id: "home-loan",
        title: "Home Loan",
        description: "...",
        icon: FaHome,
        path: "/home-loan",
      },
      {
        id: "balance-transfer",
        title: "Balance Transfer",
        description: "...",
        icon: FaExchangeAlt,
        path: "/balance-transfer",
      }
    ]
  },

  {
    id: "personal-loans",
    title: "Personal Loans",
    cards: [
      {
          id: "home-loan",
          title: "Home Loan",
          description: "...",
          icon: FaHome,
          path: "/home-loan",
        },
        {
          id: "balance-transfer",
          title: "Balance Transfer",
          description: "...",
          icon: FaExchangeAlt,
          path: "/balance-transfer",
        }
    ]
  }
];