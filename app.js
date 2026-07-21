const STORAGE_KEYS = {
  baseUrl: 'nova-canvas-base-url',
  model: 'nova-canvas-model',
  prompt: 'nova-canvas-last-prompt',
  rememberKey: 'nova-canvas-remember-key',
  apiKey: 'nova-canvas-api-key',
  theme: 'nova-canvas-theme',
  chatModel: 'nova-canvas-chat-model',
  chatSystem: 'nova-canvas-chat-system',
  chatReasoning: 'nova-canvas-chat-reasoning',
  editModel: 'nova-canvas-edit-model',
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

const CHAT_TASKS = {
  describe: '请客观、详细地描述所附图片。先概括整体内容，再分别说明主体、环境、构图、光线、色彩、材质、可见文字和可能被忽略的细节。明确区分可见事实与合理推断。',
  ocr: '请提取所附图片中所有可见文字，尽量保持原有阅读顺序、段落和表格结构。对无法确认的字符使用 [不清晰] 标记，不要自行补写。最后简要总结文字内容。',
  edit_prompt:
    '请分析所附原图，并把我的修改意图整理成一份可直接交给图片生成模型的详细中文改图提示词。提示词需要明确：必须保留的主体与身份特征、需要修改的区域、构图与镜头、光线、色彩、材质、背景、文字要求，以及必须避免的变化。注意：只输出可执行的改图提示词和一行负面约束，不要声称已经修改图片。我的修改意图是：',
  critique: '请从构图、视觉层级、色彩、光线、字体与信息可读性、主体表现六个方面点评所附图片。每一项先说明现状，再给出具体可执行的改进建议，最后按优先级列出最值得先改的三项。',
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
  generationModeTab: document.querySelector('#generationModeTab'),
  chatModeTab: document.querySelector('#chatModeTab'),
  editModeTab: document.querySelector('#editModeTab'),
  generationControls: document.querySelector('#generationControls'),
  chatControls: document.querySelector('#chatControls'),
  editControls: document.querySelector('#editControls'),
  generationCanvas: document.querySelector('#generationCanvas'),
  chatCanvas: document.querySelector('#chatCanvas'),
  workspaceEyebrow: document.querySelector('#workspaceEyebrow'),
  workspaceTitle: document.querySelector('#workspaceTitle'),
  workspaceDescription: document.querySelector('#workspaceDescription'),
  workspaceBadge: document.querySelector('#workspaceBadge'),
  canvasEyebrow: document.querySelector('#canvasEyebrow'),
  canvasTitle: document.querySelector('#canvasTitle'),
  emptyTitle: document.querySelector('#emptyTitle'),
  emptyDescription: document.querySelector('#emptyDescription'),
  chatModelName: document.querySelector('#chatModelName'),
  chatSystemPrompt: document.querySelector('#chatSystemPrompt'),
  reasoningControl: document.querySelector('#reasoningControl'),
  chatTaskGrid: document.querySelector('#chatTaskGrid'),
  clearChatButton: document.querySelector('#clearChatButton'),
  chatMessages: document.querySelector('#chatMessages'),
  chatEmptyState: document.querySelector('#chatEmptyState'),
  chatDropZone: document.querySelector('#chatDropZone'),
  attachmentList: document.querySelector('#attachmentList'),
  imageUrlRow: document.querySelector('#imageUrlRow'),
  imageUrlInput: document.querySelector('#imageUrlInput'),
  addImageUrlButton: document.querySelector('#addImageUrlButton'),
  uploadImageButton: document.querySelector('#uploadImageButton'),
  imageFileInput: document.querySelector('#imageFileInput'),
  toggleImageUrlButton: document.querySelector('#toggleImageUrlButton'),
  chatInput: document.querySelector('#chatInput'),
  sendChatButton: document.querySelector('#sendChatButton'),
  chatMeta: document.querySelector('#chatMeta'),
  editModelName: document.querySelector('#editModelName'),
  editPrompt: document.querySelector('#editPrompt'),
  editUploadZone: document.querySelector('#editUploadZone'),
  editUploadPlaceholder: document.querySelector('#editUploadPlaceholder'),
  editUploadPreview: document.querySelector('#editUploadPreview'),
  editImagePreview: document.querySelector('#editImagePreview'),
  editImageName: document.querySelector('#editImageName'),
  editImageSize: document.querySelector('#editImageSize'),
  editImageFileInput: document.querySelector('#editImageFileInput'),
  removeEditImage: document.querySelector('#removeEditImage'),
  editButton: document.querySelector('#editButton'),
  editButtonText: document.querySelector('#editButtonText'),
  cancelEditButton: document.querySelector('#cancelEditButton'),
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
  mode: 'generation',
  chatMessages: [],
  chatAttachments: [],
  chatController: null,
  chatReasoning: 'medium',
  attachmentId: 0,
  editImageFile: null,
  editObjectUrl: null,
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
  const storedChatModel = safeStorageGet(STORAGE_KEYS.chatModel);
  const storedChatSystem = safeStorageGet(STORAGE_KEYS.chatSystem);
  const storedChatReasoning = safeStorageGet(STORAGE_KEYS.chatReasoning);
  const storedEditModel = safeStorageGet(STORAGE_KEYS.editModel);

  if (storedBaseUrl) els.baseUrl.value = storedBaseUrl;
  if (storedModel) els.modelName.value = storedModel;
  if (storedPrompt) els.prompt.value = storedPrompt;
  if (storedChatModel) els.chatModelName.value = storedChatModel;
  if (storedChatSystem) els.chatSystemPrompt.value = storedChatSystem;
  if (storedEditModel) els.editModelName.value = storedEditModel;

  els.rememberKey.checked = remembersKey;
  if (remembersKey) els.apiKey.value = safeStorageGet(STORAGE_KEYS.apiKey) || '';

  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));
  setChatReasoning(storedChatReasoning || 'medium');

  updatePromptCount();
  updateRatioPreview();
}

