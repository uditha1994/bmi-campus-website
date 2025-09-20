import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Type, Copy, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import './TextInputArea.css'

const TextInputArea = ({ value, onChange }) => {
    const [wordCount, setWordCount] = useState(0)
    const [charCount, setCharCount] = useState(0)

    useEffect(() => {
        const words = value.trim() ? value.trim().split(/\s+/).length : 0
        setWordCount(words)
        setCharCount(value.length)
    }, [value])

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            onChange(value + text)
            toast.success('Text pasted successfully!')
        } catch (err) {
            toast.error('Failed to paste text')
        }
    }

    const handleClear = () => {
        onChange('')
        toast.info('Text cleared')
    }

    const sampleTexts = [
        "Enter your text here to check for plagiarism...",
        "Paste your essay, research paper, or any content you want to verify...",
        "Upload your academic work to ensure originality..."
    ]

    return (
        <div className="text-input-area">
            <div className="input-header">
                <div className="header-info">
                    <Type size={20} />
                    <span>Text Input</span>
                </div>
                <div className="input-actions">
                    <button
                        className="action-btn"
                        onClick={handlePaste}
                        title="Paste from clipboard"
                    >
                        <Copy size={16} />
                    </button>
                    <button
                        className="action-btn"
                        onClick={handleClear}
                        title="Clear text"
                        disabled={!value}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <motion.div
                className="textarea-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Paste your text here or start typing..."
                    className="text-input"
                    rows={12}
                />

                {!value && (
                    <div className="placeholder-suggestions">
                        <p>You can:</p>
                        <ul>
                            <li>Paste text directly from your clipboard</li>
                            <li>Type or copy content from documents</li>
                            <li>Check essays, research papers, or articles</li>
                            <li>Verify content originality before submission</li>
                        </ul>
                    </div>
                )}
            </motion.div>

            <div className="input-stats">
                <div className="stat-item">
                    <span className="stat-label">Words:</span>
                    <span className="stat-value">{wordCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Characters:</span>
                    <span className="stat-value">{charCount.toLocaleString()}</span>
                </div>
                <div className="stat-item">
                    <span className={`stat-label ${wordCount < 50 ? 'warning' : 'success'}`}>
                        {wordCount < 50 ? 'Minimum 50 words recommended' : 'Ready to check'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TextInputArea