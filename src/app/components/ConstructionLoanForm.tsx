import { useState } from "react";
import { motion } from "motion/react";
import { LoanSuccessCard } from './LoanSuccessCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  MessageCircle,
  Home,
  HardHat,
  User,
  Users,
  Building2,
  Briefcase,
  Stethoscope,
  BedDouble,
  Store,
  LayoutGrid
} from "lucide-react";
import { useNavigate } from "react-router";
import { WHATSAPP_BUSINESS_NUMBER } from '../constants/whatsapp';

interface FormData {
  applicantType: string;
  projectName: string;
  projectType: string;
  projectLocation: string;
  plotArea: number;
  constructionArea: number;
  numberOfUnits: number;
  completionPercentage: string;
  reraNumber: string;
  previousProjects: number;
  projectStartDate: string;
  expectedCompletionDate: string;
  loanPurpose: string;
  loanAmount: number;
  tenure: string;
  projectValue: number;
  ltvRequired: number;
  existingLoan: string;
  lenderName: string;
  outstandingAmount: number;
  currentROI: number;
  btPurpose: string;
  projectBrief: string;
  termsAccepted: boolean;
}

export function ConstructionLoanForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    applicantType: '',
    projectName: '',
    projectType: '',
    projectLocation: '',
    plotArea: 0,
    constructionArea: 0,
    numberOfUnits: 0,
    completionPercentage: '',
    reraNumber: '',
    previousProjects: 0,
    projectStartDate: '',
    expectedCompletionDate: '',
    loanPurpose: '',
    loanAmount: 1000000,
    tenure: '',
    projectValue: 0,
    ltvRequired: 0,
    existingLoan: '',
    lenderName: '',
    outstandingAmount: 0,
    currentROI: 0,
    btPurpose: '',
    projectBrief: '',
    termsAccepted: false
  });

  const totalSteps = 4;

  const applicantTypes = [
    {
      id: 'builder',
      title: 'Builder / Developer',
      subtitle: 'Residential or commercial builder',
      icon: HardHat
    },
    {
      id: 'individual',
      title: 'Individual Property Owner',
      subtitle: 'Self construction on own land',
      icon: User
    },
    {
      id: 'partnership',
      title: 'Partnership Firm',
      subtitle: 'Construction partnership',
      icon: Users
    },
    {
      id: 'pvtltd',
      title: 'Private Limited Company',
      subtitle: 'Registered builder company',
      icon: Building2
    },
    {
      id: 'llp',
      title: 'LLP',
      subtitle: 'Limited liability partnership',
      icon: Briefcase
    },
    {
      id: 'healthcare',
      title: 'Hospital / Healthcare',
      subtitle: 'Healthcare construction',
      icon: Stethoscope
    },
    {
      id: 'hospitality',
      title: 'Hotel / Hospitality',
      subtitle: 'Hotel or lodge construction',
      icon: BedDouble
    },
    {
      id: 'commercial',
      title: 'Commercial Developer',
      subtitle: 'Commercial property developer',
      icon: Store
    },
    {
      id: 'mixeduse',
      title: 'Mixed Use Developer',
      subtitle: 'Residential + commercial',
      icon: LayoutGrid
    }
  ];

  const projectTypes = [
    'Residential Apartments',
    'Commercial Complex',
    'Mixed Use Development',
    'Hospital / Healthcare',
    'Hotel / Hospitality',
    'Restaurant / Bar',
    'PG Property',
    'Mangal Karyalaya',
    'NA Land Development',
    'Auction Property',
    'Other Special Property'
  ];

  const projectLocations = [
    'Mumbai (City)',
    'Mumbai Suburbs',
    'Navi Mumbai',
    'Thane',
    'Pune City',
    'Pune Suburbs',
    'Pimpri Chinchwad',
    'Other (within 50km)'
  ];

  const completionOptions = [
    'Just Started (0-10%)',
    'Foundation Complete (10-30%)',
    'Plinth Complete (30-50%)',
    'Slab Work (50-70%)',
    'Finishing Stage (70-90%)',
    'Near Complete (90%+)'
  ];

  const loanPurposes = [
    'Construction Funding',
    'Inventory Funding',
    'NA Land Purchase',
    'Balance Transfer from Bank',
    'Balance Transfer from Patsanstha',
    'Top Up on Existing Loan',
    'Auction Property Purchase'
  ];

  const tenureOptions = [
    '1 Year',
    '2 Years',
    '3 Years',
    '5 Years',
    '7 Years',
    '10 Years'
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateLTV = () => {
    if (formData.projectValue > 0 && formData.loanAmount > 0) {
      const ltv = (formData.loanAmount / formData.projectValue) * 100;
      setFormData({ ...formData, ltvRequired: Math.round(ltv) });
    }
  };

  const buildConstructionLoanWhatsAppMessage = (appId: string) => {
    const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`;
    
    let message = `*SANSKRUTI ASSOCIATES*\n*New Loan Application*\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `● Application ID: *${appId}*\n`;
    message += `● Loan Type: *Construction Loan*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    // Applicant Type
    message += `*● APPLICANT TYPE*\n`;
    message += `1. Applicant Type: ${formData.applicantType}\n\n`;
    
    // Project Details
    message += `*● PROJECT DETAILS*\n`;
    let projectDetailNum = 1;
    message += `${projectDetailNum++}. Project Name: ${formData.projectName}\n`;
    message += `${projectDetailNum++}. Project Type: ${formData.projectType}\n`;
    message += `${projectDetailNum++}. Project Location: ${formData.projectLocation}\n`;
    message += `${projectDetailNum++}. Plot Area: ${formData.plotArea} sq ft\n`;
    message += `${projectDetailNum++}. Construction Area: ${formData.constructionArea} sq ft\n`;
    message += `${projectDetailNum++}. Number of Units/Floors: ${formData.numberOfUnits}\n`;
    message += `${projectDetailNum++}. Current Completion: ${formData.completionPercentage}\n`;
    
    // Optional: RERA Registration Number
    if (formData.reraNumber && formData.reraNumber.trim()) {
      message += `${projectDetailNum++}. RERA Registration Number: ${formData.reraNumber}\n`;
    }
    
    message += `${projectDetailNum++}. Project Start Date: ${formData.projectStartDate}\n`;
    message += `${projectDetailNum++}. Expected Completion Date: ${formData.expectedCompletionDate}\n\n`;
    
    // Loan Details
    message += `*● LOAN DETAILS*\n`;
    let loanDetailNum = 1;
    message += `${loanDetailNum++}. Loan Purpose: ${formData.loanPurpose}\n`;
    message += `${loanDetailNum++}. Loan Amount Required: ${formatCurrency(formData.loanAmount)}\n`;
    message += `${loanDetailNum++}. Tenure: ${formData.tenure}\n`;
    message += `${loanDetailNum++}. Project Value: ${formatCurrency(formData.projectValue)}\n`;
    message += `${loanDetailNum++}. Existing Construction Loan: ${formData.existingLoan}\n`;
    message += `${loanDetailNum++}. Project Brief: ${formData.projectBrief}\n\n`;
    
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please review and get back to me regarding my application.`;
    
    return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`;
  };

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

  const handleSubmit = () => {
    const appId = `CONST-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    setApplicationId(appId);
    setShowSuccess(true);
  };

  if (showSuccess) {
    const whatsappUrl = buildConstructionLoanWhatsAppMessage(applicationId);
    return <LoanSuccessCard 
      applicationId={applicationId}
      whatsappUrl={whatsappUrl}
      contactMessage="Our construction finance expert will contact you within 2 business hours (Mon-Sat: 9AM to 7PM)."
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] py-8 relative">
      {/* Wave Background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z" fill="url(#wave-gradient)" />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/construction-loan')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Construction Loan
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Construction Loan Application
          </h1>
          <p className="text-white/80">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 rounded-full h-3 mb-8 backdrop-blur-md">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-full rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 text-xs text-white/60">
          {['Applicant Type', 'Project Details', 'Loan Details', 'Review and Submit'].map((step, index) => (
            <div key={index} className={`text-center ${currentStep > index + 1 ? 'text-yellow-400' : currentStep === index + 1 ? 'text-white' : ''}`}>
              <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-semibold ${
                currentStep > index + 1 ? 'bg-yellow-400 text-gray-900' : 
                currentStep === index + 1 ? 'bg-white text-gray-900' : 'bg-white/20'
              }`}>
                {index + 1}
              </div>
              <span className="hidden sm:block">{step}</span>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl"
        >      
  {/* Step 1: Applicant Type */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Select Applicant Type
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {applicantTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, applicantType: type.id })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative ${
                    formData.applicantType === type.id
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-400 text-gray-900'
                      : 'border-white/30 hover:border-yellow-400 bg-white/5 text-white'
                  }`}
                >
                  {formData.applicantType === type.id && (
                    <CheckCircle className="absolute top-2 right-2 w-5 h-5 text-gray-900" />
                  )}
                  <div className="text-center">
                    <type.icon className={`w-8 h-8 mx-auto mb-3 ${
                      formData.applicantType === type.id ? 'text-gray-900' : 'text-yellow-400'
                    }`} />
                    <h3 className="font-semibold mb-1 text-sm">
                      {type.title}
                    </h3>
                    <p className={`text-xs ${
                      formData.applicantType === type.id ? 'text-gray-700' : 'text-white/70'
                    }`}>
                      {type.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Project Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                  placeholder="Enter project name"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Type *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                >
                  <option value="" className="bg-gray-800">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-800">
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Location *
                </label>
                <select
                  value={formData.projectLocation}
                  onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                >
                  <option value="" className="bg-gray-800">Select location</option>
                  {projectLocations.map((location) => (
                    <option key={location} value={location} className="bg-gray-800">
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Plot Area (in sq ft) *
                </label>
                <input
                  type="number"
                  value={formData.plotArea || ''}
                  onChange={(e) => setFormData({ ...formData, plotArea: Number(e.target.value) })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                  placeholder="Plot area"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Construction Area (in sq ft) *
                </label>
                <input
                  type="number"
                  value={formData.constructionArea || ''}
                  onChange={(e) => setFormData({ ...formData, constructionArea: Number(e.target.value) })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                  placeholder="Construction area"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Number of Units/Floors *
                </label>
                <input
                  type="number"
                  value={formData.numberOfUnits || ''}
                  onChange={(e) => setFormData({ ...formData, numberOfUnits: Number(e.target.value) })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                  placeholder="Number of units"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Current Completion % *
                </label>
                <select
                  value={formData.completionPercentage}
                  onChange={(e) => setFormData({ ...formData, completionPercentage: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                >
                  <option value="" className="bg-gray-800">Select completion %</option>
                  {completionOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-800">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  RERA Registration Number (Optional for commercial)
                </label>
                <input
                  type="text"
                  value={formData.reraNumber}
                  onChange={(e) => setFormData({ ...formData, reraNumber: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                  placeholder="RERA number"
                />
              </div>
              
              {(formData.applicantType === 'builder' || formData.applicantType === 'pvtltd') && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Number of Previous Projects Completed *
                  </label>
                  <input
                    type="number"
                    value={formData.previousProjects || ''}
                    onChange={(e) => setFormData({ ...formData, previousProjects: Number(e.target.value) })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                    placeholder="Number of projects"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Start Date *
                </label>
                <input
                  type="date"
                  value={formData.projectStartDate}
                  onChange={(e) => setFormData({ ...formData, projectStartDate: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Expected Completion Date *
                </label>
                <input
                  type="date"
                  value={formData.expectedCompletionDate}
                  onChange={(e) => setFormData({ ...formData, expectedCompletionDate: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Loan Details */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Loan Details
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Loan Purpose *
                </label>
                <select
                  value={formData.loanPurpose}
                  onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                >
                  <option value="" className="bg-gray-800">Select loan purpose</option>
                  {loanPurposes.map((purpose) => (
                    <option key={purpose} value={purpose} className="bg-gray-800">
                      {purpose}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Loan Amount Required: {formatCurrency(formData.loanAmount)}
                </label>
                <input
                  type="range"
                  min="1000000"
                  max="1000000000"
                  step="100000"
                  value={formData.loanAmount}
                  onChange={(e) => {
                    const newAmount = Number(e.target.value);
                    setFormData({ ...formData, loanAmount: newAmount });
                    calculateLTV();
                  }}
                  className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider backdrop-blur-md"
                />
                <div className="flex justify-between text-white/60 text-xs mt-1">
                  <span>₹10L</span>
                  <span>₹100Cr</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Tenure *
                  </label>
                  <select
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                  >
                    <option value="" className="bg-gray-800">Select tenure</option>
                    {tenureOptions.map((option) => (
                      <option key={option} value={option} className="bg-gray-800">
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Project Value (Total Cost) *
                  </label>
                  <input
                    type="number"
                    value={formData.projectValue || ''}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setFormData({ ...formData, projectValue: newValue });
                      calculateLTV();
                    }}
                    className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                    placeholder="Total project cost"
                  />
                </div>
              </div>
              
              {formData.ltvRequired > 0 && (
                <div className="bg-yellow-400/20 border border-yellow-400/40 rounded-xl p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>LTV Required:</strong> {formData.ltvRequired}%
                    {formData.ltvRequired > 55 && (
                      <span className="text-red-300 ml-2">(Above 55% - may require additional security)</span>
                    )}
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Existing Construction Loan
                </label>
                <div className="flex gap-4 mb-4">
                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="radio"
                      name="existingLoan"
                      value="yes"
                      checked={formData.existingLoan === 'yes'}
                      onChange={(e) => setFormData({ ...formData, existingLoan: e.target.value })}
                      className="text-yellow-400"
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 text-white">
                    <input
                      type="radio"
                      name="existingLoan"
                      value="no"
                      checked={formData.existingLoan === 'no'}
                      onChange={(e) => setFormData({ ...formData, existingLoan: e.target.value })}
                      className="text-yellow-400"
                    />
                    No
                  </label>
                </div>
                
                {formData.existingLoan === 'yes' && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Lender Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lenderName}
                        onChange={(e) => setFormData({ ...formData, lenderName: e.target.value })}
                        className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                        placeholder="Current lender name"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Outstanding Amount *
                      </label>
                      <input
                        type="number"
                        value={formData.outstandingAmount || ''}
                        onChange={(e) => setFormData({ ...formData, outstandingAmount: Number(e.target.value) })}
                        className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                        placeholder="Outstanding amount"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Current ROI *
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.currentROI || ''}
                        onChange={(e) => setFormData({ ...formData, currentROI: Number(e.target.value) })}
                        className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                        placeholder="Current interest rate"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Purpose: BT or Top Up
                      </label>
                      <select
                        value={formData.btPurpose}
                        onChange={(e) => setFormData({ ...formData, btPurpose: e.target.value })}
                        className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white focus:border-yellow-400 focus:outline-none backdrop-blur-md"
                      >
                        <option value="" className="bg-gray-800">Select purpose</option>
                        <option value="BT" className="bg-gray-800">Balance Transfer</option>
                        <option value="TopUp" className="bg-gray-800">Top Up</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Project Brief * (max 500 characters)
                </label>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={formData.projectBrief}
                  onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                  className="w-full bg-white/10 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none resize-none backdrop-blur-md"
                  placeholder="Brief description of project..."
                />
                <div className="text-right text-white/60 text-xs mt-1">
                  {formData.projectBrief.length}/500
                </div>
              </div>
            </div>
          </div>
        )}    
    {/* Step 4: Review and Submit */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Review and Submit
            </h2>
            
            <div className="space-y-6 mb-8">
              {/* Application Summary */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Application Summary</h3>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/60">Applicant Type:</span>
                    <span className="text-white ml-2 capitalize">{formData.applicantType}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Project Name:</span>
                    <span className="text-white ml-2">{formData.projectName}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Project Type:</span>
                    <span className="text-white ml-2">{formData.projectType}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Location:</span>
                    <span className="text-white ml-2">{formData.projectLocation}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Loan Amount:</span>
                    <span className="text-white ml-2">{formatCurrency(formData.loanAmount)}</span>
                  </div>
                  <div>
                    <span className="text-white/60">Project Value:</span>
                    <span className="text-white ml-2">{formatCurrency(formData.projectValue)}</span>
                  </div>
                  <div>
                    <span className="text-white/60">LTV:</span>
                    <span className="text-white ml-2">{formData.ltvRequired}%</span>
                  </div>
                  <div>
                    <span className="text-white/60">Tenure:</span>
                    <span className="text-white ml-2">{formData.tenure}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                  className="mt-1 w-4 h-4 text-yellow-600 bg-white/10 border-white/30 rounded focus:ring-yellow-500"
                />
                <span className="text-white/80 text-sm">
                  I agree to the terms and conditions and authorize Sanskruti Associates to process my construction loan application and contact me regarding this loan. I understand that rates start from 12% p.a. and final approval is subject to project eligibility and lender discretion.
                </span>
              </label>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!formData.termsAccepted}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
            >
              Submit Construction Loan Application
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={
              currentStep === totalSteps ||
              (currentStep === 1 && !formData.applicantType)
            }
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
