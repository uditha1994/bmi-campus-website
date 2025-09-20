import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
    Upload,
    FileText,
    Search,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Download,
    Eye,
    Trash2,
    RefreshCw,
    Shield,
    Zap,
    Target
} from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlagiarismResults from '../pages/PlagiarismResults'
import FileUploadZone from '../pages/FileUploadZone'
import TextInputArea from '../pages/TextInputArea'
import './PlagiarismChecker.css'

const PlagiarismChecker = () => {
    const [activeTab, setActiveTab] = useState('upload')
    const [files, setFiles] = useState([])
    const [textInput, setTextInput] = useState('')
    const [isChecking, setIsChecking] = useState(false)
    const [results, setResults] = useState(null)
    const [checkHistory, setCheckHistory] = useState([])

    const handleFileUpload = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            id: Date.now() + Math.random(),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'ready'
        }))
        setFiles(prev => [...prev, ...newFiles])
        toast.success(`${acceptedFiles.length} file(s) uploaded successfully!`)
    }, [])

    const removeFile = (fileId) => {
        setFiles(prev => prev.filter(file => file.id !== fileId))
        toast.info('File removed')
    }

    const handlePlagiarismCheck = async () => {
        if (activeTab === 'upload' && files.length === 0) {
            toast.error('Please upload at least one file')
            return
        }

        if (activeTab === 'text' && !textInput.trim()) {
            toast.error('Please enter some text to check')
            return
        }

        setIsChecking(true)

        try {
            // Simulate API call - replace with actual plagiarism detection API
            await new Promise(resolve => setTimeout(resolve, 3000))

            const mockResults = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                overallScore: Math.floor(Math.random() * 30) + 5, // 5-35% plagiarism
                sources: [
                    {
                        url: 'https://example.com/source1',
                        title: 'Academic Paper on Similar Topic',
                        similarity: 15,
                        matchedText: 'This is a sample matched text from the source...'
                    },
                    {
                        url: 'https://example.com/source2',
                        title: 'Research Article',
                        similarity: 8,
                        matchedText: 'Another example of matched content...'
                    }
                ],
                wordCount: activeTab === 'text' ? textInput.split(' ').length : 1500,
                checkedContent: activeTab === 'text' ? textInput : files[0]?.name || 'Uploaded Document'
            }

            setResults(mockResults)
            setCheckHistory(prev => [mockResults, ...prev.slice(0, 4)]) // Keep last 5 checks
            toast.success('Plagiarism check completed!')

        } catch (error) {
            toast.error('Error during plagiarism check. Please try again.')
            console.error('Plagiarism check error:', error)
        } finally {
            setIsChecking(false)
        }
    }

    const resetChecker = () => {
        setFiles([])
        setTextInput('')
        setResults(null)
        setActiveTab('upload')
        toast.info('Checker reset')
    }

    return (
        <div className="plagiarism-checker">
            {/* Hero Section */}
            <section className="plagiarism-hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero-badge">
                            <Shield size={16} />
                            <span>Academic Integrity Tool</span>
                        </div>

                        <h1 className="gradient-text">Plagiarism Checker</h1>
                        <p className="hero-description">
                            Ensure academic integrity with our advanced plagiarism detection system.
                            Upload documents or paste text to check for originality and get detailed reports.
                        </p>

                        <div className="hero-features">
                            <div className="feature-item">
                                <Zap size={20} />
                                <span>Fast Detection</span>
                            </div>
                            <div className="feature-item">
                                <Target size={20} />
                                <span>Accurate Results</span>
                            </div>
                            <div className="feature-item">
                                <Shield size={20} />
                                <span>Secure & Private</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Main Checker Interface */}
            <section className="checker-interface">
                <div className="container">
                    <div className="checker-layout">
                        {/* Left Panel - Input */}
                        <motion.div
                            className="input-panel glass-effect"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="panel-header">
                                <h3>Submit Content for Checking</h3>
                                <div className="tab-switcher">
                                    <button
                                        className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('upload')}
                                    >
                                        <Upload size={16} />
                                        Upload File
                                    </button>
                                    <button
                                        className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('text')}
                                    >
                                        <FileText size={16} />
                                        Paste Text
                                    </button>
                                </div>
                            </div>

                            <div className="input-content">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'upload' ? (
                                        <motion.div
                                            key="upload"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <FileUploadZone
                                                onFileUpload={handleFileUpload}
                                                files={files}
                                                onRemoveFile={removeFile}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="text"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <TextInputArea
                                                value={textInput}
                                                onChange={setTextInput}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="action-buttons">
                                <motion.button
                                    className="btn-primary check-btn"
                                    onClick={handlePlagiarismCheck}
                                    disabled={isChecking}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isChecking ? (
                                        <>
                                            <RefreshCw size={20} className="spinning" />
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <Search size={20} />
                                            Check for Plagiarism
                                        </>
                                    )}
                                </motion.button>

                                <button
                                    className="btn-secondary reset-btn"
                                    onClick={resetChecker}
                                    disabled={isChecking}
                                >
                                    <Trash2 size={16} />
                                    Reset
                                </button>
                            </div>
                        </motion.div>

                        {/* Right Panel - Results */}
                        <motion.div
                            className="results-panel"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            {results ? (
                                <PlagiarismResults results={results} />
                            ) : (
                                <div className="no-results glass-effect">
                                    <div className="no-results-content">
                                        <Search size={64} className="no-results-icon" />
                                        <h3>Ready to Check</h3>
                                        <p>Upload a document or paste text to begin plagiarism detection</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Check History */}
                    {checkHistory.length > 0 && (
                        <motion.div
                            className="check-history glass-effect"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <h3>Recent Checks</h3>
                            <div className="history-list">
                                {checkHistory.map((check, index) => (
                                    <div key={check.id} className="history-item">
                                        <div className="history-info">
                                            <span className="history-title">{check.checkedContent}</span>
                                            <span className="history-date">
                                                {new Date(check.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className={`history-score ${check.overallScore > 20 ? 'high' : check.overallScore > 10 ? 'medium' : 'low'}`}>
                                            {check.overallScore}%
                                        </div>
                                        <button
                                            className="history-view"
                                            onClick={() => setResults(check)}
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default PlagiarismChecker