---
name: zhouli-git-push
description: 提交并推送当前项目到 Gitee 仓库 zhouli532（git add、commit、push）。当用户说提交项目、提交代码、推送到 gitee、push 代码时使用。不要用于推送到其他远程仓库或普通 git 答疑。
---

# 提交项目（push 到 Gitee zhouli532）

把当前项目的改动用 git 提交并推送到远程仓库 `https://gitee.com/zh-ou-li-li/zhouli532.git`。

## 步骤

1. 运行 `git status` 和 `git diff` 查看待提交内容；用 `git log --oneline -5` 参考已有提交信息的风格（中文短句）。
2. 暂存改动：按文件名逐个 `git add <文件>`，不要盲目 `git add -A`。本项目常见改动是 html/css/img/font/cdn 目录下的文件；`zhouli_prompt.md` 属于项目文件，一并提交。
3. 提交：`git commit -m "<中文一句话，说明本次改动的目的>"`。
4. 推送：
   - 日常推送：`git push`（分支 master 已跟踪 origin/master）。
   - 首次或未跟踪时：`git push -u origin master`。

## 远程未配置时的补救（仅当 `git remote -v` 为空）

```bash
git remote add origin https://gitee.com/zh-ou-li-li/zhouli532.git
git push -u origin master
```

## 红线

- 不提交 `.env`、凭据、临时/调试文件。
- 不使用 `--force`、`--no-verify` 等破坏性参数，除非用户明确要求。
- 推送失败时先报告错误原文（常见为网络或 Gitee 认证），不要反复重试。
