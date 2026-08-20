import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import MenuCards from "./MenuCards";
import BottomLinks from "./BottomLinks";

import { menuData } from "./menuData";

const MegaMenu = ({ menuType }) => {

  // Get the selected menu (Loans, Investments, Insurance, Payments)
  const currentMenu = menuData[menuType] || [];

  // Active sidebar category
  const [activeCategory, setActiveCategory] = useState(
    currentMenu.length > 0 ? currentMenu[0].id : null
  );

  // Reset the active category whenever the top menu changes
  useEffect(() => {
    if (currentMenu.length > 0) {
      setActiveCategory(currentMenu[0].id);
    }
  }, [menuType]);

  return (
    <div className="absolute left-0 top-full w-full border-t border-gray-200 bg-white shadow-xl">

      <div className="mx-auto max-w-[1400px]">

        <div className="flex">

          {/* Left Sidebar */}
          <Sidebar
            menu={currentMenu}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {/* Right Cards */}
          <MenuCards
            menu={currentMenu}
            activeCategory={activeCategory}
          />

        </div>

        {/* Bottom Links */}
        <BottomLinks />

      </div>

    </div>
  );
};

export default MegaMenu;