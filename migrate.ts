import { createClient } from '@sanity/client'
import fs from 'fs/promises'
import path from 'path'

// TO RUN THIS SCRIPT:
// 1. Run `npx sanity init` to link your local project to a Sanity cloud project.
// 2. Go to sanity.io/manage and create an API token with Write permissions.
// 3. Set the environment variables and run this script using tsx or ts-node:
//    SANITY_API_TOKEN="your_token" NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id" npx tsx migrate.ts

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'demo',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function migrate() {
  const dataDir = path.join(process.cwd(), 'legacy', 'data')
  
  const collections = [
    { type: 'property', file: 'properties.json' },
    { type: 'investment', file: 'investments.json' },
    { type: 'post', file: 'posts.json' },
    { type: 'testimonial', file: 'testimonials.json' },
  ]
  
  for (const { type, file } of collections) {
    console.log(`Migrating ${type}...`)
    try {
      const raw = await fs.readFile(path.join(dataDir, file), 'utf8')
      const items = JSON.parse(raw)
      for (const item of items) {
        // Prepare document
        const doc = {
          _type: type,
          ...item,
          id: undefined // remove the old ID, Sanity uses _id
        }
        
        await client.create(doc)
        console.log(`Created ${type}: ${item.title || item.name || item.id}`)
      }
    } catch (e) {
      console.error(`Failed to migrate ${file}`, e)
    }
  }
  
  console.log('Migration complete.')
}

migrate()
