import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

export default function CustomDropdown({
  title,
  options = [],
  onChange,
  selectedValue,
  isMultiple = false,
  disabled = false, // Add disabled prop
}) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(selectedValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(selectedValue);
  }, [selectedValue]);

  const handleOptionClick = (opt) => {
  
    if (disabled) return; // Prevent option click when disabled
    if (isMultiple) {
      const isSelected = selected
        ? selected?.some((item) =>
            item.id ? item.id === opt.id : item === opt.id
          )
        : false;
      let newSelected;
      if (isSelected) {
        newSelected = selected?.filter((item) =>
          item.id ? item.id !== opt.id : item !== opt.id
        );
      } else {
        newSelected = [...selected, opt];
      }
      setSelected(newSelected);
      setInputValue("");
      onChange(newSelected.map((item) => item.id)); // Return selected ids
    } else {
      setSelected(opt.id);
      setOpen(false);
      setInputValue("");
      onChange(opt.id); // Return selected id
    }
  };

  const displayText = () => {
    if (isMultiple) {
      return selected?.length
        ? selected
            .map((item) => item.name)
            .join(", ")
            .substring(0, 25)
        : `Select ${title}`;
    } else {
      return selected
        ? options?.filter((opt) => opt.id === selected)[0]?.name
        : `Select ${title}`;
    }
  };

  return (
    <div
      className={`font-medium ${disabled && "opacity-50 cursor-not-allowed"}`}
    >
      <div
        onClick={() => !disabled && setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          isMultiple
            ? !selected?.length && "text-gray-700"
            : !selected?.name && "text-gray-700"
        } ${disabled && "bg-gray-200"}`}
      >
        {displayText()}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } ${disabled && "pointer-events-none"}`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder={`Enter ${title}`}
            className="placeholder:text-gray-700 p-2 outline-none"
            disabled={disabled} // Disable input when dropdown is disabled
          />
        </div>
        {options?.map((opt) => (
          <li
            key={opt?.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                isMultiple
                  ? selected?.some((item) => item.id === opt.id) &&
                    "bg-sky-600 text-white"
                  : selected?.id === opt.id && "bg-sky-600 text-white"
              }
              ${
                opt?.name?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
            onClick={() => handleOptionClick(opt)}
          >
            {opt?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
