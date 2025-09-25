import jsPDF from 'jspdf'

export const generateTurnitinStyleReport = async (results) => {
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 20

    // Colors
    const primaryColor = [0, 102, 204] // Blue
    const secondaryColor = [102, 102, 102] // Gray
    const successColor = [0, 153, 0] // Green
    const warningColor = [255, 153, 0] // Orange
    const dangerColor = [204, 0, 0] // Red

    // Helper function to add text with word wrapping
    const addText = (text, x, y, maxWidth, fontSize = 12, color = [0, 0, 0]) => {
        pdf.setFontSize(fontSize)
        pdf.setTextColor(...color)
        const lines = pdf.splitTextToSize(text, maxWidth)
        pdf.text(lines, x, y)
        return y + (lines.length * fontSize * 0.4)
    }

    // Header with logo area
    pdf.setFillColor(0, 102, 204)
    pdf.rect(0, 0, pageWidth, 30, 'F')

    pdf.setFontSize(20)
    pdf.setTextColor(255, 255, 255)
    pdf.text('BMI Campus Originality Report', 20, 20)

    yPosition = 45

    // Submission Information Box
    pdf.setFillColor(245, 245, 245)
    pdf.rect(15, yPosition, pageWidth - 30, 35, 'F')
    pdf.setDrawColor(200, 200, 200)
    pdf.rect(15, yPosition, pageWidth - 30, 35, 'S')

    yPosition += 10
    pdf.setFontSize(14)
    pdf.setTextColor(...primaryColor)
    pdf.text('Submission Information', 20, yPosition)

    yPosition += 8
    pdf.setFontSize(10)
    pdf.setTextColor(...secondaryColor)

    const submissionInfo = [
        `Submission ID: ${results.submissionId}`,
        `Document: ${results.checkedContent}`,
        `Submitted: ${new Date(results.timestamp).toLocaleString()}`,
        `Word Count: ${results.wordCount.toLocaleString()} words`
    ]

    submissionInfo.forEach(info => {
        pdf.text(info, 20, yPosition)
        yPosition += 5
    })

    yPosition += 15

    // Similarity Index Section
    pdf.setFontSize(16)
    pdf.setTextColor(...primaryColor)
    pdf.text('Similarity Index', 20, yPosition)
    yPosition += 10

    // Similarity Score Box
    const similarityColor = results.overallScore <= 5 ? successColor :
        results.overallScore <= 12 ? warningColor : dangerColor

    pdf.setFillColor(...similarityColor)
    pdf.circle(40, yPosition + 10, 15, 'F')

    pdf.setFontSize(20)
    pdf.setTextColor(255, 255, 255)
    pdf.text(`${results.overallScore}%`, 32, yPosition + 13)

    pdf.setFontSize(12)
    pdf.setTextColor(...secondaryColor)
    pdf.text('Similarity to sources found on the web, in publications, and in student papers', 70, yPosition + 8)

    const similarityMessage = results.overallScore <= 5 ? 'Low similarity - Content appears mostly original' :
        results.overallScore <= 12 ? 'Moderate similarity - Review and cite sources' :
            'High similarity - Significant revision required'

    pdf.setFontSize(10)
    pdf.text(similarityMessage, 70, yPosition + 18)

    yPosition += 35

    // AI Detection Section
    pdf.setFontSize(16)
    pdf.setTextColor(...primaryColor)
    pdf.text('AI Writing Detection', 20, yPosition)
    yPosition += 10

    // AI Score Box
    const aiColor = results.aiScore <= 1 ? successColor :
        results.aiScore <= 3 ? warningColor : dangerColor

    pdf.setFillColor(...aiColor)
    pdf.circle(40, yPosition + 10, 15, 'F')

    pdf.setFontSize(20)
    pdf.setTextColor(255, 255, 255)
    pdf.text(`${results.aiScore}%`, 35, yPosition + 13)

    pdf.setFontSize(12)
    pdf.setTextColor(...secondaryColor)
    pdf.text('Likelihood that AI writing tools were used to generate content', 70, yPosition + 8)

    const aiMessage = results.aiScore <= 1 ? 'Low AI detection - Content appears human-written' :
        results.aiScore <= 3 ? 'Moderate AI detection - Some AI patterns detected' :
            'High AI detection - Content may be AI-generated'

    pdf.setFontSize(10)
    pdf.text(aiMessage, 70, yPosition + 18)

    yPosition += 40

    // Sources Section
    if (results.sources.length > 0) {
        pdf.setFontSize(16)
        pdf.setTextColor(...primaryColor)
        pdf.text(`Sources (${results.sources.length} found)`, 20, yPosition)
        yPosition += 15

        results.sources.forEach((source, index) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 60) {
                pdf.addPage()
                yPosition = 20
            }

            // Source number circle
            pdf.setFillColor(...primaryColor)
            pdf.circle(25, yPosition + 5, 8, 'F')
            pdf.setFontSize(12)
            pdf.setTextColor(255, 255, 255)
            pdf.text(`${index + 1}`, 22, yPosition + 8)

            // Source details
            pdf.setFontSize(12)
            pdf.setTextColor(0, 0, 0)
            yPosition = addText(`${source.title}`, 40, yPosition + 3, pageWidth - 60, 12)

            pdf.setFontSize(10)
            pdf.setTextColor(...primaryColor)
            yPosition = addText(source.url, 40, yPosition + 2, pageWidth - 60, 10, primaryColor)

            pdf.setFontSize(10)
            pdf.setTextColor(...secondaryColor)
            yPosition = addText(`Similarity: ${source.similarity}%`, 40, yPosition + 2, pageWidth - 60, 10, secondaryColor)

            // Matched text
            pdf.setFontSize(9)
            pdf.setTextColor(100, 100, 100)
            yPosition = addText(`"${source.matchedText}"`, 40, yPosition + 3, pageWidth - 60, 9, [100, 100, 100])

            yPosition += 10
        })
    }

    // Recommendations
    if (yPosition > pageHeight - 100) {
        pdf.addPage()
        yPosition = 20
    }

    pdf.setFontSize(16)
    pdf.setTextColor(...primaryColor)
    pdf.text('Recommendations', 20, yPosition)
    yPosition += 15

    const recommendations = []

    if (results.overallScore > 12) {
        recommendations.push('• High similarity detected. Significant revision and proper citation required.')
    } else if (results.overallScore > 5) {
        recommendations.push('• Moderate similarity detected. Review content and add proper citations.')
    } else {
        recommendations.push('• Low similarity detected. Content appears to be mostly original.')
    }

    if (results.aiScore > 3) {
        recommendations.push('• AI-generated content detected. Ensure all work is original and properly attributed.')
    } else if (results.aiScore <= 1) {
        recommendations.push('• Content appears to be human-written with natural language patterns.')
    }

    recommendations.push('• Always cite sources properly and use quotation marks for direct quotes.')
    recommendations.push('• Paraphrase content in your own words rather than copying directly.')
    recommendations.push('• When in doubt, cite the source to avoid unintentional plagiarism.')

    pdf.setFontSize(10)
    pdf.setTextColor(0, 0, 0)
    recommendations.forEach((rec) => {
        yPosition = addText(rec, 20, yPosition, pageWidth - 40, 10)
        yPosition += 5
    })

    // Footer
    pdf.setFontSize(8)
    pdf.setTextColor(100, 100, 100)
    pdf.text('Generated by BMI Campus Academic Integrity System', 20, pageHeight - 15)
    pdf.text(`Report ID: ${results.submissionId} | Generated: ${new Date().toLocaleString()}`, 20, pageHeight - 10)

    // Save the PDF
    const fileName = `BMI-Originality-Report-${results.submissionId}.pdf`
    pdf.save(fileName)
}

// Keep the original function for backward compatibility
export const generatePlagiarismReport = generateTurnitinStyleReport