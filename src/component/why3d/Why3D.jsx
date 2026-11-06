import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Line, OrbitControls } from '@react-three/drei'

// Campus 3D de la section « Pourquoi choisir ESGC ? » (même principe que sur le site de l'ESIT) :
// un plateau rond avec l'école au centre et un objet par atout. L'atout actif tourne face
// à la caméra, s'élève et s'anime. On peut faire pivoter la scène et zoomer (boutons).

const C = {
   first: '#2e659e',
   deep: '#173a5e',
   second: '#e29317',
   light: '#edf2f7',
   lightSide: '#d8e2ed',
   grid: '#cfdbe8',
   paper: '#ffffff',
   skin: '#7a4a2e',
   skin2: '#5e3a24',
   books: ['#2e659e', '#e29317', '#173a5e'],
}

const N = 5
const R = 3.4 // rayon de l'anneau des atouts
const TOP = 0.85 // dessus du plateau
const PED = 0.24 // hauteur des socles
const TARGET = new THREE.Vector3(0, 1.05, 0)
const HOME = new THREE.Vector3(10.5, 12.5, 10.5).add(TARGET)
const HOME_THETA = Math.atan2(HOME.x - TARGET.x, HOME.z - TARGET.z)
const ZOOM_MIN = 0.8
const ZOOM_MAX = 1.7

const angleDe = (i) => (i * 2 * Math.PI) / N
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a))
const lisse = (delta, vitesse) => 1 - Math.exp(-delta * vitesse)

const ORANGE = new THREE.Color(C.second)
const BLEU = new THREE.Color(C.deep)

// Horloge propre à chaque objet : animation pleine quand il est actif, au ralenti sinon
function useHorloge(on, animate) {
   const t = useRef(0)
   useFrame((_, delta) => {
      if (animate) t.current += Math.min(delta, 0.1) * (on ? 1 : 0.35)
   })
   return t
}

// Texture dessinée sur un canvas
function useCanvasTexture(w, h, draw) {
   return useMemo(() => {
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      draw(canvas.getContext('2d'))
      const tex = new THREE.CanvasTexture(canvas)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = 8
      return tex
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [w, h])
}

// ── Plateau ─────────────────────────────────────────────────────────────

function Plateau() {
   const traits = useMemo(() => {
      const pts = []
      const y = TOP + 0.004
      for (const r of [1.45, 2.4, 4.5]) {
         for (let k = 0; k < 96; k++) {
            const a = (k / 96) * Math.PI * 2
            const b = ((k + 1) / 96) * Math.PI * 2
            pts.push(new THREE.Vector3(Math.sin(a) * r, y, Math.cos(a) * r), new THREE.Vector3(Math.sin(b) * r, y, Math.cos(b) * r))
         }
      }
      for (let k = 0; k < 60; k++) {
         const a = (k / 60) * Math.PI * 2
         const r2 = k % 6 === 0 ? 4.92 : 4.76
         pts.push(new THREE.Vector3(Math.sin(a) * 4.5, y, Math.cos(a) * 4.5), new THREE.Vector3(Math.sin(a) * r2, y, Math.cos(a) * r2))
      }
      return new THREE.BufferGeometry().setFromPoints(pts)
   }, [])

   return (
      <group>
         <mesh position-y={-0.22}>
            <cylinderGeometry args={[5.25, 5.1, 0.44, 96]} />
            <meshStandardMaterial color={C.deep} roughness={0.8} />
         </mesh>
         <mesh position-y={0.005} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[5.1, 5.26, 96]} />
            <meshBasicMaterial color={C.second} toneMapped={false} />
         </mesh>
         <mesh position-y={TOP / 2}>
            <cylinderGeometry args={[5.05, 5.05, TOP, 96]} />
            <meshStandardMaterial color={C.light} roughness={0.85} />
         </mesh>
         <lineSegments geometry={traits}>
            <lineBasicMaterial color={C.grid} />
         </lineSegments>
      </group>
   )
}

// ── L'école au centre : façade à colonnes et drapeau qui flotte ─────────

