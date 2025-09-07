import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        alert('Thank you for your message! We will get back to you soon.')
        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <div className="contact">
            <section className="contact-hero">
                <div className="container">
                    <motion.div
                        className="contact-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="gradient-text">Contact Us</h1>
                        <p className="contact-intro">
                            Get in touch with us to learn more about BMI Campus and how we can help you achieve your educational goals.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="contact-main">
                <div className="container">
                    <div className="contact-grid">
                        <motion.div
                            className="contact-info"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2>Get in Touch</h2>
                            <div className="info-items">
                                <div className="info-item">
                                    <div className="info-icon">
                                        <MapPin size={24} />
                                    </div>
                                    <div className="info-text">
                                        <h4>Address</h4>
                                        <p>No 14, Asgiriya Road, Kandy, Sri Lanka</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <Phone size={24} />
                                    </div>
                                    <div className="info-text">
                                        <h4>Phone</h4>
                                        <p>081 220 0932 / 081 497 6976 / 081 220 0933</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="info-icon">
                                        <Mail size={24} />
                                    </div>
                                    <div className="info-text">
                                        <h4>Email</h4>
                                        <p>info@iba.lk</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="contact-form-container"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <form className="contact-form glass-effect" onSubmit={handleSubmit}>
                                <h3>Send us a Message</h3>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="Your Message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="submit-btn"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Send Message
                                    <Send size={20} />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact