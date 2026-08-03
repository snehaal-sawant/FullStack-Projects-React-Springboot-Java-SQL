const HeroStats = () => {

  const stats = [
    {
      value: "10+",
      label: "Bank Partners",
    },
    {
      value: "₹50L+",
      label: "Loans Processed",
    },
    {
      value: "2K+",
      label: "Happy Customers",
    },
  ];

  return (

    <div className="flex flex-col sm:flex-row lg:items-start gap-8 pt-5 text-center lg:text-left">

      {stats.map((stat) => (

        <div key={stat.label}>

          <h2 className="text-1xl font-bold sm:text-1xl lg:text-1xl text-gray-800">

            {stat.value}

          </h2>

          <p className="mt-1 text-xs sm:text-sm text-gray-500">

            {stat.label}

          </p>

        </div>

      ))}

    </div>

  );

};

export default HeroStats;