import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';

const FilterDropdown = ({ data = [], onFilter = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter(i => i !== item)
      : [...selectedItems, item];
    
    setSelectedItems(newSelection);
    onFilter(newSelection);
  };

  const handleRemoveItem = (item) => {
    const newSelection = selectedItems.filter(i => i !== item);
    setSelectedItems(newSelection);
    onFilter(newSelection);
  };

  // Add null check before filtering
  const filteredData = Array.isArray(data) 
    ? data.filter(item => 
        item?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="relative z-10">
      {/* Main Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50"
      >
        <span>Filter Names</span>
      </button>

      {/* Selected Items Tags */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedItems.map(item => (
            <span
              key={item}
              className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {item}
              <button
                onClick={() => handleRemoveItem(item)}
                className="p-0.5 hover:bg-blue-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-64 mt-2 bg-white border rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search names..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Scrollable List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredData.length > 0 ? (
              filteredData.map(item => (
                <div
                  key={item}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => {}}
                    className="w-4 h-4 mr-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>{item}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">
                {searchTerm ? 'No matching items' : 'No items available'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Example usage
const ExampleUsage = () => {
  const sampleNames = ["John Doe", "Jane Smith", "Bob Johnson", "Alice Brown", "Charlie Wilson"];
  
  const handleFilter = (selectedNames) => {
    console.log('Selected names:', selectedNames);
    // Add your filtering logic here
  };

  return (
    <FilterDropdown 
      data={sampleNames}
      onFilter={handleFilter}
    />
  );
};

export default ExampleUsage;