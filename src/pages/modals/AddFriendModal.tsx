import { useState } from 'react'

interface AddFriendModalProps {
  onClose: () => void
}

export function AddFriendModal({ onClose }: AddFriendModalProps) {
  const [friendId, setFriendId] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleAdd() {
    if (friendId.length !== 8 || !/^\d{8}$/.test(friendId)) {
      setStatus('error')
      setMessage('المعرف يجب أن يكون 8 أرقام بالضبط')
      return
    }
    setStatus('loading')
    await new Promise(r => setTimeout(r, 1000))
    setStatus('success')
    setMessage(`تم إرسال طلب الصداقة للمستخدم #${friendId} بنجاح!`)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-sheet">
        <div className="modal-handle" />
        <div className="px-5 py-5">
          <div className="flex items-center justify-between mb-6">
            <button onClick={onClose} className="text-sm font-medium" style={{ color: '#5E5CE6' }}>إلغاء</button>
            <h2 className="font-bold text-gray-900">إضافة صديق</h2>
            <div className="w-12" />
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-3"
              style={{ background: 'rgba(94,92,230,0.10)' }}>
              👥
            </div>
            <p className="text-sm text-gray-500 text-center">أدخل المعرف المكون من 8 أرقام لإرسال طلب صداقة</p>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">معرف المستخدم (8 أرقام)</label>
            <div className="relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">#</span>
              <input
                className="ios-input pr-8 text-center font-mono text-lg tracking-[6px]"
                placeholder="00000000"
                maxLength={8}
                value={friendId}
                onChange={e => { setFriendId(e.target.value.replace(/\D/g, '')); setStatus('idle'); setMessage('') }}
                dir="ltr"
              />
            </div>
            <p className="text-xs text-gray-400 text-right mt-1.5">{friendId.length}/8 أرقام</p>
          </div>

          {status === 'error' && (
            <div className="px-3 py-2.5 rounded-xl bg-red-50 border border-red-100 mb-4">
              <p className="text-xs text-red-600 text-right">{message}</p>
            </div>
          )}
          {status === 'success' && (
            <div className="px-3 py-2.5 rounded-xl bg-green-50 border border-green-100 mb-4">
              <p className="text-xs text-green-600 text-right">{message}</p>
            </div>
          )}

          <button
            onClick={handleAdd}
            disabled={status === 'loading' || friendId.length !== 8}
            className="ios-btn ios-btn-primary w-full"
            style={{ borderRadius: '14px' }}>
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الإرسال...
              </span>
            ) : '📨 إرسال طلب الصداقة'}
          </button>
        </div>
        <div style={{ height: 'max(env(safe-area-inset-bottom), 16px)' }} />
      </div>
    </div>
  )
}
