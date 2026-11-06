import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'
import { mdxOptions } from '@/lib/mdx-options'

type MDXContentProps = {
  source: string
  components?: MDXComponents
}

// Replaces pliny's MDXLayoutRenderer: compiles the qino Markdown body at render time.
export default function MDXContent({ source, components }: MDXContentProps) {
  return <MDXRemote source={source} components={components} options={{ mdxOptions }} />
}
