import { ITitre } from '../../types'
import PQueue from 'p-queue'

import { titreDemarcheUpdate } from '../../database/queries/titres-demarches'
import titreDemarcheStatutIdFind from '../rules/titre-demarche-statut-id-find'

// met à jour le statut des démarches d'un titre
const titresDemarchesStatutUpdate = async (titres: ITitre[]) => {
  const queue = new PQueue({ concurrency: 100 })

  // TODO: forcer la présence des démarches sur le titre
  // https://stackoverflow.com/questions/40510611/typescript-interface-require-one-of-two-properties-to-exist/49725198#49725198
  const titresDemarchesUpdated = titres.reduce(
    (titresDemarchesUpdated: string[], titre) =>
      titre.demarches!.reduce(
        (titresDemarchesUpdated: string[], titreDemarche) => {
          const titreDemarcheEtapes = titreDemarche.etapes?.reverse() || []

          const statutId = titreDemarcheStatutIdFind(
            titreDemarche.typeId,
            titreDemarcheEtapes,
            titre.typeId
          )

          if (titreDemarche.statutId === statutId) return titresDemarchesUpdated

          queue.add(async () => {
            await titreDemarcheUpdate(titreDemarche.id, {
              statutId
            })

            console.info(
              `mise à jour: démarche ${titreDemarche.id}, ${JSON.stringify({
                statutId
              })}`
            )

            titresDemarchesUpdated.push(titreDemarche.id)
          })

          return titresDemarchesUpdated
        },
        titresDemarchesUpdated
      ),
    []
  )

  await queue.onIdle()

  return titresDemarchesUpdated
}

export default titresDemarchesStatutUpdate
