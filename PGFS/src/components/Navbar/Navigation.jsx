import NavItem from "./NavItem";

const Navigation = ({ openMenu, closeMenu, showMegaMenu }) => {
  return (
    <nav
      className="hidden lg:flex h-full"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <ul className="flex h-full items-center gap-10">

        <NavItem
          title="Loans"
          active={showMegaMenu}
        />

        <NavItem title="Investments" />

        <NavItem title="Insurance" />

        <NavItem title="Payments" />

      </ul>
    </nav>
  );
};

export default Navigation;