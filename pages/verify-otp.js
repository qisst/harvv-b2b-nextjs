import React, { useEffect, useState } from "react";
import HarvvLogo from "@/public/logo/logo_harvv.png";
import VerifyOTPImage from "@/public/images/verify-otp-img.png";
import Images from "@/public/images/sign-up-images.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ThreeDots } from "react-loader-spinner";

function VerifyOTP() {
  const router = useRouter();
  const [otp, setOtp] = React.useState("");
  const [countdown, setCountdown] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const email = useSelector((state) => state.user.email);
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    } else {
      setShowResendButton(true);
    }
  }, [countdown]);

  const handleResend = () => {
    enqueueSnackbar("OTP Resent Successfully!", {
      dense: true,
      autoHideDuration: 5000,
      variant: "success",
      preventDuplicate: true,
      anchorOrigin: {
        horizontal: "center",
        vertical: "bottom",
      },
    });
    setCountdown(30);
    setShowResendButton(false);
  };

  const handleChangeOTP = (newValue) => {
    const numericOtp = newValue.replace(/[^0-9]/g, ""); // Allow numbers only
    setOtp(numericOtp);
  };

  // Prevent non-numeric characters at the keypress level
  const handleKeyDown = (e) => {
    if (e.key.length === 1 && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (otp === "" || Number(otp.length) !== 4) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
      handleVerifyOTP();
    }
  }, [otp]);

  const handleVerifyOTP = () => {
    setLoading(true);
    if (otp === "" || Number(otp.length) !== 4) {
      enqueueSnackbar("Invalid OTP!", {
        dense: true,
        autoHideDuration: 5000,
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
      });
      setLoading(false);
    } else {
      setLoading(false);
      router.push("/onboarding");
    }
  };

  return (
    <>
      <SnackbarProvider />
      <div className="bg-white w-full md:h-screen flex justify-start items-center flex-col md:flex-row">
        <div className="md:w-3/5 md:h-screen md:overflow-auto gap-5 w-full flex justify-start items-center flex-col">
          <div className="w-full border-b-[1px] border-[#F2F4F7] gap-3 md:gap-0 flex justify-between items-center flex-row py-5 px-5 md:py-5 md:px-11">
            <div className="w-full flex justify-start items-center">
              <img
                src={HarvvLogo.src}
                loading="lazy"
                alt="Logo"
                className="h-7 md:h-12 w-auto"
              />
            </div>
            <div className="w-full flex justify-end items-center flex-row gap-3">
              <div className="w-full hidden md:flex md:w-auto text-center nav-switch-text">
                Already have an account?
              </div>
              <button className="w-auto nav-switch-button text-center">
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

            <div className="w-full text-center otp-top-email-text">{email}</div>

            <div className="w-full mt-5 mb-5 flex justify-center items-center flex-row gap-3">
              <div className="w-full h-[1px] bg-[#E2E4E9]"></div>
            </div>

            <div className="w-full mb-5 flex justify-center items-center">
              <MuiOtpInput
                length={4}
                onKeyDown={handleKeyDown}
                value={otp}
                onChange={handleChangeOTP}
                autoFocus
              />
            </div>

            <div className="w-full flex justify-center items-center">
              {/* <button className="w-full sb-form-submit-button-non-active"> */}
              <button
                disabled={disableButton || loading}
                onClick={() => {
                  handleVerifyOTP();
                }}
                className={`w-full ${
                  disableButton
                    ? "sb-form-submit-button-non-active"
                    : "sb-form-submit-button-active"
                }`}
              >
                {loading ? (
                  <>
                    <div className="w-full flex justify-center items-center">
                      <ThreeDots
                        visible={true}
                        height="20"
                        color="#fff"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      />
                    </div>
                  </>
                ) : (
                  "Verify"
                )}
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
    </>
  );
}

export default VerifyOTP;
