const rooms = [
  { id: 1, name: 'غرفة الأصدقاء', host: 'أحمد', members: 8, max: 20, tags: ['ترفيه', 'موسيقى'], color: '#5E5CE6', live: true },
  { id: 2, name: 'نقاشات تقنية', host: 'سارة', members: 5, max: 15, tags: ['تقنية', 'برمجة'], color: '#30D158', live: true },
  { id: 3, name: 'ليلة الألعاب', host: 'محمد', members: 12, max: 25, tags: ['ألعاب', 'منافسة'], color: '#FF6B6B', live: true },
  { id: 4, name: 'الموسيقى العربية', host: 'نورة', members: 3, max: 10, tags: ['موسيقى', 'فن'], color: '#FF9F0A', live: false },
  { id: 5, name: 'تعلم اللغات', host: 'خالد', members: 7, max: 20, tags: ['تعليم', 'لغات'], color: '#5AC8FA', live: true },
]

export function VoiceRoomsTab() {
  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-gray-400">{rooms.filter(r => r.live).length} غرف مباشرة</span>
          <h1 className="text-xl font-bold text-gray-900">الغرف الصوتية 🎙</h1>
        </div>

        {/* Banner */}
        <div className="ios-card p-4 mb-5 flex items-center gap-4 overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #EEF0FF, #F0EFFE)' }}>
          <div className="absolute -left-4 -top-4 w-20 h-20 rounded-full opacity-20"
            style={{ background: 'var(--ios-purple)' }} />
          <div className="flex-1 text-right z-10">
            <h3 className="font-bold text-gray-900 text-sm mb-1">أنشئ غرفتك الخاصة</h3>
            <p className="text-xs text-gray-500">ادعُ أصدقاءك وابدأ المحادثة</p>
          </div>
          <button className="ios-btn ios-btn-primary text-xs px-4 py-2.5 flex-shrink-0">
            إنشاء
          </button>
        </div>

        {/* Rooms */}
        <div className="space-y-3">
          {rooms.map(room => (
            <div key={room.id} className="ios-card p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-bold text-lg"
                style={{ background: room.color }}>
                🎙
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 justify-end">
                  {room.live && (
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs text-red-500 font-medium">مباشر</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{room.name}</h3>
                </div>
                <p className="text-xs text-gray-400 text-right mt-0.5">المضيف: {room.host}</p>
                <div className="flex items-center gap-2 justify-end mt-1.5">
                  {room.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(94,92,230,0.08)', color: '#5E5CE6' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <span>{room.members}/{room.max}</span>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-xl font-semibold"
                  style={{ background: 'rgba(94,92,230,0.10)', color: '#5E5CE6' }}>
                  انضم
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
