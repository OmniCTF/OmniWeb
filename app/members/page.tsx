import { authorCollection } from '@/qino/collections/authors'
import MembersClient, { MemberCardData } from './MembersClient'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Members',
  description:
    'The people behind OmniCTF: the organizers, challenge authors and contributors who build and run the competition.',
})

function isRetired(member: MemberCardData): boolean {
  return (member.position ?? '').toLowerCase().includes('retired')
}

function joinedToTime(joined?: string): number {
  if (!joined) return Number.MAX_SAFE_INTEGER
  const time = Date.parse(`1 ${joined}`)
  return Number.isNaN(time) ? Number.MAX_SAFE_INTEGER : time
}

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
  const authors = await authorCollection.getEntries()

  const members: MemberCardData[] = authors.map((author) => ({
    slug: author.slug,
    id: author.id,
    is_admin: author.is_admin,
    name: author.name,
    displayName: author.displayName,
    avatar: author.avatar ?? undefined,
    country: author.country,
    joined: author.joined,
    position: author.position,
    tags: author.tags,
    links: author.links,
  }))

  members.sort(compareMembers)

  return <MembersClient members={members} />
}
