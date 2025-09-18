import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, Heart, Play, GraduationCap, Gift } from "lucide-react";
import gnbLogo from "../assets/ea601144222ed9ba57de5e273bb9d48a842ec571.png";


interface AccountSuccessProps {
  readonly onGoToUserRegistration: () => void;
}

export function AccountSuccess({ onGoToUserRegistration }: AccountSuccessProps) {
  // Generate a mock account number
  const accountNumber = "4000-1234-5678-9012";
  const [selectedBenefit, setSelectedBenefit] = useState<string | null>(null);
  const [showBenefits, setShowBenefits] = useState(false);
  // No modal flow – simplified direct continue

  const benefits = [
    {
      id: "laika",
      title: "Descuentos en Laika",
      description: "20% de descuento en productos para mascotas",
      icon: Heart,
      details: "Disfrute de descuentos exclusivos en comida, juguetes y accesorios para su mascota en Laika.",
      color: "#e91e63"
    },
    {
      id: "streaming",
      title: "Streaming Premium",
      description: "3 meses gratis de Netflix o Spotify Premium",
      icon: Play,
      details: "Elija entre 3 meses gratuitos de Netflix Premium o Spotify Premium para disfrutar sin límites.",
      color: "#9c27b0"
    },
    {
      id: "finance-course",
      title: "Curso de Finanzas",
      description: "Curso gratuito de finanzas personales",
      icon: GraduationCap,
      details: "Acceso completo a nuestro curso online de finanzas personales e inversiones inteligentes.",
      color: "#3f51b5"
    }
  ];

  const handleBenefitSelect = (benefitId: string) => {
    setSelectedBenefit(benefitId);
  };

  const handleContinue = () => {
    if (!selectedBenefit) return;
    onGoToUserRegistration();
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col">
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
              {!showBenefits ? (
                <>
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

                  {/* Special Offer */}
                  <Card className="bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-[#04639e] p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Gift className="w-6 h-6 text-[#04639e]" />
                      <h3 className="text-[#04639e] text-lg">
                        ¡Beneficio de Bienvenida!
                      </h3>
                    </div>
                    <p className="text-blue-700 text-sm leading-relaxed mb-4">
                      Como nuevo cliente, puede elegir uno de estos beneficios exclusivos completamente gratis.
                    </p>
                    <Button
                      onClick={() => setShowBenefits(true)}
                      className="w-full py-3 rounded-lg text-white"
                      style={{
                        backgroundColor: "#04639e"
                      }}
                      onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#035080"}
                      onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#04639e"}
                    >
                      Ver Beneficios Disponibles
                    </Button>
                  </Card>

                  {/* Call to Action */}
                  <div className="space-y-4">
                    
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Recuerde guardar esta información en un lugar seguro. Su número de cuenta le será solicitado para realizar transacciones.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Benefits Selection */}
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Gift className="w-16 h-16 text-purple-600" />
                    </div>
                    
                    <h2 className="text-gray-800 text-xl">
                      Elija su Beneficio de Bienvenida
                    </h2>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Seleccione uno de estos beneficios exclusivos para nuevos clientes
                    </p>
                  </div>

                  {/* Benefits Cards */}
                  <div className="space-y-3">
                    {benefits.map((benefit) => {
                      const Icon = benefit.icon;
                      const isSelected = selectedBenefit === benefit.id;
                      
                      return (
                        <Card
                          key={benefit.id}
                          className={`p-4 cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'border-2 bg-purple-50' 
                              : 'border border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                          }`}
                          style={{
                            borderColor: isSelected ? benefit.color : undefined
                          }}
                          onClick={() => handleBenefitSelect(benefit.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ backgroundColor: `${benefit.color}15` }}
                            >
                              <Icon 
                                className="w-5 h-5" 
                                style={{ color: benefit.color }}
                              />
                            </div>
                            
                            <div className="flex-1 text-left">
                              <h4 className="text-gray-800 text-base mb-1">
                                {benefit.title}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {benefit.description}
                              </p>
                              <p className="text-gray-500 text-xs leading-relaxed">
                                {benefit.details}
                              </p>
                            </div>
                            
                            {isSelected && (
                              <CheckCircle 
                                className="w-5 h-5 flex-shrink-0" 
                                style={{ color: benefit.color }}
                              />
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleContinue}
                      disabled={!selectedBenefit}
                      className="w-full py-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: selectedBenefit ? '#89c041' : '#d1d5db',
                        color: '#ffffff',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedBenefit)
                          (e.target as HTMLButtonElement).style.backgroundColor = '#7bb535';
                      }}
                      onMouseLeave={(e) => {
                        if (selectedBenefit)
                          (e.target as HTMLButtonElement).style.backgroundColor = '#89c041';
                      }}
                    >
                      Continuar
                    </Button>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed">
                    Los beneficios están sujetos a términos y condiciones. Solo puede elegir uno por cuenta.
                  </p>
                </>
              )}
        </div>
      </div>
    </div>
  );
}