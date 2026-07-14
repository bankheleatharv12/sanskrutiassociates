# Vehicle Finance Flow — QA Testing Checklist

**Last Updated:** July 13, 2026  
**Implementation Status:** Complete ✅  
**File Modified:** `src/app/components/VehicleFinanceForm.tsx`

---

## 📋 Pre-Testing Verification

### Code Quality
- [x] TypeScript compilation successful (no errors)
- [x] No unused imports
- [x] WhatsApp constant imported from shared file
- [x] No duplicate constants created
- [x] All removed code cleaned up (no dead code)
- [x] FormData interface updated correctly

### Step Count Verification
- [x] `totalSteps = 5` (was 7)
- [x] Step 1: Select Vehicle Type
- [x] Step 2: New or Used Vehicle
- [x] Step 3: Vehicle & Loan Details
- [x] Step 4: Personal Details & Co-applicant
- [x] Step 5: Review & Submit
- [x] No Step 6 or Step 7 in code

---

## 🧪 Functional Testing

### Step 1: Select Vehicle Type
- [ ] Page loads without errors
- [ ] Progress bar shows "Step 1 of 5"
- [ ] Bilingual subtitle: "वाहन कर्ज अर्ज - Step 1 of 5"
- [ ] Three vehicle type cards display:
  - [ ] 🚛 Commercial Vehicles
  - [ ] 🚜 Agricultural Vehicles
  - [ ] 🏗️ Construction Machines
- [ ] Clicking a card selects it (border turns blue)
- [ ] "Previous" button is disabled
- [ ] "Next" button is disabled until selection
- [ ] "Next" button is enabled after selection
- [ ] "Back to Vehicle Finance" link works

### Step 2: New or Used Vehicle
- [ ] Progress bar shows "Step 2 of 5"
- [ ] Bilingual subtitle: "वाहन कर्ज अर्ज - Step 2 of 5"
- [ ] Two category cards display:
  - [ ] ✨ New Vehicle (नवीन वाहन)
  - [ ] 🔄 Old / Used Vehicle (जुनी वाहन)
- [ ] Clicking a card selects it
- [ ] "Previous" button returns to Step 1
- [ ] Selected vehicle type is retained
- [ ] "Next" button disabled until selection
- [ ] "Next" button enabled after selection

### Step 3: Vehicle & Loan Details
- [ ] Progress bar shows "Step 3 of 5"
- [ ] All fields display correctly:
  - [ ] Vehicle Brand (text input)
  - [ ] Vehicle Model (text input)
  - [ ] Manufacturing Year (shows only if "Old/Used" selected)
  - [ ] Estimated Vehicle Value (number input)
  - [ ] Loan Amount Required (slider, ₹50K–₹2Cr)
  - [ ] Loan Tenure (dropdown)
  - [ ] Purpose of Finance (dropdown)
- [ ] Slider displays formatted currency (e.g., "₹6,00,000")
- [ ] "Previous" button returns to Step 2
- [ ] "Next" button works
- [ ] All entered data is retained on "Previous"

### Step 4: Personal Details & Co-applicant
- [ ] Progress bar shows "Step 4 of 5"
- [ ] Personal Details section displays all fields:
  - [ ] Full Name (Applicant)
  - [ ] Date of Birth
  - [ ] PAN Number (uppercase conversion works)
  - [ ] Aadhaar Number
  - [ ] Occupation (dropdown)
  - [ ] Monthly Income
  - [ ] Current Address (textarea)
  - [ ] City (dropdown with Maharashtra cities)
  - [ ] PIN Code
- [ ] Co-applicant Details section displays:
  - [ ] "Co-applicant Details (सहकर्जदार)" heading
  - [ ] Relation (dropdown with * required indicator)
  - [ ] Co-applicant Name (with * required indicator)
  - [ ] Co-applicant PAN (with * required indicator, uppercase)
  - [ ] Co-applicant Aadhaar (with * required indicator)
- [ ] "Previous" button returns to Step 3
- [ ] "Next" button goes directly to Step 5 (not Step 5 Mobile Verify)
- [ ] All data retained on navigation

### Step 5: Review & Submit
- [ ] Progress bar shows "Step 5 of 5" (or 100% filled)
- [ ] "Review & Submit" heading displays
- [ ] Application Summary card shows:
  - [ ] Vehicle Type (e.g., "commercial")
  - [ ] Category (e.g., "new")
  - [ ] Vehicle (e.g., "Tata ACE Gold")
  - [ ] Loan Amount (formatted currency)
  - [ ] Tenure (e.g., "60 months")
  - [ ] Applicant name
- [ ] **Documents Uploaded line is NOT shown** ✅
- [ ] Declaration checkbox present with correct text
- [ ] "Submit Vehicle Finance Application" button:
  - [ ] Disabled when checkbox unchecked
  - [ ] Enabled when checkbox checked
  - [ ] Green gradient styling
- [ ] "Previous" button returns to Step 4
- [ ] "Next" button is hidden (last step)

