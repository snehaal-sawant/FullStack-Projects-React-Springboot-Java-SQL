const MobileDrawer = ({ isOpen, children }) => {
  return (
    <div
      className={`
        fixed
        top-18
        right-0
        w-full
        h-[80vh]
        bg-white
        shadow-2xl
        z-40
        transform
        transition-all
        duration-300
        ease-in-out
        overflow-hidden
        ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }
      `}
    >
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MobileDrawer;