import MobileMenuItem from "./MobileMenuItem";
import { menuData } from "../../MegaMenu/menuData";

const MobileNavigation = ({ onClose }) => {
  const menuOrder = [
    "loans",
    "investments",
    "insurance",
    "payments",
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable Menu */}
      <div className="flex-1 overflow-y-auto">
        {menuOrder.map((menuKey) => (
          <MobileMenuItem
            key={menuKey}
            title={
              menuKey.charAt(0).toUpperCase() +
              menuKey.slice(1)
            }
            items={menuData[menuKey]}
            onClose={onClose}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t bg-white p-4">
        <button className="w-full rounded-lg bg-[#005BAC] py-2 text-base font-semibold text-white transition hover:bg-[#004b90]">
          Download App
        </button>
      </div>
    </div>
  );
};

export default MobileNavigation;