import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MembersClient, { MemberCardData } from './MembersClient'

// A member counts as "retired" when their position says so.
function isRetired(member: MemberCardData): boolean {
  return (member.position ?? '').toLowerCase().includes('retired')
}

// Turn a "Month YYYY" string (e.g. "May 2025") into a sortable timestamp.
// Members without a parseable join date sort last among the un-ranked group.
function joinedToTime(joined?: string): number {
  if (!joined) return Number.MAX_SAFE_INTEGER
  const time = Date.parse(`1 ${joined}`)
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time
}

/**
 * Ordering rules:
 *   1. Retired members always sink to the bottom (their posts stay visible).
 *   2. Admins (is_admin) are always pinned to the top.
 *   3. Within a tier, lower `id` comes first. Admins are ids 1-4 in a fixed
 *      order; everyone else is numbered by join date (5 onward).
 *   4. Missing id falls back to join date (earliest first).
 *   5. Name is the final tiebreaker for a stable result.
 */
function compareMembers(a: MemberCardData, b: MemberCardData): number {
  const aRetired = isRetired(a) ? 1 : 0
  const bRetired = isRetired(b) ? 1 : 0
  if (aRetired !== bRetired) return aRetired - bRetired

  const aAdmin = a.is_admin ? 0 : 1
  const bAdmin = b.is_admin ? 0 : 1
  if (aAdmin !== bAdmin) return aAdmin - bAdmin

  const aId = a.id ?? Number.POSITIVE_INFINITY
  const bId = b.id ?? Number.POSITIVE_INFINITY
  if (aId !== bId) return aId - bId

  const aJoined = joinedToTime(a.joined)
  const bJoined = joinedToTime(b.joined)
  if (aJoined !== bJoined) return aJoined - bJoined

  return (a.displayName ?? a.name).localeCompare(b.displayName ?? b.name)
}

export default async function MembersPage() {
  const dir = path.join(process.cwd(), 'data/authors')
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))

  const members: MemberCardData[] = files.map((file) => {
    const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data } = matter(fileContent)
    return {
      ...(data as any),
      slug: file.replace('.mdx', ''),
    }
  })

  members.sort(compareMembers)

  return <MembersClient members={members} />
}
