const games = [
  {
    id: 'ludo',
    title: 'لعبة اللودو',
    desc: 'العب مع أصدقائك',
    emoji: '🎲',
    players: '2-4 لاعبين',
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    badge: 'قريباً',
    badgeColor: '#FF9F0A',
  },
  {
    id: 'snake',
    title: 'السلم والثعبان',
    desc: 'الكلاسيكية الممتعة',
    emoji: '🐍',
    players: '2-4 لاعبين',
    bg: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    badge: 'قريباً',
    badgeColor: '#FF9F0A',
  },
  {
    id: 'puzzle',
    title: 'لغز الكلمات',
    desc: 'اختبر ذكاءك',
    emoji: '🧩',
    players: '1 لاعب',
    bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    badge: 'جديد',
    badgeColor: '#30D158',
  },
  {
    id: 'adventure',
    title: 'مغامرة البطل',
    desc: 'استكشف عوالم',
    emoji: '⚔️',
    players: 'مغامرة فردية',
    bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    badge: 'قريباً',
    badgeColor: '#FF9F0A',
  },
  {
    id: 'race',
    title: 'سباق السرعة',
    desc: 'تنافس مع الأصدقاء',
    emoji: '🏎️',
    players: '2-8 لاعبين',
    bg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    badge: 'قريباً',
    badgeColor: '#FF9F0A',
  },
  {
    id: 'defense',
    title: 'مملكة الدفاع',
    desc: 'ابني مدينتك',
    emoji: '🏰',
    players: 'استراتيجية',
    bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    badge: 'قريباً',
    badgeColor: '#FF9F0A',
  },
]

export function GamesTab() {
  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs text-gray-400 font-medium">{games.length} ألعاب</span>
          <h1 className="text-xl font-bold text-gray-900">الألعاب 🎮</h1>
        </div>

        {/* Featured */}
        <div className="ios-card overflow-hidden mb-5">
          <div className="h-36 relative" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl">🎲</span>
            </div>
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)' }}>
              مميز هذا الأسبوع
            </div>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900 text-base">لعبة اللودو</h3>
              <p className="text-xs text-gray-500 mt-0.5">العب مع أصدقائك الآن</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(255,159,10,0.12)', color: '#FF9F0A' }}>
                قريباً
              </span>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <h2 className="text-base font-bold text-gray-800 mb-3 text-right">جميع الألعاب</h2>
        <div className="grid grid-cols-2 gap-3">
          {games.map((game) => (
            <div key={game.id} className="game-card">
              <div className="h-24 relative flex items-center justify-center"
                style={{ background: game.bg }}>
                <span className="text-5xl">{game.emoji}</span>
                <span className="absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: game.badgeColor }}>
                  {game.badge}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-900 text-sm">{game.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{game.desc}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">👥 {game.players}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
