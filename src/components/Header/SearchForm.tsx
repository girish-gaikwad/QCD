import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const SearchForm = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <li className="hidden lg:block">
      <form action="https://formbold.com/s/unique_form_id" method="POST">
        <div className="relative w-full max-w-[300px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search 
              className={`
                ${isFocused 
                  ? "text-sky-600 dark:text-sky-300" 
                  : "text-gray-500 dark:text-gray-400"
                } transition-colors duration-200
              `}
              size={20} 
            />
          </div>

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full rounded-full border 
            
            py-1.5 pl-12 pr-5 
            text-[#1e3a8a] 
            focus:outline-none 
            focus:ring-2 focus:[#1e3a8a]
            dark:bg-sky-900/10 
            dark:text-sky-50 
            xl:w-[300px] 
            text-sm 
            placeholder-[#1e3a8a] 
            dark:placeholder-sky-300
            transition-all duration-200"
          />
        </div>
      </form>
    </li>
  );
};

export default SearchForm;