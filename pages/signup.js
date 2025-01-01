import React, { useEffect, useState } from "react";
import HarvvLogo from "@/public/logo/logo_harvv.png";
import AddAccountImage from "@/public/images/add-account-img.png";
import QBLogo from "@/public/images/logo-qb.png";
import PlaidLogo from "@/public/images/logo-plaid.png";
import Images from "@/public/images/sign-up-images.png";
import ReCAPTCHA from "react-google-recaptcha";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setEmail } from "../redux/userSlice";

function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmailInput] = useState("");
  const [activeTab, setActiveTab] = useState("seller");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [trueCount, setTrueCount] = useState(0);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
  });

  // Function to count true and false values
  const countValues = (obj) => {
    let trueCountVal = 0;
    let falseCountVal = 0;

    for (const key in obj) {
      if (obj[key] === true) {
        trueCountVal++;
      } else if (obj[key] === false) {
        falseCountVal++;
      }
    }

    return { trueCountVal, falseCountVal };
  };

  // Validate the password on every change
  const validatePassword = (value) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasMinLength = value.length >= 8;

    setRequirements({
      length: hasMinLength,
      uppercase: hasUppercase,
      number: hasNumber,
      //   TODO: Check how many trues are in the object and show border line according to that
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value);
  };

  useEffect(() => {
    if (password !== "") {
      const { trueCountVal, falseCountVal } = countValues(requirements);
      setTrueCount(trueCountVal);
      console.log(trueCount);
    }
  }, [password]);

  return (
    <div className="bg-white w-full md:h-screen flex justify-start items-center flex-col md:flex-row">
      <div className="md:w-3/5 md:h-screen md:overflow-auto gap-5 w-full flex justify-start items-center flex-col">
        <div className="w-full gap-3 md:gap-0 flex justify-between items-center flex-col md:flex-row pt-5 px-5 md:pt-6 md:px-11">
          <div className="w-full flex justify-center md:justify-start items-center">
            <img
              src={HarvvLogo.src}
              loading="lazy"
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>
          <div className="w-full flex justify-center md:justify-end items-center flex-col md:flex-row gap-3">
            <div className="w-full hidden md:flex md:w-auto text-center nav-switch-text">
              Are you a buyer ? Switch
              {/* TODO: Switch profiles on current page based on the components */}
            </div>
            <button className="w-full md:w-auto nav-switch-button text-center">
              Switch To Buyer
              {/* TODO: Switch profiles on current page based on the components */}
            </button>
          </div>
        </div>
        <div className="w-full gap-3 md:gap-0 flex justify-center items-center flex-col px-5 lg:px-28">
          <div className="w-full flex justify-center items-center">
            <img
              src={AddAccountImage.src}
              loading="lazy"
              alt="Image"
              className="h-[88px] w-[88px]"
            />
          </div>

          <div className="w-full text-center create-account-text">
            Create Your Seller Account on Harvv
          </div>

          <div className="w-full xl:px-40 text-center create-account-sub-text">
            Streamline your AR, manage invoices, and offer net terms to
            customers.
          </div>

          <div className="w-full mt-3 flex p-1 gap-2 bg-[#F6F8FA] rounded-[10px] justify-center items-center flex-row">
            <div
              onClick={() => {
                setActiveTab("buyer");
              }}
              className={`w-full ${
                activeTab === "buyer" ? "sb-tab-active" : "sb-tab-non-active"
              } cursor-pointer flex justify-center items-center flex-row gap-1`}
            >
              <div>Buyer</div>
              <Tooltip
                title="Pay your invoices on time and access financing options."
                arrow
              >
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M8.5 14C5.1862 14 2.5 11.3138 2.5 8C2.5 4.6862 5.1862 2 8.5 2C11.8138 2 14.5 4.6862 14.5 8C14.5 11.3138 11.8138 14 8.5 14ZM7.9 9.8V11H9.1V9.8H7.9ZM7.9 5V8.6H9.1V5H7.9Z"
                      fill="#98A2B3"
                    />
                  </svg>
                </div>
              </Tooltip>
            </div>
            <div
              onClick={() => {
                setActiveTab("seller");
              }}
              className={`w-full ${
                activeTab === "seller" ? "sb-tab-active" : "sb-tab-non-active"
              } cursor-pointer flex justify-center items-center flex-row gap-1`}
            >
              <div>Seller</div>
              <Tooltip
                title="Create and manage invoices, accept payments, and access financing options for your business. Seller can behave as buyer by default."
                arrow
              >
                <div className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                  >
                    <path
                      d="M8.5 14C5.1862 14 2.5 11.3138 2.5 8C2.5 4.6862 5.1862 2 8.5 2C11.8138 2 14.5 4.6862 14.5 8C14.5 11.3138 11.8138 14 8.5 14ZM7.9 9.8V11H9.1V9.8H7.9ZM7.9 5V8.6H9.1V5H7.9Z"
                      fill="#98A2B3"
                    />
                  </svg>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="w-full mt-3 flex justify-center items-center flex-col gap-3">
            <div className="w-full flex gap-1 justify-start items-center flex-col">
              <div className="w-full text-start sb-form-label">Email:</div>
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
                  onChange={(e) => {
                    setEmailInput(e.target.value);
                  }}
                  placeholder="Input email address"
                  className="w-full pl-8 outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="w-full flex gap-1 justify-start items-center flex-col">
              <div className="w-full text-start sb-form-label">Password:</div>
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
                      d="M5.5 7V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5ZM15.25 8.5H4.75V16H15.25V8.5ZM9.25 12.799C8.96404 12.6339 8.74054 12.3791 8.61418 12.074C8.48782 11.7689 8.46565 11.4307 8.55111 11.1117C8.63657 10.7928 8.82489 10.5109 9.08686 10.3099C9.34882 10.1089 9.6698 9.99996 10 9.99996C10.3302 9.99996 10.6512 10.1089 10.9131 10.3099C11.1751 10.5109 11.3634 10.7928 11.4489 11.1117C11.5344 11.4307 11.5122 11.7689 11.3858 12.074C11.2595 12.3791 11.036 12.6339 10.75 12.799V14.5H9.25V12.799ZM7 7H13V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7Z"
                      fill="#525866"
                    />
                  </svg>
                </div>

                {/* Input Field */}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={handleChange}
                  className="w-full pl-8 pr-8 outline-none bg-transparent"
                />

                {/* Icon 2 */}
                {showPassword ? (
                  <>
                    <div
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M12.5 3.89844C17.3528 3.89844 21.3902 7.39044 22.2371 11.9984C21.3911 16.6064 17.3528 20.0984 12.5 20.0984C7.6472 20.0984 3.6098 16.6064 2.7629 11.9984C3.6089 7.39044 7.6472 3.89844 12.5 3.89844ZM12.5 18.2984C14.3355 18.298 16.1165 17.6746 17.5516 16.5301C18.9866 15.3856 19.9906 13.7879 20.3993 11.9984C19.9891 10.2104 18.9844 8.61444 17.5496 7.47146C16.1147 6.32848 14.3345 5.70611 12.5 5.70611C10.6655 5.70611 8.88532 6.32848 7.45044 7.47146C6.01556 8.61444 5.01089 10.2104 4.6007 11.9984C5.00939 13.7879 6.01341 15.3856 7.44843 16.5301C8.88345 17.6746 10.6645 18.298 12.5 18.2984ZM12.5 16.0484C11.4259 16.0484 10.3957 15.6217 9.63622 14.8622C8.8767 14.1027 8.45 13.0726 8.45 11.9984C8.45 10.9243 8.8767 9.89418 9.63622 9.13466C10.3957 8.37513 11.4259 7.94844 12.5 7.94844C13.5741 7.94844 14.6043 8.37513 15.3638 9.13466C16.1233 9.89418 16.55 10.9243 16.55 11.9984C16.55 13.0726 16.1233 14.1027 15.3638 14.8622C14.6043 15.6217 13.5741 16.0484 12.5 16.0484ZM12.5 14.2484C13.0967 14.2484 13.669 14.0114 14.091 13.5894C14.5129 13.1675 14.75 12.5952 14.75 11.9984C14.75 11.4017 14.5129 10.8294 14.091 10.4074C13.669 9.98549 13.0967 9.74844 12.5 9.74844C11.9033 9.74844 11.331 9.98549 10.909 10.4074C10.4871 10.8294 10.25 11.4017 10.25 11.9984C10.25 12.5952 10.4871 13.1675 10.909 13.5894C11.331 14.0114 11.9033 14.2484 12.5 14.2484Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M14.4115 15.4729C13.0924 16.3096 11.562 16.7527 9.99999 16.7502C5.95599 16.7502 2.59149 13.8402 1.88574 10.0002C2.20826 8.25321 3.08696 6.65734 4.39074 5.45067L2.04399 3.10617L3.10524 2.04492L17.9545 16.8949L16.8932 17.9554L14.4107 15.4729H14.4115ZM5.45124 6.51267C4.432 7.43936 3.72198 8.65676 3.41724 10.0002C3.65146 11.025 4.12169 11.981 4.79049 12.7921C5.4593 13.6032 6.30821 14.247 7.26966 14.6722C8.2311 15.0973 9.27853 15.2922 10.3286 15.2413C11.3786 15.1903 12.4022 14.8949 13.318 14.3787L11.797 12.8577C11.1495 13.2655 10.3826 13.4412 9.62217 13.356C8.8617 13.2708 8.15277 12.9296 7.61167 12.3885C7.07057 11.8474 6.72941 11.1385 6.64416 10.378C6.55891 9.61752 6.73463 8.85065 7.14249 8.20317L5.45124 6.51267ZM10.6855 11.7462L8.25399 9.31467C8.12054 9.65437 8.08913 10.0256 8.16362 10.3829C8.23811 10.7402 8.41526 11.068 8.67333 11.3261C8.93141 11.5842 9.25919 11.7613 9.61648 11.8358C9.97378 11.9103 10.345 11.8789 10.6847 11.7454L10.6855 11.7462ZM16.6052 13.4442L15.532 12.3717C16.0333 11.6571 16.3903 10.8516 16.5827 10.0002C16.3789 9.10747 15.9957 8.26553 15.4564 7.52554C14.917 6.78555 14.2328 6.16297 13.4454 5.69562C12.658 5.22828 11.7837 4.92595 10.8758 4.80699C9.96787 4.68804 9.04525 4.75496 8.16399 5.00367L6.98049 3.82017C7.91574 3.45267 8.93499 3.25017 9.99999 3.25017C14.044 3.25017 17.4085 6.16017 18.1142 10.0002C17.8844 11.2494 17.3679 12.4284 16.6052 13.4442ZM9.79224 6.63117C10.2696 6.60167 10.7478 6.67397 11.1951 6.84328C11.6425 7.0126 12.0487 7.27505 12.3869 7.61326C12.7251 7.95146 12.9876 8.35769 13.1569 8.80501C13.3262 9.25234 13.3985 9.73054 13.369 10.2079L9.79149 6.63117H9.79224Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
              {password !== "" && (
                <>
                  <div className="w-full flex justify-start items-center flex-col">
                    <div className="w-full flex justify-around items-center mt-2 flex-row gap-3">
                      <div
                        className={`w-full h-[4px] ${
                          trueCount >= 0 && trueCount < 3
                            ? "bg-[#FF6B6B]"
                            : "bg-[#06D6A0]"
                        } rounded-[2px]`}
                      ></div>
                      <div
                        className={`w-full h-[4px] ${
                          trueCount >= 0 && trueCount < 2
                            ? "bg-[#E2E4E9]"
                            : trueCount >= 2 && trueCount < 3
                            ? "bg-[#F9C74F]"
                            : trueCount === 3 && "bg-[#06D6A0]"
                        } rounded-[2px]`}
                      ></div>
                      <div
                        className={`w-full h-[4px] ${
                          trueCount >= 0 && trueCount < 3
                            ? "bg-[#E2E4E9]"
                            : trueCount === 3 && "bg-[#06D6A0]"
                        } rounded-[2px]`}
                      ></div>
                    </div>
                    <p className="w-full text-start password-status-text mt-2">
                      {password && Object.values(requirements).includes(false)
                        ? "Weak password. Must contain at least:"
                        : "Strong Password!"}
                    </p>
                    <ul className="mt-2 w-full space-y-1">
                      <li
                        className={`flex items-center gap-1 password-li-text`}
                      >
                        <div>
                          {requirements.length ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z"
                                  fill="#38C793"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z"
                                  fill="#868C98"
                                />
                              </svg>
                            </>
                          )}
                        </div>
                        <div>At least 8 characters</div>
                      </li>
                      <li
                        className={`flex items-center gap-1 password-li-text`}
                      >
                        <div>
                          {requirements.uppercase ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z"
                                  fill="#38C793"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z"
                                  fill="#868C98"
                                />
                              </svg>
                            </>
                          )}
                        </div>
                        <div>At least 1 uppercase</div>
                      </li>
                      <li
                        className={`flex items-center gap-1 password-li-text`}
                      >
                        <div>
                          {requirements.number ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4018 10.4L11.6438 6.1574L10.7954 5.309L7.4018 8.7032L5.7044 7.0058L4.856 7.8542L7.4018 10.4Z"
                                  fill="#38C793"
                                />
                              </svg>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8 7.1516L6.3032 5.4542L5.4542 6.3032L7.1516 8L5.4542 9.6968L6.3032 10.5458L8 8.8484L9.6968 10.5458L10.5458 9.6968L8.8484 8L10.5458 6.3032L9.6968 5.4542L8 7.1516Z"
                                  fill="#868C98"
                                />
                              </svg>
                            </>
                          )}
                        </div>
                        <div>At least 1 number</div>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            <div className="w-full flex gap-1 justify-start items-center flex-col">
              <div className="w-full text-start sb-form-label">
                Confirm Password:
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
                      d="M5.5 7V6.25C5.5 5.05653 5.97411 3.91193 6.81802 3.06802C7.66193 2.22411 8.80653 1.75 10 1.75C11.1935 1.75 12.3381 2.22411 13.182 3.06802C14.0259 3.91193 14.5 5.05653 14.5 6.25V7H16C16.1989 7 16.3897 7.07902 16.5303 7.21967C16.671 7.36032 16.75 7.55109 16.75 7.75V16.75C16.75 16.9489 16.671 17.1397 16.5303 17.2803C16.3897 17.421 16.1989 17.5 16 17.5H4C3.80109 17.5 3.61032 17.421 3.46967 17.2803C3.32902 17.1397 3.25 16.9489 3.25 16.75V7.75C3.25 7.55109 3.32902 7.36032 3.46967 7.21967C3.61032 7.07902 3.80109 7 4 7H5.5ZM15.25 8.5H4.75V16H15.25V8.5ZM9.25 12.799C8.96404 12.6339 8.74054 12.3791 8.61418 12.074C8.48782 11.7689 8.46565 11.4307 8.55111 11.1117C8.63657 10.7928 8.82489 10.5109 9.08686 10.3099C9.34882 10.1089 9.6698 9.99996 10 9.99996C10.3302 9.99996 10.6512 10.1089 10.9131 10.3099C11.1751 10.5109 11.3634 10.7928 11.4489 11.1117C11.5344 11.4307 11.5122 11.7689 11.3858 12.074C11.2595 12.3791 11.036 12.6339 10.75 12.799V14.5H9.25V12.799ZM7 7H13V6.25C13 5.45435 12.6839 4.69129 12.1213 4.12868C11.5587 3.56607 10.7956 3.25 10 3.25C9.20435 3.25 8.44129 3.56607 7.87868 4.12868C7.31607 4.69129 7 5.45435 7 6.25V7Z"
                      fill="#525866"
                    />
                  </svg>
                </div>

                {/* Input Field */}
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  className="w-full pl-8 pr-8 outline-none bg-transparent"
                />

                {/* Icon 2 */}
                {showConfirmPassword ? (
                  <>
                    <div
                      onClick={() => {
                        setShowConfirmPassword(false);
                      }}
                      className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 25 24"
                        fill="none"
                      >
                        <path
                          d="M12.5 3.89844C17.3528 3.89844 21.3902 7.39044 22.2371 11.9984C21.3911 16.6064 17.3528 20.0984 12.5 20.0984C7.6472 20.0984 3.6098 16.6064 2.7629 11.9984C3.6089 7.39044 7.6472 3.89844 12.5 3.89844ZM12.5 18.2984C14.3355 18.298 16.1165 17.6746 17.5516 16.5301C18.9866 15.3856 19.9906 13.7879 20.3993 11.9984C19.9891 10.2104 18.9844 8.61444 17.5496 7.47146C16.1147 6.32848 14.3345 5.70611 12.5 5.70611C10.6655 5.70611 8.88532 6.32848 7.45044 7.47146C6.01556 8.61444 5.01089 10.2104 4.6007 11.9984C5.00939 13.7879 6.01341 15.3856 7.44843 16.5301C8.88345 17.6746 10.6645 18.298 12.5 18.2984ZM12.5 16.0484C11.4259 16.0484 10.3957 15.6217 9.63622 14.8622C8.8767 14.1027 8.45 13.0726 8.45 11.9984C8.45 10.9243 8.8767 9.89418 9.63622 9.13466C10.3957 8.37513 11.4259 7.94844 12.5 7.94844C13.5741 7.94844 14.6043 8.37513 15.3638 9.13466C16.1233 9.89418 16.55 10.9243 16.55 11.9984C16.55 13.0726 16.1233 14.1027 15.3638 14.8622C14.6043 15.6217 13.5741 16.0484 12.5 16.0484ZM12.5 14.2484C13.0967 14.2484 13.669 14.0114 14.091 13.5894C14.5129 13.1675 14.75 12.5952 14.75 11.9984C14.75 11.4017 14.5129 10.8294 14.091 10.4074C13.669 9.98549 13.0967 9.74844 12.5 9.74844C11.9033 9.74844 11.331 9.98549 10.909 10.4074C10.4871 10.8294 10.25 11.4017 10.25 11.9984C10.25 12.5952 10.4871 13.1675 10.909 13.5894C11.331 14.0114 11.9033 14.2484 12.5 14.2484Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        setShowConfirmPassword(true);
                      }}
                      className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M14.4115 15.4729C13.0924 16.3096 11.562 16.7527 9.99999 16.7502C5.95599 16.7502 2.59149 13.8402 1.88574 10.0002C2.20826 8.25321 3.08696 6.65734 4.39074 5.45067L2.04399 3.10617L3.10524 2.04492L17.9545 16.8949L16.8932 17.9554L14.4107 15.4729H14.4115ZM5.45124 6.51267C4.432 7.43936 3.72198 8.65676 3.41724 10.0002C3.65146 11.025 4.12169 11.981 4.79049 12.7921C5.4593 13.6032 6.30821 14.247 7.26966 14.6722C8.2311 15.0973 9.27853 15.2922 10.3286 15.2413C11.3786 15.1903 12.4022 14.8949 13.318 14.3787L11.797 12.8577C11.1495 13.2655 10.3826 13.4412 9.62217 13.356C8.8617 13.2708 8.15277 12.9296 7.61167 12.3885C7.07057 11.8474 6.72941 11.1385 6.64416 10.378C6.55891 9.61752 6.73463 8.85065 7.14249 8.20317L5.45124 6.51267ZM10.6855 11.7462L8.25399 9.31467C8.12054 9.65437 8.08913 10.0256 8.16362 10.3829C8.23811 10.7402 8.41526 11.068 8.67333 11.3261C8.93141 11.5842 9.25919 11.7613 9.61648 11.8358C9.97378 11.9103 10.345 11.8789 10.6847 11.7454L10.6855 11.7462ZM16.6052 13.4442L15.532 12.3717C16.0333 11.6571 16.3903 10.8516 16.5827 10.0002C16.3789 9.10747 15.9957 8.26553 15.4564 7.52554C14.917 6.78555 14.2328 6.16297 13.4454 5.69562C12.658 5.22828 11.7837 4.92595 10.8758 4.80699C9.96787 4.68804 9.04525 4.75496 8.16399 5.00367L6.98049 3.82017C7.91574 3.45267 8.93499 3.25017 9.99999 3.25017C14.044 3.25017 17.4085 6.16017 18.1142 10.0002C17.8844 11.2494 17.3679 12.4284 16.6052 13.4442ZM9.79224 6.63117C10.2696 6.60167 10.7478 6.67397 11.1951 6.84328C11.6425 7.0126 12.0487 7.27505 12.3869 7.61326C12.7251 7.95146 12.9876 8.35769 13.1569 8.80501C13.3262 9.25234 13.3985 9.73054 13.369 10.2079L9.79149 6.63117H9.79224Z"
                          fill="#525866"
                        />
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 w-full flex justify-start items-center">
            <ReCAPTCHA
              sitekey="6LfP0p8qAAAAAMBe5a-ksX36Rdz_gQVyLIc8UyJc"
              onChange={(token) => {
                console.log(token);
                setCaptchaToken(token);
              }}
            />
          </div>

          <div className="w-full mt-3 flex justify-center items-center">
            {/* <button className="w-full sb-form-submit-button-non-active"> */}
            <button
              onClick={() => {
                dispatch(setEmail(email));
                router.push("verify-otp");
              }}
              className="w-full sb-form-submit-button-active"
            >
              Create My Seller Account
            </button>
          </div>

          <div className="w-full mt-5 flex justify-around items-center flex-row gap-3">
            <div className="w-full h-[1px] bg-[#E2E4E9]"></div>
            <div className="sb-form-or-text">OR</div>
            <div className="w-full h-[1px] bg-[#E2E4E9]"></div>
          </div>

          <div className="w-full mt-5 gap-3 flex justify-center items-center flex-col">
            <button className="w-full text-center sb-form-or-button1">
              Sign Up With EIN/Tax ID
            </button>
            <button className="w-full flex sb-form-or-button2 justify-center items-center flex-row gap-1">
              <div>
                <img
                  src={QBLogo.src}
                  loading="lazy"
                  alt="Logo"
                  className="h-5 w-5"
                />
              </div>
              <div>Sign Up With QuickBooks</div>
            </button>
            <button className="w-full flex sb-form-or-button3 justify-center items-center flex-row gap-1">
              <div>
                <img
                  src={PlaidLogo.src}
                  loading="lazy"
                  alt="Logo"
                  className="h-5 w-5"
                />
              </div>
              <div>Sign Up With Plaid</div>
            </button>
          </div>
        </div>
        <div className="w-full hidden md:flex justify-start items-center px-5 pb-5 md:pb-6 md:px-11">
          <div className="w-full text-center md:text-start footer-text">
            © 2024 Harvv
          </div>
        </div>
      </div>
      <div className="md:w-2/5 w-full p-5 md:p-8 text-black flex justify-center items-center md:h-screen">
        <div className="flex justify-center items-center flex-col w-full h-full rounded-2xl bg-[#F9FAFB] p-5 lg:pt-[243px] lg:pb-[243px] lg:pl-[30px] lg:pr-[30px]">
          <img
            src={Images.src}
            loading="lazy"
            alt="Logo"
            className="h-full md:h-[345px] w-full"
          />
          <div className="w-full mt-5 md:mt-12 text-center sb-form-right-text">
            Transform Your Cash Flow with Harvv Financing
          </div>
          <div className="w-full mt-3 text-center sb-form-right-sub-text">
            Advance Rate, No Risk, Low Fees
          </div>
          <div className="flex md:hidden justify-center items-center w-full mt-3 text-center footer-text">
            © 2024 Harvv
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
