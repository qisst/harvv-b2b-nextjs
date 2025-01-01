import React, { useEffect, useState, useRef } from "react";
import HarvvLogo from "@/public/logo/logo_harvv.png";
import onboardingImage from "@/public/images/onboarding-icon.png";
import QBLogo from "@/public/images/logo-qb.png";
import PlaidLogo from "@/public/images/logo-plaid.png";
import LogoQBOdoo from "@/public/images/logo-qb-odoo.png";
import LogoHarvv from "@/public/images/harvv-logo-custom.png";
import BurgerMenu from "@/public/images/burger-menu.png";
import Images from "@/public/images/sign-up-images.png";
import ReCAPTCHA from "react-google-recaptcha";
import Tooltip from "@mui/material/Tooltip";
import { MuiOtpInput } from "mui-one-time-password-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import clsx from "classnames";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import dayjs from "dayjs";
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
import { useRouter } from "next/router";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useSelector } from "react-redux";

function Onboarding() {
  const router = useRouter();
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
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [checked7, setChecked7] = useState(false);
  const [checked8, setChecked8] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [ownerTab, setOwnerTab] = useState("yes");
  const [open2, setOpen2] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const email = useSelector((state) => state.user.email);

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
  const handleChangeChecked5 = (event) => {
    console.log(event.target.checked);
    if (event.target.checked !== undefined) {
      setChecked5(event.target.checked);
    } else {
      setChecked5((prev) => !prev);
    }
  };
  const handleChangeChecked6 = (event) => {
    if (event.target.checked !== undefined) {
      setChecked6(event.target.checked);
    } else {
      setChecked6((prev) => !prev);
    }
  };
  const handleChangeChecked7 = (event) => {
    if (event.target.checked !== undefined) {
      setChecked7(event.target.checked);
    } else {
      setChecked7((prev) => !prev);
    }
  };
  const handleChangeChecked8 = (event) => {
    if (event.target.checked !== undefined) {
      setChecked8(event.target.checked);
    } else {
      setChecked8((prev) => !prev);
    }
  };
  const handleShowSteps = () => {
    setShowSteps((prev) => !prev);
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
      <div className="w-full border-b-[1px] border-[#F2F4F7] gap-3 md:gap-0 flex justify-between items-center flex-row py-5 px-5 md:py-5 md:px-11">
        <div className="w-full flex justify-start items-center">
          <img
            src={HarvvLogo.src}
            loading="lazy"
            alt="Logo"
            className="h-7 md:h-12 w-auto"
          />
        </div>
        <div className="w-full hidden lg:flex justify-center md:justify-end items-center flex-col md:flex-row gap-3">
          <div className="w-full hidden md:flex md:w-auto text-center nav-switch-text">
            Already have an account?
          </div>
          <button className="w-full md:w-auto nav-switch-button text-center">
            Login
          </button>
        </div>
        <div className="w-full flex lg:hidden justify-end items-center flex-row">
          <img
            onClick={handleShowSteps}
            src={BurgerMenu.src}
            loading="lazy"
            alt="Menu"
            className="h-5 w-7 cursor-pointer"
          />
        </div>
      </div>
      {showSteps && (
        <>
          <div className="w-full h-full flex justify-center items-start">
            <div className="flex w-full px-5 py-5 justify-start items-start flex-col">
              <div className="w-full flex justify-around items-center flex-row">
                <div className="w-full left-steps-services-heading text-start">
                  Services Selection
                </div>
                <div className="w-full left-steps-services-selected text-end">
                  2 out of 4 selected
                </div>
              </div>

              <div className="w-full gap-4 flex mt-4 justify-center items-start flex-col">
                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.3975 4.9271L6.62421 9.53377L5.35755 8.18043C5.12421 7.96043 4.75755 7.9471 4.49088 8.13377C4.23088 8.3271 4.15755 8.6671 4.31755 8.94043L5.81755 11.3804C5.96421 11.6071 6.21755 11.7471 6.50421 11.7471C6.77755 11.7471 7.03755 11.6071 7.18421 11.3804C7.42421 11.0671 12.0042 5.6071 12.0042 5.6071C12.6042 4.99376 11.8775 4.45377 11.3975 4.92043V4.9271Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-start flex-col">
                    <div className="w-full text-start steps-heading">
                      Service A
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Offer Card & ACH payment options on your invoices
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.3975 4.9271L6.62421 9.53377L5.35755 8.18043C5.12421 7.96043 4.75755 7.9471 4.49088 8.13377C4.23088 8.3271 4.15755 8.6671 4.31755 8.94043L5.81755 11.3804C5.96421 11.6071 6.21755 11.7471 6.50421 11.7471C6.77755 11.7471 7.03755 11.6071 7.18421 11.3804C7.42421 11.0671 12.0042 5.6071 12.0042 5.6071C12.6042 4.99376 11.8775 4.45377 11.3975 4.92043V4.9271Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Service B
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Offer Net Terms (30, 60, 90) on your invoices for approved
                      buyers
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM4 7.2V8.8H12V7.2H4Z"
                          fill="#D0D5DD"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Service C
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Pay invoices using Card & ACH
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM4 7.2V8.8H12V7.2H4Z"
                          fill="#D0D5DD"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Service D
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Pay invoices using Net Terms to approved sellers
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen2(true)}
                className="left-steps-services-change-button w-full mt-4 flex justify-center items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M6.3105 12.9996L13.917 5.39307L12.8565 4.33257L5.25 11.9391V12.9996H6.3105ZM6.93225 14.4996H3.75V11.3173L12.3263 2.74107C12.4669 2.60047 12.6576 2.52148 12.8565 2.52148C13.0554 2.52148 13.2461 2.60047 13.3868 2.74107L15.5085 4.86282C15.6491 5.00347 15.7281 5.1942 15.7281 5.39307C15.7281 5.59195 15.6491 5.78268 15.5085 5.92332L6.93225 14.4996ZM3.75 15.9996H17.25V17.4996H3.75V15.9996Z"
                    fill="#525866"
                  />
                </svg>
                <div>Change</div>
              </button>

              <div className="w-full text-start mt-8 left-steps-services-heading">
                Onboarding Status
              </div>

              <div className="w-full flex mt-4 justify-center items-start flex-col">
                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.0964 7.38967L9.93638 14.2997L8.03638 12.2697C7.68638 11.9397 7.13638 11.9197 6.73638 12.1997C6.34638 12.4897 6.23638 12.9997 6.47638 13.4097L8.72638 17.0697C8.94638 17.4097 9.32638 17.6197 9.75638 17.6197C10.1664 17.6197 10.5564 17.4097 10.7764 17.0697C11.1364 16.5997 18.0064 8.40967 18.0064 8.40967C18.9064 7.48967 17.8164 6.67967 17.0964 7.37967V7.38967Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="w-[2px] bg-[#17B26A] h-[34px]"></div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Contact Information
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Enter your personal contact details.
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div
                      className="z-50 rounded-full bg-[#F9F5FF]"
                      style={{
                        boxShadow: "0px 0px 0px 4px rgba(23, 178, 106, 0.24)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <circle cx="12" cy="12" r="4" fill="white" />
                      </svg>
                    </div>
                    <div className="w-[2px] bg-[#EAECF0] h-[34px]"></div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Business Information
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Complete your business profile.
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#EAECF0"
                          stroke-width="1.5"
                        />
                        <circle cx="12" cy="12" r="4" fill="#D0D5DD" />
                      </svg>
                    </div>
                    <div className="w-[2px] bg-[#EAECF0] h-[34px]"></div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Required Documents
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Connect with essential business tools.
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#EAECF0"
                          stroke-width="1.5"
                        />
                        <circle cx="12" cy="12" r="4" fill="#D0D5DD" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Authorization and Agreement
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Confirm your authority and agree to the terms.
                    </div>
                  </div>
                </div>
              </div>

              <button className="steps-visit-sandbox-button mt-8 w-full text-center">
                Skip Onboarding - Visit Sandbox
              </button>
            </div>
          </div>
        </>
      )}
      {!showOnboarding && !showSteps && (
        <>
          <div className="w-full bg-[#F6F8FA] p-5 h-full overflow-auto md:p-10 flex justify-start items-center flex-col">
            <div className="w-full flex justify-center items-center">
              <img
                src={LogoHarvv.src}
                loading="lazy"
                alt="Logo"
                className="w-20 h-20"
              />
            </div>

            <div className="w-full os-heading mt-4 text-center">
              Get Started with Harvv
            </div>

            <div className="w-full os-sub-heading md:px-[35%] text-center">
              Let us understand your needs to tailor the perfect journey for
              your business.
            </div>

            <div className="w-full my-6 md:w-[516px] flex justify-center items-center flex-col">
              <div className="w-full text-start os-section-heading">
                Are you the owner?
              </div>
              <div className="w-full border-[1px] border-[#E2E4E9] mt-3 flex p-1 gap-2 bg-[#F6F8FA] rounded-[10px] justify-center items-center flex-row">
                <div
                  onClick={() => {
                    setOwnerTab("yes");
                  }}
                  className={`w-full ${
                    ownerTab === "yes" ? "sb-tab-active" : "sb-tab-non-active"
                  } cursor-pointer flex justify-center items-center flex-row gap-1`}
                >
                  <div>Yes</div>
                </div>
                <div
                  onClick={() => {
                    setOwnerTab("no");
                  }}
                  className={`w-full ${
                    ownerTab === "no" ? "sb-tab-active" : "sb-tab-non-active"
                  } cursor-pointer flex justify-center items-center flex-row gap-1`}
                >
                  <div>No</div>
                </div>
              </div>
            </div>

            <div className="w-full mb-6 md:w-[516px] flex justify-center items-center flex-col">
              <div className="w-full text-start os-section-heading">
                Which services do you intend to use?
              </div>
              <div className="w-full mt-3 flex flex-col justify-center items-center gap-3">
                <div className="w-full flex justify-center items-center flex-col md:flex-row gap-3">
                  <div
                    onClick={handleChangeChecked5}
                    className={` ${
                      checked5
                        ? "border-[1px] border-[#ff007a]"
                        : "border-[1px] border-[#eaecf0]"
                    } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                  >
                    <div className="w-full flex justify-center items-center flex-row">
                      <div className="w-full flex justify-start items-center">
                        <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                          A
                        </div>
                      </div>
                      <div className="w-full flex justify-end items-center gap-2">
                        <div className="os-services-upper-tag-wrapper-seller">
                          Seller
                        </div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#E2E4E9",
                                "&.Mui-checked": {
                                  color: "#17B26A",
                                },
                              }}
                              checked={checked5}
                              onChange={handleChangeChecked5}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          sx={{
                            marginRight: "-10%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                      Offer Card & ACH payment options on your invoices
                    </div>

                    <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                      <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle cx="8" cy="8" r="3" fill="#38C793" />
                        </svg>
                        <div>Free Package</div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={handleChangeChecked6}
                    className={` ${
                      checked6
                        ? "border-[1px] border-[#ff007a]"
                        : "border-[1px] border-[#eaecf0]"
                    } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                  >
                    <div className="w-full flex justify-center items-center flex-row">
                      <div className="w-full flex justify-start items-center">
                        <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                          B
                        </div>
                      </div>
                      <div className="w-full flex justify-end items-center gap-2">
                        <div className="os-services-upper-tag-wrapper-seller">
                          Seller
                        </div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#E2E4E9",
                                "&.Mui-checked": {
                                  color: "#17B26A",
                                },
                              }}
                              checked={checked6}
                              onChange={handleChangeChecked6}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          sx={{
                            marginRight: "-10%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                      Offer Net Terms (30, 60, 90) on your invoices for approved
                      buyers
                    </div>

                    <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                      <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle cx="8" cy="8" r="3" fill="#38C793" />
                        </svg>
                        <div>Subscription required</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center flex-col md:flex-row gap-3">
                  <div
                    onClick={handleChangeChecked7}
                    className={` ${
                      checked7
                        ? "border-[1px] border-[#ff007a]"
                        : "border-[1px] border-[#eaecf0]"
                    } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                  >
                    <div className="w-full flex justify-center items-center flex-row">
                      <div className="w-full flex justify-start items-center">
                        <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                          C
                        </div>
                      </div>
                      <div className="w-full flex justify-end items-center gap-2">
                        <div className="os-services-upper-tag-wrapper-buyer">
                          Buyer
                        </div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#E2E4E9",
                                "&.Mui-checked": {
                                  color: "#17B26A",
                                },
                              }}
                              checked={checked7}
                              onChange={handleChangeChecked7}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          sx={{
                            marginRight: "-10%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                      Pay invoices using Card & ACH
                    </div>

                    <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                      <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle cx="8" cy="8" r="3" fill="#38C793" />
                        </svg>
                        <div>Free Package</div>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={handleChangeChecked8}
                    className={` ${
                      checked8
                        ? "border-[1px] border-[#ff007a]"
                        : "border-[1px] border-[#eaecf0]"
                    } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                  >
                    <div className="w-full flex justify-center items-center flex-row">
                      <div className="w-full flex justify-start items-center">
                        <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                          D
                        </div>
                      </div>
                      <div className="w-full flex justify-end items-center gap-2">
                        <div className="os-services-upper-tag-wrapper-buyer">
                          Buyer
                        </div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              sx={{
                                color: "#E2E4E9",
                                "&.Mui-checked": {
                                  color: "#17B26A",
                                },
                              }}
                              checked={checked8}
                              onChange={handleChangeChecked8}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          sx={{
                            marginRight: "-10%",
                          }}
                        />
                      </div>
                    </div>

                    <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                      Pay invoices using Net Terms to approved sellers
                    </div>

                    <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                      <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle cx="8" cy="8" r="3" fill="#38C793" />
                        </svg>
                        <div>Free Package</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[516px] bg-[#EBF1FF] rounded-xl p-4 gap-2 md:gap-3 mb-6 flex justify-center md:justify-start items-center md:items-start flex-col md:flex-row">
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
                <div className="w-full ob-instruction-sub-text text-center md:text-start">
                  If the options above don’t suit your needs,
                  <span>
                    <Link
                      target="_blank"
                      href="#"
                      className="terms-hyperlink mx-1"
                    >
                      explore our pay-in-4 solution
                    </Link>
                  </span>
                  or contact our support team at
                  <span>
                    <Link
                      target="_blank"
                      href="mailto:b2b@harvv.com"
                      className="terms-hyperlink ms-1"
                    >
                      b2b@harvv.com
                    </Link>
                  </span>
                  .
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowOnboarding(true);
              }}
              className="sb-form-submit-button-active w-full md:w-[516px] text-center"
            >
              Continue
            </button>
          </div>
        </>
      )}
      {showOnboarding && !showSteps && (
        <>
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
                      Incomplete applications will delay processing. Send
                      completed application and supporting documents to
                      b2b@harvv.com.
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
                              <div className="sb-form-label">
                                Business Email
                              </div>
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
                                value={email}
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
                                    (autocompleteRef.current =
                                      autocompleteInstance)
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
                              <div className="sb-form-label">
                                Annual Revenue
                              </div>
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
                              <div className="sb-form-label">
                                Monthly Expense
                              </div>
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
                                  <option
                                    key={option.value}
                                    value={option.value}
                                  >
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
                            <div className="z-50 relative w-full">
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
                                  selectedBusinessType ===
                                  "Select Business Type"
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
                                      PDF, JPEG, PNG, and JPG formats, up to 50
                                      MB.
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
                                        PDF, JPEG, PNG, and JPG formats, up to
                                        50 MB.
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
                                        PDF, JPEG, PNG, and JPG formats, up to
                                        50 MB.
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
                                Send completed application and supporting
                                documents to b2b@harvv.com
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
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
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
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
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
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
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
                            personal credit reports and to contact the
                            references listed above.
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
                            5. I understand that Harvv requires routing 100% of
                            GMV through their platform to qualify for net terms
                            invoicing, and maintaining a minimum of 80% GMV for
                            continued eligibility.
                          </div>
                          <div className="terms-and-conditions-text w-full text-start">
                            6. I acknowledge that this application is subject to
                            approval by Harvv, Inc., and that additional
                            information may be required.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 w-full gap-3 flex justify-center md:justify-end items-center flex-col md:flex-row">
                  <button
                    onClick={() => {
                      setShowOnboarding(false);
                    }}
                    className="sb-form-cancel-button w-full md:w-36"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                    }}
                    className="sb-form-submit-button w-full md:w-36"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex lg:w-1/4 w-full px-5 py-5 lg:py-10 lg:px-5 justify-start items-start flex-col h-full overflow-auto">
              <div className="w-full flex justify-around items-center flex-col md:flex-row">
                <div className="w-full left-steps-services-heading text-center md:text-start">
                  Services Selection
                </div>
                <div className="w-full left-steps-services-selected text-center md:text-end">
                  2 out of 4 selected
                </div>
              </div>

              <div className="w-full gap-4 flex mt-4 justify-center items-start flex-col">
                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.3975 4.9271L6.62421 9.53377L5.35755 8.18043C5.12421 7.96043 4.75755 7.9471 4.49088 8.13377C4.23088 8.3271 4.15755 8.6671 4.31755 8.94043L5.81755 11.3804C5.96421 11.6071 6.21755 11.7471 6.50421 11.7471C6.77755 11.7471 7.03755 11.6071 7.18421 11.3804C7.42421 11.0671 12.0042 5.6071 12.0042 5.6071C12.6042 4.99376 11.8775 4.45377 11.3975 4.92043V4.9271Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-start flex-col">
                    <div className="w-full text-start steps-heading">
                      Service A
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Offer Card & ACH payment options on your invoices
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 8C0.75 3.99594 3.99594 0.75 8 0.75C12.0041 0.75 15.25 3.99594 15.25 8C15.25 12.0041 12.0041 15.25 8 15.25C3.99594 15.25 0.75 12.0041 0.75 8Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11.3975 4.9271L6.62421 9.53377L5.35755 8.18043C5.12421 7.96043 4.75755 7.9471 4.49088 8.13377C4.23088 8.3271 4.15755 8.6671 4.31755 8.94043L5.81755 11.3804C5.96421 11.6071 6.21755 11.7471 6.50421 11.7471C6.77755 11.7471 7.03755 11.6071 7.18421 11.3804C7.42421 11.0671 12.0042 5.6071 12.0042 5.6071C12.6042 4.99376 11.8775 4.45377 11.3975 4.92043V4.9271Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Service B
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Offer Net Terms (30, 60, 90) on your invoices for approved
                      buyers
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM4 7.2V8.8H12V7.2H4Z"
                          fill="#D0D5DD"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Service C
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Pay invoices using Card & ACH
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex mt-[0.5px] justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16ZM4 7.2V8.8H12V7.2H4Z"
                          fill="#D0D5DD"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Service D
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Pay invoices using Net Terms to approved sellers
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen2(true)}
                className="left-steps-services-change-button w-full mt-4 flex justify-center items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M6.3105 12.9996L13.917 5.39307L12.8565 4.33257L5.25 11.9391V12.9996H6.3105ZM6.93225 14.4996H3.75V11.3173L12.3263 2.74107C12.4669 2.60047 12.6576 2.52148 12.8565 2.52148C13.0554 2.52148 13.2461 2.60047 13.3868 2.74107L15.5085 4.86282C15.6491 5.00347 15.7281 5.1942 15.7281 5.39307C15.7281 5.59195 15.6491 5.78268 15.5085 5.92332L6.93225 14.4996ZM3.75 15.9996H17.25V17.4996H3.75V15.9996Z"
                    fill="#525866"
                  />
                </svg>
                <div>Change</div>
              </button>

              <div className="w-full mt-8 left-steps-services-heading">
                Onboarding Status
              </div>

              <div className="w-full flex mt-4 justify-center items-start flex-col">
                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M17.0964 7.38967L9.93638 14.2997L8.03638 12.2697C7.68638 11.9397 7.13638 11.9197 6.73638 12.1997C6.34638 12.4897 6.23638 12.9997 6.47638 13.4097L8.72638 17.0697C8.94638 17.4097 9.32638 17.6197 9.75638 17.6197C10.1664 17.6197 10.5564 17.4097 10.7764 17.0697C11.1364 16.5997 18.0064 8.40967 18.0064 8.40967C18.9064 7.48967 17.8164 6.67967 17.0964 7.37967V7.38967Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="w-[2px] bg-[#17B26A] h-[34px]"></div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Contact Information
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Enter your personal contact details.
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div
                      className="z-50 rounded-full bg-[#F9F5FF]"
                      style={{
                        boxShadow: "0px 0px 0px 4px rgba(23, 178, 106, 0.24)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          fill="#17B26A"
                        />
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#17B26A"
                          stroke-width="1.5"
                        />
                        <circle cx="12" cy="12" r="4" fill="white" />
                      </svg>
                    </div>
                    <div className="w-[2px] bg-[#EAECF0] h-[34px]"></div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Business Information
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Complete your business profile.
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#EAECF0"
                          stroke-width="1.5"
                        />
                        <circle cx="12" cy="12" r="4" fill="#D0D5DD" />
                      </svg>
                    </div>
                    <div className="w-[2px] bg-[#EAECF0] h-[34px]"></div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Required Documents
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Connect with essential business tools.
                    </div>
                  </div>
                </div>

                <div className="w-full gap-3 flex justify-center items-start flex-row">
                  <div className="flex justify-center items-center flex-col">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M0.75 12C0.75 5.7868 5.7868 0.75 12 0.75C18.2132 0.75 23.25 5.7868 23.25 12C23.25 18.2132 18.2132 23.25 12 23.25C5.7868 23.25 0.75 18.2132 0.75 12Z"
                          stroke="#EAECF0"
                          stroke-width="1.5"
                        />
                        <circle cx="12" cy="12" r="4" fill="#D0D5DD" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="w-full text-start steps-heading">
                      Authorization and Agreement
                    </div>
                    <div className="w-full text-start steps-sub-heading">
                      Confirm your authority and agree to the terms.
                    </div>
                  </div>
                </div>
              </div>

              <button className="steps-visit-sandbox-button mt-8 w-full text-center">
                Skip Onboarding - Visit Sandbox
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal 2 */}

      <Dialog
        open={open2}
        onClose={() => setIsOpen2(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-[#0C111D] bg-opacity-60 backdrop-blur-md transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative modal-custom-css transform overflow-hidden rounded-xl bg-white text-left transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="w-full flex justify-center items-center flex-col">
                {/* Modal Body */}

                <div className="w-full p-5 flex justify-center items-center flex-col">
                  <div className="w-full flex justify-end items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setOpen2(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 10.7275L16.455 6.27246L17.7276 7.54506L13.2726 12.0001L17.7276 16.4551L16.455 17.7277L12 13.2727L7.545 17.7277L6.2724 16.4551L10.7274 12.0001L6.2724 7.54506L7.545 6.27246L12 10.7275Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={LogoHarvv.src}
                      loading="lazy"
                      alt="Logo"
                      className="w-20 h-20"
                    />
                  </div>
                  <div className="w-full text-center modal-heading-custom">
                    Select Services
                  </div>
                  <div className="w-full flex justify-center items-center flex-col mt-3">
                    <div className="w-full flex justify-center items-center flex-col">
                      <div className="w-full flex flex-col justify-center items-center gap-3">
                        <div className="w-full flex justify-center items-center flex-col md:flex-row gap-3">
                          <div
                            onClick={handleChangeChecked5}
                            className={` ${
                              checked5
                                ? "border-[1px] border-[#ff007a]"
                                : "border-[1px] border-[#eaecf0]"
                            } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                          >
                            <div className="w-full flex justify-center items-center flex-row">
                              <div className="w-full flex justify-start items-center">
                                <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                                  A
                                </div>
                              </div>
                              <div className="w-full flex justify-end items-center gap-2">
                                <div className="os-services-upper-tag-wrapper-seller">
                                  Seller
                                </div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      sx={{
                                        color: "#E2E4E9",
                                        "&.Mui-checked": {
                                          color: "#17B26A",
                                        },
                                      }}
                                      checked={checked5}
                                      onChange={handleChangeChecked5}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  sx={{
                                    marginRight: "-10%",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                              Offer Card & ACH payment options on your invoices
                            </div>

                            <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                              <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <circle cx="8" cy="8" r="3" fill="#38C793" />
                                </svg>
                                <div>Free Package</div>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={handleChangeChecked6}
                            className={` ${
                              checked6
                                ? "border-[1px] border-[#ff007a]"
                                : "border-[1px] border-[#eaecf0]"
                            } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                          >
                            <div className="w-full flex justify-center items-center flex-row">
                              <div className="w-full flex justify-start items-center">
                                <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                                  B
                                </div>
                              </div>
                              <div className="w-full flex justify-end items-center gap-2">
                                <div className="os-services-upper-tag-wrapper-seller">
                                  Seller
                                </div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      sx={{
                                        color: "#E2E4E9",
                                        "&.Mui-checked": {
                                          color: "#17B26A",
                                        },
                                      }}
                                      checked={checked6}
                                      onChange={handleChangeChecked6}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  sx={{
                                    marginRight: "-10%",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                              Offer Net Terms (30, 60, 90) on your invoices for
                              approved buyers
                            </div>

                            <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                              <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <circle cx="8" cy="8" r="3" fill="#38C793" />
                                </svg>
                                <div>Subscription required</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-center items-center flex-col md:flex-row gap-3">
                          <div
                            onClick={handleChangeChecked7}
                            className={` ${
                              checked7
                                ? "border-[1px] border-[#ff007a]"
                                : "border-[1px] border-[#eaecf0]"
                            } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                          >
                            <div className="w-full flex justify-center items-center flex-row">
                              <div className="w-full flex justify-start items-center">
                                <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                                  C
                                </div>
                              </div>
                              <div className="w-full flex justify-end items-center gap-2">
                                <div className="os-services-upper-tag-wrapper-buyer">
                                  Buyer
                                </div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      sx={{
                                        color: "#E2E4E9",
                                        "&.Mui-checked": {
                                          color: "#17B26A",
                                        },
                                      }}
                                      checked={checked7}
                                      onChange={handleChangeChecked7}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  sx={{
                                    marginRight: "-10%",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                              Pay invoices using Card & ACH
                            </div>

                            <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                              <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <circle cx="8" cy="8" r="3" fill="#38C793" />
                                </svg>
                                <div>Free Package</div>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={handleChangeChecked8}
                            className={` ${
                              checked8
                                ? "border-[1px] border-[#ff007a]"
                                : "border-[1px] border-[#eaecf0]"
                            } cursor-pointer h-auto md:h-44 w-full flex justify-around items-center flex-col os-services-wrapper`}
                          >
                            <div className="w-full flex justify-center items-center flex-row">
                              <div className="w-full flex justify-start items-center">
                                <div className="w-8 h-8 text-center os-services-list-heading flex items-center justify-center rounded-full bg-[#FCE7F1]">
                                  D
                                </div>
                              </div>
                              <div className="w-full flex justify-end items-center gap-2">
                                <div className="os-services-upper-tag-wrapper-buyer">
                                  Buyer
                                </div>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      sx={{
                                        color: "#E2E4E9",
                                        "&.Mui-checked": {
                                          color: "#17B26A",
                                        },
                                      }}
                                      checked={checked8}
                                      onChange={handleChangeChecked8}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
                                    />
                                  }
                                  sx={{
                                    marginRight: "-10%",
                                  }}
                                />
                              </div>
                            </div>

                            <div className="w-full text-center md:text-start mt-3 os-services-sub-heading">
                              Pay invoices using Net Terms to approved sellers
                            </div>

                            <div className="w-full mt-3 flex justify-center md:justify-start items-center">
                              <div className="w-full md:w-auto ob-services-free-package-tag flex gap-1 justify-center items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <circle cx="8" cy="8" r="3" fill="#38C793" />
                                </svg>
                                <div>Free Package</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full border-[1px] gap-3 border-[#E2E4E9] px-5 py-4 flex justify-center items-center flex-col md:flex-row">
                  <button
                    onClick={() => {
                      setOpen2(false);
                    }}
                    className="sb-form-cancel-button bg-[#fff] w-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setOpen2(false);
                    }}
                    className="sb-form-submit-button w-full"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Onboarding;
