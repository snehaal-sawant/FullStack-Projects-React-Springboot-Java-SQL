const HeroButtons = () => {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-4">

      <button className="rounded-xl bg-[#005BAC] px-8 py-4 text-white font-semibold transition duration-300 hover:scale-105 hover:bg-blue-700">

        Apply Now

      </button>

      <button className="rounded-xl border border-[#005BAC] px-8 py-4 font-semibold text-[#005BAC] transition duration-300 hover:bg-[#005BAC] hover:text-white">

        EMI Calculator

      </button>

    </div>
  );
};

export default HeroButtons;