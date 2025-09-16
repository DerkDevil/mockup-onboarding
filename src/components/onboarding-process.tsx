import { useState, useEffect } from "react";
import { Progress } from "./ui/progress";
import { Check, Clock, Circle } from "lucide-react";

interface OnboardingProcessProps {
  onComplete: () => void;
}

interface Step {
  id: number;
  title: string;
  status: "completed" | "processing" | "pending";
}

export function OnboardingProcess({
  onComplete,
}: OnboardingProcessProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Validación de datos",
      status: "completed",
    },
    {
      id: 2,
      title: "Consultas listas restrictivas",
      status: "processing",
    },
    {
      id: 3,
      title: "Generación enlace biometría",
      status: "pending",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;

        // Update steps based on progress
        if (
          newProgress >= 25 &&
          steps[1].status === "processing"
        ) {
          setSteps((prevSteps) =>
            prevSteps.map((step) =>
              step.id === 2
                ? { ...step, status: "completed" }
                : step.id === 3
                  ? { ...step, status: "processing" }
                  : step,
            ),
          );
          setCurrentStep(1);
        }

        if (
          newProgress >= 50 &&
          steps[2].status === "processing"
        ) {
          setSteps((prevSteps) =>
            prevSteps.map((step) =>
              step.id === 3
                ? { ...step, status: "completed" }
                : step.id === 4
                  ? { ...step, status: "processing" }
                  : step,
            ),
          );
          setCurrentStep(2);
        }

        if (newProgress >= 100) {
          setSteps((prevSteps) =>
            prevSteps.map((step) =>
              step.id === 4
                ? { ...step, status: "completed" }
                : step,
            ),
          );
          setCurrentStep(3);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }

        return newProgress;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete, steps]);

  const getStepIcon = (step: Step) => {
    switch (step.status) {
      case "completed":
        return (
          <Check
            className="w-5 h-5"
            style={{ color: "#89c041" }}
          />
        );
      case "processing":
        return (
          <Clock
            className="w-5 h-5 animate-pulse"
            style={{ color: "#89c041" }}
          />
        );
      case "pending":
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full space-y-8">
          <h1 className="text-gray-800 text-xl text-center">
            Estamos procesando su solicitud
          </h1>

          {/* Progress Bar */}
          <div className="space-y-4">
            <Progress
              value={progress}
              className="w-full h-3 bg-gray-200"
            />
            <p className="text-center text-sm text-gray-600">
              {Math.round(progress)}% completado
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center space-x-4 p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor:
                    step.status === "processing"
                      ? "#f0f8ec"
                      : "#f9fafb",
                }}
              >
                <div className="flex-shrink-0">
                  {getStepIcon(step)}
                </div>
                <div className="flex-1">
                  <p
                    className={`${
                      step.status === "completed"
                        ? "text-gray-800"
                        : step.status === "processing"
                          ? "text-gray-800"
                          : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}