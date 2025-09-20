// 

import React from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Upload,
    FileText,
    File,
    X,
    CheckCircle,
    AlertCircle,
    RefreshCw
} from 'lucide-react'
import './FileUploadZone.css'

const FileUploadZone = ({ onFileUpload, files, onRemoveFile, processedFiles }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onFileUpload,
        accept: {
            'text/plain': ['.txt'],
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: true
    })

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const getFileIcon = (type) => {
        if (type.includes('pdf')) return <File size={20} />
        if (type.includes('word') || type.includes('document')) return <FileText size={20} />
        return <FileText size={20} />
    }

    const getFileStatus = (fileId) => {
        const processedFile = processedFiles.find(pf => pf.id === fileId)
        return processedFile || files.find(f => f.id === fileId)
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'ready':
                return <CheckCircle size={16} className="status-icon success" />
            case 'processing':
                return <RefreshCw size={16} className="status-icon processing spinning" />
            case 'error':
                return <AlertCircle size={16} className="status-icon error" />
            default:
                return <CheckCircle size={16} className="status-icon success" />
        }
    }

    const getWordCount = (fileId) => {
        const processedFile = processedFiles.find(pf => pf.id === fileId)
        return processedFile?.processedData?.wordCount || 0
    }

    return (
        <div className="file-upload-zone">
            <motion.div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <input {...getInputProps()} />
                <div className="dropzone-content">
                    <motion.div
                        className="upload-icon"
                        animate={{
                            y: isDragActive ? [-5, 5, -5] : [0],
                            rotate: isDragActive ? [0, 5, -5, 0] : [0]
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: isDragActive ? Infinity : 0
                        }}
                    >
                        <Upload size={48} />
                    </motion.div>

                    <h4>
                        {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                    </h4>
                    <p>or click to browse</p>

                    <div className="supported-formats">
                        <span>Supported: PDF, DOC, DOCX, TXT</span>
                        <span>Max size: 10MB per file</span>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        className="uploaded-files"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h4>Uploaded Files ({files.length})</h4>
                        <div className="files-list">
                            {files.map((fileItem) => {
                                const fileStatus = getFileStatus(fileItem.id)
                                const wordCount = getWordCount(fileItem.id)

                                return (
                                    <motion.div
                                        key={fileItem.id}
                                        className={`file-item ${fileStatus.status}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        layout
                                    >
                                        <div className="file-info">
                                            <div className="file-icon">
                                                {getFileIcon(fileItem.type)}
                                            </div>
                                            <div className="file-details">
                                                <span className="file-name">{fileItem.name}</span>
                                                <div className="file-meta">
                                                    <span className="file-size">{formatFileSize(fileItem.size)}</span>
                                                    {wordCount > 0 && (
                                                        <span className="word-count">{wordCount.toLocaleString()} words</span>
                                                    )}
                                                </div>
                                                {fileStatus.status === 'error' && (
                                                    <span className="error-message">{fileStatus.error}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="file-status">
                                            {getStatusIcon(fileStatus.status)}
                                            <button
                                                className="remove-btn"
                                                onClick={() => onRemoveFile(fileItem.id)}
                                                disabled={fileStatus.status === 'processing'}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Summary */}
                        <div className="files-summary">
                            <div className="summary-item">
                                <span className="summary-label">Total Files:</span>
                                <span className="summary-value">{files.length}</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Total Words:</span>
                                <span className="summary-value">
                                    {processedFiles
                                        .filter(f => f.status === 'ready')
                                        .reduce((total, f) => total + (f.processedData?.wordCount || 0), 0)
                                        .toLocaleString()}
                                </span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Ready to Check:</span>
                                <span className="summary-value">
                                    {processedFiles.filter(f => f.status === 'ready').length}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default FileUploadZone