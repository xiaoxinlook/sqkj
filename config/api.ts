// 定义 API 的基础 URL
const API_BASE_URL = process.env.API_HOST;
const API_KEY = process.env.API_KEY;

// 定义获取视频列表参数的接口
interface GetContentsParams {
  // 可选的页码参数
  page?: number;
  // 可选的每页数量参数
  size?: number;
  // 可选的分类参数
  category?: string;
  // 可选的标签参数
  tag?: string;
  // 可选的搜索关键词参数
  q?: string;
  // 可选的内容类型参数,如 movie、tv 等
  type?: string;
  // 可选的排序方式参数,有 countDesc、countAsc、createAsc 和 createDesc 四种选项
  order?: 'countDesc' | 'countAsc' | 'createAsc' | 'createDesc';
}

// 定义获取视频播放信息参数的接口
interface GetVideoParams {
  // 视频 ID 参数
  id: string;
}

// 定义获取视频数量参数的接口
interface GetContentCountsParams {
  // 可选的内容类型参数
  type?: string;
  // 可选的搜索关键词参数
  q?: string;
  // 可选的标签参数
  tag?: string;
  // 可选的分类参数
  category?: string;
}

// 用于验证获取视频列表参数的合法性
function validateParams(params: GetContentsParams) {
  const { category, tag, q } = params;
  // 如果 category、tag 和 q 参数同时存在,则抛出错误
  if ((category && (tag || q)) || (tag && q)) {
    throw new Error('Invalid parameter combination');
  }
}

// 用于获取视频列表
async function getContents(params: GetContentsParams) {
  // 验证参数合法性
  validateParams(params);

  // 构造查询字符串,排除值为 undefined 的参数
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined)));
  const url = `${API_BASE_URL}/getcontents?${queryParams.toString()}`;

  try {
    // 发送 GET 请求获取视频列表数据
    const response = await fetch(url,{ next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
  } catch (error) {
    // 如果请求失败,抛出错误
    throw new Error(`Failed to fetch contents: ${(error as Error).message}`);
  }
}
// 用于获取播放地址
async function getm3u8(params: GetVideoParams) {
  const { id } = params;
  const url = `${API_BASE_URL}/getm3u8?id=${id}`;
  // 设置请求头中的 token (API Key)
  const headers = new Headers();

  // 如果API_KEY存在,将其添加到请求头中
  if (API_KEY) {
    headers.append('token', API_KEY);
  }

  try {
    // 发送 GET 请求获取视频播放信息
    const res = await fetch(url, { headers,next: {revalidate: 36000,}});
    const data = await res.json();
    return data;
  } catch (error) {
    // 如果请求失败,抛出错误
    throw new Error(`Failed to fetch video: ${(error as Error).message}`);
  }
}
// 用于获取剧集播放信息
async function gettv(params: GetVideoParams) {
  const { id } = params;
  const url = `${API_BASE_URL}/gettv?id=${id}`;
  // 设置请求头中的 token (API Key)
  const headers = new Headers();

  // 如果API_KEY存在,将其添加到请求头中
  if (API_KEY) {
    headers.append('token', API_KEY);
  }

  try {
    // 发送 GET 请求获取视频播放信息
    const res = await fetch(url, { headers,next: {revalidate: 36000,}});
    const data = await res.json();
    return data;
  } catch (error) {
    // 如果请求失败,抛出错误
    throw new Error(`Failed to fetch video: ${(error as Error).message}`);
  }
}
async function getVideo(params: GetVideoParams) {
  const { id } = params;
  const url = `${API_BASE_URL}/getvideo/${id}`;
  // 设置请求头中的 token (API Key)
  const headers = new Headers();

  // 如果API_KEY存在,将其添加到请求头中
  if (API_KEY) {
    headers.append('token', API_KEY);
  }

  try {
    // 发送 GET 请求获取视频播放信息
    const res = await fetch(url, { headers,next: {revalidate: 36000,}});
    const data = await res.json();
    return data;
  } catch (error) {
    // 如果请求失败,抛出错误
    throw new Error(`Failed to fetch ${id} video: ${(error as Error).message}`);
  }
}


// 用于搜索视频
async function searchContents(q: string, page?: number, size?: number) {
  // 构造获取视频列表的参数对象
  const params: GetContentsParams = { q, page, size, type: 'movie,tv' };
  // 调用 getContents 函数进行搜索
  return getContents(params);
}

// 用于获取视频数量
async function getContentCounts(params: GetContentCountsParams) {
  // 构造查询字符串,排除值为 undefined 的参数
  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined)));
  const url = `${API_BASE_URL}/contentcounts?${queryParams.toString()}`;

  try {
    // 发送 GET 请求获取视频数量数据
    const response = await fetch(url,{ next: { revalidate: 3600 } });
    const data = await response.json();
    return data;
  } catch (error) {
    // 如果请求失败,抛出错误
    throw new Error(`Failed to fetch content counts: ${(error as Error).message}`);
  }
}

// 导出这些函数供其他模块使用
export { getContents, getVideo, searchContents, getContentCounts,gettv,getm3u8 };