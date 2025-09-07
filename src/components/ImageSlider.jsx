import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './ImageSlider.css'

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const images = [
        {
            url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
            title: 'Modern Campus'
        },
        {
            url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
            title: 'Learning Environment'
        },
        {
            url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
            title: 'Innovation Hub'
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            )
        }, 4000)

        return () => clearInterval(timer)
    }, [images.length])

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    }

    const goToNext = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    }

    return (
        <div className="slider-container">
            <div className="slider-wrapper">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="slide"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={images[currentIndex].url}
                            alt={images[currentIndex].title}
                            className="slide-image"
                        />
                        <div className="slide-overlay">
                            <h3>{images[currentIndex].title}</h3>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button className="slider-btn prev" onClick={goToPrevious}>
                    <ChevronLeft size={24} />
                </button>
                <button className="slider-btn next" onClick={goToNext}>
                    <ChevronRight size={24} />
                </button>

                <div className="slider-dots">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ImageSlider