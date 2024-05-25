import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

export default function CustomDropdown({
  title,
  options = [],
  onChange,
  selectedValue,
  isMultiple = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(selectedValue);
  const [open, setOpen] = useState(false);


  const handleOptionClick = (opt) => {
    if (isMultiple) {
      const isSelected = selected.some((item) => item.id === opt.id);
      let newSelected;
      if (isSelected) {
        newSelected = selected.filter((item) => item.id !== opt.id);
      } else {
        newSelected = [...selected, opt];
      }
      setSelected(newSelected);
      setInputValue("");
      onChange(newSelected.map((item) => item.id)); // Seçili id'leri döndür
    } else {
      setSelected(opt.id);
      setOpen(false);
      setInputValue("");
      onChange(opt.id); // Seçili id'yi döndür
    }
  };

  const displayText = () => {
    if (isMultiple) {
      return selected?.length
        ? selected
            .map((item) => item.name)
            .join(", ")
            .substring(0, 25) + "..."
        : `Select ${title}`;
    } else {
      return selected
        ? options?.filter((opt) => opt.id === selected)[0]?.name
        : `Select ${title}`;
    }
  };

  return (
    <div className="font-medium">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          isMultiple
            ? !selected?.length && "text-gray-700"
            : !selected?.name && "text-gray-700"
        }`}
      >
        {displayText()}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder={`Enter ${title}`}
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {options?.map((opt) => (
          <li
            key={opt?.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                isMultiple
                  ? selected.some((item) => item.id === opt.id) &&
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
