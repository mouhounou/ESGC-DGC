// Pictogrammes animés des repères clés, sous le hero (SVG + CSS, préfixe ab-).
// Règle CSS : la position se fait sur un <g transform> parent, l'animation sur un <g> enfant.

const C = {
   first: '#2e659e',
   second: '#e29317',
   deep: '#173a5e',
   light: '#e6edf6',
   line: '#d5e0ec',
   skin: '#7a4a2e',
}

const Halo = ({ x = 100, y = 62, r = 44, couleur = C.first }) => <circle cx={x} cy={y} r={r} fill={couleur} opacity={0.1} />

const Eclat = ({ x, y, retard }) => (
   <g transform={`translate(${x} ${y})`}>
      <g className="ab-eclat" style={{ animationDelay: retard }}>
         <path d="M0,-6 V6 M-6,0 H6" stroke={C.second} strokeWidth={2.2} strokeLinecap="round" />
      </g>
   </g>
)

// 21 ans : la page « 20 » du calendrier se soulève et dévoile « 21 »
function Annees() {
   const chiffre = (n) => (
      <text x={30} y={60} textAnchor="middle" fontSize={30} fontWeight={800} fill={C.deep}>
         {n}
      </text>
   )
   return (
      <>
         <Halo />
         <g transform="translate(70 22)">
            <rect width={60} height={78} rx={8} fill="#fff" stroke={C.line} />
            <path d="M0,8 A8,8 0 0 1 8,0 H52 A8,8 0 0 1 60,8 V20 H0 Z" fill={C.second} />
            <text x={30} y={14.5} textAnchor="middle" fontSize={9} fontWeight={800} fill="#fff" letterSpacing={1}>
               ANS
            </text>
            {chiffre('21')}
            <g className="ab-page">
               <rect y={20} width={60} height={58} fill="#fff" stroke={C.line} />
               {chiffre('20')}
            </g>
            {[16, 44].map((x) => (
               <circle key={x} cx={x} cy={0} r={3.5} fill={C.deep} />
            ))}
         </g>
         <Eclat x={58} y={34} retard="0s" />
         <Eclat x={146} y={28} retard="0.15s" />
         <Eclat x={150} y={88} retard="0.3s" />
      </>
   )
}

// 5 filières : cinq plaques s'empilent l'une après l'autre
const COUCHES = [C.deep, C.first, C.second, C.first, C.deep]
function Filieres() {
   return (
      <>
         <Halo y={60} />
         {COUCHES.map((couleur, i) => (
            <g key={i} transform={`translate(64 ${94 - i * 12})`}>
               <g className="ab-couche" style={{ animationDelay: `${i * 0.28}s` }}>
                  <path d="M0,0 L36,-14 L72,0 L36,14 Z" fill={couleur} stroke="#fff" strokeWidth={1.5} strokeLinejoin="round" />
               </g>
            </g>
         ))}
         <g transform="translate(150 34)">
            <g className="ab-badge">
               <circle r={13} fill={C.second} />
               <text y={4.5} textAnchor="middle" fontSize={13} fontWeight={800} fill="#fff">
                  5
               </text>
            </g>
         </g>
      </>
   )
}

// Stages : l'étudiant entre dans l'entreprise, les bureaux s'allument
function Stages() {
   return (
      <>
         <Halo x={120} />
         <line x1={20} y1={104} x2={186} y2={104} stroke={C.line} strokeWidth={2} strokeLinecap="round" />
         <g transform="translate(112 26)">
            <rect width={60} height={78} rx={4} fill={C.deep} />
            <rect x={-4} y={-4} width={68} height={8} rx={3} fill={C.first} />
            {Array.from({ length: 12 }, (_, i) => {
               const x = 8 + (i % 3) * 17
               const y = 10 + Math.floor(i / 3) * 14
               return (
                  <g key={i} transform={`translate(${x} ${y})`}>
                     <rect width={10} height={8} rx={1.5} fill="#fff" opacity={0.18} />
                     <g className="ab-fenetre" style={{ animationDelay: `${(i * 0.37) % 2.6}s` }}>
                        <rect width={10} height={8} rx={1.5} fill={C.second} />
                     </g>
                  </g>
               )
            })}
            <rect x={23} y={62} width={14} height={16} rx={2} fill={C.second} />
         </g>
         {/* l'étudiant marche jusqu'à la porte */}
         <g transform="translate(36 78)">
            <g className="ab-marche">
               <g className="ab-jambe-g">
                  <rect x={-4} y={12} width={4} height={14} rx={2} fill={C.deep} />
               </g>
               <g className="ab-jambe-d">
                  <rect x={1} y={12} width={4} height={14} rx={2} fill={C.deep} />
               </g>
               <rect x={-6} y={-4} width={13} height={18} rx={5} fill={C.first} />
               <circle cx={0.5} cy={-10} r={6} fill={C.skin} />
               <rect x={6} y={6} width={9} height={7} rx={1.5} fill={C.second} />
            </g>
         </g>
      </>
   )
}

// Pointe-Noire : l'épingle tombe sur la ville, au bord de l'océan
function Carte() {
   return (
      <>
         <rect width={200} height={120} fill={C.first} opacity={0.14} />
         {[30, 58, 86].map((y, i) => (
            <g key={y} transform={`translate(10 ${y})`}>
               <g className="ab-vague" style={{ animationDelay: `${i * 0.5}s` }}>
                  <path d="M0,0 q6,-4 12,0 t12,0 t12,0" stroke="#fff" strokeOpacity={0.7} strokeWidth={2} fill="none" strokeLinecap="round" />
               </g>
            </g>
         ))}
         <path d="M78,0 C66,26 88,44 72,66 C60,84 80,104 74,120 L200,120 L200,0 Z" fill={C.light} />
         <path d="M96,20 L190,48 M90,78 L196,70 M130,0 L120,120" stroke="#fff" strokeWidth={4} />
         <g transform="translate(124 74)">
            <ellipse rx={12} ry={4} fill={C.deep} opacity={0.15} />
            <g className="ab-onde">
               <ellipse rx={10} ry={3.5} fill="none" stroke={C.second} strokeWidth={1.6} />
            </g>
         </g>
         <g transform="translate(124 50)">
            <g className="ab-pin">
               <path d="M0,24 C-10,10 -14,4 -14,-3 A14,14 0 1 1 14,-3 C14,4 10,10 0,24 Z" fill={C.second} />
               <circle cy={-3} r={5.5} fill="#fff" />
            </g>
         </g>
         <g transform="translate(160 104)">
            <rect x={-30} y={-9} width={60} height={18} rx={9} fill="#fff" />
            <text y={4} textAnchor="middle" fontSize={8.5} fontWeight={700} fill={C.deep}>
               Pointe-Noire
            </text>
         </g>
      </>
   )
}

const SCENES = [Annees, Filieres, Stages, Carte]

export default function ChiffreScene({ index, label }) {
   const Scene = SCENES[index]
   if (!Scene) return null
   return (
      <svg viewBox="0 0 200 120" className="chiffre-scene w-full h-auto" role="img" aria-label={label}>
         <Scene />
      </svg>
   )
}