### Success Screen
- [ ] Clicking "Submit" shows success screen
- [ ] Success screen displays:
  - [ ] "Application Submitted Successfully! 🎉" heading
  - [ ] Marathi subtitle: "आमचे तज्ञ लवकरच तुमच्याशी संपर्क करतील"
  - [ ] English text: "Our vehicle finance expert will contact you within 2 hours"
  - [ ] Application ID in format "VF-XXXXXXXX" (8 digits)
  - [ ] Green "WhatsApp Us" button with icon
  - [ ] Outlined "Go Home" button with icon
- [ ] Application ID changes on each submission (random generation)
- [ ] Animation plays (scale, fade-in effects)

### WhatsApp Integration
- [ ] Clicking "WhatsApp Us" opens new tab/window
- [ ] WhatsApp Web/App opens (not blank page)
- [ ] URL format: `https://wa.me/917758969798?text=...`
- [ ] Message is pre-filled in WhatsApp
- [ ] Message structure is correct:
  - [ ] Header: "*SANSKRUTI ASSOCIATES*"
  - [ ] Subheader: "*New Loan Application*"
  - [ ] Divider: "━━━━━━━━━━━━━━━━━━━━"
  - [ ] Application ID: "● Application ID: *VF-XXXXXXXX*"
  - [ ] Loan Type: "● Loan Type: *Vehicle Finance*"
  - [ ] Another divider
- [ ] **● VEHICLE TYPE** section shows:
  - [ ] 1. Vehicle Type: {selected type name, not ID}
  - [ ] 2. Category: {New Vehicle or Old-Used Vehicle}
- [ ] **● VEHICLE & LOAN DETAILS** section shows:
  - [ ] 1. Vehicle Brand
  - [ ] 2. Vehicle Model
  - [ ] 3. Manufacturing Year (only if entered)
  - [ ] X. Estimated Vehicle Value (with ₹ and comma formatting)
  - [ ] X. Loan Amount Required (with ₹ and comma formatting)
  - [ ] X. Loan Tenure
  - [ ] X. Purpose of Finance
  - [ ] Field numbering continues sequentially
- [ ] **● PERSONAL DETAILS** section shows (all 9 fields):
  - [ ] 1. Name
  - [ ] 2. Date of Birth
  - [ ] 3. PAN Number
  - [ ] 4. Aadhaar Number
  - [ ] 5. Occupation
  - [ ] 6. Monthly Income (with ₹ and comma formatting)
  - [ ] 7. Address
  - [ ] 8. City
  - [ ] 9. PIN Code
- [ ] **● CO-APPLICANT DETAILS** section shows (all 4 fields):
  - [ ] 1. Relation
  - [ ] 2. Co-applicant Name
  - [ ] 3. Co-applicant PAN
  - [ ] 4. Co-applicant Aadhaar
- [ ] Final divider "━━━━━━━━━━━━━━━━━━━━"
- [ ] Closing text: "Please review and get back to me regarding my application."
- [ ] **No emojis in message body** (professional format)
- [ ] All actual form data appears (not placeholder text)

### "Go Home" Button
- [ ] Clicking "Go Home" navigates to root path "/"
- [ ] No errors in console

---

## 🔍 Data Validation Testing

### Edge Cases
- [ ] Vehicle Type: Test all 3 options (Commercial, Agricultural, Construction)
- [ ] Vehicle Category: Test both New and Old/Used
- [ ] Manufacturing Year field:
  - [ ] Hidden when "New Vehicle" selected
  - [ ] Shown when "Old/Used Vehicle" selected
- [ ] Long text inputs:
  - [ ] Vehicle Brand/Model with special characters
  - [ ] Very long address (100+ characters)
  - [ ] Full name with multiple words
- [ ] Currency formatting:
  - [ ] Minimum loan amount (₹50,000)
  - [ ] Maximum loan amount (₹2,00,00,000)
  - [ ] Mid-range amounts (₹6,75,500)
- [ ] Special characters in PAN/Aadhaar:
  - [ ] PAN uppercase conversion works
  - [ ] Numbers only accepted where required
- [ ] Co-applicant required validation:
  - [ ] Cannot proceed with empty co-applicant fields
  - [ ] All 4 co-applicant fields must be filled

### WhatsApp Message Validation
- [ ] Test with minimum data (required fields only)
- [ ] Test with maximum data (all optional fields filled)
- [ ] Test with special characters in name/address
- [ ] Test with different vehicle types (message shows correct type name)
- [ ] Test with New vs Used (message shows correct category text)
- [ ] Verify currency values use comma separators (₹12,34,567)
- [ ] Verify field numbering is sequential per section
- [ ] Verify Manufacturing Year only appears if filled

---

## 📱 Responsive Testing

### Desktop (1920x1080)
- [ ] All steps display correctly
- [ ] Two-column grid layouts work
- [ ] Buttons are properly aligned
- [ ] Progress bar spans full width

