import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from '@google/genai';

// --- START OF SERVICES ---

/**
 * Generates a step-by-step guide for creating payment vouchers on Joud Express.
 * @returns {Promise<string>} A string containing the formatted instructions.
 */
const generateAutomationSteps = async (): Promise<string> => {
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


// --- START OF ICONS ---

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const LockIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const CopyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const LogoIcon: React.FC = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
        <path d="M14.46 12.3L16.14 10.62C16.53 10.23 16.53 9.6 16.14 9.21L14.79 7.86C14.4 7.47 13.77 7.47 13.38 7.86L11.7 9.54" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.54 11.7L7.86 13.38C7.47 13.77 7.47 14.4 7.86 14.79L9.21 16.14C9.6 16.53 10.23 16.53 10.62 16.14L12.3 14.46" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 17.5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 12H6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// --- START OF COMPONENTS ---

const Spinner: React.FC = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface CredentialsFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

const CredentialsForm: React.FC<CredentialsFormProps> = ({ email, setEmail, password, setPassword }) => (
  <form className="space-y-6">
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
        اسم المستخدم أو الإيميل
      </label>
      <div className="relative">
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
           <UserIcon />
        </div>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
        كلمة السر
      </label>
      <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <LockIcon />
          </div>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>
    </div>
  </form>
);

interface InstructionDisplayProps {
  instructions: string;
}

const InstructionDisplay: React.FC<InstructionDisplayProps> = ({ instructions }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(instructions);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const instructionSteps = instructions.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="bg-slate-900/70 border border-slate-700 rounded-lg p-6 relative">
      <button 
        onClick={handleCopy}
        className="absolute top-4 left-4 p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition text-slate-300"
        aria-label="Copy instructions"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
      <div className="space-y-4">
        {instructionSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 border border-blue-400 text-blue-300 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                </div>
                <p className="text-slate-300 pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
            </div>
        ))}
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateInstructions = useCallback(async () => {
    if (!email || !password) {
      setError('المرجو إدخال معلومات تسجيل الدخول الخاصة بك.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setInstructions('');

    try {
      const result = await generateAutomationSteps();
      setInstructions(result);
    } catch (err) {
      setError('حدث خطأ. تأكد من إعداد الخادم بشكل صحيح أو حاول مرة أخرى لاحقاً.');
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  return (
    <div className="min-h-screen text-slate-200 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-12 mt-8 sm:mt-12">
          <div className="flex justify-center items-center gap-4 mb-4">
            <LogoIcon />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
              مساعد جود إكسبريس
            </h1>
          </div>
          <p className="text-slate-400 max-w-xl mx-auto">
            هذا المساعد الذكي غادي يعطيك التعليمات خطوة بخطوة باش تنشأ "bon de paiement" لكل موزع عندك في حسابك على Joud Express.
          </p>
        </header>

        <main className="bg-slate-800/60 rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-700/80 backdrop-blur-sm space-y-8">
          <div>
            <p className="text-slate-400 mb-6 text-sm">
              دخل معلومات تسجيل الدخول لحسابك في <a href="https://admin.joud-express.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Admin.joud-express.com</a>. هاد المعلومات كتبقى عندك فالجهاز ديالك فقط ومكتسجلش.
            </p>
            <CredentialsForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerateInstructions}
              disabled={isLoading || !email || !password}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 disabled:hover:scale-100 transform transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  <span className="mr-2">جاري الإنشاء...</span>
                </>
              ) : (
                'إنشاء التعليمات الآن'
              )}
            </button>
          </div>

          <div>
            {error && (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            {instructions && !isLoading && (
                 <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-center pb-2 text-slate-100">
                        اتبع الخطوات التالية
                    </h2>
                    <InstructionDisplay instructions={instructions} />
                 </div>
            )}
          </div>
        </main>
        <footer className="text-center my-8 text-slate-500 text-sm">
            <p>تم التطوير بواسطة الذكاء الاصطناعي</p>
        </footer>
      </div>
    </div>
  );
};

// --- RENDER THE APP ---

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
