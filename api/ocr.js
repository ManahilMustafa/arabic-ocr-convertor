const API_BASE_URL = "https://wolframic-charlott-hoopless.ngrok-free.dev"

export async function extractArabicText(imageFile) {
  const formData = new FormData()
  formData.append("image", imageFile)

  const response = await fetch(`${API_BASE_URL}/extract_arabic/`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Failed to extract text.")
    throw new Error(errorText || "Failed to extract text.")
  }
  console.log("Heel World")
  const data = await response.json().catch(() => ({}))
  console.log(data)
  console.log("Heel World")

  
  return data?.text || ""
}

