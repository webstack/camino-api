import { IToken, ITitre, ITitreColonneId } from '../../../types'
import { GraphQLResolveInfo } from 'graphql'

import { debug } from '../../../config/index'

import { permissionCheck } from '../../../tools/permission'
import { titreFormat, titresFormat } from '../../_format/titres'

import { titrePermissionAdministrationsCheck } from '../../_permissions/titre-edition'

import fieldsBuild from './_fields-build'

import {
  titreCreate,
  titreDelete,
  titreGet,
  titresCount,
  titresGet,
  titreUpsert
} from '../../../database/queries/titres'
import { userGet } from '../../../database/queries/utilisateurs'

import { titreDocumentsDelete } from './_titre-document'

import titreUpdateTask from '../../../business/titre-update'

import titreUpdationValidate from '../../../business/titre-updation-validate'

const titre = async (
  { id }: { id: string },
  context: IToken,
  info: GraphQLResolveInfo
) => {
  try {
    const fields = fieldsBuild(info)

    const titre = await titreGet(id, { fields }, context.user?.id)
    if (!titre) return null

    const user = context.user && (await userGet(context.user.id))

    return titreFormat(user, titre, fields)
  } catch (e) {
    if (debug) {
      console.error(e)
    }

    throw e
  }
}

const titres = async (
  {
    intervalle,
    page,
    colonne,
    ordre,
    perimetre,
    typesIds,
    domainesIds,
    statutsIds,
    substances,
    noms,
    entreprises,
    references,
    territoires
  }: {
    intervalle?: number | null
    page?: number | null
    colonne?: ITitreColonneId | null
    ordre?: 'asc' | 'desc' | null
    perimetre?: number[] | null
    typesIds: string[]
    domainesIds: string[]
    statutsIds: string[]
    substances: string
    noms: string
    entreprises: string
    references: string
    territoires: string
  },
  context: IToken,
  info: GraphQLResolveInfo
) => {
  try {
    const fields = fieldsBuild(info).elements

    const userId = context.user?.id

    const [titres, total] = await Promise.all([
      titresGet(
        {
          intervalle,
          page,
          colonne,
          ordre,
          perimetre,
          typesIds,
          domainesIds,
          statutsIds,
          substances,
          noms,
          entreprises,
          references,
          territoires
        },
        { fields },
        userId
      ),
      titresCount(
        {
          typesIds,
          domainesIds,
          statutsIds,
          substances,
          noms,
          entreprises,
          references,
          territoires
        },
        { fields },
        userId
      )
    ])

    const user = context.user && (await userGet(context.user.id))
    const titresFormatted = titres && titresFormat(user, titres, fields)

    return {
      elements: titresFormatted,
      page,
      intervalle,
      ordre,
      colonne,
      total
    }
  } catch (e) {
    if (debug) {
      console.error(e)
    }

    throw e
  }
}

const titreCreer = async (
  { titre }: { titre: ITitre },
  context: IToken,
  info: GraphQLResolveInfo
) => {
  try {
    const user = context.user && (await userGet(context.user.id))

    // insert le titre dans la base
    titre = await titreCreate(titre, {}, user?.id)

    const titreUpdatedId = await titreUpdateTask(titre.id)

    const fields = fieldsBuild(info)

    const titreUpdated = await titreGet(titreUpdatedId, { fields }, user?.id)

    return titreUpdated && titreFormat(user, titreUpdated)
  } catch (e) {
    if (debug) {
      console.error(e)
    }

    throw e
  }
}

const titreModifier = async (
  { titre }: { titre: ITitre },
  context: IToken,
  info: GraphQLResolveInfo
) => {
  try {
    const user = context.user && (await userGet(context.user.id))

    if (!user || !permissionCheck(user!.permissionId, ['super', 'admin'])) {
      throw new Error('droits insuffisants')
    }

    const titreOld = await titreGet(titre.id, {}, user.id)
    if (!titreOld) throw new Error("le titre n'existe pas")

    if (
      permissionCheck(user?.permissionId, ['admin']) &&
      (!titrePermissionAdministrationsCheck(
        user,
        titreOld.typeId,
        titreOld.statutId!,
        'modification'
      ) ||
        (titreOld.typeId !== titre.typeId &&
          !titrePermissionAdministrationsCheck(
            user,
            titre.typeId,
            titreOld.statutId!,
            'modification'
          )))
    ) {
      throw new Error('droits insuffisants pour modifier ce type de titre')
    }

    const rulesErrors = await titreUpdationValidate(titre, titreOld)

    if (rulesErrors.length) {
      throw new Error(rulesErrors.join(', '))
    }

    await titreUpsert(titre)

    const titreUpdatedId = await titreUpdateTask(titre.id)

    const fields = fieldsBuild(info)

    const titreUpdated = await titreGet(titreUpdatedId, { fields }, user.id)

    return titreUpdated && titreFormat(user, titreUpdated)
  } catch (e) {
    if (debug) {
      console.error(e)
    }

    throw e
  }
}

const titreSupprimer = async ({ id }: { id: string }, context: IToken) => {
  const user = context.user && (await userGet(context.user.id))

  if (!user || !permissionCheck(user?.permissionId, ['super'])) {
    throw new Error('droits insuffisants')
  }

  const titreOld = await titreGet(id, {}, user.id)

  await titreDocumentsDelete(titreOld)

  return titreDelete(id)
}

export { titre, titres, titreCreer, titreModifier, titreSupprimer }
