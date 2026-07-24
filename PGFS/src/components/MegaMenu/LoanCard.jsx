import { Link } from "react-router-dom";

import {
  Home,
  RefreshCw,
  Plus,
  Building2,
  Map,
  Hammer,
} from "lucide-react";

const icons = {
  home: Home,
  refresh: RefreshCw,
  plus: Plus,
  building: Building2,
  map: Map,
  hammer: Hammer,
};

const LoanCard = ({ item }) => {
  const Icon = icons[item.icon];

  return (
    <Link
      href={item.link}
      className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-[#005BAC] hover:shadow-lg"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 transition-all duration-300 group-hover:bg-[#005BAC]">
        {Icon && (
          <Icon
            size={26}
            className="text-[#005BAC] group-hover:text-white"
          />
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {item.title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {item.description}
        </p>
      </div>
    </Link>
  );
};

export default LoanCard;