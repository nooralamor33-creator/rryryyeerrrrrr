import { useState } from 'react'
import type { User } from '../../types/auth'

interface PostsTabProps {
  user: User
}

const initialPosts = [
  { id: 1, author: 'أحمد محمد', username: 'ahmed_m', avatar: '', time: 'منذ 5 دقائق', content: 'أهلاً بالجميع في هذا التطبيق الرائع! 👋 يسعدني الانضمام إلى هذا المجتمع الجميل.', likes: 24, comments: 8, liked: false },
  { id: 2, author: 'سارة علي', username: 'sara_ali', avatar: '', time: 'منذ 20 دقيقة', content: '🎮 من يريد اللعب معي في لعبة اللودو الليلة؟ الغرفة مفتوحة للجميع!', likes: 47, comments: 15, liked: true },
  { id: 3, author: 'محمد خالد', username: 'mo_k', avatar: '', time: 'منذ ساعة', content: '🌟 نصيحة اليوم: لا تنسَ الحضور اليومي لكسب النقاط والجوائز المميزة! لقد جمعت 500 نقطة هذا الأسبوع.', likes: 89, comments: 31, liked: false },
  { id: 4, author: 'نورة سالم', username: 'noura_s', avatar: '', time: 'منذ 2 ساعة', content: '🎁 فازت اليوم بطابع "النجم الذهبي" من خلال إرسال الهدايا! شكراً للجميع على دعمهم 💜', likes: 156, comments: 42, liked: false },
]

const colors = ['#5E5CE6', '#FF6B6B', '#30D158', '#FF9F0A', '#5AC8FA', '#FF3B30']

function getColor(name: string) {
  let hash = 0
  for (const c of name) hash += c.charCodeAt(0)
  return colors[hash % colors.length]
}

export function PostsTab({ user }: PostsTabProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [posting, setPosting] = useState(false)

  const initials = (user.fullName || user.username).slice(0, 2).toUpperCase()

  function toggleLike(id: number) {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  async function submitPost() {
    if (!newPost.trim()) return
    setPosting(true)
    await new Promise(r => setTimeout(r, 400))
    const post = {
      id: Date.now(),
      author: user.fullName || user.username,
      username: user.username,
      avatar: user.avatarUrl || '',
      time: 'الآن',
      content: newPost.trim(),
      likes: 0,
      comments: 0,
      liked: false,
    }
    setPosts(prev => [post, ...prev])
    setNewPost('')
    setPosting(false)
  }

  return (
    <div className="page-enter">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs text-gray-400">{posts.length} منشور</span>
          <h1 className="text-xl font-bold text-gray-900">المنشورات 📰</h1>
        </div>

        {/* Composer */}
        <div className="ios-card p-4 mb-4 flex gap-3">
          <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
            style={{ background: getColor(user.fullName || user.username) }}>
            {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" /> : initials}
          </div>
          <div className="flex-1">
            <textarea
              className="ios-input text-sm resize-none min-h-[60px]"
              placeholder="ما الذي يدور في ذهنك؟"
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              rows={2}
            />
            {newPost.trim() && (
              <button onClick={submitPost} disabled={posting}
                className="ios-btn ios-btn-primary text-sm px-5 py-2 mt-2 w-full"
                style={{ borderRadius: '12px' }}>
                {posting ? 'جاري النشر...' : 'نشر'}
              </button>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="ios-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 justify-end mb-2">
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{post.author}</span>
                      <span className="text-xs text-gray-400 mr-1.5">· {post.time}</span>
                    </div>
                    <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: getColor(post.author) }}>
                      {post.avatar ? <img src={post.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : post.author.slice(0, 2)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed text-right">{post.content}</p>
                  <div className="flex items-center gap-4 justify-end mt-3">
                    <button className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                      </svg>
                      {post.comments}
                    </button>
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs transition-colors"
                      style={{ color: post.liked ? '#FF3B30' : '#AEAEB2' }}>
                      <svg className="w-4 h-4" fill={post.liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                      {post.likes}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
