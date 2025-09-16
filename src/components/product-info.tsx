import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowLeft } from "lucide-react";
import cardImage from "../assets/5709caf6cc6e854f2bf549d5cda8e3ac88e487c9.png";

interface ProductInfoProps {
  onBack: () => void;
  onSelectProduct: () => void;
}

export function ProductInfo({
  onBack,
  onSelectProduct,
}: ProductInfoProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div
        className="flex items-center p-4 border-b border-gray-100"
        style={{ backgroundColor: "#89c041" }}
      >
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
        <h2 className="text-[rgba(255,255,255,1)] text-lg font-bold text-[20px]">
          Información de Productos
        </h2>
      </div>

      {/* Content */}
      <div className="flex-1 mt-4 pb-1 bg-[rgba(255,255,255,0)]">
        <h1 className="text-gray-800 text-xl mb-8 text-center font-normal">
          Cuenta de ahorros
        </h1>

        {/* Product Card */}
        <Card className="bg-[rgba(249,250,251,1)] border-0 p-6 space-y-4 bg-[rgba(255,255,255,1)]">
          {/* Product Image */}
          <div className="w-full h-40 bg-white rounded-lg flex items-center justify-center p-2">
            <img
              src={cardImage}
              alt="Tarjeta GNB Sudameris"
              className="w-4/5 h-52 object-contain rounded-lg mx-auto"
            />
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed">
            Una cuenta sin cuota de manejo, con transferencias
            gratuitas.
          </p>

          {/* Benefits */}
          <div className="space-y-2">
            <h4 className="text-gray-800 text-sm">
              Beneficios clave:
            </h4>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li>• Sin cuota de manejo</li>
              <li>• Transferencias ilimitadas</li>
              <li>• Acceso a red de cajeros</li>
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onSelectProduct}
            className="w-full py-3 rounded-lg mt-6"
            style={{
              backgroundColor: "#89c041",
              color: "#ffffff",
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
            Solicitar ahora
          </Button>
        </Card>
      </div>
    </div>
  );
}