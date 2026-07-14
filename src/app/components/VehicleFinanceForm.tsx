import { useState } from "react";
import { motion } from "motion/react";
import { LoanSuccessCard } from './LoanSuccessCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  MessageCircle,
  Home,
  Truck,
  Tractor,
  Building2,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router";
import { WHATSAPP_BUSINESS_NUMBER } from '../constants/whatsapp';

interface FormData {
  vehicleType: string;
  vehicleCategory: 'new' | 'old' | '';
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  vehicleValue: number;
  loanAmount: number;
  tenure: string;
  purpose: string;
  fullName: string;
  dateOfBirth: string;
  panNumber: string;
  aadhaarNumber: string;
  occupation: string;
  monthlyIncome: number;
  address: string;
  city: string;
  pinCode: string;
  coApplicantRelation: string;
  coApplicantName: string;
  coApplicantPAN: string;
  coApplicantAadhaar: string;
  termsAccepted: boolean;
}

export function VehicleFinanceForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    vehicleType: '',
    vehicleCategory: '',
    vehicleBrand: '',
    vehicleModel: '',
    manufacturingYear: '',
    vehicleValue: 0,
    loanAmount: 50000,
    tenure: '',
    purpose: '',
    fullName: '',
    dateOfBirth: '',
    panNumber: '',
    aadhaarNumber: '',
    occupation: '',
    monthlyIncome: 0,
    address: '',
    city: '',
    pinCode: '',
    coApplicantRelation: '',
    coApplicantName: '',
    coApplicantPAN: '',
    coApplicantAadhaar: '',
    termsAccepted: false
  });

  const totalSteps = 5;

  const vehicleTypes = [
    {
      id: 'commercial',
      title: 'Commercial Vehicles',
      subtitle: 'Truck, Tempo, Pickup, Cargo',
      icon: Truck,
      emoji: '🚛'
    },
    {
      id: 'agricultural',
      title: 'Agricultural Vehicles', 
      subtitle: 'Tractor, Farm Equipment',
      icon: Tractor,
      emoji: '🚜'
    },
    {
      id: 'construction',
      title: 'Construction Machines',
      subtitle: 'JCB, Excavator, Loader',
      icon: Building2,
      emoji: '🏗️'
    }
  ];

  const vehicleCategories = [
    {
      id: 'new',
      title: 'New Vehicle',
      subtitle: 'नवीन वाहन — straight from showroom',
      icon: Sparkles,
      emoji: '✨'
    },
    {
      id: 'old',
      title: 'Old / Used Vehicle',
      subtitle: 'जुनी वाहन — pre-owned finance',
      icon: RefreshCw,
      emoji: '🔄'
    }
  ];

  const tenureOptions = [
    '12 months', '24 months', '36 months', 
    '48 months', '60 months', '84 months', '120 months'
  ];

  const purposeOptions = [
    'Personal Use', 'Commercial Use', 'Agricultural Use', 'Construction Use'
  ];

  const occupationOptions = [
    'Farmer / शेतकरी',
    'Business Owner / व्यापारी', 
    'Salaried / नोकरदार',
    'Transport Business / वाहतूक व्यवसाय',
    'Contractor / कंत्राटदार',
    'Other'
  ];

  const relationOptions = [
    'Father', 'Mother', 'Spouse', 'Brother', 'Other'
  ];

  const maharashtraCities = [
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 
    'Amravati', 'Kolhapur', 'Sangli', 'Jalgaon', 'Akola', 'Latur'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Format currency for display with ₹ symbol
  const formatCurrencyDisplay = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format currency for WhatsApp message (numbers with commas only)
  const formatCurrency = (value: string | number) => {
    if (!value) return '';
    return Number(value).toLocaleString('en-IN');
  };

  const buildWhatsAppMessage = () => {
    const applicationId = `VF-${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
    
    const vehicleTypeDisplay = vehicleTypes.find(v => v.id === formData.vehicleType)?.title || formData.vehicleType;
    const newOrUsed = formData.vehicleCategory === 'new' ? 'New Vehicle' : 'Old-Used Vehicle';
    
    let message = `*SANSKRUTI ASSOCIATES*\n*New Loan Application*\n━━━━━━━━━━━━━━━━━━━━\n\n● Application ID: *${applicationId}*\n● Loan Type: *Vehicle Finance*\n\n━━━━━━━━━━━━━━━━━━━━\n\n*● VEHICLE TYPE*\n1. Vehicle Type: ${vehicleTypeDisplay}\n2. Category: ${newOrUsed}\n\n*● VEHICLE & LOAN DETAILS*\n1. Vehicle Brand: ${formData.vehicleBrand}\n2. Vehicle Model: ${formData.vehicleModel}`;
    
    let fieldNum = 3;
    if (formData.manufacturingYear) {
      message += `\n${fieldNum++}. Manufacturing Year: ${formData.manufacturingYear}`;
    }
    message += `\n${fieldNum++}. Estimated Vehicle Value: ₹${formatCurrency(formData.vehicleValue)}`;
    message += `\n${fieldNum++}. Loan Amount Required: ₹${formatCurrency(formData.loanAmount)}`;
    message += `\n${fieldNum++}. Loan Tenure: ${formData.tenure}`;
    message += `\n${fieldNum++}. Purpose of Finance: ${formData.purpose}`;
    
    message += `\n\n*● PERSONAL DETAILS*\n1. Name: ${formData.fullName}\n2. Date of Birth: ${formData.dateOfBirth}\n3. PAN Number: ${formData.panNumber}\n4. Aadhaar Number: ${formData.aadhaarNumber}\n5. Occupation: ${formData.occupation}\n6. Monthly Income: ₹${formatCurrency(formData.monthlyIncome)}\n7. Address: ${formData.address}\n8. City: ${formData.city}\n9. PIN Code: ${formData.pinCode}`;
    
    message += `\n\n*● CO-APPLICANT DETAILS*\n1. Relation: ${formData.coApplicantRelation}\n2. Co-applicant Name: ${formData.coApplicantName}\n3. Co-applicant PAN: ${formData.coApplicantPAN}\n4. Co-applicant Aadhaar: ${formData.coApplicantAadhaar}`;
    
    message += `\n\n━━━━━━━━━━━━━━━━━━━━\n\nPlease review and get back to me regarding my application.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppClick = () => {
    const message = buildWhatsAppMessage();
    window.open(`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${message}`, '_blank');
  };

  const handleSubmit = () => {
    const appId = `VF-${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
    setApplicationId(appId);
    setShowSuccess(true);
  };

  if (showSuccess) {
    const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${buildWhatsAppMessage()}`;
    return <LoanSuccessCard 
      applicationId={applicationId}
      whatsappUrl={whatsappUrl}
      contactMessage="Our vehicle finance expert will contact you within 2 hours. आमचे तज्ञ लवकरच तुमच्याशी संपर्क करतील."
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/vehicle-finance')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicle Finance
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Vehicle Finance Application
          </h1>
          <p className="text-white/80">
            वाहन कर्ज अर्ज - Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 rounded-full h-2 mb-8">
          <motion.div
            className="bg-gradient-to-r from-[#16A34A] to-[#22C55E] h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8"
        >  
      {/* Step 1: Vehicle Type Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Vehicle Type
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {vehicleTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, vehicleType: type.id })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.vehicleType === type.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/30 hover:border-blue-400 bg-white/5'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{type.emoji}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {type.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {type.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Vehicle Category */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              New or Used Vehicle?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {vehicleCategories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, vehicleCategory: category.id as 'new' | 'old' })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.vehicleCategory === category.id
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-white/30 hover:border-blue-400 bg-white/5'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.emoji}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {category.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {category.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Vehicle & Loan Details */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Vehicle & Loan Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Vehicle Brand *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tata, Mahindra, JCB..."
                  value={formData.vehicleBrand}
                  onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Vehicle Model *
                </label>
                <input
                  type="text"
                  placeholder="Model name"
                  value={formData.vehicleModel}
                  onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                />
              </div>
              
              {formData.vehicleCategory === 'old' && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Manufacturing Year *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2020"
                    value={formData.manufacturingYear}
                    onChange={(e) => setFormData({ ...formData, manufacturingYear: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Estimated Vehicle Value (₹) *
                </label>
                <input
                  type="number"
                  placeholder="Vehicle value"
                  value={formData.vehicleValue || ''}
                  onChange={(e) => setFormData({ ...formData, vehicleValue: Number(e.target.value) })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-white text-sm font-medium mb-2">
                Loan Amount Required: {formatCurrencyDisplay(formData.loanAmount)}
              </label>
              <input
                type="range"
                min="50000"
                max="20000000"
                step="10000"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-white/60 text-xs mt-1">
                <span>₹50K</span>
                <span>₹2Cr</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Loan Tenure *
                </label>
                <select
                  value={formData.tenure}
                  onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                >
                  <option value="">Select tenure</option>
                  {tenureOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Purpose of Finance *
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                >
                  <option value="">Select purpose</option>
                  {purposeOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Personal Details */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Personal Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Full Name (Applicant) *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012"
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Occupation *
                  </label>
                  <select
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="">Select occupation</option>
                    {occupationOptions.map((option) => (
                      <option key={option} value={option} className="bg-gray-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Monthly Income (₹) *
                  </label>
                  <input
                    type="number"
                    placeholder="Monthly income"
                    value={formData.monthlyIncome || ''}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Current Address *
                </label>
                <textarea
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none resize-none"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="">Select city</option>
                    {maharashtraCities.map((city) => (
                      <option key={city} value={city} className="bg-gray-800">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    placeholder="PIN Code"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Co-applicant Section */}
              <div className="border-t border-white/20 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Co-applicant Details (सहकर्जदार)
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Relation *
                    </label>
                    <select
                      value={formData.coApplicantRelation}
                      onChange={(e) => setFormData({ ...formData, coApplicantRelation: e.target.value })}
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                    >
                      <option value="">Select relation</option>
                      {relationOptions.map((option) => (
                        <option key={option} value={option} className="bg-gray-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Co-applicant Name *
                    </label>
                    <input
                      type="text"
                      value={formData.coApplicantName}
                      onChange={(e) => setFormData({ ...formData, coApplicantName: e.target.value })}
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Co-applicant PAN *
                    </label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={formData.coApplicantPAN}
                      onChange={(e) => setFormData({ ...formData, coApplicantPAN: e.target.value.toUpperCase() })}
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Co-applicant Aadhaar *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012"
                      value={formData.coApplicantAadhaar}
                      onChange={(e) => setFormData({ ...formData, coApplicantAadhaar: e.target.value })}
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Review & Submit
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Application Summary</h3>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/60">Vehicle Type:</span>
                  <span className="text-white ml-2 capitalize">{formData.vehicleType}</span>
                </div>
                <div>
                  <span className="text-white/60">Category:</span>
                  <span className="text-white ml-2 capitalize">{formData.vehicleCategory}</span>
                </div>
                <div>
                  <span className="text-white/60">Vehicle:</span>
                  <span className="text-white ml-2">{formData.vehicleBrand} {formData.vehicleModel}</span>
                </div>
                <div>
                  <span className="text-white/60">Loan Amount:</span>
                  <span className="text-white ml-2">{formatCurrencyDisplay(formData.loanAmount)}</span>
                </div>
                <div>
                  <span className="text-white/60">Tenure:</span>
                  <span className="text-white ml-2">{formData.tenure}</span>
                </div>
                <div>
                  <span className="text-white/60">Applicant:</span>
                  <span className="text-white ml-2">{formData.fullName}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-blue-600 bg-white/10 border-white/30 rounded focus:ring-blue-500"
                />
                <span className="text-white/80 text-sm">
                  I agree to the terms and conditions and authorize Sanskruti Associates to process my application and contact me regarding this loan.
                </span>
              </label>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!formData.termsAccepted}
              className="w-full bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              Submit Vehicle Finance Application
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={
              currentStep === totalSteps ||
              (currentStep === 1 && !formData.vehicleType) ||
              (currentStep === 2 && !formData.vehicleCategory)
            }
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        </motion.div>
      </div>
    </div>
  );
}