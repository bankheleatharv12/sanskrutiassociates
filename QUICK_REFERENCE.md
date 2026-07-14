# Loan Form Update - Quick Reference Card

## 🎯 Goal
Remove Mobile Verify & Upload Documents steps → 4-step wizard with WhatsApp integration

## ✅ Reference Implementation
**File:** `src/app/components/HomeLoanForm.jsx`  
**Status:** ✅ COMPLETE - Use as template

---

## 📝 Checklist for Each Form

### 1. Import WhatsApp Constant
```jsx
import { WHATSAPP_BUSINESS_NUMBER } from '../constants/whatsapp';
```

### 2. Update Steps (6 → 4)
```jsx
const steps = [
  'Step 1 Name',  // Employment/Business/Property/Customer Type
  'Personal Details',
  'Loan Details',
  'Review & Submit',
];
```

### 3. Update State
```jsx
// ❌ REMOVE
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState(['', '', '', '', '', '']);
const [mobileVerified, setMobileVerified] = useState(false);
const [uploadedFiles, setUploadedFiles] = useState({});
const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

// ✅ ADD
const [applicationId, setApplicationId] = useState('');
```

### 4. Add Message Builder
```jsx
const formatCurrency = (value) => {
  if (!value) return '';
  return Number(value).toLocaleString('en-IN');
};

const buildWhatsAppMessage = () => {
  const appId = applicationId || `PREFIX-${Date.now().toString().slice(-8)}`;
  
  let message = `🏦 *SANSKRUTI ASSOCIATES*\n📋 *New Loan Application*\n\n━━━━━━━━━━━━━━━━━━━━\n\n🆔 Application ID: *${appId}*\n💰 Loan Type: *LOAN_TYPE*\n\n━━━━━━━━━━━━━━━━━━━━\n\n👔 *EMPLOYMENT TYPE*\n${employmentType}\n\n👤 *PERSONAL DETAILS*\nName: ${formData.fullName}\n...`;
  
  // Add loan details
  message += `\n\n💼 *LOAN DETAILS*\nAmount: ₹${formatCurrency(formData.loanAmount)}\n...`;
  
  message += `\n\n━━━━━━━━━━━━━━━━━━━━\n\n✅ Please review and get back to me regarding my application.`;
  
  return encodeURIComponent(message);
};

const handleWhatsAppClick = () => {
  const message = buildWhatsAppMessage();
  window.open(`https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${message}`, '_blank');
};
```

### 5. Update Submit Handler
```jsx
const submitApplication = () => {
  if (!termsAccepted) return;
  const generatedId = `PREFIX-${Date.now().toString().slice(-8)}`;
  setApplicationId(generatedId);
  setSubmitted(true);
};
```

### 6. Update Success Screen
```jsx
<p className="mb-5 text-3xl text-[#2563EB]">
  {applicationId}  {/* Not inline generation */}
</p>
<button onClick={handleWhatsAppClick}>  {/* Direct click, no popup */}
  <MessageCircle className="h-5 w-5" />
  WhatsApp Us
</button>
```

### 7. Delete Step 4 (Mobile Verify)
```jsx
// ❌ DELETE ENTIRE SECTION
{currentStep === 4 && (
  <div>Mobile verification UI...</div>
)}
```

### 8. Delete Step 5 (Upload Documents)
```jsx
// ❌ DELETE ENTIRE SECTION
{currentStep === 5 && (
  <div>Document upload UI...</div>
)}
```

### 9. Update Step 6 → Step 4
```jsx
// ✅ CHANGE FROM
{currentStep === 6 && (

// ✅ CHANGE TO
{currentStep === 4 && (
```

### 10. Remove Unused Code
```jsx
// ❌ DELETE
const kycDocuments = [...];
const incomeDocuments = [...];
const propertyDocuments = [...];
const handleOtpChange = () => {...};
const handleUpload = () => {...};
function UploadBox() {...}
function UploadSection() {...}

// ❌ REMOVE FROM IMPORTS
import { ..., Upload, ... } from 'lucide-react';
```

---

## 📋 Application ID Prefixes

| Loan | Prefix | Form File |
|------|--------|-----------|
| Home Loan | `HL-` | HomeLoanForm.jsx ✅ |
| Personal Loan | `PL-` | PersonalLoanForm.jsx |
| Loan Against Property | `LAP-` | LAPForm.tsx |
| Business Loan | `BL-` | BusinessLoanForm.tsx |
| Education Loan | `EL-` | EducationLoanForm.tsx |
| Car Loan | `CL-` | CarLoanForm.tsx |
| Machinery Loan | `ML-` | MachineryLoanForm.tsx |
| Hospital Finance | `HF-` | HospitalLoanForm.tsx |
| Industry Finance | `IF-` | IndustryFinanceForm.tsx |
| CC/OD Finance | `CCOD-` | CCODFinanceForm.tsx |
| Vehicle Finance | `VF-` | VehicleFinanceForm.tsx |
| Construction Loan | `CONST-` | ConstructionLoanForm.tsx |
| School Finance | `SF-` | SchoolFinanceForm.tsx |

---

## 🧪 Test Checklist

- [ ] 4 steps show in progress bar
- [ ] All navigation works
- [ ] Submit generates Application ID
- [ ] WhatsApp button opens with message
- [ ] Message has all data
- [ ] Optional fields omitted when empty
- [ ] Currency formatted: ₹30,00,000
- [ ] No console errors

---

## ⚠️ Do NOT Change

- ❌ Styling or colors
- ❌ Animations
- ❌ Layouts
- ❌ Landing pages
- ❌ Loan detail pages

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/app/constants/whatsapp.ts` | WhatsApp number constant |
| `src/app/utils/whatsappMessage.ts` | Message builder utilities |
| `src/app/components/HomeLoanForm.jsx` | ✅ Reference implementation |
| `LOAN_FORM_UPDATE_GUIDE.md` | Detailed guide |
| `IMPLEMENTATION_SUMMARY.md` | Progress tracking |

---

## 🔗 WhatsApp Format

```
URL: https://wa.me/917758969798?text=[ENCODED_MESSAGE]
Number in code: 917758969798 (no + or spaces)
Message: Use encodeURIComponent() for full message
Bold in WhatsApp: *text* (asterisks)
```

---

## 💡 Pro Tips

1. **Copy HomeLoanForm.jsx** as starting point
2. **Search & Replace** loan type name throughout
3. **Update message builder** with loan-specific fields
4. **Test WhatsApp message** on actual phone
5. **Verify currency format** with ₹ symbol

---

**Need Help?** Check `HomeLoanForm.jsx` - it has everything!
