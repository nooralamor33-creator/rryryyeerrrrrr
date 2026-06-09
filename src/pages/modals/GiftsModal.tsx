import { useState } from 'react'

interface GiftsModalProps {
  onClose: () => void
  userPoints: number
}

const gifts = [
  { id: 1, emoji: '💐', name: 'باقة ورد', points: 50, color: '#FF6B6B' },
  { id: 2, emoji: '⭐', name: 'نجمة', points: 100, color: '#FF9F0A' },
  { id: 3, emoji: '👑', name: 'تاج ملكي', points: 250, color: '#5E5CE6' },
  { id: 4, emoji: '💎', name: 'ألماسة', points: 500, color: '#5AC8FA' },
  { id: 5, emoji: '🏆', name: 'كأس بطولة', points: 750, color: '#FF9F0A' },
  { id: 6, emoji: '🌈', name: 'قوس قزح', points: 300, color: '#30D158' },
  { id: 7, emoji: '🦋', name: 'فراشة', points: 150, color: '#FF6B6B' },
  { id: 8, emoji: '🚀', name: 'صاروخ', points: 400, color: '#5E5CE6' },
]

const stamps = [
  { id: 1, emoji: '🌟', name: 'النجم المشرق', desc: 'أرسل 10 هدايا', earned: true },
  { id: 2, emoji: '🔥', name: 'اللاعب النشط', desc: 'العب 30 مباراة', earned: true },
  { id: 3, emoji: '💫', name: 'الصديق المحبوب', desc: 'أضف 20 صديق', earned: false },
  { id: 4, emoji: '🎯', name: 'الدقيق', desc: 'فز 50 مباراة', earned: false },
  { id: 5, emoji: '🌙', name: 'ليلة الإنجاز', desc: 'العب 7 ليالٍ متتالية', earned: true },
  { id: 6, emoji: '🏅', name: 'المتسابق', desc: 'تصدر لوحة الترتيب', earned: false },
]

export function GiftsModal({ onClose, userPoints }: GiftsModalProps) {
  const [tab, setTab] = useState<'gifts' | 'stamps'>('gifts')
  const [sentGift, setSentGift] = useState<number | null>(null)
  const [points, setPoints] = useState(userPoints)

  function sendGift(gift: typeof gifts[0]) {
    if (points < gift.points) return
    setPoints(p => p - gift.points)
    setSentGift(gift.id)
    setTimeout(() => setSentGift(null), 1500)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet" style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div className="modal-handle" />
        <div className="px-5 pt-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button onClick={onClose} className="text-sm font-medium" style={{ color: '#5E5CE6' }}>إغلاق</button>
            <h2 className="font-bold text-gray-900">الهدايا والطوابع</h2>
            <div className="points-pill">
              <span>⭐</span>
              <span>{points.toLocaleString('ar')}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
            {(['gifts', 'stamps'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  background: tab === t ? '#fff' : 'transparent',
                  color: tab === t ? '#1C1C1E' : '#AEAEB2',
                  boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                }}>
                {t === 'gifts' ? '🎁 الهدايا' : '🏅 الطوابع'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ minHeight: 0 }}>
          {tab === 'gifts' ? (
            <>
              <p className="text-xs text-gray-400 text-right mb-3">أرسل هدايا لأصدقائك واكسب نقاط إضافية</p>
              <div className="grid grid-cols-4 gap-2">
                {gifts.map(gift => {
                  const canAfford = points >= gift.points
                  const justSent = sentGift === gift.id
                  return (
                    <button key={gift.id} onClick={() => sendGift(gift)}
                      disabled={!canAfford}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all active:scale-90"
                      style={{
                        background: justSent ? `rgba(${gift.color},0.1)` : 'rgba(120,120,128,0.06)',
                        opacity: canAfford ? 1 : 0.4,
                        border: justSent ? `2px solid ${gift.color}` : '2px solid transparent',
                      }}>
                      <span className="text-3xl">{justSent ? '✅' : gift.emoji}</span>
                      <span className="text-xs text-gray-600 font-medium leading-tight text-center">{gift.name}</span>
                      <span className="text-xs font-bold" style={{ color: gift.color }}>⭐ {gift.points}</span>
                    </button>
                  )
                })}
              </div>
              <div className="mt-4 p-3.5 rounded-xl text-right" style={{ background: 'rgba(255,159,10,0.08)' }}>
                <p className="text-xs text-gray-500">💡 <strong>كيف تكسب النقاط؟</strong></p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">العب الألعاب يومياً، احضر في الغرف الصوتية، أرسل هدايا، وشارك في المنشورات!</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 text-right mb-3">اجمع الطوابع وأظهرها في ملفك الشخصي</p>
              <div className="space-y-2.5">
                {stamps.map(stamp => (
                  <div key={stamp.id}
                    className="flex items-center gap-3 p-3.5 rounded-2xl"
                    style={{ background: stamp.earned ? 'rgba(48,209,88,0.06)' : 'rgba(120,120,128,0.05)' }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                      style={{
                        background: stamp.earned ? 'rgba(48,209,88,0.12)' : 'rgba(120,120,128,0.08)',
                        filter: stamp.earned ? 'none' : 'grayscale(1)',
                      }}>
                      {stamp.emoji}
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-sm font-semibold text-gray-900">{stamp.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{stamp.desc}</p>
                    </div>
                    {stamp.earned ? (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#30D158' }}>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(120,120,128,0.1)' }}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ height: 'max(env(safe-area-inset-bottom), 8px)' }} />
      </div>
    </div>
  )
}
