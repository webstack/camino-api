/* eslint-disable no-undef */
import { FileUpload } from 'graphql-upload'

interface IFields {
  [key: string]: IFields
}

interface Index<T> {
  [id: string]: T
}

interface IColonne<T> {
  id: T
  relation?: string
  groupBy?: boolean | T | T[]
}

type TitreProp =
  | 'pointsTitreEtapeId'
  | 'titulairesTitreEtapeId'
  | 'amodiatairesTitreEtapeId'
  | 'administrationsTitreEtapeId'
  | 'substancesTitreEtapeId'
  | 'communesTitreEtapeId'
  | 'surfaceTitreEtapeId'

type TitreEtapeProp =
  | 'points'
  | 'titulaires'
  | 'amodiataires'
  | 'administrations'
  | 'substances'
  | 'communes'
  | 'surface'

type ITitreColonneId = 'nom' | 'domaine' | 'type' | 'statut' | 'activites'

type ITitreDemarcheColonneId =
  | 'titreNom'
  | 'titreDomaine'
  | 'titreType'
  | 'titreStatut'
  | 'type'
  | 'statut'

type ITitreActiviteColonneId = 'titreNom' | 'titulaire' | 'periode' | 'statut'

type IUtilisateursColonneId = 'nom' | 'prenom' | 'email' | 'permission' | 'lien'
type IEntrepriseColonneId = 'nom' | 'siren'

interface IActiviteStatut {
  id: string
  nom: string
  couleur: string
}

interface ISection {
  id: string
  nom: string
  elements?: ISectionElement[] | null
}

type IValeurMetasNom = 'devises' | 'unites'

type ISectionElementType =
  | 'number'
  | 'text'
  | 'date'
  | 'textarea'
  | 'checkbox'
  | 'checkboxes'
  | 'select'
  | 'radio'

interface ISectionElement {
  id: string
  nom: string
  type: ISectionElementType
  description?: string | null
  dateDebut?: string | null
  dateFin?: string | null
  frequencePeriodesIds?: number[] | null
  valeurs?: { id: string; nom: string }[] | null
  valeursMetasNom?: IValeurMetasNom
}

interface ITitreSection {
  sectionId: string
  elementId: string
}

interface IActiviteType {
  id: string
  nom: string
  frequenceId: string
  dateDebut: string
  delaiMois: number
  titresTypes: ITitreType[]
  sections?: ISection[] | null
  frequence?: IFrequence | null
  pays?: IPays[] | null
  administrations?: IAdministration[] | null
}

interface IAdministrationType {
  id: string
  nom: string
  ordre: number
}

interface IAdministration {
  id: string
  typeId: string
  nom: string
  type: IAdministrationType
  service?: string | null
  url?: string | null
  email?: string | null
  telephone?: string | null
  adresse1?: string | null
  adresse2?: string | null
  codePostal?: string | null
  commune?: string | null
  cedex?: string | null
  departementId?: string | null
  regionId?: string | null
  abreviation?: string | null
  titresTypes?: ITitreType[] | null
  utilisateurs?: IUtilisateur[] | null
  titresAdministrationGestionnaire?: ITitre[] | null
  titresAdministrationLocale?: ITitre[] | null
  associee?: boolean | null
  membre?: boolean
}

interface IAnnee extends IPeriode {}

interface ICommune {
  id: string
  nom: string
  departement?: IDepartement | null
  departementId?: string | null
  surface?: number | null
}

type IContenuValeur = string | number | string[] | boolean

interface IContenu {
  [id: string]: IContenuElement
}

interface IContenuElement {
  [id: string]: IContenuValeur
}

interface ITitrePropsTitreEtapesIdsValeur {
  [elementId: string]: string
}

interface ITitrePropsTitreEtapesIds {
  [sectionId: string]: ITitrePropsTitreEtapesIdsValeur
}

interface ICoordonnees {
  x: number
  y: number
}

interface IDemarcheStatut {
  id: string
  nom: string
  couleur: string
}

interface IDemarcheType {
  id: string
  nom: string
  ordre: number
  duree?: boolean | null
  points?: boolean | null
  substances?: boolean | null
  titulaires?: boolean | null
  renouvelable?: boolean | null
  exception?: boolean | null
  etapesTypes: IEtapeType[]
  titreTypeId?: string | null
  unique?: boolean | null
  demarchesCreation?: boolean | null
}

