const { Model } = require('objection')

class EtapesStatuts extends Model {
  static get tableName() {
    return 'etapes_statuts'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'nom', 'couleur'],

      properties: {
        id: { type: 'string', maxLength: 3 },
        nom: { type: 'string' },
        couleur: { type: 'string', maxLength: 8 }
      }
    }
  }
}

module.exports = EtapesStatuts