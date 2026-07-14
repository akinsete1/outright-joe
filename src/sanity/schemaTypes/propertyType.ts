import { defineField, defineType } from 'sanity'

export const propertyType = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: 'type', title: 'Property Type (e.g., Land, Apartment, House)', type: 'string' }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'Available' },
          { title: 'Sold Out', value: 'Sold Out' },
          { title: 'Off-Plan', value: 'Off-Plan' },
        ],
      },
      initialValue: 'Available',
    }),
    defineField({ name: 'price', title: 'Price', type: 'string', description: 'e.g. ₦150,000,000 or $250,000' }),
    defineField({ name: 'location', title: 'Location (e.g., Ibeju Lekki)', type: 'string' }),
    
    // Specifications
    defineField({ name: 'bedrooms', title: 'Bedrooms', type: 'number' }),
    defineField({ name: 'bathrooms', title: 'Bathrooms', type: 'number' }),
    defineField({ name: 'area', title: 'Area Size', type: 'string', description: 'e.g. 500 sqm' }),

    defineField({ name: 'image', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({ 
      name: 'gallery', 
      title: 'Image Gallery', 
      type: 'array', 
      of: [{ type: 'image', options: { hotspot: true } }] 
    }),
    
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'published', title: 'Published', type: 'boolean', initialValue: true }),
  ]
})