interface IDepartement {
  id: string
  nom: string
  region?: IRegion | null
  regionId?: string | null
  communes?: ICommune[] | null
}

interface IDevise {
  id: string
  nom: string
  ordre: number
}

type IDocumentRepertoire = 'etapes' | 'activites' | 'entreprises'

interface IDocumentType {
  id: string
  nom: string
  repertoire: IDocumentRepertoire
}

interface IDomaine {
  id: string
  nom: string
  ordre: number
  titresTypes: ITitreType[]
  titresCreation: boolean
}

interface IEntrepriseEtablissement {
  id: string
  entrepriseId: string
  dateDebut: string
  nom?: string | null
  legalSiret?: string | null
  dateFin?: string | null
}

interface IEntreprise {
  id: string
  nom: string
  paysId?: string | null
  legalSiren?: string | null
  legalEtranger?: string | null
  legalForme?: string | null
  categorie?: string | null
  dateCreation?: string | null
  adresse?: string | null
  codePostal?: string | null
  commune?: string | null
  cedex?: string | null
  email?: string | null
  telephone?: string | null
  url?: string | null
  etablissements?: IEntrepriseEtablissement[] | null
  utilisateurs?: IUtilisateur[] | null
  titresTitulaire?: ITitre[] | null
  titresAmodiataire?: ITitre[] | null
  modification?: boolean | null
}

interface IEtapeStatut {
  id: string
  nom: string
  couleur: string
}

interface IEtapeType {
  id: string
  nom: string
  ordre: number
  acceptationAuto?: boolean | null
  fondamentale?: boolean | null
  dateDebut?: string | null
  dateFin?: string | null
  sections?: ISection[] | null
  sectionsSpecifiques?: ISection[] | null
  etapesStatuts?: IEtapeStatut[] | null
  titreTypeId?: string | null
  demarcheTypeId?: string | null
  etapesCreation?: boolean | null
  unique?: boolean | null
}

interface IFrequence {
  id: string
  nom: string
  periodesNom: 'annees' | 'trimestres' | 'mois'
  annees?: IAnnee[] | null
  trimestres?: ITrimestre[] | null
  mois?: IMois[] | null
}

interface IGeoJson {
  type: string
  geometry?: IGeometry | null
  bbox?: number[] | null
  properties: { [id: string]: string | number }
  features?: IGeoJson[] | null
}

interface IGeometry {
  type: string
  coordinates: number[] | number[][] | number[][][] | number[][][][]
}

interface IGeoSysteme {
  id: string
  definitionProj4: string
  nom: string
  ordre: number
  uniteId?: string | null
  unite: IUnite
  zone?: string | null
}

interface IGlobale {
  id: string
  valeur: boolean
}

interface IMois extends IPeriode {
  trimestreId?: string | null
  trimestre?: ITrimestre | null
}

interface IPays {
  id: string
  nom: string
  regions?: IRegion[] | null
}

interface IPeriode {
  id: number
  nom: string
  frequenceId: string
  frequence: IFrequence
}

type IPermissionId =
  | 'super'
  | 'admin'
  | 'editeur'
  | 'lecteur'
  | 'entreprise'
  | 'defaut'

interface IPermission {
  id: IPermissionId
  nom: string
  ordre: number
}

interface IPhaseStatut {
  id: string
  nom: string
  couleur: string
}

interface IReferenceType {
  id: string
  nom: string
}

interface IRegion {
  id: string
  nom: string
  pays?: IPays | null
  departements?: IDepartement[] | null
}

interface IAutorisationEtapeType {
  etapeTypeId: string
  publicLecture: boolean
  entreprisesLecture: boolean
}

interface IAutorisationTitreTypeTitreStatut {
  titreTypeId: string
  titreStatutId: string
  publicLecture: boolean
}

interface IAutorisationTitreTypeAdministration {
  administrationId: string
  titreTypeId: string
  gestionnaire: boolean
  associee: boolean
}

