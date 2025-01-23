# auto-signin-scripts
- 源码: [SublimeCT/auto-signin-scripts](https://github.com/SublimeCT/auto-signin-scripts)
- 反馈: [new issue](https://github.com/SublimeCT/auto-signin-scripts/issues/new?template=Blank+issue)

## 介绍
此脚本是为了(每天开机时)自动执行一些任务, 例如 *签到* / *每日抽奖* 等, 需要在 [启动时自动打开这些签到页面](#1-在系统中创建自动化任务开机启动)

## 功能
- 掘金
  - 签到
  - 抽奖

## 使用
### 1 在系统中创建自动化任务(开机启动)
> 这一步是为了在开机时打开 `Chrome` 访问指定网站的签到页面, 以实现开机自动签到的功能

#### MacOS
1. 打开 `Script Editor`, 输入以下内容并保存
```bash
tell application "Google Chrome"
	-- 启动 Chrome
	activate
	
	-- 设置要打开的网址列表
	set websiteList to {¬
		"https://juejin.cn/user/center/signin"}
	
	-- 如果 Chrome 没有打开的窗口，创建新窗口
	if (count windows) = 0 then
		make new window
	end if
	
	-- 获取当前窗口
	set targetWindow to window 1
	
	-- 遍历网址列表并打开标签页
	repeat with websiteURL in websiteList
		tell targetWindow
			make new tab with properties {URL:websiteURL}
		end tell
	end repeat
end tell
```

2. 点击 **文件** **导出**, 选择 **文件格式** 为 **应用程序**
3. 打开 **系统设置** **通用** **登录项与扩展**, 在 **登录时打开** 中添加上一步导出的应用程序

### Windows
1. 创建 `open_urls.bat` 文件, 并输入以下内容
```batch
@echo off
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" https://juejin.cn/user/center/signin
```
2. 通过任务计划程序运行批处理文件：
  1. 打开 **任务计划程序**(按 `Win + R`, 输入 `taskschd.msc`，然后按回车)
  2. 创建新任务:
    1. 在右侧操作栏中, 点击 **创建基本任务**
    2. 设置触发器 (如 **当计算机启动时** )
    3. 设置操作
      1. 选择 **启动程序**
      2. 在 **程序或脚本** 框中，浏览并选择 `open_urls.bat` 文件。
      3. 完成设置并保存任务。

## CHANGELOGS
- `0.1.1`: `2025-01-23 08:39:07`
	- fix(JuejinLotteryModule): 在抽奖前加入延迟机制
- `0.1.0`: `2025-01-22 09:46:35`
  - feat: 增加掘金签到和抽奖模块