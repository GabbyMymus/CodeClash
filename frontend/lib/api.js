const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

async function fetchApi(endpoint, method = "GET", body = null, baseEndpoint = "/api") {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  }

  const token = localStorage.getItem("token")
  if (token) options.headers.Authorization = `Bearer ${token}`
  if (body) options.body = JSON.stringify(body)

  const url = `${BASE_URL}${baseEndpoint}${endpoint}`
  const res = await fetch(url, options)
  const contentType = res.headers.get("content-type") || ""
  let data
  if (contentType.includes("application/json")) {
    data = await res.json()
  } else {
    const text = await res.text()
    throw new Error(`Non-JSON response (${res.status}): ${text.substring(0, 200)}`)
  }

  if (!res.ok) throw new Error(data.error || data.message || `Request failed: ${res.status}`)
  return data
}

// Auth endpoints
export async function authApi(endpoint, method = "GET", body = null) {
  return fetchApi(endpoint, method, body, "/api/auth")
}

export async function getUserProfile() {
  return authApi("/profile", "GET", null)
}

export async function getLeaderboard(limit = 10) {
  return authApi(`/leaderboard?limit=${limit}`, "GET", null)
}

// Problem endpoints
export async function getProblems(page = 1, limit = 10, { difficulty, category, search } = {}) {
  let endpoint = `?page=${page}&limit=${limit}`
  if (difficulty) endpoint += `&difficulty=${difficulty}`
  if (category) endpoint += `&category=${category}`
  if (search) endpoint += `&search=${encodeURIComponent(search)}`
  return fetchApi(endpoint, "GET", null, "/api/problems")
}

export async function getProblemById(id) {
  return fetchApi(`/${id}`, "GET", null, "/api/problems")
}

export async function createProblem(data) {
  return fetchApi("", "POST", data, "/api/problems")
}

export async function updateProblem(id, data) {
  return fetchApi(`/${id}`, "PUT", data, "/api/problems")
}

export async function deleteProblem(id) {
  return fetchApi(`/${id}`, "DELETE", null, "/api/problems")
}

// Additional auth endpoints
export async function updateUserProfile(data) {
  return authApi("/profile", "PUT", data)
}

export async function deleteUserAccount() {
  return authApi("/profile", "DELETE", null)
}

// Friends endpoints
export async function getFriends() {
  return fetchApi("", "GET", null, "/api/friends")
}

export async function getPendingRequests() {
  return fetchApi("/requests", "GET", null, "/api/friends")
}

export async function getAllUsers(searchTerm = "") {
  const endpoint = searchTerm ? `/users?search=${encodeURIComponent(searchTerm)}` : "/users"
  return fetchApi(endpoint, "GET", null, "/api/friends")
}

export async function sendFriendRequest(friendId) {
  return fetchApi("/request", "POST", { friendId }, "/api/friends")
}

export async function acceptFriendRequest(requestId) {
  return fetchApi(`/accept/${requestId}`, "POST", null, "/api/friends")
}

export async function declineFriendRequest(requestId) {
  return fetchApi(`/decline/${requestId}`, "DELETE", null, "/api/friends")
}

export async function removeFriend(friendshipId) {
  return fetchApi(`/${friendshipId}`, "DELETE", null, "/api/friends")
}

