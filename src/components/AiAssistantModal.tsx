import React, { useState } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  Globe2
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../locales/translations';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: currentLang === 'ar' 
        ? 'مرحباً بك! أنا مستشارك الذكي في منصة خدمات الإنترنت العالمية. كيف يمكنني مساعدتك اليوم بخصوص الاستضافة السحابية، تحسين سرعة موقعك، معايير Google AdSense، أو الأمان السيبراني؟'
        : 'Welcome! I am your AI Technical Advisor at Global Internet Services. How can I assist you with cloud hosting, speed optimization, Google AdSense compliance, or cybersecurity today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = currentLang === 'ar' ? [
    'ما هي أفضل استضافة لتحقيق أعلى أرباح في Google AdSense؟',
    'كيف تساهم شبكة Anycast CDN في تحسين سرعة الموقع؟',
    'ما الفرق بين Cloud VPS والسيرفرات المشتركة؟',
    'كيف أحمي موقعي من هجمات DDoS المعقدة؟',
  ] : [
    'What hosting is best for Google AdSense monetization?',
    'How does Anycast CDN eliminate latency globally?',
    'What is the difference between Cloud VPS and shared hosting?',
    'How to protect my web application from DDoS attacks?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          language: currentLang,
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || 'نعتذر، حدث تأخير في الاستجابة. يرجى المحاولة مجدداً.';

      const aiMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: 'خدمات الإنترنت العالمية تضمن لك سرعات فائقة وبنية تحتية عالية الاستقرار 99.99%. يمكنك مراجعة قسم المتجر أو التواصل المباشر مع فريق الدعم الفني.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] max-h-[90vh] z-10 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="font-bold text-base flex items-center gap-2">
                <span>مستشار الذكاء الاصطناعي التقني (GIS AI)</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Gemini 3.7 Flash</span>
              </div>
              <div className="text-xs text-blue-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>متصل ومستعد للإجابة على استفساراتك</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-purple-600 text-white'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <div className={`text-[10px] mt-1.5 opacity-70 ${msg.sender === 'user' ? 'text-blue-100 text-start' : 'text-slate-400 text-end'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                <span>جاري صياغة الإجابة الهندسية بدقة...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-500 shrink-0 font-bold flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" /> اقتراحات:
          </span>
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={loading}
              className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 whitespace-nowrap transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="اكتب سؤالك التقني هنا (مثل: كيف أختار خطة الاستضافة المناسبة لموقعي؟)..."
            className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl transition-all flex items-center justify-center shrink-0 shadow-sm"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
