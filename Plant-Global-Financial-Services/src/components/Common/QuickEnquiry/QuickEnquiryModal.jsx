import ModalBanner from "./ModalBanner";
import { FaTimes } from "react-icons/fa";

const QuickEnquiryModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
        >
          <FaTimes size={18} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Left Panel */}
          <ModalBanner />

          {/* Right Panel */}
          <div className="bg-white p-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickEnquiryModal;