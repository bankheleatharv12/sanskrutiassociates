import { useState } from 'react';
import { LoanSuccessCard } from './LoanSuccessCard';
import {
  Building2,
  Check,
  CheckCircle2,
  Factory,
  Home,
  MessageCircle,
} from 'lucide-react';
import { WHATSAPP_BUSINESS_NUMBER } from '../constants/whatsapp';

const steps = [
  'Property Type',
  'Personal Details',
  'Loan Details',
  'Review & Submit',
];

const propertyTypes = [
  {
    id: 'Residential Property',
    title: 'Residential Property',
    subtext: 'House, flat, bungalow, villa',
    icon: Home,
  },
  {
    id: 'Commercial Property',
    title: 'Commercial Property',
    subtext: 'Shop, office, warehouse',
    icon: Building2,
  },
  {
    id: 'Industrial / Plot',
    title: 'Industrial / Plot',
    subtext: 'Land, plot, industrial unit',
    icon: Factory,
  },
];

const employmentTypes = ['Salaried', 'Self Employed', 'Business Owner'];

const loanPurposes = [
  'Business Expansion',
  'Medical Emergency',
  'Education',
  'Debt Consolidation',
  'Home Renovation',
  'Working Capital',
  'Other',
];

const tenures = [
  12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180, 192, 204,
  216, 228, 240,
];

const initialFormData = {
  fullName: '',
  dateOfBirth: '',
  panNumber: '',
  aadhaarNumber: '',
  currentAddress: '',
  city: '',
  pinCode: '',
  coApplicantName: '',
  coApplicantPan: '',
  coApplicantAadhaar: '',
  emailId: '',
  employmentType: '',
  propertyLocation: '',
  estimatedPropertyValue: '',
  loanAmount: 5000000,
  loanTenure: '180',
  monthlyIncome: '',
  existingEmi: '',
  purposeOfLoan: '',
  mobileNumber: '',
};

function LAPFormStyles() {
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

        @keyframes loanCardTap {
          0% { transform: scale(1); }
          50% { transform: scale(0.97); }
          100% { transform: scale(1); }
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

function ProgressBar({ currentStep }: { currentStep: number }) {
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
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

function TextInput({
  value,
  onChange,
  type = 'text',
  placeholder = '',
}: {
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
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

function PrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1E40AF] px-8 py-3 text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function BackButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="rounded-xl border border-[#2563EB]/25 px-8 py-3 text-[#1F2937] transition-all duration-300 hover:bg-blue-50 hover:text-[#2563EB] active:scale-[0.97]"
      {...props}
    >
      {children}
    </button>
  );
}

export default function LAPForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [propertyType, setPropertyType] = useState('');
  const [formData, setFormData] = useState(initialFormData);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const updateFormData = (field: keyof typeof initialFormData, value: string | number) => {
    setFormData((current) => ({ ...current, [field]: value }));
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

  const formatCurrency = (value: string | number) => {
    if (!value) return '';
    return Number(value).toLocaleString('en-IN');
  };

  const buildWhatsAppMessage = () => {
    const appId = applicationId || `LAP-${Date.now().toString().slice(-8)}`;
    
    let message = `*SANSKRUTI ASSOCIATES*\n*New Loan Application*\n\n━━━━━━━━━━━━━━━━━━━━\n\n● Application ID: *${appId}*\n● Loan Type: *Loan Against Property*\n\n━━━━━━━━━━━━━━━━━━━━\n\n*● PROPERTY TYPE*\n1. ${propertyType}\n\n*● PERSONAL DETAILS*\n1. Name: ${formData.fullName}\n2. Date of Birth: ${formData.dateOfBirth}\n3. PAN Number: ${formData.panNumber}\n4. Aadhaar Number: ${formData.aadhaarNumber}\n5. Address: ${formData.currentAddress}\n6. City: ${formData.city}\n7. PIN Code: ${formData.pinCode}\n8. Email ID: ${formData.emailId}\n9. Employment Type: ${formData.employmentType}`;

    // Continue numbering for co-applicant fields only if filled
    let fieldNum = 10;
    if (formData.coApplicantName) {
      message += `\n${fieldNum}. Co-applicant Name: ${formData.coApplicantName}`;
      fieldNum++;
    }
    if (formData.coApplicantPan) {
      message += `\n${fieldNum}. Co-applicant PAN: ${formData.coApplicantPan}`;
      fieldNum++;
    }
    if (formData.coApplicantAadhaar) {
      message += `\n${fieldNum}. Co-applicant Aadhaar: ${formData.coApplicantAadhaar}`;
    }

    message += `\n\n*● LOAN & PROPERTY DETAILS*\n1. Property Location: ${formData.propertyLocation}\n2. Property Type: ${propertyType}\n3. Estimated Property Value: ₹${formatCurrency(formData.estimatedPropertyValue)}\n4. Loan Amount: ₹${formatCurrency(formData.loanAmount)}\n5. Loan Tenure: ${formData.loanTenure} months\n6. Monthly Income / Turnover: ₹${formatCurrency(formData.monthlyIncome)}`;

    // Add optional fields only if filled
    if (formData.existingEmi) {
      message += `\n7. Existing EMI: ₹${formatCurrency(formData.existingEmi)}`;
    }
    if (formData.purposeOfLoan) {
      const fieldNum = formData.existingEmi ? 8 : 7;
      message += `\n${fieldNum}. Purpose of Loan: ${formData.purposeOfLoan}`;
    }

    message += `\n\n━━━━━━━━━━━━━━━━━━━━\n\nPlease review and get back to me regarding my application.`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${message}`, '_blank');
  };

  const submitApplication = () => {
    if (!termsAccepted) return;
    const generatedId = `LAP-${Date.now().toString().slice(-8)}`;
    setApplicationId(generatedId);
    setSubmitted(true);
  };

  if (submitted) {
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${buildWhatsAppMessage()}`;
    return <LoanSuccessCard 
      applicationId={applicationId}
      whatsappUrl={whatsappUrl}
      contactMessage="Our property loan expert will contact you within 2 hours for property valuation."
    />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-12">
      <LAPFormStyles />
      <div className="absolute inset-0 z-0">
        <img
          src="/src/imports/WhatsApp_Image_2026-05-05_at_4.25.22_PM.jpeg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-50/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <ProgressBar currentStep={currentStep} />

        <div className="mx-auto rounded-[24px] border border-white/95 bg-white/90 p-6 shadow-[0_20px_60px_rgba(37,99,235,0.15)] backdrop-blur-[20px] sm:p-8 [animation:loanStepIn_0.3s_ease-in-out_both]">
          {currentStep === 1 && (
            <div className="[animation:loanStepIn_0.3s_ease-in-out_both]">
              <h1 className="mb-6 text-2xl text-[#1F2937] sm:text-3xl">
                Select Your Property Type
              </h1>
              <div className="grid gap-5 md:grid-cols-3">
                {propertyTypes.map((type) => {
                  const Icon = type.icon;
                  const selected = propertyType === type.id;

                  return (
                    <button
                      key={type.id}
                      onClick={() => setPropertyType(type.id)}
                      className={`relative rounded-3xl border-2 p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white hover:shadow-xl hover:shadow-blue-500/10 active:[animation:loanCardTap_0.22s_ease-out] ${
                        selected
                          ? 'border-[#2563EB] bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white shadow-xl shadow-blue-500/25'
                          : 'border-[#2563EB]/25 bg-white text-[#1F2937]'
                      }`}
                    >
                      {selected ? (
                        <CheckCircle2 className="absolute right-5 top-5 h-6 w-6 text-[#16A34A]" />
                      ) : null}
                      <div
                        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                          selected ? 'bg-white/15 text-white' : 'bg-blue-50 text-[#2563EB]'
                        }`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <h2 className={`mb-2 text-xl ${selected ? 'text-white' : 'text-[#1F2937]'}`}>
                        {type.title}
                      </h2>
                      <p className={selected ? 'text-blue-100' : 'text-gray-600'}>{type.subtext}</p>
                    </button>
                  );
                })}
              </div>

              {propertyType && (
                <div className="mt-8 flex justify-end">
                  <PrimaryButton onClick={goNext}>Next</PrimaryButton>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="[animation:loanStepIn_0.3s_ease-in-out_both]">
              <h1 className="mb-6 text-2xl text-[#1F2937] sm:text-3xl">Personal Details</h1>
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Full Name (Applicant) *">
                  <TextInput
                    value={formData.fullName}
                    onChange={(value) => updateFormData('fullName', value)}
                  />
                </Field>
                <Field label="Date of Birth *">
                  <TextInput
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(value) => updateFormData('dateOfBirth', value)}
                  />
                </Field>
                <Field label="PAN Card Number *">
                  <TextInput
                    value={formData.panNumber}
                    onChange={(value) => updateFormData('panNumber', value.toUpperCase())}
                  />
                </Field>
                <Field label="Aadhaar Number *">
                  <TextInput
                    value={formData.aadhaarNumber}
                    onChange={(value) => updateFormData('aadhaarNumber', value)}
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Current Address *">
                    <textarea
                      value={formData.currentAddress}
                      onChange={(event) => updateFormData('currentAddress', event.target.value)}
                      className="min-h-28 w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937] shadow-sm transition-all duration-300 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
                    />
                  </Field>
                </div>
                <Field label="City *">
                  <TextInput value={formData.city} onChange={(value) => updateFormData('city', value)} />
                </Field>
                <Field label="PIN Code *">
                  <TextInput
                    value={formData.pinCode}
                    onChange={(value) => updateFormData('pinCode', value)}
                  />
                </Field>
                <Field label="Co-applicant Name (Optional)">
                  <TextInput
                    value={formData.coApplicantName}
                    onChange={(value) => updateFormData('coApplicantName', value)}
                  />
                </Field>
                <Field label="Co-applicant PAN (Optional)">
                  <TextInput
                    value={formData.coApplicantPan}
                    onChange={(value) => updateFormData('coApplicantPan', value.toUpperCase())}
                  />
                </Field>
                <Field label="Co-applicant Aadhaar (Optional)">
                  <TextInput
                    value={formData.coApplicantAadhaar}
                    onChange={(value) => updateFormData('coApplicantAadhaar', value)}
                  />
                </Field>
                <Field label="Email ID *">
                  <TextInput
                    type="email"
                    value={formData.emailId}
                    onChange={(value) => updateFormData('emailId', value)}
                  />
                </Field>
                <Field label="Employment Type">
                  <select
                    value={formData.employmentType}
                    onChange={(event) => updateFormData('employmentType', event.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937] shadow-sm transition-all duration-300 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
                  >
                    <option value="">Select employment type</option>
                    {employmentTypes.map((employmentType) => (
                      <option key={employmentType} value={employmentType}>
                        {employmentType}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-8 flex justify-between">
                <BackButton onClick={goPrevious}>Previous</BackButton>
                <PrimaryButton onClick={goNext}>Next</PrimaryButton>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="[animation:loanStepIn_0.3s_ease-in-out_both]">
              <h1 className="mb-6 text-2xl text-[#1F2937] sm:text-3xl">
                Loan & Property Details
              </h1>
              <div className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Property Location *">
                    <TextInput
                      value={formData.propertyLocation}
                      onChange={(value) => updateFormData('propertyLocation', value)}
                    />
                  </Field>
                  <Field label="Property Type">
                    <TextInput value={propertyType} onChange={() => {}} />
                  </Field>
                  <Field label="Estimated Property Value (₹) *">
                    <TextInput
                      type="number"
                      value={formData.estimatedPropertyValue}
                      onChange={(value) => updateFormData('estimatedPropertyValue', value)}
                    />
                  </Field>
                </div>

                <Field label={`Loan Amount Required (Rs. ${Number(formData.loanAmount).toLocaleString('en-IN')}) *`}>
                  <input
                    type="range"
                    min="1000000"
                    max="100000000"
                    step="100000"
                    value={formData.loanAmount}
                    onChange={(event) => updateFormData('loanAmount', Number(event.target.value))}
                    className="h-2 w-full appearance-none rounded-full bg-blue-100 accent-[#2563EB]"
                  />
                </Field>

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Loan Tenure *">
                    <select
                      value={formData.loanTenure}
                      onChange={(event) => updateFormData('loanTenure', event.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937] shadow-sm transition-all duration-300 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
                    >
                      {tenures.map((tenure) => (
                        <option key={tenure} value={tenure}>
                          {tenure} months
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Monthly Income / Turnover (₹) *">
                    <TextInput
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(value) => updateFormData('monthlyIncome', value)}
                    />
                  </Field>
                  <Field label="Existing EMI per month">
                    <TextInput
                      type="number"
                      value={formData.existingEmi}
                      onChange={(value) => updateFormData('existingEmi', value)}
                    />
                  </Field>
                  <Field label="Purpose of Loan">
                    <select
                      value={formData.purposeOfLoan}
                      onChange={(event) => updateFormData('purposeOfLoan', event.target.value)}
                      className="w-full rounded-xl border border-gray-200 bg-white/90 px-4 py-3 text-[#1F2937] shadow-sm transition-all duration-300 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
                    >
                      <option value="">Select purpose</option>
                      {loanPurposes.map((purpose) => (
                        <option key={purpose} value={purpose}>
                          {purpose}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <BackButton onClick={goPrevious}>Previous</BackButton>
                <PrimaryButton onClick={goNext}>Next</PrimaryButton>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="[animation:loanStepIn_0.3s_ease-in-out_both]">
              <h1 className="mb-6 text-2xl text-[#1F2937] sm:text-3xl">Review and Submit</h1>

              <div className="space-y-5">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 shadow-sm">
                  <p className="mb-1 text-sm text-gray-500">Loan type</p>
                  <p className="text-lg text-[#1F2937]">Loan Against Property</p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm">
                    <p className="mb-1 text-sm text-gray-500">Property type</p>
                    <p className="text-[#1F2937]">{propertyType}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm">
                  <h2 className="mb-4 text-xl text-[#1F2937]">Personal details summary</h2>
                  <div className="grid gap-3 text-gray-700 md:grid-cols-2">
                    <p>Full Name: {formData.fullName}</p>
                    <p>Date of Birth: {formData.dateOfBirth}</p>
                    <p>PAN Number: {formData.panNumber}</p>
                    <p>Aadhaar Number: {formData.aadhaarNumber}</p>
                    <p>City: {formData.city}</p>
                    <p>PIN Code: {formData.pinCode}</p>
                    {formData.coApplicantName && <p>Co-applicant Name: {formData.coApplicantName}</p>}
                    {formData.coApplicantPan && <p>Co-applicant PAN: {formData.coApplicantPan}</p>}
                    {formData.coApplicantAadhaar && <p>Co-applicant Aadhaar: {formData.coApplicantAadhaar}</p>}
                    <p>Email ID: {formData.emailId}</p>
                    {formData.employmentType && <p>Employment Type: {formData.employmentType}</p>}
                    <p className="md:col-span-2">Current Address: {formData.currentAddress}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white/80 p-5 shadow-sm">
                  <h2 className="mb-4 text-xl text-[#1F2937]">Loan and property details</h2>
                  <div className="grid gap-3 text-gray-700 md:grid-cols-2">
                    <p>Property Location: {formData.propertyLocation}</p>
                    <p>Estimated Property Value: ₹{formatCurrency(formData.estimatedPropertyValue)}</p>
                    <p>Loan Amount: ₹{formatCurrency(formData.loanAmount)}</p>
                    <p>Loan Tenure: {formData.loanTenure} months</p>
                    <p>Monthly Income / Turnover: ₹{formatCurrency(formData.monthlyIncome)}</p>
                    {formData.existingEmi && <p>Existing EMI: ₹{formatCurrency(formData.existingEmi)}</p>}
                    {formData.purposeOfLoan && <p>Purpose of Loan: {formData.purposeOfLoan}</p>}
                  </div>
                </div>

                <label className="flex items-start gap-3 text-gray-700">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(event) => setTermsAccepted(event.target.checked)}
                    className="mt-1 accent-[#2563EB]"
                  />
                  <span>I agree to the Terms & Conditions and authorize Sanskruti Associates to contact me regarding my loan application.</span>
                </label>

                <div className="flex justify-between gap-4">
                  <BackButton onClick={goPrevious}>Previous</BackButton>
                  <button
                    onClick={submitApplication}
                    disabled={!termsAccepted}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#22C55E] px-8 py-4 text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
