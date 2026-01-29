import React, { useEffect, useState } from "react";
import CustomDropdown from "../CustomDropdown";
import { uniqueCountriesList } from "@/utils/constants";

// Country data structure
interface Country {
  id: string;
  name: string;
  icon?: string; // URL to flag image
}

interface CountryDropdownProps {
  id?: string;
  preferredCountries?: string[];
  value?: string;
  onChange: (country: string) => void;
  className?: string;
  inputClass?: string;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  id = "country-dropdown",
  preferredCountries = [],
  value,
  onChange,
  className,
  inputClass,
}) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For this example, we'll use a small sample set
    const fetchCountries = async () => {
      // Sample data - in a real app, fetch this from an API
      const allCountries: Country[] = [
        {
          id: "us",
          name: "United States",
          icon: "https://flagcdn.com/w40/us.png",
        },
        { id: "ca", name: "Canada", icon: "https://flagcdn.com/w40/ca.png" },
        {
          id: "gb",
          name: "United Kingdom",
          icon: "https://flagcdn.com/w40/gb.png",
        },
        { id: "au", name: "Australia", icon: "https://flagcdn.com/w40/au.png" },
        { id: "de", name: "Germany", icon: "https://flagcdn.com/w40/de.png" },
        { id: "fr", name: "France", icon: "https://flagcdn.com/w40/fr.png" },
        { id: "jp", name: "Japan", icon: "https://flagcdn.com/w40/jp.png" },
        { id: "cn", name: "China", icon: "https://flagcdn.com/w40/cn.png" },
        { id: "in", name: "India", icon: "https://flagcdn.com/w40/in.png" },
        { id: "br", name: "Brazil", icon: "https://flagcdn.com/w40/br.png" },
      ];

      // Sort countries: preferred countries first, then the rest alphabetically
      const sortedCountries = [...uniqueCountriesList].sort((a, b) => {
        const aPreferred = preferredCountries.includes(a.id);
        const bPreferred = preferredCountries.includes(b.id);

        if (aPreferred && !bPreferred) return -1;
        if (!aPreferred && bPreferred) return 1;
        return a.name.localeCompare(b.name);
      });

      setCountries(sortedCountries);
    };

    fetchCountries();
  }, [preferredCountries]);

  const handleSelected = (countryId: string | number | null) => {
    if (countryId) {
      onChange(countryId.toString());
    }
  };

  return (
    <CustomDropdown
      id={id}
      dataList={countries}
      selectedOption={value}
      onSelected={handleSelected}
      placeholder="Select a country"
      canSearch={true}
      className={className}
      inputClass={inputClass}
    />
  );
};

export default CountryDropdown;
