import { Button } from "./ui/button";
import gnbLogo from "../assets/ea601144222ed9ba57de5e273bb9d48a842ec571.png";

interface LandingPageProps {
  onOpenAccount: () => void;
  onLogin: () => void;
}

export function LandingPage({ onOpenAccount, onLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-12">
          {/* GNB Sudameris Logo */}
          <div className="flex justify-center mb-8">
            <img 
              src={gnbLogo} 
              alt="GNB Sudameris" 
              className="h-16 w-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6 max-w-sm">
          <h1 className="text-gray-800 text-2xl leading-tight">
            Abra su cuenta de forma 100% digital
          </h1>
          
          <p className="text-gray-600 text-base leading-relaxed">
            Sin filas, sin papeleo y sin costos ocultos. Comience a disfrutar de nuestros beneficios.
          </p>

          <Button
            onClick={onOpenAccount}
            className="w-full py-4 rounded-lg mt-8"
            style={{ 
              backgroundColor: '#89c041',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#7bb535'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#89c041'}
          >
            Abrir mi cuenta ahora
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6 text-center">
        <button
          onClick={onLogin}
          className="text-gray-600 text-base underline"
        >
          ¿Ya tiene una cuenta? Iniciar sesión
        </button>
      </div>
    </div>
  );
}