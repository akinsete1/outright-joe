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
      initialValue: 'Invest in a<br /><em>place of your own.</em>',
    }),

    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      initialValue: 'Helping Nigerians home and abroad buy verified land, luxury apartments, and high-return opportunities across Lagos.',
    }),
    defineField({
      name: 'proofHeading',
      title: 'Proof Section Heading',
      type: 'string',
      initialValue: 'Property should feel<br />like a <em>sure thing.</em>',
    }),
    defineField({
      name: 'proofText',
      title: 'Proof Section Text',
      type: 'text',
      initialValue: 'For over nine years, we have made the path to property ownership clearer, safer and more rewarding for hundreds of clients around the world.',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section Heading',
      type: 'string',
      initialValue: 'Built on <em>trust.</em><br />Driven by results.',
    }),
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      initialValue: 'Outright Joe is an award-winning real estate consultant dedicated to helping Nigerians at home and abroad acquire verified properties across Lagos.\n\nWe combine clear guidance, diligent documentation and local expertise—so that your investment creates lasting wealth and genuine peace of mind.',
    }),
  ],
})
