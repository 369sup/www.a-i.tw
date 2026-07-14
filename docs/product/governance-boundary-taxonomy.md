# Governance boundary taxonomy

狀態：Accepted analytical taxonomy / not an official GitHub count

GitHub 官方沒有「治理容器總數」分類。治理邊界必須依責任分類，不能混成單一父子清單：

| Category                        | Concrete boundaries                     | Governs                                       |
| ------------------------------- | --------------------------------------- | --------------------------------------------- |
| Account governance roots        | User、Organization、Enterprise accounts | identity／ownership／cross-org governance     |
| Principal delegation containers | Enterprise team、Organization team      | group-derived roles／access／licenses         |
| Resource access boundaries      | Repository、Project                     | visibility、collaborators、resource roles     |
| Financial allocation containers | Cost center                             | cost attribution、budget、billing destination |

若只盤點具名作用域共有八項，但它們不是八個同類 Aggregate 或同一治理階層：Cost center 不授予
resource access，Team 通常不擁有工作資源，Project 是 User／Organization-owned 而不是 Repository
child。

以下不是治理容器：Managed user、Role、Permission、Policy、Ruleset、Entitlement、License、App
installation、Issue、Discussion、Notification inbox、Search、Audit log、Budget。

官方來源：

- <https://docs.github.com/en/get-started/learning-about-github/types-of-github-accounts>
- <https://docs.github.com/en/issues/planning-and-tracking-with-projects/creating-projects/creating-a-project>
- <https://docs.github.com/en/billing/concepts/cost-centers>
