import React from "react";
import { motion } from "framer-motion";

interface ButtonPropTypes {
  label: string;
  link?: string;
  customClasses?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ButtonDefault = ({
  label,
  link,
  customClasses = '',
  children,
  onClick,
}: ButtonPropTypes) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center gap-2.5 text-center font-medium 
        bg-blue-500 text-white px-4 py-2 cursor-pointer 
        transition-all duration-300 ease-in-out hover:bg-blue-600 
        active:bg-blue-700 ${customClasses}`}
      onClick={onClick}
    >
      {children && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mr-2"
        >
          {children}
        </motion.span>
      )}
      {label}
    </motion.div>
  );
};

export default ButtonDefault;