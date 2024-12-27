import React, { useEffect, useState, useRef } from "react";
import HarvvLogo from "@/public/logo/logo_harvv.png";
import onboardingImage from "@/public/images/onboarding-icon.png";
import QBLogo from "@/public/images/logo-qb.png";
import PlaidLogo from "@/public/images/logo-plaid.png";
import LogoQBOdoo from "@/public/images/logo-qb-odoo.png";
import Images from "@/public/images/sign-up-images.png";
import ReCAPTCHA from "react-google-recaptcha";
import Tooltip from "@mui/material/Tooltip";
import { MuiOtpInput } from "mui-one-time-password-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import clsx from "classnames";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import VerticalProgressBar from "@/components/Steps";
import OnboardingStatus from "@/components/Steps";
import VerticalLinearStepper from "@/components/Steps";
import CustomStepper from "@/components/Steps";

function Onboarding() {
  const currencyOptions = [
    {
      value: "USD",
      label: "USD",
      symbol: "$",
      flag: "https://flagcdn.com/us.svg",
    },
    {
      value: "EUR",
      label: "EUR",
      symbol: "€",
      flag: "https://flagcdn.com/eu.svg",
    },
    {
      value: "GBP",
      label: "GBP",
      symbol: "£",
      flag: "https://flagcdn.com/gb.svg",
    },
    {
      value: "JPY",
      label: "JPY",
      symbol: "¥",
      flag: "https://flagcdn.com/jp.svg",
    },
  ];
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [phone, setPhone] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const autocompleteRef = useRef(null); // Use useRef to store the autocomplete instance
  const libraries = ["places"]; // Include the "places" library
  const [currency, setCurrency] = useState(currencyOptions[0]); // Default to USD
  const [amount, setAmount] = useState("");
  const [currencyMonthly, setCurrencyMonthly] = useState(currencyOptions[0]); // Default to USD
  const [amountMonthly, setAmountMonthly] = useState("");
  const [date, setDate] = useState(null);
  const [taxID, setTaxID] = useState("");
  const [industryDropdownOpen, setIndustryDropdownOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState("Select Industry");
  const [businessTypeDropdownOpen, setBusinessTypeDropdownOpen] =
    useState(false);
  const [selectedBusinessType, setSelectedBusinessType] = useState(
    "Select Business Type"
  );
  const [checked1, setChecked1] = React.useState(false);
  const [checked2, setChecked2] = React.useState(false);
  const [checked3, setChecked3] = React.useState(false);
  const [checked4, setChecked4] = React.useState(false);

  const handleChangeChecked1 = (event) => {
    setChecked1(event.target.checked);
  };
  const handleChangeChecked2 = (event) => {
    setChecked2(event.target.checked);
  };
  const handleChangeChecked3 = (event) => {
    setChecked3(event.target.checked);
  };
  const handleChangeChecked4 = (event) => {
    setChecked4(event.target.checked);
  };

  const toggleIndustryDropdown = () => {
    setIndustryDropdownOpen(!industryDropdownOpen);
  };

  const selectIndustry = (industry) => {
    setSelectedIndustry(industry);
    setIndustryDropdownOpen(false);
  };

  const toggleBusinessTypeDropdown = () => {
    setBusinessTypeDropdownOpen(!businessTypeDropdownOpen);
  };

  const selectBusinessType = (businessType) => {
    setSelectedBusinessType(businessType);
    setBusinessTypeDropdownOpen(false);
  };

  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Retail",
  ];

  const businessTypes = [
    "LLC",
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company",
    "Corporation",
  ];

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedValue =
      value.length > 2 ? `${value.slice(0, 2)}-${value.slice(2, 9)}` : value;
    setTaxID(formattedValue);
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrency = currencyOptions.find(
      (option) => option.value === e.target.value
    );
    setCurrency(selectedCurrency);
  };

  const handleCurrencyChangeMonthly = (e) => {
    const selectedCurrency = currencyOptions.find(
      (option) => option.value === e.target.value
    );
    setCurrencyMonthly(selectedCurrency);
  };

  const formatWithCommas = (value) => {
    const numericValue = value.replace(/[^\d.]/g, ""); // Remove non-numeric characters
    const [integer, decimal] = numericValue.split("."); // Split integer and decimal parts
    const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
    return decimal !== undefined
      ? `${formattedInteger}.${decimal}`
      : formattedInteger;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(formatWithCommas(value));
  };

  const handleAmountChangeMonthly = (e) => {
    const value = e.target.value;
    setAmountMonthly(formatWithCommas(value));
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA_2dI8vYCq13R5i-__U6oIog1Xon63jhA", // Replace with your API key
    libraries,
  });

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    // Initialize variables
    let city = "";
    let state = "";
    let country = "";
    let postalCode = "";

    // Extract components
    if (place.address_components) {
      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) {
          city = component.long_name;
          setCity(city);
        } else if (types.includes("administrative_area_level_1")) {
          state = component.short_name;
          setState(state);
          // }
          // else if (types.includes("country")) {
          //   country = component.long_name;
        } else if (types.includes("postal_code")) {
          postalCode = component.long_name;
          setZipCode(postalCode);
        }
      });
    }

    // Log or use the extracted data
    // console.log({ city, state, country, postalCode });
    // setSelectedAddress(`${city}, ${state}, ${country}, ${postalCode}`);
    setQuery(place.formatted_address || place.name);
  };

  const validatePhone = (value) => {
    const phoneRegex = /^\+?\d{10,14}$/; // Example regex for international numbers
    if (value.match(phoneRegex)) {
      setIsValid(true);
      setError("");
    } else {
      setIsValid(false);
      setError("Invalid phone number. Please check and try again.");
    }
  };

  const handleChange = (value, country, e, formattedValue) => {
    console.log(value, country, e, formattedValue);

    setPhone(value);
    validatePhone(value);
  };
  return (
    <div className="bg-white w-full md:h-screen flex justify-start items-center flex-col">
      <div className="w-full border-b-[1px] border-[#F2F4F7] gap-3 md:gap-0 flex justify-between items-center flex-col md:flex-row py-5 px-5 md:py-5 md:px-11">
        <div className="w-full flex justify-center md:justify-start items-center">
          <img
            src={HarvvLogo.src}
            loading="lazy"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>
        <div className="w-full hidden md:flex justify-center md:justify-end items-center flex-col md:flex-row gap-3">
          <div className="w-full hidden md:flex md:w-auto text-center nav-switch-text">
            Already have an account?
          </div>
          <button className="w-full md:w-auto nav-switch-button text-center">
            Login
          </button>
        </div>
      </div>
      <div className="bg-white w-full h-full md:overflow-hidden flex justify-start items-center flex-col md:flex-row">
        <div className="lg:w-3/4 bg-[#F6F8FA] h-full overflow-auto gap-5 w-full flex justify-start items-center flex-col">
          <div className="w-full h-full overflow-auto gap-3 md:gap-0 flex justify-start items-start flex-col px-5 py-5 lg:px-20 lg:py-10">
            <div className="w-full gap-5 flex justify-center md:justify-start items-center flex-col md:flex-row">
              <img
                src={onboardingImage.src}
                loading="lazy"
                alt="Image"
                className="h-[88px] w-[88px]"
              />
              <div className="ob-text w-full text-center md:text-start">
                Business Credit Application
              </div>
            </div>

            <div className="w-full bg-[#EBF1FF] rounded-xl p-4 gap-2 md:gap-3 mt-5 flex justify-center md:justify-start items-center md:items-start flex-col md:flex-row">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25 9.25V13.75H10.75V9.25H9.25ZM9.25 6.25V7.75H10.75V6.25H9.25Z"
                    fill="#375DFB"
                  />
                </svg>
              </div>
              <div className="w-full flex gap-2 md:gap-0 flex-col justify-center items-center md:justify-start md:items-start">
                <div className="w-full ob-instruction-text text-center md:text-start">
                  Instructions:
                </div>
                <div className="w-full ob-instruction-sub-text text-center md:text-start">
                  Please complete all fields in this application and submit
                  along with the required documents listed in Section 3.
                  Incomplete applications will delay processing. Send completed
                  application and supporting documents to b2b@harvv.com.
                </div>
              </div>
            </div>

            <div className="mt-5 w-full">
              <div className="space-y-4">
                <div className="p-6 border-[1px] border-[#EAECF0] rounded-2xl bg-[#fff]">
                  <button
                    onClick={() => {
                      setIsOpen2(false);
                      setIsOpen3(false);
                      setIsOpen4(false);
                      setIsOpen1(!isOpen1);
                    }}
                    className="w-full ob-accordion-heading text-left flex justify-between items-center"
                  >
                    <span>1. Contact Information</span>
                    <span>
                      {isOpen1 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.75 9.25H15.25V10.75H4.75V9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen1
                        ? "h-auto pt-5 w-full flex justify-center items-center flex-col"
                        : "h-0 p-0 overflow-hidden"
                    }`}
                  >
                    <div className="w-full flex justify-center items-center flex-col md:flex-row gap-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">First Name</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <input
                          type="text"
                          placeholder="Input first name"
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">Last Name</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <input
                          type="text"
                          placeholder="Input last name"
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                      <div className="w-full text-black flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">Phone Number</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <PhoneInput
                          country={"us"} // Set default country
                          value={phone}
                          onChange={handleChange}
                          //   containerClass="border rounded-md"
                        />
                        {/* {!isValid && (
                          <span className="mt-2 text-sm text-red-500">
                            {error}
                          </span>
                        )} */}
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">Business Email</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <div className="relative w-full sb-form-input-field">
                          {/* Icon */}
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M3.25 3.75H16.75C16.9489 3.75 17.1397 3.82902 17.2803 3.96967C17.421 4.11032 17.5 4.30109 17.5 4.5V15.5C17.5 15.6989 17.421 15.8897 17.2803 16.0303C17.1397 16.171 16.9489 16.25 16.75 16.25H3.25C3.05109 16.25 2.86032 16.171 2.71967 16.0303C2.57902 15.8897 2.5 15.6989 2.5 15.5V4.5C2.5 4.30109 2.57902 4.11032 2.71967 3.96967C2.86032 3.82902 3.05109 3.75 3.25 3.75ZM16 6.9285L10.054 12.2535L4 6.912V14.75H16V6.9285ZM4.38325 5.25L10.0457 10.2465L15.6265 5.25H4.38325Z"
                                fill="#525866"
                              />
                            </svg>
                          </div>

                          {/* Input Field */}
                          <input
                            type="email"
                            placeholder="Input business email"
                            className="w-full pl-8 outline-none bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accordion 2 */}
                <div className="p-6 border-[1px] border-[#EAECF0] rounded-2xl bg-[#fff]">
                  <button
                    onClick={() => {
                      setIsOpen1(false);
                      setIsOpen3(false);
                      setIsOpen4(false);
                      setIsOpen2(!isOpen2);
                    }}
                    className="w-full ob-accordion-heading text-left flex justify-between items-center"
                  >
                    <span>2. Business Information</span>
                    <span>
                      {isOpen2 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.75 9.25H15.25V10.75H4.75V9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen2
                        ? "h-auto pt-5 w-full flex justify-center items-center flex-col"
                        : "h-0 p-0 overflow-hidden"
                    }`}
                  >
                    <div className="w-full flex justify-center items-center">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">
                            DBA (Doing Business As)
                          </div>
                          <div className="ob-required-start">*</div>
                        </div>
                        {/* Input Field */}
                        <input
                          type="text"
                          placeholder="Input name your business operation"
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-center items-center mt-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">Address</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        {isLoaded && (
                          <>
                            <Autocomplete
                              onLoad={(autocompleteInstance) =>
                                (autocompleteRef.current = autocompleteInstance)
                              }
                              onPlaceChanged={handlePlaceSelect}
                              className="w-full"
                            >
                              <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Enter your address"
                                className="sb-form-input-field w-full outline-none"
                              />
                            </Autocomplete>
                            {selectedAddress && (
                              <div className="selected-address">
                                Selected Address: {selectedAddress}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="w-full  mt-4 flex justify-center items-center flex-col md:flex-row gap-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">City</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                          placeholder="Input your city"
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">State</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value);
                          }}
                          placeholder="Input your state"
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">ZIP</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => {
                            setZipCode(e.target.value);
                          }}
                          placeholder="Input your zip"
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                    </div>

                    <div className="w-full mt-4 flex justify-center items-center flex-col md:flex-row gap-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full gap-1 flex justify-start items-start">
                          <div className="sb-form-label">Annual Revenue</div>
                          <div className="sb-form-optional-text">
                            (Optional)
                          </div>
                        </div>
                        <div className="currency-input-container">
                          {/* Input Field */}
                          <input
                            type="text"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0.00"
                            className="w-full outline-none sb-form-input-field"
                          />

                          {/* Currency Symbol */}
                          <span>{currency.symbol}</span>
                          {/* <img
                            src={currency.flag}
                            className="absolute right-5 top-6 z-50 rounded-full h-8 w-8"
                          /> */}

                          {/* Currency Dropdown */}
                          <select
                            value={currency.value}
                            onChange={handleCurrencyChange}
                            className="px-5 py-2 cursor-pointer"
                          >
                            {currencyOptions.map((option) => (
                              <option
                                className="cursor-pointer"
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full gap-1 flex justify-start items-start">
                          <div className="sb-form-label">Monthly Expense</div>
                          <div className="sb-form-optional-text">
                            (Optional)
                          </div>
                        </div>
                        <div className="currency-input-container">
                          {/* Input Field */}
                          <input
                            type="text"
                            value={amountMonthly}
                            onChange={handleAmountChangeMonthly}
                            placeholder="0.00"
                            className="w-full outline-none sb-form-input-field"
                          />

                          {/* Currency Symbol */}
                          <span>{currencyMonthly.symbol}</span>

                          {/* Currency Dropdown */}
                          <select
                            value={currencyMonthly.value}
                            onChange={handleCurrencyChangeMonthly}
                            className="px-5 py-2"
                          >
                            {currencyOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="w-full mt-4 flex justify-center items-center flex-col md:flex-row gap-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full gap-1 flex justify-start items-start">
                          <div className="sb-form-label">Tax ID</div>
                          <div className="sb-form-optional-text">
                            (Optional)
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter Tax ID"
                          value={taxID}
                          onChange={handleInputChange}
                          maxLength={10} // 9 digits + 1 hyphen
                          className="w-full sb-form-input-field outline-none"
                        />
                      </div>
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">
                            Business Registration Date
                          </div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{
                              "& .MuiInputBase-root": {
                                color: "#0a0d14",
                                fontWeight: "400",
                                border: "none",
                              },
                              "& .MuiIconButton-label": {
                                color: "white",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none !important",
                                color: "#0a0d14",
                                fontWeight: "400",
                              },
                              "& .css-1dune0f-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                  padding: "7.1px 8px 6px 10px",
                                  color: "#0a0d14",
                                  fontWeight: "400",
                                },
                              "& .MuiButtonBase-root": {
                                color: "#0a0d14",
                                border: "none",
                              },
                              width: "100%",
                              color: "#0a0d14",
                              background: "#fff",
                              fontWeight: "400",
                              border: "1px solid #e2e4e9",
                              borderRadius: "8px",
                            }}
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>

                    <div className="w-full mt-4 flex justify-center items-center flex-col md:flex-row gap-4">
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">Industry</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <div className="relative w-full">
                          {/* Dropdown Button */}
                          <button
                            className={`w-full ${
                              selectedIndustry === "Select Industry"
                                ? "text-[#9ca3af]"
                                : "text-[#0a0d14]"
                            } dropdown-industry-input-field flex justify-between items-center outline-none`}
                            onClick={toggleIndustryDropdown}
                          >
                            {selectedIndustry}
                            <span>
                              {industryDropdownOpen ? (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.99956 9.121L6.28706 12.8335L5.22656 11.773L9.99956 7L14.7726 11.773L13.7121 12.8335L9.99956 9.121Z"
                                      fill="#0A0D14"
                                    />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M10.0001 10.8785L13.7126 7.16602L14.7731 8.22652L10.0001 12.9995L5.22705 8.22652L6.28755 7.16602L10.0001 10.8785Z"
                                      fill="#0A0D14"
                                    />
                                  </svg>
                                </>
                              )}
                            </span>
                            {/* Down arrow */}
                          </button>

                          {/* Dropdown Menu */}
                          {industryDropdownOpen && (
                            <ul className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg">
                              {industries.map((industry, index) => (
                                <li
                                  key={index}
                                  className="px-4 py-2 rounded-lg cursor-pointer dropdown-industry hover:bg-gray-100"
                                  onClick={() => selectIndustry(industry)}
                                >
                                  {industry}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div className="w-full flex gap-1 justify-start items-center flex-col">
                        <div className="w-full flex justify-start items-start">
                          <div className="sb-form-label">Business Type</div>
                          <div className="ob-required-start">*</div>
                        </div>
                        <div className="relative w-full">
                          {/* Dropdown Button */}
                          <button
                            className={`w-full ${
                              selectedBusinessType === "Select Business Type"
                                ? "text-[#9ca3af]"
                                : "text-[#0a0d14]"
                            } dropdown-industry-input-field flex justify-between items-center outline-none`}
                            onClick={toggleBusinessTypeDropdown}
                          >
                            {selectedBusinessType}
                            <span>
                              {businessTypeDropdownOpen ? (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M9.99956 9.121L6.28706 12.8335L5.22656 11.773L9.99956 7L14.7726 11.773L13.7121 12.8335L9.99956 9.121Z"
                                      fill="#0A0D14"
                                    />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <path
                                      d="M10.0001 10.8785L13.7126 7.16602L14.7731 8.22652L10.0001 12.9995L5.22705 8.22652L6.28755 7.16602L10.0001 10.8785Z"
                                      fill="#0A0D14"
                                    />
                                  </svg>
                                </>
                              )}
                            </span>
                            {/* Down arrow */}
                          </button>

                          {/* Dropdown Menu */}
                          {businessTypeDropdownOpen && (
                            <ul className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg">
                              {businessTypes.map((type, index) => (
                                <li
                                  key={index}
                                  className="px-4 py-2 rounded-lg cursor-pointer dropdown-industry hover:bg-gray-100"
                                  onClick={() => selectBusinessType(type)}
                                >
                                  {type}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accordion 3 */}
                <div className="p-6 border-[1px] border-[#EAECF0] rounded-2xl bg-[#fff]">
                  <button
                    onClick={() => {
                      setIsOpen1(false);
                      setIsOpen2(false);
                      setIsOpen4(false);
                      setIsOpen3(!isOpen3);
                    }}
                    className="w-full ob-accordion-heading text-left flex justify-between items-center"
                  >
                    <span>3. Required Documents</span>
                    <span>
                      {isOpen3 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.75 9.25H15.25V10.75H4.75V9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen3
                        ? "h-full pt-5 w-full flex justify-center items-center flex-col"
                        : "h-0 p-0 overflow-hidden"
                    }`}
                  >
                    <div className="w-full flex justify-center md:justify-start items-center flex-row">
                      <div className="w-full md:w-3/5 lg:w-2/5 flex gap-2 justify-center items-center flex-row documents-tabs-wrapper">
                        <div
                          onClick={() => {
                            setActiveTab("upload");
                          }}
                          className={`w-full ${
                            activeTab === "upload"
                              ? "documents-tab-active"
                              : "documents-tab-non-active"
                          } cursor-pointer flex justify-center items-center flex-row gap-1`}
                        >
                          <div>Upload Here</div>
                        </div>
                        <div
                          onClick={() => {
                            setActiveTab("email");
                          }}
                          className={`w-full ${
                            activeTab === "email"
                              ? "documents-tab-active"
                              : "documents-tab-non-active"
                          } cursor-pointer flex justify-center items-center flex-row gap-1`}
                        >
                          <div>Send Via Email</div>
                        </div>
                      </div>
                    </div>
                    {activeTab === "upload" && (
                      <>
                        <div className="w-full p-3 rounded-2xl border-[1px] border-[#EAECF0] md:p-6 h-full flex justify-center items-center mt-4">
                          <div className="w-full flex gap-1 justify-start items-center flex-col">
                            <div className="w-full flex justify-start items-start">
                              <div className="sb-form-label">
                                3 Month of Bank Statements
                              </div>
                              <div className="ob-required-start">*</div>
                            </div>
                            <div className="w-full h-full mt-2 gap-4 flex justify-center md:justify-start items-center flex-col md:flex-row">
                              <div className="w-full flex justify-center items-center flex-col documents-wrapper-dotted">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 25 24"
                                  fill="none"
                                >
                                  <path
                                    d="M12.5001 12.5274L16.3188 16.3452L15.0452 17.6187L13.4001 15.9735V21H11.6V15.9717L9.95485 17.6187L8.68135 16.3452L12.5001 12.5274ZM12.5001 3C14.0453 3.00007 15.5367 3.568 16.6906 4.59581C17.8445 5.62361 18.5805 7.03962 18.7587 8.5746C19.8785 8.87998 20.8554 9.56919 21.5186 10.5218C22.1819 11.4744 22.4893 12.6297 22.3871 13.786C22.2849 14.9422 21.7797 16.0257 20.9597 16.8472C20.1396 17.6687 19.057 18.1759 17.901 18.2802V16.4676C18.3151 16.4085 18.7133 16.2674 19.0724 16.0527C19.4314 15.8379 19.7441 15.5539 19.9922 15.217C20.2402 14.8801 20.4187 14.4972 20.5171 14.0906C20.6156 13.6839 20.6321 13.2618 20.5656 12.8488C20.4991 12.4357 20.351 12.0401 20.13 11.6849C19.9089 11.3297 19.6194 11.0221 19.2781 10.78C18.9369 10.538 18.5509 10.3663 18.1426 10.2751C17.7343 10.1838 17.312 10.1748 16.9002 10.2486C17.0411 9.5924 17.0335 8.91297 16.8778 8.2601C16.7222 7.60722 16.4225 6.99743 16.0007 6.47538C15.5789 5.95333 15.0456 5.53225 14.44 5.24298C13.8343 4.9537 13.1717 4.80357 12.5005 4.80357C11.8293 4.80357 11.1667 4.9537 10.561 5.24298C9.95539 5.53225 9.42214 5.95333 9.00031 6.47538C8.57849 6.99743 8.27879 7.60722 8.12315 8.2601C7.96752 8.91297 7.9599 9.5924 8.10085 10.2486C7.27974 10.0944 6.43101 10.2727 5.74136 10.7443C5.05171 11.2159 4.57765 11.9421 4.42345 12.7632C4.26925 13.5843 4.44756 14.433 4.91914 15.1227C5.39072 15.8123 6.11694 16.2864 6.93805 16.4406L7.10005 16.4676V18.2802C5.94396 18.1761 4.86122 17.669 4.04107 16.8476C3.22093 16.0261 2.71555 14.9426 2.61326 13.7863C2.51097 12.6301 2.81828 11.4747 3.48148 10.522C4.14468 9.56934 5.12159 8.88005 6.24145 8.5746C6.41939 7.03954 7.15532 5.62342 8.30927 4.59558C9.46323 3.56774 10.9547 2.99988 12.5001 3Z"
                                    fill="#525866"
                                  />
                                </svg>
                                <div className="documents-heading w-full mt-4 text-center">
                                  Upload Document
                                </div>
                                <div className="documents-sub-heading w-full mt-1 text-center">
                                  PDF, JPEG, PNG, and JPG formats, up to 50 MB.
                                </div>
                                <button className="documents-button w-full md:w-auto mt-4 text-center">
                                  Browse
                                </button>
                              </div>
                              <div className="h-full w-full md:w-auto flex justify-around items-center flex-row md:flex-col gap-3">
                                <div className="md:h-16 md:w-[1px] h-[1px] w-full bg-[#E2E4E9]"></div>
                                <div className="sb-form-or-text">OR</div>
                                <div className="md:h-16 md:w-[1px] h-[1px] w-full bg-[#E2E4E9]"></div>
                              </div>
                              <div className="w-full flex justify-center items-center flex-col documents-wrapper-normal">
                                <div className="w-ful flex justify-center items-center">
                                  <img
                                    src={PlaidLogo.src}
                                    loading="lazy"
                                    alt="Logo"
                                    className="w-10 h-10"
                                  />
                                </div>
                                <div className="documents-heading w-full mt-4 text-center">
                                  Connect Plaid
                                </div>
                                <div className="documents-sub-heading w-full mt-1 text-center">
                                  Securely link your bank for payouts and
                                  payment processing.
                                </div>
                                <button className="documents-button w-full md:w-auto mt-4 text-center">
                                  Connect
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <div className="w-full flex mt-5 justify-center items-center flex-row">
                          <div className="h-[1px] w-full bg-[#E2E4E9]"></div>
                        </div> */}

                        <div className="p-3 mt-5 rounded-2xl border-[1px] border-[#EAECF0] md:p-6 w-full flex justify-center items-center flex-col">
                          <div className="w-full flex gap-4 justify-center items-center flex-col md:flex-row">
                            <div className="w-full flex gap-1 justify-start items-center flex-col">
                              <div className="w-full flex justify-start items-start">
                                <div className="sb-form-label">
                                  Balance Sheet
                                </div>
                                <div className="ob-required-start">*</div>
                              </div>
                              <div className="w-full h-full mt-2 gap-4 flex justify-center md:justify-start items-center flex-col md:flex-row">
                                <div className="w-full flex justify-center items-center flex-col documents-wrapper-dotted">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12.5001 12.5274L16.3188 16.3452L15.0452 17.6187L13.4001 15.9735V21H11.6V15.9717L9.95485 17.6187L8.68135 16.3452L12.5001 12.5274ZM12.5001 3C14.0453 3.00007 15.5367 3.568 16.6906 4.59581C17.8445 5.62361 18.5805 7.03962 18.7587 8.5746C19.8785 8.87998 20.8554 9.56919 21.5186 10.5218C22.1819 11.4744 22.4893 12.6297 22.3871 13.786C22.2849 14.9422 21.7797 16.0257 20.9597 16.8472C20.1396 17.6687 19.057 18.1759 17.901 18.2802V16.4676C18.3151 16.4085 18.7133 16.2674 19.0724 16.0527C19.4314 15.8379 19.7441 15.5539 19.9922 15.217C20.2402 14.8801 20.4187 14.4972 20.5171 14.0906C20.6156 13.6839 20.6321 13.2618 20.5656 12.8488C20.4991 12.4357 20.351 12.0401 20.13 11.6849C19.9089 11.3297 19.6194 11.0221 19.2781 10.78C18.9369 10.538 18.5509 10.3663 18.1426 10.2751C17.7343 10.1838 17.312 10.1748 16.9002 10.2486C17.0411 9.5924 17.0335 8.91297 16.8778 8.2601C16.7222 7.60722 16.4225 6.99743 16.0007 6.47538C15.5789 5.95333 15.0456 5.53225 14.44 5.24298C13.8343 4.9537 13.1717 4.80357 12.5005 4.80357C11.8293 4.80357 11.1667 4.9537 10.561 5.24298C9.95539 5.53225 9.42214 5.95333 9.00031 6.47538C8.57849 6.99743 8.27879 7.60722 8.12315 8.2601C7.96752 8.91297 7.9599 9.5924 8.10085 10.2486C7.27974 10.0944 6.43101 10.2727 5.74136 10.7443C5.05171 11.2159 4.57765 11.9421 4.42345 12.7632C4.26925 13.5843 4.44756 14.433 4.91914 15.1227C5.39072 15.8123 6.11694 16.2864 6.93805 16.4406L7.10005 16.4676V18.2802C5.94396 18.1761 4.86122 17.669 4.04107 16.8476C3.22093 16.0261 2.71555 14.9426 2.61326 13.7863C2.51097 12.6301 2.81828 11.4747 3.48148 10.522C4.14468 9.56934 5.12159 8.88005 6.24145 8.5746C6.41939 7.03954 7.15532 5.62342 8.30927 4.59558C9.46323 3.56774 10.9547 2.99988 12.5001 3Z"
                                      fill="#525866"
                                    />
                                  </svg>
                                  <div className="documents-heading w-full mt-4 text-center">
                                    Upload Document
                                  </div>
                                  <div className="documents-sub-heading w-full mt-1 text-center">
                                    PDF, JPEG, PNG, and JPG formats, up to 50
                                    MB.
                                  </div>
                                  <button className="documents-button w-full md:w-auto mt-4 text-center">
                                    Browse
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="w-full flex gap-1 justify-start items-center flex-col">
                              <div className="w-full flex justify-start items-start">
                                <div className="sb-form-label">
                                  Profit and Loss Statement
                                </div>
                                <div className="ob-required-start">*</div>
                              </div>
                              <div className="w-full h-full mt-2 gap-4 flex justify-center md:justify-start items-center flex-col md:flex-row">
                                <div className="w-full flex justify-center items-center flex-col documents-wrapper-dotted">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 25 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12.5001 12.5274L16.3188 16.3452L15.0452 17.6187L13.4001 15.9735V21H11.6V15.9717L9.95485 17.6187L8.68135 16.3452L12.5001 12.5274ZM12.5001 3C14.0453 3.00007 15.5367 3.568 16.6906 4.59581C17.8445 5.62361 18.5805 7.03962 18.7587 8.5746C19.8785 8.87998 20.8554 9.56919 21.5186 10.5218C22.1819 11.4744 22.4893 12.6297 22.3871 13.786C22.2849 14.9422 21.7797 16.0257 20.9597 16.8472C20.1396 17.6687 19.057 18.1759 17.901 18.2802V16.4676C18.3151 16.4085 18.7133 16.2674 19.0724 16.0527C19.4314 15.8379 19.7441 15.5539 19.9922 15.217C20.2402 14.8801 20.4187 14.4972 20.5171 14.0906C20.6156 13.6839 20.6321 13.2618 20.5656 12.8488C20.4991 12.4357 20.351 12.0401 20.13 11.6849C19.9089 11.3297 19.6194 11.0221 19.2781 10.78C18.9369 10.538 18.5509 10.3663 18.1426 10.2751C17.7343 10.1838 17.312 10.1748 16.9002 10.2486C17.0411 9.5924 17.0335 8.91297 16.8778 8.2601C16.7222 7.60722 16.4225 6.99743 16.0007 6.47538C15.5789 5.95333 15.0456 5.53225 14.44 5.24298C13.8343 4.9537 13.1717 4.80357 12.5005 4.80357C11.8293 4.80357 11.1667 4.9537 10.561 5.24298C9.95539 5.53225 9.42214 5.95333 9.00031 6.47538C8.57849 6.99743 8.27879 7.60722 8.12315 8.2601C7.96752 8.91297 7.9599 9.5924 8.10085 10.2486C7.27974 10.0944 6.43101 10.2727 5.74136 10.7443C5.05171 11.2159 4.57765 11.9421 4.42345 12.7632C4.26925 13.5843 4.44756 14.433 4.91914 15.1227C5.39072 15.8123 6.11694 16.2864 6.93805 16.4406L7.10005 16.4676V18.2802C5.94396 18.1761 4.86122 17.669 4.04107 16.8476C3.22093 16.0261 2.71555 14.9426 2.61326 13.7863C2.51097 12.6301 2.81828 11.4747 3.48148 10.522C4.14468 9.56934 5.12159 8.88005 6.24145 8.5746C6.41939 7.03954 7.15532 5.62342 8.30927 4.59558C9.46323 3.56774 10.9547 2.99988 12.5001 3Z"
                                      fill="#525866"
                                    />
                                  </svg>
                                  <div className="documents-heading w-full mt-4 text-center">
                                    Upload Document
                                  </div>
                                  <div className="documents-sub-heading w-full mt-1 text-center">
                                    PDF, JPEG, PNG, and JPG formats, up to 50
                                    MB.
                                  </div>
                                  <button className="documents-button w-full md:w-auto mt-4 text-center">
                                    Browse
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="w-full mt-4 flex justify-around items-center flex-row gap-3">
                            <div className="h-[1px] w-full bg-[#E2E4E9]"></div>
                            <div className="sb-form-or-text">OR</div>
                            <div className="h-[1px] w-full bg-[#E2E4E9]"></div>
                          </div>

                          <div className="w-full mt-4 flex justify-center items-center flex-col documents-wrapper-normal">
                            <div className="w-ful flex justify-center items-center">
                              <img
                                src={LogoQBOdoo.src}
                                loading="lazy"
                                alt="Logo"
                                className="w-12 h-12"
                              />
                            </div>
                            <div className="documents-heading w-full mt-4 text-center">
                              Connect QuickBooks/Odoo
                            </div>
                            <div className="documents-sub-heading w-full mt-1 text-center">
                              This helps automate invoicing and accounting.
                            </div>
                            <button className="documents-button w-full md:w-auto mt-4 text-center">
                              Connect
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {activeTab === "email" && (
                      <>
                        <div className="w-full mt-4 gap-2 md:gap-0 flex justify-between items-center flex-col tab-send-email-text-wrapper lg:flex-row">
                          <div className="w-full md:w-auto text-center tab-send-email-text">
                            Send completed application and supporting documents
                            to b2b@harvv.com
                          </div>
                          <Link
                            href="mailto:b2b@harvv.com"
                            className="w-full md:w-auto text-center tab-send-email-button"
                          >
                            Send Document
                          </Link>
                        </div>

                        <div className="w-full flex justify-center items-center flex-col mt-4">
                          <div className="w-full mt-[-1%] flex justify-start items-center flex-row">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#E2E4E9",
                                    "&.Mui-checked": {
                                      color: "#375DFB",
                                    },
                                  }}
                                  checked={checked1}
                                  onChange={handleChangeChecked1}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              sx={{
                                color: "#0A0D14",
                                fontFamily: '"Plus Jakarta Sans"',
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "20px",
                                letterSpacing: "-0.084px",
                              }}
                              label="3 Month of Bank Statements"
                            />
                          </div>
                          <div className="w-full mt-[-1%] flex justify-start items-center flex-row">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#E2E4E9",
                                    "&.Mui-checked": {
                                      color: "#375DFB",
                                    },
                                  }}
                                  checked={checked2}
                                  onChange={handleChangeChecked2}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              sx={{
                                color: "#0A0D14",
                                fontFamily: '"Plus Jakarta Sans"',
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "20px",
                                letterSpacing: "-0.084px",
                              }}
                              label="Profit and Loss Statement"
                            />
                          </div>
                          <div className="w-full mt-[-1%] flex justify-start items-center flex-row">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  sx={{
                                    color: "#E2E4E9",
                                    "&.Mui-checked": {
                                      color: "#375DFB",
                                    },
                                  }}
                                  checked={checked3}
                                  onChange={handleChangeChecked3}
                                  inputProps={{ "aria-label": "controlled" }}
                                />
                              }
                              sx={{
                                color: "#0A0D14",
                                fontFamily: '"Plus Jakarta Sans"',
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: "500",
                                lineHeight: "20px",
                                letterSpacing: "-0.084px",
                              }}
                              label="Balance Sheet"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Accordion 4 */}
                <div className="p-6 border-[1px] border-[#EAECF0] rounded-2xl bg-[#fff]">
                  <button
                    onClick={() => {
                      setIsOpen1(false);
                      setIsOpen3(false);
                      setIsOpen2(false);
                      setIsOpen4(!isOpen4);
                    }}
                    className="w-full ob-accordion-heading text-left flex justify-between items-center"
                  >
                    <span>4. Authorization and Agreement</span>
                    <span>
                      {isOpen4 ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M4.75 9.25H15.25V10.75H4.75V9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                              fill="#525866"
                            />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen4
                        ? "h-auto pt-5 w-full flex justify-center items-center flex-col"
                        : "h-0 p-0 overflow-hidden"
                    }`}
                  >
                    <div className="w-full mt-[-0.5%] flex justify-start items-center flex-row">
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: "#E2E4E9",
                              "&.Mui-checked": {
                                color: "#375DFB",
                              },
                            }}
                            checked={checked4}
                            onChange={handleChangeChecked4}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        sx={{
                          color: "#0A0D14",
                          fontFamily: '"Plus Jakarta Sans"',
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: "400",
                          lineHeight: "20px",
                          letterSpacing: "-0.084px",
                        }}
                        label="By signing below, I certify that:"
                      />
                    </div>

                    <div className="w-full mt-3 flex justify-center items-center flex-col gap-2">
                      <div className="terms-and-conditions-text w-full text-start">
                        1. I am authorized to apply for business credit on
                        behalf of the applicant business.
                      </div>
                      <div className="terms-and-conditions-text w-full text-start">
                        2. The information provided in this application is
                        complete and accurate.
                      </div>
                      <div className="terms-and-conditions-text w-full text-start">
                        3. I authorize Harvv, Inc. to obtain business and
                        personal credit reports and to contact the references
                        listed above.
                      </div>
                      <div className="terms-and-conditions-text w-full text-start">
                        4. I have read, understood, and agree to Harvv's
                        <span>
                          <Link
                            target="_blank"
                            href="https://harvv.com/terms-and-conditions"
                            className="terms-hyperlink mx-1"
                          >
                            Terms of Service
                          </Link>
                        </span>
                        and
                        <span>
                          <Link
                            target="_blank"
                            href="https://harvv.com/privacy-policy"
                            className="terms-hyperlink ms-1"
                          >
                            Privacy Policy
                          </Link>
                        </span>
                        .
                      </div>
                      <div className="terms-and-conditions-text w-full text-start">
                        5. I understand that Harvv requires routing 100% of GMV
                        through their platform to qualify for net terms
                        invoicing, and maintaining a minimum of 80% GMV for
                        continued eligibility.
                      </div>
                      <div className="terms-and-conditions-text w-full text-start">
                        6. I acknowledge that this application is subject to
                        approval by Harvv, Inc., and that additional information
                        may be required.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 w-full gap-3 flex justify-center md:justify-end items-center flex-col md:flex-row">
              <button className="sb-form-cancel-button w-full md:w-36">
                Cancel
              </button>
              <button className="sb-form-submit-button w-full md:w-36">
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:w-1/4 w-full px-5 py-5 lg:py-10 lg:px-5 text-black justify-start items-start h-full overflow-hidden">
          <CustomStepper />
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
