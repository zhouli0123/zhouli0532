# AGENTS.md

纯静态 HTML/CSS/JS 课程练习站点（内容为中文）。扁平仓库：**没有 package.json、没有构建、没有 lint、没有测试。** 页面必须能用 `file://` 直接打开运行 —— 不用 `fetch`、不用 ES 模块；第三方库一律下载到本地 `cdn/` 目录，用相对路径引用。

## 硬性工作流规则（来自 `zhouli_prompt.md`，用户的指令日志）

1. **执行前先记录提示词。** 做任何事之前，先以**附加（追加，绝不覆盖）**方式向 `zhouli_prompt.md` 写入一条记录，格式与已有条目一致：时间（Asia/Shanghai 日期）、使用的模型、提示词内容（原文照录）。
2. **命名前缀。** 新建的 CSS 类名、id 名、JS 变量、CSS 自定义属性一律以 `zhouli_` 开头（如 `.zhouli_hero`、`--zhouli_ink`）。只约束新代码；不改动早于该规则的旧页面。
3. **新页面接入首页课堂模块。** 每个新建的 `.html` 文件必须两件事都做：
   - 页面内保留指向 `index.html` 的返回链接 —— 现有模式：`<a class="zhouli_back" href="index.html">返回首页</a>`；
   - 在 `index.html` 的课堂模块（`.course-grid`）中登记为新卡片 —— 沿用现有 `course-card` 模式（编号顺延，覆盖"敬请期待"占位卡的位置并把其编号 +1），卡片含英文序号标签、中文标题、一句话简介和 `card-link` 链接文字。
4. **新页面带注释。** 每个新建的 `.html` 文件要有文件头注释，每个 JS 函数都要有说明其主要功能的注释。注释内容：周丽、建立时间（Asia/Shanghai 日期）、使用模型、功能名称及简介。示例：

   ```html
   <!-- 周丽 2026-11-02 GLM-5.3-Flash 功能：xxx —— 简介 -->
   ```

   ```js
   // 周丽 2026-11-02 GLM-5.3-Flash 功能：getTotal —— 计算学生五科总分
   ```

5. **文档语言约定。** 在本项目里生成的所有文档、检查清单：说明文字与检查条目统一用简体中文；文件路径、HTML/CSS/JS 标识符保留英文。本文件即按此约定书写。

## 目录结构

- `index.html` —— 首页/课程入口；样式全部内联，通过 `.course-card` 链接各课程页。按硬性规则第 3 条，每个新建页面都要在这里登记卡片（历史遗留页面 `iconfont-*.html`、`JS_obj_fun.html` 等尚未挂载，除非用户要求补录）。
- `cdn/` —— 本地化的第三方资源：Font Awesome（`cdn/css/all.min.css` + `cdn/webfonts/`）、Lucide（`cdn/lucide.min.js`）。新库也下载到这里；视该目录为只读。
- `font/` —— 由 iconfont.cn 生成（项目 id 5238920）：`iconfont.css/js/ttf/woff…` 及生成器自带的 `demo_index.html`。只能从官网重新生成，不要手改。
- `img/` —— 页面图片（另有两个零散的布局练习文件）。
- `data.js` —— 普通 `<script>`，在 `starter-level1-0532-zl.html` 的内联脚本之前加载；暴露 `window.STUDENTS` / `window.SUBJECTS`。不要改成模块。
- `frontend-design/SKILL.md` —— 设计规范；用户明确要求 UI/视觉工作时遵循它。
- 各页面样式放在页面旁边的 `*.css` 或页内 `<style>` 中；没有共享样式表 —— 没被要求时保持现状。

## Git

- 远程 `origin` = `https://gitee.com/zh-ou-li-li/zhouli532.git`（Gitee）；远程 `github` = `git@github.com:zhouli0123/zhouli0532.git`（GitHub，SSH 公钥认证）。分支均为 `master`。
- "提交项目 / 推送到 Gitee"：按 `.trae/skills/zhouli-git-push/SKILL.md` 执行 —— 逐文件暂存（禁止 `git add -A`）、中文一句话提交信息（对齐 `git log --oneline` 风格）、显式 `git push origin master`（master 的跟踪目标现为 github/master）。
- "提交到 github"：按 `.trae/skills/zhouli-github-push/SKILL.md` 执行 —— 推送前需设 `GIT_SSH_COMMAND=C:/Windows/System32/OpenSSH/ssh.exe`（正斜杠）。
- 禁用 `--force` / `--no-verify`；推送报错时报告错误原文，不要盲目重试。

## 编辑约定

- 文件为 UTF-8 **无 BOM**、CRLF 换行、内容为中文 —— 写入时保持编码不变。
- 所有文档、检查清单遵守硬性规则第 5 条的语言约定。
