import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MembersClient, { MemberCardData } from './MembersClient'

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

  // Stable ordering: name, then displayName
  members.sort((a, b) => (a.displayName ?? a.name).localeCompare(b.displayName ?? b.name))

  return <MembersClient members={members} />
}
