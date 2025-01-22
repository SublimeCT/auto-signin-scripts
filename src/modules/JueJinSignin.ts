import { ApplicationModule } from "../Application";
import { Pages } from "../Pages";
import { checkRoute } from "../utils/route";
import { delay, waitForElement } from "../utils/wait";

export class JueJinSigninModule implements ApplicationModule {
  page = Pages.juejin;
  initialized = false
  async onLoad() {
    if (!checkRoute('/user/center/signin', this.page)) return this.unMounted()
    if (this.initialized) return
    // this.initialized = true
    this._checkSignin()
  }
  routeChange(): void {
    this.onLoad()
  }
  unMounted() {
    // this.initialized = false
  }
  private async _checkSignin() {
    console.log(Date.now())
    await delay(1000)
    console.log(Date.now())
    // 1. 获取签到按钮
    const signinButton = await waitForElement<HTMLButtonElement>('button.signin.btn')
    if (!signinButton || !signinButton.textContent || signinButton.textContent.trim() !== '立即签到') throw new Error('签到按钮未找到或已经签到')
    // 2. 点击签到按钮
    signinButton.click()
    console.log('signin success')
    this._toLotteryPage()
  }
  private async _toLotteryPage() {
    const lotteryMenuItemButton = await waitForElement<HTMLAnchorElement>('.menu .byte-menu-item[href^="/user/center/lottery"]')
    if (!lotteryMenuItemButton) throw new Error('Missing lottery menu item')
    lotteryMenuItemButton.click()
  }
}