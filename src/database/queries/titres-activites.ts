import {
  ITitreActivite,
  IFields,
  IUtilisateur,
  ITitreActiviteColonneId,
  Index,
  IColonne
} from '../../types'

import graphFormat from './graph/format'
import { fieldTitreAdd } from './graph/fields-add'
import graphBuild from './graph/build'

import TitresActivites from '../models/titres-activites'
import options from './_options'
import {
  titreActivitePermissionQueryBuild,
  titreActiviteQueryPropsBuild
} from './permissions/titres-activites'
import { userGet } from './utilisateurs'
import { raw } from 'objection'
import { titresFiltersQueryBuild } from './_titres-filters'

import Objection = require('objection')

const titreActivitesQueryBuild = (
  {
    typesIds,
    statutsIds,
    annees,
    titresNoms,
    titresEntreprises,
    titresSubstances,
    titresReferences,
    titresTerritoires
  }: {
    typesIds?: string[] | null
    statutsIds?: string[] | null
    annees?: number[] | null
    titresNoms?: string | null
    titresEntreprises?: string | null
    titresSubstances?: string | null
    titresReferences?: string | null
    titresTerritoires?: string | null
  },
  { fields }: { fields?: IFields },
  user?: IUtilisateur
) => {
  if (!user?.permissionId) return null

  const graph = fields
    ? graphBuild(fieldTitreAdd(fields), 'activite', graphFormat)
    : options.titresActivites.graph

  const q = TitresActivites.query().withGraphFetched(graph)

  titreActivitePermissionQueryBuild(q, user)
  titreActiviteQueryPropsBuild(q, user)

  q.groupBy('titresActivites.id')

  if (typesIds) {
    q.whereIn('titresActivites.typeId', typesIds)
  }

  if (annees) {
    q.whereIn('titresActivites.annee', annees)
  }

  if (statutsIds) {
    q.whereIn('titresActivites.statutId', statutsIds)
  }

  titresFiltersQueryBuild(
    {
      noms: titresNoms,
      entreprises: titresEntreprises,
      substances: titresSubstances,
      references: titresReferences,
      territoires: titresTerritoires
    },
    q,
    'titre',
    'titresActivites'
  )

  return q
}

const titreActiviteGet = async (
  id: string,
  { fields }: { fields?: IFields },
  userId?: string
) => {
  const user = await userGet(userId)

  const q = titreActivitesQueryBuild({}, { fields }, user)
  if (!q) return undefined

  return (await q.findById(id)) as ITitreActivite
}

const activitesAnneesGet = async (userId?: string) => {
  const user = await userGet(userId)

  if (!user?.permissionId) return []

  const q = TitresActivites.query()

  titreActivitePermissionQueryBuild(q, user, true)

  q.select('annee')
  q.groupBy('annee')
  q.orderBy('annee', 'desc')

  const titreActivites = await q

  return titreActivites.map(ta => ta.annee)
}

const titresActivitesColonnes = {
  titre: {
    id: 'titre.nom',
    relation: 'titre',
    groupBy: true
  },
  titulaires: {
    // trie par concaténation des titulaires du titre de l'activité
    id: raw(`STRING_AGG (
    "titre:titulaires"."nom",
    ';'
    order by "titre:titulaires"."nom"
  )`),
    relation: 'titre.titulaires',
    groupBy: false
  },
  annee: { id: 'annee' },
  periode: { id: 'frequencePeriodeId' },
  statut: { id: 'statutId' }
} as Index<IColonne<string | Objection.RawBuilder>>

const titresActivitesGet = async (
  {
    page,
    intervalle,
    ordre,
    colonne,
    typesIds,
    statutsIds,
    annees,
    titresNoms,
    titresEntreprises,
    titresSubstances,
    titresReferences,
    titresTerritoires
  }: {
    page?: number | null
    intervalle?: number | null
    ordre?: 'asc' | 'desc' | null
    colonne?: ITitreActiviteColonneId | null
    typesIds?: string[] | null
    statutsIds?: string[] | null
    annees?: number[] | null
    titresNoms?: string | null
    titresEntreprises?: string | null
    titresSubstances?: string | null
    titresReferences?: string | null
    titresTerritoires?: string | null
  },
  { fields }: { fields?: IFields },
  userId?: string
) => {
  const user = await userGet(userId)

  const q = titreActivitesQueryBuild(
    {
      typesIds,
      statutsIds,
      annees,
      titresNoms,
      titresEntreprises,
      titresSubstances,
      titresReferences,
      titresTerritoires
    },
    { fields },
    user
  )
  if (!q) return []

  if (colonne) {
    if (titresActivitesColonnes[colonne].relation) {
      q.leftJoinRelated(titresActivitesColonnes[colonne].relation!)
      if (titresActivitesColonnes[colonne].groupBy) {
        q.groupBy(titresActivitesColonnes[colonne].id)
      }
    }
    q.orderBy(titresActivitesColonnes[colonne].id, ordre || 'asc')
  } else {
    q.orderBy('titresActivites.titreId')
  }

  if (page && intervalle) {
    q.offset((page - 1) * intervalle)
  }

  if (intervalle) {
    q.limit(intervalle)
  }

  return q
}

const titresActivitesCount = async (
  {
    typesIds,
    statutsIds,
    annees,
    titresNoms,
    titresEntreprises,
    titresSubstances,
    titresReferences,
    titresTerritoires
  }: {
    typesIds?: string[] | null
    statutsIds?: string[] | null
    annees?: number[] | null
    titresNoms?: string | null
    titresEntreprises?: string | null
    titresSubstances?: string | null
    titresReferences?: string | null
    titresTerritoires?: string | null
  },
  { fields }: { fields?: IFields },
  userId?: string
) => {
  const user = await userGet(userId)

  const q = titreActivitesQueryBuild(
    {
      typesIds,
      statutsIds,
      annees,
      titresNoms,
      titresEntreprises,
      titresSubstances,
      titresReferences,
      titresTerritoires
    },
    { fields },
    user
  )
  if (!q) return 0

  const titresActivites = ((await q) as unknown) as { total: number }[]

  return titresActivites.length
}

const titreActivitesUpsert = async (titreActivites: ITitreActivite[]) =>
  TitresActivites.query()
    .withGraphFetched(options.titresActivites.graph)
    .upsertGraph(titreActivites, { insertMissing: true })

const titreActiviteUpdate = async (
  id: string,
  props: Partial<ITitreActivite>,
  { fields }: { fields?: IFields }
) => {
  const graph = fields
    ? graphBuild(fieldTitreAdd(fields), 'activite', graphFormat)
    : options.titresActivites.graph

  return TitresActivites.query()
    .withGraphFetched(graph)
    .patchAndFetchById(id, props)
}

export {
  titreActiviteGet,
  titresActivitesCount,
  titreActivitesUpsert,
  titresActivitesGet,
  titreActiviteUpdate,
  activitesAnneesGet
}
