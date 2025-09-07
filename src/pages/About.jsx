import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Award,
    Users,
    BookOpen,
    Globe,
    Target,
    Eye,
    Heart,
    ChevronRight,
    Quote,
    Calendar,
    MapPin,
    Star,
    TrendingUp
} from 'lucide-react'
import './About.css'

const About = () => {
    const [activeTimeline, setActiveTimeline] = useState(0)
    const [visibleStats, setVisibleStats] = useState(false)

    const timelineEvents = [
        {
            year: '2002',
            title: 'Foundation',
            description: 'IBA Campus established in historic Kandy city, Sri Lanka',
            icon: <BookOpen size={24} />
        },
        {
            year: '2005',
            title: 'Expansion',
            description: 'Campus operations spread across Sri Lanka with multiple branches',
            icon: <Globe size={24} />
        },
        {
            year: '2010',
            title: 'Recognition',
            description: 'Became one of the most renowned private campuses in the region',
            icon: <Award size={24} />
        },
        {
            year: '2015',
            title: 'Innovation',
            description: 'Introduced cutting-edge technology and modern teaching methods',
            icon: <Target size={24} />
        },
        {
            year: '2020',
            title: 'Digital Transformation',
            description: 'Pioneered online learning and hybrid education models',
            icon: <TrendingUp size={24} />
        },
        {
            year: '2024',
            title: 'Future Ready',
            description: 'Leading the way in AI-powered education and global partnerships',
            icon: <Star size={24} />
        }
    ]

    const achievements = [
        { number: 1000, suffix: '+', label: 'Students', icon: <Users size={32} />, color: '#667eea' },
        { number: 200, suffix: '+', label: 'Faculty Members', icon: <Award size={32} />, color: '#764ba2' },
        { number: 25, suffix: '+', label: 'Programs', icon: <BookOpen size={32} />, color: '#f093fb' },
        { number: 22, suffix: '+', label: 'Years of Excellence', icon: <Calendar size={32} />, color: '#667eea' }
    ]

    const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
        const [count, setCount] = useState(0)

        useEffect(() => {
            if (!visibleStats) return

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
        }, [end, duration, visibleStats])

        return <span>{count.toLocaleString()}{suffix}</span>
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTimeline((prev) => (prev + 1) % timelineEvents.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [timelineEvents.length])

    return (
        <div className="about">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="hero-background">
                    <div className="floating-shapes">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="floating-shape"
                                animate={{
                                    y: [-20, 20, -20],
                                    rotate: [0, 180, 360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 4 + i,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.5
                                }}
                                style={{
                                    left: `${15 + i * 15}%`,
                                    top: `${20 + (i % 2) * 40}%`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="container">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="hero-badge"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                        >
                            <MapPin size={16} />
                            <span>Kandy, Sri Lanka</span>
                        </motion.div>

                        <h1 className="gradient-text">About BMI Campus</h1>

                        <motion.p
                            className="about-intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.8 }}
                        >
                            Established in 2002, IBA is a private campus located in historic Kandy city, Sri Lanka.
                            It is one of the most renowned and senior campuses, which has been providing education
                            for local students for over 15 years. Since 2005, campus operations have been spreading
                            out with more branches around Sri Lanka in an effort to grant local students opportunities
                            to gain tertiary education.
                        </motion.p>

                        <motion.div
                            className="hero-stats"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            <div className="hero-stat">
                                <span className="stat-number">22+</span>
                                <span className="stat-label">Years</span>
                            </div>
                            <div className="hero-stat">
                                <span className="stat-number">1000+</span>
                                <span className="stat-label">Students</span>
                            </div>
                            <div className="hero-stat">
                                <span className="stat-number">Multiple</span>
                                <span className="stat-label">Branches</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Timeline Section */}
            {/* <section className="timeline-section">
                <div className="container">
                    <motion.h2
                        className="section-title gradient-text"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Journey Through Time
                    </motion.h2>

                    <div className="timeline-container">
                        <div className="timeline-line">
                            <motion.div
                                className="timeline-progress"
                                initial={{ height: 0 }}
                                whileInView={{ height: '100%' }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                viewport={{ once: true }}
                            />
                        </div>

                        <div className="timeline-events">
                            {timelineEvents.map((event, index) => (
                                <motion.div
                                    key={index}
                                    className={`timeline-event ${activeTimeline === index ? 'active' : ''}`}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    onClick={() => setActiveTimeline(index)}
                                >
                                    <div className="event-content">
                                        <div className="event-year">{event.year}</div>
                                        <div className="event-icon">{event.icon}</div>
                                        <h4>{event.title}</h4>
                                        <p>{event.description}</p>
                                    </div>
                                    <div className="event-connector"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Mission, Vision, Values */}
            <section className="about-details">
                <div className="container">
                    <div className="details-grid">
                        <motion.div
                            className="detail-card mission-card glass-effect"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-icon">
                                <Target size={32} />
                            </div>
                            <h3>Our Mission</h3>
                            <p>
                                IBA Campus belongs to the community and continually strives to provide an accessible,
                                affordable, and high quality education to all its students. The campus is committed to
                                providing an array of academic and student development services that encourage students'
                                success in attaining their academic, cultural, and civic ambitions.
                            </p>
                            <div className="card-decoration"></div>
                        </motion.div>

                        <motion.div
                            className="detail-card vision-card glass-effect"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-icon">
                                <Eye size={32} />
                            </div>
                            <h3>Our Vision</h3>
                            <div className="vision-quote">
                                <Quote size={24} className="quote-icon" />
                                <p>"Upliftment of society with knowledge, skills and positive attitudes"</p>
                            </div>
                            <div className="card-decoration"></div>
                        </motion.div>

                        <motion.div
                            className="detail-card values-card glass-effect"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="card-icon">
                                <Heart size={32} />
                            </div>
                            <h3>Our Values</h3>
                            <ul className="values-list">
                                <li>
                                    <ChevronRight size={16} />
                                    <span>Excellence in Education</span>
                                </li>
                                <li>
                                    <ChevronRight size={16} />
                                    <span>Innovation and Creativity</span>
                                </li>
                                <li>
                                    <ChevronRight size={16} />
                                    <span>Integrity and Ethics</span>
                                </li>
                                <li>
                                    <ChevronRight size={16} />
                                    <span>Diversity and Inclusion</span>
                                </li>
                                <li>
                                    <ChevronRight size={16} />
                                    <span>Community Engagement</span>
                                </li>
                            </ul>
                            <div className="card-decoration"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Enhanced Stats Section */}
            <section className="stats-section">
                <div className="container">
                    <motion.h2
                        className="section-title gradient-text"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Our Achievements
                    </motion.h2>

                    <motion.div
                        className="stats-grid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        onViewportEnter={() => setVisibleStats(true)}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        {achievements.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-item"
                                style={{ '--stat-color': stat.color }}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: index * 0.2, type: "spring" }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="stat-icon">{stat.icon}</div>
                                <h3 className="gradient-text">
                                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                                </h3>
                                <p>{stat.label}</p>
                                <div className="stat-glow"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Message from Chairman */}
            <section className="chairman-section">
                <div className="container">
                    <motion.div
                        className="chairman-content"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-header">
                            <h2 className="gradient-text">Message from the Chairman</h2>
                            <div className="header-decoration">
                                <Quote size={32} />
                            </div>
                        </div>

                        <div className="chairman-card glass-effect">
                            <div className="chairman-image-container">
                                <motion.div
                                    className="chairman-image"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img
                                        src="ceo.jpg"
                                        alt="Chairman"
                                    />
                                    <div className="image-overlay">
                                        <div className="overlay-content">
                                            <h4>Mr.Sisira Wickramasinghe
                                                (Chairman / CEO)</h4>
                                            <p>M.Com(R)(KLN), MBA(Malayasia), B.Sc. Business Administration (Hons) (USJP), MAAT, HNDA (SLTC) AMA (SCMASL), ACPM, CAF (ICASL), FCBA</p>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="floating-elements">
                                    {[...Array(3)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="floating-element"
                                            animate={{
                                                y: [-10, 10, -10],
                                                opacity: [0.3, 1, 0.3]
                                            }}
                                            transition={{
                                                duration: 3 + i,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: i * 0.5
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="chairman-message">
                                <div className="message-header">
                                    <Quote size={48} className="quote-large" />
                                    <h3>Leading with Vision, Inspiring Excellence</h3>
                                </div>

                                <div className="message-content">
                                    <p>
                                        As CEO, I am delighted to welcome you to IBA campus. This is an institution that, as for many years, has educated the students and whose performances have prevailed in various industries. Furthermore, I am proud to declare that we have established quite number of study centers in an effort to grant local students opportunities to gain better student experience within Sri Lanka.
                                    </p>

                                    <p>
                                        We are also always striving to achieve more and enhance our reputation nationally and internationally. In particular, we are keen to develop new courses to attract a wide range of students, particularly at Undergraduate and postgraduate levels. Hither to, more than 25,000 students have completed their degree and professional programs successfully since 2002, and the majority of past students who undertook academic and professional level programs acquired the best knowledge and experience . We have a clear strategy to take us to 2020, based on a clear vision to in intellectual talent to make a difference to our city, our region and our nation.
                                    </p>

                                </div>

                                <div className="message-signature">
                                    <div className="signature-line">
                                        <span className="signature-name">Mr. Sisira Wickramasinghe
                                            (Chairman / CEO)</span>
                                        <span className="signature-title">M.Com(R)(KLN), MBA(Malayasia), B.Sc. Business Administration (Hons) (USJP), MAAT, HNDA (SLTC) AMA (SCMASL), ACPM, CAF (ICASL), FCBA</span>
                                    </div>
                                    <div className="signature-date">
                                        <Calendar size={16} />
                                        <span>BMI Campus - Since 2002</span>
                                    </div>
                                </div>

                                <div className="message-highlights">
                                    <div className="highlight-item">
                                        <Award size={20} />
                                        <span>25+ Years in Education</span>
                                    </div>
                                    <div className="highlight-item">
                                        <Users size={20} />
                                        <span>10,000+ Lives Transformed</span>
                                    </div>
                                    <div className="highlight-item">
                                        <Globe size={20} />
                                        <span>Global Recognition</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default About 