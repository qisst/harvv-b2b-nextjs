import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Button,
  StepConnector,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const steps = [
  {
    label: "Select campaign settings",
    description: [
      "For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions.",
      "You can specify networks and geographical locations where you want your ads to show.",
    ],
  },
  {
    label: "Create an ad group",
    description: [
      "An ad group contains one or more ads which target a shared set of keywords.",
      "You can set a maximum cost-per-click bid for all the keywords in an ad group.",
    ],
  },
  {
    label: "Create an ad",
    description: [
      "Try out different ad text to see what brings in the most customers.",
      "If you run into any issues, you can pause, edit, or delete your ads anytime.",
    ],
  },
];

export default function CustomStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [index, setIndex] = useState(0);

  const handleNext = (index) => {
    setActiveStep((prevStep) => prevStep + 1);
    setIndex(index);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        connector={
          <StepConnector
            sx={{
              "& .MuiStepConnector-line": {
                borderLeft:
                  activeStep > index
                    ? "2px solid #17B26A"
                    : "2px solid #EAECF0", // Green for completed steps, default color for uncompleted steps
                // pl: 2,
                // mb: 2,
                mt: 0,
              },
            }}
          />
        }
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              icon={
                activeStep > index ? (
                  <>
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
                        d="M17.0965 7.38967L9.9365 14.2997L8.0365 12.2697C7.6865 11.9397 7.1365 11.9197 6.7365 12.1997C6.3465 12.4897 6.2365 12.9997 6.4765 13.4097L8.7265 17.0697C8.9465 17.4097 9.3265 17.6197 9.7565 17.6197C10.1665 17.6197 10.5565 17.4097 10.7765 17.0697C11.1365 16.5997 18.0065 8.40967 18.0065 8.40967C18.9065 7.48967 17.8165 6.67967 17.0965 7.37967V7.38967Z"
                        fill="white"
                      />
                    </svg>
                  </>
                ) : activeStep === index ? (
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
                ) : (
                  <>
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
                  </>
                )
              }
              sx={{
                "& .MuiStepLabel-root": {
                  display: "flex",
                  alignItems: "center",
                },
                "& .MuiStepLabel-labelContainer": {
                  ml: 1,
                },
              }}
            >
              {step.label}
            </StepLabel>
            <StepContent
              sx={{
                borderLeft:
                  activeStep > index
                    ? "2px solid #17B26A"
                    : "2px solid #EAECF0",
                // pl: 2,
                // mb: 2,
              }}
            >
              {step.description.map((desc, i) => (
                <Typography
                  key={i}
                  // sx={{ mb: 1 }}
                >
                  {desc}
                </Typography>
              ))}
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    handleNext(index);
                  }}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={activeStep === steps.length - 1}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography>All steps completed!</Typography>
          <Button onClick={handleReset} sx={{ mt: 2 }}>
            Reset
          </Button>
        </Box>
      )}
    </Box>
  );
}
