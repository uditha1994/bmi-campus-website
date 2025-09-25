import mammoth from 'mammoth'
import * as pdfjsLib from 'pdfjs-dist'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'public/pdf.worker.min.mjs'

export const processFile = async (file) => {
    const fileType = file.type
    const fileName = file.name.toLowerCase()

    try {
        if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
            return await processTextFile(file)
        } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
            return await processPDFFile(file)
        } else if (
            fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            fileName.endsWith('.docx')
        ) {
            return await processDocxFile(file)
        } else if (fileType === 'application/msword' || fileName.endsWith('.doc')) {
            return await processDocFile(file)
        } else {
            throw new Error('Unsupported file format')
        }
    } catch (error) {
        console.error('File processing error:', error)
        throw new Error(`Failed to process ${file.name}: ${error.message}`)
    }
}

const processTextFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            resolve({
                text: text,
                wordCount: countWords(text),
                charCount: text.length,
                fileName: file.name
            })
        }
        reader.onerror = () => reject(new Error('Failed to read text file'))
        reader.readAsText(file)
    })
}

// IMPROVED PDF PROCESSING using PDF.js
const processPDFFile = async (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            const arrayBuffer = await file.arrayBuffer()
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

            let fullText = ''

            // Extract text from each page
            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum)
                const textContent = await page.getTextContent()

                // Combine text items from the page
                const pageText = textContent.items
                    .map(item => item.str)
                    .join(' ')

                fullText += pageText + ' '
            }

            // Clean the extracted text
            const cleanedText = cleanExtractedText(fullText)

            resolve({
                text: cleanedText,
                wordCount: countWords(cleanedText),
                charCount: cleanedText.length,
                fileName: file.name
            })

        } catch (error) {
            console.error('PDF processing error:', error)
            reject(new Error('Failed to extract text from PDF'))
        }
    })
}

const processDocxFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = async (e) => {
            try {
                const arrayBuffer = e.target.result
                const result = await mammoth.extractRawText({ arrayBuffer })
                const cleanedText = cleanExtractedText(result.value)

                resolve({
                    text: cleanedText,
                    wordCount: countWords(cleanedText),
                    charCount: cleanedText.length,
                    fileName: file.name
                })
            } catch (error) {
                reject(new Error('Failed to extract text from DOCX file'))
            }
        }
        reader.onerror = () => reject(new Error('Failed to read DOCX file'))
        reader.readAsArrayBuffer(file)
    })
}

const processDocFile = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const text = extractTextFromDoc(e.target.result)
                const cleanedText = cleanExtractedText(text)

                resolve({
                    text: cleanedText,
                    wordCount: countWords(cleanedText),
                    charCount: cleanedText.length,
                    fileName: file.name
                })
            } catch (error) {
                reject(new Error('Failed to extract text from DOC file'))
            }
        }
        reader.onerror = () => reject(new Error('Failed to read DOC file'))
        reader.readAsArrayBuffer(file)
    })
}

// UNIFIED TEXT CLEANING FUNCTION
const cleanExtractedText = (text) => {
    if (!text) return ''

    return text
        // Remove extra whitespace and normalize
        .replace(/\s+/g, ' ')
        // Remove special characters but keep basic punctuation
        .replace(/[^\w\s.,!?;:'"()-]/g, ' ')
        // Remove multiple spaces again
        .replace(/\s+/g, ' ')
        // Trim
        .trim()
}

const extractTextFromDoc = (arrayBuffer) => {
    // Basic DOC text extraction (simplified)
    const uint8Array = new Uint8Array(arrayBuffer)
    let text = ''
    let currentWord = ''

    for (let i = 0; i < uint8Array.length; i++) {
        const char = uint8Array[i]

        if (char >= 32 && char <= 126) {
            const charStr = String.fromCharCode(char)

            if (/[a-zA-Z0-9]/.test(charStr)) {
                currentWord += charStr
            } else if (currentWord.length > 0) {
                if (currentWord.length >= 2 && /[a-zA-Z]/.test(currentWord)) {
                    text += currentWord + ' '
                }
                currentWord = ''
            }
        } else if (currentWord.length > 0) {
            if (currentWord.length >= 2 && /[a-zA-Z]/.test(currentWord)) {
                text += currentWord + ' '
            }
            currentWord = ''
        }
    }

    return text
}

// CONSISTENT WORD COUNTING
const countWords = (text) => {
    if (!text || typeof text !== 'string') return 0

    // Normalize the text
    const normalizedText = text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
        .replace(/\s+/g, ' ')     // Multiple spaces to single space
        .trim()

    if (!normalizedText) return 0

    // Split into words and filter
    const words = normalizedText.split(' ').filter(word => {
        return word.length >= 2 &&           // At least 2 characters
            word.length <= 50 &&          // Not more than 50 characters
            /[a-zA-Z]/.test(word) &&      // Contains at least one letter
            !/^\d+$/.test(word)           // Not just numbers
    })

    return words.length
}

export { countWords }