function Ecole({ animate }) {
   const drapeau = useRef()
   useFrame(({ clock }) => {
      if (!animate) return
      const t = clock.elapsedTime
      drapeau.current.rotation.y = Math.sin(t * 2.4) * 0.35
      drapeau.current.scale.x = 0.85 + Math.sin(t * 3.1) * 0.15
   })
   return (
      <group position-y={TOP}>
         <mesh position-y={0.1}>
            <cylinderGeometry args={[1.12, 1.18, 0.2, 6]} />
            <meshStandardMaterial color={C.deep} roughness={0.7} />
         </mesh>
         {/* corps du bâtiment */}
         <mesh position={[0, 0.62, -0.12]}>
            <boxGeometry args={[1.5, 0.84, 0.9]} />
            <meshStandardMaterial color={C.paper} roughness={0.7} />
         </mesh>
         {/* colonnes de la façade */}
         {[-0.54, -0.18, 0.18, 0.54].map((x) => (
            <mesh key={x} position={[x, 0.6, 0.42]}>
               <cylinderGeometry args={[0.07, 0.07, 0.8, 12]} />
               <meshStandardMaterial color={C.lightSide} />
            </mesh>
         ))}
         <mesh position={[0, 0.24, 0.42]}>
            <boxGeometry args={[1.6, 0.08, 0.3]} />
            <meshStandardMaterial color={C.lightSide} />
         </mesh>
         <mesh position={[0, 1.06, 0.08]}>
            <boxGeometry args={[1.66, 0.1, 1.2]} />
            <meshStandardMaterial color={C.first} />
         </mesh>
         {/* fronton triangulaire */}
         <mesh position={[0, 1.23, 0.08]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={[0.77, 1.66, 0.26]}>
            <cylinderGeometry args={[0.9, 0.9, 1, 3]} />
            <meshStandardMaterial color={C.first} flatShading />
         </mesh>
         {/* porte */}
         <mesh position={[0, 0.48, 0.34]}>
            <boxGeometry args={[0.26, 0.42, 0.02]} />
            <meshStandardMaterial color={C.deep} />
         </mesh>
         {/* mât et drapeau */}
         <mesh position={[0, 1.95, 0.08]}>
            <cylinderGeometry args={[0.025, 0.025, 1.0, 8]} />
            <meshStandardMaterial color={C.deep} />
         </mesh>
         <group ref={drapeau} position={[0.02, 2.3, 0.08]}>
            <mesh position-x={0.26}>
               <boxGeometry args={[0.5, 0.3, 0.02]} />
               <meshStandardMaterial color={C.second} side={THREE.DoubleSide} />
            </mesh>
         </group>
      </group>
   )
}

// Liaison au sol entre l'école et un atout, parcourue par des paquets
function Liaison({ index, on, animate }) {
   const a = angleDe(index)
   const points = useMemo(() => {
      const y = TOP + 0.012
      return [1.2, R - 1.03].map((r) => new THREE.Vector3(Math.sin(a) * r, y, Math.cos(a) * r))
   }, [a])
   const paquets = useRef([])
   const pointilles = useRef()
   const t = useRef(index * 0.17)
   useFrame((_, delta) => {
      if (animate) t.current += Math.min(delta, 0.1) * (on ? 0.75 : 0.28)
      paquets.current.forEach((m, i) => {
         if (!m) return
         m.position.lerpVectors(points[0], points[1], (t.current + i / 2) % 1)
         m.visible = on || i === 0
      })
      if (animate && pointilles.current) pointilles.current.material.dashOffset = -t.current * 2
   })
   const couleur = on ? C.second : C.first
   return (
      <group>
         <Line points={points} color={C.lightSide} lineWidth={5} />
         <Line ref={pointilles} points={points} color={couleur} lineWidth={2.5} dashed dashSize={0.16} gapSize={0.2} />
         {[0, 1].map((i) => (
            <mesh
               key={i}
               ref={(m) => {
                  paquets.current[i] = m
               }}
            >
               <sphereGeometry args={[0.1, 16, 16]} />
               <meshBasicMaterial color={couleur} toneMapped={false} />
            </mesh>
         ))}
      </group>
   )
}

// ── Les 5 atouts ────────────────────────────────────────────────────────

// 1. Des formations pratiques : paperboard où les résultats d'un cas réel se dessinent
const BARRES = [0.22, 0.34, 0.28, 0.46]
function Paperboard({ on, animate }) {
   const t = useHorloge(on, animate)
   const barres = useRef([])
   const feutre = useRef()
   useFrame(() => {
      const p = (t.current * 0.45) % 1
      barres.current.forEach((m, i) => {
         if (!m) return
         // les barres « se dessinent » l'une après l'autre
         const k = THREE.MathUtils.clamp(p * 5 - i, 0.02, 1)
         m.scale.y = k
         m.position.y = 0.66 + (BARRES[i] * k) / 2
      })
      const i = Math.min(3, Math.floor(p * 5))
      feutre.current.position.set(-0.3 + i * 0.2 + 0.06, 0.7 + BARRES[i] * THREE.MathUtils.clamp(p * 5 - i, 0, 1), 0.12)
   })
   return (
      <group rotation-x={-0.12} position-z={-0.05}>
         {/* pieds du chevalet */}
         {[-0.42, 0.42].map((x) => (
            <mesh key={x} position={[x, 0.62, 0]} rotation-z={x > 0 ? -0.08 : 0.08}>
               <boxGeometry args={[0.05, 1.3, 0.05]} />
               <meshStandardMaterial color={C.deep} />
            </mesh>
         ))}
         <mesh position={[0, 0.5, -0.32]} rotation-x={0.35}>
            <boxGeometry args={[0.05, 1.05, 0.05]} />
            <meshStandardMaterial color={C.deep} />
         </mesh>
         {/* tableau */}
         <mesh position={[0, 0.92, 0.02]}>
            <boxGeometry args={[1.0, 0.82, 0.04]} />
            <meshStandardMaterial color={C.paper} />
         </mesh>
         <mesh position={[0, 1.36, 0.02]}>
            <boxGeometry args={[1.06, 0.07, 0.07]} />
            <meshStandardMaterial color={C.deep} />
         </mesh>
         <mesh position={[0, 0.64, 0.045]}>
            <boxGeometry args={[0.84, 0.012, 0.01]} />
            <meshStandardMaterial color={C.deep} />
         </mesh>
         {BARRES.map((h, i) => (
            <mesh
               key={i}
               ref={(m) => {
                  barres.current[i] = m
               }}
               position={[-0.3 + i * 0.2, 0.66 + h / 2, 0.05]}
            >
               <boxGeometry args={[0.12, h, 0.02]} />
               <meshStandardMaterial color={i === 3 ? C.second : C.first} />
            </mesh>
         ))}
         {/* feutre qui dessine */}
         <group ref={feutre}>
            <mesh rotation-z={0.6}>
               <cylinderGeometry args={[0.03, 0.03, 0.22, 10]} />
               <meshStandardMaterial color={C.second} />
            </mesh>
         </group>
      </group>
   )
}

// 2. Des filières utiles pour l'emploi : la mallette du futur professionnel
function Mallette({ on, animate }) {
   const t = useHorloge(on, animate)
   const corps = useRef()
   useFrame(() => {
      const s = t.current * 2.6
      corps.current.position.y = 0.36 + Math.abs(Math.sin(s)) * 0.22
      corps.current.rotation.z = Math.sin(s) * 0.12
   })
   return (
      <group ref={corps} position-y={0.36}>
         <mesh>
            <boxGeometry args={[0.95, 0.66, 0.34]} />
            <meshStandardMaterial color={C.second} roughness={0.6} />
         </mesh>
         <mesh position-y={0.12}>
            <boxGeometry args={[0.97, 0.04, 0.36]} />
            <meshStandardMaterial color="#b9730d" />
         </mesh>
         {[-0.28, 0.28].map((x) => (
            <mesh key={x} position={[x, 0.12, 0.18]}>
               <boxGeometry args={[0.1, 0.08, 0.02]} />
               <meshStandardMaterial color={C.deep} />
            </mesh>
         ))}
         <mesh position-y={0.4}>
            <torusGeometry args={[0.16, 0.035, 10, 24, Math.PI]} />
            <meshStandardMaterial color={C.deep} />
         </mesh>
      </group>
   )
}

// 3. 21 ans d'expérience : sur le calendrier de bureau, la page « 20 » tourne et dévoile « 21 »
const pageAnnee = (annee) => (ctx) => {
   ctx.fillStyle = C.paper
   ctx.fillRect(0, 0, 256, 256)
   ctx.fillStyle = C.second
   ctx.fillRect(0, 0, 256, 64)
   ctx.fillStyle = '#fff'
   ctx.font = 'bold 34px sans-serif'
   ctx.textAlign = 'center'
   ctx.fillText('ANS', 128, 45)
   ctx.fillStyle = C.deep
   ctx.font = 'bold 132px sans-serif'
   ctx.fillText(annee, 128, 205)
}
function Calendrier({ on, animate }) {
   const t = useHorloge(on, animate)
   const page = useRef()
   const face = useCanvasTexture(256, 256, pageAnnee('21'))
   const avant = useCanvasTexture(256, 256, pageAnnee('20'))
   useFrame(() => {
      // la page « 20 » se soulève et passe par-dessus ; « 21 » reste affiché le reste du temps
      const p = (t.current * 0.35) % 1
      const k = THREE.MathUtils.smoothstep(p, 0.15, 0.45)
      page.current.rotation.x = -k * Math.PI * 0.95
      page.current.visible = k < 0.97
   })
   return (
      <group>
         <mesh position={[0, 0.5, -0.06]} rotation-x={-0.18}>
            <boxGeometry args={[0.9, 0.95, 0.22]} />
            <meshStandardMaterial color={C.lightSide} />
         </mesh>
         <mesh position={[0, 0.52, 0.06]} rotation-x={-0.18}>
            <planeGeometry args={[0.82, 0.86]} />
            <meshBasicMaterial map={face} toneMapped={false} />
         </mesh>
         {/* page qui tourne (charnière en haut) */}
         <group position={[0, 0.95, 0.1]} rotation-x={-0.18}>
            <group ref={page}>
               <mesh position-y={-0.43}>
                  <planeGeometry args={[0.82, 0.86]} />
                  <meshBasicMaterial map={avant} toneMapped={false} />
               </mesh>
               <mesh position={[0, -0.43, -0.002]} rotation-y={Math.PI}>
                  <planeGeometry args={[0.82, 0.86]} />
                  <meshStandardMaterial color={C.lightSide} />
               </mesh>
            </group>
         </group>
         {[-0.24, 0, 0.24].map((x) => (
            <mesh key={x} position={[x, 1.0, 0.0]} rotation-z={Math.PI / 2}>
               <torusGeometry args={[0.05, 0.015, 8, 16]} />
               <meshStandardMaterial color={C.deep} />
            </mesh>
         ))}
      </group>
   )
}

// 4. Des profs qualifiés : la toque posée sur une pile de livres
function Toque({ on, animate }) {
   const t = useHorloge(on, animate)
   const toque = useRef()
   const gland = useRef()
   useFrame(() => {
      toque.current.position.y = 0.86 + Math.sin(t.current * 1.8) * 0.08
      toque.current.rotation.y = Math.PI / 4 + Math.sin(t.current * 0.9) * 0.25
      gland.current.rotation.z = Math.sin(t.current * 3.2) * 0.35
   })
   return (
      <group>
         {C.books.map((couleur, i) => (
            <mesh key={i} position={[0, 0.1 + i * 0.18, 0]} rotation-y={(i - 1) * 0.18}>
               <boxGeometry args={[0.95 - i * 0.08, 0.17, 0.66 - i * 0.04]} />
               <meshStandardMaterial color={couleur} />
            </mesh>
         ))}
         {C.books.map((_, i) => (
            <mesh key={`p${i}`} position={[0.02, 0.1 + i * 0.18, 0]} rotation-y={(i - 1) * 0.18}>
               <boxGeometry args={[0.9 - i * 0.08, 0.13, 0.67 - i * 0.04]} />
               <meshStandardMaterial color={C.paper} />
            </mesh>
         ))}
         <group ref={toque} position-y={0.86}>
            <mesh position-y={-0.08}>
               <cylinderGeometry args={[0.24, 0.26, 0.18, 24]} />
               <meshStandardMaterial color="#1b2430" />
            </mesh>
            <mesh>
               <boxGeometry args={[0.78, 0.04, 0.78]} />
               <meshStandardMaterial color="#1b2430" />
            </mesh>
            <mesh position-y={0.035}>
               <sphereGeometry args={[0.04, 10, 10]} />
               <meshStandardMaterial color={C.second} />
            </mesh>
            <group ref={gland} position={[0, 0.03, 0]}>
               <mesh position={[0.2, 0, 0.2]} rotation-y={Math.PI / 4} rotation-z={Math.PI / 2}>
                  <cylinderGeometry args={[0.01, 0.01, 0.56, 6]} />
                  <meshStandardMaterial color={C.second} />
               </mesh>
               <mesh position={[0.39, -0.12, 0.39]}>
                  <cylinderGeometry args={[0.012, 0.012, 0.24, 6]} />
                  <meshStandardMaterial color={C.second} />
               </mesh>
               <mesh position={[0.39, -0.27, 0.39]}>
                  <coneGeometry args={[0.05, 0.12, 10]} />
                  <meshStandardMaterial color={C.second} />
               </mesh>
            </group>
         </group>
      </group>
   )
}

// 5. Aide pour trouver un emploi : le diplômé serre la main d'un recruteur
function PoigneeDeMain({ on, animate }) {
   const t = useHorloge(on, animate)
   const bras = useRef([])
   const bulle = useRef()
   useFrame(() => {
      const a = Math.sin(t.current * 7) * 0.22 * (0.6 + 0.4 * Math.max(0, Math.sin(t.current * 1.3)))
      if (bras.current[0]) bras.current[0].rotation.z = a
      if (bras.current[1]) bras.current[1].rotation.z = -a
      const p = (t.current * 0.5) % 1
      bulle.current.scale.setScalar(THREE.MathUtils.smoothstep(p, 0.1, 0.25) * (1 - THREE.MathUtils.smoothstep(p, 0.8, 0.95)))
   })
   const personnes = [
      { x: -0.36, corps: C.first, peau: C.skin, sens: 1 },
      { x: 0.36, corps: C.deep, peau: C.skin2, sens: -1 },
   ]
   return (
      <group>
         {personnes.map((p, i) => (
            <group key={i} position-x={p.x}>
               <mesh position-y={0.3}>
                  <capsuleGeometry args={[0.15, 0.28, 4, 12]} />
                  <meshStandardMaterial color={p.corps} roughness={0.6} />
               </mesh>
               <mesh position-y={0.7}>
                  <sphereGeometry args={[0.13, 16, 16]} />
                  <meshStandardMaterial color={p.peau} />
               </mesh>
               {/* bras tendu vers l'autre, articulé à l'épaule */}
               <group
                  ref={(g) => {
                     bras.current[i] = g
                  }}
                  position={[p.sens * 0.12, 0.46, 0.04]}
               >
                  <mesh position-x={p.sens * 0.12} rotation-z={Math.PI / 2}>
                     <cylinderGeometry args={[0.045, 0.045, 0.24, 8]} />
                     <meshStandardMaterial color={p.corps} />
                  </mesh>
                  <mesh position-x={p.sens * 0.25}>
                     <sphereGeometry args={[0.055, 10, 10]} />
                     <meshStandardMaterial color={p.peau} />
                  </mesh>
               </group>
            </group>
         ))}
         {/* accord conclu : une coche verte apparaît au-dessus des mains */}
         <group ref={bulle} position={[0, 1.15, 0]}>
            <mesh rotation-x={Math.PI / 2}>
               <cylinderGeometry args={[0.17, 0.17, 0.04, 28]} />
               <meshStandardMaterial color="#22c55e" />
            </mesh>
            <mesh position={[-0.05, -0.01, 0.025]} rotation-z={-0.8}>
               <boxGeometry args={[0.1, 0.035, 0.01]} />
               <meshBasicMaterial color="#fff" />
            </mesh>
            <mesh position={[0.03, 0.015, 0.025]} rotation-z={0.85}>
               <boxGeometry args={[0.17, 0.035, 0.01]} />
               <meshBasicMaterial color="#fff" />
            </mesh>
         </group>
      </group>
   )
}

const OBJETS = [Paperboard, Mallette, Calendrier, Toque, PoigneeDeMain]

// Socle hexagonal + onde au sol quand l'atout est actif
function Atout({ index, on, animate, onSelect, children }) {
   const a = angleDe(index)
   const objet = useRef()
   const socle = useRef()
   const onde = useRef()
   const gl = useThree((s) => s.gl)
   useFrame(({ clock }, delta) => {
      const k = animate ? lisse(delta, 6) : 1
      objet.current.position.y = THREE.MathUtils.lerp(objet.current.position.y, PED + (on ? 0.3 : 0), k)
      objet.current.scale.setScalar(THREE.MathUtils.lerp(objet.current.scale.x, on ? 1.3 : 1.12, k))
      socle.current.color.lerp(on ? ORANGE : BLEU, k)
      const p = animate ? (clock.elapsedTime / 2.2) % 1 : 0.45
      onde.current.visible = on
      onde.current.scale.setScalar(1 + p * 0.9)
      onde.current.material.opacity = 0.8 * (1 - p)
   })
   return (
      <group
         position={[Math.sin(a) * R, TOP, Math.cos(a) * R]}
         rotation-y={a}
         onClick={(e) => {
            // un glisser pour faire pivoter ne compte pas comme un clic
            if (e.delta > 6) return
            e.stopPropagation()
            onSelect(index)
         }}
         onPointerOver={(e) => {
            e.stopPropagation()
            gl.domElement.style.cursor = 'pointer'
         }}
         onPointerOut={() => {
            gl.domElement.style.cursor = ''
         }}
      >
         <mesh ref={onde} position-y={0.01} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[1.1, 1.16, 6]} />
            <meshBasicMaterial color={C.second} transparent toneMapped={false} />
         </mesh>
         <mesh position-y={PED / 2}>
            <cylinderGeometry args={[1.0, 1.06, PED, 6]} />
            <meshStandardMaterial ref={socle} color={C.deep} roughness={0.7} />
         </mesh>
         <group ref={objet} position-y={PED} scale={1.12}>
            {children}
         </group>
      </group>
   )
}

