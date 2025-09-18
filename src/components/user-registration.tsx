import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ArrowLeft, Eye, EyeOff, Check, X, User, Lock } from "lucide-react";

interface UserRegistrationProps {
  onBack: () => void;
  onComplete: (credentials: UserCredentials) => void;
}

interface UserCredentials {
  username: string;
  password: string;
}

export function UserRegistration({ onBack, onComplete }: Readonly<UserRegistrationProps>) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Username: 6-12 chars, at least 2 numbers, cannot be ID number (not checked here)
  const usernameValidations = {
    length: formData.username.length >= 6 && formData.username.length <= 12,
    numbers: (formData.username.match(/\d/g)?.length || 0) >= 2,
    // Optionally: not equal to ID number (not available in this form)
  };
  const isUsernameValid = Object.values(usernameValidations).every(Boolean);

  // Password: 8-10 chars, at least one number and one letter
  const passwordValidations = {
    length: formData.password.length >= 8 && formData.password.length <= 10,
    number: /\d/.test(formData.password),
    letter: /[a-zA-Z]/.test(formData.password),
  };
  const isPasswordValid = Object.values(passwordValidations).every(Boolean);
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== "";

  const isFormValid = isPasswordValid && passwordsMatch && isUsernameValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      onComplete({
        username: formData.username,
        password: formData.password,
      });
    }
  };

function ValidationItem({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      {isValid ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={`text-sm ${isValid ? 'text-green-600' : 'text-red-500'}`}>
        {text}
      </span>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100 bg-[#89c041]">
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
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-gray-800 text-xl">
              Crear Usuario y Contraseña
            </h1>
            
            <p className="text-gray-600 text-base leading-relaxed">
              Configure sus credenciales de acceso para la banca digital
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-600">
                Usuario de Banca Virtual
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    })
                  }
                  className="pl-10 border-gray-200 text-gray-700"
                  style={{ "--tw-ring-color": "#89c041" } as any}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#89c041")
                  }
                  placeholder="Ingrese su usuario de banca virtual"
                  required
                />
              </div>
              {formData.username.length > 0 && (
                <Card className="bg-gray-50 border-gray-200 p-2 mt-2">
                  <ValidationItem 
                    isValid={usernameValidations.length} 
                    text="Mínimo 6 y máximo 12 caracteres" 
                  />
                  <ValidationItem 
                    isValid={usernameValidations.numbers} 
                    text="Debe incluir por lo menos dos números" 
                  />
                </Card>
              )}
              <p className="text-xs text-gray-500 mt-1">
                No puede ser su número de identificación.
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-600">
                Clave deseada en Banca Virtual
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="pl-10 pr-10 border-gray-200 text-gray-700"
                  style={{ "--tw-ring-color": "#89c041" } as any}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#89c041")
                  }
                  placeholder="Cree su clave de banca virtual"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.password.length > 0 && (
                <Card className="bg-gray-50 border-gray-200 p-2 mt-2">
                  <ValidationItem 
                    isValid={passwordValidations.length} 
                    text="Mínimo 8 y máximo 10 caracteres" 
                  />
                  <ValidationItem 
                    isValid={passwordValidations.number} 
                    text="Debe incluir por lo menos un número" 
                  />
                  <ValidationItem 
                    isValid={passwordValidations.letter} 
                    text="Debe incluir por lo menos una letra" 
                  />
                </Card>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-600">
                Confirmar contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="pl-10 pr-10 border-gray-200 text-gray-700"
                  style={{ "--tw-ring-color": "#89c041" } as any}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "#89c041")
                  }
                  placeholder="Confirme su contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="flex items-center space-x-2">
                  {passwordsMatch ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">
                        Las contraseñas coinciden
                      </span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">
                        Las contraseñas no coinciden
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Security Note */}
            <Card className="bg-blue-50 border-blue-200 p-4">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-blue-800 text-sm">
                    <strong>Seguridad</strong>
                  </p>
                  <p className="text-blue-700 text-xs leading-relaxed">
                    Sus credenciales están protegidas con encriptación de alta seguridad. 
                    Nunca comparta su usuario y contraseña con terceros.
                  </p>
                </div>
              </div>
            </Card>

            {/* Create Account Button */}
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
              Crear Cuenta
            </Button>
          </form>

          {/* Legal Notice */}
          <div className="text-center">
            <p className="text-gray-500 text-xs leading-relaxed">
              Al crear su cuenta, usted acepta que sus credenciales serán utilizadas 
              exclusivamente para acceder a los servicios de GNB Sudameris.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}