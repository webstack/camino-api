import titreDemarchePhasesFilter from './titre-demarche-phases-filter'

import {
  titreDemarcheMut,
  titreDemarcheOctRej,
  titreDemarcheOctDpuInexistante,
  titreDemarcheMutDateFinAcc,
  titreDemarcheMutDureeAcc,
  titreDemarcheOctDpuAcc,
  titreDemarcheOctDpuRej,
  titreAxmDemarcheOctDexAcc,
  titreAxmDemarcheOctDexRej,
  titrePrmDemarcheOctRpuAcc,
  titrePrmDemarcheOctRpuRej,
  titreDemarcheProDpuAcc,
  titreDemarchePro1DpuAcc,
  titreDemarchePro2DpuAcc,
  titreDemarchePreDpuAcc
} from './__mocks__/titre-demarche-phases-filter-demarches'

describe('retourne si la démarche donne lieu à une étape ou non', () => {
  test('une démarche de mutation sans étape ne donne pas lieu à une phase', () => {
    expect(titreDemarchePhasesFilter(titreDemarcheMut)).toBeFalsy()
  })

  test("une démarche d'octroi dont le statut n'est pas accepté ne donne pas lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarcheOctRej)).toBeFalsy()
  })

  test("une démarche d'octroi qui n'a pas d'étape de dpu ne donne pas lieu à une phase", () => {
    expect(
      titreDemarchePhasesFilter(titreDemarcheOctDpuInexistante)
    ).toBeFalsy()
  })

  test("une démarche de mutation dont l'étape de dpu contient une date de fin donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarcheMutDateFinAcc)).toBeTruthy()
  })

  test("une démarche de mutation dont l'étape de dpu contient une durée donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarcheMutDureeAcc)).toBeTruthy()
  })

  test("une démarche d'octroi dont l'étape de dpu est acceptée donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarcheOctDpuAcc)).toBeTruthy()
  })

  test("une démarche d'octroi dont l'étape de dpu n'est pas acceptée ne donne pas lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarcheOctDpuRej)).toBeFalsy()
  })

  test("une démarche d'octroi dont l'étape de dex est acceptée pour un titre AXM donne lieu à une phase", () => {
    expect(
      titreDemarchePhasesFilter(titreAxmDemarcheOctDexAcc, 'axm')
    ).toBeTruthy()
  })

  test("une démarche d'octroi dont l'étape de dex n'est pas acceptée pour un titre AXM ne donne pas lieu à une phase", () => {
    expect(
      titreDemarchePhasesFilter(titreAxmDemarcheOctDexRej, 'axm')
    ).toBeFalsy()
  })

  test("une démarche d'octroi dont l'étape de rpu est acceptée pour un titre PRM donne lieu à une phase", () => {
    expect(
      titreDemarchePhasesFilter(titrePrmDemarcheOctRpuAcc, 'prm')
    ).toBeTruthy()
  })

  test("une démarche d'octroi dont l'étape de rpu n'est pas acceptée pour un titre PRM ne donne pas lieu à une phase", () => {
    expect(
      titreDemarchePhasesFilter(titrePrmDemarcheOctRpuRej, 'prm')
    ).toBeFalsy()
  })

  test("une démarche de prolongation dont l'étape de dpu est acceptée donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarcheProDpuAcc)).toBeTruthy()
  })

  test("une démarche de première prolongation dont l'étape de dpu est acceptée donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarchePro1DpuAcc)).toBeTruthy()
  })

  test("une démarche de deuxième prolongation dont l'étape de dpu est acceptée donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarchePro2DpuAcc)).toBeTruthy()
  })

  test("une démarche de prolongation exceptionnelle dont l'étape de dpu est acceptée donne lieu à une phase", () => {
    expect(titreDemarchePhasesFilter(titreDemarchePreDpuAcc)).toBeTruthy()
  })
})
