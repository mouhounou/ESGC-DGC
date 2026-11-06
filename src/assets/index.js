import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChalkboardTeacher,
	faBriefcase,
	faCalendarCheck,
	faUserGraduate,
	faHandsHelping,
	faLayerGroup,
	faBuilding,
	faMapLocationDot,
	faListCheck,
	faFolderOpen,
	faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

import logo from "./logo.png";
import compta from './compta.jpeg'
import banque from './Banque.jpg'
import logistique from './logistique.jpg'
import negociation from './Negociation.jpg'
import ressource from './ressource.jpg'
import { formationsTexte } from '../data/content'

export const assets = {
	logo
};

export const heroImage = negociation;

// Chiffres et repères clés (cartes animées sous le hero)
export const chiffres = [
	{
		titre: "21 ans",
		description: "D'expérience dans la formation au commerce et à la gestion.",
		icone: faCalendarCheck,
	},
	{
		titre: "5 filières",
		description: "Des parcours spécialisés dans des secteurs qui recrutent.",
		icone: faLayerGroup,
	},
	{
		titre: "Stages",
		description: "Des cas réels et des stages en entreprise tout au long du cursus.",
		icone: faBuilding,
	},
	{
		titre: "Pointe-Noire",
		description: "Un campus facile d'accès, face au Lycée Victor Augagneur.",
		icone: faMapLocationDot,
	},
];




// Formations : textes dans src/data/content.js, images ici
const imagesFormations = {
	"cg-001": compta,
	"grh-002": ressource,
	"ba-003": banque,
	"ndrc-004": negociation,
	"ltci-005": logistique,
}

export const formations = formationsTexte.map((f) => ({ ...f, image: imagesFormations[f.id] }))
 
export const raisons = [
	{
		titre: "Des formations pratiques",
		description: "On apprend en faisant, avec des cas réels et des stages.",
		icone: faChalkboardTeacher,
	},
	{
		titre: "Des filières utiles pour l’emploi",
		description:
			"Comptabilité, RH, Banque, Digital, Logistique… des secteurs qui recrutent.",
		icone: faBriefcase,
	},
	{
		titre: "21 ans d’expérience",
		description:
			"Une école reconnue, solide et bien implantée à Pointe-Noire.",
		icone: faCalendarCheck,
	},
	{
		titre: "Des profs qualifiés",
		description: "Des enseignants professionnels et proches des étudiants.",
		icone: faUserGraduate,
	},
	{
		titre: "Aide pour trouver un emploi",
		description:
			"Un service qui accompagne les étudiants après leur diplôme.",
		icone: faHandsHelping,
	},
	// {
	// 	titre: "Un campus bien situé",
	// 	description:
	// 		"Facile d’accès, face au Lycée Victor Augagneur, dans un bon cadre d’étude.",
	// 	icone: faMapMarkerAlt,
	// },
];
 

// Étapes de candidature (section Candidature, même parcours que sur le site de l'ESIT)
export const etapes = [
	{
		titre: "Choisissez votre filière",
		description: `Parcourez nos ${formationsTexte.length} filières et leurs débouchés pour trouver la voie qui vous correspond.`,
		icon: faListCheck,
	},
	{
		titre: "Préparez votre dossier",
		description: "Rassemblez les pièces demandées selon votre niveau d'entrée. Notre secrétariat vous en donne la liste.",
		icon: faFolderOpen,
	},
	{
		titre: "Déposez votre candidature",
		description: "Déposez votre dossier au secrétariat de l'ESGC, en face du Lycée Victor Augagneur à Pointe-Noire.",
		icon: faPaperPlane,
	},
];
