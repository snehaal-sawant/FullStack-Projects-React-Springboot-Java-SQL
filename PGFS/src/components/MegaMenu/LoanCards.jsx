import LoanCard from "./LoanCard";
import { loanMenu } from "./menuData";

const LoanCards = ({ activeCategory }) => {

  const currentCategory = loanMenu.find(
    (item) => item.id === activeCategory
  );

  return (
    <div className="flex-1 p-6">

      <div className="grid grid-cols-2 gap-5">

        {currentCategory.cards.map((card) => (
          <LoanCard
            key={card.title}
            item={card}
          />
        ))}

      </div>

    </div>
  );
};

export default LoanCards;