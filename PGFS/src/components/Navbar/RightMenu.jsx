import { Search, CircleUserRound } from "lucide-react";

const RightMenu = () => {
  return (
    <div className="flex items-center gap-5">

      {/* Search */}

      <button
        className="rounded-full p-2 transition-all duration-300 hover:bg-gray-100"
      >
        <Search
          size={21}
          strokeWidth={2}
          className="text-slate-700"
        />
      </button>

      {/* Login */}

      <button
        className="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-300 hover:bg-gray-100"
      >
        <CircleUserRound
          size={22}
          strokeWidth={2}
          className="text-slate-700"
        />

        <span className="font-medium text-slate-700">
          Login
        </span>

      </button>

      {/* Get App */}

      <button
        className="
          rounded-lg
          bg-[#005BAC]
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          shadow-md
          transition-all
          duration-300
          hover:bg-[#004b8c]
          hover:shadow-lg
        "
      >
        Get App
      </button>

    </div>
  );
};

export default RightMenu;