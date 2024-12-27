import React, { useEffect, useState } from "react";
import HarvvLogo from "@/public/logo/logo_harvv.png";
import VerifyOTPImage from "@/public/images/verify-otp-img.png";
import QBLogo from "@/public/images/logo-qb.png";
import PlaidLogo from "@/public/images/logo-plaid.png";
import Images from "@/public/images/sign-up-images.png";
import ReCAPTCHA from "react-google-recaptcha";
import Tooltip from "@mui/material/Tooltip";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/router";

function VerifyOTP() {
  const router = useRouter();
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
  const [otp, setOtp] = React.useState("");
  const [countdown, setCountdown] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setShowResendButton(true);
    }
  }, [countdown]);

  const handleResend = () => {
    alert("Code resent!");
    setCountdown(30);
    setShowResendButton(false);
  };

  const handleChangeOTP = (newValue) => {
    const numericOtp = newValue.replace(/[^0-9]/g, ""); // Allow numbers only
    setOtp(numericOtp);
    console.log(numericOtp);
  };

  // Prevent non-numeric characters at the keypress level
  const handleKeyDown = (e) => {
    if (e.key.length === 1 && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

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
              Already have an account?
            </div>
            <button className="w-full md:w-auto nav-switch-button text-center">
              Login
            </button>
          </div>
        </div>
        <div className="w-full h-full gap-3 md:gap-0 flex justify-center items-center flex-col px-5 lg:px-28">
          <div className="w-full flex justify-center items-center">
            <img
              src={VerifyOTPImage.src}
              loading="lazy"
              alt="Image"
              className="h-[88px] w-[88px]"
            />
          </div>

          <div className="w-full text-center mt-5 otp-top-text">
            OTP Verification Code
          </div>

          <div className="w-full text-center otp-top-sub-text">
            Please check OTP on your email. We've sent an email to you at
          </div>

          <div className="w-full text-center otp-top-email-text">
            ******livas@gmail.com
          </div>

          <div className="w-full mt-5 mb-5 flex justify-center items-center flex-row gap-3">
            <div className="w-full h-[1px] bg-[#E2E4E9]"></div>
          </div>

          <div className="w-full mb-5 flex justify-center items-center">
            <MuiOtpInput
              onKeyDown={handleKeyDown}
              value={otp}
              onChange={handleChangeOTP}
              autoFocus
            />
          </div>

          <div className="w-full flex justify-center items-center">
            {/* <button className="w-full sb-form-submit-button-non-active"> */}
            <button
              onClick={() => {
                router.push("/onboarding");
              }}
              className="w-full sb-form-submit-button-active"
            >
              Verify
            </button>
          </div>

          <div className="w-full mt-5 flex gap-3 md:gap-0 justify-center items-center flex-row">
            <div className="w-full flex justify-center gap-1 md:justify-start items-center flex-row">
              {showResendButton ? (
                <>
                  <div
                    onClick={handleResend}
                    className="otp-change-email-text cursor-pointer"
                  >
                    Resend Code
                  </div>
                </>
              ) : (
                <>
                  <div className="otp-resend-text">Resend code:</div>
                  <div className="otp-resend-timer-text">00:{countdown}</div>
                </>
              )}
            </div>
            <div className="w-full flex justify-center md:justify-end items-center flex-row">
              <div className="otp-change-email-text cursor-pointer">
                Change Email
              </div>
            </div>
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

export default VerifyOTP;
