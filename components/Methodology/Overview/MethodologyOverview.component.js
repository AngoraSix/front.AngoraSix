"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { useTranslation } from "next-i18next"
import { motion } from "framer-motion"
import {
  Lightbulb as LightbulbIcon,
  Settings as SettingsIcon,
  Autorenew as AutorenewIcon,
  ContactMail as ContactMailIcon,
  AltRoute as RouteIcon,
  Explore as ExploreIcon,
  KeyboardArrowRight as StartIcon
} from "@mui/icons-material"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import { trackEvent } from "../../../utils/analytics"

// 3D Scene Components - Collective Work Representations

// Fairness: Multiple nodes forming a sphere, dissolving, rotating, and reforming
const FairnessNodes = () => {
  const nodesRef = useRef()
  const count = 60

  const nodes = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      temp.push({
        spherePosition: [
          Math.cos(theta) * Math.sin(phi) * 1.2,
          Math.sin(theta) * Math.sin(phi) * 1.2,
          Math.cos(phi) * 1.2,
        ],
        scatteredPosition: [(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4],
        rotationAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
        phase: Math.random() * Math.PI * 2,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!nodesRef.current) return
    const time = state.clock.getElapsedTime() * 0.3

    // Cycle: 0-2s form sphere, 2-3s dissolve, 3-5s rotate scattered, 5-6s stabilize, 6-8s reform
    const cycleTime = time % 8
    let progress = 0

    if (cycleTime < 2) {
      // Forming sphere
      progress = cycleTime / 2
    } else if (cycleTime < 3) {
      // Dissolving
      progress = 1 - (cycleTime - 2)
    } else if (cycleTime < 5) {
      // Scattered and rotating
      progress = 0
      const rotationTime = cycleTime - 3
      nodesRef.current.rotation.y = rotationTime * 0.5
    } else if (cycleTime < 6) {
      // Stabilizing
      progress = 0
      nodesRef.current.rotation.y = 1
    } else {
      // Reforming sphere
      progress = (cycleTime - 6) / 2
      nodesRef.current.rotation.y = 1 - (cycleTime - 6) / 2
    }

    nodesRef.current.children.forEach((node, i) => {
      const data = nodes[i]
      const easedProgress = progress * progress * (3 - 2 * progress) // Smooth easing

      node.position.x = THREE.MathUtils.lerp(data.scatteredPosition[0], data.spherePosition[0], easedProgress)
      node.position.y = THREE.MathUtils.lerp(data.scatteredPosition[1], data.spherePosition[1], easedProgress)
      node.position.z = THREE.MathUtils.lerp(data.scatteredPosition[2], data.spherePosition[2], easedProgress)
    })
  })

  return (
    <group ref={nodesRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.scatteredPosition}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#1B5993" />
        </mesh>
      ))}
    </group>
  )
}

// Parametrization: Path segments that occasionally align into a solid circle
const ParametrizationPath = () => {
  const pathRef = useRef()
  const segments = 40

  const pathSegments = useMemo(() => {
    const temp = []
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2

      temp.push({
        circlePosition: [Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0],
        pathPosition: [
          Math.cos(angle * 2) * (1 + Math.sin(angle * 3) * 0.3),
          Math.sin(angle * 2) * (1 + Math.sin(angle * 3) * 0.3),
          Math.sin(angle * 5) * 0.3,
        ],
        rotation: angle,
        delay: i * 0.05,
      })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!pathRef.current) return
    const time = state.clock.getElapsedTime() * 0.4

    // Cycle: 0-3s scattered path, 3-4s forming circle, 4-5s solid circle, 5-6s dissolving, 6-9s scattered
    const cycleTime = time % 9
    let progress = 0

    if (cycleTime < 3) {
      progress = 0
    } else if (cycleTime < 4) {
      progress = cycleTime - 3
    } else if (cycleTime < 5) {
      progress = 1
    } else if (cycleTime < 6) {
      progress = 1 - (cycleTime - 5)
    } else {
      progress = 0
    }

    pathRef.current.children.forEach((segment, i) => {
      const data = pathSegments[i]
      const easedProgress = progress * progress * (3 - 2 * progress)

      segment.position.x = THREE.MathUtils.lerp(data.pathPosition[0], data.circlePosition[0], easedProgress)
      segment.position.y = THREE.MathUtils.lerp(data.pathPosition[1], data.circlePosition[1], easedProgress)
      segment.position.z = THREE.MathUtils.lerp(data.pathPosition[2], data.circlePosition[2], easedProgress)

      const scale = progress < 0.1 ? Math.abs(Math.sin(time + data.delay)) * 0.5 + 0.5 : 1
      segment.scale.set(scale, scale, 1)
    })

    if (progress < 0.1) {
      pathRef.current.rotation.z = time * 0.2
    }
  })

  return (
    <group ref={pathRef}>
      {pathSegments.map((segment, i) => (
        <mesh key={i} position={segment.pathPosition} rotation={[0, 0, segment.rotation]}>
          <boxGeometry args={[0.3, 0.12, 0.1]} />
          <meshStandardMaterial color="#0A2239" />
        </mesh>
      ))}
    </group>
  )
}

