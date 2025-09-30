"use client"

import {
    Autorenew as AutorenewIcon,
    Explore as ExploreIcon,
    Handshake,
    AltRoute as RouteIcon,
    Settings as SettingsIcon,
    KeyboardArrowRight as StartIcon,
} from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"
import { Float } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { useSession } from "next-auth/react"
import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"
import config from "../../../config"
import { ROUTES } from "../../../constants/constants"
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

        const cycleTime = time % 8
        let progress = 0

        if (cycleTime < 2) {
            progress = cycleTime / 2
        } else if (cycleTime < 3) {
            progress = 1 - (cycleTime - 2)
        } else if (cycleTime < 5) {
            progress = 0
            const rotationTime = cycleTime - 3
            nodesRef.current.rotation.y = rotationTime * 0.5
        } else if (cycleTime < 6) {
            progress = 0
            nodesRef.current.rotation.y = 1
        } else {
            progress = (cycleTime - 6) / 2
            nodesRef.current.rotation.y = 1 - (cycleTime - 6) / 2
        }

        nodesRef.current.children.forEach((node, i) => {
            const data = nodes[i]
            const easedProgress = progress * progress * (3 - 2 * progress)

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
    const router = useRouter()
    const { data: session } = useSession()

    const handleCTAClick = (ctaType, route) => {
        trackEvent("overview_cta_clicked", {
            event_category: "engagement",
            event_label: "methodology_overview",
            cta_type: ctaType,
        })
        router.push(route)
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
            icon: Handshake,
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

    return (
        <>
            <Head>
                <title>{t("page.title")}</title>
                <meta name="description" content={t("page.description")} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <meta property="og:title" key="og.title" content={t("page.title")} />
                <meta property="og:description" key="og.description" content={t("page.description")} />
                <meta property="og:image" key="og.image" content={config.site.head.image.logoSquare} />
                <meta property="og:url" key="og.url" content="https://angorasix.com/methodology/overview" />
                <meta property="og:type" key="og.type" content="website" />
            </Head>
            <div className="MethodologyOverviewPage">
                {/* Hero Section */}
                <section className="overview-hero">
                    <div className="hero-content">
                        <Typography variant="h2" component="h1" className="hero-title">
                            {t("hero.title")}
                        </Typography>
                        <Typography variant="body1" className="hero-description">
                            {t("hero.description")}
                        </Typography>
                        <Typography variant="body2" component="blockquote" className="hero-quote">
                            {t("hero.quote")}
                        </Typography>
                    </div>
                </section>

                {/* Journey Path Section */}
                <section className="journey-section">
                    <div className="journey-header">
                        <Typography variant="h3" component="h2">
                            {t("journey.title")}
                        </Typography>
                        <Typography variant="h6" component="p">
                            {t("journey.subtitle")}
                        </Typography>
                    </div>

                    <div className="journey-path">
                        {/* SVG Path Background */}
                        <svg className="path-svg" viewBox="0 0 1200 1000" preserveAspectRatio="xMidYMid meet">
                            <path
                                d="M 200 150 Q 600 100, 1000 200 T 200 450 Q 600 400, 1000 550 T 200 800"
                                stroke="#DCE7EA"
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Steps */}
                        <div className="journey-steps">
                            {steps.map((step, index) => {
                                const Icon = step.icon
                                return (
                                    <div key={step.id} className={`journey-step ${step.position}`}>
                                        <div className="step-number">{index + 1}</div>

                                        <div
                                            className="step-card"
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
                                                    <Typography variant="h4" component="h3">
                                                        {t(`journey.steps.${step.id}.title`)}
                                                    </Typography>
                                                </div>

                                                <Typography variant="body1" className="step-description">
                                                    {t(`journey.steps.${step.id}.description`)}
                                                </Typography>

                                                <Box className="step-outcome">
                                                    <Typography variant="subtitle2" component="strong">
                                                        {t("journey.outcome")}:
                                                    </Typography>
                                                    <Typography variant="body2">{t(`journey.steps.${step.id}.outcome`)}</Typography>
                                                </Box>

                                                <Box className="compass-bonus">
                                                    <Typography variant="caption" component="strong" className="compass-bonus-label">
                                                        {t("journey.compassBonus")}:
                                                    </Typography>
                                                    <Typography variant="caption" className="compass-bonus-text">
                                                        {t(`journey.steps.${step.id}.compassBonus`)}
                                                    </Typography>
                                                </Box>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* CTAs Section */}
                <section className="ctas-section">
                    <div className="ctas-header">
                        <Typography variant="h4" component="h2" className="ctas-title">
                            {t("ctas.title")}
                        </Typography>
                    </div>
                    <div className="ctas-buttons">
                        <Button
                            className="cta-button cta-primary"
                            onClick={() => handleCTAClick("contact", `${ROUTES.services}?section=guidance&dialog=true`)}
                        >
                            <ExploreIcon sx={{ fontSize: 20 }} />
                            <span>{t("ctas.contact")}</span>
                        </Button>

                        <Button className="cta-button cta-secondary" onClick={() => handleCTAClick("register", session ? ROUTES.welcome.postRegistration : ROUTES.auth.signin)}>
                            <StartIcon sx={{ fontSize: 20 }} />
                            <span>{t("ctas.register")}</span>
                        </Button>

                        <Button className="cta-button cta-tertiary" onClick={() => handleCTAClick("guide", ROUTES.methodology.guide)}>
                            <RouteIcon sx={{ fontSize: 20 }} />
                            <span>{t("ctas.guide")}</span>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default MethodologyOverviewPage
