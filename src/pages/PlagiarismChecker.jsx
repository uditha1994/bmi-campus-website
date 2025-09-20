// import React, { useState, useCallback } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useDropzone } from 'react-dropzone'
// import {
//     Upload,
//     FileText,
//     Search,
//     AlertTriangle,
//     CheckCircle,
//     XCircle,
//     Download,
//     Eye,
//     Trash2,
//     RefreshCw,
//     Shield,
//     Zap,
//     Target
// } from 'lucide-react'
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
// import PlagiarismResults from '../pages/PlagiarismResults'
// import FileUploadZone from '../pages/FileUploadZone'
// import TextInputArea from '../pages/TextInputArea'
// import './PlagiarismChecker.css'

// const PlagiarismChecker = () => {
//     const [activeTab, setActiveTab] = useState('upload')
//     const [files, setFiles] = useState([])
//     const [textInput, setTextInput] = useState('')
//     const [isChecking, setIsChecking] = useState(false)
//     const [results, setResults] = useState(null)
//     const [checkHistory, setCheckHistory] = useState([])

//     const handleFileUpload = useCallback((acceptedFiles) => {
//         const newFiles = acceptedFiles.map(file => ({
//             id: Date.now() + Math.random(),
//             file,
//             name: file.name,
//             size: file.size,
//             type: file.type,
//             status: 'ready'
//         }))
//         setFiles(prev => [...prev, ...newFiles])
//         toast.success(`${acceptedFiles.length} file(s) uploaded successfully!`)
//     }, [])

//     const removeFile = (fileId) => {
//         setFiles(prev => prev.filter(file => file.id !== fileId))
//         toast.info('File removed')
//     }

//     const handlePlagiarismCheck = async () => {
//         if (activeTab === 'upload' && files.length === 0) {
//             toast.error('Please upload at least one file')
//             return
//         }

//         if (activeTab === 'text' && !textInput.trim()) {
//             toast.error('Please enter some text to check')
//             return
//         }

//         setIsChecking(true)

//         try {
//             // Simulate API call - replace with actual plagiarism detection API
//             await new Promise(resolve => setTimeout(resolve, 3000))

//             const mockResults = {
//                 id: Date.now(),
//                 timestamp: new Date().toISOString(),
//                 overallScore: Math.floor(Math.random() * 30) + 5, // 5-35% plagiarism
//                 sources: [
//                     {
//                         url: 'https://example.com/source1',
//                         title: 'Academic Paper on Similar Topic',
//                         similarity: 15,
//                         matchedText: 'This is a sample matched text from the source...'
//                     },
//                     {
//                         url: 'https://example.com/source2',
//                         title: 'Research Article',
//                         similarity: 8,
//                         matchedText: 'Another example of matched content...'
//                     }
//                 ],
//                 wordCount: activeTab === 'text' ? textInput.split(' ').length : 1500,
//                 checkedContent: activeTab === 'text' ? textInput : files[0]?.name || 'Uploaded Document'
//             }

//             setResults(mockResults)
//             setCheckHistory(prev => [mockResults, ...prev.slice(0, 4)]) // Keep last 5 checks
//             toast.success('Plagiarism check completed!')

//         } catch (error) {
//             toast.error('Error during plagiarism check. Please try again.')
//             console.error('Plagiarism check error:', error)
//         } finally {
//             setIsChecking(false)
//         }
//     }

//     const resetChecker = () => {
//         setFiles([])
//         setTextInput('')
//         setResults(null)
//         setActiveTab('upload')
//         toast.info('Checker reset')
//     }

//     return (
//         <div className="plagiarism-checker">
//             {/* Hero Section */}
//             <section className="plagiarism-hero">
//                 <div className="container">
//                     <motion.div
//                         className="hero-content"
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <div className="hero-badge">
//                             <Shield size={16} />
//                             <span>Academic Integrity Tool</span>
//                         </div>

//                         <h1 className="gradient-text">Plagiarism Checker</h1>
//                         <p className="hero-description">
//                             Ensure academic integrity with our advanced plagiarism detection system.
//                             Upload documents or paste text to check for originality and get detailed reports.
//                         </p>

