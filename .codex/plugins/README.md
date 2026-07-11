# 專案 Plugin 與 MCP 選用清單

本專案不在 repository 內安裝或啟用使用者層級 plugin；安裝狀態與 OAuth 屬於個人 Codex 設定。專案只宣告何時應優先使用已可用的能力。

| 能力                     | 專案設定/來源                                               | 使用時機                                       | 預設方式                                       |
| ------------------------ | ----------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------- |
| Context7                 | Codex Desktop 已提供的 Context7 MCP                         | 已安裝套件、框架或第三方 API 的即時/版本化細節 | 本機版本與文件優先，不足才查                   |
| GitHub                   | Codex Desktop 已提供的 GitHub MCP／GitHub plugin            | PR、issue、review、Actions                     | connector 優先，`git`/`gh` 補目前 checkout/log |
| OpenAI Developers        | Codex Desktop 已提供的 OpenAI Developers MCP                | OpenAI API、SDK、模型與 Codex 官方資訊         | 只使用官方文件；API key 不可輸出               |
| Serena Semantic Workflow | `plugins/serena-semantic-workflow/` 與 `.codex/config.toml` | 程式符號、引用、實作與安全 refactor            | Serena LSP 工具優先；非程式文字用原生工具      |

## Codex Desktop 既有 MCP 的使用方式

GitHub、Context7 與 OpenAI Developers 均由 Codex Desktop 管理，不得再寫入專案的
`.codex/config.toml`。需要使用已連線的能力時，在對話中明確標註 connector 與其 app ID：

```text
@github @app-69ef18c674308191a2f952431f91ea61
確認 repository 權限後，再推送目前分支。

@Context7 @app-<Context7-app-id>
查詢目前使用套件版本的官方文件。

@OpenAI Developers @app-<OpenAI-Developers-app-id>
只查詢 OpenAI 官方開發者文件。
```

GitHub 先以 connector 取得 repository 與權限資訊；實際本機分支推送仍使用 `git push`。
Context7 與 OpenAI Developers 則只在本機文件不足或需官方、即時版本資訊時使用。app ID 是
Desktop 連線身分，不放進專案 MCP 設定或任何 credential 檔案。

需要新 plugin 時，先確認它是否真的比既有 MCP/CLI 更適合，再由使用者安裝。若要把可重用能力發佈成 plugin，使用 repository 外的 personal/team plugin 目錄與官方 plugin scaffold；不要把 marketplace credential 或使用者 plugin cache 提交到本專案。

## Serena Semantic Workflow

本 repository 已設定 `mcp_servers.serena`，因此 plugin 僅封裝自動觸發的 skill，不重複啟動第二個 Serena server。Serena 必須安裝與執行於 Windows 11 的 WSL Ubuntu，不可混用 Windows Python、Node 或 `serena.exe`。透過 `.agents/plugins/marketplace.json` 安裝後，請開啟新的 Codex task 以載入 skill；MCP 仍由受信任的專案 `.codex/config.toml` 啟動。

Codex Desktop 會把 Windows 的 `CODEX_HOME` 傳進 WSL；其中包含 Windows path 的 marketplace snapshot，Linux CLI 無法解析。這不是 snapshot 損毀。直接從 WSL terminal 使用 CLI 時，必須用下列 wrapper；它會明確設定 Linux `CODEX_HOME` 為 `$HOME/.codex`（或 `CODEX_WSL_HOME`），而非共用 Windows state：

```bash
scripts/validation/wsl-codex.sh plugin marketplace list
scripts/validation/wsl-codex.sh plugin list
pnpm task:doctor
```

Desktop 自己啟動的 task 保持使用 Desktop 的 host-managed state 與 connector；wrapper 只適用於 WSL terminal 直接執行 `codex` 的情境。這兩個 runtime 共享 repository 的 `AGENTS.md`、`.codex/`、skills 與 marketplace，而不共享 OS-specific user state。
