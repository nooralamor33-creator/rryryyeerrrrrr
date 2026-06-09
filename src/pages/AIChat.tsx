import { useState, useRef, useEffect } from 'react'
import type { User } from '../types/auth'

interface AIChatProps {
  user: User
  onClose: () => void
}

interface Message {
  id: string
  role: 'user' | 'ai'
  text: string
  time: string
}

const GREETINGS: Record<string, string[]> = {
  default: [
    'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟',
    'يمكنني مساعدتك في: البحث عن أصدقاء، معلومات الألعاب، الأسئلة العامة، وأي شيء آخر تحتاجه!',
  ]
}

const AUTO_REPLIES: [RegExp, string[]][] = [
  [/لودو|ludo/i, ['لعبة اللودو متاحة في قسم الألعاب! يمكنك اللعب مع أصدقائك. 🎲', 'اذهب إلى تبويب "الألعاب" واضغط على لعبة اللودو للبدء.']],
  [/سلم|ثعبان|snake/i, ['لعبة السلم والثعبان ممتعة جداً! 🐍 ستجدها في قسم الألعاب.']],
  [/نقاط|نقطة|point/i, ['يمكنك الحصول على النقاط من خلال: اللعب اليومي، إرسال الهدايا، والمشاركة في الغرف الصوتية! 🌟']],
  [/هدي|هدية|gift/i, ['الهدايا متاحة في الملف الشخصي. يمكنك إرسال هدايا لأصدقائك وكسب طوابع مميزة! 🎁']],
  [/صديق|friend/i, ['لإضافة صديق، اضغط على زر "إضافة صديق" في صفحتك الشخصية وأدخل معرفه المكون من 8 أرقام. 👥']],
  [/مجموعة|group/i, ['يمكنك إنشاء مجموعة من خلال زر "إنشاء مجموعة" في صفحتك الرئيسية! 👥']],
  [/قناة|channel/i, ['يمكنك إنشاء قناة خاصة بك من خلال زر "إنشاء قناة" في الصفحة الرئيسية! 📢']],
  [/مرحب|هلا|أهلا|hello|hi/i, ['أهلاً وسهلاً بك! كيف يمكنني مساعدتك؟ 😊']],
  [/شكر/i, ['العفو! يسعدني مساعدتك دائماً. 😊']],
  [/مساعد|help/i, ['بالطبع! أنا هنا لمساعدتك. اسألني عن أي شيء تحتاجه. 🤝']],
]

function getAIReply(text: string): string {
  for (const [pattern, replies] of AUTO_REPLIES) {
    if (pattern.test(text)) {
      return replies[Math.floor(Math.random() * replies.length)]
    }
  }
  const defaults = [
    'فكرة رائعة! سأحاول مساعدتك في ذلك. 💡',
    'سؤال جيد! دعني أفكر في أفضل إجابة لك. 🤔',
    'يسعدني مساعدتك! هل يمكنك إعطائي مزيداً من التفاصيل؟ 📝',
    'بالطبع! هذا شيء يمكنني المساعدة فيه. 👍',
  ]
  return defaults[Math.floor(Math.random() * defaults.length)]
}

export function AIChat({ user, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: `أهلاً ${user.fullName || user.username}! 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟`, time: now() },
    { id: '2', role: 'ai', text: 'يمكنني مساعدتك في: إيجاد الأصدقاء، معلومات الألعاب، الهدايا والنقاط، وأي سؤال آخر!', time: now() },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  function now() {
    return new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text, time: now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply = getAIReply(text)
      setTyping(false)
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'ai', text: reply, time: now() }])
    }, 800 + Math.random() * 700)
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet" style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-handle" />

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #5E5CE6, #5856D6)' }}>
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">المساعد الذكي</p>
            <p className="text-xs text-green-500 font-medium">متصل دائماً</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-auto"
                  style={{ background: 'linear-gradient(135deg, #5E5CE6, #5856D6)' }}>
                  <span className="text-white text-xs">✦</span>
                </div>
              )}
              <div>
                <div className={msg.role === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}>
                  {msg.text}
                </div>
                <p className={`text-[10px] text-gray-400 mt-1 ${msg.role === 'user' ? 'text-left' : 'text-right'}`}>{msg.time}</p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2 items-end">
              <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #5E5CE6, #5856D6)' }}>
                <span className="text-white text-xs">✦</span>
              </div>
              <div className="chat-bubble-ai flex gap-1 items-center py-3">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-100 flex gap-2">
          <input
            className="ios-input flex-1 text-sm"
            placeholder="اكتب رسالتك..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            autoComplete="off"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #5E5CE6, #5856D6)' }}
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        <div style={{ height: 'env(safe-area-inset-bottom, 8px)' }} />
      </div>
    </div>
  )
}
