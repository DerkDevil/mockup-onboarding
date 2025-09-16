import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import gnbLogo from "../assets/ea601144222ed9ba57de5e273bb9d48a842ec571.png";

interface TermsConditionsProps {
  onAccept: () => void;
}

export function TermsConditions({
  onAccept,
}: TermsConditionsProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] =
    useState(false);

  const handleScroll = (
    event: React.UIEvent<HTMLDivElement>,
  ) => {
    const { scrollTop, scrollHeight, clientHeight } =
      event.currentTarget;
    const isAtBottom =
      Math.abs(scrollHeight - clientHeight - scrollTop) < 10;

    if (isAtBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const termsContent = `
TÉRMINOS Y CONDICIONES CONTRACTUALES
GNB SUDAMERIS

1. OBJETO DEL CONTRATO

El presente contrato regula la apertura y funcionamiento de una Cuenta de Ahorros en GNB Sudameris, estableciendo los derechos y obligaciones tanto del cliente como de la entidad financiera.

2. DEFINICIONES

Cliente: Persona natural o jurídica que solicita y mantiene productos y servicios financieros con GNB Sudameris.

Cuenta de Ahorros: Depósito constituido por personas naturales o jurídicas, que genera rendimientos y permite disponibilidad inmediata total o parcial de los recursos.

3. CARACTERÍSTICAS DEL PRODUCTO

3.1 La Cuenta de Ahorros no maneja cuota de manejo mensual.
3.2 Permite realizar transferencias ilimitadas sin costo adicional.
3.3 Acceso completo a la red de cajeros automáticos de GNB Sudameris.
3.4 Disponibilidad de canales digitales 24/7.

4. OBLIGACIONES DEL CLIENTE

4.1 Proporcionar información veraz y actualizada.
4.2 Notificar cambios en sus datos personales.
4.3 Utilizar los servicios de manera responsable.
4.4 Cumplir con las disposiciones legales vigentes.

5. OBLIGACIONES DEL BANCO

5.1 Custodiar los recursos depositados.
5.2 Brindar información clara y oportuna.
5.3 Garantizar la confidencialidad de la información.
5.4 Procesar las transacciones de manera eficiente.

6. TARIFAS Y COMISIONES

6.1 La cuenta no tiene cuota de manejo.
6.2 Las transferencias entre cuentas GNB Sudameris son gratuitas.
6.3 Consultas de saldo en cajeros propios sin costo.

7. TRATAMIENTO DE DATOS PERSONALES

GNB Sudameris se compromete a proteger la privacidad y confidencialidad de los datos personales, cumpliendo con la normativa vigente de protección de datos.

8. MODIFICACIONES

El banco se reserva el derecho de modificar estos términos previa comunicación al cliente con 30 días de anticipación.

9. TERMINACIÓN DEL CONTRATO

El contrato puede terminarse por solicitud del cliente o por incumplimiento de las obligaciones pactadas.

10. RESOLUCIÓN DE CONTROVERSIAS

Las controversias se resolverán mediante los mecanismos de atención al cliente del banco y, en caso necesario, ante las autoridades competentes.

11. ACEPTACIÓN

La apertura de la cuenta constituye la aceptación plena de estos términos y condiciones.
  `;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Logo */}
      <div className="bg-white p-6 pb-4 text-center">
        <img
          src={gnbLogo}
          alt="GNB Sudameris"
          className="h-12 mx-auto mb-4 mt-20"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 pt-2">
        <h1 className="text-gray-800 text-xl mb-6 text-center">
          Revise y acepte los términos contractuales
        </h1>

        {/* Terms Content */}
        <div className="mb-8">
          <ScrollArea
            className="h-96 border rounded-lg p-4"
            style={{ borderColor: "#89c041" }}
            onScrollCapture={handleScroll}
          >
            <div className="space-y-4 text-sm">
              {termsContent
                .split("\n\n")
                .map((section, index) => {
                  const [title, ...content] = section
                    .trim()
                    .split("\n");

                  if (!title) return null;

                  return (
                    <div key={index} className="space-y-2">
                      {title.match(/^\d+\./) ||
                      title.includes(
                        "TÉRMINOS Y CONDICIONES",
                      ) ? (
                        <h3 className="text-gray-800 text-base">
                          {title}
                        </h3>
                      ) : (
                        <p className="text-gray-600 leading-relaxed">
                          {title}
                        </p>
                      )}

                      {content.length > 0 && (
                        <div className="pl-2 space-y-1">
                          {content.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="text-gray-600 leading-relaxed"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </ScrollArea>

          {!hasScrolledToBottom && (
            <p className="text-center text-sm text-gray-500 mt-2">
              Desplácese hacia abajo para leer todos los
              términos
            </p>
          )}
        </div>

        {/* Accept Button */}
        <Button
          onClick={onAccept}
          disabled={!hasScrolledToBottom}
          className="w-full py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: hasScrolledToBottom
              ? "#89c041"
              : "#e5e7eb",
            color: hasScrolledToBottom ? "#ffffff" : "#9ca3af",
          }}
          onMouseEnter={(e) => {
            if (hasScrolledToBottom) {
              (
                e.target as HTMLButtonElement
              ).style.backgroundColor = "#7bb535";
            }
          }}
          onMouseLeave={(e) => {
            if (hasScrolledToBottom) {
              (
                e.target as HTMLButtonElement
              ).style.backgroundColor = "#89c041";
            }
          }}
        >
          {hasScrolledToBottom
            ? "Aceptar y continuar"
            : "Debe leer todos los términos"}
        </Button>
      </div>
    </div>
  );
}