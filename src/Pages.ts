export enum Pages {
  /** 掘金 */
  juejin,
}

export interface PagesInfo {
  name: string
  pattern: RegExp
}

export const PagesInfoMap: Record<Pages, PagesInfo> = {
  [Pages.juejin]: {
    name: '掘金签到页',
    pattern: /^https:\/\/juejin\.cn/, // 由于掘金是 SPA, 所以只需要匹配域名即可, 如果需要匹配具体的页面, 会导致从其他页面进入签到页时, 无法触发签到逻辑
    // pattern: /^https:\/\/juejin\.cn\/user\/center\/(signin|lottery)/,
  },
}