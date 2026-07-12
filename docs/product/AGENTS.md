# Product documentation research rules

- GitHub 產品語意研究先讀 `github-official-url-inventory.md` 與 `github-official-research-map.md`，只選一個相關官方章節與一個本地
  canonical owner；不要預載全部 GitHub Docs 或全部 `docs/product/`。
- 只萃取非程式碼產品語意。排除 Git、Commit、Branch、Pull Request、source code、Code Search、
  Actions、workflow、runner、Packages、Codespaces、Git LFS 與 code-centric security scanning。
- 官方文件是外部產品行為證據，不是本專案 runtime evidence；沒有 manifest、source 或 test 證據時，
  本地狀態只能標為 `Proposed` 或 `External reference only`。
- `Enterprise`、`Entitlement`、`Notification`、`Search` 必須分別更新各自 owner 文件，不得因研究方便
  合併成單一 control-plane 文件。
- 官方導覽階層不等於 Domain hierarchy。先分類 Entity、Value、Relationship、Policy、Projection 或
  Use Case，再依 Ubiquitous Language 與 Context Map 判定 ownership。
