const HeroButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row lg:items-start gap-4">

      <button className="w-full sm:w-auto rounded-md border border-[#0369a1] px-4 py-2 font-semibold text-[#0369a1] transition duration-300 bg-[#0369a1] text-white text-xs hover:bg-[#fff] hover:text-[#0369a1]">

        Apply Now

      </button>

      <button className="w-full sm:w-auto rounded-md border border-[#0369a1] px-6 py-2 font-semibold text-[#0369a1] transition duration-300 hover:bg-[#0369a1] text-xs hover:text-white">

        EMI Calculator

      </button>

    </div>
  );
};

export default HeroButtons;