// Plateau qui tourne pour amener l'atout actif face à la caméra
function Campus({ active, animate, onSelect, cible }) {
   const plateau = useRef()
   const get = useThree((s) => s.get)

   // Direction de la caméra au moment où l'atout change : le plateau tourne vers elle,
   // mais ne la suit pas quand on fait pivoter la vue à la main
   useEffect(() => {
      const { position } = get().camera
      cible.current.theta = Math.atan2(position.x - TARGET.x, position.z - TARGET.z)
   }, [active, get, cible])

   useFrame((_, delta) => {
      const g = plateau.current
      const voulu = cible.current.theta - angleDe(active)
      g.rotation.y += wrap(voulu - g.rotation.y) * (animate ? lisse(delta, 3.2) : 1)
   })

   return (
      <group ref={plateau}>
         <Plateau />
         <Ecole animate={animate} />
         {OBJETS.map((Objet, i) => (
            <group key={i}>
               <Liaison index={i} on={i === active} animate={animate} />
               <Atout index={i} on={i === active} animate={animate} onSelect={onSelect}>
                  <Objet on={i === active} animate={animate} />
               </Atout>
            </group>
         ))}
      </group>
   )
}

// Relance la boucle de rendu quand la scène revient à l'écran
function Resume({ active }) {
   const invalidate = useThree((s) => s.invalidate)
   useEffect(() => {
      if (active) invalidate()
   }, [active, invalidate])
   return null
}

