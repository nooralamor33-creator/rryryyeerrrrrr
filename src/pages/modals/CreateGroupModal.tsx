import { useState } from 'react'

interface CreateGroupModalProps {
  onClose: () => void
}

const emojis = ['💬', '🎮', '🎵', '📚', '💼', '🏀', '🌍', '🎨', '🍕', '🐾']

export function CreateGroupModal({ onClose }: CreateGroupModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('💬')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  async function handleCreate() {
    if (!name.trim()) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 800))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="px-5 py-8 flex flex-col items-center text-center">
            <div className="text-5xl mb-3">{selectedEmoji}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تم إنشاء المجموعة!</h3>
            <p className="text-sm text-gray-500 mb-6">مجموعة "{name}" جاهزة الآن</p>
            <button onClick={onClose} className="ios-btn ios-btn-primary px-10" style={{ borderRadius: '14px' }}>
              رائع! 🎉
            </button>
          </div>
          <div style={{ height: 'max(env(safe-area-inset-bottom), 16px)' }} />
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-5">
            <button onClick={onClose} className="text-sm font-medium" style={{ color: '#5E5CE6' }}>إلغاء</button>
            <h2 className="font-bold text-gray-900">إنشاء مجموعة</h2>
            <div className="w-12" />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">أيقونة المجموعة</label>
            <div className="flex gap-2 flex-wrap justify-center">
              {emojis.map(e => (
                <button key={e} onClick={() => setSelectedEmoji(e)}
                  className="w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all"
                  style={{
                    background: selectedEmoji === e ? 'rgba(94,92,230,0.15)' : 'rgba(120,120,128,0.08)',
                    border: selectedEmoji === e ? '2px solid #5E5CE6' : '2px solid transparent',
                    transform: selectedEmoji === e ? 'scale(1.1)' : 'scale(1)',
                  }}>
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">اسم المجموعة *</label>
            <input className="ios-input" placeholder="مثال: أصدقاء الجامعة" value={name}
              onChange={e => setName(e.target.value)} maxLength={30} />
            <p className="text-xs text-gray-400 text-left mt-1">{name.length}/30</p>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">وصف المجموعة (اختياري)</label>
            <textarea className="ios-input resize-none" placeholder="وصف قصير للمجموعة..." value={description}
              onChange={e => setDescription(e.target.value)} rows={2} maxLength={100} />
          </div>

          <button onClick={handleCreate} disabled={!name.trim() || status === 'loading'}
            className="ios-btn ios-btn-primary w-full" style={{ borderRadius: '14px' }}>
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الإنشاء...
              </span>
            ) : '💬 إنشاء المجموعة'}
          </button>
        </div>
        <div style={{ height: 'max(env(safe-area-inset-bottom), 16px)' }} />
      </div>
    </div>
  )
}
