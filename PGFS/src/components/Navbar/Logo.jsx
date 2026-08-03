import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <a
      href="/"
      className="flex items-center w-[240px] h-full"
    >
      <img
         src={logo}
         alt="Company Logo"
         className="max-w-[180px] h-auto object-contain"
      />
    </a>
  );
};

export default Logo;