// Caméra : cadrage responsive, zoom borné (boutons), retour à la vue initiale animé
function Rig({ api, cible }) {
   const size = useThree((s) => s.size)
   const get = useThree((s) => s.get)
   const controls = useRef()
   const prevBase = useRef(null)
   const goal = useRef({})
   const base = Math.min(size.width / 11.6, size.height / 9.4)

   // Le cadrage suit la taille du conteneur en gardant le zoom choisi
   useEffect(() => {
      const camera = get().camera
      camera.zoom = prevBase.current === null ? base : camera.zoom * (base / prevBase.current)
      prevBase.current = base
      camera.updateProjectionMatrix()
   }, [base, get])

   useImperativeHandle(
      api,
      () => ({
         zoomBy: (f) => {
            goal.current.zoom = THREE.MathUtils.clamp((goal.current.zoom ?? get().camera.zoom) * f, base * ZOOM_MIN, base * ZOOM_MAX)
         },
         reset: () => {
            goal.current = { zoom: base, pos: HOME.clone() }
            cible.current.theta = HOME_THETA
         },
      }),
      [base, get, cible]
   )

   useFrame(({ camera }, delta) => {
      const k = lisse(delta, 7)
      const g = goal.current
      if (g.zoom !== undefined) {
         camera.zoom = THREE.MathUtils.lerp(camera.zoom, g.zoom, k)
         if (Math.abs(camera.zoom - g.zoom) < 0.01) {
            camera.zoom = g.zoom
            delete g.zoom
         }
         camera.updateProjectionMatrix()
      }
      if (g.pos) {
         // on tourne autour de la scène par le plus court chemin
         const cur = new THREE.Spherical().setFromVector3(camera.position.clone().sub(TARGET))
         const end = new THREE.Spherical().setFromVector3(g.pos.clone().sub(TARGET))
         const dTheta = wrap(end.theta - cur.theta)
         cur.theta += dTheta * k
         cur.phi += (end.phi - cur.phi) * k
         cur.radius = end.radius
         camera.position.setFromSpherical(cur).add(TARGET)
         if (Math.abs(dTheta) < 0.002 && Math.abs(end.phi - cur.phi) < 0.002) {
            camera.position.copy(g.pos)
            delete g.pos
         }
         controls.current?.update()
      }
   })

   return (
      <OrbitControls
         ref={controls}
         makeDefault
         target={TARGET}
         enablePan={false}
         enableZoom={false}
         enableDamping
         dampingFactor={0.08}
         rotateSpeed={0.7}
         minPolarAngle={0.55}
         maxPolarAngle={1.2}
         onStart={() => {
            delete goal.current.pos
         }}
      />
   )
}

