import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { ProductInfo } from "./components/product-info";
import { DataForm } from "./components/data-form";
import { OTPValidation } from "./components/otp-validation";
import { OnboardingProcess } from "./components/onboarding-process";
import { BiometricValidation } from "./components/biometric-validation";
import { TermsConditions } from "./components/terms-conditions";
import { AccountSuccess } from "./components/account-success";

type Screen = 
  | "landing" 
  | "product-info" 
  | "data-form" 
  | "otp-validation" 
  | "onboarding-process" 
  | "biometric-validation" 
  | "terms-conditions" 
  | "account-success";

interface FormData {
  fullName: string;
  idNumber: string;
  birthDate: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [formData, setFormData] = useState<FormData | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    navigateTo("otp-validation");
  };

  const handleLogin = () => {
    // In a real app, this would navigate to a login screen
    alert("Esta funcionalidad redirigirá a la página de inicio de sesión");
  };

  const handleGoToBanking = () => {
    // In a real app, this would redirect to the banking portal
    alert("¡Bienvenido a GNB Sudameris! Esta funcionalidad lo llevará a su banca virtual.");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "landing":
        return (
          <LandingPage
            onOpenAccount={() => navigateTo("product-info")}
            onLogin={handleLogin}
          />
        );
      
      case "product-info":
        return (
          <ProductInfo
            onBack={() => navigateTo("landing")}
            onSelectProduct={() => navigateTo("data-form")}
          />
        );
      
      case "data-form":
        return (
          <DataForm
            onBack={() => navigateTo("product-info")}
            onContinue={handleFormSubmit}
          />
        );
      
      case "otp-validation":
        return (
          <OTPValidation
            onVerify={() => navigateTo("onboarding-process")}
            phone={formData?.phone || ""}
          />
        );
      
      case "onboarding-process":
        return (
          <OnboardingProcess
            onComplete={() => navigateTo("biometric-validation")}
          />
        );
      
      case "biometric-validation":
        return (
          <BiometricValidation
            onComplete={() => navigateTo("terms-conditions")}
          />
        );
      
      case "terms-conditions":
        return (
          <TermsConditions
            onAccept={() => navigateTo("account-success")}
          />
        );
      
      case "account-success":
        return (
          <AccountSuccess
            onGoToBanking={handleGoToBanking}
          />
        );
      
      default:
        return (
          <LandingPage
            onOpenAccount={() => navigateTo("product-info")}
            onLogin={handleLogin}
          />
        );
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white relative overflow-hidden">
      {renderScreen()}
    </div>
  );
}