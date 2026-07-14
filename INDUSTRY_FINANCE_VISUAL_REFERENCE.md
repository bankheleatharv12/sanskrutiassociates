# Industry Finance Flow - Visual Reference Guide

## Wizard Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    INDUSTRY FINANCE WIZARD                   │
│                         (4 STEPS)                            │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   STEP 1     │ => │   STEP 2     │ => │   STEP 3     │ => │   STEP 4     │
│ Industry     │    │  Business    │    │    Loan      │    │  Review &    │
│   Type       │    │   Details    │    │   Details    │    │   Submit     │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
       │                    │                    │                    │
       ▼                    ▼                    ▼                    ▼
  • Industry           • Owner Info         • Finance Type      • 8 Summary
  • Business Struct    • Address           • Loan Amount         Cards
  • Finance Type       • Business Info     • Tenure            • Declaration
                      (13 fields)          • Income              Checkbox
                                          • EMI (optional)     • Submit Button
                                          • Collateral
                                          • Purpose

                                                                      │
                                                                      ▼
                                                              ┌──────────────┐
                                                              │   SUCCESS    │
                                                              │    SCREEN    │
                                                              └──────────────┘
                                                                      │
                                                                      ▼
                                                              [Chat with Expert]
                                                                      │
                                                                      ▼
                                                              ┌──────────────┐
                                                              │  WhatsApp    │
                                                              │   Message    │
                                                              └──────────────┘
```

## Step Indicator (Progress Bar)

```
Before (6 steps):
┌───┐    ┌───┐    ┌───┐    ┌───┐    ┌───┐    ┌───┐
│ 1 │ -> │ 2 │ -> │ 3 │ -> │ 4 │ -> │ 5 │ -> │ 6 │
└───┘    └───┘    └───┘    └───┘    └───┘    └───┘
Industry Business  Loan    Mobile  Documents Review


After (4 steps):
┌───┐    ┌───┐    ┌───┐    ┌───┐
│ 1 │ -> │ 2 │ -> │ 3 │ -> │ 4 │
└───┘    └───┘    └───┘    └───┘
Industry Business  Loan     Review
  Type   Details  Details   Submit
```

## Visual States

### Completed Step
```
┌─────┐
│  ✓  │  <- Green circle with checkmark
└─────┘
```

### Active Step
```
┌─────┐
│  3  │  <- Blue circle with number + pulse animation
└─────┘
```

### Pending Step
```
┌─────┐
│  4  │  <- Gray circle with number
└─────┘
```

## Step 1: Industry Type

```
┌────────────────────────────────────────────────────────┐
│                   SELECT YOUR INDUSTRY                  │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │    🏭     │  │    🛍️     │  │    💼     │            │
│  │Manufacturing│  │ Trading / │  │  Service  │            │
│  │            │  │ Wholesale │  │ Industry  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │    🏗️     │  │    🌾     │  │    ✂️     │            │
│  │Construction│  │Agriculture│  │  Textile/ │            │
│  │            │  │   /Agro   │  │  Garment  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │    🍽️     │  │    ❤️     │  │    🚛     │            │
│  │   Food    │  │Healthcare/│  │Transport/ │            │
│  │ Processing │  │  Medical  │  │ Logistics │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
├────────────────────────────────────────────────────────┤
│              SELECT BUSINESS STRUCTURE                  │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │    👤     │  │    👥     │  │    🏢     │            │
│  │Proprietor-│  │Partnership│  │  Private  │            │
│  │    ship   │  │   / LLP   │  │  Limited  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                         │
│  ┌──────────┐  ┌──────────┐                           │
│  │    🏭     │  │    ❤️     │                           │
│  │ MSME /SME │  │   Trust/  │                           │
│  │           │  │  Society  │                           │
│  └──────────┘  └──────────┘                           │
│                                                         │
├────────────────────────────────────────────────────────┤
│              FINANCE TYPE NEEDED                        │
├────────────────────────────────────────────────────────┤
│                                                         │
│  [ Term Loan ]  [ Working Capital ]  [ CC/OD Limit ]   │
│  [ Project Finance ]  [ MSME Loan ]  [ Govt Scheme ]   │
│                                                         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌────────────────────────────────────────────────┐   │
│  │ Manufacturing — Private Limited — Working Cap   │   │
│  └────────────────────────────────────────────────┘   │
│                                                         │
│                               [ Next ]                  │
└────────────────────────────────────────────────────────┘
```

## Step 2: Business Details

```
┌────────────────────────────────────────────────────────┐
│               BUSINESS DETAILS                          │
├────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐   │
│  │ Manufacturing — Private Limited — Working Cap   │   │
│  └────────────────────────────────────────────────┘   │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Owner / Director Full Name *                          │
│  ┌──────────────────────────────────────────────┐     │
│  │ Rajesh Kumar                              ✓  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  Date of Birth *                                       │
│  ┌──────────────────────────────────────────────┐     │
│  │ 1985-05-15                                ✓  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  PAN Card Number *                                     │
│  ┌──────────────────────────────────────────────┐     │
│  │ ABCDE1234F                                ✓  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  ... (13 fields total)                                 │
│                                                         │
│  [ Previous ]                            [ Next ]      │
└────────────────────────────────────────────────────────┘
```

## Step 3: Loan Details

```
┌────────────────────────────────────────────────────────┐
│                  LOAN DETAILS                           │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Finance Type                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │ Working Capital                               │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  Loan Amount (₹)                                       │
│  ━━━━━━━━━━━━━━━━●────────────────                    │
│  ₹50,00,000                                            │
│                                                         │
│  Loan Tenure (Months)                                  │
│  ┌──────────────────────────────────────────────┐     │
│  │ 60 months                                ▼   │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  Monthly Business Income (₹) *                         │
│  ┌──────────────────────────────────────────────┐     │
│  │ 800000                                    ✓  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  Existing EMI / Obligations (₹)                        │
│  ┌──────────────────────────────────────────────┐     │
│  │ 150000                                    ✓  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  Collateral Available                                  │
│  ┌──────────────────────────────────────────────┐     │
│  │ Yes                                       ▼  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  Loan Purpose                                          │
│  ┌──────────────────────────────────────────────┐     │
│  │ Business Expansion                        ▼  │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  [ Previous ]                            [ Next ]      │
└────────────────────────────────────────────────────────┘
```

## Step 4: Review & Submit

```
┌────────────────────────────────────────────────────────┐
│               REVIEW & SUBMIT                           │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ Loan Type       │  │ Industry        │            │
│  │ Industry Finance│  │ Manufacturing   │            │
│  └─────────────────┘  └─────────────────┘            │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ Business Struct │  │ Finance Type    │            │
│  │ Private Limited │  │ Working Capital │            │
│  └─────────────────┘  └─────────────────┘            │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ Business Name   │  │ Owner Name      │            │
│  │ Kumar Industries│  │ Rajesh Kumar    │            │
│  └─────────────────┘  └─────────────────┘            │
│                                                         │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ Loan Amount     │  │ Tenure          │            │
│  │ ₹50,00,000      │  │ 60 months       │            │
│  └─────────────────┘  └─────────────────┘            │
│                                                         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────┐     │
│  │ ☑ I agree to the Terms & Conditions and      │     │
│  │   authorize Sanskruti Associates to fetch    │     │
│  │   my credit information and contact me.      │     │
│  └──────────────────────────────────────────────┘     │
│                                                         │
│  [ Previous ]  [ Submit Industry Finance Application ] │
└────────────────────────────────────────────────────────┘
```

## Success Screen

```
┌────────────────────────────────────────────────────────┐
│                                                         │
│                      ┌───────┐                         │
│                      │   ✓   │  <- Animated checkmark  │
│                      └───────┘                         │
│                                                         │
│        Application Submitted Successfully! 🎉          │
│                                                         │
│                   Application ID                        │
│                 SA-IF-12345678                         │
│                                                         │
│    Our industry finance expert will contact you        │
│    within 24 hours with the best lender options        │
│    tailored to your industry and profile.              │
│                                                         │
│            [ 💬 Chat with Our Expert ]                 │
│                                                         │
└────────────────────────────────────────────────────────┘
```

## WhatsApp Message Structure

```
*SANSKRUTI ASSOCIATES*
*New Loan Application*
━━━━━━━━━━━━━━━━━━━━

