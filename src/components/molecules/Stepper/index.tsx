import Step from "./Step";

interface StepperProps {
  steps: string[];
  step: number;
}

const Stepper = ({ steps, step }: StepperProps) => {
  return (
    <ul className="relative flex flex-row gap-x-2">
      {steps.map((stepLabel, index) => (
        <Step
          key={index}
          number={index + 1}
          label={stepLabel}
          isActive={step === index}
          isCompleted={step > index}
        />
      ))}
    </ul>
  );
};

export default Stepper;
