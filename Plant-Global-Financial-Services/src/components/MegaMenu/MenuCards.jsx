import MenuCard from "./MenuCard";

const MenuCards = ({ menu, activeCategory }) => {

  // Find the selected sidebar category
  const currentCategory = menu.find(
    (item) => item.id === activeCategory
  );

  // Safety check
  if (!currentCategory) {
    return (
      <div className="flex-1 p-6">
        <p className="text-gray-500">No services found.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">

      <div className="grid grid-cols-2 gap-5">
        
        {currentCategory.cards.map((card) => (
          <MenuCard
            key={card.id}
            item={card}
          />
        ))}

      </div>
      
    </div>
  );
};

export default MenuCards;