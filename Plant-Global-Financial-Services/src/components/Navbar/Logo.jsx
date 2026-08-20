import logo from "../../assets/images/logo.jpg";

const Logo = () => {
  return (
    <a
      href="/"
      className="flex items-center w-[240px] pt-2 h-full"
    >
      <img
         src={logo}
         alt="Company Logo"
         className="max-w-[140px] h-auto object-contain"
      />
    </a>
  );
};

export default Logo;