### Tablet (768x1024)
- [ ] Form cards adjust to tablet width
- [ ] Grid layouts stack appropriately
- [ ] Touch targets are adequate size
- [ ] Navigation buttons accessible

### Mobile (375x667)
- [ ] All steps are scrollable
- [ ] Single-column layout for all grids
- [ ] Vehicle type cards stack vertically
- [ ] Text inputs full width
- [ ] Buttons stack vertically
- [ ] Progress bar visible
- [ ] WhatsApp deep link works on mobile

---

## 🔐 Security & Privacy

- [ ] No sensitive data logged to console
- [ ] WhatsApp message is URL-encoded
- [ ] No hardcoded personal data in code
- [ ] PAN/Aadhaar numbers not stored permanently
- [ ] Form clears on "Go Home" navigation

---

## 🚫 Negative Testing

### Removed Features Verification
- [ ] **Step 5 "Mobile Verify" does NOT exist**
- [ ] **Step 6 "Upload Documents" does NOT exist**
- [ ] **No mobile number input field anywhere**
- [ ] **No OTP input fields anywhere**
- [ ] **No "verified" checkmark or message**
- [ ] **No file upload components**
- [ ] **No document category badges** (Applicant/Co-applicant/Vehicle)
- [ ] **No "Documents Uploaded" line in Review & Submit**
- [ ] Navigating Previous/Next never shows old Step 5 or 6
- [ ] Step indicator never shows "Step 6 of 5" or "Step 7 of 5"

### Navigation Testing
- [ ] Cannot skip steps by URL manipulation
- [ ] Cannot proceed without required selections
- [ ] Progress bar never exceeds 100%
- [ ] Back button preserves all form data

---

## 🌐 Browser Compatibility

### Chrome/Edge
- [ ] All features work
- [ ] WhatsApp opens in new tab
- [ ] Animations smooth
- [ ] No console errors

### Firefox
- [ ] All features work
- [ ] WhatsApp link works
- [ ] CSS renders correctly
- [ ] No console warnings

### Safari (Desktop)
- [ ] Forms render correctly
- [ ] Date picker works
- [ ] WhatsApp link works
- [ ] No compatibility issues

### Mobile Safari (iOS)
- [ ] Touch interactions work
- [ ] WhatsApp app opens (if installed)
- [ ] Form inputs trigger correct keyboards
- [ ] No zoom issues

### Mobile Chrome (Android)
- [ ] Touch interactions work
- [ ] WhatsApp app opens (if installed)
- [ ] Form validation works
- [ ] No layout issues

---

## ⚠️ Known Limitations

- [ ] Verify application ID format matches backend expectations (VF-XXXXXXXX)
- [ ] Confirm WhatsApp business number is correct (+91 7758969798)
- [ ] Check if co-applicant fields should remain required (current: yes)
- [ ] Verify Manufacturing Year is optional for new vehicles (current: hidden)

---

## 🔄 Regression Testing

### Other Loan Types NOT Affected
- [ ] Home Loan form still works
- [ ] Loan Against Property form still works
- [ ] Personal Loan form still works
- [ ] Business Loan form still works
- [ ] Car Loan form still works (separate from Vehicle Finance)
- [ ] CC/OD Facility form still works
- [ ] Machinery Loan form still works
- [ ] Industry Finance form still works
- [ ] Construction Loan form still works
- [ ] Education Loan form still works
- [ ] Hospital Finance form still works

### Shared Components
- [ ] Landing page loads correctly
- [ ] Vehicle Finance detail page works
- [ ] "Apply Now" button navigation works
- [ ] Other "Apply Now" buttons unaffected
- [ ] Footer/Header unchanged
- [ ] Routing for all pages works

---

## ✅ Final Acceptance Criteria

### Must Pass Before Deployment
1. [ ] All 5 steps display correctly
2. [ ] No Step 6 or Step 7 exists
3. [ ] WhatsApp message includes all required sections
4. [ ] No "Documents Uploaded" line in Review & Submit
5. [ ] Application ID format is VF-XXXXXXXX
6. [ ] Success screen displays correctly
7. [ ] "Go Home" navigates to root
8. [ ] No TypeScript/console errors
9. [ ] Mobile responsive
10. [ ] Other loan forms unaffected

### Performance
- [ ] Page loads in < 2 seconds
- [ ] Step transitions are smooth
- [ ] WhatsApp opens without delay
- [ ] No memory leaks on multiple submissions

---

## 📝 Test Results Summary

**Tester Name:** _________________  
**Test Date:** _________________  
**Browser/Device:** _________________  

**Total Tests:** 150+  
**Passed:** _____  
**Failed:** _____  
**Blocked:** _____  

**Critical Issues Found:** _________________  
**Minor Issues Found:** _________________  

**Recommendation:**  
- [ ] ✅ Approve for Production
- [ ] ⚠️ Approve with Minor Fixes
- [ ] ❌ Reject — Major Issues Found

**Notes:**
_________________________________________________
_________________________________________________
_________________________________________________

---

**QA Checklist Version:** 1.0  
**Last Updated:** July 13, 2026
