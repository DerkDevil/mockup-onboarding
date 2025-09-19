import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ExpandedDataFormProps {
  onBack: () => void;
  onContinue: (data: ExpandedFormData) => void;
}

interface ExpandedFormData {
  // Step 1: Basic Information
  idNumber: string;
  isResident: boolean;
  firstName: string;
  lastName: string;
  documentType: string;
  email: string;
  phone: string;
  // Step 2: Professional & Financial Information
  occupation: string;
  company: string;
  position: string;
  startDate: string;
  monthlyIncome: string;
  monthlyExpenses: string;
  totalAssets: string;
  totalLiabilities: string;
  acceptDataTreatment: boolean;
  acceptTermsConditions: boolean;
}

export function ExpandedDataForm({
  onBack,
  onContinue,
}: ExpandedDataFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState<ExpandedFormData>({
    idNumber: "",
    isResident: true,
    firstName: "",
    lastName: "",
    documentType: "",
    email: "",
    phone: "",
    occupation: "",
    company: "",
    position: "",
    startDate: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    totalAssets: "",
    totalLiabilities: "",
    acceptDataTreatment: false,
    acceptTermsConditions: false,
  });

  const occupationOptions = [
    { value: "asalariado", label: "Asalariado" },
    { value: "independiente", label: "Independiente" },
    { value: "diplomatico", label: "Diplomático" },
    { value: "jubilado", label: "Jubilado/Pensionado" },
    { value: "estudiante", label: "Estudiante" },
    { value: "hogar", label: "Ama de Casa (Hogar)" },
    { value: "rentista", label: "Rentista de Capital" },
  ];

  const isStep1Valid = () => {
    return (
      formData.idNumber &&
      formData.firstName &&
      formData.lastName &&
      formData.documentType &&
      formData.email &&
      formData.phone
    );
  };

  const isStep2Valid = () => {
    const baseValid = formData.occupation;

    // Additional validation for "Asalariado" occupation
    if (formData.occupation === "asalariado") {
      return baseValid && formData.company && formData.position && formData.startDate;
    }

    return baseValid;
  };

  const isStep3Valid = () => {
    return (
      formData.monthlyIncome &&
      formData.monthlyExpenses &&
      formData.totalAssets &&
      formData.totalLiabilities &&
      formData.acceptDataTreatment &&
      formData.acceptTermsConditions
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && isStep2Valid()) {
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStep3Valid()) {
      onContinue(formData);
    }
  };

  const updateFormData = (field: keyof ExpandedFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-100 bg-[rgba(137,192,65,1)]">
        <button
          onClick={currentStep === 1 ? onBack : handlePrevious}
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
        <div className="flex-1">
          <h2 className="text-[rgba(255,255,255,1)] text-lg font-bold">
            Información Personal - Paso {currentStep} de {totalSteps}
          </h2>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-gray-50">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progreso del formulario</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="w-full h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              <h1 className="text-gray-800 text-xl mb-8 text-center">
                Información Básica
              </h1>

              <div className="space-y-6">
                {/* Tipo y Número de Documento - Primera fila */}
                <div className="flex gap-3">
                  <div className="space-y-2 w-2/5">
                    <Label htmlFor="documentType" className="text-gray-600">
                      Tipo Identificación *
                    </Label>
                    <Select
                      value={formData.documentType}
                      onValueChange={(value) => updateFormData("documentType", value)}
                    >
                      <SelectTrigger className="border-gray-200 text-gray-700" style={{ "--tw-ring-color": "#89c041" } as any}>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc">CC</SelectItem>
                        <SelectItem value="ce">CE</SelectItem>
                        <SelectItem value="ti">TI</SelectItem>
                        <SelectItem value="pp">PP</SelectItem>
                        <SelectItem value="rc">RC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="idNumber" className="text-gray-600">
                      Identificación *
                    </Label>
                    <Input
                      id="idNumber"
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => updateFormData("idNumber", e.target.value)}
                      className="border-gray-200 text-gray-700"
                      style={{ "--tw-ring-color": "#89c041" } as any}
                      onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                      placeholder="Número de documento"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600">¿Es residente en Colombia? *</Label>
                  <Select
                    value={formData.isResident.toString()}
                    onValueChange={(value) => updateFormData("isResident", value === "true")}
                  >
                    <SelectTrigger className="border-gray-200 text-gray-700" style={{ "--tw-ring-color": "#89c041" } as any}>
                      <SelectValue placeholder="Seleccione una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Sí</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Primer Nombre y Primer Apellido - Segunda fila */}
                <div className="flex gap-3">
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="firstName" className="text-gray-600">
                      Primer Nombre *
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      className="border-gray-200 text-gray-700"
                      style={{ "--tw-ring-color": "#89c041" } as any}
                      onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                      placeholder="Primer nombre"
                      required
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label htmlFor="lastName" className="text-gray-600">
                      Primer Apellido *
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      className="border-gray-200 text-gray-700"
                      style={{ "--tw-ring-color": "#89c041" } as any}
                      onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                      placeholder="Primer apellido"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-600">
                    Correo electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="border-gray-200 text-gray-700"
                    style={{ "--tw-ring-color": "#89c041" } as any}
                    onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-600">
                    Número de celular *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    className="border-gray-200 text-gray-700"
                    style={{ "--tw-ring-color": "#89c041" } as any}
                    onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                    placeholder="3001234567"
                    required
                  />
                </div>
              </div>

              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStep1Valid()}
                className="w-full py-3 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: isStep1Valid() ? "#89c041" : "#d1d5db",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  if (isStep1Valid())
                    (e.target as HTMLButtonElement).style.backgroundColor = "#7bb535";
                }}
                onMouseLeave={(e) => {
                  if (isStep1Valid())
                    (e.target as HTMLButtonElement).style.backgroundColor = "#89c041";
                }}
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h1 className="text-gray-800 text-xl mb-8 text-center">
                Información Profesional
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-gray-600">
                    Ocupación *
                  </Label>
                  <Select
                    value={formData.occupation}
                    onValueChange={(value) => updateFormData("occupation", value)}
                  >
                    <SelectTrigger className="border-gray-200 text-gray-700" style={{ "--tw-ring-color": "#89c041" } as any}>
                      <SelectValue placeholder="Seleccione su ocupación" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.occupation === "asalariado" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-600">
                        Empresa o Razón Social *
                      </Label>
                      <Input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => updateFormData("company", e.target.value)}
                        className="border-gray-200 text-gray-700"
                        style={{ "--tw-ring-color": "#89c041" } as any}
                        onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="position" className="text-gray-600">
                        Cargo *
                      </Label>
                      <Input
                        id="position"
                        type="text"
                        value={formData.position}
                        onChange={(e) => updateFormData("position", e.target.value)}
                        className="border-gray-200 text-gray-700"
                        style={{ "--tw-ring-color": "#89c041" } as any}
                        onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="startDate" className="text-gray-600">
                        Fecha de Ingreso *
                      </Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData("startDate", e.target.value)}
                        className="border-gray-200 text-gray-700"
                        style={{ "--tw-ring-color": "#89c041" } as any}
                        onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                        required
                      />
                    </div>
                  </>
                )}
              </div>

              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStep2Valid()}
                className="w-full py-3 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: isStep2Valid() ? "#89c041" : "#d1d5db",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  if (isStep2Valid())
                    (e.target as HTMLButtonElement).style.backgroundColor = "#7bb535";
                }}
                onMouseLeave={(e) => {
                  if (isStep2Valid())
                    (e.target as HTMLButtonElement).style.backgroundColor = "#89c041";
                }}
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h1 className="text-gray-800 text-xl mb-8 text-center">
                Información Financiera
              </h1>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome" className="text-gray-600">
                    Ingresos Mensuales (COP) *
                  </Label>
                  <Select
                    value={formData.monthlyIncome}
                    onValueChange={(value) => updateFormData("monthlyIncome", value)}
                  >
                    <SelectTrigger className="border-gray-200 text-gray-700" style={{ "--tw-ring-color": "#89c041" } as any}>
                      <SelectValue placeholder="Seleccione rango de ingresos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">$0 - $5 millones</SelectItem>
                      <SelectItem value="5-10">$5 - $10 millones</SelectItem>
                      <SelectItem value="10-15">$10 - $15 millones</SelectItem>
                      <SelectItem value="15-20">$15 - $20 millones</SelectItem>
                      <SelectItem value="20+">$20 millones o más</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses" className="text-gray-600">
                    Egresos Mensuales (COP) *
                  </Label>
                  <Select
                    value={formData.monthlyExpenses}
                    onValueChange={(value) => updateFormData("monthlyExpenses", value)}
                  >
                    <SelectTrigger className="border-gray-200 text-gray-700" style={{ "--tw-ring-color": "#89c041" } as any}>
                      <SelectValue placeholder="Seleccione rango de egresos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-5">$0 - $5 millones</SelectItem>
                      <SelectItem value="5-10">$5 - $10 millones</SelectItem>
                      <SelectItem value="10-15">$10 - $15 millones</SelectItem>
                      <SelectItem value="15-20">$15 - $20 millones</SelectItem>
                      <SelectItem value="20+">$20 millones o más</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalAssets" className="text-gray-600">
                    Total Activos (COP) *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="totalAssets"
                      type="text"
                      value={formData.totalAssets}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        updateFormData("totalAssets", formattedValue);
                      }}
                      className="border-gray-200 text-gray-700 pl-8"
                      style={{ "--tw-ring-color": "#89c041" } as any}
                      onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalLiabilities" className="text-gray-600">
                    Total Pasivos (COP) *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      id="totalLiabilities"
                      type="text"
                      value={formData.totalLiabilities}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        updateFormData("totalLiabilities", formattedValue);
                      }}
                      className="border-gray-200 text-gray-700 pl-8"
                      style={{ "--tw-ring-color": "#89c041" } as any}
                      onFocus={(e) => (e.target.style.borderColor = "#89c041")}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Data Treatment Authorization */}
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox
                    id="dataTreatment"
                    checked={formData.acceptDataTreatment}
                    onCheckedChange={(checked) => updateFormData("acceptDataTreatment", !!checked)}
                    className="mt-1 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor="dataTreatment"
                      className="text-gray-600 text-xs leading-relaxed cursor-pointer block"
                    >
                      Declaro que autorizo el tratamiento de mis datos personales conforme a las finalidades informadas en el <a href="https://www.gnbsudameris.com" target="_blank" rel="noopener noreferrer" className="text-[#1d4ed8] underline hover:text-[#1e40af]">Aviso de Privacidad</a>, que conozco mis derechos y la manera de ejercerlos, así como la existencia de la <a href="https://www.gnbsudameris.com" target="_blank" rel="noopener noreferrer" className="text-[#1d4ed8] underline hover:text-[#1e40af]">Política de Tratamiento de Datos Personales</a> dispuesta por el Banco GNB Sudameris S.A.
                    </Label>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="termsConditions"
                    checked={formData.acceptTermsConditions}
                    onCheckedChange={(checked) => updateFormData("acceptTermsConditions", !!checked)}
                    className="mt-1"
                  />
                  <Label
                    htmlFor="termsConditions"
                    className="text-gray-600 text-xs leading-relaxed cursor-pointer"
                  >
                    Acepto los{" "}
                    <a
                      href="https://www.gnbsudameris.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1d4ed8] underline hover:text-[#1e40af]"
                    >
                      Términos y Condiciones
                    </a>
                    .
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isStep3Valid()}
                className="w-full py-3 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: isStep3Valid() ? "#89c041" : "#d1d5db",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  if (isStep3Valid())
                    (e.target as HTMLButtonElement).style.backgroundColor = "#7bb535";
                }}
                onMouseLeave={(e) => {
                  if (isStep3Valid())
                    (e.target as HTMLButtonElement).style.backgroundColor = "#89c041";
                }}
              >
                Continuar
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}