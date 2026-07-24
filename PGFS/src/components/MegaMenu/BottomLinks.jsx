const links = [
  "EMI Calculator",
  "Eligibility",
  "Interest Rates",
  "Required Documents",
  "FAQs",
  "Apply Online",
];

const BottomLinks = () => {
  return (
    <div className="border-t border-gray-200 bg-gray-50 px-8 py-4">

      <div className="flex flex-wrap gap-6">

        {links.map((item) => (
          <button
            key={item}
            className="text-sm font-medium text-slate-600 transition-all duration-300 hover:text-[#005BAC]"
          >
            {item}
          </button>
        ))}

      </div>

    </div>
  );
};

export default BottomLinks;