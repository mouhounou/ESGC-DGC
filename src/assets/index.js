import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChalkboardTeacher,
	faBriefcase,
	faCalendarCheck,
	faUserGraduate,
	faHandsHelping,
	faLayerGroup,
	faBuilding,
	faMapLocationDot
} from "@fortawesome/free-solid-svg-icons";

import logo from "./logo.png";
import accueil from "./com.png";
import why from './wh.png'
import compta from './compta.jpeg'
import banque from './Banque.jpg'
import logistique from './logistique.jpg'
import negociation from './Negociation.jpg'
import ressource from './ressource.jpg'
import { formationsTexte } from '../data/content'

export const assets = {
	logo,
   accueil,
   why
};

export const heroImage = negociation;
export const aboutImage = ressource;

// Chiffres et repères clés (section « À propos »)
export const chiffres = [
	{
		titre: "20+ ans",
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



export const footerSections = [
	{
		title: "Comptabilité & Gestion",
		items: [
			"Comptabilité financière",
			"Gestion financière",
			"Audit et contrôle de gestion",
		],
		link: "/location",
	},

	{
		title: "Banque & Assurance",
		items: [
			"Services bancaires",
			"Gestion de crédits",
			"Souscription d'assurances",
			"Gestion des risques",
		],
		link: "/vente",
	},
	{
		title: "Ressources Humaines",
		items: [
			"Recrutement",
			"Gestion des talents",
			"Formation",
			"Gestion de la paie",
		],
		link: "/gestion",
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
		titre: "20 ans d’expérience",
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
 
