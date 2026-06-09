import { useState } from 'react'
import type { User } from '../types/auth'
import { MeTab } from './tabs/MeTab'
import { VoiceRoomsTab } from './tabs/VoiceRoomsTab'
import { GamesTab } from './tabs/GamesTab'
import { PostsTab } from './tabs/PostsTab'
import { AIChat } from './AIChat'

interface MainAppProps {
  user: User
  onLogout: () => void
  onUpdateUser: (user: User) => void
}

type TabId = 'me' | 'voice' | 'games' | 'posts'

const tabs: { id: TabId; label: string; icon: (active: boolean) => JSX.Element }[] = [
  {
    id: 'me',
    label: 'أنا',
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  },
  {
    id: 'voice',
    label: 'الغرف الصوتية',
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    )
  },
  {
    id: 'games',
    label: 'الألعاب',
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    )
  },
  {
    id: 'posts',
    label: 'المنشورات',
    icon: (active) => (
      <svg className="w-6 h-6" fill={active ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    )
  },
]

export function MainApp({ user, onLogout, onUpdateUser }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<TabId>('me')
  const [showAIChat, setShowAIChat] = useState(false)

  const tabColors: Record<TabId, string> = {
    me: '#5E5CE6',
    voice: '#FF6B6B',
    games: '#30D158',
    posts: '#FF9F0A',
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]" dir="rtl">
      <div className="pb-[82px]">
        {activeTab === 'me' && (
          <MeTab user={user} onLogout={onLogout} onUpdateUser={onUpdateUser} onOpenAIChat={() => setShowAIChat(true)} />
        )}
        {activeTab === 'voice' && <VoiceRoomsTab />}
        {activeTab === 'games' && <GamesTab />}
        {activeTab === 'posts' && <PostsTab user={user} />}
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        {tabs.map((tab) => {
          const active = activeTab === tab.id
          const color = tabColors[tab.id]
          return (
            <button
              key={tab.id}
              className="tab-item"
              onClick={() => setActiveTab(tab.id)}
              style={{ color: active ? color : '#AEAEB2' }}
            >
              <div className="tab-icon">{tab.icon(active)}</div>
              <span className="tab-label" style={{ fontWeight: active ? 600 : 400 }}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* AI Chat floating button */}
      <button
        onClick={() => setShowAIChat(true)}
        className="fixed bottom-[90px] left-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center z-50 transition-transform active:scale-95"
        style={{ background: 'linear-gradient(135deg, #5E5CE6, #5856D6)', boxShadow: '0 4px 16px rgba(94,92,230,0.45)' }}
        title="المساعد الذكي"
      >
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </button>

      {showAIChat && <AIChat user={user} onClose={() => setShowAIChat(false)} />}
    </div>
  )
}
