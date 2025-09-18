import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft, Camera, CheckCircle, RotateCcw, FileText } from "lucide-react";

interface DocumentCaptureProps {
  onBack: () => void;
  onComplete: () => void;
  documentType: string;
}

export function DocumentCapture({ onBack, onComplete, documentType }: DocumentCaptureProps) {
  const [captureState, setCaptureState] = useState<"camera" | "captured" | "confirmed">("camera");
  const [isCapturing, setIsCapturing] = useState(false);

  const handleTakePhoto = () => {
    setIsCapturing(true);
    
    // Simulate camera capture
    setTimeout(() => {
      setIsCapturing(false);
      setCaptureState("captured");
    }, 2000);
  };

  const handleRetakePhoto = () => {
    setCaptureState("camera");
  };

  const handleConfirmPhoto = () => {
    setCaptureState("confirmed");
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const renderCameraView = () => (
    <div className="space-y-6">
      {/* Camera Viewfinder */}
      <div className="relative">
        <div 
          className="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden"
          style={{
            backgroundImage: captureState === "captured" 
              ? "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)"
              : "none",
            backgroundSize: captureState === "captured" ? "20px 20px" : "auto",
            backgroundPosition: captureState === "captured" ? "0 0, 0 10px, 10px -10px, -10px 0px" : "auto"
          }}
        >
          {captureState === "camera" && (
            <div className="text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                Posicione su {documentType.toLowerCase()} dentro del marco
              </p>
            </div>
          )}

          {captureState === "captured" && (
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-600 text-sm">
                Documento capturado
              </p>
            </div>
          )}

          {/* Document frame overlay */}
          <div className="absolute inset-4 border-2 border-white rounded-lg shadow-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#89c041]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#89c041]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#89c041]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#89c041]"></div>
          </div>

          {/* Capturing overlay */}
          {isCapturing && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-[#89c041] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-[#89c041] text-sm animate-pulse">
                  Capturando...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {captureState === "camera" && (
          <Button
            onClick={handleTakePhoto}
            disabled={isCapturing}
            className="w-full py-4 rounded-lg"
            style={{
              backgroundColor: isCapturing ? "#d1d5db" : "#89c041",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              if (!isCapturing)
                (e.target as HTMLButtonElement).style.backgroundColor = "#7bb535";
            }}
            onMouseLeave={(e) => {
              if (!isCapturing)
                (e.target as HTMLButtonElement).style.backgroundColor = "#89c041";
            }}
          >
            <Camera className="w-5 h-5 mr-2" />
            {isCapturing ? "Capturando..." : "Tomar Foto"}
          </Button>
        )}

        {captureState === "captured" && (
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleRetakePhoto}
              variant="outline"
              className="py-4 rounded-lg border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Repetir
            </Button>
            <Button
              onClick={handleConfirmPhoto}
              className="py-4 rounded-lg"
              style={{
                backgroundColor: "#89c041",
                color: "#ffffff",
              }}
              onMouseEnter={(e) =>
                (e.target as HTMLButtonElement).style.backgroundColor = "#7bb535"
              }
              onMouseLeave={(e) =>
                (e.target as HTMLButtonElement).style.backgroundColor = "#89c041"
              }
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderConfirmedView = () => (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#89c041' }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>
      
      <div>
        <h2 className="text-gray-800 text-xl mb-2">
          Documento Verificado
        </h2>
        <p className="text-gray-600 text-base">
          Su documento ha sido capturado exitosamente
        </p>
      </div>

      <div className="w-8 h-8 border-4 border-[#89c041] border-t-transparent rounded-full animate-spin mx-auto"></div>
      
      <p className="text-gray-500 text-sm">
        Procesando información...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100 bg-[#89c041]">
        {captureState !== "confirmed" && (
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-lg"
            style={{
              backgroundColor: "#89c041",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#7bb535")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor = "#89c041")
            }
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        )}
        <div className="flex-1 text-center">
          <h2 className="text-white text-lg">
            GNB Sudameris
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto space-y-6">
          {captureState !== "confirmed" && (
            <>
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#89c041' }}
                  >
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h1 className="text-gray-800 text-xl">
                  Captura de Documento
                </h1>
                
                <p className="text-gray-600 text-base leading-relaxed">
                  Tome una foto clara de su {documentType.toLowerCase()} por ambos lados
                </p>
              </div>

              {/* Instructions */}
              <Card className="bg-blue-50 border-blue-200 p-4">
                <h4 className="text-blue-800 text-sm mb-3">
                  Instrucciones para la captura:
                </h4>
                <ul className="text-blue-700 text-xs space-y-1 leading-relaxed">
                  <li>• Asegúrese de que el documento esté bien iluminado</li>
                  <li>• Evite reflejos y sombras</li>
                  <li>• Mantenga el documento plano y completo en el marco</li>
                  <li>• La información debe ser legible</li>
                </ul>
              </Card>

              {renderCameraView()}
            </>
          )}

          {captureState === "confirmed" && renderConfirmedView()}
        </div>
      </div>
    </div>
  );
}