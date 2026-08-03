import {
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
} from "react-icons/fa";
import { socialLinks } from "../../constants/socialLinks";

const HeaderTop = () => {
  return (
     <div className="hidden lg:flex justify-between items-center bg-gray-900 text-gray-300 px-10 py-1.5">
      <div>
        <div className="flex items-center gap-6">
          <div className="flex text-sm items-center gap-2 hover:text-white transition-colors duration-300">
              <FaPhoneAlt size={16} />
              <a
                  href="tel:+917276865443"
                  className="hover:text-white transition-colors"
              >
                  +91-7276865443
              </a>
          </div>

          <div className="flex text-sm items-center gap-2 hover:text-white transition-colors duration-300">
              <FaEnvelope size={16} />
              <a
                  href="mailto:sales@finance.plantglobal.com"
                  className="hover:text-white transition-colors" 
              >
                  sales@finance.plantglobal.com
              </a>
          </div>

          <div className="flex text-sm items-center gap-2 hover:text-white transition-colors duration-300">
              <FaClock size={16} />              
              Mon - Fri : 09 AM - 09 PM
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {
          socialLinks.map((item) => {
          const Icon = item.icon;
          return (
              <a
                  key={item.title}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
              >
                  <Icon size={18} />
              </a>
          );
          })
        }

      </div>
    </div>
  );
};

export default HeaderTop;