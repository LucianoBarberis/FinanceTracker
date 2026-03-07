import{
    LuWallet,
    LuChartCandlestick,
    LuCar,
    LuGamepad2,
    LuShoppingCart,
    LuHospital,
    LuBrain,
    LuGift,
    LuHouse,
    LuPlane,
    LuAntenna,
    LuGlassWater,
    LuWifi,
    LuBicepsFlexed
} from "react-icons/lu"
import { LiaHamburgerSolid } from "react-icons/lia";
import { TbMoneybag } from "react-icons/tb";

const ICON_MAP = {
    "wallet": LuWallet,
    "chart-line": LuChartCandlestick,
    "hamburger": LiaHamburgerSolid,
    "car": LuCar,
    "gamepad": LuGamepad2,
    "shopping-cart": LuShoppingCart,
    "hospital": LuHospital,
    "education": LuBrain,
    "gift": LuGift,
    "home": LuHouse,
    "airplane":LuPlane,
    "electricity": LuAntenna,
    "water": LuGlassWater,
    "internet": LuWifi,
    "gym": LuBicepsFlexed
}
export const IconRender = ({iconName, ...props}) => {
    const IconComponet = ICON_MAP[iconName] || TbMoneybag
    return <IconComponet {...props}/>
}