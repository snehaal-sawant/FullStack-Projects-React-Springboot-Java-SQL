import {
  Home,
  User,
  Briefcase,
} from "lucide-react";

const HeroCards = () => {

  const cards = [
    {
      title: "Home Loan",
      icon: Home,
    },
    {
      title: "Personal Loan",
      icon: User,
    },
    {
      title: "Business Loan",
      icon: Briefcase,
    },
  ];

  return (

    <div className="mt-16 grid gap-6 md:grid-cols-3">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-2xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <Icon
              size={40}
              className="text-[#005BAC]"
            />

            <h3 className="mt-6 text-xl font-semibold">

              {card.title}

            </h3>

          </div>

        );

      })}

    </div>

  );

};

export default HeroCards;