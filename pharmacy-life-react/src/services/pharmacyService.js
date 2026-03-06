import API_BASE_URL from "../constants/api";

// ─── Category ─────────────────────────────────────────────────────────────────

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}/Category`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

// ─── Medicine ─────────────────────────────────────────────────────────────────

export const getMedicines = async ({ limit, categoryId } = {}) => {
  let url = `${API_BASE_URL}/Medicine`;
  const params = new URLSearchParams();
  if (categoryId) params.append("CategoryId", categoryId);
  if (limit) params.append("_limit", limit);
  const query = params.toString();
  if (query) url += `?${query}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch medicines");
  return res.json();
};

export const getMedicineById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/Medicine/${id}`);
  if (!res.ok) throw new Error("Failed to fetch medicine");
  return res.json();
};
