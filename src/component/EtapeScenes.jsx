import { createContext, useContext, useSyncExternalStore } from 'react'

// Scènes animées (SVG) des étapes de candidature, sur le modèle du site du CCPM :
// chaque personnage accomplit l'action de l'étape.
// - gestes des bras : animations SVG natives (<animate>), l'épaule reste fixe ;
// - rebonds, apparitions, curseur : classes CSS (index.css, préfixes sc- et et-).
// Règle CSS : la position se fait sur un <g transform> parent, l'animation sur un <g> enfant.
// Tout est figé si l'utilisateur préfère réduire les animations.

const C = {
   first: '#2e659e',
   second: '#173a5e',
   third: '#e29317',
   fourth: '#5b9bd5',
   amber: '#e9ad45',
   green: '#22c55e',
   paper: '#ffffff',
   line: '#d5e0ec',
   tile: '#f1f5f8',
   ink: '#1f2937',
   skin: '#8a5a3c',
   skin2: '#6b4329',
   hair: '#1b1410',
}

const Still = createContext(false)
const REDUCED = '(prefers-reduced-motion: reduce)'
const subscribeReduced = (cb) => {
   const mq = window.matchMedia(REDUCED)
   mq.addEventListener('change', cb)
   return () => mq.removeEventListener('change', cb)
}

const spline = (n) => Array(n).fill('0.45 0 0.25 1').join(';')

// ── Personnage de face, origine à la taille (pieds vers y = +35) ─────────────

function Person({ skin = C.skin, shirt, pants = C.second, hair = 'court', headClass, children }) {
   return (
      <g>
         <rect x={-12} y={0} width={10} height={33} rx={4} fill={pants} />
         <rect x={2} y={0} width={10} height={33} rx={4} fill={pants} />
         <ellipse cx={-7} cy={34} rx={8} ry={3.5} fill={C.ink} />
         <ellipse cx={7} cy={34} rx={8} ry={3.5} fill={C.ink} />
         <path d="M-17,3 Q-19,-38 -5,-42 L5,-42 Q19,-38 17,3 Z" fill={shirt} />
         <rect x={-4} y={-49} width={8} height={9} rx={2} fill={skin} />
         <g className={headClass}>
            {hair === 'afro' && <circle cx={0} cy={-61} r={16} fill={C.hair} />}
            <circle cx={0} cy={-58} r={12} fill={skin} />
            {hair === 'court' && <path d="M-12,-60 A12,12 0 0 1 12,-60 Q6,-66 0,-65 Q-6,-66 -12,-60 Z" fill={C.hair} />}
            <circle cx={-4} cy={-58} r={1.4} fill={C.ink} />
            <circle cx={4} cy={-58} r={1.4} fill={C.ink} />
            <path d="M-4,-53 Q0,-50 4,-53" stroke={C.ink} strokeWidth={1.4} fill="none" strokeLinecap="round" />
         </g>
         {children}
      </g>
   )
}

// Bras articulé : épaule fixe, coude et main suivent les images clés [coudeX, coudeY, mainX, mainY].
// `carry` est un objet tenu en main.
function Arm({ shoulder, frames, keyTimes, dur, shirt, skin = C.skin, carry }) {
   const still = useContext(Still)
   const [sx, sy] = shoulder
   const d = (f) => `M${sx},${sy} L${f[0]},${f[1]} L${f[2]},${f[3]}`
   const anime = !still && frames.length > 1 && dur
   const kt = (keyTimes ?? frames.map((_, i) => i / (frames.length - 1))).join(';')
   const common = { dur: `${dur}s`, keyTimes: kt, repeatCount: 'indefinite', calcMode: 'spline', keySplines: spline(frames.length - 1) }
   const [f0] = frames
   return (
      <g>
         <path d={d(f0)} stroke={shirt} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" fill="none">
            {anime && <animate attributeName="d" values={frames.map(d).join(';')} {...common} />}
         </path>
         {carry && (
            <g transform={`translate(${f0[2]} ${f0[3]})`}>
               {anime && <animateTransform attributeName="transform" type="translate" values={frames.map((f) => `${f[2]} ${f[3]}`).join(';')} {...common} />}
               {carry}
            </g>
         )}
         <circle cx={f0[2]} cy={f0[3]} r={4.2} fill={skin}>
            {anime && (
               <>
                  <animate attributeName="cx" values={frames.map((f) => f[2]).join(';')} {...common} />
                  <animate attributeName="cy" values={frames.map((f) => f[3]).join(';')} {...common} />
               </>
            )}
         </circle>
      </g>
   )
}

