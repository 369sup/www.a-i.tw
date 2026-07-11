# Security Policy

請勿在 issue 或 pull request 公開 token、credential、個人資料或生產資料。

發現安全問題時，請透過私下的 security contact 通知維護者，提供影響範圍、重現步驟與建議修補方式；在修補前不要公開細節。

每次變更應通過 `npm run semgrep`。依賴更新應檢查 lockfile 與 `npm audit` 結果，避免以 `--force` 直接解決未理解的相依性衝突。
