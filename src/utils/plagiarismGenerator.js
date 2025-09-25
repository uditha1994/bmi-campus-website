// Enhanced plagiarism and AI detection generator
export const generateConsistentPlagiarismScore = (content, fileName) => {
    const contentHash = simpleHash(content + fileName)

    // Limit plagiarism to max 17%
    const baseScore = (contentHash % 12) + 2 // 2-14% base score
    const wordCount = content.split(' ').length

    let adjustedScore = baseScore

    // Content length factor (but keep within limits)
    if (wordCount > 1000) {
        adjustedScore += (contentHash % 3) // 0-2% additional
    } else if (wordCount > 500) {
        adjustedScore += (contentHash % 2) // 0-1% additional
    }

    // Academic keywords factor (limited)
    const academicKeywords = ['research', 'study', 'analysis', 'university', 'academic', 'scholar', 'thesis', 'dissertation']
    const keywordCount = academicKeywords.filter(keyword =>
        content.toLowerCase().includes(keyword)
    ).length

    if (keywordCount > 0) {
        adjustedScore += Math.min(keywordCount, 3) // Max 3% additional
    }

    // Ensure score doesn't exceed 17%
    return Math.min(Math.max(Math.floor(adjustedScore), 1), 17)
}

// NEW: AI Detection Score Generator
export const generateConsistentAIScore = (content, fileName) => {
    const contentHash = simpleHash(content + fileName + 'ai')

    // AI detection patterns
    const aiIndicators = [
        'furthermore', 'moreover', 'additionally', 'consequently', 'therefore',
        'in conclusion', 'to summarize', 'it is important to note', 'comprehensive',
        'multifaceted', 'paradigm', 'leverage', 'optimize', 'facilitate'
    ]

    const repetitivePatterns = [
        /\b(\w+)\s+\1\b/gi, // Repeated words
        /\b(the|and|or|but|in|on|at|to|for|of|with|by)\s+\1\b/gi // Repeated common words
    ]

    let aiScore = (contentHash % 3) + 1 // 1-3% base

    // Check for AI-like language patterns
    const aiIndicatorCount = aiIndicators.filter(indicator =>
        content.toLowerCase().includes(indicator)
    ).length

    if (aiIndicatorCount > 3) {
        aiScore += 1
    }

    // Check for repetitive patterns
    const hasRepetitivePatterns = repetitivePatterns.some(pattern =>
        pattern.test(content)
    )

    if (hasRepetitivePatterns) {
        aiScore += 1
    }

    // Ensure AI score doesn't exceed 5%
    return Math.min(Math.max(Math.floor(aiScore), 0), 5)
}

export const generateConsistentSources = (content, fileName, overallScore) => {
    const contentHash = simpleHash(content + fileName)
    const numSources = Math.min(Math.floor(overallScore / 3) + 1, 6) // 1-6 sources based on score

    const sources = []
    const mockSourceTemplates = [
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
        const sourceIndex = (contentHash + i) % mockSourceTemplates.length
        const source = mockSourceTemplates[sourceIndex]

        // Generate consistent similarity score (limited to reasonable values)
        const maxSimilarity = Math.min(Math.floor(overallScore / numSources) + 2, 8)
        const similarity = ((contentHash + i * 7) % maxSimilarity) + 1 // 1% minimum

        // Generate consistent ID
        const sourceId = (contentHash + i * 1000) % 999999 + 100000

        // Extract consistent snippet from content
        const words = content.split(' ')
        const startIndex = (contentHash + i * 10) % Math.max(1, words.length - 15)
        const snippetLength = 8 + ((contentHash + i) % 6) // 8-13 words
        const matchedText = words.slice(startIndex, startIndex + snippetLength).join(' ') ||
            'Sample matched text from academic source...'

        sources.push({
            url: `${source.urlBase}/${sourceId}`,
            title: `${source.titleBase} - ${source.domains[(contentHash + i) % source.domains.length]}`,
            similarity: similarity,
            matchedText: matchedText
        })
    }

    return sources.sort((a, b) => b.similarity - a.similarity)
}

// Simple hash function for consistency
const simpleHash = (str) => {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash)
}