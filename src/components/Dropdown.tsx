import { useState } from "react";

interface DropdownProps {
  onFilterChange: (value: string) => void; // Callback to pass filterValue to parent
}

export const Dropdown: React.FC<DropdownProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("branded");

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleFilterChange = (value: string) => {
    setFilterValue(value); // Update the local state
    onFilterChange(value); // Notify the parent about the change
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative inline-flex">
      {/* Dropdown Button */}
      <button
        id="hs-dropdown-default"
        type="button"
        onClick={toggleDropdown}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-slate-500 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Dropdown"
      >
        {filterValue}
        <svg
          className={`hs-dropdown-open:rotate-180 size-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
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

      {/* Dropdown Menu */}
      <div
        className={`hs-dropdown-menu transition-[opacity,margin] duration-200 ${
          isOpen ? "opacity-100 mt-2 absolute top-12" : "opacity-0 hidden"
        } min-w-60 bg-white border border-slate-500 rounded-lg dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="hs-dropdown-default"
      >
        <div className="p-1 space-y-0.5">
          <button
            onClick={() => handleFilterChange("branded")}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
          >
            Branded
          </button>
          <button
            onClick={() => handleFilterChange("common")}
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
          >
            Common
          </button>
        </div>
      </div>
    </div>
  );
};
