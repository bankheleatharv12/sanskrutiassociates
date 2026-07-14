import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

interface LoanSuccessCardProps {
  applicationId: string;
  whatsappUrl: string;
  contactMessage?: string;
}

export function LoanSuccessCard({ 
  applicationId, 
  whatsappUrl,
  contactMessage = "Our loan expert will contact you within 24 hours with the best options tailored to your needs."
}: LoanSuccessCardProps) {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    // Use same-tab navigation for direct, seamless redirect
    window.location.href = whatsappUrl;
  };

  return (
    <div className="relative min-h-screen overflow-hidden py-16">
      <style>{`
        @keyframes successCircle {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes successCheck {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes loanFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-blue-50/80 to-white/90" />
      </div>

      {/* Success Card */}
      <div className="relative z-10 mx-auto max-w-2xl px-4">
        <div 
          className="rounded-[24px] border border-white/95 bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(37,99,235,0.15)] backdrop-blur-[20px] sm:p-12"
          style={{
            animation: 'loanFadeUp 0.6s ease-out both'
          }}
        >
          {/* Success Icon */}
          <svg className="mx-auto mb-6 h-24 w-24" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="38" 
              fill="none" 
              stroke="#16A34A" 
              strokeWidth="7" 
              strokeDasharray="240" 
              strokeDashoffset="240" 
              style={{
                animation: 'successCircle 0.8s ease-out forwards'
              }}
            />
            <path 
              d="M32 51 L45 64 L70 36" 
              fill="none" 
              stroke="#16A34A" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeDasharray="70" 
              strokeDashoffset="70" 
              style={{
                animation: 'successCheck 0.55s ease-out 0.65s forwards'
              }}
            />
          </svg>

          {/* Heading */}
          <h1 
            className="mb-4 text-3xl font-bold text-[#1F2937]"
            style={{
              animation: 'loanFadeUp 0.5s ease-out 0.15s both'
            }}
          >
            Application Submitted Successfully! 🎉
          </h1>

          {/* Application ID Label */}
          <p 
            className="mb-2 text-sm font-medium text-gray-500 tracking-wide uppercase"
            style={{
              animation: 'loanFadeUp 0.5s ease-out 0.25s both'
            }}
          >
            Application ID
          </p>

          {/* Application ID Value */}
          <p 
            className="mb-6 text-3xl font-black text-[#2563EB] tracking-tight"
            style={{
              animation: 'loanFadeUp 0.5s ease-out 0.35s both',
              fontFamily: 'monospace'
            }}
          >
            {applicationId}
          </p>

          {/* Contact Message */}
          <p 
            className="mb-8 text-gray-600 leading-relaxed max-w-lg mx-auto"
            style={{
              animation: 'loanFadeUp 0.5s ease-out 0.45s both'
            }}
          >
            {contactMessage}
          </p>

          {/* Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              animation: 'loanFadeUp 0.5s ease-out 0.55s both'
            }}
          >
            {/* Primary WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-8 py-4 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-[#15803D] hover:shadow-xl active:scale-[0.97]"
            >
              <MessageCircle className="h-5 w-5" />
              Submit via WhatsApp
            </button>

            {/* Secondary Home Button */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#2563EB] px-8 py-4 text-[#2563EB] font-semibold transition-all duration-300 hover:bg-blue-50 active:scale-[0.97]"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
