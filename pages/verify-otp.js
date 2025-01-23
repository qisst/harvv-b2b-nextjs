import React, { useEffect, useState } from "react";
import HarvvLogo from "@/public/logo/logo_harvv.png";
import VerifyOTPImage from "@/public/images/verify-otp-img.png";
import Images from "@/public/images/sign-up-images.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setEmail, setResendOTPTimer } from "../redux/userSlice";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import LogoHarvv from "@/public/images/harvv-logo-custom.png";
import Tooltip from "@mui/material/Tooltip";

function VerifyOTP() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = React.useState("");
  const [countdown, setCountdown] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false);
  const emailRedux = useSelector((state) => state.user.email);
  const uuid = useSelector((state) => state.user.uuid);
  const [otpEmailSendTime, setOtpEmailSendTime] = useState(
    useSelector((state) => state.user.resendOTPTimer)
  );
  const [disableButton, setDisableButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingChangeEmail, setLoadingChangeEmail] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [email, setEmail1] = useState(emailRedux ? emailRedux : "");
  const [emailChange, setEmailChange] = useState("");

  useEffect(() => {
    if (!otpEmailSendTime) return;

    // Ensure the backend time is in a compatible format
    const emailSendTime = new Date(otpEmailSendTime * 1000);
    const currentTime = new Date();

    if (isNaN(emailSendTime)) {
      console.error("Invalid otpResendTime:", otpEmailSendTime);
      return;
    }

    // Calculate elapsed time
    const elapsedSeconds = Math.floor((currentTime - emailSendTime) / 1000);

    // Calculate remaining time from 30 seconds
    const updatedRemainingTime = Math.max(29 - elapsedSeconds, 0);

    setCountdown(updatedRemainingTime);

    // Set interval to update countdown
    const timer = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor((now - emailSendTime) / 1000);
      const remaining = Math.max(29 - elapsed, 0);

      setCountdown(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        setShowResendButton(true);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [otpEmailSendTime]);

  // useEffect(() => {
  //   if (countdown > 0) {
  //     const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  //     return () => clearTimeout(timer); // Cleanup on unmount
  //   } else {
  //     setShowResendButton(true);
  //   }
  // }, [countdown]);

  const handleResend = () => {
    try {
      const raw = "";

      const requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
      };

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/signup/create-account/resend-email/${uuid}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.status === true) {
            dispatch(setResendOTPTimer(result.data.email_send_at));
            setOtpEmailSendTime(result.data.email_send_at);
            enqueueSnackbar("OTP sent successfully!", {
              dense: true,
              autoHideDuration: 5000,
              variant: "success",
              preventDuplicate: true,
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
            });
            // setCountdown(31);
            setShowResendButton(false);
          } else {
            enqueueSnackbar("Some error occurred, please try again!", {
              dense: true,
              autoHideDuration: 5000,
              variant: "error",
              preventDuplicate: true,
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
            });
            setShowResendButton(true);
          }
        })
        .catch((error) => {
          enqueueSnackbar("Some error occurred, please try again!", {
            dense: true,
            autoHideDuration: 5000,
            variant: "error",
            preventDuplicate: true,
            anchorOrigin: {
              horizontal: "center",
              vertical: "bottom",
            },
          });
          console.log("ERROR: ", error.message);
          setShowResendButton(true);
        });
    } catch (error) {
      enqueueSnackbar("Some error occurred, please try again!", {
        dense: true,
        autoHideDuration: 5000,
        variant: "error",
        preventDuplicate: true,
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
      });
      console.log("ERROR: ", error.message);
      setShowResendButton(true);
    }
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

  const handleChangeEmail = () => {
    setLoadingChangeEmail(true);

    if (emailChange !== "" && emailChange !== emailRedux) {
      // Check for numbers
      if (
        /^(?![a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$).*$/.test(
          emailChange
        )
      ) {
        enqueueSnackbar("Invalid Email!", {
          dense: true,
          autoHideDuration: 5000,
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "center",
            vertical: "bottom",
          },
        });
        setLoadingChangeEmail(false);
      }
      // If all validations pass
      else {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          const raw = JSON.stringify({
            email: emailChange,
          });

          const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/signup/create-account/change-email/${uuid}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              if (result.status === true) {
                enqueueSnackbar("Email changed successfully!", {
                  dense: true,
                  autoHideDuration: 5000,
                  variant: "success",
                  preventDuplicate: true,
                  anchorOrigin: {
                    horizontal: "center",
                    vertical: "bottom",
                  },
                });
                setLoadingChangeEmail(false);
                dispatch(setEmail(emailChange));
                setEmail1(emailChange);
                setEmailChange("");
                setOpen2(false);
              } else {
                enqueueSnackbar("Some error occurred, please try again!", {
                  dense: true,
                  autoHideDuration: 5000,
                  variant: "error",
                  preventDuplicate: true,
                  anchorOrigin: {
                    horizontal: "center",
                    vertical: "bottom",
                  },
                });
                setLoadingChangeEmail(false);
              }
            })
            .catch((error) => {
              enqueueSnackbar("Some error occurred, please try again!", {
                dense: true,
                autoHideDuration: 5000,
                variant: "error",
                preventDuplicate: true,
                anchorOrigin: {
                  horizontal: "center",
                  vertical: "bottom",
                },
              });
              setLoadingChangeEmail(false);
            });
        } catch (error) {
          enqueueSnackbar("Some error occurred, please try again!", {
            dense: true,
            autoHideDuration: 5000,
            variant: "error",
            preventDuplicate: true,
            anchorOrigin: {
              horizontal: "center",
              vertical: "bottom",
            },
          });
          setLoadingChangeEmail(false);
        }
      }
    } else {
      if (emailChange === "") {
        enqueueSnackbar("Please input email!", {
          dense: true,
          autoHideDuration: 5000,
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "center",
            vertical: "bottom",
          },
        });
      }
      if (emailChange === email) {
        enqueueSnackbar("Email is same as previous email!", {
          dense: true,
          autoHideDuration: 5000,
          variant: "error",
          preventDuplicate: true,
          anchorOrigin: {
            horizontal: "center",
            vertical: "bottom",
          },
        });
      }
      setLoadingChangeEmail(false);
    }
  };

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
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          otp: otp.toString(),
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/signup/create-account/verify-otp/${uuid}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.status === true) {
              enqueueSnackbar("OTP verified successfully!", {
                dense: true,
                autoHideDuration: 5000,
                variant: "success",
                preventDuplicate: true,
                anchorOrigin: {
                  horizontal: "center",
                  vertical: "bottom",
                },
              });
              setLoading(false);
              router.push("/onboarding");
            } else {
              enqueueSnackbar(result.message + "!", {
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
            }
          })
          .catch((error) => {
            enqueueSnackbar("Some error occurred, please try again!", {
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
          });
      } catch (error) {
        enqueueSnackbar("Some error occurred, please try again!", {
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
      }
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
              <div
                onClick={() => setOpen2(true)}
                className="w-full flex justify-center md:justify-end items-center flex-row"
              >
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

      {/* Modal 2 */}

      <Dialog
        open={open2}
        onClose={() => setOpen2(false)}
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
                        setEmailChange("");
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
                    Change Email
                  </div>
                  <div className="w-full mt-3 flex justify-center items-center">
                    <div className="w-full flex gap-1 justify-start items-center flex-col">
                      <div className="w-full flex justify-start items-start">
                        <div className="sb-form-label">Input Email:</div>
                        {/* <div className="ob-required-start">*</div> */}
                      </div>
                      {/* Input Field with Icons */}
                      <div className="relative w-full">
                        {/* Email Icon */}
                        <svg
                          className="absolute left-3 top-1/2 transform -translate-y-1/2"
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

                        {/* Input Field */}
                        <input
                          type="email"
                          value={emailChange}
                          onChange={(e) => setEmailChange(e.target.value)}
                          placeholder="Input email address"
                          className={`w-full sb-form-input-field-icon-left outline-none`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full border-[1px] gap-3 border-[#E2E4E9] px-5 py-4 flex justify-center items-center flex-col md:flex-row">
                  <button
                    onClick={() => {
                      setOpen2(false);
                      setEmailChange("");
                    }}
                    className="sb-form-cancel-button bg-[#fff] w-full"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loadingChangeEmail}
                    onClick={() => {
                      handleChangeEmail();
                    }}
                    className={`w-full sb-form-submit-button-active`}
                  >
                    {loadingChangeEmail ? (
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
                      "Confirm"
                    )}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default VerifyOTP;
