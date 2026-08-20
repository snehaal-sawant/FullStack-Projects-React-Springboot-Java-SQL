import { useState } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";
import RightMenu from "./RightMenu";

import MegaMenu from "../MegaMenu/MegaMenu";

import MobileMenuButton from "./MobileNavigation/MobileMenuButton";
import MobileDrawer from "./MobileNavigation/MobileDrawer";
import MobileNavigation from "./MobileNavigation/MobileNavigation";

const Navbar = () => {

  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm"
      onMouseLeave={() => setActiveMenu(null)}
    >

      <div className="h-18 mx-auto flex max-w-[1400px] items-center px-6 lg:px-8">

        {/* Logo */}
        <div className="w-[240px] flex-shrink-0">
          <Logo />
        </div>

        {/* Navigation */}
        <div className="hidden flex-1 text-sm  lg:flex justify-center h-full">

          <Navigation
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
          />

        </div>

        {/* Right Side */}
        <div className="hidden lg:flex justify-end flex-shrink-0">
          <RightMenu />
        </div>

        {/* Mobile Hamburger */}

        <div className="ml-auto lg:hidden">

          <MobileMenuButton
            isOpen={mobileMenuOpen}
            toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

        </div>

      </div>

       {/* Desktop Mega Menu */}

      {activeMenu && (
        <MegaMenu menuType={activeMenu} />
      )}

      {/* Mobile Drawer */}

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >

        <MobileNavigation
          onClose={() => setMobileMenuOpen(false)}
        />

      </MobileDrawer>

    </header>
  );
};

export default Navbar;