function applyTheme(theme) {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.colorMode = resolved;
  els.themeToggle?.setAttribute('aria-label', resolved === 'dark' ? '切换浅色模式' : '切换深色模式');
  els.themeToggle?.setAttribute('title', resolved === 'dark' ? '切换浅色模式' : '切换深色模式');
}

function switchMode(mode) {
  const isChat = mode === 'chat';
  const isEdit = mode === 'edit';
  const isGeneration = !isChat && !isEdit;
  state.mode = isChat ? 'chat' : isEdit ? 'edit' : 'generation';

  els.generationControls.hidden = !isGeneration;
  els.editControls.hidden = !isEdit;
  els.generationCanvas.hidden = isChat;
  els.chatControls.hidden = !isChat;
  els.chatCanvas.hidden = !isChat;
  els.generationModeTab.classList.toggle('selected', isGeneration);
  els.chatModeTab.classList.toggle('selected', isChat);
  els.editModeTab.classList.toggle('selected', isEdit);
  els.generationModeTab.setAttribute('aria-selected', String(isGeneration));
  els.chatModeTab.setAttribute('aria-selected', String(isChat));
  els.editModeTab.setAttribute('aria-selected', String(isEdit));

  els.workspaceEyebrow.textContent = isChat ? 'VISION CHAT' : isEdit ? 'IMAGE EDITS' : 'SETTINGS';
  els.workspaceTitle.textContent = isChat ? '配置多模态对话' : isEdit ? '编辑原图' : '配置图片生成';
  els.workspaceDescription.textContent = isChat
    ? '使用 Flash-Lite 进行文本对话、图片理解和改图提示词设计。'
    : isEdit
      ? '上传原图并调用支持 /images/edits 的模型生成编辑结果。'
      : '连接兼容 OpenAI Images API 的服务，并配置模型与创作参数。';
  els.workspaceBadge.textContent = isChat ? 'Flash-Lite' : isEdit ? 'Images Edits' : 'Images API';

  els.canvasEyebrow.textContent = isEdit ? 'EDITED OUTPUT' : 'LIVE OUTPUT';
  els.canvasTitle.textContent = isEdit ? 'Edited images' : 'Generations';
  els.emptyTitle.textContent = isEdit ? '还没有编辑结果' : '还没有生成图片';
  els.emptyDescription.textContent = isEdit
    ? '上传原图并写下修改要求，编辑结果会在这里出现。'
    : '在左侧写下画面构想，选择比例与风格，生成结果会在这里出现。';

  window.requestAnimationFrame(() => {
    if (isChat) els.chatInput.focus({ preventScroll: true });
  });
}

