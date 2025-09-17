import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ArrowLeft, AlertTriangle, Info } from "lucide-react";
import logo from '../assets/5eabd60c02739fb2d3ae2828a4c5134319e7a60b.png';

interface PEPValidationProps {
  onBack: () => void;
  onContinue: (isPEP: boolean) => void;
}

export function PEPValidation({ onBack, onContinue }: PEPValidationProps) {
  const [pepStatus, setPepStatus] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pepStatus) {
      onContinue(pepStatus === "yes");
    }
  };

  const isFormValid = pepStatus !== "";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-100 bg-[rgba(137,192,65,1)]">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-lg"
          style={{
            backgroundColor: "#89c041", // color base
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
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-[rgba(255,255,255,1)] text-lg text-[20px] font-bold">
          Validación PEP
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#89c041' }}
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-gray-800 text-xl">
              Declaración PEP
            </h1>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Por favor, indique si usted es una Persona Políticamente Expuesta (PEP)
            </p>
          </div>

          {/* Information Card */}
          <Card className="bg-blue-50 border-blue-200 p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-blue-800 text-sm">
                  <strong>¿Qué es una PEP?</strong>
                </p>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Una Persona Políticamente Expuesta es aquella que desempeña o ha desempeñado 
                  funciones públicas prominentes, como altos funcionarios del gobierno, 
                  miembros del poder judicial, ejecutivos de empresas estatales, 
                  dirigentes de partidos políticos, entre otros.
                </p>
              </div>
            </div>
          </Card>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-gray-700">
                ¿Es usted una Persona Políticamente Expuesta (PEP)?
              </Label>
              
              <RadioGroup
                value={pepStatus}
                onValueChange={setPepStatus}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem 
                    value="no" 
                    id="no-pep"
                    className="text-[#89c041] border-gray-300"
                  />
                  <Label htmlFor="no-pep" className="text-gray-700 cursor-pointer flex-1">
                    No, no soy una Persona Políticamente Expuesta
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem 
                    value="yes" 
                    id="yes-pep"
                    className="text-[#89c041] border-gray-300"
                  />
                  <Label htmlFor="yes-pep" className="text-gray-700 cursor-pointer flex-1">
                    Sí, soy una Persona Políticamente Expuesta
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Additional Information for PEP */}
            {pepStatus === "yes" && (
              <Card className="bg-yellow-50 border-yellow-200 p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <p className="text-yellow-800 text-sm">
                      <strong>Información adicional requerida</strong>
                    </p>
                    <p className="text-yellow-700 text-xs leading-relaxed">
                      Como PEP, su solicitud requerirá documentación adicional y 
                      un proceso de verificación extendido de acuerdo con las 
                      regulaciones vigentes.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Continue Button */}
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full py-4 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isFormValid ? "#89c041" : "#d1d5db",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                if (isFormValid)
                  (e.target as HTMLButtonElement).style.backgroundColor = "#7bb535";
              }}
              onMouseLeave={(e) => {
                if (isFormValid)
                  (e.target as HTMLButtonElement).style.backgroundColor = "#89c041";
              }}
            >
              Continuar
            </Button>
          </form>

          {/* Legal Notice */}
          <div className="text-center">
            <p className="text-gray-500 text-xs leading-relaxed">
              Esta declaración es requerida por ley y debe ser veraz. 
              La información falsa puede resultar en el rechazo de su solicitud.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}