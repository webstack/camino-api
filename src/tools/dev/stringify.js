const json = {
  sections: [
    {
      id: 'renseignements',
      elements: [
        {
          id: 'orBrut',
          nom: 'Or brut extrait (g)',
          description:
            'Masse d’or but en sortie de mine extrait au cours du trimestre (exemple : masse sous la forme de concentré gravimétrique).',
          type: 'number'
        },
        {
          id: 'orNet',
          nom: 'Or net extrait (g)',
          description:
            'Masse d’or en gramme obtenue au cours de l’année après traitement métallurgique (au sens de l’<a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021850943&cidTexte=LEGITEXT000006069569" target="_blank" rel="noopener noreferrer">article 318 B de l’annexe II au code général des impôts, annexe 2 </a>). Cette masse sera prise en compte pour le calcul de la taxe sur l’or et des différentes redevances associées.',
          trimestres: [4],
          type: 'number'
        },
        {
          id: 'mercure',
          nom: 'Mercure récupéré (g)',
          description:
            'Masse en gramme de l’ensemble des produits contaminés envoyés en traitement au cours du trimestre.',
          type: 'number'
        },
        {
          id: 'carburantDetaxe',
          nom: 'Carburant détaxé (l)',
          description:
            'Volume total en litre de carburant détaxé consommé au cours du trimestre par les travaux réalisés sur le chantier.',
          type: 'number'
        },
        {
          id: 'carburantConventionnel',
          nom: 'Carburant conventionnel (l)',
          description:
            'Volume total en litre de carburant conventionnel consommé au cours du trimestre par les travaux réalisés sur le chantier.',
          type: 'number'
        },
        {
          id: 'pompes',
          nom: 'Pompes actives',
          description:
            'Nombre moyen de pompes actives au cours du trimestre utilisées sur le chantier (pompe à gravier, pompe de relevage…).',
          type: 'number'
        },
        {
          id: 'pelles',
          nom: 'Pelles actives',
          description:
            'Nombre moyen de pelles actives au cours du trimestre utilisées sur le chantier (aménagement, exploitation, réhabilitation).',
          type: 'number'
        },
        {
          id: 'effectifs',
          nom: 'Effectifs',
          description:
            'Nombre moyen de salariés sur le chantier au cours du trimestre.',
          type: 'number'
        },
        {
          id: 'environnement',
          nom: 'Dépenses relatives à la protection de l’environnement (euros)',
          description:
            'Montant en euros des investissements consentis au cours du trimestre listés à l’<a href="https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021850940&cidTexte=LEGITEXT000006069569" target="_blank" rel="noopener noreferrer">article 318 C de l’annexe II du code général des impôts</a>. Afin de bénéficier des déductions fiscales afférentes, les justificatifs attestant de la réalisation effective des investissements sont susceptibles de vous êtres demandés par l’administration.',
          type: 'number'
        }
      ]
    },
    {
      id: 'travaux',
      nom: 'Statut des travaux',
      elements: [
        {
          type: 'checkbox',
          repetition: 'mois',
          id: 'nom',
          nom: 'nom',
          valeurs: [
            { id: 'nonDebutes', nom: 'Non débutés' },
            {
              id: 'exploitationEnCours',
              nom: 'Exploitation en cours'
            },
            { id: 'arretTemporaire', nom: 'Arrêt temporaire' },
            { id: 'rehabilitation', nom: 'Réhabilitation' },
            {
              id: 'arretDefinitif',
              nom: 'Arrêt définitif (après réhabilitation)'
            }
          ]
        }
      ]
    },
    {
      id: 'complement',
      nom: 'Informations complémentaires',
      elements: [
        {
          id: 'texte',
          type: 'textarea'
        }
      ]
    }
  ]
}

console.log(JSON.stringify(json))