import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { 
  ArrowLeft, ArrowRight, Check, CheckCircle2,
  Landmark, Home, PiggyBank, Zap, Building2, 
  Users, User, Briefcase, Phone, MessageCircle
} from 'lucide-react';
import { WHATSAPP_BUSINESS_NUMBER } from '../app/constants/whatsapp';
import { LoanSuccessCard } from '../app/components/LoanSuccessCard';

interface FormData {
  facilityType: string;
  businessType: string;
  businessName: string;
  typeOfBusiness: string;
  yearsInBusiness: string;
  annualTurnover: string;
  currentAccountBank: string;
  gstNumber: string;
  existingCCOD: string;
  authorizedPersonName: string;
  authorizedPersonPAN: string;
  authorizedPersonAadhaar: string;
  businessAddress: string;
  city: string;
  pinCode: string;
  limitRequired: number;
  selectedPurposes: string[];
  existingMonthlySales: string;
  preferredBank: string;
}

const CCODFinanceForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    facilityType: '',
    businessType: '',
    businessName: '',
    typeOfBusiness: '',
    yearsInBusiness: '',
    annualTurnover: '',
    currentAccountBank: '',
    gstNumber: '',
    existingCCOD: '',
    authorizedPersonName: '',
    authorizedPersonPAN: '',
    authorizedPersonAadhaar: '',
    businessAddress: '',
    city: '',
    pinCode: '',
    limitRequired: 500000,
    selectedPurposes: [],
    existingMonthlySales: '',
    preferredBank: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const steps = [
    'Facility Type',
    'Business Type', 
    'Details',
    'Facility Info',
    'Review & Submit'
  ];

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // Build WhatsApp message URL with application details
  const buildCCODWhatsAppMessage = () => {
    let lineNumber = 1;
    let message = `*SANSKRUTI ASSOCIATES*\n*New Loan Application*\n━━━━━━━━━━━━━━━━━━━━\n\n● Application ID: *${applicationId}*\n● Facility Type: *CC/OD — ${getFacilityTypeDisplay(formData.facilityType)}*\n\n━━━━━━━━━━━━━━━━━━━━\n\n*● BUSINESS TYPE*\n${lineNumber}. Business Type: ${getBusinessTypeDisplay(formData.businessType)}\n\n`;
    lineNumber++;

    message += `*● BUSINESS DETAILS*\n`;
    if (formData.businessName) {
      message += `${lineNumber}. Business Name: ${formData.businessName}\n`;
      lineNumber++;
    }
    if (formData.typeOfBusiness) {
      message += `${lineNumber}. Type of Business: ${formData.typeOfBusiness}\n`;
      lineNumber++;
    }
    if (formData.yearsInBusiness) {
      message += `${lineNumber}. Years in Business: ${formData.yearsInBusiness}\n`;
      lineNumber++;
    }
    if (formData.annualTurnover) {
      message += `${lineNumber}. Annual Turnover: ₹${Number(formData.annualTurnover).toLocaleString('en-IN')}\n`;
      lineNumber++;
    }
    if (formData.currentAccountBank) {
      message += `${lineNumber}. Current Account Bank: ${formData.currentAccountBank}\n`;
      lineNumber++;
    }
    if (formData.gstNumber) {
      message += `${lineNumber}. GST Number: ${formData.gstNumber}\n`;
      lineNumber++;
    }
    if (formData.existingCCOD) {
      message += `${lineNumber}. Existing CC/OD Facility: ${formData.existingCCOD}\n`;
      lineNumber++;
    }
    if (formData.authorizedPersonName) {
      message += `${lineNumber}. Authorized Person Name: ${formData.authorizedPersonName}\n`;
      lineNumber++;
    }
    if (formData.authorizedPersonPAN) {
      message += `${lineNumber}. Authorized Person PAN: ${formData.authorizedPersonPAN}\n`;
      lineNumber++;
    }
    if (formData.authorizedPersonAadhaar) {
      message += `${lineNumber}. Authorized Person Aadhaar: ${formData.authorizedPersonAadhaar}\n`;
      lineNumber++;
    }
    if (formData.businessAddress) {
      message += `${lineNumber}. Business Address: ${formData.businessAddress}\n`;
      lineNumber++;
    }
    if (formData.city) {
      message += `${lineNumber}. City: ${formData.city}\n`;
      lineNumber++;
    }
    if (formData.pinCode) {
      message += `${lineNumber}. PIN Code: ${formData.pinCode}\n`;
      lineNumber++;
    }

    message += `\n*● FACILITY REQUIREMENTS*\n`;
    lineNumber = 1;
    message += `${lineNumber}. Limit Required: ₹${Number(formData.limitRequired).toLocaleString('en-IN')}\n`;
    lineNumber++;
    
    if (formData.selectedPurposes.length > 0) {
      formData.selectedPurposes.forEach((purpose) => {
        message += `${lineNumber}. Purpose of Limit: ${purpose}\n`;
        lineNumber++;
      });
    }
    
    if (formData.existingMonthlySales) {
      message += `${lineNumber}. Existing Monthly Sales: ₹${Number(formData.existingMonthlySales).toLocaleString('en-IN')}\n`;
      lineNumber++;
    }
    
    if (formData.preferredBank) {
      message += `${lineNumber}. Preferred Bank: ${formData.preferredBank}\n`;
      lineNumber++;
    }

    message += `\n━━━━━━━━━━━━━━━━━━━━\n\nPlease review and get back to me regarding my application.`;
    
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
  };

  // Step 1: Facility Type Selection
  const FacilityTypeStep = () => {
    const facilityTypes = [
      {
        id: 'cc',
        icon: Landmark,
        title: 'Cash Credit',
        subtitle: 'Stock / Inventory Based',
        color: 'emerald',
        features: ['Separate CC account', 'Based on stock value', 'For ongoing operations']
      },
      {
        id: 'property-od',
        icon: Home,
        title: 'Overdraft (Property)',
        subtitle: 'Property Based OD facility',
        color: 'blue',
        features: ['Against residential/commercial', 'Higher limit available', 'Longer tenure']
      },
      {
        id: 'fd-od',
        icon: PiggyBank,
        title: 'Overdraft (FD Based)',
        subtitle: 'Fixed Deposit Based OD',
        color: 'purple',
        features: ['Up to 90% of FD value', 'Lower interest rate', 'Quick processing']
      },
      {
        id: 'unsecured-od',
        icon: Zap,
        title: 'Unsecured OD',
        subtitle: 'Without Collateral',
        color: 'orange',
        features: ['Based on income/turnover', 'Quick approval', 'For professionals']
      }
    ];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What type of facility do you need?
          </h2>
          <p className="text-gray-600">Select the CC/OD facility that suits your requirements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilityTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = formData.facilityType === type.id;
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-300 hover:shadow-lg'
                }`}
                onClick={() => setFormData({...formData, facilityType: type.id})}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                  type.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                  type.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  type.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-1">{type.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.subtitle}</p>
                
                <div className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4 flex items-center justify-center"
                  >
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // Step 2: Business Type
  const BusinessTypeStep = () => {
    const businessTypes = [
      { id: 'proprietorship', title: 'Proprietorship', subtitle: 'Individual Ownership', icon: User },
      { id: 'partnership', title: 'Partnership Firm', subtitle: 'Partnership Business', icon: Users },
      { id: 'private-limited', title: 'Private Limited Company', subtitle: 'Private Limited', icon: Building2 },
      { id: 'llp', title: 'LLP', subtitle: 'Limited Liability Partnership', icon: Briefcase },
      { id: 'individual', title: 'Individual (for OD)', subtitle: 'Personal', icon: User },
      { id: 'professional', title: 'Professional', subtitle: 'CA / Doctor / Lawyer', icon: Briefcase }
    ];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What is your business type?
          </h2>
          <p className="text-gray-600">Select your business structure</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {businessTypes.map((type, index) => {
            const Icon = type.icon;
            const isSelected = formData.businessType === type.id;
            
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
                }`}
                onClick={() => setFormData({...formData, businessType: type.id})}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.subtitle}</p>
                  
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3"
                    >
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };  // Step 3: Business/Personal Details
  const DetailsStep = () => {
    const isIndividual = formData.businessType === 'individual';
    
    const businessTypes = [
      'Trading / Business',
      'Manufacturing / Production', 
      'Services',
      'Agriculture / Farming',
      'Construction',
      'Transport / Logistics',
      'Food & Beverage',
      'Other'
    ];

    const cities = [
      'Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad', 'Solapur', 
      'Kolhapur', 'Sangli', 'Satara', 'Ahmednagar', 'Other'
    ];

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isIndividual ? 'Personal Details' : 'Business Details'}
          </h2>
          <p className="text-gray-600">
            {isIndividual ? 'Enter your personal information' : 'Enter your business information'}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          {!isIndividual ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type of Business *
                </label>
                <select
                  value={formData.typeOfBusiness}
                  onChange={(e) => setFormData({...formData, typeOfBusiness: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years in Business *
                </label>
                <input
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({...formData, yearsInBusiness: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter years"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Turnover (₹) *
                </label>
                <input
                  type="number"
                  value={formData.annualTurnover}
                  onChange={(e) => setFormData({...formData, annualTurnover: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter annual turnover"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Account Bank Name *
                </label>
                <input
                  type="text"
                  value={formData.currentAccountBank}
                  onChange={(e) => setFormData({...formData, currentAccountBank: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter bank name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number
                </label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter GST number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Existing CC/OD Facility
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="existingCCOD"
                      value="Yes"
                      checked={formData.existingCCOD === 'Yes'}
                      onChange={(e) => setFormData({...formData, existingCCOD: e.target.value})}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="existingCCOD"
                      value="No"
                      checked={formData.existingCCOD === 'No'}
                      onChange={(e) => setFormData({...formData, existingCCOD: e.target.value})}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorized Person Name *
                </label>
                <input
                  type="text"
                  value={formData.authorizedPersonName}
                  onChange={(e) => setFormData({...formData, authorizedPersonName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter authorized person name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorized Person PAN *
                </label>
                <input
                  type="text"
                  value={formData.authorizedPersonPAN}
                  onChange={(e) => setFormData({...formData, authorizedPersonPAN: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter PAN number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Authorized Person Aadhaar *
                </label>
                <input
                  type="text"
                  value={formData.authorizedPersonAadhaar}
                  onChange={(e) => setFormData({...formData, authorizedPersonAadhaar: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter Aadhaar number"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address *
                </label>
                <textarea
                  value={formData.businessAddress}
                  onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="Enter complete business address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({...formData, pinCode: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter PIN code"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter PAN number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Number *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter Aadhaar number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter occupation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Income (₹) *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter monthly income"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employer Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter employer name (if salaried)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  rows={3}
                  placeholder="Enter complete address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="">Select city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter PIN code"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };  // Step 4: Facility Details
  const FacilityDetailsStep = () => {
    const purposes = [
      'Stock Purchase',
      'Salary Payment', 
      'Supplier Payment',
      'Inventory Management',
      'Day-to-day Operations',
      'Export Finance',
      'Seasonal Business',
      'Emergency Buffer'
    ];

    const formatCurrency = (amount: number) => {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(1)} Crore`;
      } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)} Lakh`;
      } else {
        return `₹${amount.toLocaleString()}`;
      }
    };

    const togglePurpose = (purpose: string) => {
      setFormData(prev => ({
        ...prev,
        selectedPurposes: prev.selectedPurposes.includes(purpose)
          ? prev.selectedPurposes.filter(p => p !== purpose)
          : [...prev.selectedPurposes, purpose]
      }));
    };

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            CC/OD Limit Details
          </h2>
          <p className="text-gray-600">Specify your facility requirements</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Limit Required: <span className="text-2xl font-bold text-emerald-600">{formatCurrency(formData.limitRequired)}</span>
            </label>
            <input
              type="range"
              min="100000"
              max="100000000"
              step="100000"
              value={formData.limitRequired}
              onChange={(e) => setFormData({...formData, limitRequired: Number(e.target.value)})}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-emerald"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹1 Lakh</span>
              <span>₹10 Crore</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Purpose of Limit (Select multiple)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {purposes.map(purpose => (
                <motion.div
                  key={purpose}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all text-center text-sm font-medium ${
                    formData.selectedPurposes.includes(purpose)
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 hover:border-emerald-300 text-gray-700'
                  }`}
                  onClick={() => togglePurpose(purpose)}
                >
                  {purpose}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Existing Monthly Sales (₹) *
              </label>
              <input
                type="number"
                value={formData.existingMonthlySales}
                onChange={(e) => setFormData({...formData, existingMonthlySales: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter monthly sales"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Bank (Optional)
              </label>
              <input
                type="text"
                value={formData.preferredBank}
                onChange={(e) => setFormData({...formData, preferredBank: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter preferred bank"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to format facility type display name
  const getFacilityTypeDisplay = (type: string) => {
    const types: Record<string, string> = {
      'cc': 'Cash Credit',
      'property-od': 'Overdraft (Property)',
      'fd-od': 'Overdraft (FD Based)',
      'unsecured-od': 'Unsecured OD'
    };
    return types[type] || type;
  };

  // Helper function to format business type display name
  const getBusinessTypeDisplay = (type: string) => {
    const types: Record<string, string> = {
      'proprietorship': 'Proprietorship',
      'partnership': 'Partnership Firm',
      'private-limited': 'Private Limited Company',
      'llp': 'LLP',
      'individual': 'Individual (for OD)',
      'professional': 'Professional'
    };
    return types[type] || type;
  };

  // Helper function to format currency
  const formatCurrencyDisplay = (amount: number | string) => {
    const num = Number(amount);
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(1)} Crore`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(1)} Lakh`;
    } else {
      return `₹${num.toLocaleString('en-IN')}`;
    }
  };

  // Step 5: Review & Submit
  const ReviewSubmitStep = () => {
    const handleSubmit = () => {
      if (termsAccepted) {
        const genApplicationId = `CCOD-${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`;
        setApplicationId(genApplicationId);
        setIsSubmitted(true);
      }
    };

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Review & Submit
          </h2>
          <p className="text-gray-600">Please review your application details before submitting</p>
        </div>

        {/* Summary Chips */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Facility Type</p>
            <p className="font-semibold text-[#1F2937]">{getFacilityTypeDisplay(formData.facilityType)}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Business Type</p>
            <p className="font-semibold text-[#1F2937]">{getBusinessTypeDisplay(formData.businessType)}</p>
          </div>
          <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">Limit Required</p>
            <p className="font-bold text-[#2563EB] text-xl">{formatCurrencyDisplay(formData.limitRequired)}</p>
          </div>
        </div>

        {/* Business Details Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-[#1F2937] border-b pb-2">Business Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Business Name</p>
              <p className="font-medium text-[#1F2937]">{formData.businessName || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">Type of Business</p>
              <p className="font-medium text-[#1F2937]">{formData.typeOfBusiness || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">Years in Business</p>
              <p className="font-medium text-[#1F2937]">{formData.yearsInBusiness || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">Annual Turnover</p>
              <p className="font-medium text-[#1F2937]">
                {formData.annualTurnover ? formatCurrencyDisplay(formData.annualTurnover) : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Current Account Bank</p>
              <p className="font-medium text-[#1F2937]">{formData.currentAccountBank || '-'}</p>
            </div>
            {formData.gstNumber && (
              <div>
                <p className="text-gray-500">GST Number</p>
                <p className="font-medium text-[#1F2937]">{formData.gstNumber}</p>
              </div>
            )}
            <div>
              <p className="text-gray-500">Existing CC/OD Facility</p>
              <p className="font-medium text-[#1F2937]">{formData.existingCCOD || '-'}</p>
            </div>
          </div>
        </div>

        {/* Authorized Person Details Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-[#1F2937] border-b pb-2">Authorized Person Details</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Authorized Person Name</p>
              <p className="font-medium text-[#1F2937]">{formData.authorizedPersonName || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">Authorized Person PAN</p>
              <p className="font-medium text-[#1F2937]">{formData.authorizedPersonPAN || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">Authorized Person Aadhaar</p>
              <p className="font-medium text-[#1F2937]">{formData.authorizedPersonAadhaar || '-'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-500">Business Address</p>
              <p className="font-medium text-[#1F2937]">{formData.businessAddress || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">City</p>
              <p className="font-medium text-[#1F2937]">{formData.city || '-'}</p>
            </div>
            <div>
              <p className="text-gray-500">PIN Code</p>
              <p className="font-medium text-[#1F2937]">{formData.pinCode || '-'}</p>
            </div>
          </div>
        </div>

        {/* Facility Requirements Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-[#1F2937] border-b pb-2">Facility Requirements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Limit Required</p>
              <p className="font-medium text-[#1F2937]">{formatCurrencyDisplay(formData.limitRequired)}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-500">Purpose of Limit</p>
              <p className="font-medium text-[#1F2937]">
                {formData.selectedPurposes.length > 0 ? formData.selectedPurposes.join(', ') : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Existing Monthly Sales</p>
              <p className="font-medium text-[#1F2937]">
                {formData.existingMonthlySales ? formatCurrencyDisplay(formData.existingMonthlySales) : '-'}
              </p>
            </div>
            {formData.preferredBank && (
              <div>
                <p className="text-gray-500">Preferred Bank</p>
                <p className="font-medium text-[#1F2937]">{formData.preferredBank}</p>
              </div>
            )}
          </div>
        </div>

        {/* Declaration Checkbox */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <label className="flex items-start gap-3 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-5 w-5 accent-[#16A34A] rounded border-gray-300"
            />
            <span className="text-sm text-gray-600">
              I hereby declare that the information provided is true and correct. I authorize Sanskruti Associates and its banking partners to verify my details, fetch my credit report, and contact me via call/SMS/WhatsApp regarding this application.
            </span>
          </label>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={prevStep}
              className="rounded-xl border border-gray-300 px-8 py-4 font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95 sm:w-auto w-full"
            >
              Previous
            </button>
            <button
              disabled={!termsAccepted}
              onClick={handleSubmit}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#22C55E] px-8 py-4 font-semibold text-white shadow-lg transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit CC/OD Application
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Success Screen
  const SuccessScreen = () => {
    const whatsappUrl = buildCCODWhatsAppMessage();

    return <LoanSuccessCard 
      applicationId={applicationId}
      whatsappUrl={whatsappUrl}
      contactMessage="Our Business Finance Expert will contact you within 2 hours."
    />;
  };

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/cc-od-finance')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">CC/OD Application</h1>
            <div className="text-sm text-gray-500">
              Step {currentStep} of 5
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-xs font-medium ${
                  index + 1 <= currentStep ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-emerald-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / 5) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && <FacilityTypeStep />}
          {currentStep === 2 && <BusinessTypeStep />}
          {currentStep === 3 && <DetailsStep />}
          {currentStep === 4 && <FacilityDetailsStep />}
          {currentStep === 5 && <ReviewSubmitStep />}
        </motion.div>

        {currentStep < 5 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && !formData.facilityType) ||
                (currentStep === 2 && !formData.businessType)
              }
              className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CCODFinanceForm;