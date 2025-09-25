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
  Share2,
  Brain,
  Shield
} from 'lucide-react'
import { toast } from 'react-toastify'
import './PlagiarismResults.css'

const PlagiarismResults = ({ results, onDownloadReport }) => {
  const [expandedSource, setExpandedSource] = useState(null)
  const [showAllSources, setShowAllSources] = useState(false)

  const getScoreColor = (score, type = 'plagiarism') => {
    if (type === 'ai') {
      if (score <= 1) return 'success'
      if (score <= 3) return 'warning'
      return 'danger'
    } else {
      if (score <= 5) return 'success'
      if (score <= 12) return 'warning'
      return 'danger'
    }
  }

  const getScoreIcon = (score, type = 'plagiarism') => {
    const colorClass = getScoreColor(score, type)
    if (colorClass === 'success') return <CheckCircle size={24} />
    if (colorClass === 'warning') return <AlertTriangle size={24} />
    return <XCircle size={24} />
  }

  const getScoreMessage = (score, type = 'plagiarism') => {
    if (type === 'ai') {
      if (score <= 1) return 'Low AI detection - Content appears to be human-written'
      if (score <= 3) return 'Moderate AI detection - Some AI-generated patterns detected'
      return 'High AI detection - Content may be AI-generated'
    } else {
      if (score <= 5) return 'Low plagiarism detected - Content appears to be mostly original'
      if (score <= 12) return 'Moderate plagiarism detected - Review and cite sources properly'
      return 'High plagiarism detected - Significant revision required'
    }
  }

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Text copied to clipboard!')
  }

  const handleShareResults = () => {
    const shareData = {
      title: 'BMI Campus Academic Integrity Report',
      text: `Plagiarism: ${results.overallScore}% | AI Detection: ${results.aiScore}% - ${getScoreMessage(results.overallScore)}`,
      url: window.location.href
    }

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => toast.success('Results shared successfully!'))
        .catch(() => toast.error('Failed to share results'))
    } else {
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`
      navigator.clipboard.writeText(shareText)
        .then(() => toast.success('Share link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy share link'))
    }
  }

  const displayedSources = showAllSources ? results.sources : results.sources.slice(0, 3)

  return (
    <motion.div 
      className="plagiarism-results glass-effect turnitin-style"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="plagiarism-results-container"
    >
      {/* Turnitin-style Header */}
      <div className="turnitin-header">
        <div className="header-logo">
          <Shield size={24} />
          <span>BMI Campus Originality Report</span>
        </div>
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

      {/* Submission Info */}
      <div className="submission-info">
        <div className="submission-details">
          <h4>Submission Details</h4>
          <div className="detail-grid">
            <div className="detail-item">
              <span className="label">Submission ID:</span>
              <span className="value">{results.submissionId}</span>
            </div>
            <div className="detail-item">
              <span className="label">Document:</span>
              <span className="value">{results.checkedContent}</span>
            </div>
            <div className="detail-item">
              <span className="label">Submitted:</span>
              <span className="value">{new Date(results.timestamp).toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <span className="label">Word Count:</span>
              <span className="value">{results.wordCount.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Score Display */}
      <div className="dual-score-section">
        {/* Plagiarism Score */}
        <motion.div 
          className={`score-card plagiarism-card ${getScoreColor(results.overallScore)}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="score-header">
            <Shield size={20} />
            <span>Similarity Index</span>
          </div>
          <div className="score-display">
            <div className="score-percentage">{results.overallScore}%</div>
            <div className="score-icon">
              {getScoreIcon(results.overallScore)}
            </div>
          </div>
          <div className="score-bar">
            <motion.div 
              className="score-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(results.overallScore / 17) * 100}%` }}
              transition={{ delay: 0.5, duration: 1 }}
            />
          </div>
          <p className="score-message">{getScoreMessage(results.overallScore)}</p>
        </motion.div>

        {/* AI Detection Score */}
        <motion.div 
          className={`score-card ai-card ${getScoreColor(results.aiScore, 'ai')}`}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <div className="score-header">
            <Brain size={20} />
            <span>AI Detection</span>
          </div>
          <div className="score-display">
            <div className="score-percentage">{results.aiScore}%</div>
            <div className="score-icon">
              {getScoreIcon(results.aiScore, 'ai')}
            </div>
          </div>
          <div className="score-bar">
            <motion.div 
              className="score-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(results.aiScore / 5) * 100}%` }}
              transition={{ delay: 0.7, duration: 1 }}
            />
          </div>
          <p className="score-message">{getScoreMessage(results.aiScore, 'ai')}</p>
        </motion.div>
      </div>

      {/* Sources Section */}
      {results.sources.length > 0 && (
        <div className="sources-section turnitin-sources">
          <div className="sources-header">
            <h4>Sources</h4>
            <span className="sources-count">{results.sources.length} sources found</span>
          </div>

          <div className="sources-list">
            <AnimatePresence>
              {displayedSources.map((source, index) => (
                <motion.div
                  key={index}
                  className="source-item turnitin-source"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="source-number">{index + 1}</div>
                  <div className="source-content">
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
                  </div>
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
      )}

      {/* Analysis Summary */}
      <div className="analysis-summary">
        <h4>Analysis Summary</h4>
        <div className="summary-grid">
          <div className="summary-item">
            <div className="summary-metric">
              <span className="metric-value">{results.wordCount}</span>
              <span className="metric-label">Total Words</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-metric">
              <span className="metric-value">{results.sources.length}</span>
              <span className="metric-label">Sources Found</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-metric">
              <span className="metric-value">
                {Math.max(...results.sources.map(s => s.similarity), 0)}%
              </span>
              <span className="metric-label">Highest Match</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="summary-metric">
              <span className="metric-value">
                {Math.floor((results.overallScore + results.aiScore) / 2)}%
              </span>
              <span className="metric-label">Overall Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="recommendations turnitin-recommendations">
        <h4>Recommendations</h4>
        <div className="recommendation-list">
          {results.overallScore > 12 && (
            <div className="recommendation-item danger">
              <AlertTriangle size={16} />
              <span>High similarity detected. Significant revision and proper citation required.</span>
            </div>
          )}
          {results.overallScore > 5 && results.overallScore <= 12 && (
            <div className="recommendation-item warning">
              <AlertTriangle size={16} />
              <span>Moderate similarity detected. Review content and add proper citations.</span>
            </div>
          )}
          {results.overallScore <= 5 && (
            <div className="recommendation-item success">
              <CheckCircle size={16} />
              <span>Low similarity detected. Content appears to be mostly original.</span>
            </div>
          )}
          {results.aiScore > 3 && (
            <div className="recommendation-item warning">
              <Brain size={16} />
              <span>AI-generated content detected. Ensure all work is original and properly attributed.</span>
            </div>
          )}
          {results.aiScore <= 1 && (
            <div className="recommendation-item success">
              <Brain size={16} />
              <span>Content appears to be human-written with natural language patterns.</span>
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
        </div>
      </div>
    </motion.div>
  )
}

export default PlagiarismResults