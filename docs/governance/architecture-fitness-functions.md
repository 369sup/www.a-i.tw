# Architecture fitness functions

狀態：Target / partial automation

| Rule                         | Current verification        | Gap                                    |
| ---------------------------- | --------------------------- | -------------------------------------- |
| Layer direction              | dependency-cruiser, Semgrep | add Context-specific negative tests    |
| Public exports only          | package exports checks      | no modules yet                         |
| Context map / manifest match | architecture scripts        | no active Context                      |
| Contract ownership           | documentation review        | add compatibility tests when published |
| No cross-context internals   | import graph checks         | no runtime graph yet                   |
