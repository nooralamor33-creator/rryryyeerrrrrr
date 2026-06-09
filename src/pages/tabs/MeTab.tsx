import { useState, useRef } from 'react'
import type { User } from '../../types/auth'
import { authService } from '../../services/authService'
import { AddFriendModal } from '../modals/AddFriendModal'
import { CreateGroupModal } from '../modals/CreateGroupModal'
import { CreateChannelModal } from '../modals/CreateChannelModal'
import { GiftsModal } from '../modals/GiftsModal'

interface MeTabProps {
  user: User
  onLogout: () => void
  onUpdateUser: (user: User) => void
  onOpenAIChat: () => void
}

export function MeTab({ user, onLogout, onUpdateUser, onOpenAIChat }: MeTabProps) {
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showCreateChannel, setShowCreateChannel] = useState(false)
  const [showGifts, setShowGifts] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initials = user.fullName?.split(' ').slice(0, 2).map(n => n[0] ?? '').join('').toUpperCase() || user.username.slice(0, 2).toUpperCase()

  const points = 1240
  const stamps = 7

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string
      const result = await authService.updateProfile({ avatarUrl: dataUrl })
      if (result.success && result.user) {
        onUpdateUser(result.user)
      }
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const actions = [
    { label: 'إضافة صديق', icon: '👥', color: '#5E5CE6', bg: '#F0EFFE', onClick: () => setShowAddFriend(true) },
    { label: 'إنشاء مجموعة', icon: '💬', color: '#FF6B6B', bg: '#FFF0F0', onClick: () => setShowCreateGroup(true) },
    { label: 'إنشاء قناة', icon: '📢', color: '#FF9F0A', bg: '#FFF8EE', onClick: () => setShowCreateChannel(true) },
    { label: 'الهدايا والنقاط', icon: '🎁', color: '#30D158', bg: '#F0FFF4', onClick: () => setShowGifts(true) },
  ]

  return (
    <div className="page-enter">
      {/* Header gradient */}
      <div className="relative pt-12 pb-8 px-5"
        style={{ background: 'linear-gradient(160deg, #EEF0FF 0%, #F8F4FF 40%, #F2F2F7 100%)' }}>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onLogout}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl transition-colors"
            style={{ color: '#FF3B30', background: 'rgba(255,59,48,0.08)' }}>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            خروج
          </button>
          <span className="text-base font-bold text-gray-800">ملفي</span>
          <button onClick={onOpenAIChat}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
            style={{ background: 'linear-gradient(135deg, #5E5CE6, #5856D6)' }}>
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="avatar-ring">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, #5E5CE6, #8B5CF6)' }}>
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-white">{initials}</span>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-white">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#5E5CE6" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-0.5">{user.fullName || user.username}</h1>
          <p className="text-sm text-gray-500 mb-2">@{user.username}</p>

          {/* 8-digit ID */}
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(94,92,230,0.10)' }}>
            <svg className="w-3.5 h-3.5" style={{ color: '#5E5CE6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            <span className="text-xs font-bold tracking-widest" style={{ color: '#5E5CE6' }} dir="ltr">
              #{user.userId8 ?? '00000000'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 pt-2">
        {/* Points & Stamps */}
        <div className="ios-card p-4 flex items-center gap-3">
          <div className="flex-1 flex flex-col items-center gap-1 border-l border-gray-100 pl-3">
            <span className="text-2xl font-bold text-gray-900">{points.toLocaleString('ar')}</span>
            <span className="text-xs text-gray-400">النقاط</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1 border-l border-gray-100 pl-3">
            <span className="text-2xl font-bold text-gray-900">{stamps}</span>
            <span className="text-xs text-gray-400">الطوابع</span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex -space-x-1 rtl:space-x-reverse">
              {['🏅','🌟','🎖️'].map((e, i) => (
                <span key={i} className="text-lg">{e}</span>
              ))}
            </div>
            <span className="text-xs text-gray-400">الإنجازات</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={action.onClick}
              className="ios-card p-4 flex items-center gap-3 text-right active:scale-95 transition-transform"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: action.bg }}>
                {action.icon}
              </div>
              <span className="text-sm font-semibold text-gray-800">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Daily Gifts */}
        <div className="ios-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-400">الحضور اليومي</span>
            <span className="text-sm font-bold text-gray-800">🎁 هدية يومية</span>
          </div>
          <div className="flex gap-2">
            {[1,2,3,4,5,6,7].map(day => (
              <div key={day}
                className="flex-1 h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: day <= 3 ? 'linear-gradient(135deg, #5E5CE6, #5856D6)' : day === 4 ? 'rgba(94,92,230,0.15)' : 'rgba(120,120,128,0.08)',
                  color: day <= 3 ? '#fff' : day === 4 ? '#5E5CE6' : '#AEAEB2',
                  border: day === 4 ? '2px solid #5E5CE6' : 'none',
                }}>
                {day <= 3 ? '✓' : day === 4 ? `${day}` : `${day}`}
              </div>
            ))}
          </div>
        </div>

        {/* Info Row */}
        <div className="ios-card overflow-hidden">
          {[
            { label: 'البريد الإلكتروني', value: user.email, dir: 'ltr' as const },
            { label: 'تاريخ الانضمام', value: new Date(user.createdAt).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }) },
            { label: 'الصلاحية', value: user.role === 'admin' ? '👑 مدير' : '👤 عضو' },
          ].map((row, i) => (
            <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i < 2 ? 'border-b border-gray-50' : ''}`}>
              <span className="text-xs text-gray-400">{row.label}</span>
              <span className="text-sm font-medium text-gray-700" dir={row.dir}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {showAddFriend && <AddFriendModal onClose={() => setShowAddFriend(false)} />}
      {showCreateGroup && <CreateGroupModal onClose={() => setShowCreateGroup(false)} />}
      {showCreateChannel && <CreateChannelModal onClose={() => setShowCreateChannel(false)} />}
      {showGifts && <GiftsModal onClose={() => setShowGifts(false)} userPoints={points} />}
    </div>
  )
}
