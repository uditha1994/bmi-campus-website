import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, X, GraduationCap, Code, Beaker, Calculator, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import './FloatingCourses.css'

const FloatingCourses = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const courses = [
        {
            id: 1,
            title: 'Computer Science',
            icon: <Code size={24} />,
            description: 'Learn programming, algorithms, and software development',
            duration: '4 Years',
            level: 'Bachelor\'s'
        },
        {
            id: 2,
            title: 'Engineering',
            icon: <Calculator size={24} />,
            description: 'Mechanical, Electrical, and Civil Engineering programs',
            duration: '4 Years',
            level: 'Bachelor\'s'
        },
        {
            id: 3,
            title: 'Biotechnology',
            icon: <Beaker size={24} />,
            description: 'Explore the intersection of biology and technology',
            duration: '4 Years',
            level: 'Bachelor\'s'
        },
        {
            id: 4,
            title: 'Business Administration',
            icon: <GraduationCap size={24} />,
            description: 'Management, Finance, and Entrepreneurship',
            duration: '4 Years',
            level: 'Bachelor\'s'
        }
    ]

    return (
        <>
            <motion.div
                className="floating-courses-container"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            >
                <motion.button
                    className="floating-courses-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                >
                    {/* Animated background circles */}
                    <div className="btn-bg-circle circle-1"></div>
                    <div className="btn-bg-circle circle-2"></div>
                    <div className="btn-bg-circle circle-3"></div>

                    {/* Main content */}
                    <div className="btn-content">
                        <motion.div
                            className="btn-icon"
                            animate={{
                                rotate: isHovered ? 360 : 0,
                                scale: isHovered ? 1.2 : 1
                            }}
                            transition={{ duration: 0.6 }}
                        >
                            <GraduationCap size={28} />
                        </motion.div>

                        <motion.div
                            className="btn-text"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : 20
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="btn-label">Courses</span>
                            <span className="btn-sublabel">Explore Programs</span>
                        </motion.div>
                    </div>

                    {/* Floating particles */}
                    <div className="floating-particles">
                        <motion.div
                            className="particle particle-1"
                            animate={{
                                y: [-10, -20, -10],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles size={12} />
                        </motion.div>
                        <motion.div
                            className="particle particle-2"
                            animate={{
                                y: [-15, -25, -15],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5
                            }}
                        >
                            <BookOpen size={10} />
                        </motion.div>
                        <motion.div
                            className="particle particle-3"
                            animate={{
                                y: [-8, -18, -8],
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 1.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                        >
                            <Code size={8} />
                        </motion.div>
                    </div>

                    {/* Pulse effect */}
                    <motion.div
                        className="pulse-ring"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.button>

                {/* Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="btn-tooltip"
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="tooltip-content">
                                <h4>Discover Our Courses</h4>
                                <p>Explore world-class programs</p>
                            </div>
                            <div className="tooltip-arrow"></div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="courses-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="courses-modal"
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="courses-header">
                                <h2 className="gradient-text">Our Courses</h2>
                                <button className="courses-close" onClick={() => setIsOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="courses-grid">
                                {courses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        className="course-card glass-effect"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="course-icon">
                                            {course.icon}
                                        </div>
                                        <h3>{course.title}</h3>
                                        <p>{course.description}</p>
                                        <div className="course-details">
                                            <span className="course-duration">{course.duration}</span>
                                            <span className="course-level">{course.level}</span>
                                        </div>
                                        <button className="course-btn">Learn More</button>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="courses-footer">
                                <Link
                                    to="/courses"
                                    className="view-all-btn"
                                    onClick={() => setIsOpen(false)}
                                >
                                    View All Courses
                                    <ArrowRight size={20} />
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default FloatingCourses