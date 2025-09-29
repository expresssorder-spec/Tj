import React, { useState, useCallback } from 'react';
import { CredentialsForm } from './components/CredentialsForm.jsx';
import { InstructionDisplay } from './components/InstructionDisplay.jsx';
import { Spinner } from './components/Spinner.jsx';
import { generateAutomationSteps } from './services/geminiService.js';
import { LogoIcon, KeyIcon } from './components/Icons.jsx';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      errors.email = 'المرجو إدخال البريد الإلكتروني.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'المرجو إدخال بريد إلكتروني صحيح.';
      isValid = false;
    }

    if (!password) {
      errors.password = 'المرجو إدخال كلمة السر.';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleGenerateInstructions = useCallback(async () => {
    if (!apiKey) {
      setError('المرجو إدخال مفتاح API الخاص بـ Gemini أولاً.');
      return;
    }
    
    // Clear previous general errors and instructions
    setError(null);
    setInstructions('');

    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await generateAutomationSteps(apiKey);
      setInstructions(result);
    } catch (err) {
      setError('حدث خطأ. تأكد من صلاحية مفتاح API أو حاول مرة أخرى لاحقاً.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey, email, password]);
  
  const handleEmailChange = (value) => {
      setEmail(value);
      if (formErrors.email) {
          setFormErrors(prev => ({ ...prev, email: '' }));
      }
  };
  
  const handlePasswordChange = (value) => {
      setPassword(value);
      if (formErrors.password) {
          setFormErrors(prev => ({ ...prev, password: '' }));
      }
  };

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
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300 mb-2">
                مفتاح Gemini API
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <KeyIcon />
                </div>
                <input
                    type="password"
                    id="apiKey"
                    name="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="أدخل مفتاح API الخاص بك هنا"
                    className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 rounded-lg py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    aria-label="Gemini API Key"
                />
            </div>
            <p className="text-slate-500 mt-2 text-xs">
                يمكنك الحصول على مفتاحك من <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>. المفتاح لا يتم تخزينه أو مشاركته.
            </p>
          </div>
          
          <hr className="border-slate-700/50" />

          <div>
            <p className="text-slate-400 mb-6 text-sm">
              دخل معلومات تسجيل الدخول لحسابك في <a href="https://admin.joud-express.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Admin.joud-express.com</a>. هاد المعلومات كتبقى عندك فالجهاز ديالك فقط ومكتسجلش.
            </p>
            <CredentialsForm
              email={email}
              setEmail={handleEmailChange}
              password={password}
              setPassword={handlePasswordChange}
              errors={formErrors}
            />
          </div>

          <div className="text-center">
            <button
              onClick={handleGenerateInstructions}
              disabled={isLoading || !apiKey || !email || !password}
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

export default App;