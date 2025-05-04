import React, { useCallback, useState } from "react";
import arrowIcon from "../../../public/icon-arrow.svg";
import Image from "next/image";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearchClick: () => void;
};

const ipRegex =
  /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;

const SearchBar = ({ value, onChange, onSearchClick }: SearchBarProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleClick = useCallback(() => {
    if (!ipRegex.test(value)) {
      setError("Please enter a valid IP address");
    } else {
      setError(null);
      onSearchClick();
    }
  }, [value]);

  return (
    <div>
      <div className="mr-12">
        <input
          className="border-0 rounded-l-xl p-3 text-black bg-white w-64 md:w-md"
          placeholder="Search for any IP address or domain"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="absolute top-14 bg-black w-12 rounded-r-xl h-12 cursor-pointer"
          onClick={handleClick}
        >
          <Image className="m-auto" src={arrowIcon} alt="arrow" />
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
