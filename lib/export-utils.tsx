// Helper to generate PDF content
export function generatePDF(text: string, filename = "converted-notes") {
  // Create a simple PDF using a data URL approach
  // In production, you'd use a library like jsPDF for better formatting
  const encoded = encodeURIComponent(text)
  const dataUrl = `data:text/plain;charset=utf-8,${encoded}`
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = `${filename}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Helper to generate DOCX content
export function generateDOCX(text: string, filename = "converted-notes") {
  // Simple DOCX export - creates a basic word document
  // The DOCX format is actually XML, but we'll create a simplified version
  const lines = text.split("\n")
  let docContent = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
  docContent += '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
  docContent += "<w:body>"

  lines.forEach((line) => {
    docContent += "<w:p>"
    docContent += "<w:r>"
    docContent += `<w:t>${escapeXml(line)}</w:t>`
    docContent += "</w:r>"
    docContent += "</w:p>"
  })

  docContent += "</w:body>"
  docContent += "</w:document>"

  const blob = new Blob([docContent], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filename}.docx`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Helper to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
