---
name: zhouli-github-push
description: 提交并推送当前项目到 GitHub 仓库 zhouli0532（git add、commit、push，走 SSH 公钥认证）。当用户说提交到 github、push 到 github、推送到 github 时使用。不要用于 Gitee 提交（用 zhouli-git-push）或其他远程仓库。
---

# 提交项目（push 到 GitHub zhouli0532）

把当前项目的改动提交并推送到 GitHub 仓库 `git@github.com:zhouli0123/zhouli0532.git`。用户已在 GitHub 配置 SSH 公钥，认证走 SSH，不要改用 HTTPS。

## 步骤

1. `git status` 和 `git diff` 审查改动；`git log --oneline -5` 参考已有提交信息风格（中文短句）。
2. 按文件名逐个 `git add <文件>`，不要盲目 `git add -A`。`zhouli_prompt.md` 属于项目文件，一并提交。
3. `git commit -m "<中文一句话，说明本次改动的目的>"`。
4. 检查远程：`git remote -v`。本仓库 origin 指向 Gitee，GitHub 用独立的 `github` 远程名；若尚不存在则添加：

   ```bash
   git remote add github git@github.com:zhouli0123/zhouli0532.git
   ```

5. 推送（分支 master）：
   - 首次：`git push -u github master`
   - 日常：`git push github master`

## 说明

- origin（Gitee）与 github 两个远程互不影响；用户要求"两边都推"时需分别推送，只推了一个要如实说明。
- 推送报认证错误时，用 `ssh -T git@github.com` 自检公钥配置，把错误原文报告给用户，不要反复重试。

## 红线

- 不提交 `.env`、凭据、临时/调试文件。
- 不使用 `--force`、`--no-verify` 等破坏性参数，除非用户明确要求。
