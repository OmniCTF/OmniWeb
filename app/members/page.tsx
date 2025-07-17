import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Github } from 'lucide-react'

interface AuthorData {
  name: string
  displayName: string
  avatar?: string
  country?: string
  joined?: string
  position?: string
  tags?: string[]
  links?: {
    website?: string
    github?: string
  }
}

export default async function MembersPage() {
  const dir = path.join(process.cwd(), 'data/authors')
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))

  const members = files.map((file) => {
    const fileContent = fs.readFileSync(path.join(dir, file), 'utf-8')
    const { data } = matter(fileContent)
    return { ...data, slug: file.replace('.mdx', '') }
  })

  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-10">Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {members.map((member) => (
          <div
            key={member.slug}
            className="bg-gray-900 rounded-xl p-5 hover:ring-2 hover:ring-purple-500 transition flex flex-col items-center"
          >
            {/* Avatar and Name section is clickable */}
            <Link
              href={`/members/${member.slug}`}
              className="flex flex-col items-center text-center"
            >
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full border object-cover"
                />
              ) : (
                <div className="w-[100px] h-[100px] rounded-full bg-gray-700" />
              )}
              <h2 className="mt-4 text-xl font-semibold text-white">{member.displayName}</h2>
              <p className="text-sm text-gray-400">{member.position}</p>
              <p className="text-sm text-gray-500">Joined {member.joined}</p>
            </Link>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1 justify-center">
                {member.tags?.map((tag) => (
                    <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="px-2 py-1 text-xs font-medium rounded bg-purple-900 text-white hover:bg-purple-700 transition"
                    >
                    {tag}
                    </Link>
                ))}
            </div>


            {/* External Links */}
            <div className="mt-3 flex gap-4">
              {member.links?.website && (
                <a
                  href={member.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400"
                >
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {member.links?.github && (
                <a
                  href={member.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-400"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
            </div>

            {/* Flag */}
            {member.country && (
              <img
                src={`https://flagcdn.com/w40/${member.country.toLowerCase()}.png`}
                alt={member.country}
                className="mt-2 w-6 h-4 object-cover rounded-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
