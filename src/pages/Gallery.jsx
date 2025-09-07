import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Gallery.css'

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

    const images = [
        {
            id: 1,
            url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
            title: 'Campus Main Building',
            category: 'Architecture'
        },
        {
            id: 2,
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
            title: 'Modern Library',
            category: 'Facilities'
        },
        {
            id: 3,
            url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
            title: 'Science Laboratory',
            category: 'Labs'
        },
        {
            id: 4,
            url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
            title: 'Student Commons',
            category: 'Student Life'
        },
        {
            id: 5,
            url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
            title: 'Lecture Hall',
            category: 'Classrooms'
        },
        {
            id: 6,
            url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
            title: 'Campus Courtyard',
            category: 'Outdoor'
        },
        {
            id: 7,
            url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
            title: 'Study Groups',
            category: 'Student Life'
        },
        {
            id: 8,
            url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
            title: 'Computer Lab',
            category: 'Labs'
        }
    ]

    const openModal = (image, index) => {
        setSelectedImage(image)
        setCurrentIndex(index)
    }

    const closeModal = () => {
        setSelectedImage(null)
    }

    const nextImage = () => {
        const nextIndex = (currentIndex + 1) % images.length
        setCurrentIndex(nextIndex)
        setSelectedImage(images[nextIndex])
    }

    const prevImage = () => {
        const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
        setCurrentIndex(prevIndex)
        setSelectedImage(images[prevIndex])
    }

    return (
        <div className="gallery">
            <section className="gallery-hero">
                <div className="container">
                    <motion.div
                        className="gallery-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="gradient-text">Campus Gallery</h1>
                        <p className="gallery-intro">
                            Explore our beautiful campus through this visual journey.
                            Discover our modern facilities, vibrant student life, and inspiring learning environments.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="gallery-main">
                <div className="container">
                    <motion.div
                        className="gallery-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {images.map((image, index) => (
                            <motion.div
                                key={image.id}
                                className="gallery-item"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => openModal(image, index)}
                            >
                                <div className="gallery-image-container">
                                    <img src={image.url} alt={image.title} />
                                    <div className="gallery-overlay">
                                        <h3>{image.title}</h3>
                                        <p>{image.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close" onClick={closeModal}>
                                <X size={24} />
                            </button>

                            <button className="modal-nav prev" onClick={prevImage}>
                                <ChevronLeft size={24} />
                            </button>

                            <button className="modal-nav next" onClick={nextImage}>
                                <ChevronRight size={24} />
                            </button>

                            <img src={selectedImage.url} alt={selectedImage.title} />

                            <div className="modal-info">
                                <h3>{selectedImage.title}</h3>
                                <p>{selectedImage.category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Gallery