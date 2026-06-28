const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("caelosphere_token");
}

async function request(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export const api = {
  get: (path) => request(path, { method: "GET" }),
  post: (path, body, opts = {}) => request(path, { method: "POST", body, ...opts }),
  put: (path, body) => request(path, { method: "PUT", body }),
  del: (path) => request(path, { method: "DELETE" }),
};

export const projects = {
  list: () => request("/projects", { method: "GET" }),
  get: (id) => request(`/projects/${id}`, { method: "GET" }),
  create: (data) => request("/projects", { method: "POST", body: data }),
  update: (id, data) => request(`/projects/${id}`, { method: "PUT", body: data }),
  remove: (id) => request(`/projects/${id}`, { method: "DELETE" }),
};

export const reports = {
  get: (projectId) => request(`/reports/${projectId}`, { method: "GET" }),
  analyze: (projectId) => request(`/reports/${projectId}/analyze`, { method: "POST" }),
};

export const auth = {
  register: (name, email, password) =>
    request("/auth/register", { method: "POST", body: { name, email, password }, auth: false }),
  login: (email, password) =>
    request("/auth/login", { method: "POST", body: { email, password }, auth: false }),
  me: () => request("/auth/me", { method: "GET" }),
  logout: () => request("/auth/logout", { method: "POST" }),
};
