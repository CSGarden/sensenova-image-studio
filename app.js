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

const TEMPLATE_LIBRARY = [
  {
    id: 'short_video_storyboard',
    category: 'storyboard',
    title: '短视频叙事分镜',
    description: '适合剧情号、Vlog 和 30–60 秒竖屏短片。',
    tags: ['竖屏', '6 镜头', '节奏'],
    prompt:
      '制作一张竖屏短视频的六格分镜板，主题为“下班后重新找回生活节奏”。统一主角造型、服装和场景连续性。镜头 1：办公室远景，主角疲惫收拾电脑；镜头 2：电梯镜面中的近景表情；镜头 3：街头跟拍，暖色夕阳出现；镜头 4：手部特写，摘下耳机打开相机；镜头 5：河边奔跑的动态广角；镜头 6：主角面向城市夜景的收束镜头。每格标注景别、机位、运镜和时长，视觉节奏由压抑逐渐转为舒展，适合 9:16 短视频。',
  },
  {
    id: 'commercial_storyboard',
    category: 'storyboard',
    title: '商业广告分镜',
    description: '产品卖点、使用场景与品牌收束镜头。',
    tags: ['广告', '产品', '8 镜头'],
    prompt:
      '设计一组八格商业广告分镜，产品是一款轻薄智能耳机。镜头依次包含：城市清晨建立镜头、产品从暗处被轮廓光勾勒、佩戴动作特写、地铁降噪使用场景、运动防水场景、触控交互微距、多人生活方式蒙太奇、品牌标志与产品英雄镜头。每格标注景别、镜头运动、声音提示和核心卖点，保持产品外观严格一致，画面高级、简洁、可直接用于广告提案。',
  },
  {
    id: 'talking_head_broll',
    category: 'storyboard',
    title: '口播与 B-roll 分镜',
    description: '知识口播、人物采访和辅助画面组合。',
    tags: ['口播', 'B-roll', '知识视频'],
    prompt:
      '制作一张知识类口播视频的九格分镜板，主题为“如何减少注意力切换”。以人物中景口播为主线，穿插手机通知特写、任务清单俯拍、电脑多窗口、关闭通知、番茄钟、专注工作和成果回顾等 B-roll。为每格标注画面类型（A-roll 或 B-roll）、景别、字幕重点、预计时长和转场方式。整体构图清楚、人物连续、适合剪辑师直接执行。',
  },
  {
    id: 'comic_storyboard',
    category: 'storyboard',
    title: '漫画分镜页',
    description: '对白、动作、情绪和跨格阅读节奏。',
    tags: ['漫画', '对白', '动态构图'],
    prompt:
      '创作一页六格漫画分镜：年轻侦探在旧书店发现一本会改变文字的书。使用大小不一的格框控制节奏，包含环境建立、人物反应、手指触碰书页的特写、文字变化的超近景、突然熄灯的动作格和最后的大幅悬念格。预留中文对白气泡和拟声词位置，人物形象在所有格中保持一致，视线引导清晰，黑白墨线与少量强调色。',
  },
  {
    id: 'action_storyboard',
    category: 'storyboard',
    title: '动作场面分镜',
    description: '追逐、打斗和空间关系清晰的连续镜头。',
    tags: ['动作戏', '机位', '连续性'],
    prompt:
      '制作一组九格动作戏分镜：两名角色在多层停车场展开追逐。先用大全景交代双方位置，再通过低机位奔跑、越过障碍的侧向跟拍、鞋底与地面的特写、车辆之间的穿梭、转角遭遇、手持近身对抗、高位俯拍和出口处急停完成节奏。遵守轴线和运动方向连续性，每格标注机位、焦段、运镜和动作节点，空间关系必须清楚。',
  },
  {
    id: 'educational_storyboard',
    category: 'storyboard',
    title: '教学流程分镜',
    description: '步骤演示、操作细节和错误提醒。',
    tags: ['教程', '步骤', '演示'],
    prompt:
      '设计一张八格教学视频分镜板，主题为“手冲咖啡基础流程”。依次展示器具全景、称豆、研磨粗细特写、滤纸润湿、第一次注水闷蒸、分段绕圈注水、液面与时间特写、成品和关键参数总结。每格包含步骤编号、景别、手部动作、屏幕字幕和常见错误提醒，视觉统一、信息准确、适合拍摄执行。',
  },
  {
    id: 'cinematic_storyboard',
    category: 'storyboard',
    title: '电影叙事分镜',
    description: '强调氛围、表演、光线和镜头语言。',
    tags: ['电影感', '光影', '悬念'],
    prompt:
      '创作一组电影感八格分镜：雨夜的未来城市，一名穿深色风衣的人寻找遗失的记忆芯片。依次表现城市远景、背后跟拍、橱窗倒影中的人物近景、手部打开旧照片的特写、巷口主观镜头、陌生人出现的过肩镜头、追逐中的手持镜头和最终悬念特写。标注景别、焦段、运镜、光线和情绪，保持人物与场景连续性，宽银幕构图。',
  },
  {
    id: 'poster',
    category: 'design',
    title: '产品发布海报',
    description: '商业摄影、卖点层级和品牌标题区域。',
    tags: ['产品', '海报', '商业'],
    prompt:
      '设计一张高端产品发布海报。主体是一款悬浮在画面中央的未来感智能设备，三分之二侧视角，金属与磨砂玻璃材质，边缘有柔和轮廓光。背景使用深色渐变和细微空间雾，顶部保留品牌标题区域，底部安排三项核心卖点。整体构图简洁、对比强烈、商业摄影质感，文字清晰可读。',
  },
  {
    id: 'infographic',
    category: 'design',
    title: '知识信息图',
    description: '模块化信息、数字重点和阅读动线。',
    tags: ['信息图', '排版', '社交媒体'],
    prompt:
      '制作一张中文知识信息图，主题为“人工智能如何改变一天的工作”。画面分为早晨、上午、下午、晚上四个清晰模块，每个模块包含一个核心场景、三个简短要点和对应图标。使用明确的阅读动线、统一图标系统、醒目的数字和简洁中文排版，信息准确，层级清楚，适合社交媒体分享。',
  },
  {
    id: 'social_cover',
    category: 'design',
    title: '社交媒体封面',
    description: '标题抓眼、缩略图清晰、适合移动端。',
    tags: ['封面', '标题', '移动端'],
    prompt:
      '设计一张社交媒体视频封面，主题为“普通人也能用的 AI 工作流”。使用一个清晰的人物表情作为视觉焦点，旁边放置三到五个字的醒目中文主标题，背景用简化的应用界面和连接箭头表达自动化流程。高对比配色，缩小后仍能辨认，避免堆叠过多文字，适合移动端信息流。',
  },
  {
    id: 'product_exploded',
    category: 'design',
    title: '产品爆炸图',
    description: '结构拆解、部件标注与工业设计表现。',
    tags: ['工业设计', '结构', '标注'],
    prompt:
      '制作一张无线机械键盘的产品爆炸结构图。以等轴测视角从上到下分层展示键帽、轴体、定位板、PCB、电池、吸音层和铝合金外壳，各部件间距均匀，并使用细线与简洁中文标注连接对应名称。背景干净，材质真实，结构逻辑准确，兼具工业设计说明图和高端产品渲染质感。',
  },
  {
    id: 'character_sheet',
    category: 'illustration',
    title: '角色设定三视图',
    description: '保持服装、比例和细节一致的角色表。',
    tags: ['角色', '三视图', '一致性'],
    prompt:
      '设计一张完整角色设定表：一名近未来城市信使，二十多岁，短发，穿功能型夹克与轻量背包。画面包含正面、侧面、背面三视图，两种表情特写，手套、通讯器和鞋子的局部细节，以及简洁色板。所有视图保持人物比例、服装结构和配色完全一致，白色背景，专业动画与游戏概念设计稿风格。',
  },
  {
    id: 'chinese',
    category: 'illustration',
    title: '当代国风插画',
    description: '水墨留白、东方意境和现代构成。',
    tags: ['国风', '水墨', '意境'],
    prompt:
      '创作一幅当代国风插画：初春清晨的江南山水，薄雾、远山、白墙黛瓦和一叶小舟层层展开，近景点缀新绿与淡粉花枝。画面结合工笔细节与水墨留白，色彩清雅，构图有纵深，安静而富有诗意。',
  },
  {
    id: 'environment_concept',
    category: 'illustration',
    title: '场景概念设计',
    description: '世界观、尺度感、光线与环境叙事。',
    tags: ['场景', '概念设计', '氛围'],
    prompt:
      '创作一幅科幻场景概念设计：建造在巨大峡谷中的垂直生态城市，层叠平台由桥梁和轨道连接，瀑布从高处穿过建筑群，远处有雾中的能源塔。前景加入微小人物和交通工具建立尺度感，清晨侧逆光，空间层次丰富，既有未来技术也有自然生态，电影级环境概念艺术。',
  },
];

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
  sizeSelect: document.querySelector('#sizeSelect'),
  sizeSelectButton: document.querySelector('#sizeSelectButton'),
  sizeSelectMenu: document.querySelector('#sizeSelectMenu'),
  sizeSelectLabel: document.querySelector('#sizeSelectLabel'),
  sizeSelectMeta: document.querySelector('#sizeSelectMeta'),
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
  openTemplateLibrary: document.querySelector('#openTemplateLibrary'),
  closeTemplateLibrary: document.querySelector('#closeTemplateLibrary'),
  templateModal: document.querySelector('#templateModal'),
  templateSearch: document.querySelector('#templateSearch'),
  templateFilters: document.querySelector('#templateFilters'),
  templateLibraryGrid: document.querySelector('#templateLibraryGrid'),
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
  templateCategory: 'all',
  templateReturnFocus: null,
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

