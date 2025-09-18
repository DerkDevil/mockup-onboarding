import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle } from "lucide-react";
import gnbLogo from "../assets/ea601144222ed9ba57de5e273bb9d48a842ec571.png";

interface AccountSuccessProps {
  readonly onGoToUserRegistration: () => void;
}

export function AccountSuccess({ onGoToUserRegistration }: AccountSuccessProps) {
  // Generate a mock account number
  const accountNumber = "4000-1234-5678-9012";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo */}
      <div className="bg-white p-6 pb-4 text-center">
        <img 
          src={gnbLogo} 
          alt="GNB Sudameris" 
          className="h-12 mx-auto"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 pt-2">
        <div className="max-w-sm w-full text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#89c041' }}
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-gray-800 text-2xl">
              ¡Felicitaciones!
            </h1>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Su cuenta ha sido creada exitosamente. Ya puede acceder a su banca virtual.
            </p>
          </div>

          {/* Account Information */}
          <Card 
            className="bg-gray-50 border-2 p-6 space-y-4"
            style={{ borderColor: '#89c041' }}
          >
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-2">
                Número de cuenta:
              </p>
              <p className="text-gray-800 text-lg">
                {accountNumber}
              </p>
            </div>
            
            <div 
              className="border-t pt-4 space-y-2"
              style={{ borderColor: '#89c041', opacity: 0.3 }}
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tipo de cuenta:</span>
                <span className="text-gray-800">Ahorros</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estado:</span>
                <span style={{ color: '#89c041' }}>Activa</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Saldo disponible:</span>
                <span className="text-gray-800">$0.00 COP</span>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <div className="space-y-4">
            <Button
              onClick={onGoToUserRegistration}
              className="w-full py-4 rounded-lg"
              style={{ 
                backgroundColor: '#89c041',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#7bb535'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#89c041'}
            >
              Continuar con el registro de usuario
            </Button>
            <p className="text-gray-500 text-xs leading-relaxed">
              Recuerde guardar esta información en un lugar seguro. Su número de cuenta le será solicitado para realizar transacciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}