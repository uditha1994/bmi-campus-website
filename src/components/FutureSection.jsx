import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain,
    Cpu,
    Zap,
    Globe,
    Rocket,
    Shield,
    Eye,
    Wifi,
    ChevronRight,
    Play,
    Pause,
    RotateCcw
} from 'lucide-react'
import Scene3D from './Scene3D'
import './FutureSection.css'

const FutureSection = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)
    const [currentStat, setCurrentStat] = useState(0)

    const technologies = [
        {
            id: 'ai',
            name: 'Artificial Intelligence',
            icon: <Brain size={32} />,
            description: 'Machine learning algorithms that adapt to student needs',
            color: '#667eea',
            stats: { accuracy: 95, efficiency: 88, satisfaction: 92 }
        },
        {
            id: 'quantum',
            name: 'Quantum Computing',
            icon: <Cpu size={32} />,
            description: 'Next-generation computing for complex problem solving',
            color: '#764ba2',
            stats: { speed: 1000, capacity: 99, innovation: 96 }
        },
        {
            id: 'vr',
            name: 'Virtual Reality',
            icon: <Eye size={32} />,
            description: 'Immersive learning experiences in virtual environments',
            color: '#f093fb',
            stats: { immersion: 98, engagement: 94, retention: 89 }
        },
        {
            id: 'iot',
            name: 'Internet of Things',
            icon: <Wifi size={32} />,
            description: 'Connected campus ecosystem for seamless learning',
            color: '#667eea',
            stats: { connectivity: 100, automation: 85, efficiency: 91 }
        }
    ]

    const achievements = [
        { label: 'Students Graduated', value: 1000, suffix: '+', duration: 2000 },
        { label: 'Research Projects', value: 50, suffix: '+', duration: 1500 },
        { label: 'Industry Partners', value: 30, suffix: '+', duration: 1800 },
        { label: 'Success Rate', value: 96, suffix: '%', duration: 1200 }
    ]

    const innovations = [
        // {
        //     title: 'Smart Classrooms',
        //     description: 'AI-powered learning environments that adapt to each student',
        //     image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop'
        // },
        // {
        //     title: 'Virtual Labs',
        //     description: 'Conduct experiments in safe, virtual laboratory environments',
        //     image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
        // },
        // {
        //     title: 'Global Collaboration',
        //     description: 'Connect with students and researchers worldwide',
        //     image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
        // }
    ]

    // Auto-rotate tabs
    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % technologies.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [isPlaying, technologies.length])

    // Animated counter
    const AnimatedCounter = ({ end, duration, suffix = '' }) => {
        const [count, setCount] = useState(0)

        useEffect(() => {
            let startTime
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime
                const progress = Math.min((currentTime - startTime) / duration, 1)
                setCount(Math.floor(progress * end))

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }
            requestAnimationFrame(animate)
        }, [end, duration])

        return <span>{count.toLocaleString()}{suffix}</span>
    }

    return (
        <section className="future-section">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="future-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="gradient-text">Experience the Future</h2>
                    <p className="future-subtitle">
                        Discover how cutting-edge technology transforms education at BMI Campus
                    </p>
                </motion.div>

                {/* Technology Showcase */}
                <div className="technology-showcase">
                    <div className="tech-content">
                        {/* Technology Tabs */}
                        <motion.div
                            className="tech-tabs"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="tab-controls">
                                <button
                                    className={`control-btn ${isPlaying ? 'active' : ''}`}
                                    onClick={() => setIsPlaying(!isPlaying)}
                                >
                                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                                </button>
                                <button
                                    className="control-btn"
                                    onClick={() => setActiveTab(0)}
                                >
                                    <RotateCcw size={16} />
                                </button>
                            </div>

                            {technologies.map((tech, index) => (
                                <motion.div
                                    key={tech.id}
                                    className={`tech-tab ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => setActiveTab(index)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ '--tech-color': tech.color }}
                                >
                                    <div className="tab-icon">{tech.icon}</div>
                                    <div className="tab-content">
                                        <h4>{tech.name}</h4>
                                        <p>{tech.description}</p>
                                    </div>
                                    <div className="tab-indicator">
                                        <ChevronRight size={20} />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* 3D Scene */}
                        <motion.div
                            className="tech-visualization"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <div className="scene-container">
                                <Scene3D />

                                {/* Floating Stats */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        className="floating-stats"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {Object.entries(technologies[activeTab].stats).map(([key, value], index) => (
                                            <motion.div
                                                key={key}
                                                className="stat-bubble"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                style={{ '--bubble-color': technologies[activeTab].color }}
                                            >
                                                <span className="stat-value">{value}%</span>
                                                <span className="stat-label">{key}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Tech Particles */}
                                <div className="tech-particles">
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="particle"
                                            animate={{
                                                y: [-20, -100, -20],
                                                opacity: [0, 1, 0],
                                                scale: [0.5, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                                ease: "easeInOut"
                                            }}
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                animationDelay: `${i * 0.2}s`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Achievements Counter */}
                <motion.div
                    className="achievements-section"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="achievements-grid">
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={achievement.label}
                                className="achievement-card glass-effect"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="achievement-number">
                                    <AnimatedCounter
                                        end={achievement.value}
                                        duration={achievement.duration}
                                        suffix={achievement.suffix}
                                    />
                                </div>
                                <div className="achievement-label">{achievement.label}</div>
                                <div className="achievement-glow"></div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Innovation Showcase */}
                <motion.div
                    className="innovation-showcase"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="innovation-title">Innovation in Action</h3>
                    <div className="innovation-grid">
                        {innovations.map((innovation, index) => (
                            <motion.div
                                key={innovation.title}
                                className="innovation-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="innovation-image">
                                    <img src={innovation.image} alt={innovation.title} />
                                    <div className="innovation-overlay">
                                        <Rocket size={32} />
                                    </div>
                                </div>
                                <div className="innovation-content">
                                    <h4>{innovation.title}</h4>
                                    <p>{innovation.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="future-cta"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="cta-content glass-effect">
                        <div className="cta-icon">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <Globe size={48} />
                            </motion.div>
                        </div>
                        <h3>Ready to Shape the Future?</h3>
                        <p>Join our community of innovators and be part of the next generation of leaders</p>
                        <div className="cta-buttons">
                            <motion.button
                                className="cta-btn primary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Zap size={20} />
                                Start Your Journey
                            </motion.button>
                            <motion.button
                                className="cta-btn secondary"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Shield size={20} />
                                Learn More
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default FutureSection