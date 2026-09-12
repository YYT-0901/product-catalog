const BASE_URL = 'https://dummyjson.com';

/**
 * 通用请求封装：统一处理 HTTP 错误和 JSON 解析
 * @param {string} url
 * @param {object} [options] - 可传入 signal 用于取消请求（搜索防抖场景会用到）
 */
async function request(url, options = {}) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

/**
 * 获取商品列表（分页）
 * @param {number} skip - 跳过的条数，用于分页
 * @param {number} limit - 每页数量，默认 20
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export function fetchProducts(skip = 0, limit = 20) {
  const url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
  return request(url);
}

/**
 * 获取单个商品详情
 * @param {number|string} id
 * @returns {Promise<object>} 完整商品对象（含 description, rating, images 等）
 */
export function fetchProductById(id) {
  const url = `${BASE_URL}/products/${id}`;
  return request(url);
}

/**
 * 搜索商品（走服务端 search 接口）
 * @param {string} query - 搜索关键词
 * @param {AbortSignal} [signal] - 可选，用于取消过期请求（防抖/竞态处理）
 * @returns {Promise<{products: Array, total: number, skip: number, limit: number}>}
 */
export function searchProducts(query, signal) {
  const url = `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`;
  return request(url, { signal });
}