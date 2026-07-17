const STORAGE_KEYS = {
  baseUrl: 'nova-canvas-base-url',
  model: 'nova-canvas-model',
  prompt: 'nova-canvas-last-prompt',
  rememberKey: 'nova-canvas-remember-key',
  apiKey: 'nova-canvas-api-key',
  theme: 'nova-canvas-theme',
};

const STYLE_SUFFIXES = {
  none: '',
  editorial:
    '视觉风格补充：采用高级杂志编辑设计，清晰的版式网格、强对比排版、克制配色与专业艺术指导，画面精致且具有出版品质。',
  glass:
    '视觉风格补充：采用半透明玻璃拟态与精致 3D 渲染，柔和体积光、真实材质折射、干净的科技感背景，细节清晰。',
  ink:
    '视觉风格补充：采用当代东方水墨语言，大面积留白、层叠墨色、含蓄色彩和富有呼吸感的构图，传统意境与现代设计结合。',
  comic:
    '视觉风格补充：采用波普漫画风格，粗黑轮廓、网点纹理、高饱和撞色、动态分镜与强烈视觉节奏，信息表达清楚。',
  minimal:
    '视觉风格补充：采用极简主义视觉系统，大面积留白、少量几何元素、精确对齐、低饱和配色与单一视觉焦点。',
};

const PROMPT_TEMPLATES = {
  poster:
    '设计一张高端产品发布海报。主体是一款悬浮在画面中央的未来感智能设备，三分之二侧视角，金属与磨砂玻璃材质，边缘有柔和轮廓光。背景使用深色渐变和细微空间雾，顶部保留品牌标题区域，底部安排三项核心卖点。整体构图简洁、对比强烈、商业摄影质感，文字清晰可读。',
  infographic:
    '制作一张中文知识信息图，主题为“人工智能如何改变一天的工作”。画面分为早晨、上午、下午、晚上四个清晰模块，每个模块包含一个核心场景、三个简短要点和对应图标。使用明确的阅读动线、统一图标系统、醒目的数字和简洁中文排版，信息准确，层级清楚，适合社交媒体分享。',
  storyboard:
    '创作一组电影感四格分镜：雨夜的未来城市，一名穿深色风衣的人穿过霓虹街道寻找遗失的记忆芯片。依次表现远景建立环境、中景跟随、手部特写和最终悬念镜头。蓝紫色霓虹与暖黄色室内光形成对比，湿润路面反射，宽银幕构图，电影摄影质感。',
  chinese:
    '创作一幅当代国风插画：初春清晨的江南山水，薄雾、远山、白墙黛瓦和一叶小舟层层展开，近景点缀新绿与淡粉花枝。画面结合工笔细节与水墨留白，色彩清雅，构图有纵深，安静而富有诗意。',
};

const LOADING_STEPS = [
  ['正在理解你的画面', '分析主体、信息层级与视觉意图。'],
  ['正在搭建构图骨架', '安排焦点、留白和画面阅读动线。'],
  ['正在生成视觉细节', '复杂信息图可能需要更长时间，请保持页面开启。'],
  ['正在完成最终渲染', '即将返回高分辨率图片。'],
];

const els = {
  form: document.querySelector('#generationForm'),
  baseUrl: document.querySelector('#baseUrl'),
  apiKey: document.querySelector('#apiKey'),
  rememberKey: document.querySelector('#rememberKey'),
  toggleKey: document.querySelector('#toggleKey'),
  keyToggleIcon: document.querySelector('#keyToggleIcon'),
  prompt: document.querySelector('#prompt'),
  promptCount: document.querySelector('#promptCount'),
  styleGrid: document.querySelector('#styleGrid'),
  imageSize: document.querySelector('#imageSize'),
  ratioPreview: document.querySelector('#ratioPreview'),
  modelName: document.querySelector('#modelName'),
  quantityControl: document.querySelector('#quantityControl'),
  generateButton: document.querySelector('#generateButton'),
  generateButtonText: document.querySelector('#generateButtonText'),
  cancelButton: document.querySelector('#cancelButton'),
  emptyState: document.querySelector('#emptyState'),
  loadingState: document.querySelector('#loadingState'),
  loadingTitle: document.querySelector('#loadingTitle'),
  loadingMessage: document.querySelector('#loadingMessage'),
  errorState: document.querySelector('#errorState'),
  errorMessage: document.querySelector('#errorMessage'),
  retryButton: document.querySelector('#retryButton'),
  resultsGrid: document.querySelector('#resultsGrid'),
  resultCount: document.querySelector('#resultCount'),
  clearButton: document.querySelector('#clearButton'),
  downloadAllButton: document.querySelector('#downloadAllButton'),
  expiryChip: document.querySelector('#expiryChip'),
  expiryText: document.querySelector('#expiryText'),
  generationMeta: document.querySelector('#generationMeta'),
  toast: document.querySelector('#toast'),
  toastText: document.querySelector('#toastText'),
  toastIcon: document.querySelector('.toast-icon'),
  themeToggle: document.querySelector('#themeToggle'),
};

