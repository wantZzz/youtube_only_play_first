# youtube_only_play_first
在首頁的合輯的彈出選項新增單獨播放首個影片的選項 | Adds the option to play the first video individually to the pop-up menu for compilations on the homepage

![image](https://github.com/wantZzz/youtube_only_play_first/blob/main/github_manual_img/0_zh.png)

**❗注意 | Notice :** 
1. 現有版本只支持 **繁體中文** 與 **英文** | The current version only supports **Traditional Chinese** and **English**
2. 本腳本如需升級版本需手動更新 | You need to update manually if you need to upgrade to the new version
3. 需要安裝 **tampermonkey** 才能使用本腳本 | You need to install **tampermonkey** to use this script

[Please click here for English version](https://github.com/wantZzz/youtube_only_play_first/blob/main/README_en.md)

## 📖 使用須知

### 在 0.0.0 版本: 
本腳本只應對了 youtube 首頁裡的合輯、影片、short這三個常見的推薦，若選了其他的彈出選項可能會有意外的錯誤\
且 tampermonkey 無法偵測你從 youtube 影片 -> youtube 首頁 的情況，故使用者 **只有在從非 youtube 同網域的網站進到 youtube 首頁選擇影片時** 才會執行本腳本

## 📥 如何安裝

**你能從 [這裡](https://github.com/wantZzz/youtube_only_play_first/releases/latest) 取得最新版本並下載 `youtube_only_play_first_[語言].user.js` 以供後續步驟使用**

1. 到 [chrome 線上應用程式商店](https://chrome.google.com/webstore/category/extensions) 
2. 搜尋 **tampermonkey** 並加到chrome
3. 在 chrome 右上角找到 **擴充功能(圖標為🧩)** 並點選
4. 點下你剛下載的擴充功能，名稱為 **竄改猴** 或 **Tampermonky**
5. 進入 Tampermonky 的控制台(會新開分頁)
6. 進到 **匯入匯出工具**
7. 找到 **匯入** 並 "選擇檔案" ，找到你剛下載本的 **youtube_only_play_first_[語言].user.js** 選擇並匯入
8. 點下 **安裝** 完成插件安裝