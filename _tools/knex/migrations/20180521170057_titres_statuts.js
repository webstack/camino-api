exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('titresStatuts', table => {
      table.string('id', 3).primary()
      table.string('nom')
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTable('titresStatuts')])
}
