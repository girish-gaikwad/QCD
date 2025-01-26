import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SidebarItemProps {
  item: {
    label: string;
    icon?: React.ReactNode;
    message?: string;
    pro?: boolean;
    children?: SidebarItemProps['item'][];
    href?: string;
  };
  pageName: string;
  setPageName: (name: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, pageName, setPageName }) => {
  const isActive = pageName === item.label.toLowerCase();
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    const updatedPageName = isActive ? "" : item.label.toLowerCase();
    setPageName(updatedPageName);
  };

  const itemVariants = {
    initial: { 
      backgroundColor: "transparent",
      color: "rgba(33, 66, 131, 0.7)" 
    },
    hover: { 
      backgroundColor: "rgba(33, 66, 131, 0.1)",
      color: "rgba(33, 66, 131, 1)"
    },
    active: { 
      backgroundColor: "rgba(33, 66, 131, 0.2)",
      color: "rgba(33, 66, 131, 1)"
    }
  };

  return (
    <div className="w-full">
      <Link
          href={item.route}
          onClick={handleClick}
          className={`${pageName === item.label.toLowerCase() ? "bg-primary/[.07] text-primary dark:bg-white/10 dark:text-white" : "text-dark-4 hover:bg-gray-2 hover:text-dark dark:text-gray-5 dark:hover:bg-white/10 dark:hover:text-white"} group relative flex items-center gap-3 rounded-[7px] px-3.5 py-3 font-medium duration-300 ease-in-out`}
        >
        <div className="flex items-center space-x-3">
          {item.icon && (
            <span className="text-blue-600">{item.icon}</span>
          )}
          <span className="text-sm font-medium text-blue-900">{item.label}</span>
          
          {item.message && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              {item.message}
            </span>
          )}
          
          {item.pro && (
            <span className="ml-2 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
              Pro
            </span>
          )}
        </div>
        
        {hasChildren && (
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isActive ? <ChevronDown size={16} className="text-blue-600" /> : <ChevronRight size={16} className="text-blue-600" />}
          </motion.div>
        )}
      </Link>

      {hasChildren && isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1, 
            height: 'auto',
            transition: { 
              duration: 0.3,
              ease: "easeInOut"
            }
          }}
          className="pl-6 mt-2 space-y-2 border-l-2 border-blue-100"
        >
          {item.children?.map((childItem, index) => (
            <SidebarItem 
              key={index} 
              item={childItem} 
              pageName={pageName} 
              setPageName={setPageName} 
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SidebarItem;