const state = {
  style: 'none',
  count: 1,
  results: [],
  controller: null,
  loadingTimer: null,
  expiryTimer: null,
  expiresAt: null,
  toastTimer: null,
};

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Local storage can be unavailable in privacy mode; the page still works.
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage restrictions.
  }
}

function restorePreferences() {
  const storedBaseUrl = safeStorageGet(STORAGE_KEYS.baseUrl);
  const storedModel = safeStorageGet(STORAGE_KEYS.model);
  const storedPrompt = safeStorageGet(STORAGE_KEYS.prompt);
  const remembersKey = safeStorageGet(STORAGE_KEYS.rememberKey) === 'true';
  const storedTheme = safeStorageGet(STORAGE_KEYS.theme);

  if (storedBaseUrl) els.baseUrl.value = storedBaseUrl;
  if (storedModel) els.modelName.value = storedModel;
  if (storedPrompt) els.prompt.value = storedPrompt;

  els.rememberKey.checked = remembersKey;
  if (remembersKey) els.apiKey.value = safeStorageGet(STORAGE_KEYS.apiKey) || '';

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

  updatePromptCount();
  updateRatioPreview();
}

function applyTheme(theme) {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.colorMode = resolved;
  els.themeToggle?.setAttribute('aria-label', resolved === 'dark' ? '切换浅色模式' : '切换深色模式');
  els.themeToggle?.setAttribute('title', resolved === 'dark' ? '切换浅色模式' : '切换深色模式');
}

function persistConnectionSettings() {
  safeStorageSet(STORAGE_KEYS.baseUrl, els.baseUrl.value.trim());
  safeStorageSet(STORAGE_KEYS.model, els.modelName.value.trim());
}

function persistApiKey() {
  safeStorageSet(STORAGE_KEYS.rememberKey, String(els.rememberKey.checked));
  if (els.rememberKey.checked) {
    safeStorageSet(STORAGE_KEYS.apiKey, els.apiKey.value.trim());
  } else {
    safeStorageRemove(STORAGE_KEYS.apiKey);
  }
}

function updatePromptCount() {
  els.promptCount.textContent = String(els.prompt.value.length);
}

function updateRatioPreview() {
  const [width, height] = els.imageSize.value.split('x').map(Number);
  const maxWidth = 22;
  const maxHeight = 18;
  const scale = Math.min(maxWidth / width, maxHeight / height);
  els.ratioPreview.style.width = `${Math.max(8, Math.round(width * scale))}px`;
  els.ratioPreview.style.height = `${Math.max(8, Math.round(height * scale))}px`;
}

