import Link from 'next/link'
import { client } from '@/sanity/lib/client'

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function Blog() {
  const sanityPosts = await client.fetch(`*[_type == "post" && published == true] | order(publishedAt desc) { title, excerpt, category, "slug": _id }`)

  const fallbackPosts = [
    { title: "Why Ibeju Lekki continues to attract smart investors", category: "Market intelligence", excerpt: "How critical infrastructure is changing the investment landscape.", slug: "1" },
    { title: "Lagos Coastal Highway: what it means for investors", category: "Infrastructure", excerpt: "A look at the property value impact of new connectivity.", slug: "2" },
    { title: "How Nigerians abroad can avoid real estate scams", category: "Diaspora guide", excerpt: "Practical steps for safely buying from anywhere in the world.", slug: "3" },
    { title: "Best places to buy land in Lagos", category: "Market report", excerpt: "The locations poised for residential and commercial growth.", slug: "4" }
  ]

  const posts = sanityPosts && sanityPosts.length > 0 ? sanityPosts : fallbackPosts

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Lagos property insights</p>
        <h1>Invest with<br /><em>perspective.</em></h1>
        <p>Expert guidance, timely local insights and practical advice for more confident property decisions.</p>
      </section>

      <section className="page-content">
        {posts.map((post: any) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="list-row" style={{ textDecoration: 'none', color: 'inherit', display: 'grid' }}>
            <span>{post.category || 'Article'}</span>
            <div>
              <h3>{post.title}</h3>
              {post.excerpt && <p>{post.excerpt}</p>}
            </div>
            <b>→</b>
          </Link>
        ))}
      </section>
    </main>
  )
}
