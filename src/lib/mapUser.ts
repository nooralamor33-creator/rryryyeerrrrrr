import type { User as SBUser } from '@supabase/supabase-js'
import type { User } from '../types/auth'

function generateUserId8(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const num = Math.abs(hash) % 100000000
  return num.toString().padStart(8, '0')
}

export function mapUser(sbUser: SBUser): User {
  const meta = (sbUser.user_metadata ?? {}) as Record<string, unknown>
  return {
    id: sbUser.id,
    email: sbUser.email ?? '',
    username: (meta['username'] as string | undefined) ?? sbUser.email?.split('@')[0] ?? '',
    fullName: (meta['full_name'] as string | undefined) ?? '',
    createdAt: sbUser.created_at,
    role: (meta['role'] as string | undefined) === 'admin' ? 'admin' : 'user',
    avatarUrl: (meta['avatar_url'] as string | undefined) ?? undefined,
    userId8: generateUserId8(sbUser.id),
  }
}
