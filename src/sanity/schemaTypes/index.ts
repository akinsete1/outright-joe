import { type SchemaTypeDefinition } from 'sanity'
import { propertyType } from './propertyType'
import { investmentType } from './investmentType'
import { postType } from './postType'
import { testimonialType } from './testimonialType'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    propertyType, 
    investmentType, 
    postType, 
    testimonialType,
    siteSettings,
    homePage,
    aboutPage
  ],
}