const Ground = ({ x, w = 34 }) => <ellipse cx={x} cy={138} rx={w} ry={5} fill={C.second} opacity={0.12} />

// Coche verte qui apparaît
const Coche = ({ r = 10, className, style }) => (
   <g className={className} style={style}>
      <circle r={r} fill={C.green} />
      <path d={`M${-r * 0.45},0 L${-r * 0.12},${r * 0.36} L${r * 0.45},${-r * 0.36}`} stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
   </g>
)

// ── 1. Choisir sa filière : l'étudiant pointe, le curseur parcourt les filières et en sélectionne une ──

const TUILES = [C.fourth, C.third, C.first, C.fourth, C.third, C.first]

function SceneFiliere() {
   return (
      <>
         <circle cx={60} cy={80} r={48} fill={C.fourth} opacity={0.12} />
         <Ground x={60} w={30} />
         <path d="M88,64 C100,64 104,54 116,54" stroke={C.fourth} strokeWidth={2} fill="none" strokeLinecap="round" className="et-flux" />
         <g transform="translate(60 103)">
            <g className="sc-bob">
               <Person shirt={C.third} headClass="sc-glance">
                  <Arm shoulder={[-13, -36]} frames={[[-18, -24, -18, -13]]} shirt={C.third} />
                  {/* bras tendu vers le tableau des filières */}
                  <Arm
                     shoulder={[13, -36]}
                     frames={[
                        [24, -40, 36, -46],
                        [25, -38, 37, -42],
                        [24, -38, 36, -40],
                        [25, -36, 37, -38],
                        [25, -36, 37, -38],
                        [24, -40, 36, -46],
                     ]}
                     keyTimes={[0, 0.15, 0.3, 0.45, 0.9, 1]}
                     dur={4}
                     shirt={C.third}
                  />
               </Person>
            </g>
         </g>

         {/* tableau des filières */}
         <g transform="translate(118 18)">
            <rect width={108} height={108} rx={10} fill={C.paper} stroke={C.line} />
            <rect x={10} y={10} width={44} height={6} rx={3} fill={C.second} />
            {TUILES.map((couleur, i) => {
               const x = 10 + (i % 2) * 46
               const y = 24 + Math.floor(i / 2) * 27
               return (
                  <g key={i} transform={`translate(${x} ${y})`}>
                     <rect width={42} height={22} rx={5} fill={C.tile} />
                     <rect x={5} y={7} width={8} height={8} rx={2} fill={couleur} />
                     <rect x={17} y={7} width={19} height={3} rx={1.5} fill={C.first} opacity={0.7} />
                     <rect x={17} y={13} width={12} height={3} rx={1.5} fill={C.line} />
                  </g>
               )
            })}
            {/* filière choisie : la 4e tuile */}
            <g transform="translate(56 51)">
               <rect width={42} height={22} rx={5} fill={C.third} fillOpacity={0.12} stroke={C.third} strokeWidth={2} className="et-choix" />
            </g>
            <g transform="translate(98 51)">
               <Coche r={8} className="et-valide" />
            </g>
            {/* curseur : parcourt les tuiles puis clique sur la 4e */}
            <g transform="translate(31 35)">
               <g className="et-curseur">
                  <circle r={3} fill="none" stroke={C.third} strokeWidth={1.4} className="et-clic" />
                  <path d="M0,0 L0,13 L3.5,10 L6,15.5 L8.5,14.4 L6,9 L10.5,9 Z" fill={C.second} stroke="#fff" strokeWidth={1} strokeLinejoin="round" />
               </g>
            </g>
         </g>
      </>
   )
}