interface IRestrictionTitreTypeTitreStatutAdministration {
  administrationId: string
  titreTypeId: string
  titreStatutId: string
  titresModificationInterdit: boolean
  demarchesModificationInterdit: boolean
  etapesModificationInterdit: boolean
}

interface IRestrictionTitreTypeEtapeTypeAdministration {
  administrationId: string
  titreTypeId: string
  etapeTypeId: string
  creationInterdit: boolean
  lectureInterdit: boolean
  modificationInterdit: boolean
}

interface ITitreStatut {
  id: string
  nom: string
  couleur: string
  ordre: number
}

interface ISubstanceLegaleCode {
  id: string
  nom: string
  description?: string | null
  lien: string
}

interface ISubstanceLegale {
  id: string
  nom: string
  domaineId?: string | null
  description?: string | null
  substanceLegalCodeId?: string | null
  domaine?: IDomaine | null
  code?: ISubstanceLegaleCode | null
}

interface ISubstance {
  id: string
  nom?: string | null
  symbole?: string | null
  gerep?: number | null
  description?: string | null
  substanceLegaleId: string
  substanceLegale: ISubstanceLegale
}

interface ITitre {
  id: string
  nom: string
  domaineId: string
  domaine?: IDomaine | null
  typeId: string
  type?: ITitreType | null
  statutId?: string | null
  statut?: ITitreStatut | null
  references?: ITitreReference[] | null
  dateDebut?: string | null
  dateFin?: string | null
  dateDemande?: string | null
  activitesDeposees?: number | null
  activitesEnConstruction?: number | null
  activitesAbsentes?: number | null
  substancesTitreEtapeId?: string | null
  substances?: ISubstance[] | null
  pointsTitreEtapeId?: string | null
  points?: ITitrePoint[] | null
  geojsonMultiPolygon?: IGeoJson | null
  geojsonPoints?: IGeoJson | null
  titulairesTitreEtapeId?: string | null
  titulaires?: IEntreprise[] | null
  amodiatairesTitreEtapeId?: string | null
  amodiataires?: IEntreprise[] | null
  administrationsTitreEtapeId?: string | null
  administrationsLocales?: IAdministration[] | null
  administrationsGestionnaires?: IAdministration[] | null
  administrations?: IAdministration[] | null
  surfaceTitreEtapeId?: string | null
  surfaceEtape?: ITitreEtape | null
  surface?: number | null
  communesTitreEtapeId?: string | null
  communes?: ICommune[] | null
  demarches?: ITitreDemarche[] | null
  activites?: ITitreActivite[] | null
  pays?: IPays[] | null
  modification?: boolean | null
  suppression?: boolean | null
  doublonTitreId?: string | null
  publicLecture?: boolean | null
  entreprisesLecture?: boolean | null
  propsTitreEtapesIds?: ITitrePropsTitreEtapesIds | null
  contenu?: IContenu | null
}

interface ITitreActivite {
  id: string
  titreId: string
  titre?: ITitre | null
  date: string
  typeId: string
  type?: IActiviteType | null
  statutId: string
  statut?: IActiviteStatut | null
  frequencePeriodeId: number
  annee: number
  periode?: IAnnee | ITrimestre | IMois | null
  utilisateurId: string
  utilisateur?: IUtilisateur | null
  dateSaisie?: string
  contenu?: IContenu | null
  sections?: ISection[] | null
  modification?: boolean | null
  documentsCreation?: boolean | null
}

interface ITitreAdministrationsGestionnaire {
  administrationId: string
  titreId: string
  associee?: boolean | null
}

interface ITitreAdministrationLocale {
  administrationId: string
  titreEtapeId: string
  associee?: boolean | null
  coordinateur?: boolean | null
}

interface ITitreCommune {
  communeId: string
  titreEtapeId: string
  surface?: number | null
}

interface ITitreEtapeJustificatif {
  documentId: string
  titreEtapeId: string
}

interface ITitreDemarche {
  id: string
  titreId: string
  titre?: ITitre | null
  typeId: string
  type?: IDemarcheType | null
  statutId?: string | null
  statut?: IDemarcheStatut | null
  ordre?: number | null
  annulationTitreDemarcheId?: string | null
  titreType?: ITitreType | null
  etapes?: ITitreEtape[] | null
  phase?: ITitrePhase | null
  annulationDemarche?: ITitreDemarche | null
  parents?: ITitreDemarche[] | null
  enfants?: ITitreDemarche[] | null
  publicLecture?: boolean | null
  entreprisesLecture?: boolean | null
  modification?: boolean | null
  etapesCreation?: boolean | null
  suppression?: boolean | null
}

