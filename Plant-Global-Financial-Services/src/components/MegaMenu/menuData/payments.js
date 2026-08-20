import {FaExchangeAlt, FaHome} from "react-icons/fa";
import { AiFillGold, AiOutlineGold } from "react-icons/ai";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FaHouseCircleCheck, FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { BiSolidBuildingHouse } from "react-icons/bi";

export const payments = [
{
  id: "payment-services",
  title: "Payment Services",
  cards: [
      {
        id: "payment-gateway",
        title: "Payment Gateway",
        description: "Accept Online Payment",
        icon: FaHome,
        path: "payments/payment-gateway",
      },
      {
        id: "payment-links",
        title: "Payment Links",
        description: "Create and send links to collect Money",
        icon: FaExchangeAlt,
        path: "payments/payment-links",
      },
      {
        id: "qr-codes",
        title: "QR Codes",
        description: "Multi feature QR for your Business",
        icon: FaExchangeAlt,
        path: "payments/qr-codes",
      },
      {
        id: "pos",
        title: "POS",
        description: "Accept payments in Store",
        icon: FaExchangeAlt,
        path: "payments/pos",
      },
    ]
  },
];