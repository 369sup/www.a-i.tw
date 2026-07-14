# 專案 Plugin 與 MCP 選用清單

工具路由的完整規則請先看 [`../TOOL-ROUTING.md`](../TOOL-ROUTING.md)；本檔只保留 plugin/connector 的邊界與安裝原則。

本專案不在 repository 內安裝或啟用使用者層級 plugin；安裝狀態與 OAuth 屬於個人 Codex 設定。專案只宣告何時應優先使用已可用的能力。

| 能力              | 專案設定/來源                                    | 使用時機                                       | 預設方式                                       |
| ----------------- | ------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| Context7          | Codex Desktop 已提供的 Context7 MCP              | 已安裝套件、框架或第三方 API 的即時/版本化細節 | 本機版本與文件優先，不足才查                   |
| GitHub            | Codex Desktop 已提供的 GitHub MCP／GitHub plugin | PR、issue、review、Actions                     | connector 優先，`git`/`gh` 補目前 checkout/log |
| OpenAI Developers | Codex Desktop 的官方 OpenAI Developers plugin    | OpenAI API、SDK、Agents 與 ChatGPT Apps        | 使用 bundled skills／MCP；API key 不可輸出     |
| Vercel            | Codex Desktop 的官方 Vercel plugin               | Vercel、Next.js、React、AI SDK 與完整流程驗證  | 使用官方 bundled skills                        |
| Serena            | Host `mcp_servers.serena`                        | 程式符號、引用、實作、diagnostics 與 memory    | 官方 Serena CLI 的 stdio MCP                   |
| Modules           | `.agents/plugins/plugins/modules/`               | repository 探索、文件、架構、scaffold 與交付   | 依 trigger 載入單一 workflow skill             |

## Codex Desktop 既有 MCP 的使用方式

GitHub、Context7 與 OpenAI Developers 均由 Codex Desktop 管理，不得再寫入專案的
`.codex/config.toml`。需要使用已連線的能力時，直接使用目前工作階段已暴露的
connector/app；不要在 repository 文件或設定中記錄 connector ID：

```text
@github
確認 repository 權限後，再推送目前分支。

@Context7
查詢目前使用套件版本的官方文件。

@OpenAI Developers
只查詢 OpenAI 官方開發者文件。
```

GitHub 先以 connector 取得 repository 與權限資訊；實際本機分支推送仍使用 `git push`。
Context7 與 OpenAI Developers 則只在本機文件不足或需官方、即時版本資訊時使用。連線身分由
Desktop 管理，不放進專案 MCP 設定或任何 credential 檔案。

需要新 plugin 時，先確認它是否真的比既有 MCP/CLI 更適合，再使用官方 plugin scaffold。Repository 可保存 team plugin source 與不含憑證的 marketplace catalog；實際安裝狀態、信任決策、credential 與 plugin cache 仍由 host 管理，不得提交。

## Serena

Serena 只使用官方 CLI 的 stdio MCP；不透過 repository marketplace plugin、常駐 HTTP server 或 singleton bootstrap 啟動。Repository 的 `AGENTS.md`、memory policy、`.serena/project.yml` 與 checkpoint validator 擁有專案 workflow、狀態 schema與語意工具路由。

初次使用時依 Serena 官方文件安裝並初始化 CLI：

```sh
uv tool install -p 3.13 serena-agent
serena init
serena setup codex
```

Codex host 的 `~/.codex/config.toml` 只保留一個 `mcp_servers.serena`。Codex app 若無法從 shell `PATH` 找到 `serena`，使用該 host 的完整 executable path；本專案可用 `--project D:\\GitHub\\www.a-i.tw --context codex` 自動啟用，避免每個 task 重複 activation。變更 MCP 設定後完全重啟 Codex，並在新 task 以 `/mcp` 或 `get_current_config` 驗證工具已載入。

`modules@all-plugins` 仍是獨立的 repository workflow plugin；它不負責啟動 Serena：

```sh
codex plugin marketplace add .agents/plugins
codex plugin add modules@all-plugins
```

Codex Desktop task 使用 host-managed state 與 connector。直接從 host terminal 使用 CLI 時，請使用目前 host 的 `CODEX_HOME` 或 Codex 預設設定：

```sh
codex plugin marketplace list
codex plugin list
```

Desktop 自己啟動的 task 保持使用 Desktop 的 host-managed state 與 connector；host CLI 與 Desktop 共享 repository 的 `AGENTS.md`、`.codex/`、skills 與 marketplace，但使用各自的 user state。