function setChatReasoning(effort) {
  const validEfforts = new Set(['none', 'low', 'medium', 'high']);
  state.chatReasoning = validEfforts.has(effort) ? effort : 'medium';
  els.reasoningControl.querySelectorAll('[data-effort]').forEach((button) => {
    const selected = button.dataset.effort === state.chatReasoning;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  safeStorageSet(STORAGE_KEYS.chatReasoning, state.chatReasoning);
}

function buildChatEndpoint(input) {
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

  if (/\/chat\/completions$/i.test(parsed.pathname)) return raw;
  if (/\/v1$/i.test(parsed.pathname)) return `${raw}/chat/completions`;
  return `${raw}/v1/chat/completions`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error(`无法读取 ${file.name}`));
    reader.readAsDataURL(file);
  });
}

async function addImageFiles(fileList) {
  const supportedTypes = new Set(['image/png', 'image/jpeg', 'image/gif', 'image/webp']);
  const files = [...fileList];

  for (const file of files) {
    if (state.chatAttachments.length >= 4) {
      showToast('单次消息最多添加 4 张图片', 'error');
      break;
    }
    if (!supportedTypes.has(file.type)) {
      showToast(`${file.name} 不是支持的图片格式`, 'error');
      continue;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast(`${file.name} 超过 10 MB，请压缩后重试`, 'error');
      continue;
    }

    try {
      const src = await readFileAsDataUrl(file);
      state.attachmentId += 1;
      state.chatAttachments.push({
        id: state.attachmentId,
        kind: 'file',
        src,
        name: file.name,
        mime: file.type,
      });
    } catch (error) {
      showToast(error.message, 'error');
    }
  }

  renderAttachments();
}

function addImageUrl() {
  if (state.chatAttachments.length >= 4) {
    showToast('单次消息最多添加 4 张图片', 'error');
    return;
  }

  const value = els.imageUrlInput.value.trim();
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    showToast('请输入完整的图片 URL', 'error');
    return;
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    showToast('图片 URL 必须使用 http 或 https', 'error');
    return;
  }

  state.attachmentId += 1;
  state.chatAttachments.push({
    id: state.attachmentId,
    kind: 'url',
    src: value,
    name: parsed.pathname.split('/').pop() || parsed.hostname,
    mime: 'image/url',
  });
  els.imageUrlInput.value = '';
  els.imageUrlRow.hidden = true;
  els.toggleImageUrlButton.classList.remove('active');
  renderAttachments();
}

function removeAttachment(id) {
  state.chatAttachments = state.chatAttachments.filter((attachment) => attachment.id !== id);
  renderAttachments();
}

function renderAttachments() {
  els.attachmentList.replaceChildren();
  els.attachmentList.hidden = state.chatAttachments.length === 0;

  state.chatAttachments.forEach((attachment) => {
    const item = document.createElement('div');
    item.className = 'attachment-item';
    const image = document.createElement('img');
    image.src = attachment.src;
    image.alt = attachment.name;
    image.referrerPolicy = 'no-referrer';

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'attachment-remove';
    remove.setAttribute('aria-label', `移除 ${attachment.name}`);
    remove.textContent = '×';
    remove.addEventListener('click', () => removeAttachment(attachment.id));

    const source = document.createElement('span');
    source.className = 'attachment-source';
    source.textContent = attachment.kind === 'file' ? attachment.name : 'URL';
    item.append(image, remove, source);
    els.attachmentList.append(item);
  });
}

function formatChatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}

