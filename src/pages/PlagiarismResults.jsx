// import React, { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//     AlertTriangle,
//     CheckCircle,
//     XCircle,
//     ExternalLink,
//     Download,
//     Eye,
//     ChevronDown,
//     ChevronUp,
//     Copy,
//     Share2
// } from 'lucide-react'
// import { toast } from 'react-toastify'
// import './PlagiarismResults.css'

// const PlagiarismResults = ({ results }) => {
//     const [expandedSource, setExpandedSource] = useState(null)
//     const [showAllSources, setShowAllSources] = useState(false)

//     const getScoreColor = (score) => {
//         if (score <= 10) return 'success'
//         if (score <= 25) return 'warning'
//         return 'danger'
//     }

//     const getScoreIcon = (score) => {
//         if (score <= 10) return <CheckCircle size={24} />
//         if (score <= 25) return <AlertTriangle size={24} />
//         return <XCircle size={24} />
//     }

//     const getScoreMessage = (score) => {
//         if (score <= 10) return 'Low plagiarism detected - Content appears to be mostly original'
//         if (score <= 25) return 'Moderate plagiarism detected - Review and cite sources properly'
//         return 'High plagiarism detected - Significant revision required'
//     }

//     const handleCopyText = (text) => {
//         navigator.clipboard.writeText(text)
//         toast.success('Text copied to clipboard!')
//     }

//     const handleDownloadReport = () => {
//         // Simulate report download
//         toast.success('Report download started!')
//     }

//     const handleShareResults = () => {
//         // Simulate sharing functionality
//         toast.success('Results shared successfully!')
//     }

//     const displayedSources = showAllSources ? results.sources : results.sources.slice(0, 3)

//     return (
//         <motion.div
//             className="plagiarism-results glass-effect"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//         >
//             {/* Results Header */}
//             <div className="results-header">
//                 <h3>Plagiarism Check Results</h3>
//                 <div className="header-actions">
//                     <button className="action-btn" onClick={handleDownloadReport}>
//                         <Download size={16} />
//                         Download Report
//                     </button>
//                     <button className="action-btn" onClick={handleShareResults}>
//                         <Share2 size={16} />
//                         Share
//                     </button>
//                 </div>
//             </div>

//             {/* Overall Score */}
//             <motion.div
//                 className={`score-section ${getScoreColor(results.overallScore)}`}
//                 initial={{ scale: 0.9 }}
//                 animate={{ scale: 1 }}
//                 transition={{ delay: 0.2, type: "spring" }}
//             >
//                 <div className="score-display">
//                     <div className="score-icon">
//                         {getScoreIcon(results.overallScore)}
//                     </div>
//                     <div className="score-info">
//                         <div className="score-percentage">{results.overallScore}%</div>
//                         <div className="score-label">Plagiarism Detected</div>
//                     </div>
//                 </div>

//                 <div className="score-bar">
//                     <motion.div
//                         className="score-fill"
//                         initial={{ width: 0 }}
//                         animate={{ width: `${results.overallScore}%` }}
//                         transition={{ delay: 0.5, duration: 1 }}
//                     />
//                 </div>

//                 <p className="score-message">{getScoreMessage(results.overallScore)}</p>
//             </motion.div>

//             {/* Document Info */}
//             <div className="document-info">
//                 <div className="info-grid">
//                     <div className="info-item">
//                         <span className="info-label">Document:</span>
//                         <span className="info-value">{results.checkedContent}</span>
//                     </div>
//                     <div className="info-item">
//                         <span className="info-label">Word Count:</span>
//                         <span className="info-value">{results.wordCount.toLocaleString()}</span>
//                     </div>
//                     <div className="info-item">
//                         <span className="info-label">Checked:</span>
//                         <span className="info-value">
//                             {new Date(results.timestamp).toLocaleString()}
//                         </span>
//                     </div>
//                     <div className="info-item">
//                         <span className="info-label">Sources Found:</span>
//                         <span className="info-value">{results.sources.length}</span>
//                     </div>
//                 </div>
//             </div>

