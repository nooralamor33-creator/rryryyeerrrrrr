import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { MainApp } from './pages/MainApp'

type AuthView = 'login' | 'register'

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-violet-500/30 animate-pulse">
          <span className="text-2xl font-bold text-white">✦</span>
        </div>
        <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}

export default function App() {
  const { authState, loading, login, register, logout, updateUser } = useAuth()
  const [view, setView] = useState<AuthView>('login')

  if (loading) return <LoadingScreen />

  if (authState.isAuthenticated && authState.user) {
    return <MainApp user={authState.user} onLogout={logout} onUpdateUser={updateUser} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center p-4" dir="rtl">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-indigo-200/40 blur-3xl" />
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <span className="text-sm font-bold text-white">✦</span>
          </div>
          <span className="text-base font-bold text-gray-800 tracking-tight">Varecvsce</span>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-200/60 border border-white/60 p-7">
          {view === 'login' ? (
            <LoginForm onLogin={login} onSwitchToRegister={() => setView('register')} />
          ) : (
            <RegisterForm onRegister={register} onSwitchToLogin={() => setView('login')} />
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          &copy; {new Date().getFullYear()} Varecvsce. جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  )
}