//                         <div className="hero-features">
//                             <div className="feature-item">
//                                 <Zap size={20} />
//                                 <span>Fast Detection</span>
//                             </div>
//                             <div className="feature-item">
//                                 <Target size={20} />
//                                 <span>Accurate Results</span>
//                             </div>
//                             <div className="feature-item">
//                                 <Shield size={20} />
//                                 <span>Secure & Private</span>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Main Checker Interface */}
//             <section className="checker-interface">
//                 <div className="container">
//                     <div className="checker-layout">
//                         {/* Left Panel - Input */}
//                         <motion.div
//                             className="input-panel glass-effect"
//                             initial={{ opacity: 0, x: -50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                         >
//                             <div className="panel-header">
//                                 <h3>Submit Content for Checking</h3>
//                                 <div className="tab-switcher">
//                                     <button
//                                         className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
//                                         onClick={() => setActiveTab('upload')}
//                                     >
//                                         <Upload size={16} />
//                                         Upload File
//                                     </button>
//                                     <button
//                                         className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
//                                         onClick={() => setActiveTab('text')}
//                                     >
//                                         <FileText size={16} />
//                                         Paste Text
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="input-content">
//                                 <AnimatePresence mode="wait">
//                                     {activeTab === 'upload' ? (
//                                         <motion.div
//                                             key="upload"
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: -20 }}
//                                             transition={{ duration: 0.3 }}
//                                         >
//                                             <FileUploadZone
//                                                 onFileUpload={handleFileUpload}
//                                                 files={files}
//                                                 onRemoveFile={removeFile}
//                                             />
//                                         </motion.div>
//                                     ) : (
//                                         <motion.div
//                                             key="text"
//                                             initial={{ opacity: 0, y: 20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                             exit={{ opacity: 0, y: -20 }}
//                                             transition={{ duration: 0.3 }}
//                                         >
//                                             <TextInputArea
//                                                 value={textInput}
//                                                 onChange={setTextInput}
//                                             />
//                                         </motion.div>
//                                     )}
//                                 </AnimatePresence>
//                             </div>

//                             <div className="action-buttons">
//                                 <motion.button
//                                     className="btn-primary check-btn"
//                                     onClick={handlePlagiarismCheck}
//                                     disabled={isChecking}
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                 >
//                                     {isChecking ? (
//                                         <>
//                                             <RefreshCw size={20} className="spinning" />
//                                             Checking...
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Search size={20} />
//                                             Check for Plagiarism
//                                         </>
//                                     )}
//                                 </motion.button>

//                                 <button
//                                     className="btn-secondary reset-btn"
//                                     onClick={resetChecker}
//                                     disabled={isChecking}
//                                 >
//                                     <Trash2 size={16} />
//                                     Reset
//                                 </button>
//                             </div>
//                         </motion.div>

//                         {/* Right Panel - Results */}
//                         <motion.div
//                             className="results-panel"
//                             initial={{ opacity: 0, x: 50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                         >
//                             {results ? (
//                                 <PlagiarismResults results={results} />
//                             ) : (
//                                 <div className="no-results glass-effect">
//                                     <div className="no-results-content">
//                                         <Search size={64} className="no-results-icon" />
//                                         <h3>Ready to Check</h3>
//                                         <p>Upload a document or paste text to begin plagiarism detection</p>
//                                     </div>
//                                 </div>
//                             )}
//                         </motion.div>
//                     </div>

//                     {/* Check History */}
//                     {checkHistory.length > 0 && (
//                         <motion.div
//                             className="check-history glass-effect"
//                             initial={{ opacity: 0, y: 50 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.8, delay: 0.6 }}
//                         >
//                             <h3>Recent Checks</h3>
//                             <div className="history-list">
//                                 {checkHistory.map((check, index) => (
//                                     <div key={check.id} className="history-item">
//                                         <div className="history-info">
//                                             <span className="history-title">{check.checkedContent}</span>
//                                             <span className="history-date">
//                                                 {new Date(check.timestamp).toLocaleDateString()}
//                                             </span>
//                                         </div>
//                                         <div className={`history-score ${check.overallScore > 20 ? 'high' : check.overallScore > 10 ? 'medium' : 'low'}`}>
//                                             {check.overallScore}%
//                                         </div>
//                                         <button
//                                             className="history-view"
//                                             onClick={() => setResults(check)}
//                                         >
//                                             <Eye size={16} />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </motion.div>
//                     )}
//                 </div>
//             </section>

//             <ToastContainer
//                 position="bottom-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//             />
//         </div>
//     )
// }