//             {/* Sources Section */}
//             {/* {results.sources.length > 0 && (
//                 <div className="sources-section">
//                     <div className="sources-header">
//                         <h4>Matching Sources</h4>
//                         <span className="sources-count">{results.sources.length} sources found</span>
//                     </div>

//                     <div className="sources-list">
//                         <AnimatePresence>
//                             {displayedSources.map((source, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className="source-item"
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -20 }}
//                                     transition={{ delay: index * 0.1 }}
//                                 >
//                                     <div className="source-header">
//                                         <div className="source-info">
//                                             <h5 className="source-title">{source.title}</h5>
//                                             <a
//                                                 href={source.url}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="source-url"
//                                             >
//                                                 {source.url}
//                                                 <ExternalLink size={14} />
//                                             </a>
//                                         </div>
//                                         <div className="source-similarity">
//                                             <span className="similarity-percentage">{source.similarity}%</span>
//                                             <span className="similarity-label">Match</span>
//                                         </div>
//                                     </div>

//                                     <div className="source-actions">
//                                         <button
//                                             className="expand-btn"
//                                             onClick={() => setExpandedSource(
//                                                 expandedSource === index ? null : index
//                                             )}
//                                         >
//                                             <Eye size={16} />
//                                             {expandedSource === index ? 'Hide' : 'View'} Match
//                                             {expandedSource === index ?
//                                                 <ChevronUp size={16} /> :
//                                                 <ChevronDown size={16} />
//                                             }
//                                         </button>
//                                         <button
//                                             className="copy-btn"
//                                             onClick={() => handleCopyText(source.matchedText)}
//                                         >
//                                             <Copy size={16} />
//                                         </button>
//                                     </div>

//                                     <AnimatePresence>
//                                         {expandedSource === index && (
//                                             <motion.div
//                                                 className="matched-text"
//                                                 initial={{ opacity: 0, height: 0 }}
//                                                 animate={{ opacity: 1, height: 'auto' }}
//                                                 exit={{ opacity: 0, height: 0 }}
//                                                 transition={{ duration: 0.3 }}
//                                             >
//                                                 <div className="matched-content">
//                                                     <h6>Matched Text:</h6>
//                                                     <p>"{source.matchedText}"</p>
//                                                 </div>
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </motion.div>
//                             ))}
//                         </AnimatePresence>
//                     </div>

//                     {results.sources.length > 3 && (
//                         <button
//                             className="show-more-btn"
//                             onClick={() => setShowAllSources(!showAllSources)}
//                         >
//                             {showAllSources ? 'Show Less' : `Show ${results.sources.length - 3} More Sources`}
//                             {showAllSources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
//                         </button>
//                     )}
//                 </div>
//             )} */}

//             {/* Recommendations */}
//             <div className="recommendations">
//                 <h4>Recommendations</h4>
//                 <div className="recommendation-list">
//                     {results.overallScore > 25 && (
//                         <div className="recommendation-item danger">
//                             <AlertTriangle size={16} />
//                             <span>High plagiarism detected. Significant revision and proper citation required.</span>
//                         </div>
//                     )}
//                     {results.overallScore > 10 && results.overallScore <= 25 && (
//                         <div className="recommendation-item warning">
//                             <AlertTriangle size={16} />
//                             <span>Moderate plagiarism detected. Review content and add proper citations.</span>
//                         </div>
//                     )}
//                     {results.overallScore <= 10 && (
//                         <div className="recommendation-item success">
//                             <CheckCircle size={16} />
//                             <span>Low plagiarism detected. Content appears to be mostly original.</span>
//                         </div>
//                     )}
//                     <div className="recommendation-item info">
//                         <Eye size={16} />
//                         <span>Always cite sources properly and use quotation marks for direct quotes.</span>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     )
// }

// export default PlagiarismResults

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    AlertTriangle,
    CheckCircle,
    XCircle,
    ExternalLink,
    Download,
    Eye,
    ChevronDown,
    ChevronUp,
    Copy,
    Share2
} from 'lucide-react'
import { toast } from 'react-toastify'
import './PlagiarismResults.css'

