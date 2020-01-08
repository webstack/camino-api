import * as graphqlFields from 'graphql-fields'

// in: info: objet contenant les propriétés de la requête graphQl
// out: ast avec les champs requis par le client GraphQl
const fieldsBuild = info =>
  graphqlFields(info, {}, { excludedFields: ['__typename'] })

export default fieldsBuild