function transferToGeneration(text) {
  els.prompt.value = text;
  updatePromptCount();
  safeStorageSet(STORAGE_KEYS.prompt, text);
  switchMode('generation');
  window.requestAnimationFrame(() => {
    els.prompt.focus();
    els.prompt.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
  showToast('已将回答转为图片生成提示词');
}

function renderChatMessages({ thinking = false } = {}) {
  els.chatMessages.replaceChildren();
  els.chatEmptyState.hidden = state.chatMessages.length > 0 || thinking;
  if (!els.chatEmptyState.hidden) els.chatMessages.append(els.chatEmptyState);

  state.chatMessages.forEach((message) => {
    const article = document.createElement('article');
    article.className = `chat-message ${message.role}${message.error ? ' error' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.textContent = message.role === 'assistant' ? 'AI' : '你';

    const body = document.createElement('div');
    body.className = 'chat-message-body';
    const header = document.createElement('div');
    header.className = 'chat-message-header';
    const author = document.createElement('strong');
    author.textContent = message.role === 'assistant' ? 'SenseNova Flash-Lite' : '你';
    const time = document.createElement('time');
    time.textContent = formatChatTime(message.createdAt);
    header.append(author, time);
    if (message.usage) {
      const usage = document.createElement('span');
      usage.className = 'chat-usage';
      usage.textContent = `${message.usage.total_tokens ?? 0} tokens`;
      header.append(usage);
    }

    const content = document.createElement('div');
    content.className = 'chat-message-content';
    if (message.images?.length) {
      const imageGrid = document.createElement('div');
      imageGrid.className = 'message-image-grid';
      message.images.forEach((src, index) => {
        const image = document.createElement('img');
        image.src = src;
        image.alt = `输入图片 ${index + 1}`;
        image.referrerPolicy = 'no-referrer';
        imageGrid.append(image);
      });
      content.append(imageGrid);
    }
    const text = document.createElement('div');
    text.textContent = message.text;
    content.append(text);

    body.append(header, content);
    if (message.role === 'assistant' && !message.error) {
      const actions = document.createElement('div');
      actions.className = 'assistant-message-actions';
      const copy = document.createElement('button');
      copy.type = 'button';
      copy.textContent = '复制回答';
      copy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(message.text);
          showToast('回答已复制');
        } catch {
          showToast('浏览器未允许复制', 'error');
        }
      });
      const transfer = document.createElement('button');
      transfer.type = 'button';
      transfer.textContent = '转到图片生成';
      transfer.addEventListener('click', () => transferToGeneration(message.text));
      actions.append(copy, transfer);
      body.append(actions);
    }

    article.append(avatar, body);
    els.chatMessages.append(article);
  });

  if (thinking) {
    const article = document.createElement('article');
    article.className = 'chat-message assistant';
    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.textContent = 'AI';
    const body = document.createElement('div');
    body.className = 'chat-message-body';
    const thinkingNode = document.createElement('div');
    thinkingNode.className = 'chat-message-content chat-thinking';
    thinkingNode.innerHTML = '<svg class="spinner" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-opacity=".25" stroke-width="2"></circle><path d="M14 8a6 6 0 0 0-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg><span>正在理解并组织回答…</span>';
    body.append(thinkingNode);
    article.append(avatar, body);
    els.chatMessages.append(article);
  }

  els.clearChatButton.disabled = state.chatMessages.length === 0 && !thinking;
  window.requestAnimationFrame(() => {
    els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
  });
}

function extractChatContent(payload) {
  const content = payload?.choices?.[0]?.message?.content;
  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((block) => block?.text || block?.content || '')
      .filter(Boolean)
      .join('\n')
      .trim();
  }
  return '';
}

function setChatBusy(isBusy) {
  els.sendChatButton.disabled = isBusy;
  els.sendChatButton.querySelector('span').textContent = isBusy ? '生成中' : '发送';
  if (isBusy) els.chatMeta.textContent = 'REQUESTING…';
}

async function sendChatMessage() {
  if (state.chatController) return;

  const apiKey = els.apiKey.value.trim();
  const model = els.chatModelName.value.trim();
  const inputText = els.chatInput.value.trim();
  if (!apiKey) {
    els.apiKey.focus();
    showToast('请输入 API Key', 'error');
    return;
  }
  if (!model) {
    els.chatModelName.focus();
    showToast('请输入对话模型名称', 'error');
    return;
  }
  if (!inputText && !state.chatAttachments.length) {
    els.chatInput.focus();
    showToast('请输入问题或添加图片', 'error');
    return;
  }

  let endpoint;
  try {
    endpoint = buildChatEndpoint(els.baseUrl.value);
  } catch (error) {
    els.baseUrl.focus();
    showToast(error.message, 'error');
    return;
  }

  const textForApi = inputText || '请客观、详细地描述这些图片。';
  const attachments = state.chatAttachments.map((attachment) => ({ ...attachment }));
  const content = [{ type: 'text', text: textForApi }];
  attachments.forEach((attachment) => {
    content.push({ type: 'image_url', image_url: { url: attachment.src } });
  });

  const userMessage = {
    role: 'user',
    content: attachments.length ? content : textForApi,
    text: textForApi,
    images: attachments.map((attachment) => attachment.src),
    createdAt: Date.now(),
  };
  state.chatMessages.push(userMessage);
  state.chatAttachments = [];
  els.chatInput.value = '';
  renderAttachments();
  renderChatMessages({ thinking: true });
  setChatBusy(true);
  persistConnectionSettings();
  persistApiKey();
  safeStorageSet(STORAGE_KEYS.chatModel, model);
  safeStorageSet(STORAGE_KEYS.chatSystem, els.chatSystemPrompt.value);

  const apiMessages = [];
  const systemPrompt = els.chatSystemPrompt.value.trim();
  if (systemPrompt) apiMessages.push({ role: 'system', content: systemPrompt });
  state.chatMessages.forEach((message) => {
    if (!message.error) apiMessages.push({ role: message.role, content: message.content });
  });

  state.chatController = new AbortController();
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: apiMessages,
        stream: false,
        max_tokens: 4096,
        reasoning_effort: state.chatReasoning,
      }),
      signal: state.chatController.signal,
    });

    const raw = await response.text();
    let payload;
    try {
      payload = JSON.parse(raw);
    } catch {
      throw new Error(raw ? `接口返回了非 JSON 内容：${raw.slice(0, 160)}` : '接口返回内容为空');
    }
    if (!response.ok) throw new Error(extractError(payload, response.status));

    const assistantText = extractChatContent(payload);
    if (!assistantText) throw new Error('接口请求成功，但没有返回可显示的文本内容');

    state.chatMessages.push({
      role: 'assistant',
      content: assistantText,
      text: assistantText,
      createdAt: Date.now(),
      usage: payload.usage,
    });
    els.chatMeta.textContent = payload.usage?.total_tokens
      ? `${payload.usage.total_tokens} TOKENS`
      : 'COMPLETED';
  } catch (error) {
    const message =
      error.name === 'AbortError'
        ? '本次对话请求已取消。'
        : error instanceof TypeError && /fetch/i.test(error.message)
          ? '无法连接接口。请检查 new-api 地址及 CORS 配置；本地 data URL 若被代理拒绝，可改用公开图片 URL。'
          : error.message || '对话请求失败，请稍后重试。';
    state.chatMessages.push({
      role: 'assistant',
      content: '',
      text: message,
      createdAt: Date.now(),
      error: true,
    });
    els.chatMeta.textContent = 'REQUEST FAILED';
  } finally {
    state.chatController = null;
    setChatBusy(false);
    renderChatMessages();
  }
}

function clearChat() {
  if (state.chatController) state.chatController.abort();
  state.chatMessages = [];
  state.chatAttachments = [];
  els.chatInput.value = '';
  renderAttachments();
  renderChatMessages();
  els.chatMeta.textContent = 'READY';
}

function setEditImage(file) {
  if (!file) return;
  const supportedTypes = new Set(['image/png', 'image/jpeg', 'image/webp']);
  if (!supportedTypes.has(file.type)) {
    showToast('编辑模式支持 PNG、JPEG、WebP 图片', 'error');
    return;
  }
  if (file.size > 20 * 1024 * 1024) {
    showToast('原图超过 20 MB，请压缩后重试', 'error');
    return;
  }

  if (state.editObjectUrl) URL.revokeObjectURL(state.editObjectUrl);
  state.editImageFile = file;
  state.editObjectUrl = URL.createObjectURL(file);
  els.editImagePreview.src = state.editObjectUrl;
  els.editImageName.textContent = file.name;
  els.editImageSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.type}`;
  els.editUploadPlaceholder.hidden = true;
  els.editUploadPreview.hidden = false;
}

function clearEditImage() {
  if (state.editObjectUrl) URL.revokeObjectURL(state.editObjectUrl);
  state.editObjectUrl = null;
  state.editImageFile = null;
  els.editImageFileInput.value = '';
  els.editImagePreview.removeAttribute('src');
  els.editUploadPlaceholder.hidden = false;
  els.editUploadPreview.hidden = true;
}

function buildEditEndpoint(input) {
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
  if (/\/images\/edits$/i.test(parsed.pathname)) return raw;
  if (/\/v1$/i.test(parsed.pathname)) return `${raw}/images/edits`;
  return `${raw}/v1/images/edits`;
}

function setEditBusy(isBusy) {
  els.editButton.disabled = isBusy;
  els.editButtonText.textContent = isBusy ? '编辑中…' : '开始编辑图片';
  els.cancelEditButton.hidden = !isBusy;
}

async function editImage(event) {
  event?.preventDefault();
  if (state.controller) return;

  const apiKey = els.apiKey.value.trim();
  const model = els.editModelName.value.trim();
  const prompt = els.editPrompt.value.trim();
  if (!apiKey) {
    els.apiKey.focus();
    showToast('请输入 API Key', 'error');
    return;
  }
  if (!model) {
    els.editModelName.focus();
    showToast('请输入编辑模型名称', 'error');
    return;
  }
  if (!prompt) {
    els.editPrompt.focus();
    showToast('请输入修改要求', 'error');
    return;
  }
  if (!state.editImageFile) {
    showToast('请先上传原图', 'error');
    return;
  }

  let endpoint;
  try {
    endpoint = buildEditEndpoint(els.baseUrl.value);
  } catch (error) {
    els.baseUrl.focus();
    showToast(error.message, 'error');
    return;
  }

  const body = new FormData();
  body.append('model', model);
  body.append('prompt', prompt);
  body.append('size', els.imageSize.value);
  body.append('n', String(state.count));
  body.append('image', state.editImageFile, state.editImageFile.name);

  persistConnectionSettings();
  persistApiKey();
  safeStorageSet(STORAGE_KEYS.editModel, model);
  state.controller = new AbortController();
  setEditBusy(true);
  setView('loading');
  clearExpiryTimer();
  startLoadingMessages();
  els.generationMeta.textContent = 'EDITING…';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body,
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
    if (!results.length) throw new Error('接口请求成功，但响应中没有找到编辑后的图片数据');
    state.results = results;
    renderResults(results, { size: els.imageSize.value, model });
    showToast(`成功编辑 ${results.length} 张图片`);
  } catch (error) {
    if (error.name === 'AbortError') showError('本次图片编辑已取消。');
    else if (error instanceof TypeError && /fetch/i.test(error.message)) {
      showError('无法连接图片编辑接口。请确认 new-api 已配置 /images/edits，并允许浏览器跨域上传。');
    } else {
      showError(error.message || '图片编辑失败，请检查模型和接口配置。');
    }
  } finally {
    stopLoadingMessages();
    setEditBusy(false);
    state.controller = null;
  }
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
  if (state.mode === 'edit') {
    await editImage(event);
    return;
  }
  if (state.mode !== 'generation') return;
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

els.generationModeTab.addEventListener('click', () => switchMode('generation'));
els.chatModeTab.addEventListener('click', () => switchMode('chat'));
els.editModeTab.addEventListener('click', () => switchMode('edit'));

els.rememberKey.addEventListener('change', persistApiKey);
els.apiKey.addEventListener('change', persistApiKey);
els.baseUrl.addEventListener('change', persistConnectionSettings);
els.modelName.addEventListener('change', persistConnectionSettings);
els.chatModelName.addEventListener('change', () => {
  safeStorageSet(STORAGE_KEYS.chatModel, els.chatModelName.value.trim());
});
els.chatSystemPrompt.addEventListener('change', () => {
  safeStorageSet(STORAGE_KEYS.chatSystem, els.chatSystemPrompt.value);
});
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

els.reasoningControl.addEventListener('click', (event) => {
  const button = event.target.closest('[data-effort]');
  if (button) setChatReasoning(button.dataset.effort);
});

els.chatTaskGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-chat-task]');
  if (!button) return;
  const task = CHAT_TASKS[button.dataset.chatTask];
  if (!task) return;
  els.chatInput.value = task;
  els.chatInput.focus();
  els.chatInput.setSelectionRange(els.chatInput.value.length, els.chatInput.value.length);
});

els.uploadImageButton.addEventListener('click', () => els.imageFileInput.click());
els.imageFileInput.addEventListener('change', async () => {
  await addImageFiles(els.imageFileInput.files);
  els.imageFileInput.value = '';
});

els.toggleImageUrlButton.addEventListener('click', () => {
  const willOpen = els.imageUrlRow.hidden;
  els.imageUrlRow.hidden = !willOpen;
  els.toggleImageUrlButton.classList.toggle('active', willOpen);
  if (willOpen) window.requestAnimationFrame(() => els.imageUrlInput.focus());
});
els.addImageUrlButton.addEventListener('click', addImageUrl);
els.imageUrlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addImageUrl();
  }
});

