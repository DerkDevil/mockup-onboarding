import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface OTPValidationProps {
  onVerify: () => void;
  phone: string;
}

export function OTPValidation({ onVerify, phone }: OTPValidationProps) {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Format phone number for display
  const formatPhone = (phone: string) => {
    if (phone.length >= 10) {
      return `(${phone.slice(-10, -7)}) ${phone.slice(-7, -4)}-${phone.slice(-4)}`;
    }
    return phone;
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    // Here would go the actual resend logic
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full text-center space-y-8">
          <h1 className="text-gray-800 text-xl">
            Valide su identidad
          </h1>

          <div className="space-y-6">
            <p className="text-gray-600 text-base">
              Hemos enviado un código de 6 dígitos a su celular: {formatPhone(phone)}
            </p>

            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="border-gray-200" style={{ '--tw-ring-color': '#89c041', borderColor: '#d1d5db' } as any} />
                  <InputOTPSlot index={1} className="border-gray-200" style={{ '--tw-ring-color': '#89c041', borderColor: '#d1d5db' } as any} />
                  <InputOTPSlot index={2} className="border-gray-200" style={{ '--tw-ring-color': '#89c041', borderColor: '#d1d5db' } as any} />
                  <InputOTPSlot index={3} className="border-gray-200" style={{ '--tw-ring-color': '#89c041', borderColor: '#d1d5db' } as any} />
                  <InputOTPSlot index={4} className="border-gray-200" style={{ '--tw-ring-color': '#89c041', borderColor: '#d1d5db' } as any} />
                  <InputOTPSlot index={5} className="border-gray-200" style={{ '--tw-ring-color': '#89c041', borderColor: '#d1d5db' } as any} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6}
              className="w-full py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: otp.length === 6 ? '#89c041' : '#d1d5db',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => {
                if (otp.length === 6) (e.target as HTMLButtonElement).style.backgroundColor = '#7bb535';
              }}
              onMouseLeave={(e) => {
                if (otp.length === 6) (e.target as HTMLButtonElement).style.backgroundColor = '#89c041';
              }}
            >
              Confirmar
            </Button>

            {/* Resend Option */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-sm underline"
                  style={{ color: '#1b71a7' }}
                >
                  Reenviar código
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Reenviar código en {countdown}s
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}