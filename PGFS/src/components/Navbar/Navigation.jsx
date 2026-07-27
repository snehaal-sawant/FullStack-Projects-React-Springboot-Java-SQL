import NavItem from "./NavItem";

const Navigation = ({ activeMenu, setActiveMenu }) => {
  return (
    <nav className="hidden lg:flex h-full">
      <ul className="flex h-full items-center gap-10">
        <NavItem
            title="Loans"
            menuType="loans"
            active={activeMenu === "loans"}
            onMouseEnter={setActiveMenu}
        />
        <NavItem
            title="Investments"
            menuType="investments"
            active={activeMenu === "investments"}
            onMouseEnter={setActiveMenu}
        />

        <NavItem
            title="Insurance"
            menuType="insurance"
            active={activeMenu === "insurance"}
            onMouseEnter={setActiveMenu}
        />

        <NavItem
            title="Payments"
            menuType="payments"
            active={activeMenu === "payments"}
            onMouseEnter={setActiveMenu}
        />
      </ul>
    </nav>
  );
};

export default Navigation;