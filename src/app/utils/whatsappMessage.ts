import { WHATSAPP_BUSINESS_NUMBER } from '../constants/whatsapp';

/**
 * Formats currency value with Indian numbering system
 */
export const formatCurrency = (value: string | number): string => {
  if (!value) return '';
  return Number(value).toLocaleString('en-IN');
};

/**
 * Builds WhatsApp message URL with pre-filled application details
 * @param loanType - Type of loan (e.g., "Home Loan", "Personal Loan")
 * @param applicationId - Generated application ID
 * @param employmentType - Employment type selected by user
 * @param personalDetails - Object containing personal information
 * @param loanDetails - Object containing loan-specific details
 * @returns Complete WhatsApp URL with encoded message
 */
export const buildWhatsAppMessageUrl = (
  loanType: string,
  applicationId: string,
  employmentType: string,
  personalDetails: Record<string, any>,
  loanDetails: Record<string, any>
): string => {
  let message = `🏦 *SANSKRUTI ASSOCIATES*\n📋 *New Loan Application*\n\n━━━━━━━━━━━━━━━━━━━━\n\n🆔 Application ID: *${applicationId}*\n💰 Loan Type: *${loanType}*\n\n━━━━━━━━━━━━━━━━━━━━\n\n👔 *EMPLOYMENT TYPE*\n${employmentType}\n\n👤 *PERSONAL DETAILS*`;

  // Add personal details
  if (personalDetails.fullName) message += `\nName: ${personalDetails.fullName}`;
  if (personalDetails.dateOfBirth) message += `\nDate of Birth: ${personalDetails.dateOfBirth}`;
  if (personalDetails.panNumber) message += `\nPAN Number: ${personalDetails.panNumber}`;
  if (personalDetails.aadhaarNumber) message += `\nAadhaar Number: ${personalDetails.aadhaarNumber}`;
  if (personalDetails.currentAddress) message += `\nAddress: ${personalDetails.currentAddress}`;
  if (personalDetails.city) message += `\nCity: ${personalDetails.city}`;
  if (personalDetails.pinCode) message += `\nPIN Code: ${personalDetails.pinCode}`;

  // Add co-applicant details only if filled
  if (personalDetails.coApplicantName) message += `\nCo-applicant Name: ${personalDetails.coApplicantName}`;
  if (personalDetails.coApplicantPan) message += `\nCo-applicant PAN: ${personalDetails.coApplicantPan}`;
  if (personalDetails.coApplicantAadhaar) message += `\nCo-applicant Aadhaar: ${personalDetails.coApplicantAadhaar}`;

  message += `\n\n💼 *LOAN DETAILS*`;

  // Add all loan details dynamically
  Object.entries(loanDetails).forEach(([key, value]) => {
    if (value) {
      // Format the key to be more readable (convert camelCase to Title Case)
      const formattedKey = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase())
        .trim();

      // Format currency fields
      if (
        key.toLowerCase().includes('amount') ||
        key.toLowerCase().includes('income') ||
        key.toLowerCase().includes('emi') ||
        key.toLowerCase().includes('salary')
      ) {
        message += `\n${formattedKey}: ₹${formatCurrency(value)}`;
      } else {
        message += `\n${formattedKey}: ${value}`;
      }
    }
  });

  message += `\n\n━━━━━━━━━━━━━━━━━━━━\n\n✅ Please review and get back to me regarding my application.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with pre-filled message
 */
export const openWhatsApp = (url: string): void => {
  window.open(url, '_blank');
};
