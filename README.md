
## cli 
* 採用 oclif 這個 Node.js 的 cli framework，也有支援 TypeScript，如果要新增其他 command 只要在 `src/commands/` 下增加對應的 js 即可
* 爬蟲部分用 crawler 處理

### 如何跑起來
因為只是作業等級的 cli 就沒有發佈到 npm 上面了
* `git clone` 這個專案
* `cd cyr_crawler`
* `npm i`
* `npm link` 把這個專案暫時加到 local npm 
* 開始測試，如果不知怎用 `cyr_crawler -h` 有簡易說明
* 測試完之後 `npm unlink` 從 local npm 把此專案移除(要在 cyr_crawler 這個路徑下)

## 需要實作的 function 都在 [test.js](test.js)
這邊沒有使用 unit test 的 library 就簡單用 `console.log` 印出 test case

## 簡答部分
### 問題
因為使用者變多導致資料庫讀寫變慢，如何從讀寫兩個層面去優化
### 回答
我個人是沒有過優化資料庫的經驗，但我想大部分的優化都是從找出效能的瓶頸開始，可能從一些資料庫監控的工具去看，或是哪一隻 api 特別慢，進一步去找是不是有做法不正確的地方，導致效能不合預期。

從讀方面來看
* 可以考慮使用情境是否需要每次都跟資料庫拿，使用 Redis 之類的快取熱門查詢結果，減少資料庫處理到的量
* 可以對會拿來當查詢條件的欄位加 index，但要注意 index 是用空間換取時間的方式，而且寫入時會需要更久時間，這邊就要看這張表的讀寫比率以及希望讀快還是寫快去做取捨

從寫的方面來看
* 可以考慮使用情境是否需要每筆當下寫入，或是可以累積多少筆再一次寫入

其他方面
* 從根本的方式解決，既然是表太長導致讀寫慢，就把大表分割成小表，分法也要看實際資料，最簡單就是按照日期去拆分
* Connection Pool(連線池)

建議優化順序 
1. 進行硬體優化，例如：將 HDD 換成 SSD、增加 CPU core
1. 先做 DB server 的優化(例如：增加 index, 優化 slow query)
1. 引入 cache 技術(例如：redis)減少 DB 壓力
1. 服務與 DB table 優化，重構(例如：根據業務邏輯對程序邏輯做優化，減少不必要的查詢)
1. 在這些操作都不能大幅度優化性能的情況下，不能滿足將來的發展，再考慮分庫分表

### 參考資料
* https://godleon.github.io/blog/Architecture_Design/Architecture-Design-High-Performance-db-nosql-cache/
* https://www.gushiciku.cn/pl/gkis/zh-tw
