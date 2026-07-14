import { useState } from 'react';
import { LoanSuccessCard } from './LoanSuccessCard';
import {
  GraduationCap,
  Building,
  Building2,
  Check,
  CheckCircle2,
  MessageCircle,
  User,
  Users,
  Shield,
  Briefcase,
} from 'lucide-react';
import { WHATSAPP_BUSINESS_NUMBER } from '../constants/whatsapp';

const steps = [
  'Applicant Type',
  'School Information',
  'Financial Requirements',
  'Review & Submit',
];

const applicantTypes = [
  { id: 'individual-principal', title: 'Individual Principal/Owner', sub: 'Single owner educational institution', icon: User },
  { id: 'school-trust', title: 'School Trust', sub: 'Educational trust or society', icon: Shield },
  { id: 'private-limited', title: 'Private Limited Co.', sub: 'Registered Pvt Ltd school', icon: Building2 },
  { id: 'partnership', title: 'Partnership Firm', sub: 'Partnership owned school', icon: Users },
  { id: 'society', title: 'Educational Society', sub: 'Registered educational society', icon: Briefcase },
  { id: 'ngo', title: 'NGO', sub: 'Non-profit educational organization', icon: GraduationCap },
];

const schoolBoards = [
  'State Board (SSC)',
  'CBSE',
  'ICSE / ISC',
  'IB (International Baccalaureate)',
  'Cambridge',
  'Maharashtra State Board',
  'NIOS',
  'Other',
];

const initialFormData = {
  applicantType: '',
  schoolName: '',
  registrationNumber: '',
  affiliationNumber: '',
  schoolBoard: '',
  yearEstablished: '',
  totalStudents: '',
  totalStaff: '',
  schoolAddress: '',
  city: '',
  pinCode: '',
  principalName: '',
  principalContact: '',
  loanAmount: 5000000,
  loanPurpose: '',
  tenure: '120',
  annualRevenue: '',
  existingLoan: '',
};

function SchoolFinanceFormStyles() {
  return (
    <style>
      {`
        @keyframes loanStepIn {
          from { opacity: 0; transform: translateX(24px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes loanFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes successCircle {
          from { stroke-dashoffset: 240; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes successCheck {
          from { stroke-dashoffset: 70; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes confettiFall {
          0% { opacity: 0; transform: translateY(-24px) rotate(0deg); }
          15% { opacity: 1; }
          100% { opacity: 0; transform: translateY(130px) rotate(220deg); }
        }
      `}
    </style>
  );
}

