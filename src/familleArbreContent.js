// Arbre généalogique complet — exporté pour famille.js
export const familleArbreHTML = `
  <!-- Section – Arbre par générations -->
  <section id="arbre-generations" class="ej-timeline-section ej-stammbaum-section">
    <div class="ej-container">
      <div class="ej-header">
        <h2 class="ej-title ej-section-title-archival">
          <span class="ej-section-number">Chapitre 02</span>
          <span class="ej-hud-mark"></span>
          ARBRE PAR GÉNÉRATIONS
        </h2>
        <div class="ej-subtitle ej-military-subtitle">Une représentation simplifiée des générations</div>
      </div>

      <div class="ej-stammbaum-grid ej-tree-container">
        <!-- Génération XIIIe : Petits-enfants -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="13">
          <div class="ej-stammbaum-generation-label">XIIIe Génération — Petits-enfants</div>
          <div class="ej-stammbaum-descendants-wrapper ej-stammbaum-petits-enfants-3cols">
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="francois">
              <div class="ej-stammbaum-person-name">Charles-Albert Normand</div>
              <div class="ej-stammbaum-person-role">Petit-fils de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fils de François Normand.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="francois">
              <div class="ej-stammbaum-person-name">Christophe Normand</div>
              <div class="ej-stammbaum-person-role">Petit-fils de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fils de François Normand.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="marie-josee">
              <div class="ej-stammbaum-person-name">Émile Dubois</div>
              <div class="ej-stammbaum-person-role">Petit-fils de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fils de Marie-Josée Normand.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="marie-josee">
              <div class="ej-stammbaum-person-name">Laurence Normand</div>
              <div class="ej-stammbaum-person-role">Petite-fille de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fille de Marie-Josée Normand.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="marie-josee">
              <div class="ej-stammbaum-person-name">Charlize</div>
              <div class="ej-stammbaum-person-role">Petite-fille de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fille de Marie-Josée Normand.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="david">
              <div class="ej-stammbaum-person-name">Mika Anctil</div>
              <div class="ej-stammbaum-person-role">Petit-fils de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fils de David Anctil.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="david">
              <div class="ej-stammbaum-person-name">James Anctil</div>
              <div class="ej-stammbaum-person-role">Petit-fils de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fils de David Anctil.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-parent="david">
              <div class="ej-stammbaum-person-name">Océanne Anctil</div>
              <div class="ej-stammbaum-person-role">Petite-fille de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fille de David Anctil.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations XIII et XII -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="13" data-to="12"></div>

        <!-- Génération XIIe : Descendance de Gilbert -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="12">
          <div class="ej-stammbaum-generation-label">XIIe Génération — Descendance</div>
          <div class="ej-stammbaum-parents-wrapper ej-stammbaum-descendants-3cols">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="francois" data-parent="gilbert" data-children="charles-albert,christophe">
              <div class="ej-stammbaum-person-name">François Normand</div>
              <div class="ej-stammbaum-person-dates">Né le 26 mai 1981 —</div>
              <div class="ej-stammbaum-person-role">Fils de Gilbert Normand et Line Anctil</div>
              <div class="ej-stammbaum-person-notes">
                Père de Charles-Albert et Christophe Normand.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marie-josee" data-parent="gilbert" data-children="emile,laurence,charlize">
              <div class="ej-stammbaum-person-name">Marie-Josée Normand</div>
              <div class="ej-stammbaum-person-dates">Née le 11 août — Québec</div>
              <div class="ej-stammbaum-person-role">Fille de Gilbert Normand et Lucie Charland</div>
              <div class="ej-stammbaum-person-notes">
                Mère de Laurence Normand, Émile Dubois, Charlize.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="david" data-parent="line" data-children="mika,james,oceanne">
              <div class="ej-stammbaum-person-name">David Anctil</div>
              <div class="ej-stammbaum-person-dates">1979 —</div>
              <div class="ej-stammbaum-person-role">Fils de Line Anctil</div>
              <div class="ej-stammbaum-person-notes">
                Père de Mika, James et Océanne Anctil.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations XII et XI -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="12" data-to="11"></div>

        <!-- Génération XIe : Gilbert Normand -->
        <div class="ej-stammbaum-generation ej-stammbaum-generation-center ej-tree-generation" data-generation="11">
          <div class="ej-stammbaum-generation-label">XIe Génération — Gilbert Normand</div>
          <div class="ej-stammbaum-couple-image-wrapper">
            <img src="/images/arbre/Line_Anctil_Gilbert_Normand.jpg" alt="Line Anctil et Gilbert Normand - Photo de couple, épouse du médecin et député fédéral de Montmagny" class="ej-stammbaum-couple-image">
          </div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-center ej-tree-node ej-tree-node-center" data-id="gilbert" data-parent="marcelin,marguerite" data-children="francois,marie-josee">
              <div class="ej-stammbaum-person-content-wrapper">
                <div class="ej-stammbaum-person-avatar">
                  <img src="/images/arbre/Gilbert_Normand.jpg" alt="Gilbert Normand - Portrait du médecin, maire de Montmagny et député fédéral (1943-2025)" class="ej-stammbaum-avatar-img">
                </div>
                <div class="ej-stammbaum-person-content">
                  <div class="ej-stammbaum-person-name">Gilbert Normand</div>
                  <div class="ej-stammbaum-person-dates">1943-03-31 — 2025-01-01</div>
                  <div class="ej-stammbaum-person-role">Médecin, maire de Montmagny, député fédéral, secrétaire d'État</div>
                  <div class="ej-stammbaum-person-notes">
                    Né à Montmagny, Québec. Personnage central de cette archive. La majorité du site est consacrée à son parcours de vie publique et personnelle.
                  </div>
                  <a href="/" class="person-archive-link" data-person-id="gilbert" data-person-name="Gilbert Normand">
                    <span>Voir l'archive</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="line" data-children="david">
              <div class="ej-stammbaum-person-content-wrapper">
                <div class="ej-stammbaum-person-avatar">
                  <img src="/images/arbre/Line_Anctil.jpg" alt="Line Anctil - Épouse de Gilbert Normand, esthéticienne et passionnée par l'art" class="ej-stammbaum-avatar-img">
                </div>
                <div class="ej-stammbaum-person-content">
                  <div class="ej-stammbaum-person-name">Line Anctil</div>
                  <div class="ej-stammbaum-person-dates">1956-07-21 —</div>
                  <div class="ej-stammbaum-person-role">Épouse de Gilbert Normand, esthéticienne et passionnée par l'art, elle est une mère dévouée et un soutien constant.</div>
                  <div class="ej-stammbaum-person-notes">
                    Née à Saint-Damase. Présente tout au long du parcours de Gilbert Normand, elle fut un pilier essentiel de sa vie familiale et professionnelle. Par son soutien constant, sa force tranquille et son engagement, elle a largement contribué à la réussite et à l'équilibre de son mari.
                  </div>
                  <a href="#" class="person-archive-link" data-person-id="line" data-person-name="Line Anctil">
                    <span>Voir l'archive</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Génération XIe : Frères et sœurs de Gilbert -->
        <div class="ej-stammbaum-generation ej-tree-generation ej-tree-siblings-generation" data-generation="11-siblings">
          <div class="ej-stammbaum-generation-label">XIe Génération — Frères et sœurs</div>
          <div class="ej-stammbaum-parents-wrapper ej-stammbaum-sisters-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node ej-tree-sibling" data-parent="marcelin,marguerite">
              <div class="ej-stammbaum-person-name">Marie Normand</div>
              <div class="ej-stammbaum-person-role">Sœur de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fille de Marcelin Normand et Marguerite Clapperton.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node ej-tree-sibling" data-parent="marcelin,marguerite">
              <div class="ej-stammbaum-person-name">Élaine Normand</div>
              <div class="ej-stammbaum-person-role">Sœur de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fille de Marcelin Normand et Marguerite Clapperton.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node ej-tree-sibling" data-parent="marcelin,marguerite">
              <div class="ej-stammbaum-person-name">Monique Normand</div>
              <div class="ej-stammbaum-person-role">Sœur de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Fille de Marcelin Normand et Marguerite Clapperton.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations XI et X -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="11" data-to="10"></div>

        <!-- Génération Xe : Parents de Gilbert -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="10">
          <div class="ej-stammbaum-generation-label">Xe Génération — Parents</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marcelin" data-parent="edouard,amanda" data-children="gilbert,marie,elaine,monique">
              <div class="ej-stammbaum-person-name">Marcelin Normand</div>
              <div class="ej-stammbaum-person-dates">1919-01-09 —</div>
              <div class="ej-stammbaum-person-role">Père de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Marié à Marguerite Clapperton.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marguerite" data-children="gilbert,marie,elaine,monique">
              <div class="ej-stammbaum-person-name">Marguerite Clapperton</div>
              <div class="ej-stammbaum-person-dates">—</div>
              <div class="ej-stammbaum-person-role">Mère de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">
                Mariée à Marcelin Normand.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations X et IX -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="10" data-to="9"></div>

        <!-- Génération IXe : Grands-parents -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="9">
          <div class="ej-stammbaum-generation-label">IXe Génération — Grands-parents</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="edouard" data-parent="romuald,aurelie" data-children="marcelin">
              <div class="ej-stammbaum-person-name">Édouard Normand</div>
              <div class="ej-stammbaum-person-dates">1883-12-15 — 1936-01-04</div>
              <div class="ej-stammbaum-person-role">Grand-père paternel — Mécanicien</div>
              <div class="ej-stammbaum-person-notes">
                Né à Montmagny le 15/12/1883. Fils de Romuald Normand et Aurélie Labonté. Marié le 16/07/1906 à Montmagny à Marie (Amanda) Corriveau. Décédé à l'Hôtel-Dieu de Montmagny le 04/01/1936. Père de 9 enfants.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="amanda" data-children="marcelin">
              <div class="ej-stammbaum-person-name">Marie (Amanda) Corriveau</div>
              <div class="ej-stammbaum-person-dates">1885-09-22 — 1972-05-13</div>
              <div class="ej-stammbaum-person-role">Grand-mère paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née le 22/09/1885 à St-Thomas de Montmagny. Fille de Xavier Corriveau et Mary Fortier. Mariée le 16/07/1906 à Montmagny à Édouard Normand. Décédée à l'Hôtel-Dieu de Montmagny le 13/05/1972. Mère de 9 enfants.
              </div>
            </div>
          </div>
        </div>

        <!-- Génération VIIIe : Frères et sœurs d'Édouard -->
        <div class="ej-stammbaum-generation">
          <div class="ej-stammbaum-generation-label">VIIIe Génération — Frères et sœurs d'Édouard</div>
          <div class="ej-stammbaum-siblings-wrapper">
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Léon Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Bernadette Normand</div>
              <div class="ej-stammbaum-person-role">Sœur d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Ida Normand</div>
              <div class="ej-stammbaum-person-role">Sœur d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Raoul Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Aurélien Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Ernest Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Marius Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Amidée Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Gustave Normand</div>
              <div class="ej-stammbaum-person-role">Frère d'Édouard</div>
            </div>
          </div>
        </div>

        <!-- Génération IXe : Oncles et tantes (enfants d'Édouard) -->
        <div class="ej-stammbaum-generation">
          <div class="ej-stammbaum-generation-label">IXe Génération — Oncles et tantes (frères et sœurs de Marcelin)</div>
          <div class="ej-stammbaum-siblings-wrapper">
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Jules-Aimé Normand</div>
              <div class="ej-stammbaum-person-dates">1907-09-01 — 1965-06-11</div>
              <div class="ej-stammbaum-person-role">Oncle de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Né à Montmagny. Marié à Lauretta Garant. Décédé à Montmagny.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Maurice Normand</div>
              <div class="ej-stammbaum-person-dates">1908-01-03 — 1976-04-12</div>
              <div class="ej-stammbaum-person-role">Oncle de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Né à Montmagny. Marié à Isabelle Trancheur. Décédé à l'Hôpital Général d'Ottawa, inhumé à Hull.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Bernadette Normand</div>
              <div class="ej-stammbaum-person-dates">1910-03-26 — 1964-07-11</div>
              <div class="ej-stammbaum-person-role">Tante de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Née à Montmagny. Décédée à Montmagny.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Louis-Georges Normand</div>
              <div class="ej-stammbaum-person-dates">1912-02-13 — 1979-03-16</div>
              <div class="ej-stammbaum-person-role">Oncle de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Né à Montmagny. Marié à Lucie Lemieux-Bernier. Décédé à Québec.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Elmina Normand</div>
              <div class="ej-stammbaum-person-dates">1914-02-23 — 1985-09-11</div>
              <div class="ej-stammbaum-person-role">Tante de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Née à Montmagny. Décédée à Montmagny.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Candide Normand</div>
              <div class="ej-stammbaum-person-dates">1915-11-05 —</div>
              <div class="ej-stammbaum-person-role">Oncle de Gilbert — Chanoine</div>
              <div class="ej-stammbaum-person-notes">Né à Montmagny. Ordonné prêtre à la Basilique de Québec le 07/06/1941.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Jean-Marie Normand</div>
              <div class="ej-stammbaum-person-dates">1917-09-22 — 1917-09-24</div>
              <div class="ej-stammbaum-person-role">Oncle de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Né à Montmagny le 22/09/1917. Décédé à Montmagny le 24/09/1917.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Marcelin Normand</div>
              <div class="ej-stammbaum-person-dates">1919-01-09 —</div>
              <div class="ej-stammbaum-person-role">Père de Gilbert Normand</div>
              <div class="ej-stammbaum-person-notes">Né à Montmagny. Marié à Marguerite Clapperton.</div>
            </div>
            <div class="ej-stammbaum-person-card ej-stammbaum-person-card-small">
              <div class="ej-stammbaum-person-name">Rita Normand</div>
              <div class="ej-stammbaum-person-dates">1922-05-25 —</div>
              <div class="ej-stammbaum-person-role">Tante de Gilbert</div>
              <div class="ej-stammbaum-person-notes">Née à Montmagny. Mariée à Robert Lessard.</div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations IX et VII -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="9" data-to="7"></div>

        <!-- Génération VIIe : Arrière-grands-parents -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="7">
          <div class="ej-stammbaum-generation-label">VIIe Génération — Arrière-grands-parents</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="romuald" data-parent="alexis,emerence" data-children="edouard">
              <div class="ej-stammbaum-person-name">Louis-Romuald Normand</div>
              <div class="ej-stammbaum-person-dates">1849-05-20 — 1920-02-05</div>
              <div class="ej-stammbaum-person-role">Arrière-grand-père paternel — Manufacturier</div>
              <div class="ej-stammbaum-person-notes">
                Né à St-Thomas de Montmagny le 20/05/1849. Fils d'Alexis Normand et Émérence Théberge. Marié le 27/09/1880 à Montmagny (St-Thomas) à Aurélie Labonté. Inhumé à St-Thomas le 05/02/1920. Père de 10 enfants.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="aurelie" data-children="edouard">
              <div class="ej-stammbaum-person-name">Aurélie Labonté (Pageau dit Labonté)</div>
              <div class="ej-stammbaum-person-dates">1853-09-05 — 1902-04-11</div>
              <div class="ej-stammbaum-person-role">Arrière-grand-mère paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née à St-Thomas le 05/09/1853. Fille de Jean Labonté et Marie Fournier. Fille adoptive de M. Pageau (d'où "Pageau dit Labonté"). Mariée le 27/09/1880 à Montmagny (St-Thomas) à Louis-Romuald Normand. Décédée à Montmagny le 11/04/1902. Mère de 10 enfants.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations VII et VI -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="7" data-to="6"></div>

        <!-- Génération VIe : Aïeuls -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="6">
          <div class="ej-stammbaum-generation-label">VIe Génération — Aïeuls</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="alexis" data-parent="jean-baptiste,marie-reine" data-children="romuald">
              <div class="ej-stammbaum-person-name">Alexis Normand</div>
              <div class="ej-stammbaum-person-dates">1801-08-28 — 1880-12-19</div>
              <div class="ej-stammbaum-person-role">Aïeul paternel</div>
              <div class="ej-stammbaum-person-notes">
                Né à Montmagny – St-Thomas le 28/08/1801. Fils de J.-Baptiste Normand et Marie-Reine Frégeault. Marié le 12/04/1831 à St-François de Montmagny à Émérence Théberge. Inhumé à St-Thomas le 19/12/1880. Père de 14 enfants : Alexis, Philomène, Théophile, Fabienne, Pierre-Élisée, Louis-Romuald, Jean-Baptiste, Anselme, Élisabeth, Richard Auguste, Louis-Romuald (2e), Marie, etc.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="emerence" data-children="romuald">
              <div class="ej-stammbaum-person-name">Émérence Théberge</div>
              <div class="ej-stammbaum-person-dates">—</div>
              <div class="ej-stammbaum-person-role">Aïeule paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née à St-François de Montmagny. Fille de Louis Théberge et Marguerite Baquet. Mariée le 12/04/1831 à St-François de Montmagny à Alexis Normand. Inhumée à St-Thomas (date non indiquée). Mère de 14 enfants.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations VI et V -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="6" data-to="5"></div>

        <!-- Génération Ve : Ancêtres -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="5">
          <div class="ej-stammbaum-generation-label">Ve Génération — Ancêtres</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="jean-baptiste" data-parent="joseph,marie-charlotte" data-children="alexis">
              <div class="ej-stammbaum-person-name">Jean-Baptiste Normand</div>
              <div class="ej-stammbaum-person-dates">1759-01-30 — 1833-04-07</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternel</div>
              <div class="ej-stammbaum-person-notes">
                Né à St-Thomas le 30/01/1759. Fils de Joseph Normand et M.-Charlotte Lavallée. Marié en premières noces le 10/01/1786 à St-Thomas de Montmagny à Marie-Reine Frégeault (6 enfants : J.-Baptiste, Charlotte, Olivier, Louis Alexis, Marie-Louise, et un autre enfant non nommé). Remarié en secondes noces le 06/05/1806 à Montmagny (St-Thomas) à Rosalie Bernachez (2 enfants : Marguerite et Honoré). Inhumé à St-Thomas le 07/04/1833.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marie-reine" data-children="alexis">
              <div class="ej-stammbaum-person-name">Marie-Reine Frégeault</div>
              <div class="ej-stammbaum-person-dates">1763 — 1805-03-06</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née en 1763. Fille de Pierre-Louis Frégeault et Marie-Louise Kemmeur dit Labranche. Mariée en premières noces le 10/01/1786 à St-Thomas de Montmagny à Jean-Baptiste Normand. Inhumée à St-Thomas le 06/03/1805. Mère de 6 enfants.
              </div>
            </div>
          </div>
        </div>

        <!-- Remariage de Jean-Baptiste Normand -->
        <div class="ej-stammbaum-generation">
          <div class="ej-stammbaum-generation-label">Ve Génération — Remariage de Jean-Baptiste Normand</div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card">
              <div class="ej-stammbaum-person-name">Rosalie Bernachez</div>
              <div class="ej-stammbaum-person-dates">—</div>
              <div class="ej-stammbaum-person-role">Deuxième épouse de Jean-Baptiste Normand</div>
              <div class="ej-stammbaum-person-notes">
                Mariée en secondes noces le 06/05/1806 à Montmagny (St-Thomas) à Jean-Baptiste Normand. Mère de 2 enfants : Marguerite et Honoré.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations V et IV -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="5" data-to="4"></div>

        <!-- Génération IVe : Ancêtres -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="4">
          <div class="ej-stammbaum-generation-label">IVe Génération — Ancêtres</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="joseph" data-parent="charles,marie-anne" data-children="jean-baptiste">
              <div class="ej-stammbaum-person-name">Joseph Normand</div>
              <div class="ej-stammbaum-person-dates">1737-01-11 — 1797-06-25</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternel</div>
              <div class="ej-stammbaum-person-notes">
                Né à Charlesbourg le 11/01/1737, baptisé le 12/01/1737. Fils de Charles Le Normand et Marie-Anne Jorian. Marié le 24/08/1750 à Notre-Dame de Québec à Marie-Charlotte Lavallée. Inhumé à St-Thomas de Montmagny le 25/06/1797. Premier Normand à acheter et occuper une terre à Montmagny. La terre fut possédée par son fils Adrien Normand (né le 16/01/1792), puis vendue à Eugène Fournier, qui la transféra à son fils Joseph-Eugène Fournier. Numéros du cadastre : 884 et 283. Terre située entre le 4e rang de L'Islet et la Rivière-du-Sud. Père de 7 enfants.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marie-charlotte" data-children="jean-baptiste">
              <div class="ej-stammbaum-person-name">Marie-Charlotte Lavallée</div>
              <div class="ej-stammbaum-person-dates">1733-10-03 —</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née à Québec le 03/10/1733. Fille de Charles Lavallée et Marie-Josephte Parent. Mariée le 24/08/1750 à Notre-Dame de Québec à Joseph Normand. Inhumée (date non indiquée). Mère de 7 enfants.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations IV et III -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="4" data-to="3"></div>

        <!-- Génération IIIe : Ancêtres -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="3">
          <div class="ej-stammbaum-generation-label">IIIe Génération — Ancêtres</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="charles" data-parent="joseph-le-normand,marie-choret" data-children="joseph">
              <div class="ej-stammbaum-person-name">Charles Le Normand</div>
              <div class="ej-stammbaum-person-dates">1697-05-10 —</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternel</div>
              <div class="ej-stammbaum-person-notes">
                Né et baptisé à Québec le 10/05/1697. Fils de Joseph Le Normand et Marie Choret. Marié le 01/02/1735 à Notre-Dame de Québec à Marie-Anne Jorian. Inhumé (date non indiquée). Père de 3 enfants : Joseph, Jean-André, Pierre-Hyacinthe.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marie-anne" data-children="joseph">
              <div class="ej-stammbaum-person-name">Marie-Anne Jorian</div>
              <div class="ej-stammbaum-person-dates">1702-06-03 —</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née à Québec le 03/06/1702. Fille de André Jorian et Barbe Albert. Mariée le 01/02/1735 à Notre-Dame de Québec à Charles Le Normand. Inhumée (date non indiquée). Mère de 3 enfants.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations III et II -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="3" data-to="2"></div>

        <!-- Génération IIe : Ancêtres -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="2">
          <div class="ej-stammbaum-generation-label">IIe Génération — Ancêtres</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="joseph-le-normand" data-parent="jean-le-normand,anne-le-laboureur" data-children="charles">
              <div class="ej-stammbaum-person-name">Joseph Le Normand</div>
              <div class="ej-stammbaum-person-dates">1669-01-18 — 1735</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternel</div>
              <div class="ej-stammbaum-person-notes">
                Né à Québec le 18/01/1669. Fils de Jean Le Normand et Anne Le Laboureur. Marié en premières noces le 05/08/1691 à Québec à Marie-Madeleine Tréfflé (1 enfant : Joseph, né 12/06/1692, décédé 19/05/1693). Marié en secondes noces le 29/10/1693 à Québec à Marie Choret (10 enfants). Sépulture à Québec vers 1735. Habitait de la Canardière, près du passage de la rivière St-Charles.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="marie-choret" data-children="charles">
              <div class="ej-stammbaum-person-name">Marie Choret</div>
              <div class="ej-stammbaum-person-dates">1673-01-31 — 1733-05-13</div>
              <div class="ej-stammbaum-person-role">Ancêtre paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Née à Ste-Famille, Île d'Orléans, le 31/01/1673. Fille de Robert Choret et Marie-Madeleine Paradis. Mariée en secondes noces le 29/10/1693 à Québec à Joseph Le Normand. Inhumée à Québec le 13/05/1733. Mère de 10 enfants : M. Madeleine, Charles, Angélique-Catherine, Joseph, Hélène, Jean, Jacques, Geneviève, Marie-Thérèse, François, Marie-Madeleine.
              </div>
            </div>
          </div>
        </div>

        <!-- Connexion entre générations II et I -->
        <div class="ej-tree-connector ej-tree-connector-vertical" data-from="2" data-to="1"></div>

        <!-- Génération Ière : Ancêtres fondateurs -->
        <div class="ej-stammbaum-generation ej-tree-generation" data-generation="1">
          <div class="ej-stammbaum-generation-label">Ière Génération — Ancêtres fondateurs</div>
          <!-- Ligne horizontale pour le couple -->
          <div class="ej-tree-connector ej-tree-connector-horizontal ej-tree-couple-connector"></div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="jean-le-normand" data-children="joseph-le-normand">
              <div class="ej-stammbaum-person-name">Jean Le Normand</div>
              <div class="ej-stammbaum-person-dates">1638 — 1706-02-23</div>
              <div class="ej-stammbaum-person-role">Ancêtre fondateur — Ière génération au Canada</div>
              <div class="ej-stammbaum-person-notes">
                Né en France, à Digé, au Perche, en 1638. Fils de Gervais Le Normand et Eléonore Janet. Marié le 18/07/1656 à Notre-Dame de Québec à Anne Le Laboureur (12 enfants). Sépulture à Québec le 23/02/1706. Remarié en secondes noces le 22/05/1700 à Québec avec Marie-Madeleine Brassard, veuve de Louis Fontaine. Elle fut inhumée le 27/09/1717 dans l'église des Récollets, à Québec.
              </div>
            </div>
            <div class="ej-stammbaum-person-card ej-tree-node" data-id="anne-le-laboureur" data-children="joseph-le-normand">
              <div class="ej-stammbaum-person-name">Anne Le Laboureur</div>
              <div class="ej-stammbaum-person-dates">1630 — 1700</div>
              <div class="ej-stammbaum-person-role">Ancêtre fondatrice</div>
              <div class="ej-stammbaum-person-notes">
                Née en France, à Caën, en Normandie, en 1630. Fille de Thomas Le Laboureur et de Marguerite Bardin. Mariée le 18/07/1656 à Notre-Dame de Québec à Jean Le Normand. Sépulture à Québec vers 1700. Mère de 12 enfants : Marie, Marie, Marie, Anne, Jean, Charles, Jacques, François, Suzanne, Joseph, Jeanne-Françoise, Geneviève, Louis.
              </div>
            </div>
          </div>
        </div>

        <!-- Souche française -->
        <div class="ej-stammbaum-generation">
          <div class="ej-stammbaum-generation-label">Souche en France</div>
          <div class="ej-stammbaum-parents-wrapper">
            <div class="ej-stammbaum-person-card">
              <div class="ej-stammbaum-person-name">Gervais Le Normand</div>
              <div class="ej-stammbaum-person-role">Souche paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Marié à Eléonore Janet, de la ville de Digé près de Bellême, au Perche, en France. Ils ne sont pas venus au Canada.
              </div>
            </div>
            <div class="ej-stammbaum-person-card">
              <div class="ej-stammbaum-person-name">Eléonore Janet</div>
              <div class="ej-stammbaum-person-role">Souche paternelle</div>
              <div class="ej-stammbaum-person-notes">
                Mariée à Gervais Le Normand, de la ville de Digé près de Bellême, au Perche, en France.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
`
