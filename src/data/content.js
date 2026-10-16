// Contenus textuels du site, sans import d'image : partagés entre les
// composants React et vite.config.js (balises SEO, JSON-LD, robots, llms.txt).

// Adresse publique du site : à ajuster si le domaine est différent
export const SITE_URL = 'https://esgc.dgc-congo.org'

export const ecole = {
	nom: 'École Supérieure de Commerce et de Gestion',
	sigle: 'ESGC',
	groupe: 'Groupe DGC-Formations SARL',
	description:
		"L'ESGC forme depuis plus de 20 ans aux métiers du commerce et de la gestion à Pointe-Noire (Congo) : comptabilité, ressources humaines, banque et assurance, relation client digitale, logistique et commerce international.",
	adresse: {
		rue: 'Zone industrielle, en face du Lycée Victor Augagneur',
		ville: 'Pointe-Noire',
		region: 'Pointe-Noire',
		pays: 'CG',
		paysNom: 'République du Congo',
	},
	geo: { latitude: -4.7762, longitude: 11.853 },
	telephones: [
		{ libelle: 'Secrétariat', numero: '+242 05 796 08 50', tel: '+242057960850' },
		{ libelle: 'Recrutement', numero: '+242 05 092 74 23', tel: '+242050927423' },
	],
	email: 'contact@dgc-congo.org',
	horaires: [
		{ jours: 'Lundi - Vendredi', ouverture: '08:00', fermeture: '17:00', schema: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
		{ jours: 'Samedi', ouverture: '09:00', fermeture: '13:00', schema: ['Saturday'] },
	],
	reseaux: ['https://www.facebook.com/share/1C9VGo2zxn/'],
}

export const formationsTexte = [
	{
		id: "cg-001",
		titre: "Comptabilité & Gestion",
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

// Questions fréquentes : affichées sur la page (section FAQ) et reprises
// dans le balisage FAQPage pour les moteurs de réponse
export const faq = [
	{
		question: "Quelles formations propose l'ESGC ?",
		reponse: `L'ESGC propose ${formationsTexte.length} formations : ${formationsTexte.map((f) => f.titre).join(', ')}.`,
	},
	{
		question: "Où se trouve l'ESGC ?",
		reponse: `L'ESGC est située à ${ecole.adresse.ville}, ${ecole.adresse.paysNom} : ${ecole.adresse.rue}.`,
	},
	{
		question: "Pourquoi choisir l'ESGC ?",
		reponse:
			"L'ESGC a plus de 20 ans d'expérience à Pointe-Noire. Les formations sont pratiques (cas réels et stages), dans des secteurs qui recrutent, avec des enseignants professionnels et un service qui accompagne les étudiants vers l'emploi après leur diplôme.",
	},
	{
		question: "Quels métiers peut-on exercer après l'ESGC ?",
		reponse: formationsTexte.map((f) => `${f.titre} : ${f.debouches.slice(0, 3).join(', ')}`).join('. ') + '.',
	},
	{
		question: "Dans quels secteurs travaillent les diplômés de l'ESGC ?",
		reponse: `Notamment : ${[...new Set(formationsTexte.flatMap((f) => f.secteurs_employeurs))].join(', ')}.`,
	},
	{
		question: "Comment s'inscrire ou se renseigner ?",
		reponse: `Contactez le service recrutement au ${ecole.telephones[1].numero} ou le secrétariat au ${ecole.telephones[0].numero}, écrivez à ${ecole.email} ou utilisez le formulaire de contact du site. L'école est ouverte du lundi au vendredi de 8h à 17h et le samedi de 9h à 13h.`,
	},
]
