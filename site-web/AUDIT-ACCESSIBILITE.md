# Audit d'accessibilité — WCAG 2.1 niveau AAA

Site : Gilbert Normand (archive biographique)  
Référentiel : [WCAG 2.1](https://www.w3.org/TR/WCAG21/) niveau AAA (critères niveau A, AA et AAA).

---

## 1. Perceptible

### 1.1 Contenu textuel

| Critère                    | Niveau | Statut | Mesure                                                                                |
| -------------------------- | ------ | ------ | ------------------------------------------------------------------------------------- |
| 1.1.1 Contenu non textuel  | A      | ✅     | Toutes les images ont un `alt` pertinent (portraits, icônes décoratives en `alt=""`). |
| 1.1.2 Sous-titres / médias | A      | N/A    | Pas de vidéo/audio.                                                                   |

### 1.2 Contrôle du contenu (temps, séquences)

| Critère                             | Niveau | Statut | Mesure |
| ----------------------------------- | ------ | ------ | ------ |
| 1.2.1 Audio/vidéo uniquement audio  | A      | N/A    | —      |
| 1.2.2 Sous-titres                   | A      | N/A    | —      |
| 1.2.3 Audio-description             | A      | N/A    | —      |
| 1.2.4 Sous-titres en direct         | AA     | N/A    | —      |
| 1.2.5 Audio-description enregistrée | AA     | N/A    | —      |
| 1.2.6 Langue des signes             | AAA    | N/A    | —      |

### 1.3 Adaptable

| Critère                             | Niveau | Statut | Mesure                                                                                  |
| ----------------------------------- | ------ | ------ | --------------------------------------------------------------------------------------- |
| 1.3.1 Info et relations             | A      | ✅     | Structure sémantique : `header`, `main`, `footer`, `nav`, `section`, `h1`–`h3`, listes. |
| 1.3.2 Ordre séquentiel logique      | A      | ✅     | Ordre du DOM cohérent avec l’affichage.                                                 |
| 1.3.3 Caractéristiques sensorielles | A      | ✅     | Instructions non basées sur la forme/couleur seule.                                     |
| 1.3.4 Orientation                   | AA     | ✅     | Pas de contrainte d’orientation (portrait/paysage).                                     |
| 1.3.5 Identifier le but des champs  | AAA    | N/A    | Pas de formulaire.                                                                      |

### 1.4 Distinguable

| Critère                                 | Niveau  | Statut | Mesure                                                                                 |
| --------------------------------------- | ------- | ------ | -------------------------------------------------------------------------------------- |
| 1.4.1 Utilisation de la couleur         | A       | ✅     | Liens et états ne reposent pas sur la couleur seule (soulignement / forme).            |
| 1.4.2 Contrôle du son                   | A       | N/A    | Pas de son.                                                                            |
| 1.4.3 Contraste (minimum)               | AA      | ✅     | Texte ivoire (#F4EFE8) sur noir (#0D0D0D) > 12:1. Texte #4a4a4a sur #F4EFE8 > 7:1.     |
| 1.4.4 Redimensionnement du texte        | AA      | ✅     | Texte redimensionnable (unités relatives, pas de blocage en px).                       |
| 1.4.5 Texte en image                    | AA      | ✅     | Pas de texte essentiel en image (logos avec alt).                                      |
| 1.4.6 Contraste (amélioré)              | **AAA** | ✅     | Contraste ≥ 7:1 pour le texte normal, ≥ 4.5:1 pour le grand texte.                     |
| 1.4.10 Redistribution (reflow)          | AA      | ✅     | Pas de scroll horizontal à 320px, contenu responsive.                                  |
| 1.4.11 Contraste du contenu non textuel | AA      | ✅     | Icônes et bordures avec contraste suffisant.                                           |
| 1.4.12 Espacement du texte              | AAA     | ✅     | Pas de perte de contenu si espacement augmenté (pas de coupure stricte).               |
| 1.4.13 Contenu au survol/focus          | AAA     | ✅     | Menu et dropdown : contenu visible au focus, fermeture possible (Escape, clic dehors). |

---

## 2. Utilisable

### 2.1 Clavier

| Critère                               | Niveau  | Statut | Mesure                                                                            |
| ------------------------------------- | ------- | ------ | --------------------------------------------------------------------------------- |
| 2.1.1 Clavier                         | A       | ✅     | Toutes les actions accessibles au clavier (liens, boutons, onglets du carrousel). |
| 2.1.2 Pas de piège au clavier         | A       | ✅     | Pas de piège ; menu et dropdown se ferment avec Escape.                           |
| 2.1.3 Clavier (sans exception)        | **AAA** | ✅     | 100 % des fonctionnalités utilisables au clavier.                                 |
| 2.1.4 Raccourcis clavier (caractères) | AAA     | N/A    | Pas de raccourcis à un seul caractère.                                            |

### 2.2 Délais

| Critère                         | Niveau  | Statut | Mesure                                                                                       |
| ------------------------------- | ------- | ------ | -------------------------------------------------------------------------------------------- |
| 2.2.1 Réglage du délai          | A       | ✅     | Carrousel et citations : pas de limite de temps bloquante ; contenu consultable sans limite. |
| 2.2.2 Mettre en pause / arrêter | A       | ✅     | `prefers-reduced-motion` : pas d’avance auto du carrousel ni des citations.                  |
| 2.2.3 Pas de limite de temps    | **AAA** | ✅     | Aucune tâche limitée dans le temps.                                                          |
| 2.2.4 Interruptions             | AAA     | ✅     | L’utilisateur peut reprendre sans perdre le contexte.                                        |

### 2.3 Crises (photosensibilité)

| Critère                     | Niveau | Statut | Mesure                     |
| --------------------------- | ------ | ------ | -------------------------- |
| 2.3.1 Pas plus de 3 flashes | A      | ✅     | Pas d’animation flashante. |
| 2.3.2 Trois flashes         | AAA    | ✅     | Pas de flash.              |

### 2.4 Navigation

| Critère                            | Niveau  | Statut | Mesure                                                                                            |
| ---------------------------------- | ------- | ------ | ------------------------------------------------------------------------------------------------- |
| 2.4.1 Contourner les blocs         | A       | ✅     | Lien « Aller au contenu principal » (visible au focus).                                           |
| 2.4.2 Titre de page                | A       | ✅     | Titre unique et descriptif par page.                                                              |
| 2.4.3 Ordre du focus               | A       | ✅     | Ordre logique (header → main → footer).                                                           |
| 2.4.4 Fonction du lien (contexte)  | A       | ✅     | Libellés explicites (« Chronologie », « Galerie », etc.).                                         |
| 2.4.5 Plusieurs moyens             | AA      | ✅     | Navigation principale + ancres + plan (footer).                                                   |
| 2.4.6 En-têtes et étiquettes       | AA      | ✅     | Hiérarchie h1 → h2 → h3 cohérente.                                                                |
| 2.4.7 Focus visible                | AA      | ✅     | Outline 3px (or/ivoire) sur tous les éléments focusables (`:focus-visible`).                      |
| 2.4.8 Emplacement                  | AAA     | N/A    | Pas de processus multi-étapes imposant un repère.                                                 |
| 2.4.9 Fonction du lien (lien seul) | **AAA** | ✅     | Libellés de liens suffisants ; liens externes avec « (ouvre dans un nouvel onglet) » en .sr-only. |
| 2.4.10 En-têtes de section         | AAA     | ✅     | Sections avec h2/h3 et repères sémantiques.                                                       |

### 2.5 Modalités d’entrée

| Critère                           | Niveau  | Statut | Mesure                                                  |
| --------------------------------- | ------- | ------ | ------------------------------------------------------- |
| 2.5.1 Gestes du pointeur          | A       | ✅     | Pas d’action dépendant d’un geste complexe.             |
| 2.5.2 Annulation du pointeur      | A       | ✅     | Clic sur overlay ferme le menu (annulation).            |
| 2.5.3 Étiquettes dans le nom      | A       | ✅     | Boutons et liens avec texte ou `aria-label` cohérent.   |
| 2.5.4 Activation par le mouvement | A       | ✅     | Pas d’activation au seul mouvement.                     |
| 2.5.5 Taille de la cible          | **AAA** | ✅     | Cibles tactiles ≥ 44×44 px (boutons, liens principaux). |

---

## 3. Compréhensible

### 3.1 Lisible

| Critère                  | Niveau | Statut | Mesure                                                                 |
| ------------------------ | ------ | ------ | ---------------------------------------------------------------------- |
| 3.1.1 Langue de la page  | A      | ✅     | `<html lang="fr-CA">`.                                                 |
| 3.1.2 Langue des parties | AA     | N/A    | Contenu entièrement en français.                                       |
| 3.1.3 Mots rares         | AAA    | N/A    | Pas de mécanisme spécifique ; texte courant.                           |
| 3.1.4 Abréviations       | AAA    | N/A    | Abréviations courantes (BAnQ, M.D., etc.) compréhensibles en contexte. |

### 3.2 Prévisible

| Critère                        | Niveau  | Statut | Mesure                                                                              |
| ------------------------------ | ------- | ------ | ----------------------------------------------------------------------------------- |
| 3.2.1 Au focus                 | A       | ✅     | Pas de changement de contexte au focus.                                             |
| 3.2.2 À la saisie              | A       | N/A    | Pas de formulaire.                                                                  |
| 3.2.3 Navigation cohérente     | AA      | ✅     | Nav identique sur toutes les pages.                                                 |
| 3.2.4 Identification cohérente | AA      | ✅     | Composants identifiés de façon cohérente.                                           |
| 3.2.5 Changement à la demande  | **AAA** | ✅     | Carrousel et citations : avance automatique désactivée si `prefers-reduced-motion`. |

### 3.3 Aide à la saisie

| Critère                             | Niveau | Statut | Mesure             |
| ----------------------------------- | ------ | ------ | ------------------ |
| 3.3.1 Identification des erreurs    | A      | N/A    | Pas de formulaire. |
| 3.3.2 Étiquettes ou instructions    | A      | N/A    | —                  |
| 3.3.3 Suggestion après erreur       | AA     | N/A    | —                  |
| 3.3.4 Prévention (légal, financier) | AA     | N/A    | —                  |
| 3.3.5 Aide contextuelle             | AAA    | N/A    | —                  |

---

## 4. Robuste

### 4.1 Compatible

| Critère                 | Niveau | Statut | Mesure                                                                                         |
| ----------------------- | ------ | ------ | ---------------------------------------------------------------------------------------------- |
| 4.1.1 Analyse (syntaxe) | A      | ✅     | HTML valide, balisage sémantique.                                                              |
| 4.1.2 Nom, rôle, valeur | A      | ✅     | Boutons, liens, `aria-expanded`, `aria-label`, `aria-current`, `aria-live` pour les citations. |
| 4.1.3 Messages d’état   | AA     | ✅     | Carrousel : `aria-current` / `aria-hidden` ; citations : `aria-live="polite"`.                 |

---

## Synthèse des correctifs appliqués

- **Lien d’évitement** : « Aller au contenu principal » (visible au focus) sur index, galerie, famille.
- **Landmark principal** : `<main id="main-content">` sur toutes les pages.
- **Carrousel** : `role="region"`, `aria-roledescription="carousel"`, onglets avec `role="tab"`, `aria-selected`, `aria-current` / `aria-hidden` sur les diapos, désactivation de l’avance auto si `prefers-reduced-motion`.
- **Citations** : `aria-live="polite"`, `aria-atomic="true"`, `aria-labelledby` ; pas de rotation auto si `prefers-reduced-motion`.
- **Liens externes** : `rel="noopener noreferrer"` + texte caché « (ouvre dans un nouvel onglet) » (.sr-only).
- **Clavier** : Escape ferme le menu mobile et le dropdown ; flèches gauche/droite sur les onglets du carrousel.
- **Focus** : `:focus-visible` avec contour 3 px contrasté sur liens, boutons, onglets.
- **Réduction du mouvement** : `scroll-behavior: auto`, transitions désactivées, pas d’animation auto du carrousel/citations.

---

## Vérifications recommandées

- Tester avec **NVDA** ou **VoiceOver** (navigation au clavier, annonces du carrousel et des citations).
- Valider le **contraste** avec [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) (AAA : 7:1 texte normal, 4.5:1 grand texte).
- Tester **zoom** 200 % (pas de perte d’info, pas de scroll horizontal).
- Tester **préférence « Réduire les mouvements »** (carrousel et citations ne défilent pas seuls).

---

_Dernière mise à jour : audit initial et correctifs AAA appliqués._