interface IDocument {
  id: string
  typeId: string
  date: string
  description?: string | null
  type?: IDocumentType | null
  fichier?: boolean | null
  fichierTypeId?: string | null
  fichierNouveau?: { file: FileUpload } | null
  url?: string | null
  uri?: string | null
  jorf?: string | null
  nor?: string | null
  publicLecture?: boolean | null
  entreprisesLecture?: boolean | null
  titreEtapeId?: string | null
  etape?: ITitreEtape | null
  titreActiviteId?: string | null
  activite?: ITitreActivite | null
  entrepriseId?: string | null
  entreprise?: IEntreprise | null
  etapesAssociees?: ITitreEtape[] | null
}

interface ITitreEtape {
  id: string
  titreDemarcheId: string
  typeId: string
  type?: IEtapeType | null
  statutId: string
  statut?: IEtapeStatut | null
  ordre?: number | null
  date: string
  dateDebut?: string | null
  dateFin?: string | null
  duree?: number | null
  surface?: number | null
  contenu?: IContenu | null
  substances?: ISubstance[] | null
  points?: ITitrePoint[] | null
  geojsonMultiPolygon?: IGeoJson | null
  geojsonPoints?: IGeoJson | null
  titulaires?: IEntreprise[] | null
  amodiataires?: IEntreprise[] | null
  administrations?: IAdministration[] | null
  documents?: IDocument[] | null
  justificatifs?: IDocument[] | null
  communes?: ICommune[] | null
  incertitudes?: ITitreIncertitudes | null
  pays?: IPays[] | null
  modification?: boolean | null
  suppression?: boolean | null
}

interface ITitreEtapeFiltre {
  typeId: string
  statutId?: string
  dateDebut?: string
  dateFin?: string
}

interface ITitreIncertitudes {
  titreEtapeId: string
  date?: boolean | null
  dateDebut?: boolean | null
  dateFin?: boolean | null
  duree?: boolean | null
  surface?: boolean | null
  points?: boolean | null
  substances?: boolean | null
  titulaires?: boolean | null
  amodiataires?: boolean | null
  administrations?: boolean | null
}

interface ITitrePhase {
  titreDemarcheId: string
  statutId: string
  dateDebut: string
  dateFin: string
  statut?: IPhaseStatut
}

interface ITitrePoint {
  id: string
  titreEtapeId: string
  nom?: string | null
  description?: string | null
  groupe: number
  contour: number
  point: number
  references: ITitrePointReference[]
  coordonnees: ICoordonnees
  lot?: number | null
  securite?: boolean | null
  subsidiaire?: boolean | null
}

interface ITitrePointReference {
  id: string
  titrePointId: string
  geoSystemeId: string
  geoSysteme?: IGeoSysteme | null
  coordonnees: ICoordonnees
  opposable?: boolean | null
}

interface ITitreReference {
  titreId: string
  typeId: string
  nom: string
  type?: IReferenceType | null
}

interface ITrimestre extends IPeriode {
  mois?: IMois[]
}

interface ITitreType {
  id: string
  domaineId: string
  typeId: string
  archive?: boolean | null
  type: ITitreTypeType
  demarchesTypes?: IDemarcheType[] | null
  autorisationsTitresStatuts?: IAutorisationTitreTypeTitreStatut[] | null
  propsEtapesTypes?: ITitreSection[] | null
  sections?: ISection[] | null
  gestionnaire?: boolean | null
  associee?: boolean | null
  titresCreation?: boolean | null
}

interface ITitreTypeType {
  id: string
  nom: string
  ordre: number
  exploitation?: boolean | null
}

interface ITitreTypeDemarcheTypeEtapeType {
  titreTypeId: string
  demarcheTypeId: string
  etapeTypeId: string

  sections?: ISection[] | null
  ordre: number
}

interface IUnite {
  id: string
  nom: string
  symbole: string
}

