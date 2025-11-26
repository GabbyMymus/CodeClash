export async function fetchApi(endpoint, method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  }

  const token = localStorage.getItem("token")
  if (token) options.headers.Authorization = `Bearer ${token}`
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth${endpoint}`, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "Request failed")
  return data
}