● Application ID: *SA-IF-12345678*
● Loan Type: *Industry Finance*

━━━━━━━━━━━━━━━━━━━━

*● INDUSTRY TYPE*
1. Industry: Manufacturing

*● BUSINESS DETAILS*
1. Business Structure: Private Limited
2. Finance Type: Working Capital
3. Owner/Director Name: Rajesh Kumar
4. Date of Birth: 1985-05-15
5. PAN Card Number: ABCDE1234F
6. Aadhaar Number: 1234 5678 9012
7. Current Address: 123 MG Road
8. PIN Code: 411001
9. Business Name: Kumar Industries Pvt Ltd
10. Business PAN: AABCK1234M
11. GSTIN Number: 27AABCK1234M1Z5
12. Business Address: Plot 45, MIDC Area
13. Business Vintage: 5 years
14. Annual Turnover: ₹2,50,00,000

*● LOAN DETAILS*
1. Loan Amount: ₹50,00,000
2. Loan Tenure: 60 months
3. Monthly Business Income: ₹8,00,000
4. Existing EMI/Obligations: ₹1,50,000
5. Collateral Available: Yes
6. Loan Purpose: Business Expansion

━━━━━━━━━━━━━━━━━━━━

Please review and get back to me regarding my application.
```

## Removed Steps (No Longer Present)

### ❌ Step 4: Mobile Verify (REMOVED)
```
┌────────────────────────────────────────────────────────┐
│           VERIFY YOUR MOBILE NUMBER                     │
├────────────────────────────────────────────────────────┤
│  [This step has been completely removed]               │
│  - No mobile number field                              │
│  - No OTP functionality                                │
│  - No verification state                               │
└────────────────────────────────────────────────────────┘
```

### ❌ Step 5: Upload Documents (REMOVED)
```
┌────────────────────────────────────────────────────────┐
│              UPLOAD DOCUMENTS                           │
├────────────────────────────────────────────────────────┤
│  [This step has been completely removed]               │
│  - No document upload boxes                            │
│  - No file selection functionality                     │
│  - No upload tracking                                  │
└────────────────────────────────────────────────────────┘
```

## Color Scheme

- **Blue (#2563EB)**: Primary actions, active states, brand elements
- **Green (#16A34A)**: Success states, checkmarks, WhatsApp CTA
- **Gray (#1F2937)**: Text, labels, borders
- **Light Blue (#EFF6FF)**: Backgrounds, subtle highlights

## Animation Notes

- **Step transitions**: Slide-in from right (0.3s)
- **Success checkmark**: Circle draws (0.8s) → Check draws (0.55s)
- **Confetti**: Falls from top (1.5s loop)
- **Active step**: Pulse animation on blue circle
- **Hover effects**: Scale and brightness changes (0.3s)

## Responsive Behavior

- **Mobile**: Single column layout, stacked cards
- **Tablet**: 2-column grid for cards
- **Desktop**: Full 3-column grid for option cards

---

**Legend:**
- ✓ = Completed/Verified
- ❌ = Removed/Not present
- → = Navigation flow
- ● = Bullet point
- [ ] = Button
- ┌─┐ = Card/Container
