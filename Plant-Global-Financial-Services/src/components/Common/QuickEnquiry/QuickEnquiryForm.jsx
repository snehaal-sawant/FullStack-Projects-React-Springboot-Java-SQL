import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const products = [
  "Home Loan",
  "Personal Loan",
  "Business Loan",
  "Loan Against Property",
  "Gold Loan",
  "Vehicle Loan",
  "Mutual Funds",
  "Insurance",
];

const QuickEnquiryForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    product: "",
    name: "",
    phone: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="p-10">

      <h2 className="mb-2 text-3xl font-bold text-gray-900">
         Let's Find What You Need
      </h2>

      <p className="mb-8 text-gray-500">
      Fill in your details and our team will get in touch with you.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Product */}

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-600">
            Product
          </label>

          <div className="relative">
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="h-14 w-full appearance-none rounded-full border border-gray-200 bg-gray-50 px-6 text-sm outline-none transition focus:border-[#005BAC] focus:bg-white"
            >
              <option value="">Select Product</option>

              {products.map((product) => (
                <option
                  key={product}
                  value={product}
                >
                  {product}
                </option>
              ))}
            </select>

            <FaChevronDown className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Name */}

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-600">
            Your Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            className="h-14 w-full rounded-full border border-gray-200 bg-gray-50 px-6 text-sm outline-none transition focus:border-[#005BAC] focus:bg-white"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-600">
            Phone Number
          </label>

          <div className="flex h-14 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
            <div className="flex items-center border-r border-gray-300 px-5 text-sm font-medium">
              +91
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Enter Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 bg-transparent px-4 text-sm outline-none"
            />
          </div>
        </div>

        {/* Terms */}

        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 accent-[#005BAC]"
          />

          <span className="text-gray-600">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              className="text-[#005BAC] underline"
            >
              Terms & Conditions
            </a>
          </span>
        </label>

        {/* Button */}

        <button
          type="submit"
          className="mt-4 h-14 w-full rounded-full bg-[#005BAC] text-base font-semibold text-white transition hover:bg-[#004a90]"
        >
          GET OTP
        </button>
      </form>
    </div>
  );
};

export default QuickEnquiryForm;