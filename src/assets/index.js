import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChalkboardTeacher,
	faBriefcase,
	faCalendarCheck,
	faUserGraduate,
	faHandsHelping
} from "@fortawesome/free-solid-svg-icons";

import logo from "./logo.png";
import accueil from "./com.png";
import why from './wh.png'
export const assets = {
	logo,
   accueil,
   why
};
import compta from './compta.jpeg'
import banque from './Banque.jpg'
import logistique from './logistique.jpg'
import negociation from './Negociation.jpg'
import ressource from './ressource.jpg'



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

export const formations = [
	{
		id: "cg-001",
		titre: "Comptabilité & Gestion",
		image: compta,
		description:
			"Formation de professionnels capables d'enregistrer, d'analyser et d'interpréter les opérations financières.",
		modules: [
			"Comptabilité financière",
			"Gestion financière",
			"Audit et contrôle de gestion",
		],
		debouches: [
			"Comptable",
			"Contrôleur de gestion",
			"Auditeur financier",
			"Expert-comptable",
			"Responsable administratif et financier",
		],
		secteurs_employeurs: [
			"Cabinets comptables et d'audit",
			"Entreprises privées",
			"Banques et institutions financières",
			"Administration publique",
		],
	},
	{
		id: "grh-002",
		titre: "Gestion des Ressources Humaines",
		image: ressource,
		description:
			"Formation aux activités liées à la gestion du capital humain au sein des organisations.",
		modules: [
			"Recrutement",
			"Gestion des talents",
			"Formation",
			"Gestion de la paie",
		],
		debouches: [
			"Assistant(e) Ressources Humaines",
			"Chargé(e) de recrutement",
			"Chargé(e) des relations sociales",
			"Gestionnaire de la paie",
		],
		secteurs_employeurs: [
			"Banques et assurances",
			"Industries pétrolières et minières",
			"Télécommunications",
			"Grandes entreprises et multinationales",
		],
	},
	{
		id: "ba-003",
		titre: "Banque & Assurance",
		image: banque,
		description:
			"Préparation aux métiers liés à la finance et à la protection des biens et des personnes.",
		modules: [
			"Services bancaires",
			"Gestion de crédits",
			"Souscription d'assurances",
			"Gestion des risques",
		],
		debouches: [
			"Conseiller Clientèle",
			"Chargé(e) de Gestion des Crédits",
			"Conseiller en Gestion de Patrimoine",
			"Conseiller en Assurance",
			"Chargé(e) de Souscription",
			"Gestionnaire de Sinistres",
		],
		secteurs_employeurs: [
			"Banques",
			"Assurances",
			"Institutions financières",
		],
	},
	{
		id: "ndrc-004",
		titre: "Négociation et Digitalisation de la Relation Client",
		image: negociation,
		description:
			"Formation de professionnels capables de gérer, fidéliser et développer la clientèle.",
		modules: [
			"Négociation commerciale",
			"Outils numériques",
			"Marketing digital",
			"Gestion de la relation client",
		],
		debouches: [
			"Chargé de clientèle",
			"Commercial digital",
			"Responsable service client",
			"Business Developer",
		],
		secteurs_employeurs: [
			"Banques et assurances",
			"Entreprises de télécommunications",
			"Start-ups et e-commerce",
			"Agences de communication",
		],
	},
	{
		id: "ltci-005",
		titre: "Logistique, Transport & Commerce International",
		image: logistique,
		description:
			"Formation à la gestion des flux de marchandises, de services et d'informations à l'échelle locale et internationale.",
		modules: [
			"Gestion logistique",
			"Organisation des transports",
			"Commerce international",
			"Douanes",
		],
		debouches: [
			"Gestionnaire de chaîne d'approvisionnement",
			"Responsable logistique et transport",
			"Agent de transit et de douane",
			"Responsable des achats et import-export",
			"Consultant en commerce international",
			"Gestionnaire des opérations douanières",
		],
		secteurs_employeurs: [
			"Entreprises de transport",
			"Commerce international",
			"Douanes",
			"Logistique industrielle",
		],
	},
]; 
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
 
