import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, Github } from 'lucide-react'

export const dynamicParams = false


interface MemberPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'data/authors')
  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
  return files.map((file) => ({ slug: file.replace('.mdx', '') }))
}

export default function MemberProfile({ params }: MemberPageProps) {
  const filePath = path.join(process.cwd(), 'data/authors', `${params.slug}.mdx`)
  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: member } = matter(fileContent) as {
    data: {
      name: string
      displayName: string
      avatar?: string
      country?: string
      joined?: string
      position?: string
      bio?: string
      tags?: string[]
      links?: {
        website?: string
        github?: string
      }
      nowListening?: {
        title: string
        artist: string
        url: string
      }
    }
  }

  const posts = allBlogs.filter((post) => post.authors?.includes(params.slug))

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={member.name}
            width={120}
            height={120}
            className="rounded-full border object-cover"
          />
        ) : (
          <div className="w-[120px] h-[120px] rounded-full bg-gray-700" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{member.displayName}</h1>
          <p className="text-sm text-gray-400">{member.position}</p>
          <p className="text-sm text-gray-500">Joined {member.joined}</p>
          {member.country && (
            <img
              src={`https://flagcdn.com/w40/${member.country.toLowerCase()}.png`}
              alt={member.country}
              className="mt-2 w-6 h-4 object-cover rounded-sm"
            />
          )}
          <div className="mt-2 flex gap-3">
            {member.links?.website && (
              <a href={member.links.website} target="_blank" rel="noopener noreferrer">
                <Globe className="w-5 h-5 text-white hover:text-purple-400" />
              </a>
            )}
            {member.links?.github && (
              <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 text-white hover:text-purple-400" />
              </a>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {member.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="rounded bg-purple-900 px-2 py-1 text-xs font-medium text-white transition hover:bg-purple-700"
                >
                  {tag}
                </Link>
              ))}
          </div>

          {/* Now Listening section */}
          {member.nowListening?.url && (
            <div className="mt-6 rounded-xl bg-purple-500 p-4 shadow-lg text-white w-full max-w-md">
              <div className="text-xs uppercase font-bold tracking-wide mb-2">Now Playing</div>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-lg font-semibold">{member.nowListening.title}</div>
                  <div className="text-sm text-gray-100">{member.nowListening.artist}</div>
                </div>
                <audio controls className="rounded h-10">
                  <source src={member.nowListening.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-gray-300 leading-relaxed">{member.bio}</p>

      <h2 className="mt-10 text-2xl font-bold">Writeups</h2>
      <div className="mt-4 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block bg-gray-900 p-4 rounded-lg hover:ring-2 hover:ring-purple-500"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{post.title}</h3>
              <span className="text-sm text-gray-400">{post.date}</span>
            </div>
            <p className="text-sm text-gray-400">{post.summary}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags?.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs rounded bg-purple-900 text-white">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