// ── 2. Préparer son dossier : l'étudiant range chaque pièce dans la chemise, la liste se coche ──

function SceneDossier() {
   const feuille = (
      <g className="et-feuille">
         <rect x={-5} y={-17} width={15} height={19} rx={2} fill={C.paper} stroke={C.line} />
         <rect x={-2} y={-13} width={9} height={2} rx={1} fill={C.fourth} />
         <rect x={-2} y={-9} width={7} height={2} rx={1} fill={C.line} />
      </g>
   )
   return (
      <>
         <circle cx={92} cy={82} r={50} fill={C.amber} opacity={0.14} />
         <Ground x={92} w={30} />

         {/* liste des pièces : se coche au fil de l'eau */}
         <g transform="translate(12 22)">
            <rect width={54} height={66} rx={8} fill={C.paper} stroke={C.line} />
            {[14, 32, 50].map((y, i) => (
               <g key={y}>
                  <rect x={8} y={y - 5} width={10} height={10} rx={3} fill={C.tile} stroke={C.line} />
                  <rect x={22} y={y - 2} width={i === 1 ? 18 : 24} height={4} rx={2} fill={C.line} />
                  <g transform={`translate(13 ${y})`}>
                     <g className="et-coche" style={{ animationDelay: `${i * 0.9}s` }}>
                        <path d="M-3.5,0 L-1,2.6 L3.5,-2.6" stroke={C.green} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                     </g>
                  </g>
               </g>
            ))}
         </g>

         <g transform="translate(92 103)">
            <g className="sc-bob">
               <Person shirt={C.fourth} hair="afro" skin={C.skin2}>
                  <Arm shoulder={[-13, -36]} frames={[[-18, -24, -18, -13]]} shirt={C.fourth} skin={C.skin2} />
                  {/* la main glisse la feuille dans la chemise, puis en reprend une */}
                  <Arm
                     shoulder={[13, -36]}
                     frames={[
                        [20, -24, 24, -16],
                        [30, -40, 48, -38],
                        [32, -32, 54, -22],
                        [20, -24, 24, -16],
                        [20, -24, 24, -16],
                     ]}
                     keyTimes={[0, 0.35, 0.5, 0.75, 1]}
                     dur={3}
                     shirt={C.fourth}
                     skin={C.skin2}
                     carry={feuille}
                  />
               </Person>
            </g>
         </g>

         {/* table et chemise cartonnée (dessinées devant la main) */}
         <rect x={124} y={100} width={104} height={6} rx={3} fill={C.first} />
         <rect x={132} y={106} width={6} height={32} rx={2} fill={C.first} opacity={0.6} />
         <rect x={214} y={106} width={6} height={32} rx={2} fill={C.first} opacity={0.6} />
         <g transform="translate(138 62)">
            <path d="M0,6 L14,6 L18,0 L40,0 L40,38 L0,38 Z" fill={C.first} />
            <rect x={5} y={6} width={30} height={26} rx={2} fill={C.paper} stroke={C.line} />
            <rect x={9} y={2} width={26} height={24} rx={2} fill={C.paper} stroke={C.line} />
            {/* la nouvelle pièce descend dans la chemise */}
            <g transform="translate(20 10)">
               <g className="et-glisse">
                  <rect x={-8} y={-8} width={16} height={18} rx={2} fill={C.paper} stroke={C.fourth} />
               </g>
            </g>
            <path d="M-3,16 L43,16 L40,38 L0,38 Z" fill={C.third} />
            <rect x={14} y={24} width={12} height={3} rx={1.5} fill="#fff" opacity={0.6} />
         </g>
      </>
   )
}

// ── 3. Déposer sa candidature : l'étudiant remet son dossier, la secrétaire le tamponne ──

