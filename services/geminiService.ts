/**
 * Generates a step-by-step guide for creating payment vouchers on Joud Express.
 * @returns {Promise<string>} A string containing the formatted instructions.
 */
export const generateAutomationSteps = async (): Promise<string> => {
  // The API key is now handled by the environment variable `process.env.API_KEY`
  // which is assumed to be configured in the execution environment.

  // Dynamically import the GoogleGenAI class only when the function is called.
  // This prevents the entire app from failing to load if the module has issues.
  const { GoogleGenAI } = await import('@google/genai');
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are an expert assistant. Your task is to generate a step-by-step guide in Moroccan Darija (المغربية الدارجة) for a user who wants to create payment vouchers ('bon de paiement pour livreur') for their delivery personnel on the website 'admin.joud-express.com'.

    The output MUST be exclusively in Moroccan Darija.

    The guide must be clear, simple, and easy for a non-technical person to follow. Use a numbered list format.

    Here are the required steps to include:
    1. Instruct the user to open their web browser and go to 'https://admin.joud-express.com'.
    2. Tell them to enter their login credentials (username/email and password) in the respective fields and click the login button.
    3. Describe how to navigate the dashboard after logging in to find the section for payments or for delivery personnel ('livreurs'). The exact menu names might be 'Paiement', 'Livreurs', 'Comptabilité', or something similar in French. Advise the user to look for these keywords.
    4. Explain the process of selecting a delivery person and generating a 'bon de paiement'. This might involve checkboxes or a dedicated button.
    5. Mention that they should repeat this process for each delivery person ('livreur') they need to pay.
    6. Advise them to download or print the generated voucher for their records.

    Format the final output as a clean, numbered list. Do not include any introductory or concluding text like "Here are the steps..." or "I hope this helps". Start directly with step 1. Make the language friendly and encouraging.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    const text = response.text;
    if (!text) {
        throw new Error("Received an empty response from the AI.");
    }
    return text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("The configured Gemini API key is invalid.");
    }
    throw new Error("Failed to generate instructions from Gemini API.");
  }
};
