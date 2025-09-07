import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Award, Globe } from 'lucide-react'
import './InteractiveStats.css'

const InteractiveStats = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    const stats = [
        {
            icon: <Users size={32} />,
            value: 15000,
            suffix: '+',
            label: 'Students Enrolled',
            description: 'Active learners from around the world',
            color: '#667eea',
            trend: '+12%'
        },
        {
            icon: <Award size={32} />,
            value: 98,
            suffix: '%',
            label: 'Success Rate',
            description: 'Students achieving their goals',
            color: '#764ba2',
            trend: '+5%'
        },
        {
            icon: <Globe size={32} />,
            value: 50,
            suffix: '+',
            label: 'Countries',
            description: 'Global reach and diversity',
            color: '#f093fb',
            trend: '+8%'
        },
        {
            icon: <TrendingUp size={32} />,
            value: 95,
            suffix: '%',
            label: 'Employment Rate',
            description: 'Graduates in their field',
            color: '#667eea',
            trend: '+3%'
        }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % stats.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [stats.length])

    const AnimatedNumber = ({ value, duration = 2000 }) => {
        const [count, setCount] = useState(0)

        useEffect(() => {
            if (!isVisible) return

            let startTime
            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime
                const progress = Math.min((currentTime - startTime) / duration, 1)
                setCount(Math.floor(progress * value))

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }
            requestAnimationFrame(animate)
        }, [value, duration, isVisible])

        return <span>{count.toLocaleString()}</span>
    }

    return (
        <motion.div
            className="interactive-stats"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setIsVisible(true)}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            <div className="stats-container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className={`stat-card ${activeIndex === index ? 'active' : ''}`}
                            style={{ '--stat-color': stat.color }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className="stat-icon">
                                {stat.icon}
                            </div>

                            <div className="stat-content">
                                <div className="stat-number">
                                    <AnimatedNumber value={stat.value} />
                                    <span className="stat-suffix">{stat.suffix}</span>
                                    <div className="stat-trend">
                                        <TrendingUp size={16} />
                                        {stat.trend}
                                    </div>
                                </div>

                                <div className="stat-label">{stat.label}</div>
                                <div className="stat-description">{stat.description}</div>
                            </div>

                            <div className="stat-glow"></div>
                            <div className="stat-progress">
                                <motion.div
                                    className="progress-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: activeIndex === index ? '100%' : '0%' }}
                                    transition={{ duration: 3 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="stats-visualization">
                    <motion.div
                        className="central-display"
                        key={activeIndex}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="display-icon" style={{ color: stats[activeIndex].color }}>
                            {stats[activeIndex].icon}
                        </div>
                        <div className="display-value">
                            <AnimatedNumber value={stats[activeIndex].value} />
                            {stats[activeIndex].suffix}
                        </div>
                        <div className="display-label">{stats[activeIndex].label}</div>
                    </motion.div>

                    <div className="orbit-rings">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="orbit-ring"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 10 + i * 5,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                style={{
                                    width: `${120 + i * 40}px`,
                                    height: `${120 + i * 40}px`,
                                    borderColor: `${stats[activeIndex].color}40`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default InteractiveStats