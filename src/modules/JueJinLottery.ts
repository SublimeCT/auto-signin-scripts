import { ApplicationModule } from "../Application";
import { Pages } from "../Pages";
import { checkRoute } from "../utils/route";
import { waitForElement } from "../utils/wait";

export class JueJinLotteryModule implements ApplicationModule {
  page = Pages.juejin;
  initialized = false
  async onLoad() {
    console.log('lottery')
    if (!checkRoute('/user/center/lottery', this.page)) return this.unMounted()
    if (this.initialized) return
    // this.initialized = true
    this._clickLotteryButton()
  }
  routeChange(): void {
    this.onLoad()
  }
  unMounted() {
    // this.initialized = false
  }
  private async _clickLotteryButton() {
    console.warn('click lottery button')
    // 1. 获取抽奖按钮
    const signinButton = await waitForElement<HTMLButtonElement>('#turntable-item-0')
    if (!signinButton || !signinButton.textContent) throw new Error('抽奖按钮未找到')
      console.log(signinButton)
    if (signinButton.textContent.trim().indexOf('免费抽奖次数') === -1) return console.log('今日已抽奖')
    // 2. 点击抽奖按钮
    signinButton.click()
    // 3. 等待抽奖结果弹窗中的 收下奖励按钮 出现
    const lotteryModalSubmitButton = await waitForElement<HTMLButtonElement>('.lottery-modal button.submit')
    if (!lotteryModalSubmitButton) throw new Error('抽奖结果弹窗未找到')
    lotteryModalSubmitButton.click()
  }
}