interface IUser extends IUtilisateur {
  sections: { [id: string]: boolean }
}

interface IUtilisateur {
  id: string
  email?: string | null
  motDePasse?: string | null
  nom?: string | null
  prenom?: string | null
  telephoneFixe?: string | null
  telephoneMobile?: string | null
  permissionId: IPermissionId
  // TODO: définir une interface IUtilisateurPreferences
  preferences?: any | null
  permission: IPermission
  administrations?: IAdministration[] | null
  entreprises?: IEntreprise[] | null
  modification?: boolean | null
  suppression?: boolean | null
  permissionModification?: boolean | null
}

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type IUtilisateurCreation = PartialBy<Omit<IUtilisateur, 'id'>, 'permissionId'>

interface IToken {
  user?: ITokenUser
}

interface ITokenUser {
  id: string
  email: string
  iat: number
}

interface ITitreEtapeCondition {
  typeId: string
  statutId?: string
}

interface ITitreCondition {
  statutId?: string
  contenu: IContenu
}

interface ICondition {
  etape: ITitreEtapeCondition
  titre?: ITitreCondition
}

interface ITitreTypeEtapeTypeRestriction {
  condition: ICondition
  obligatoireApres?: ITitreEtapeCondition[]
  impossibleAvant?: ITitreEtapeCondition[]
  impossibleApres?: ITitreEtapeCondition[]
  impossible?: true
}

type IFormat = 'xlsx' | 'csv' | 'ods' | 'geojson' | 'json' | 'pdf'

interface ITelechargement {
  __typename: 'Telechargement'
  contenu: string
  nom: string
  taille: number
  type: string
  ordre: string
  colonne: string
  total: number
}

interface IDefinition {
  id: string
  nom: string
  table?: string
  description?: string
  couleur?: string
  elements?: IDefinition[]
}

export {
  Index,
  IFields,
  IFormat,
  IActiviteStatut,
  IActiviteType,
  ISection,
  ISectionElement,
  IAdministration,
  IAdministrationType,
  IAnnee,
  ICommune,
  IContenu,
  IContenuElement,
  IContenuValeur,
  ITitrePropsTitreEtapesIds,
  ICoordonnees,
  IDemarcheStatut,
  IDemarcheType,
  IDepartement,
  IDevise,
  IDocumentType,
  IDocumentRepertoire,
  IDomaine,
  IEntreprise,
  IEntrepriseEtablissement,
  IEtapeStatut,
  IEtapeType,
  IFrequence,
  IGeoJson,
  IGeometry,
  IGeoSysteme,
  IGlobale,
  IMois,
  IPays,
  IPermission,
  IPermissionId,
  IPeriode,
  IPhaseStatut,
  IReferenceType,
  IRegion,
  IAutorisationTitreTypeTitreStatut,
  IAutorisationEtapeType,
  IAutorisationTitreTypeAdministration,
  IRestrictionTitreTypeTitreStatutAdministration,
  IRestrictionTitreTypeEtapeTypeAdministration,
  ITitreStatut,
  ISubstance,
  ISubstanceLegale,
  ISubstanceLegaleCode,
  ITitre,
  ITitreActivite,
  ITitreAdministrationsGestionnaire,
  ITitreAdministrationLocale,
  ITitreCommune,
  ITitreDemarche,
  IDocument,
  ITitreEtape,
  ITitreEtapeJustificatif,
  ITitreEtapeFiltre,
  ITitreIncertitudes,
  ITitrePhase,
  ITitrePoint,
  ITitrePointReference,
  ITitreReference,
  ITitreType,
  ITitreTypeType,
  ITitreTypeDemarcheTypeEtapeType,
  ITrimestre,
  IUnite,
  IUser,
  IUtilisateur,
  IUtilisateurCreation,
  TitreProp,
  TitreEtapeProp,
  IToken,
  ITokenUser,
  ITitreColonneId,
  ITitreDemarcheColonneId,
  ITitreActiviteColonneId,
  IUtilisateursColonneId,
  IEntrepriseColonneId,
  IColonne,
  ITitreTypeEtapeTypeRestriction,
  ITitreEtapeCondition,
  ITitreCondition,
  ITelechargement,
  IDefinition
}
