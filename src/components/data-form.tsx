import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ArrowLeft } from "lucide-react";

interface DataFormProps {
  onBack: () => void;
  onContinue: (data: FormData) => void;
}

interface FormData {
  fullName: string;
  idNumber: string;
  documentType: string;
  email: string;
  phone: string;
  acceptTerms: boolean;
}

export function DataForm({
  onBack,
  onContinue,
}: DataFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    idNumber: "",
    documentType: "",
    email: "",
    phone: "",
    acceptTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.acceptTerms &&
      Object.values(formData).every(
        (value) =>
          typeof value === "boolean" || value.trim() !== "",
      )
    ) {
      onContinue(formData);
    }
  };

  const isFormValid =
    formData.acceptTerms &&
    formData.fullName &&
    formData.idNumber &&
    formData.documentType &&
    formData.email &&
    formData.phone;

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
          Formulario de Datos
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <h1 className="text-gray-800 text-xl mb-8 text-center">
          Complete su información personal
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-600">
              Nombre completo
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fullName: e.target.value,
                })
              }
              className="border-gray-200 text-gray-700"
              style={{ "--tw-ring-color": "#89c041" } as any}
              onFocus={(e) =>
                (e.target.style.borderColor = "#89c041")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idNumber" className="text-gray-600">
              Número de identificación
            </Label>
            <Input
              id="idNumber"
              type="text"
              value={formData.idNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  idNumber: e.target.value,
                })
              }
              className="border-gray-200 text-gray-700"
              style={{ "--tw-ring-color": "#89c041" } as any}
              onFocus={(e) =>
                (e.target.style.borderColor = "#89c041")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="documentType"
              className="text-gray-600"
            >
              Tipo de documento
            </Label>
            <Select
              value={formData.documentType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  documentType: value,
                })
              }
            >
              <SelectTrigger className="border-gray-200 text-gray-700" style={{ "--tw-ring-color": "#89c041" } as any}>
                <SelectValue placeholder="Seleccione tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                <SelectItem value="ti">Tarjeta de Identidad</SelectItem>
                <SelectItem value="pp">Pasaporte</SelectItem>
                <SelectItem value="rc">Registro Civil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-600">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="border-gray-200 text-gray-700"
              style={{ "--tw-ring-color": "#89c041" } as any}
              onFocus={(e) =>
                (e.target.style.borderColor = "#89c041")
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-600">
              Número de celular
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
              className="border-gray-200 text-gray-700"
              style={{ "--tw-ring-color": "#89c041" } as any}
              onFocus={(e) =>
                (e.target.style.borderColor = "#89c041")
              }
              required
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3 pt-4">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  acceptTerms: !!checked,
                })
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="terms"
              className="text-gray-600 text-sm leading-relaxed"
            >
              Acepto los Términos y Condiciones y la Política de
              Privacidad.
            </Label>
          </div>

          {/* Continue Button */}
          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full py-3 rounded-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isFormValid
                ? "#89c041"
                : "#d1d5db",
              color: "#ffffff",
            }}
            onMouseEnter={(e) => {
              if (isFormValid)
                (
                  e.target as HTMLButtonElement
                ).style.backgroundColor = "#7bb535";
            }}
            onMouseLeave={(e) => {
              if (isFormValid)
                (
                  e.target as HTMLButtonElement
                ).style.backgroundColor = "#89c041";
            }}
          >
            Continuar
          </Button>
        </form>
      </div>
    </div>
  );
}