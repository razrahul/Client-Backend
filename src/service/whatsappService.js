import twilio from 'twilio';
import { config } from 'dotenv';
config({
    path: "../../.env",
  });


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client =  twilio(accountSid, authToken);

/**
 * Send WhatsApp Message using Twilio API
 * @param {string} mobile - Recipient's WhatsApp number (e.g., "+919XXXXXXXXX")
 * @param {string} message - Message to send
 * @returns {Promise<object>} - Twilio API response
 */
const sendWhatsAppMessage = async (mobile, message) => {
    try {
        if (!mobile || !message) {
            throw new Error('Mobile number and message are required.');
        }

        const response = await client.messages.create({
            body: message,
            from: `whatsapp:${whatsappNumber}`,
            to: `whatsapp:+91${mobile}`
        });

        return response; // Return the API response
    } catch (error) {
        console.error('Error sending WhatsApp message:', error.message);
        throw error;
    }
};

// module.exports = sendWhatsAppMessage;

export default sendWhatsAppMessage;
