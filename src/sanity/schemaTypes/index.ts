import { type SchemaTypeDefinition } from 'sanity'
import { propertyType } from './propertyType'
import { investmentType } from './investmentType'
import { postType } from './postType'
import { testimonialType } from './testimonialType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [propertyType, investmentType, postType, testimonialType],
}
