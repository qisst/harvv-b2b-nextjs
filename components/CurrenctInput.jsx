import { useState } from "react";

const CurrencyInput = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const currencies = {
    USD: { symbol: "$", flag: "https://flagcdn.com/us.svg" },
    EUR: { symbol: "€", flag: "https://flagcdn.com/eu.svg" },
    GBP: { symbol: "£", flag: "https://flagcdn.com/gb.svg" },
    JPY: { symbol: "¥", flag: "https://flagcdn.com/jp.svg" },
  };

  // Handle amount input with commas
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const formattedValue = new Intl.NumberFormat("en-US").format(value); // Add commas
    setAmount(formattedValue);
  };

  return (
    <div className="w-full max-w-md">
      <label
        htmlFor="currency-input"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Annual Revenue <span className="text-gray-400">(Optional)</span>
      </label>
      <div className="relative flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        {/* Currency Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500">{currencies[currency].symbol}</span>
        </div>

        {/* Input Field */}
        <input
          type="text"
          id="currency-input"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className="pl-9 pr-16 py-2 w-full text-gray-900 text-sm rounded-lg focus:outline-none"
        />

        {/* Dropdown with Flags */}
        <div className="absolute inset-y-0 right-0 flex items-center">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="h-full py-0 pl-3 pr-8 text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer"
          >
            {Object.keys(currencies).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          <img
            src={currencies[currency].flag}
            alt={`${currency} flag`}
            className="absolute right-1 w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;