function setSizeOption(option, { close = true } = {}) {
  if (!option) return;

  els.imageSize.value = option.dataset.value;
  els.sizeSelectLabel.textContent = option.dataset.label;
  els.sizeSelectMeta.textContent = option.dataset.meta;
  els.sizeSelectMenu.querySelectorAll('.custom-select-option').forEach((item) => {
    const selected = item === option;
    item.classList.toggle('selected', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  updateRatioPreview();
  if (close) closeSizeSelect({ returnFocus: true });
}

function openSizeSelect({ focusSelected = false } = {}) {
  els.sizeSelectMenu.hidden = false;
  els.sizeSelectButton.setAttribute('aria-expanded', 'true');
  els.sizeSelect.classList.add('open');

  const triggerRect = els.sizeSelectButton.getBoundingClientRect();
  const menuHeight = Math.min(els.sizeSelectMenu.scrollHeight, 320);
  const roomBelow = window.innerHeight - triggerRect.bottom;
  const roomAbove = triggerRect.top;
  els.sizeSelect.classList.toggle('drop-up', roomBelow < menuHeight + 12 && roomAbove > roomBelow);

  if (focusSelected) {
    window.requestAnimationFrame(() => {
      const selected = els.sizeSelectMenu.querySelector('.custom-select-option.selected');
      selected?.focus();
      selected?.scrollIntoView({ block: 'nearest' });
    });
  }
}

function closeSizeSelect({ returnFocus = false } = {}) {
  els.sizeSelectMenu.hidden = true;
  els.sizeSelectButton.setAttribute('aria-expanded', 'false');
  els.sizeSelect.classList.remove('open', 'drop-up');
  if (returnFocus) els.sizeSelectButton.focus();
}

function moveSizeOptionFocus(direction) {
  const options = [...els.sizeSelectMenu.querySelectorAll('.custom-select-option')];
  const currentIndex = options.indexOf(document.activeElement);
  let nextIndex;

  if (direction === 'first') nextIndex = 0;
  else if (direction === 'last') nextIndex = options.length - 1;
  else if (currentIndex < 0) nextIndex = Math.max(0, options.findIndex((item) => item.classList.contains('selected')));
  else nextIndex = (currentIndex + direction + options.length) % options.length;

  options[nextIndex]?.focus();
  options[nextIndex]?.scrollIntoView({ block: 'nearest' });
}

function applyTemplate(templateId, { closeLibrary = true } = {}) {
  const template = TEMPLATE_LIBRARY.find((item) => item.id === templateId);
  if (!template) return;

  els.prompt.value = template.prompt;
  updatePromptCount();
  safeStorageSet(STORAGE_KEYS.prompt, template.prompt);
  if (closeLibrary) closeTemplateLibrary();
  els.prompt.focus();
  showToast(`已填入“${template.title}”模板`);
}

function renderTemplateLibrary() {
  const query = els.templateSearch.value.trim().toLowerCase();
  const filtered = TEMPLATE_LIBRARY.filter((template) => {
    const categoryMatches = state.templateCategory === 'all' || template.category === state.templateCategory;
    const searchable = [template.title, template.description, ...template.tags].join(' ').toLowerCase();
    return categoryMatches && (!query || searchable.includes(query));
  });

  els.templateLibraryGrid.replaceChildren();

  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'template-library-empty';
    empty.textContent = '没有找到匹配的模板，可以换个关键词试试。';
    els.templateLibraryGrid.append(empty);
    return;
  }

  filtered.forEach((template) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'template-library-card';
    button.dataset.template = template.id;

    const top = document.createElement('span');
    top.className = 'template-card-top';
    const icon = document.createElement('span');
    icon.className = `template-category-icon category-${template.category}`;
    icon.textContent = template.category === 'storyboard' ? '▦' : template.category === 'design' ? '◆' : '✦';
    const title = document.createElement('strong');
    title.textContent = template.title;
    top.append(icon, title);

    const description = document.createElement('span');
    description.className = 'template-card-description';
    description.textContent = template.description;

    const tags = document.createElement('span');
    tags.className = 'template-card-tags';
    template.tags.forEach((tag) => {
      const tagNode = document.createElement('small');
      tagNode.textContent = tag;
      tags.append(tagNode);
    });

    button.append(top, description, tags);
    button.addEventListener('click', () => applyTemplate(template.id));
    els.templateLibraryGrid.append(button);
  });
}

function openTemplateLibrary() {
  state.templateReturnFocus = document.activeElement;
  els.templateModal.hidden = false;
  document.body.classList.add('modal-open');
  renderTemplateLibrary();
  window.requestAnimationFrame(() => els.templateSearch.focus());
}

function closeTemplateLibrary() {
  if (els.templateModal.hidden) return;
  els.templateModal.hidden = true;
  document.body.classList.remove('modal-open');
  state.templateReturnFocus?.focus?.();
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
  if (/sensenova/i.test(meta.model)) startExpiryTimer();
  else clearExpiryTimer();
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

document.querySelectorAll('[data-template]').forEach((button) => {
  button.addEventListener('click', () => applyTemplate(button.dataset.template, { closeLibrary: false }));
});

els.sizeSelectButton.addEventListener('click', () => {
  if (els.sizeSelectMenu.hidden) openSizeSelect();
  else closeSizeSelect();
});

els.sizeSelectButton.addEventListener('keydown', (event) => {
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
    event.preventDefault();
    openSizeSelect({ focusSelected: true });
  }
});

els.sizeSelectMenu.addEventListener('click', (event) => {
  const option = event.target.closest('.custom-select-option');
  if (option) setSizeOption(option);
});

els.sizeSelectMenu.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveSizeOptionFocus(1);
  } else if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveSizeOptionFocus(-1);
  } else if (event.key === 'Home') {
    event.preventDefault();
    moveSizeOptionFocus('first');
  } else if (event.key === 'End') {
    event.preventDefault();
    moveSizeOptionFocus('last');
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    const option = event.target.closest('.custom-select-option');
    if (option) setSizeOption(option);
  } else if (event.key === 'Escape') {
    event.preventDefault();
    closeSizeSelect({ returnFocus: true });
  }
});

els.openTemplateLibrary.addEventListener('click', openTemplateLibrary);
els.closeTemplateLibrary.addEventListener('click', closeTemplateLibrary);
els.templateSearch.addEventListener('input', renderTemplateLibrary);
els.templateFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  state.templateCategory = button.dataset.category;
  els.templateFilters.querySelectorAll('[data-category]').forEach((item) => {
    item.classList.toggle('selected', item === button);
  });
  renderTemplateLibrary();
});

els.templateModal.addEventListener('click', (event) => {
  if (event.target === els.templateModal) closeTemplateLibrary();
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
  if (event.key === 'Escape' && !els.templateModal.hidden) {
    event.preventDefault();
    closeTemplateLibrary();
    return;
  }

  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    if (!state.controller) els.form.requestSubmit();
  }
});

document.addEventListener('pointerdown', (event) => {
  if (!els.sizeSelectMenu.hidden && !els.sizeSelect.contains(event.target)) closeSizeSelect();
});

restorePreferences();