const PlagiarismResults = ({ results, onDownloadReport }) => {
    const [expandedSource, setExpandedSource] = useState(null)
    const [showAllSources, setShowAllSources] = useState(false)

    const getScoreColor = (score) => {
        if (score <= 10) return 'success'
        if (score <= 25) return 'warning'
        return 'danger'
    }

    const getScoreIcon = (score) => {
        if (score <= 10) return <CheckCircle size={24} />
        if (score <= 25) return <AlertTriangle size={24} />
        return <XCircle size={24} />
    }

    const getScoreMessage = (score) => {
        if (score <= 10) return 'Low plagiarism detected - Content appears to be mostly original'
        if (score <= 25) return 'Moderate plagiarism detected - Review and cite sources properly'
        return 'High plagiarism detected - Significant revision required'
    }

    const handleCopyText = (text) => {
        navigator.clipboard.writeText(text)
        toast.success('Text copied to clipboard!')
    }

    const handleShareResults = () => {
        const shareData = {
            title: 'BMI Campus Plagiarism Check Results',
            text: `Plagiarism Score: ${results.overallScore}% - ${getScoreMessage(results.overallScore)}`,
            url: window.location.href
        }

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => toast.success('Results shared successfully!'))
                .catch(() => toast.error('Failed to share results'))
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
            navigator.clipboard.writeText(shareText)
                .then(() => toast.success('Share link copied to clipboard!'))
                .catch(() => toast.error('Failed to copy share link'))
        }
    }

    const displayedSources = showAllSources ? results.sources : results.sources.slice(0, 3)

    return (
        <motion.div
            className="plagiarism-results glass-effect"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="plagiarism-results-container"
        >
            {/* Results Header */}
            <div className="results-header">
                <h3>Plagiarism Check Results</h3>
                <div className="header-actions">
                    <button className="action-btn" onClick={onDownloadReport}>
                        <Download size={16} />
                        Download Report
                    </button>
                    <button className="action-btn" onClick={handleShareResults}>
                        <Share2 size={16} />
                        Share
                    </button>
                </div>
            </div>

            {/* Overall Score */}
            <motion.div
                className={`score-section ${getScoreColor(results.overallScore)}`}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
            >
                <div className="score-display">
                    <div className="score-icon">
                        {getScoreIcon(results.overallScore)}
                    </div>
                    <div className="score-info">
                        <div className="score-percentage">{results.overallScore}%</div>
                        <div className="score-label">Plagiarism Detected</div>
                    </div>
                </div>

                <div className="score-bar">
                    <motion.div
                        className="score-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.overallScore}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                </div>

                <p className="score-message">{getScoreMessage(results.overallScore)}</p>
            </motion.div>

            {/* Document Info */}
            <div className="document-info">
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Document:</span>
                        <span className="info-value">{results.checkedContent}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Word Count:</span>
                        <span className="info-value">{results.wordCount.toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Character Count:</span>
                        <span className="info-value">{results.charCount.toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Checked:</span>
                        <span className="info-value">
                            {new Date(results.timestamp).toLocaleString()}
                        </span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Sources Found:</span>
                        <span className="info-value">{results.sources.length}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">Processing Time:</span>
                        <span className="info-value">
                            {Math.max(Math.floor(results.wordCount / 100), 2)} seconds
                        </span>
                    </div>
                </div>
            </div>

            {/* Sources Section */}
            {/* {results.sources.length > 0 && (
                <div className="sources-section">
                    <div className="sources-header">
                        <h4>Matching Sources</h4>
                        <span className="sources-count">{results.sources.length} sources found</span>
                    </div>

                    <div className="sources-list">
                        <AnimatePresence>
                            {displayedSources.map((source, index) => (
                                <motion.div
                                    key={index}
                                    className="source-item"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="source-header">
                                        <div className="source-info">
                                            <h5 className="source-title">{source.title}</h5>
                                            <a
                                                href={source.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="source-url"
                                            >
                                                {source.url}
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                        <div className="source-similarity">
                                            <span className="similarity-percentage">{source.similarity}%</span>
                                            <span className="similarity-label">Match</span>
                                        </div>
                                    </div>

                                    <div className="source-actions">
                                        <button
                                            className="expand-btn"
                                            onClick={() => setExpandedSource(
                                                expandedSource === index ? null : index
                                            )}
                                        >
                                            <Eye size={16} />
                                            {expandedSource === index ? 'Hide' : 'View'} Match
                                            {expandedSource === index ?
                                                <ChevronUp size={16} /> :
                                                <ChevronDown size={16} />
                                            }
                                        </button>
                                        <button
                                            className="copy-btn"
                                            onClick={() => handleCopyText(source.matchedText)}
                                        >
                                            <Copy size={16} />
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {expandedSource === index && (
                                            <motion.div
                                                className="matched-text"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="matched-content">
                                                    <h6>Matched Text:</h6>
                                                    <p>"{source.matchedText}"</p>
                                                    <div className="match-stats">
                                                        <span>Words matched: {source.matchedText.split(' ').length}</span>
                                                        <span>Similarity: {source.similarity}%</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {results.sources.length > 3 && (
                        <button
                            className="show-more-btn"
                            onClick={() => setShowAllSources(!showAllSources)}
                        >
                            {showAllSources ? 'Show Less' : `Show ${results.sources.length - 3} More Sources`}
                            {showAllSources ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    )}
                </div>
            )} */}

            {/* Detailed Analysis */}
            <div className="analysis-section">
                <h4>Detailed Analysis</h4>
                <div className="analysis-grid">
                    <div className="analysis-item">
                        <div className="analysis-metric">
                            <span className="metric-value">{results.wordCount}</span>
                            <span className="metric-label">Total Words</span>
                        </div>
                    </div>
                    <div className="analysis-item">
                        <div className="analysis-metric">
                            <span className="metric-value">{results.sources.length}</span>
                            <span className="metric-label">Sources Found</span>
                        </div>
                    </div>
                    <div className="analysis-item">
                        <div className="analysis-metric">
                            <span className="metric-value">
                                {results.sources.reduce((sum, source) => sum + source.similarity, 0)}%
                            </span>
                            <span className="metric-label">Total Similarity</span>
                        </div>
                    </div>
                    <div className="analysis-item">
                        <div className="analysis-metric">
                            <span className="metric-value">
                                {Math.max(...results.sources.map(s => s.similarity), 0)}%
                            </span>
                            <span className="metric-label">Highest Match</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            {/* <div className="recommendations">
                <h4>Recommendations</h4>
                <div className="recommendation-list">
                    {results.overallScore > 25 && (
                        <div className="recommendation-item danger">
                            <AlertTriangle size={16} />
                            <span>High plagiarism detected. Significant revision and proper citation required.</span>
                        </div>
                    )}
                    {results.overallScore > 10 && results.overallScore <= 25 && (
                        <div className="recommendation-item warning">
                            <AlertTriangle size={16} />
                            <span>Moderate plagiarism detected. Review content and add proper citations.</span>
                        </div>
                    )}
                    {results.overallScore <= 10 && (
                        <div className="recommendation-item success">
                            <CheckCircle size={16} />
                            <span>Low plagiarism detected. Content appears to be mostly original.</span>
                        </div>
                    )}
                    <div className="recommendation-item info">
                        <Eye size={16} />
                        <span>Always cite sources properly and use quotation marks for direct quotes.</span>
                    </div>
                    <div className="recommendation-item info">
                        <Copy size={16} />
                        <span>Paraphrase content in your own words rather than copying directly.</span>
                    </div>
                    <div className="recommendation-item info">
                        <Download size={16} />
                        <span>Download this report for your records and future reference.</span>
                    </div>
                </div>
            </div> */}
        </motion.div>
    )
}

export default PlagiarismResults