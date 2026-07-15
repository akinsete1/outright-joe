import { client } from '@/sanity/lib/client'

export const revalidate = 60

function getYoutubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : null
}

export default async function Videos() {
  const videos = await client.fetch(`*[_type == "youtubeVideo" && published == true] | order(publishedAt desc) {
    title,
    youtubeUrl,
    publishedAt
  }`)

  const fallbackVideos = [
    { title: "Why Real Estate in Lagos is Booming", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
    { title: "Top 5 Investment Locations in 2024", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
  ]

  const displayVideos = videos && videos.length > 0 ? videos : fallbackVideos

  return (
    <main>
      <section className="page-hero">
        <p className="eyebrow light">Watch & Learn</p>
        <h1>Our YouTube<br /><em>Feeds.</em></h1>
        <p>Stay updated with our latest property tours, market analyses, and investment tips.</p>
      </section>

      <section className="video-grid">
        {displayVideos.map((video: any, index: number) => {
          const videoId = getYoutubeId(video.youtubeUrl)
          
          if (!videoId) return null

          return (
            <div key={index} className="video-card">
              <iframe 
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title || "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="video-info">
                <h3>{video.title || 'Property Video'}</h3>
                {video.publishedAt && (
                  <p>{new Date(video.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                )}
              </div>
            </div>
          )
        })}
      </section>
    </main>
  )
}
