import { useState } from "react";

import Sidebar from "./Sidebar";
import LoanCards from "./LoanCards";
import BottomLinks from "./BottomLinks";

const MegaMenu = () => {

  const [activeCategory, setActiveCategory] = useState(1);

  return (

    <div className="absolute left-0 top-full w-full border-t border-gray-200 bg-white shadow-xl">

      <div className="mx-auto max-w-[1400px]">

        <div className="flex">

          <Sidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <LoanCards
            activeCategory={activeCategory}
          />

        </div>

        <BottomLinks />

      </div>

    </div>

  );

};

export default MegaMenu;