const FeaturedBanner = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#005BAC] to-[#0A7CFF] p-6 text-white shadow-lg">

      <h2 className="text-2xl font-bold">
        Find Your Perfect Loan
      </h2>

      <p className="mt-3 text-sm leading-6 text-blue-100">
        Compare interest rates from leading banks and financial institutions
        in one place.
      </p>

      <button className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-[#005BAC] transition hover:scale-105">
        Apply Now
      </button>

    </div>
  );
};

export default FeaturedBanner;