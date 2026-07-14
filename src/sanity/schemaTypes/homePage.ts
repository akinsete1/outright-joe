import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
    }),
    defineField({
      name: 'proofHeading',
      title: 'Proof Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'proofText',
      title: 'Proof Section Text',
      type: 'text',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
    }),
  ],
})
