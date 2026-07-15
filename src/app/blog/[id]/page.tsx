import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await client.fetch(`*[_type == "post" && _id == $id][0] { 
    title, 
    category, 
    publishedAt, 
    content 
  }`, { id: params.id })

  if (!post) {
    notFound()
  }

  // Define custom portable text components to apply standard CSS
  const ptComponents = {
    block: {
      normal: ({ children }: any) => <p style={{ marginBottom: '1.5em', fontSize: '18px', lineHeight: '1.6', color: '#333' }}>{children}</p>,
      h2: ({ children }: any) => <h2 style={{ marginTop: '2em', marginBottom: '0.8em', fontSize: '32px', fontFamily: 'var(--serif)', color: '#1e392f', letterSpacing: '-0.02em' }}>{children}</h2>,
      h3: ({ children }: any) => <h3 style={{ marginTop: '1.5em', marginBottom: '0.8em', fontSize: '24px', color: '#1e392f', letterSpacing: '-0.01em' }}>{children}</h3>,
      blockquote: ({ children }: any) => <blockquote style={{ borderLeft: '4px solid var(--gold)', paddingLeft: '20px', fontStyle: 'italic', margin: '2em 0', color: '#555', fontSize: '20px' }}>{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul style={{ marginBottom: '1.5em', paddingLeft: '20px', listStyleType: 'disc' }}>{children}</ul>,
      number: ({ children }: any) => <ol style={{ marginBottom: '1.5em', paddingLeft: '20px', listStyleType: 'decimal' }}>{children}</ol>,
    },
    listItem: {
      bullet: ({ children }: any) => <li style={{ marginBottom: '0.5em', fontSize: '18px' }}>{children}</li>,
      number: ({ children }: any) => <li style={{ marginBottom: '0.5em', fontSize: '18px' }}>{children}</li>,
    },
    marks: {
      link: ({ children, value }: any) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
        return (
          <a href={value.href} rel={rel} style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
            {children}
          </a>
        )
      },
    },
  }

  return (
    <main>
      <section className="page-hero" style={{ paddingBottom: '40px' }}>
        <p className="eyebrow light">
          <Link href="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>← Back to Insights</Link>
          <span style={{ margin: '0 10px' }}>/</span>
          {post.category || 'Article'}
        </p>
        <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>{post.title}</h1>
        {post.publishedAt && (
          <p style={{ fontSize: '14px', fontFamily: 'var(--font-dm-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
      </section>

      <section className="page-content" style={{ maxWidth: '800px', margin: '0 auto 100px', padding: '0 7vw' }}>
        {post.content ? (
          <div className="portable-text">
            <PortableText value={post.content} components={ptComponents} />
          </div>
        ) : (
          <p style={{ fontSize: '18px', color: '#666' }}>This post has no content yet.</p>
        )}
      </section>
    </main>
  )
}
