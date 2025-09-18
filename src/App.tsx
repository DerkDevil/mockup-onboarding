import { useState } from "react";
import { LandingPage } from "./components/landing-page";
import { ProductInfo } from "./components/product-info";
import { DataForm } from "./components/data-form";
import { OTPValidation } from "./components/otp-validation";
import { PEPValidation } from "./components/pep-validation";
import { OnboardingProcess } from "./components/onboarding-process";
import { DocumentCapture } from "./components/document-capture";
import { BiometricValidation } from "./components/biometric-validation";
import { TermsConditions } from "./components/terms-conditions";
import { UserRegistration } from "./components/user-registration";
import { AccountSuccess } from "./components/account-success";

type Screen = 
  | "landing" 
  | "product-info" 
  | "data-form" 
  | "otp-validation" 
  | "pep-validation"
  | "onboarding-process" 
  | "document-capture"
  | "biometric-validation" 
  | "terms-conditions" 
  | "account-success"
  | "user-registration";

interface FormData {
  fullName: string;
  idNumber: string;
  documentType: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
}

interface UserCredentials {
  username: string;
  password: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isPEP, setIsPEP] = useState<boolean | null>(null);
  const [userCredentials, setUserCredentials] = useState<UserCredentials | null>(null);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    navigateTo("otp-validation");
  };

  const handlePEPContinue = (pepStatus: boolean) => {
    setIsPEP(pepStatus);
    navigateTo("onboarding-process");
  };

  const handleUserRegistration = (credentials: UserCredentials) => {
    setUserCredentials(credentials);
    window.open("https://www.gnbsudameris.com.co/", "_blank");
  };

  const handleLogin = () => {
    alert("Esta funcionalidad redirigirá a la página de inicio de sesión");
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
            onVerify={() => navigateTo("pep-validation")}
            phone={formData?.phone || ""}
          />
        );
      case "pep-validation":
        return (
          <PEPValidation
            onBack={() => navigateTo("otp-validation")}
            onContinue={handlePEPContinue}
          />
        );
      case "onboarding-process":
        return (
          <OnboardingProcess
            onComplete={() => navigateTo("document-capture")}
          />
        );
      case "document-capture":
        return (
          <DocumentCapture
            onBack={() => navigateTo("onboarding-process")}
            onComplete={() => navigateTo("biometric-validation")}
            documentType={formData?.documentType || "Documento"}
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
            onGoToUserRegistration={() => navigateTo("user-registration")}
          />
        );
      case "user-registration":
        return (
          <UserRegistration
            onBack={() => navigateTo("account-success")}
            onComplete={handleUserRegistration}
          />
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white relative overflow-hidden">
      {renderScreen()}
    </div>
  );
}