"use client";

import { useState, FC } from "react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ChevronLeft, Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import { Textarea } from "./ui/textarea";

const technologies = [
  "JavaScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "PHP",
  "Ruby",
  "Swift",
  "Go",
  "Kotlin",
];

interface StepProps {
  handleTechChange?: (tech: string) => void;
  selectedTechnologies?: string[];
  nextStep?: () => void;
  setStep?: (step: number) => void;
}

interface Step2Props extends StepProps {
  occupation: string;
  setOccupation: (value: string) => void;
}

interface Step3Props extends StepProps {
  sliderValue: number[];
  setSliderValue: (value: number[]) => void;
  handleSubmit: (event: React.FormEvent) => void;
  submitting: boolean;
  submitButtonText: string;
}

const Step1: FC<StepProps> = ({
  handleTechChange,
  selectedTechnologies,
  nextStep,
}) => (
  <>
    <h2 className="text-2xl mb-4 font-medium">
      What technologies do you work with?
    </h2>
    <div className="flex flex-wrap justify-center mb-4 gap-2">
      {technologies.map((tech, index) => (
        <Button
          key={index}
          type="button"
          onClick={() => handleTechChange && handleTechChange(tech)}
          variant={selectedTechnologies?.includes(tech) ? "default" : "outline"}
        >
          {tech}
        </Button>
      ))}
    </div>
    <Button onClick={nextStep} type="button">
      Next
    </Button>
  </>
);

const Step2: FC<Step2Props> = ({
  setStep,
  occupation,
  setOccupation,
  nextStep,
}) => (
  <>
    <h2 className="text-2xl mb-4 font-medium">
      What is your current occupation?
    </h2>
    <Input
      value={occupation}
      onChange={(e) => setOccupation(e.target.value)}
      placeholder="Enter your occupation"
      className="mb-4"
    />
    <div className="flex justify-between">
      <Button
        className="gap-1.5"
        variant={"outline"}
        type="button"
        onClick={() => setStep && setStep(1)}
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>
      <Button onClick={nextStep} type="button">
        Next
      </Button>
    </div>
  </>
);

const Step3: FC<Step3Props> = ({
  setStep,
  sliderValue,
  setSliderValue,
  handleSubmit,
  submitting,
  submitButtonText,
}) => {
  return (
    <>
      <h2 className="text-2xl mb-4 font-medium">
        How many years of experience do you have?
      </h2>
      <h3>{sliderValue[0] == 20 ? "20+" : sliderValue[0]} years</h3>
      <Slider
        min={0}
        defaultValue={sliderValue}
        max={20}
        step={1}
        className="py-4"
        onValueChange={(e) => setSliderValue(e)}
      />
      <div className="flex justify-between">
        <Button
          className="gap-1.5"
          variant={"outline"}
          type="button"
          onClick={() => setStep && setStep(2)}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={submitting}
          className="gap-1.5"
        >
          {submitting ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <motion.div
                key={submitButtonText}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {submitButtonText}
              </motion.div>
            </div>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </>
  );
};

interface StepAboutMeProps extends StepProps {
  aboutMe: string;
  setAboutMe: (value: string) => void;
  setStep: (step: number) => void;
}

const StepAboutMe: FC<StepAboutMeProps> = ({
  setStep,
  aboutMe,
  setAboutMe,
  nextStep,
}) => (
  <>
    <h2 className="text-2xl mb-4 font-medium">Tell us a little bit about yourself!</h2>
    <Textarea
      value={aboutMe}
      onChange={(e) => setAboutMe(e.target.value)}
      placeholder="About Me"
      className="mb-4"
    />
    <div className="flex justify-between">
      <Button
        className="gap-1.5"
        variant={"outline"}
        type="button"
        onClick={() => setStep(0)} 
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>
      <Button onClick={nextStep} type="button">
        Next
      </Button>
    </div>
  </>
);

const IntroduceYourself: FC = () => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [sliderValue, setSliderValue] = useState([0]);
  const [step, setStep] = useState(0);
  const [aboutMe, setAboutMe] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState("Submit");
  const [occupation, setOccupation] = useState("");
  const router = useRouter();
  const user = useCurrentUser();

  if (!user) {
    return null;
  }

  const handleTechChange = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setSubmitting(true);
    setSubmitButtonText("Submitting...");

    // Simulate the delay of the submission process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitButtonText("Getting Zephyr ready for you...");

    // Simulate the delay of the next process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitButtonText("Customizing your experience...");

    // Simulate the delay of the final process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitButtonText("All done!");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Send the data to the API
    try {
      await axios.post("/api/onboarding", {
        technologies: selectedTechnologies,
        experience: sliderValue[0],
        occupation: occupation,
        bio: aboutMe,
        userId: user!.id,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
    setSubmitting(false);
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence>
        <motion.div
          className="w-full h-screen flex flex-col justify-center items-center"
          initial="hidden"
          animate="show"
          exit="exit"
          variants={variants}
          key={step}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <form className="text-center">
            <h2 className="text-xl mb-4">Hi, {user!.name?.split(" ")[0]}.</h2>
            {step === 0 && (
              <Step1
                handleTechChange={handleTechChange}
                selectedTechnologies={selectedTechnologies}
                nextStep={nextStep}
              />
            )}
            {step === 1 && (
              <StepAboutMe setStep={setStep} aboutMe={aboutMe} nextStep={nextStep} setAboutMe={setAboutMe} />
            )}
            {step === 2 && (
              <Step2
                setStep={setStep}
                occupation={occupation}
                setOccupation={setOccupation}
                nextStep={nextStep}
              />
            )}
            {step === 3 && (
              <Step3
                setStep={setStep}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
                handleSubmit={handleSubmit}
                submitting={submitting}
                submitButtonText={submitButtonText}
              />
            )}
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default IntroduceYourself;
