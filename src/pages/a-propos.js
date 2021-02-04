import React from "react"
import Layout from "../components/layout"

const AproposPage = ({ location }) => {
  return (
    <Layout location={location} banner={true} bannerText="A PROPOS">
      <div>
        <h1>À propos de Liffré-Piéla</h1>
        <h3>L'association</h3>
        <p>
          Créée en 1978, l'association vient en aide à la région de Piéla située
          au Nord du Burkina Faso. Les Habitants vivent principalement
          d'agriculture et d'élevage. Ce pays et cette région sont très
          défavorisés en raison du climat et du manque de ressources naturelles.
        </p>
        <h3>Nos domaines d'intervention</h3>
        <ul>
          <li>
            L'accès à l'eau potable:
            <ul>
              <li>Création et amménagement de forages</li>
            </ul>
          </li>
          <li>
            L'accès à l'éducation et à l'instruction
            <ul>
              <li>
                Construction de salles de classe pour l'enseignement public de
                Piéla: primaire, collège, lycée
              </li>
              <li>Construction de logements pour enseignants</li>
              <li>Construction de sanitaires pour les scolaires</li>
            </ul>
          </li>
          <li>
            La lutte contre la faim par l'achat de mil pour les familles les
            plus defavorisées afin de lutter contre la spéculation
          </li>
          <li>
            À partir de 2015, la participation au fonctionnement d'un
            dispensaire à Piéla
          </li>
        </ul>
        <p>
          Tous ces projet sont suivis par l'<b>ADDESP</b> (<b>A</b>ssociation{" "}
          <b>D</b>épartementale pour le <b>D</b>éveloppement <b>E</b>
          conomique et <b>S</b>ocial de la région de <b>P</b>iéla), notre
          interlocuteur sur place.
        </p>
        <h3>Nos ressource financières</h3>
        <ol>
          <li>
            La participation municipale: elle correspond au 1/1000e du budget de
            fonctionnement de la ville de Liffré
          </li>
          <li>Adhésions et dons (170 adhérents)</li>
          <li>
            Les diverses manifestations organisées tout au long de l'année:
            <ul>
              <li>Bol de riz</li>
              <li>Foire aux végétaux, aux jouets, aux livres</li>
              <li>Vente d’objets africains</li>
              <li>Organisation du vide-greniers en septembre</li>
              <li>
                Diverses autres activités d'Associations et des Ecoles
                liffréennes
              </li>
              <li>Culture d'un champ de pommes de terre</li>
            </ul>
          </li>
        </ol>
      </div>
    </Layout>
  )
}

export default AproposPage
