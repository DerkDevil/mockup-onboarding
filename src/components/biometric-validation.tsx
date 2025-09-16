import { useState } from "react";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import logo from "figma:asset/5eabd60c02739fb2d3ae2828a4c5134319e7a60b.png";
import biometricIcon from "figma:asset/f9f90ded2948cdaa2d1cfed26b71f129d8053da5.png";

interface BiometricValidationProps {
  onComplete: () => void;
}

export function BiometricValidation({
  onComplete,
}: BiometricValidationProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleStartValidation = () => {
    setIsScanning(true);

    // Simulate biometric scanning process
    setTimeout(() => {
      setIsScanning(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full text-center space-y-8">
          <h1 className="text-gray-800 text-xl">
            Complete la validación biométrica
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            Para verificar su identidad, por favor, toque el
            botón para comenzar el escaneo facial.
          </p>

          {/* Biometric Circle */}
          <div className="flex justify-center py-8">
            <div
              className={`
              relative w-48 h-48 rounded-full border-4 
              flex items-center justify-center
              transition-all duration-300"
              style={{
                borderColor: '#89c041',
                backgroundColor: isScanning ? '#f0f8ec' : 'transparent',
                animation: isScanning ? 'pulse 2s infinite' : 'none'
              }}
            `}
            >
              <div
                className={`
                w-32 h-32 rounded-full 
                flex items-center justify-center"
                style={{
                  backgroundColor: isScanning ? '#e6f4d9' : '#f3f4f6'
                }}
              `}
              >
                <img
                  src={biometricIcon}
                  alt="Validación biométrica"
                  className="w-16 h-16 object-center"
                  style={{
                    filter: isScanning
                      ? "none"
                      : "grayscale(100%)",
                    opacity: isScanning ? 1 : 0.6,
                    display: "block",
                    margin: "auto",
                  }}
                />
              </div>

              {/* Scanning animation rings */}
              {isScanning && (
                <>
                  <div
                    className="absolute inset-0 rounded-full border-2 animate-ping"
                    style={{ borderColor: "#a3c96b" }}
                  ></div>
                  <div
                    className="absolute inset-4 rounded-full border-2 animate-ping delay-150"
                    style={{ borderColor: "#b8d487" }}
                  ></div>
                </>
              )}
            </div>
          </div>

          {/* Status Text */}
          {isScanning && (
            <div className="space-y-2">
              <p
                className="text-base animate-pulse"
                style={{
                  color: "#89c041",
                }}
              >
                Escaneando rostro...
              </p>
              <p className="text-gray-600 text-sm">
                Mantenga su rostro dentro del círculo
              </p>
            </div>
          )}

          {/* Start Button */}
          {!isScanning && (
            <Button
              onClick={handleStartValidation}
              className="w-full py-4 rounded-lg mt-8"
              style={{
                backgroundColor: "#89c041",
                color: "#ffffff",
              }}
              onMouseEnter={(e) =>
                ((
                  e.target as HTMLButtonElement
                ).style.backgroundColor = "#7bb535")
              }
              onMouseLeave={(e) =>
                ((
                  e.target as HTMLButtonElement
                ).style.backgroundColor = "#89c041")
              }
            >
              Iniciar Validación
            </Button>
          )}

          {/* Processing Button */}
          {isScanning && (
            <Button
              disabled
              className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed"
            >
              Procesando...
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}