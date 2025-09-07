import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageSlider from '../components/ImageSlider'
import Scene3D from '../components/Scene3D'
import FloatingCourses from '../components/FloatingCourses'
import FutureSection from '../components/FutureSection'
import './Home.css'

const Home = () => {
    return (
        <div className="home">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <motion.div
                            className="hero-left"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="campus-name">
                                <span className="gradient-text">BMI Campus</span>
                            </h1>
                            <p className="hero-description">
                                Welcome to BMI Campus - where innovation meets education.
                                We provide world-class learning experiences with cutting-edge
                                technology and modern facilities. Join us in shaping the future
                                of education and unlock your potential in a dynamic learning environment.
                            </p>
                            <motion.div
                                className="hero-buttons"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                <Link to="/courses" className="btn-primary">
                                    Explore Courses
                                    <ArrowRight size={20} />
                                </Link>
                                <Link to="/about" className="btn-secondary">
                                    Learn More
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-right"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <ImageSlider />
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="features-grid"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="feature-card glass-effect">
                            <div className="feature-icon">🎓</div>
                            <h3>Quality Education</h3>
                            <p>Experience excellence in education with our comprehensive programs and expert faculty.</p>
                        </div>
                        <div className="feature-card glass-effect">
                            <div className="feature-icon">🚀</div>
                            <h3>Innovation Hub</h3>
                            <p>Be part of cutting-edge research and innovation that shapes tomorrow's technology.</p>
                        </div>
                        <div className="feature-card glass-effect">
                            <div className="feature-icon">🌟</div>
                            <h3>Modern Facilities</h3>
                            <p>Learn in state-of-the-art facilities designed for optimal learning experiences.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <FutureSection />

            <FloatingCourses />
        </div>
    )
}

export default Home