function ProgressBar({ currentStep }) {
  return (
    <div className="mb-8 rounded-[24px] border border-white/95 bg-white/90 p-5 shadow-[0_20px_60px_rgba(37,99,235,0.15)] backdrop-blur-[20px]">
      <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <div key={step} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 top-5 hidden h-0.5 w-full lg:block ${
                    completed ? 'bg-[#16A34A]' : 'border-t border-dashed border-gray-300'
                  }`}
                />
              )}
              <div
                className={`relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm transition-all duration-300 ${
                  completed
                    ? 'bg-[#16A34A] text-white shadow-lg shadow-green-500/25'
                    : active
                      ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 ring-8 ring-[#2563EB]/15 animate-pulse'
                      : 'border-2 border-gray-300 bg-white text-gray-400'
                }`}
              >
                {completed ? <Check className="h-5 w-5" /> : stepNumber}
              </div>
              <span
                className={`mt-3 text-xs transition-colors duration-300 ${
                  active ? 'text-[#1F2937]' : completed ? 'text-[#16A34A]' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="group relative block pt-2">
      <span className="mb-2 block text-sm text-[#374151] transition-all duration-300 group-focus-within:-translate-y-1 group-focus-within:text-[#2563EB]">
        {label}
      </span>
      <div className="relative">
        {children}
        <span className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 bg-[#2563EB] transition-all duration-300 group-focus-within:w-full" />
      </div>
    </label>
  );
}

function TextInput({ value, onChange, type = 'text', placeholder = '' }) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 pr-11 text-[#1F2937] shadow-sm transition-all duration-300 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
      />
      {value ? (
        <CheckCircle2 className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#16A34A]" />
      ) : null}
    </div>
  );
}

function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-8 py-3 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function BackButton({ children, ...props }) {
  return (
    <button
      className="rounded-xl border border-[#2563EB]/25 px-8 py-3 text-[#1F2937] transition-all duration-300 hover:bg-blue-50 hover:text-[#2563EB] active:scale-[0.97]"
      {...props}
    >
      {children}
    </button>
  );
}

export function SchoolFinanceForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const updateFormData = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const buildSchoolFinanceWhatsAppMessage = (appId) => {
    const formatCurrency = (amount) => `₹${parseInt(amount || 0).toLocaleString('en-IN')}`;
    
    let message = `*SANSKRUTI ASSOCIATES*\n*New Loan Application*\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `● Application ID: *${appId}*\n`;
    message += `● Loan Type: *School Finance*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `*● APPLICANT TYPE*\n1. ${formData.applicantType}\n\n`;
    
    message += `*● SCHOOL INFORMATION*\n`;
    let schoolNum = 1;
    message += `${schoolNum++}. School Name: ${formData.schoolName}\n`;
    message += `${schoolNum++}. Registration Number: ${formData.registrationNumber}\n`;
    message += `${schoolNum++}. Affiliation Number: ${formData.affiliationNumber}\n`;
    message += `${schoolNum++}. School Board: ${formData.schoolBoard}\n`;
    message += `${schoolNum++}. Year Established: ${formData.yearEstablished}\n`;
    message += `${schoolNum++}. Total Students: ${formData.totalStudents}\n`;
    message += `${schoolNum++}. Total Staff: ${formData.totalStaff}\n`;
    message += `${schoolNum++}. School Address: ${formData.schoolAddress}\n`;
    message += `${schoolNum++}. City: ${formData.city}\n`;
    message += `${schoolNum++}. PIN Code: ${formData.pinCode}\n`;
    message += `${schoolNum++}. Principal Name: ${formData.principalName}\n`;
    message += `${schoolNum++}. Principal Contact: ${formData.principalContact}\n\n`;
    
    message += `*● FINANCIAL REQUIREMENTS*\n`;
    let finNum = 1;
    message += `${finNum++}. Loan Amount: ${formatCurrency(formData.loanAmount)}\n`;
    message += `${finNum++}. Loan Purpose: ${formData.loanPurpose}\n`;
    message += `${finNum++}. Preferred Tenure: ${formData.tenure} months\n`;
    message += `${finNum++}. Annual Revenue: ${formatCurrency(formData.annualRevenue)}\n`;
    if (formData.existingLoan) {
      message += `${finNum++}. Existing Loan Obligations: ${formatCurrency(formData.existingLoan)}\n`;
    }
    
    message += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please review and get back to me regarding my application.`;
    
    return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const goNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((step) => step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submitApplication = () => {
    if (!termsAccepted) return;
    const appId = `SA-SF-${Date.now().toString().slice(-8)}`;
    setApplicationId(appId);
    setSubmitted(true);
  };

  if (submitted) {
    const whatsappUrl = buildSchoolFinanceWhatsAppMessage(applicationId);
    return <LoanSuccessCard 
      applicationId={applicationId}
      whatsappUrl={whatsappUrl}
      contactMessage="Our education finance expert will contact you within 2 business hours."
    />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-16">
      <SchoolFinanceFormStyles />
      <div className="absolute inset-0 z-0">
        <img
          src="/src/imports/ChatGPT_Image_May_3,_2026,_08_35_36_PM.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-50/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4">
        <div className="rounded-[24px] border border-white/95 bg-white/90 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.15)] backdrop-blur-[20px] sm:p-10">
          <ProgressBar currentStep={currentStep} />

          {/* STEP 1: Applicant Type */}
          {currentStep === 1 && (
            <div className="[animation:loanStepIn_0.3s_ease-out_both]">
              <h2 className="mb-4 text-2xl text-[#1F2937]">Select Applicant Type</h2>
              <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {applicantTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => updateFormData('applicantType', type.id)}
                      className={`rounded-xl border-2 p-4 text-center transition-all ${
                        formData.applicantType === type.id
                          ? 'border-[#2563EB] bg-blue-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-[#2563EB] hover:bg-blue-50/50'
                      }`}
                    >
                      <Icon className="mx-auto mb-2 h-6 w-6 text-[#2563EB]" />
                      <span className="text-sm font-medium text-[#1F2937]">{type.title}</span>
                      <span className="text-xs text-gray-500">{type.sub}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <PrimaryButton onClick={goNext} disabled={!formData.applicantType}>
                  Next
                </PrimaryButton>
              </div>
            </div>
          )}

          {/* STEP 2: School Information */}
          {currentStep === 2 && (
            <div className="space-y-5 [animation:loanStepIn_0.3s_ease-out_both]">
              <h2 className="mb-4 text-2xl text-[#1F2937]">School Information & Registration</h2>

              <Field label="School Name *">
                <TextInput value={formData.schoolName} onChange={(v) => updateFormData('schoolName', v)} placeholder="Enter school name" />
              </Field>

              <Field label="Registration Number *">
                <TextInput value={formData.registrationNumber} onChange={(v) => updateFormData('registrationNumber', v)} placeholder="Registration number" />
              </Field>

              <Field label="Affiliation Number *">
                <TextInput value={formData.affiliationNumber} onChange={(v) => updateFormData('affiliationNumber', v)} placeholder="Affiliation number" />
              </Field>

              <Field label="School Board *">
                <select
                  value={formData.schoolBoard}
                  onChange={(e) => updateFormData('schoolBoard', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937]"
                >
                  <option value="">Select board</option>
                  {schoolBoards.map((board) => (
                    <option key={board} value={board}>{board}</option>
                  ))}
                </select>
              </Field>

              <Field label="Year Established *">
                <TextInput type="number" value={formData.yearEstablished} onChange={(v) => updateFormData('yearEstablished', v)} placeholder="2000" />
              </Field>

              <Field label="Total Students *">
                <TextInput type="number" value={formData.totalStudents} onChange={(v) => updateFormData('totalStudents', v)} placeholder="500" />
              </Field>

              <Field label="Total Staff *">
                <TextInput type="number" value={formData.totalStaff} onChange={(v) => updateFormData('totalStaff', v)} placeholder="50" />
              </Field>

              <Field label="School Address *">
                <textarea
                  value={formData.schoolAddress}
                  onChange={(e) => updateFormData('schoolAddress', e.target.value)}
                  className="min-h-28 w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937]"
                  placeholder="Complete school address"
                />
              </Field>

              <Field label="City *">
                <TextInput value={formData.city} onChange={(v) => updateFormData('city', v)} placeholder="City name" />
              </Field>

              <Field label="PIN Code *">
                <TextInput value={formData.pinCode} onChange={(v) => updateFormData('pinCode', v)} placeholder="123456" />
              </Field>

              <Field label="Principal Name *">
                <TextInput value={formData.principalName} onChange={(v) => updateFormData('principalName', v)} placeholder="Principal name" />
              </Field>

              <Field label="Principal Contact Number *">
                <TextInput value={formData.principalContact} onChange={(v) => updateFormData('principalContact', v)} placeholder="10-digit number" />
              </Field>

              <div className="mt-8 flex justify-between gap-3">
                <BackButton onClick={goPrevious}>Previous</BackButton>
                <PrimaryButton onClick={goNext} disabled={!formData.schoolName || !formData.principalName}>
                  Next
                </PrimaryButton>
              </div>
            </div>
          )}

          {/* STEP 3: Financial Requirements */}
          {currentStep === 3 && (
            <div className="space-y-5 [animation:loanStepIn_0.3s_ease-out_both]">
              <h2 className="mb-4 text-2xl text-[#1F2937]">Financial Requirements</h2>

              <Field label={`Loan Amount (₹${formData.loanAmount.toLocaleString('en-IN')})`}>
                <input
                  type="range"
                  min="500000"
                  max="50000000"
                  step="100000"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData('loanAmount', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-gray-500">Min: ₹5L | Max: ₹5Cr</div>
              </Field>

              <Field label="Loan Purpose *">
                <select
                  value={formData.loanPurpose}
                  onChange={(e) => updateFormData('loanPurpose', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937]"
                >
                  <option value="">Select purpose</option>
                  <option>New School Building Construction</option>
                  <option>Expansion of Existing Infrastructure</option>
                  <option>Laboratory Setup</option>
                  <option>Computer & IT Infrastructure</option>
                  <option>Library Development</option>
                  <option>Sports Facilities</option>
                  <option>Auditorium / Hall</option>
                  <option>Hostel Facility</option>
                  <option>Playground Development</option>
                  <option>Furniture & Equipment</option>
                  <option>Safety & Security Systems</option>
                  <option>Other</option>
                </select>
              </Field>

              <Field label="Preferred Tenure *">
                <select
                  value={formData.tenure}
                  onChange={(e) => updateFormData('tenure', e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937]"
                >
                  <option value="12">1 Year (12 months)</option>
                  <option value="24">2 Years (24 months)</option>
                  <option value="36">3 Years (36 months)</option>
                  <option value="60">5 Years (60 months)</option>
                  <option value="84">7 Years (84 months)</option>
                  <option value="120">10 Years (120 months)</option>
                  <option value="144">12 Years (144 months)</option>
                  <option value="180">15 Years (180 months)</option>
                </select>
              </Field>

              <Field label="Annual Revenue (₹) *">
                <TextInput type="number" value={formData.annualRevenue} onChange={(v) => updateFormData('annualRevenue', v)} placeholder="5000000" />
              </Field>

              <Field label="Existing Loan Obligations (₹)">
                <TextInput type="number" value={formData.existingLoan} onChange={(v) => updateFormData('existingLoan', v)} placeholder="0 (Optional)" />
              </Field>

              <div className="mt-8 flex justify-between gap-3">
                <BackButton onClick={goPrevious}>Previous</BackButton>
                <PrimaryButton onClick={goNext} disabled={!formData.loanPurpose || !formData.annualRevenue}>
                  Next
                </PrimaryButton>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Submit */}
          {currentStep === 4 && (
            <div className="space-y-6 [animation:loanStepIn_0.3s_ease-out_both]">
              <h2 className="text-2xl text-[#1F2937]">Review & Submit</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-600">Loan Type</p>
                  <p className="text-lg font-semibold text-[#1F2937]">School Finance</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-600">Applicant Type</p>
                  <p className="text-lg font-semibold text-[#1F2937]">{formData.applicantType}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-600">School Name</p>
                  <p className="text-lg font-semibold text-[#1F2937]">{formData.schoolName}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-600">School Board</p>
                  <p className="text-lg font-semibold text-[#1F2937]">{formData.schoolBoard}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-600">Loan Amount</p>
                  <p className="text-lg font-semibold text-[#1F2937]">₹{formData.loanAmount.toLocaleString('en-IN')}</p>
                </div>
                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-600">Loan Purpose</p>
                  <p className="text-lg font-semibold text-[#1F2937]">{formData.loanPurpose}</p>
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-xl bg-white p-4">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 accent-[#2563EB]"
                />
                <span className="text-sm text-gray-700">
                  I agree to the Terms & Conditions and authorize Sanskruti Associates to process my application and contact me regarding loan offers.
                </span>
              </label>

              <div className="flex justify-between gap-4">
                <BackButton onClick={goPrevious}>Previous</BackButton>
                <button
                  onClick={submitApplication}
                  disabled={!termsAccepted}
                  className="flex-1 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#22C55E] px-8 py-4 text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300"
                >
                  Submit School Finance Application
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default SchoolFinanceForm;
