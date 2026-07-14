import {defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
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
      name: 'storyHeading',
      title: 'Story Heading',
      type: 'string',
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text',
    }),
  ],
})