els.sendChatButton.addEventListener('click', sendChatMessage);
els.clearChatButton.addEventListener('click', clearChat);

els.editModelName.addEventListener('change', () => {
  safeStorageSet(STORAGE_KEYS.editModel, els.editModelName.value.trim());
});
els.editButton.addEventListener('click', editImage);
els.cancelEditButton.addEventListener('click', cancelGeneration);
els.editUploadZone.addEventListener('click', (event) => {
  if (!event.target.closest('button')) els.editImageFileInput.click();
});
els.editImageFileInput.addEventListener('change', () => {
  setEditImage(els.editImageFileInput.files?.[0]);
});
els.removeEditImage.addEventListener('click', clearEditImage);
['dragenter', 'dragover'].forEach((eventName) => {
  els.editUploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.editUploadZone.classList.add('drag-active');
  });
});
['dragleave', 'drop'].forEach((eventName) => {
  els.editUploadZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.editUploadZone.classList.remove('drag-active');
  });
});
els.editUploadZone.addEventListener('drop', (event) => {
  const file = event.dataTransfer.files?.[0];
  if (file) setEditImage(file);
});

const editHints = {
  background: '保留主体、姿态、身份特征和原有细节，只把背景替换为：',
  style: '保留主体和构图，把整体视觉风格改为：',
  remove: '保留画面其他内容，移除图片中的：',
};
document.querySelectorAll('[data-edit-hint]').forEach((button) => {
  button.addEventListener('click', () => {
    const hint = editHints[button.dataset.editHint];
    els.editPrompt.value = `${hint || ''}${els.editPrompt.value.trim()}`;
    els.editPrompt.focus();
  });
});

['dragenter', 'dragover'].forEach((eventName) => {
  els.chatDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    if ([...event.dataTransfer.types].includes('Files')) els.chatDropZone.classList.add('drag-active');
  });
});
['dragleave', 'drop'].forEach((eventName) => {
  els.chatDropZone.addEventListener(eventName, (event) => {
    event.preventDefault();
    els.chatDropZone.classList.remove('drag-active');
  });
});
els.chatDropZone.addEventListener('drop', async (event) => {
  if (event.dataTransfer.files?.length) await addImageFiles(event.dataTransfer.files);
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
    if (state.mode === 'chat') {
      sendChatMessage();
    } else if (state.mode === 'edit') {
      editImage();
    } else if (!state.controller) {
      els.form.requestSubmit();
    }
  }
});

document.addEventListener('pointerdown', (event) => {
  if (!els.sizeSelectMenu.hidden && !els.sizeSelect.contains(event.target)) closeSizeSelect();
});

restorePreferences();
