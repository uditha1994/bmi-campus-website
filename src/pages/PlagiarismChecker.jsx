import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Target,
  Brain // New icon for AI detection
} from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlagiarismResults from '../pages/PlagiarismResults'
import FileUploadZone from '../pages/FileUploadZone'
import TextInputArea from '../pages/TextInputArea'
import { processFile, countWords } from '../utils/fileProcessor'
import { generateTurnitinStyleReport } from '../utils/reportGenerator'
import {
  generateConsistentPlagiarismScore,
  generateConsistentSources,
  generateConsistentAIScore
} from '../utils/plagiarismGenerator'
import './PlagiarismChecker.css'

const PlagiarismChecker = () => {
  const [activeTab, setActiveTab] = useState('upload')
  const [files, setFiles] = useState([])
  const [textInput, setTextInput] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [results, setResults] = useState(null)
  const [checkHistory, setCheckHistory] = useState([])
  const [processedFiles, setProcessedFiles] = useState([])

  const handleFileUpload = useCallback(async (acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'processing'
    }))

    setFiles(prev => [...prev, ...newFiles])
    toast.info(`Processing ${acceptedFiles.length} file(s)...`)

    const processed = []
    for (const fileItem of newFiles) {
      try {
        const processedData = await processFile(fileItem.file)
        processed.push({
          ...fileItem,
          status: 'ready',
          processedData
        })
        toast.success(`${fileItem.name} processed successfully!`)
      } catch (error) {
        processed.push({
          ...fileItem,
          status: 'error',
          error: error.message
        })
        toast.error(`Failed to process ${fileItem.name}: ${error.message}`)
      }
    }

    setProcessedFiles(prev => [...prev, ...processed])

    setFiles(prev => prev.map(file => {
      const processedFile = processed.find(p => p.id === file.id)
      return processedFile || file
    }))
  }, [])

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(file => file.id !== fileId))
    setProcessedFiles(prev => prev.filter(file => file.id !== fileId))
    toast.info('File removed')
  }

  const handlePlagiarismCheck = async () => {
    let contentToCheck = ''
    let wordCount = 0
    let checkedContent = ''
    let fileIdentifier = ''

    if (activeTab === 'upload') {
      const readyFiles = processedFiles.filter(file => file.status === 'ready')
      if (readyFiles.length === 0) {
        toast.error('Please upload and process at least one file')
        return
      }

      contentToCheck = readyFiles.map(file => file.processedData.text).join('\n\n')
      wordCount = readyFiles.reduce((total, file) => total + file.processedData.wordCount, 0)
      checkedContent = readyFiles.length === 1 ?
        readyFiles[0].name :
        `${readyFiles.length} documents (${readyFiles.map(f => f.name).join(', ')})`
      fileIdentifier = readyFiles.map(f => f.name + f.size).join('_')
    } else {
      if (!textInput.trim()) {
        toast.error('Please enter some text to check')
        return
      }
      contentToCheck = textInput
      wordCount = countWords(textInput)
      checkedContent = 'Pasted Text'
      fileIdentifier = 'text_' + simpleHash(textInput)
    }

    if (wordCount < 10) {
      toast.warning('Content is too short for accurate detection. Minimum 10 words recommended.')
    }

    setIsChecking(true)

    try {
      const processingTime = Math.min(Math.max(wordCount * 3, 3000), 8000)
      await new Promise(resolve => setTimeout(resolve, processingTime))

      // Generate consistent results
      const overallScore = generateConsistentPlagiarismScore(contentToCheck, fileIdentifier)
      const aiScore = generateConsistentAIScore(contentToCheck, fileIdentifier)
      const sources = generateConsistentSources(contentToCheck, fileIdentifier, overallScore)

      const mockResults = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        overallScore: overallScore,
        aiScore: aiScore, // NEW: AI detection score
        sources: sources,
        wordCount: wordCount,
        charCount: contentToCheck.length,
        checkedContent: checkedContent,
        originalContent: contentToCheck,
        fileIdentifier: fileIdentifier,
        // Additional Turnitin-style data
        submissionId: `BMI${Date.now().toString().slice(-8)}`,
        studentName: 'Student Name',
        courseName: 'Course Assignment',
        instructor: 'Instructor Name'
      }

      setResults(mockResults)
      setCheckHistory(prev => [mockResults, ...prev.slice(0, 4)])
      toast.success('Analysis completed!')

    } catch (error) {
      toast.error('Error during analysis. Please try again.')
      console.error('Analysis error:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const resetChecker = () => {
    setFiles([])
    setProcessedFiles([])
    setTextInput('')
    setResults(null)
    setActiveTab('upload')
    toast.info('Checker reset')
  }

  const handleDownloadReport = async () => {
    if (!results) {
      toast.error('No results to download')
      return
    }

    try {
      toast.info('Generating Turnitin-style report...')
      await generateTurnitinStyleReport(results)
      toast.success('Report downloaded successfully!')
    } catch (error) {
      toast.error('Failed to generate report')
      console.error('Report generation error:', error)
    }
  }

  const simpleHash = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash)
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
              <span>Academic Integrity & AI Detection Tool</span>
            </div>

            <h1 className="gradient-text">Plagiarism & AI Checker</h1>
            <p className="hero-description">
              Comprehensive academic integrity analysis with plagiarism detection and AI-generated content identification.
              Get detailed reports similar to industry-standard tools.
            </p>

            <div className="hero-features">
              <div className="feature-item">
                <Zap size={20} />
                <span>Fast Detection</span>
              </div>
              <div className="feature-item">
                <Brain size={20} />
                <span>AI Detection</span>
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
                <h3>Submit Content for Analysis</h3>
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
                        processedFiles={processedFiles}
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
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search size={20} />
                      Check Plagiarism & AI
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
                <PlagiarismResults
                  results={results}
                  onDownloadReport={handleDownloadReport}
                />
              ) : (
                <div className="no-results glass-effect">
                  <div className="no-results-content">
                    <div className="analysis-icons">
                      <Search size={48} className="no-results-icon" />
                      <Brain size={32} className="ai-icon" />
                    </div>
                    <h3>Ready to Analyze</h3>
                    <p>Upload a document or paste text to begin plagiarism and AI detection analysis</p>
                    <div className="analysis-features">
                      <div className="feature">
                        <Shield size={16} />
                        <span>Plagiarism Detection</span>
                      </div>
                      <div className="feature">
                        <Brain size={16} />
                        <span>AI Content Detection</span>
                      </div>
                    </div>
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
              <h3>Recent Analysis</h3>
              <div className="history-list">
                {checkHistory.map((check, index) => (
                  <div key={check.id} className="history-item">
                    <div className="history-info">
                      <span className="history-title">{check.checkedContent}</span>
                      <span className="history-date">
                        {new Date(check.timestamp).toLocaleDateString()} - {check.wordCount} words
                      </span>
                    </div>
                    <div className="history-scores">
                      <div className={`history-score plagiarism ${check.overallScore > 10 ? 'high' : check.overallScore > 5 ? 'medium' : 'low'}`}>
                        <span className="score-label">Plagiarism</span>
                        <span className="score-value">{check.overallScore}%</span>
                      </div>
                      <div className={`history-score ai ${check.aiScore > 3 ? 'high' : check.aiScore > 1 ? 'medium' : 'low'}`}>
                        <span className="score-label">AI</span>
                        <span className="score-value">{check.aiScore}%</span>
                      </div>
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