function setStyle(style) {
  state.style = style;
  els.styleGrid.querySelectorAll('[data-style]').forEach((button) => {
    const selected = button.dataset.style === style;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function setCount(count) {
  state.count = count;
  els.quantityControl.querySelectorAll('[data-count]').forEach((button) => {
    const selected = Number(button.dataset.count) === count;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

function buildEndpoint(input) {
  const raw = input.trim().replace(/\/+$/, '');
  if (!raw) throw new Error('请输入 new-api 地址');

  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    throw new Error('new-api 地址格式不正确，请填写完整的 http(s) 地址');
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('new-api 地址必须使用 http 或 https');
  }

  if (/\/images\/generations$/i.test(parsed.pathname)) return raw;
  if (/\/v1$/i.test(parsed.pathname)) return `${raw}/images/generations`;
  return `${raw}/v1/images/generations`;
}

function buildFinalPrompt(prompt) {
  const suffix = STYLE_SUFFIXES[state.style];
  return suffix ? `${prompt.trim()}\n\n${suffix}` : prompt.trim();
}

function normalizeResults(payload) {
  const candidates = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload?.images)
      ? payload.images
      : [];

  return candidates
    .map((item, index) => {
      if (typeof item === 'string') {
        return { src: item, url: item, kind: 'url', index };
      }

      const url = item?.url || item?.image_url || item?.imageUrl;
      if (url) return { src: url, url, kind: 'url', index };

      const base64 = item?.b64_json || item?.b64 || item?.base64;
      if (base64) {
        const src = base64.startsWith('data:') ? base64 : `data:image/png;base64,${base64}`;
        return { src, base64: src, kind: 'base64', index };
      }

      return null;
    })
    .filter(Boolean);
}

function extractError(payload, status) {
  const error = payload?.error;
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (payload?.message) return payload.message;
  return `接口请求失败（HTTP ${status}）`;
}

function setView(view) {
  els.emptyState.hidden = view !== 'empty';
  els.loadingState.hidden = view !== 'loading';
  els.errorState.hidden = view !== 'error';
  els.resultsGrid.hidden = view !== 'results';
}

function setBusy(isBusy) {
  els.generateButton.disabled = isBusy;
  els.generateButtonText.textContent = isBusy ? '生成进行中' : '开始生成';
  els.cancelButton.hidden = !isBusy;
}

function startLoadingMessages() {
  let index = 0;
  const applyStep = () => {
    const [title, message] = LOADING_STEPS[index % LOADING_STEPS.length];
    els.loadingTitle.textContent = title;
    els.loadingMessage.textContent = message;
    index += 1;
  };

  applyStep();
  state.loadingTimer = window.setInterval(applyStep, 5200);
}

function stopLoadingMessages() {
  if (state.loadingTimer) window.clearInterval(state.loadingTimer);
  state.loadingTimer = null;
}

function showToast(message, type = 'success') {
  window.clearTimeout(state.toastTimer);
  els.toastText.textContent = message;
  els.toastIcon.textContent = type === 'error' ? '!' : '✓';
  els.toast.classList.toggle('error', type === 'error');
  els.toast.classList.add('show');
  state.toastTimer = window.setTimeout(() => els.toast.classList.remove('show'), 2600);
}

function formatTimeLeft(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startExpiryTimer() {
  if (state.expiryTimer) window.clearInterval(state.expiryTimer);
  state.expiresAt = Date.now() + 60 * 60 * 1000;
  els.expiryChip.hidden = false;

  const tick = () => {
    const remaining = state.expiresAt - Date.now();
    els.expiryText.textContent = remaining > 0 ? `链接剩余 ${formatTimeLeft(remaining)}` : '图片链接可能已过期';
    if (remaining <= 0) {
      window.clearInterval(state.expiryTimer);
      state.expiryTimer = null;
    }
  };

  tick();
  state.expiryTimer = window.setInterval(tick, 1000);
}

function clearExpiryTimer() {
  if (state.expiryTimer) window.clearInterval(state.expiryTimer);
  state.expiryTimer = null;
  state.expiresAt = null;
  els.expiryChip.hidden = true;
}

function makeButton(label, title, onClick) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'card-action';
  button.textContent = label;
  button.title = title;
  button.addEventListener('click', onClick);
  return button;
}

function renderResults(results, meta) {
  els.resultsGrid.replaceChildren();
  els.resultsGrid.classList.toggle('single-result', results.length === 1);

  results.forEach((result, index) => {
    const card = document.createElement('article');
    card.className = 'result-card';
    card.style.animationDelay = `${index * 90}ms`;

    const imageWrap = document.createElement('div');
    imageWrap.className = 'result-image-wrap';

    const badge = document.createElement('span');
    badge.className = 'result-index';
    badge.textContent = `OUTPUT ${String(index + 1).padStart(2, '0')}`;

    const image = document.createElement('img');
    image.className = 'result-image';
    image.src = result.src;
    image.alt = `SenseNova 生成图片 ${index + 1}`;
    image.referrerPolicy = 'no-referrer';
    image.loading = index === 0 ? 'eager' : 'lazy';
    image.addEventListener('error', () => {
      showToast('图片加载失败，临时链接可能已过期', 'error');
    });

    imageWrap.append(badge, image);

    const actionBar = document.createElement('div');
    actionBar.className = 'result-actions';

    const resultMeta = document.createElement('div');
    resultMeta.className = 'result-meta';
    const resultTitle = document.createElement('strong');
    resultTitle.textContent = `SenseNova Render ${index + 1}`;
    const resultDetails = document.createElement('span');
    resultDetails.textContent = `${meta.size} · ${meta.model}`;
    resultMeta.append(resultTitle, resultDetails);

    const actions = document.createElement('div');
    actions.className = 'card-action-group';
    actions.append(
      makeButton('复制', '复制图片地址', () => copyResult(result)),
      makeButton('打开', '在新标签页打开原图', () => openResult(result)),
      makeButton('下载', '下载原图', () => downloadResult(result, index)),
    );

    actionBar.append(resultMeta, actions);
    card.append(imageWrap, actionBar);
    els.resultsGrid.append(card);
  });

  els.resultCount.textContent = `${results.length} ${results.length === 1 ? 'IMAGE' : 'IMAGES'}`;
  els.clearButton.disabled = false;
  els.downloadAllButton.disabled = false;
  els.generationMeta.textContent = `${new Date().toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })} · ${meta.size} · ${results.length} OUTPUT`;
  setView('results');
  startExpiryTimer();
}

async function copyResult(result) {
  try {
    if (result.url) {
      await navigator.clipboard.writeText(result.url);
      showToast('图片地址已复制');
      return;
    }

    await navigator.clipboard.writeText(result.base64);
    showToast('Base64 数据已复制');
  } catch {
    showToast('浏览器未允许复制，请打开原图后手动复制', 'error');
  }
}

function openResult(result) {
  const opened = window.open(result.src, '_blank', 'noopener,noreferrer');
  if (!opened) showToast('浏览器拦截了新窗口，请允许弹窗后重试', 'error');
}

function triggerDownload(href, filename) {
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = filename;
  anchor.rel = 'noreferrer';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
}

async function downloadResult(result, index, quiet = false) {
  const filename = `sensenova-${Date.now()}-${index + 1}.png`;

  if (result.kind === 'base64') {
    triggerDownload(result.src, filename);
    if (!quiet) showToast('已开始下载');
    return true;
  }

  try {
    const response = await fetch(result.url, { mode: 'cors', referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error('download failed');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    triggerDownload(objectUrl, filename);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
    if (!quiet) showToast('已开始下载');
    return true;
  } catch {
    if (!quiet) showToast('图片源未开放下载跨域，已为你打开原图', 'error');
    openResult(result);
    return false;
  }
}

async function downloadAll() {
  if (!state.results.length) return;
  els.downloadAllButton.disabled = true;
  let downloaded = 0;

  for (let index = 0; index < state.results.length; index += 1) {
    const ok = await downloadResult(state.results[index], index, true);
    if (ok) downloaded += 1;
    await new Promise((resolve) => window.setTimeout(resolve, 350));
  }

  els.downloadAllButton.disabled = false;
  showToast(downloaded ? `已触发 ${downloaded} 张图片下载` : '已打开原图，请手动保存');
}

function clearResults() {
  state.results = [];
  els.resultsGrid.replaceChildren();
  els.resultsGrid.classList.remove('single-result');
  els.resultCount.textContent = '0 IMAGES';
  els.clearButton.disabled = true;
  els.downloadAllButton.disabled = true;
  els.generationMeta.textContent = 'READY FOR INPUT';
  clearExpiryTimer();
  setView('empty');
}

function showError(message) {
  els.errorMessage.textContent = message;
  els.generationMeta.textContent = 'REQUEST FAILED';
  setView('error');
}

async function generateImages(event) {
  event?.preventDefault();
  if (state.controller) return;

  const apiKey = els.apiKey.value.trim();
  const model = els.modelName.value.trim();
  const prompt = els.prompt.value.trim();

  if (!apiKey) {
    els.apiKey.focus();
    showToast('请输入 API Key', 'error');
    return;
  }
  if (!prompt) {
    els.prompt.focus();
    showToast('请先描述想生成的画面', 'error');
    return;
  }
  if (!model) {
    els.modelName.focus();
    showToast('请输入模型名称', 'error');
    return;
  }

  let endpoint;
  try {
    endpoint = buildEndpoint(els.baseUrl.value);
  } catch (error) {
    els.baseUrl.focus();
    showToast(error.message, 'error');
    return;
  }

  persistConnectionSettings();
  persistApiKey();
  safeStorageSet(STORAGE_KEYS.prompt, prompt);

  state.controller = new AbortController();
  setBusy(true);
  setView('loading');
  clearExpiryTimer();
  startLoadingMessages();
  els.generationMeta.textContent = 'GENERATING…';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt: buildFinalPrompt(prompt),
        size: els.imageSize.value,
        n: state.count,
      }),
      signal: state.controller.signal,
    });

    const raw = await response.text();
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      throw new Error(raw ? `接口返回了非 JSON 内容：${raw.slice(0, 160)}` : '接口返回内容为空');
    }

    if (!response.ok) throw new Error(extractError(payload, response.status));

    const results = normalizeResults(payload);
    if (!results.length) {
      throw new Error('接口请求成功，但响应中没有找到 data[].url 或 b64_json 图片数据');
    }

    state.results = results;
    renderResults(results, { size: els.imageSize.value, model });
    showToast(`成功生成 ${results.length} 张图片`);
  } catch (error) {
    if (error.name === 'AbortError') {
      showError('本次生成已取消，你可以修改描述后重新开始。');
    } else if (error instanceof TypeError && /fetch/i.test(error.message)) {
      showError('无法连接接口。请检查 new-api 地址、HTTPS 配置以及 CORS 是否允许 Authorization 请求头。');
    } else {
      showError(error.message || '生成失败，请稍后重试。');
    }
  } finally {
    stopLoadingMessages();
    setBusy(false);
    state.controller = null;
  }
}

