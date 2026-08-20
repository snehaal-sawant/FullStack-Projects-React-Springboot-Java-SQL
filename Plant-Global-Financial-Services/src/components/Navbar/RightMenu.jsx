import { FaRegUserCircle, FaSearch } from "react-icons/fa";


const RightMenu = () => {
  return (
    <div className="flex items-center gap-5">

      {/* Search */}

      <button
        className="rounded-md p-2 transition-all duration-300 hover:bg-gray-100"
      >
        <FaSearch
          size={18}
          strokeWidth={2}
          className="text-slate-700"
        />
      </button>

      {/* Login */}

      <button
        className="flex items-center gap-2 rounded-lg px-2 py-2 transition-all duration-300 hover:bg-gray-100"
      >
        <FaRegUserCircle
          size={18}
          strokeWidth={2}
          className="text-slate-700"
        />

        <span className="font-sm text-slate-700">
          Login
        </span>

      </button>

      {/* Get App */}

      <button
        className="
          rounded-lg
          bg-[#005BAC]
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          shadow-md
          transition-all
          duration-300
          hover:bg-[#0369a1]
          hover:shadow-lg
        "
      >
        Get App
      </button>

    </div>
  );
};

export default RightMenu;