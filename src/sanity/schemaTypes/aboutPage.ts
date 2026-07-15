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
      initialValue: 'Guidance you can<br /><em>build on.</em>',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      initialValue: 'We help Nigerians around the world buy property in Lagos with a process grounded in clarity, integrity and diligent verification.',
    }),
    defineField({
      name: 'storyHeading',
      title: 'Story Heading',
      type: 'string',
      initialValue: 'Real estate, without the uncertainty.',
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
      initialValue: "To simplify real estate investment in Nigeria through rigorous verification, absolute transparency, and tailored advisory that protects and grows our clients' wealth.",
    }),
  ],
})