function cancelGeneration() {
  state.controller?.abort();
}

els.toggleKey.addEventListener('click', () => {
  const isPassword = els.apiKey.type === 'password';
  els.apiKey.type = isPassword ? 'text' : 'password';
  els.keyToggleIcon.textContent = isPassword ? '◌' : '◉';
  els.toggleKey.setAttribute('aria-label', isPassword ? '隐藏 API Key' : '显示 API Key');
});

els.themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.colorMode === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
  safeStorageSet(STORAGE_KEYS.theme, nextTheme);
});

els.rememberKey.addEventListener('change', persistApiKey);
els.apiKey.addEventListener('change', persistApiKey);
els.baseUrl.addEventListener('change', persistConnectionSettings);
els.modelName.addEventListener('change', persistConnectionSettings);
els.prompt.addEventListener('input', updatePromptCount);
els.prompt.addEventListener('change', () => safeStorageSet(STORAGE_KEYS.prompt, els.prompt.value));
els.imageSize.addEventListener('change', updateRatioPreview);

document.querySelectorAll('[data-template]').forEach((button) => {
  button.addEventListener('click', () => {
    els.prompt.value = PROMPT_TEMPLATES[button.dataset.template] || '';
    updatePromptCount();
    safeStorageSet(STORAGE_KEYS.prompt, els.prompt.value);
    els.prompt.focus();
    showToast('提示词模板已填入');
  });
});

els.styleGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-style]');
  if (button) setStyle(button.dataset.style);
});

els.quantityControl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-count]');
  if (button) setCount(Number(button.dataset.count));
});

els.form.addEventListener('submit', generateImages);
els.cancelButton.addEventListener('click', cancelGeneration);
els.clearButton.addEventListener('click', clearResults);
els.downloadAllButton.addEventListener('click', downloadAll);
els.retryButton.addEventListener('click', () => {
  setView(state.results.length ? 'results' : 'empty');
  els.prompt.focus();
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    if (!state.controller) els.form.requestSubmit();
  }
});

restorePreferences();
