import React, { useState, useEffect, useMemo } from "react";

interface DropdownOption {
  id: string | number | null;
  name?: string | number;
  icon?: string;
}

interface DropdownProps {
  dataList: DropdownOption[];
  selectedOption?: string | number;
  canSearch?: boolean;
  textStyle?: React.CSSProperties;
  placeholder?: string;
  hideScrollLimit?: number;
  onSelected: (id: string | number | null) => void;
  id?: string;
  className?: string;
  inputClass?: string;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  dataList,
  selectedOption,
  canSearch = false,
  textStyle = {},
  placeholder = "Select an option",
  hideScrollLimit = 6,
  onSelected,
  id,
  className,
  inputClass,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentOption, setCurrentOption] = useState<string | number | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const currentList = useMemo(() => {
    if (!canSearch) return dataList;
    return dataList.filter(
      (opt) =>
        opt?.name
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        opt?.id?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dataList, searchTerm, canSearch]);

  const selectedName = useMemo(() => {
    return (
      dataList.find((opt) => opt.id === currentOption) || {
        id: "",
        name: placeholder,
        icon: undefined,
      }
    );
  }, [dataList, currentOption, placeholder]);

  const handleSelected = (option: DropdownOption) => {
    setCurrentOption(option.id);
    if (canSearch) setSearchTerm(option.name?.toString() || "");
    setIsOpen(false);
    if (option.id !== undefined) {
      onSelected(option.id);
    }
  };

  const hideScroll = useMemo(() => {
    return currentList.length < (hideScrollLimit || 6);
  }, [currentList, hideScrollLimit]);

  useEffect(() => {
    if (selectedOption) {
      const item = dataList.filter(
        (opt) => opt.name === selectedOption || opt.id === selectedOption
      );
      if (item.length > 0) {
        setCurrentOption(item[0].id);
        setSearchTerm(String(item[0].name ? item[0].name : item[0].id));
      }
    }
  }, [selectedOption, dataList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById(`dropdown-${id || "main"}`);
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  return (
    <div
      className={`relative w-full ${className}`}
      id={`dropdown-${id || "main"}`}
    >
      {canSearch ? (
        <input
          required
          type="text"
          className={`form-control w-full py-2 px-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            inputClass || ""
          }`}
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <button
          className="w-full flex items-center justify-between py-2 px-4 rounded border bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex gap-2 items-center truncate">
            {selectedName.icon && (
              <img
                src={selectedName.icon}
                alt=""
                className="w-[30px] h-[30px]"
              />
            )}
            <span>{selectedName.name}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}

      {isOpen && (
        <ul
          className={`absolute z-10 w-full mt-1 bg-white border rounded shadow-sm ${
            hideScroll ? "overflow-hidden" : "overflow-y-auto max-h-[300px]"
          }`}
        >
          {currentList.map((option, index) => (
            <li
              key={index}
              className="border-b cursor-pointer hover:bg-gray-50"
              onClick={() => handleSelected(option)}
            >
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={textStyle}
              >
                {option.icon && (
                  <img src={option.icon} alt="" className="w-[30px] h-[30px]" />
                )}
                <span>{option?.name ?? option.id}</span>
              </div>
            </li>
          ))}
          {currentList.length === 0 && (
            <li className="px-4 py-3 text-gray-500">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
