import React from "react";
import "./StepProgress.css";
import { FaCheck } from "react-icons/fa6";
function StepProgress({ step }) {
  const steps = ["Address", "Order Summary", "Payment", "Confirm"];

  return (
    <>
      <div className="step-progress-section">
        <div className="step-container">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = step > stepNumber;
            const isActive = step === stepNumber;

            return (
              <React.Fragment key={index}>
                <div className="step-item">
                  <div
                    className={`circle 
                  ${isCompleted ? "completed" : ""} 
                  ${isActive ? "active" : ""}`}
                  >
                    {isCompleted ? <FaCheck /> : stepNumber}
                  </div>

                  <p
                    className={`label 
                  ${isCompleted ? "completed-text" : ""} 
                  ${isActive ? "active-text" : ""}`}
                  >
                    {label}
                  </p>
                </div>

                {index !== steps.length - 1 && (
                  <div className="line-container">
                    <div
                      className={`line ${step > stepNumber ? "line-active" : ""}`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="hr-line"></div>
      </div>
    </>
  );
}

export default StepProgress;
