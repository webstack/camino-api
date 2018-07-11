const {
  titre,
  titres,
  titreAjouter,
  titreSupprimer,
  titreModifier
} = require('../../postgres/queries/titres')

const {
  geojsonFeatureMultiPolygon,
  geojsonFeatureCollectionPoints
} = require('./_tools-geojson')

const titreFormat = t => {
  t.perimetres = []
  t.demarches &&
    t.demarches.forEach(d => {
      d.etapes &&
        d.etapes.forEach(e => {
          if (e.points) {
            e.geojsonMultiPolygon = geojsonFeatureMultiPolygon(e.points)
            e.geojsonPoints = geojsonFeatureCollectionPoints(e.points)
          }
        })
    })

  return t
}

const resolvers = {
  titre: async ({ id }, context, info) => {
    const t = await titre(id)
    return titreFormat(t)
  },

  titres: async (
    { typeIds, domaineIds, statutIds, substances },
    context,
    info
  ) => {
    const ts = await titres(
      { typeIds, domaineIds, statutIds, substances },
      context.user
    )

    return ts.map(t => titreFormat(t))
  },

  titreAjouter: async ({ titre }, context, info) =>
    titreAjouter(titre, context.user),

  titreSupprimer: async ({ id }, context, info) =>
    titreSupprimer(id, context.user),

  titreModifier: async ({ titre }, context, info) =>
    titreModifier(titre, context.user)
}

module.exports = resolvers
