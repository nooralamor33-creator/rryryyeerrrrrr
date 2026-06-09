import { useState } from 'react'

interface CreateChannelModalProps {
  onClose: () => void
}

const categories = ['ترفيه', 'تقنية', 'رياضة', 'فن', 'تعليم', 'موسيقى', 'ألعاب', 'أخرى']

export function CreateChannelModal({ onClose }: CreateChannelModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('ترفيه')
  const [isPublic, setIsPublic] = useState(true)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  async function handleCreate() {
    if (!name.trim()) return
    setStatus('loading')
    await new Promise(r => setTimeout(r, 900))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-sheet">
          <div className="modal-handle" />
          <div className="px-5 py-8 flex flex-col items-center text-center">
            <div className="text-5xl mb-3">📢</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">تم إنشاء القناة!</h3>
            <p className="text-sm text-gray-500 mb-6">قناة "{name}" أصبحت متاحة الآن</p>
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
            <h2 className="font-bold text-gray-900">إنشاء قناة</h2>
            <div className="w-12" />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">اسم القناة *</label>
            <div className="relative">
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📢</span>
              <input className="ios-input pr-9" placeholder="اسم قناتك..." value={name}
                onChange={e => setName(e.target.value)} maxLength={40} />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">وصف القناة</label>
            <textarea className="ios-input resize-none" placeholder="أخبر الناس عن قناتك..." value={description}
              onChange={e => setDescription(e.target.value)} rows={2} maxLength={150} />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 mb-2 text-right">التصنيف</label>
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className="text-xs px-3 py-1.5 rounded-xl font-medium transition-all"
                  style={{
                    background: category === cat ? 'rgba(94,92,230,0.15)' : 'rgba(120,120,128,0.08)',
                    color: category === cat ? '#5E5CE6' : '#6C6C70',
                    border: category === cat ? '1.5px solid #5E5CE6' : '1.5px solid transparent',
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between p-3.5 rounded-xl"
            style={{ background: 'rgba(120,120,128,0.06)' }}>
            <div>
              <p className="text-sm font-medium text-gray-800">{isPublic ? '🌍 عامة' : '🔒 خاصة'}</p>
              <p className="text-xs text-gray-400 mt-0.5">{isPublic ? 'يمكن للجميع الانضمام' : 'بدعوة فقط'}</p>
            </div>
            <button onClick={() => setIsPublic(!isPublic)}
              className="w-12 h-6 rounded-full transition-all relative flex-shrink-0"
              style={{ background: isPublic ? '#30D158' : '#AEAEB2' }}>
              <div className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all"
                style={{ right: isPublic ? '2px' : 'calc(100% - 22px)' }} />
            </button>
          </div>

          <button onClick={handleCreate} disabled={!name.trim() || status === 'loading'}
            className="ios-btn ios-btn-primary w-full" style={{ borderRadius: '14px' }}>
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الإنشاء...
              </span>
            ) : '📢 إنشاء القناة'}
          </button>
        </div>
        <div style={{ height: 'max(env(safe-area-inset-bottom), 16px)' }} />
      </div>
    </div>
  )
}