// export default PlagiarismChecker

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
  Target
} from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PlagiarismResults from '../pages/PlagiarismResults'
import FileUploadZone from '../pages/FileUploadZone'
import TextInputArea from '../pages/TextInputArea'
import { processFile, countWords } from '../utils/fileProcessor'
import { generatePlagiarismReport } from '../utils/reportGenerator'
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

    // Process files to extract text and word count
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

    // Update files with new status
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

    if (activeTab === 'upload') {
      const readyFiles = processedFiles.filter(file => file.status === 'ready')
      if (readyFiles.length === 0) {
        toast.error('Please upload and process at least one file')
        return
      }

      // Combine text from all processed files
      contentToCheck = readyFiles.map(file => file.processedData.text).join('\n\n')
      wordCount = readyFiles.reduce((total, file) => total + file.processedData.wordCount, 0)
      checkedContent = readyFiles.length === 1 ?
        readyFiles[0].name :
        `${readyFiles.length} documents (${readyFiles.map(f => f.name).join(', ')})`
    } else {
      if (!textInput.trim()) {
        toast.error('Please enter some text to check')
        return
      }
      contentToCheck = textInput
      wordCount = countWords(textInput)
      checkedContent = 'Pasted Text'
    }

    if (wordCount < 10) {
      toast.warning('Content is too short for accurate plagiarism detection. Minimum 10 words recommended.')
    }

    setIsChecking(true)

    try {
      // Simulate API call with realistic processing time based on word count
      const processingTime = Math.min(Math.max(wordCount * 2, 2000), 8000)
      await new Promise(resolve => setTimeout(resolve, processingTime))

      // Generate more realistic plagiarism results
      const mockResults = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        overallScore: generateRealisticScore(contentToCheck, wordCount),
        sources: generateMockSources(contentToCheck, wordCount),
        wordCount: wordCount,
        charCount: contentToCheck.length,
        checkedContent: checkedContent,
        originalContent: contentToCheck
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

  const generateRealisticScore = (content, wordCount) => {
    // Generate more realistic plagiarism scores based on content
    const baseScore = Math.random() * 15 // 0-15% base
    const lengthFactor = wordCount > 1000 ? Math.random() * 10 : Math.random() * 5
    const contentFactor = content.includes('university') || content.includes('research') ?
      Math.random() * 8 : Math.random() * 3

    return Math.min(Math.floor(baseScore + lengthFactor + contentFactor), 45)
  }

  const generateMockSources = (content, wordCount) => {
    const numSources = Math.min(Math.floor(wordCount / 200) + Math.floor(Math.random() * 3), 6)
    const sources = []

    const mockSources = [
      {
        urlBase: 'https://scholar.google.com/citations',
        titleBase: 'Academic Research Paper',
        domains: ['Research Article', 'Academic Journal', 'Thesis Paper']
      },
      {
        urlBase: 'https://www.researchgate.net/publication',
        titleBase: 'Scientific Publication',
        domains: ['Scientific Study', 'Research Publication', 'Academic Paper']
      },
      {
        urlBase: 'https://www.jstor.org/stable',
        titleBase: 'Journal Article',
        domains: ['Academic Journal', 'Scholarly Article', 'Research Paper']
      },
      {
        urlBase: 'https://arxiv.org/abs',
        titleBase: 'Preprint Article',
        domains: ['Preprint Paper', 'Research Preprint', 'Academic Preprint']
      },
      {
        urlBase: 'https://pubmed.ncbi.nlm.nih.gov',
        titleBase: 'Medical Research',
        domains: ['Medical Study', 'Health Research', 'Clinical Paper']
      },
      {
        urlBase: 'https://ieeexplore.ieee.org/document',
        titleBase: 'Technical Paper',
        domains: ['Technical Study', 'Engineering Paper', 'Technology Research']
      }
    ]

    for (let i = 0; i < numSources; i++) {
      const source = mockSources[Math.floor(Math.random() * mockSources.length)]
      const similarity = Math.floor(Math.random() * 20) + 3 // 3-23% similarity
      const randomId = Math.floor(Math.random() * 1000000)

      // Extract a realistic snippet from the content
      const words = content.split(' ')
      const startIndex = Math.floor(Math.random() * Math.max(1, words.length - 20))
      const snippetLength = Math.min(15 + Math.floor(Math.random() * 10), words.length - startIndex)
      const matchedText = words.slice(startIndex, startIndex + snippetLength).join(' ')

      sources.push({
        url: `${source.urlBase}/${randomId}`,
        title: `${source.titleBase} - ${source.domains[Math.floor(Math.random() * source.domains.length)]}`,
        similarity: similarity,
        matchedText: matchedText || 'Sample matched text from academic source...'
      })
    }

    return sources.sort((a, b) => b.similarity - a.similarity)
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
      toast.info('Generating report...')
      await generatePlagiarismReport(results)
      toast.success('Report downloaded successfully!')
    } catch (error) {
      toast.error('Failed to generate report')
      console.error('Report generation error:', error)
    }
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
                <PlagiarismResults
                  results={results}
                  onDownloadReport={handleDownloadReport}
                />
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
                        {new Date(check.timestamp).toLocaleDateString()} - {check.wordCount} words
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