// Implementation: Sound waves forming patterns
const ImplementationWaves = () => {
  const wavesRef = useRef()
  const waveCount = 5
  const pointsPerWave = 50

  const waves = useMemo(() => {
    const temp = []
    for (let w = 0; w < waveCount; w++) {
      const points = []
      for (let i = 0; i < pointsPerWave; i++) {
        const x = (i / pointsPerWave - 0.5) * 4
        points.push(new THREE.Vector3(x, 0, w * 0.3 - 0.6))
      }
      temp.push({ points, offset: w * 0.5 })
    }
    return temp
  }, [])

  useFrame((state) => {
    if (!wavesRef.current) return
    const time = state.clock.getElapsedTime()

    wavesRef.current.children.forEach((line, waveIndex) => {
      const geometry = line.geometry
      const positions = geometry.attributes.position.array
      const wave = waves[waveIndex]

      for (let i = 0; i < pointsPerWave; i++) {
        const x = (i / pointsPerWave - 0.5) * 4
        const y = Math.sin(x * 2 + time + wave.offset) * 0.5 * Math.cos(time * 0.5 + wave.offset)

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = wave.points[0].z
      }

      geometry.attributes.position.needsUpdate = true
    })
  })

  return (
    <group ref={wavesRef}>
      {waves.map((wave, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pointsPerWave}
              array={new Float32Array(pointsPerWave * 3)}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#FE5F55" linewidth={2} />
        </line>
      ))}
    </group>
  )
}

const Scene3D = ({ sceneType }) => {
  const scenes = {
    fairness: <FairnessNodes />,
    parametrization: <ParametrizationPath />,
    implementation: <ImplementationWaves />,
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: "transparent" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          {scenes[sceneType]}
        </Float>
      </Suspense>
    </Canvas>
  )
}

const MethodologyOverviewPage = () => {
  const { t } = useTranslation("methodology.overview")

  const handleCTAClick = (ctaType) => {
    trackEvent("overview_cta_clicked", {
      event_category: "engagement",
      event_label: "methodology_overview",
      cta_type: ctaType,
    })
  }

  React.useEffect(() => {
    trackEvent("overview_seen", {
      event_category: "engagement",
      event_label: "methodology_overview",
    })
  }, [])

  const steps = [
    {
      id: "fairness",
      icon: LightbulbIcon,
      color: "#1B5993",
      lightColor: "#DCE7EA",
      position: "left",
      scene: "fairness",
    },
    {
      id: "parametrization",
      icon: SettingsIcon,
      color: "#0A2239",
      lightColor: "#AFC1D6",
      position: "right",
      scene: "parametrization",
    },
    {
      id: "implementation",
      icon: AutorenewIcon,
      color: "#FE5F55",
      lightColor: "#FFE5E3",
      position: "left",
      scene: "implementation",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="MethodologyOverviewPage">
      {/* Hero Section */}
      <motion.section className="overview-hero" initial="hidden" animate="visible" variants={containerVariants}>
        <div className="hero-content">
          <motion.h1 variants={itemVariants}>{t("hero.title")}</motion.h1>
          <motion.p className="hero-description" variants={itemVariants}>
            {t("hero.description")}
          </motion.p>
          <motion.blockquote className="hero-quote" variants={itemVariants}>
            {t("hero.quote")}
          </motion.blockquote>
        </div>
      </motion.section>

      {/* Journey Path Section */}
      <section className="journey-section">
        <motion.div
          className="journey-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants}>{t("journey.title")}</motion.h2>
          <motion.p variants={itemVariants}>{t("journey.subtitle")}</motion.p>
        </motion.div>

        <div className="journey-path">
          {/* SVG Path Background */}
          <svg className="path-svg" viewBox="0 0 1200 1000" preserveAspectRatio="xMidYMid meet">
            <motion.path
              d="M 200 150 Q 600 100, 1000 200 T 200 450 Q 600 400, 1000 550 T 200 800"
              stroke="#DCE7EA"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              variants={pathVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />
          </svg>

          {/* Steps */}
          <div className="journey-steps">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  className={`journey-step ${step.position}`}
                  initial={{ opacity: 0, x: step.position === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="step-number">{index + 1}</div>

                  <motion.div
                    className="step-card"
                    whileHover={{ scale: 1.01, y: -3 }}
                    style={{
                      borderColor: step.color,
                    }}
                  >
                    <div className="step-visual">
                      <div className="step-3d-container">
                        <Scene3D sceneType={step.scene} />
                      </div>
                    </div>

                    <div className="step-content">
                      <div className="step-header">
                        <div className="step-icon-wrapper" style={{ backgroundColor: step.lightColor }}>
                          <Icon sx={{ fontSize: 32, color: step.color }} />
                        </div>
                        <h3>{t(`journey.steps.${step.id}.title`)}</h3>
                      </div>

                      <p className="step-description">{t(`journey.steps.${step.id}.description`)}</p>

                      <div className="step-outcome">
                        <strong>{t("journey.outcome")}:</strong>
                        <p>{t(`journey.steps.${step.id}.outcome`)}</p>
                      </div>

                      <div className="compass-bonus">
                        <strong>{t("journey.compassBonus")}:</strong>
                        <p>{t(`journey.steps.${step.id}.compassBonus`)}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTAs Section */}
      <motion.section
        className="ctas-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div className="ctas-buttons" variants={containerVariants}>
          <motion.a
            href="/services"
            className="cta-button cta-primary"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCTAClick("contact")}
          >
            <ExploreIcon sx={{ fontSize: 20 }} />
            <span>{t("ctas.contact")}</span>
          </motion.a>

          <motion.a
            href="/auth/signin"
            className="cta-button cta-secondary"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCTAClick("register")}
          >
            <StartIcon sx={{ fontSize: 20 }} />
            <span>{t("ctas.register")}</span>
          </motion.a>

          <motion.a
            href="/methodology/guide"
            className="cta-button cta-tertiary"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCTAClick("guide")}
          >
            <RouteIcon sx={{ fontSize: 20 }} />
            <span>{t("ctas.guide")}</span>
          </motion.a>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default MethodologyOverviewPage
