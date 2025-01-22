import { Application } from "./Application";
import { JueJinLotteryModule } from "./modules/JueJinLottery";
import { JueJinSigninModule } from "./modules/JueJinSignin";

Application
  .use(new JueJinSigninModule())
  .use(new JueJinLotteryModule())

const application = new Application()

application.emit('onInit')
application.onLoad()
application.listenVueRouteChange()
application.listenAngularRouteChange()