export default function Why3D({ active, onSelect, visible = true, reducedMotion = false, api, fallback }) {
   const cible = useRef({ theta: HOME_THETA })
   const [pret, setPret] = useState(false)

   return (
      <Canvas
         orthographic
         flat
         dpr={[1, 2]}
         frameloop={visible ? 'always' : 'never'}
         camera={{ position: HOME.toArray(), near: 0.1, far: 200 }}
         gl={{ antialias: true, alpha: true }}
         style={{ position: 'absolute', inset: 0, opacity: pret ? 1 : 0, transition: 'opacity .6s ease' }}
         className="scene-3d cursor-grab active:cursor-grabbing"
         fallback={fallback}
         onCreated={() => setPret(true)}
         aria-label="Campus 3D de l'ESGC : faites pivoter la scène et cliquez sur un atout"
      >
         <ambientLight intensity={1.5} />
         <directionalLight position={[6, 14, 8]} intensity={1.7} />
         <directionalLight position={[-8, 6, -4]} intensity={0.45} />
         <Campus active={active} animate={!reducedMotion} onSelect={onSelect} cible={cible} />
         <ContactShadows position={[0, TOP + 0.006, 0]} scale={11} resolution={512} blur={2.4} opacity={0.3} far={3} color={C.deep} />
         <Rig api={api} cible={cible} />
         <Resume active={visible} />
      </Canvas>
   )
}