function SceneDepot() {
   const dossier = (
      <g className="et-tenu">
         <rect x={-6} y={-12} width={22} height={14} rx={2} fill={C.third} />
         <rect x={-6} y={-14} width={9} height={4} rx={1.5} fill={C.third} />
      </g>
   )
   const tampon = (
      <g>
         <rect x={-5} y={2} width={10} height={4} rx={1} fill={C.second} />
         <rect x={-2} y={-6} width={4} height={8} rx={1.5} fill={C.first} />
      </g>
   )
   return (
      <>
         <circle cx={88} cy={82} r={46} fill={C.third} opacity={0.1} />
         <circle cx={186} cy={80} r={44} fill={C.fourth} opacity={0.12} />
         <Ground x={88} w={30} />

         {/* dossier posé sur le comptoir, puis tamponné (sous le tampon de la secrétaire) */}
         <g className="et-pose">
            <rect x={138} y={80} width={24} height={13} rx={2} fill={C.third} />
            <rect x={138} y={78} width={10} height={4} rx={1.5} fill={C.third} />
         </g>
         <g transform="translate(150 86.5)">
            <g className="et-tampon">
               <circle r={4.5} fill="none" stroke="#fff" strokeWidth={1.4} />
               <path d="M-2,0 L-0.5,1.6 L2.2,-1.6" stroke="#fff" strokeWidth={1.3} fill="none" strokeLinecap="round" />
            </g>
         </g>

         {/* secrétaire derrière le comptoir */}
         <g transform="translate(190 103)">
            <g className="sc-bob" style={{ animationDelay: '0.6s' }}>
               <Person shirt={C.first} hair="afro" skin={C.skin2}>
                  <Arm shoulder={[13, -36]} frames={[[18, -24, 18, -13]]} shirt={C.first} skin={C.skin2} />
                  <Arm
                     shoulder={[-13, -36]}
                     frames={[
                        [-18, -26, -20, -14],
                        [-18, -26, -20, -14],
                        [-26, -44, -36, -48],
                        [-28, -32, -40, -21],
                        [-26, -40, -34, -40],
                        [-18, -26, -20, -14],
                     ]}
                     keyTimes={[0, 0.45, 0.55, 0.62, 0.72, 1]}
                     dur={4}
                     shirt={C.first}
                     skin={C.skin2}
                     carry={tampon}
                  />
               </Person>
            </g>
         </g>

         {/* comptoir du secrétariat (devant la secrétaire) */}
         <rect x={136} y={93} width={100} height={7} rx={3} fill={C.second} />
         <rect x={140} y={100} width={92} height={38} rx={4} fill={C.first} />
         <text x={186} y={122} textAnchor="middle" fontSize={8} fontWeight={700} letterSpacing={1.2} fill="#fff" opacity={0.85}>SECRÉTARIAT</text>

         {/* l'étudiant tend son dossier */}
         <g transform="translate(88 103)">
            <g className="sc-bob">
               <Person shirt={C.third}>
                  <Arm shoulder={[-13, -36]} frames={[[-18, -24, -18, -13]]} shirt={C.third} />
                  <Arm
                     shoulder={[13, -36]}
                     frames={[
                        [20, -26, 24, -16],
                        [32, -34, 52, -20],
                        [32, -34, 52, -20],
                        [20, -26, 24, -16],
                        [20, -26, 24, -16],
                     ]}
                     keyTimes={[0, 0.3, 0.38, 0.55, 1]}
                     dur={4}
                     shirt={C.third}
                     carry={dossier}
                  />
               </Person>
            </g>
         </g>

         <g transform="translate(150 50)">
            <Coche r={10} className="et-ok" />
         </g>
      </>
   )
}

const scenes = [SceneFiliere, SceneDossier, SceneDepot]

export default function EtapeScene({ index, label }) {
   const still = useSyncExternalStore(subscribeReduced, () => window.matchMedia(REDUCED).matches, () => false)
   const Scene = scenes[index]
   if (!Scene) return null
   return (
      <Still.Provider value={still}>
         <svg viewBox="0 0 240 150" className="etape-scene w-full h-auto" role="img" aria-label={label}>
            <Scene />
         </svg>
      </Still.Provider>
   )
}
