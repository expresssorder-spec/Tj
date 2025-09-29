import React, { useState, useCallback } from 'react';
import { CredentialsForm } from './components/CredentialsForm.tsx';
import { InstructionDisplay } from './components/InstructionDisplay.tsx';
import { Spinner } from './components/Spinner.tsx';
import { generateAutomationSteps } from './services/geminiService.ts';
import { LogoIcon } from './components/Icons.tsx';

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
      console.error("Caught error in App component:", err);
      let errorMessage = 'حدث خطأ. تأكد من إعداد الخادم بشكل صحيح أو حاول مرة أخرى لاحقاً.';
      
      // Provide a more specific error message for the common API key issue.
      if (err instanceof Error && err.message && err.message.toLowerCase().includes('api key not valid')) {
          errorMessage = 'فشل الاتصال بالخادم: مفتاح API غير صالح. يرجى التأكد من أن مفتاح Gemini API تم إعداده بشكل صحيح في بيئة التشغيل.';
      }
      
      setError(errorMessage);
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

export default App;