import { useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import RightMenu from "./RightMenu";
import MegaMenu from "../MegaMenu/MegaMenu";

const Navbar = () => {

  const [showMegaMenu, setShowMegaMenu] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm"
      onMouseLeave={() => setShowMegaMenu(false)}
    >

      <div className="mx-auto flex h-20 max-w-[1400px] items-center px-8">

        {/* Logo */}
        <div className="w-[240px] flex-shrink-0">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="flex-1 flex justify-center h-full">

          <Navigation
            showMegaMenu={showMegaMenu}
            openMenu={() => setShowMegaMenu(true)}
            closeMenu={() => {}}
          />

        </div>

        {/* Right Side */}
        <div className="w-[240px] flex justify-end flex-shrink-0">
          <RightMenu />
        </div>

      </div>

      {/* Mega Menu */}

      {showMegaMenu && <MegaMenu />}

    </header>
  );
};

export default Navbar;