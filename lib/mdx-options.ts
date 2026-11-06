import path from 'path'
import type { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import { remarkCodeTitles, remarkImgToJsx } from 'pliny/mdx-plugins/index.js'

import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'

type MDXOptions = NonNullable<NonNullable<MDXRemoteProps['options']>['mdxOptions']>

const root = process.cwd()

const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

// Moved from contentlayer.config.ts. remarkExtractFrontmatter is gone: qino strips frontmatter.
export const mdxOptions: MDXOptions = {
  remarkPlugins: [remarkGfm, remarkCodeTitles, remarkMath, remarkImgToJsx, remarkAlert],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'prepend',
        headingProperties: {
          className: ['content-header'],
        },
        content: icon,
      },
    ],
    rehypeKatex,
    rehypeKatexNoTranslate,
    [rehypeCitation, { path: path.join(root, 'data') }],
    [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    rehypePresetMinify,
  ],
}
