import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Code,
    Calculator,
    Beaker,
    GraduationCap,
    Palette,
    Heart,
    Building,
    Globe,
    Clock,
    Users,
    Award,
    BookOpen,
    Filter,
    Search
} from 'lucide-react'
import './Courses.css'

const Courses = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')

    const categories = ['All', 'Computer Science', 'AI', 'Business', 'Management', 'Hotel']

    const courses = [
        // {
        //     id: 1,
        //     title: 'Computer Science & Engineering',
        //     category: 'Technology',
        //     icon: <Code size={32} />,
        //     description: 'Master programming, algorithms, software development, and cutting-edge technologies including AI and machine learning.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '450+',
        //     rating: 4.8,
        //     features: ['Programming Languages', 'Data Structures', 'AI & ML', 'Web Development', 'Mobile Apps'],
        //     image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
        //     price: '$45,000',
        //     popular: true
        // },
        // {
        //     id: 2,
        //     title: 'Mechanical Engineering',
        //     category: 'Engineering',
        //     icon: <Calculator size={32} />,
        //     description: 'Design, analyze, and manufacture mechanical systems with focus on innovation and sustainability.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '380+',
        //     rating: 4.7,
        //     features: ['CAD Design', 'Thermodynamics', 'Materials Science', 'Robotics', 'Manufacturing'],
        //     image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
        //     price: '$42,000'
        // },
        // {
        //     id: 3,
        //     title: 'Biotechnology',
        //     category: 'Science',
        //     icon: <Beaker size={32} />,
        //     description: 'Explore the intersection of biology and technology to solve real-world problems in healthcare and environment.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '220+',
        //     rating: 4.9,
        //     features: ['Genetic Engineering', 'Bioinformatics', 'Lab Techniques', 'Research Methods', 'Bioethics'],
        //     image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop',
        //     price: '$48,000',
        //     popular: true
        // },
        // {
        //     id: 4,
        //     title: 'Business Administration',
        //     category: 'Business',
        //     icon: <GraduationCap size={32} />,
        //     description: 'Develop leadership skills and business acumen in management, finance, marketing, and entrepreneurship.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '520+',
        //     rating: 4.6,
        //     features: ['Strategic Management', 'Finance', 'Marketing', 'Leadership', 'Entrepreneurship'],
        //     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
        //     price: '$40,000'
        // },
        // {
        //     id: 5,
        //     title: 'Graphic Design',
        //     category: 'Arts',
        //     icon: <Palette size={32} />,
        //     description: 'Create visual communications through digital design, branding, and multimedia arts.',
        //     duration: '3 Years',
        //     level: 'Bachelor\'s',
        //     students: '180+',
        //     rating: 4.7,
        //     features: ['Adobe Creative Suite', 'Branding', 'UI/UX Design', 'Typography', 'Digital Art'],
        //     image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        //     price: '$35,000'
        // },
        // {
        //     id: 6,
        //     title: 'Nursing',
        //     category: 'Health',
        //     icon: <Heart size={32} />,
        //     description: 'Provide compassionate healthcare with comprehensive training in patient care and medical procedures.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '320+',
        //     rating: 4.8,
        //     features: ['Patient Care', 'Medical Procedures', 'Health Assessment', 'Pharmacology', 'Clinical Practice'],
        //     image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
        //     price: '$46,000'
        // },
        // {
        //     id: 7,
        //     title: 'Civil Engineering',
        //     category: 'Engineering',
        //     icon: <Building size={32} />,
        //     description: 'Design and construct infrastructure projects including bridges, buildings, and transportation systems.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '290+',
        //     rating: 4.6,
        //     features: ['Structural Design', 'Construction Management', 'Environmental Engineering', 'Transportation', 'Surveying'],
        //     image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop',
        //     price: '$43,000'
        // },
        // {
        //     id: 8,
        //     title: 'International Relations',
        //     category: 'Arts',
        //     icon: <Globe size={32} />,
        //     description: 'Study global politics, diplomacy, and international affairs to understand world dynamics.',
        //     duration: '4 Years',
        //     level: 'Bachelor\'s',
        //     students: '150+',
        //     rating: 4.5,
        //     features: ['Global Politics', 'Diplomacy', 'International Law', 'Cultural Studies', 'Policy Analysis'],
        //     image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop',
        //     price: '$38,000'
        // }
    ]

    const filteredCourses = courses.filter(course => {
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <div className="courses">
            <section className="courses-hero">
                <div className="container">
                    <motion.div
                        className="courses-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="gradient-text">Our Courses</h1>
                        <p className="courses-intro">
                            Discover world-class programs designed to prepare you for success in your chosen field.
                            Our comprehensive curriculum combines theoretical knowledge with practical experience.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="courses-filters">
                <div className="container">
                    <motion.div
                        className="filters-container"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="search-container">
                            <Search size={20} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <div className="category-filters">
                            <Filter size={20} />
                            <div className="filter-buttons">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="courses-grid-section">
                <div className="container">
                    <motion.div
                        className="courses-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        {filteredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                className={`course-card glass-effect ${course.popular ? 'popular' : ''}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                {course.popular && (
                                    <div className="popular-badge">
                                        <Award size={16} />
                                        Popular
                                    </div>
                                )}

                                <div className="course-image">
                                    <img src={course.image} alt={course.title} />
                                    <div className="course-overlay">
                                        <div className="course-icon">
                                            {course.icon}
                                        </div>
                                    </div>
                                </div>

                                <div className="course-content">
                                    <div className="course-header">
                                        <h3>{course.title}</h3>
                                        <span className="course-category">{course.category}</span>
                                    </div>

                                    <p className="course-description">{course.description}</p>

                                    <div className="course-features">
                                        {course.features.slice(0, 3).map((feature, idx) => (
                                            <span key={idx} className="feature-tag">{feature}</span>
                                        ))}
                                        {course.features.length > 3 && (
                                            <span className="feature-more">+{course.features.length - 3} more</span>
                                        )}
                                    </div>

                                    <div className="course-stats">
                                        <div className="stat">
                                            <Clock size={16} />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="stat">
                                            <Users size={16} />
                                            <span>{course.students}</span>
                                        </div>
                                        <div className="stat">
                                            <BookOpen size={16} />
                                            <span>{course.level}</span>
                                        </div>
                                    </div>

                                    <div className="course-footer">
                                        <div className="course-price">
                                            <span className="price">{course.price}</span>
                                            <span className="price-period">/ year</span>
                                        </div>
                                        <div className="course-rating">
                                            <span className="rating">★ {course.rating}</span>
                                        </div>
                                    </div>

                                    <div className="course-actions">
                                        <button className="btn-primary">Enroll Now</button>
                                        <button className="btn-secondary">Learn More</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {filteredCourses.length === 0 && (
                        <motion.div
                            className="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="no-results-content">
                                <BookOpen size={64} className="no-results-icon" />
                                <h3>No courses found</h3>
                                <p>Try adjusting your search or filter criteria</p>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        setSearchTerm('')
                                        setSelectedCategory('All')
                                    }}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <section className="courses-cta">
                <div className="container">
                    <motion.div
                        className="cta-content glass-effect"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Start Your Journey?</h2>
                        <p>Join thousands of students who have transformed their careers with our programs</p>
                        <div className="cta-buttons">
                            <button className="btn-primary">Apply Now</button>
                            <button className="btn-secondary">Schedule a Tour</button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Courses