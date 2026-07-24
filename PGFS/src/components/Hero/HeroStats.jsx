const HeroStats = () => {

  const stats = [
    {
      value: "30+",
      label: "Bank Partners",
    },
    {
      value: "₹500Cr+",
      label: "Loans Processed",
    },
    {
      value: "10K+",
      label: "Happy Customers",
    },
  ];

  return (

    <div className="mt-20 grid gap-8 text-center md:grid-cols-3">

      {stats.map((stat) => (

        <div key={stat.label}>

          <h2 className="text-4xl font-bold text-[#005BAC]">

            {stat.value}

          </h2>

          <p className="mt-2 text-gray-600">

            {stat.label}

          </p>

        </div>

      ))}

    </div>

  );

};

export default HeroStats;