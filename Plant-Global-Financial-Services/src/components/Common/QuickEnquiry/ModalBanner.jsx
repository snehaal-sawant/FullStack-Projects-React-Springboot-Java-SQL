import logo from "../../../assets/images/logo.jpg";

const ModalBanner = () => {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#005BAC] via-[#0072CE] to-[#0099E5] p-10 text-white md:flex">
      {/* Decorative Circles */}

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10"></div>

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/5"></div>

      {/* Logo */}

      <div>
        <img
          src={logo}
          alt="Plant Global Financial Services"
          className="h-20 w-auto object-contain rounded-lg"
        />
      </div>

      {/* Content */}

      <div className="relative z-10">

        <h2 className="mb-6 text-4xl font-bold leading-tight">
          Finance Made
          <br />
          Simple.
        </h2>

        <p className="text-lg leading-8 text-blue-100">
          Get expert guidance for loans, insurance,
          investments and financial solutions
          tailored to your needs.
        </p>

      </div>

      {/* Bottom Text */}

      <div className="relative z-10 text-sm text-blue-100">
        Trusted by thousands of happy customers.
      </div>
    </div>
  );
};

export default ModalBanner;