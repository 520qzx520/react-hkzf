
import { getToken } from "../../utils/power";
import { Navigate } from "react-router";
import { useLocation } from "react-router";
export default function RouterGard({children}){
    // 获取当前路由信息
    const location = useLocation ()
    // console.log(location)
    const token = getToken()
    if(!token&&location.pathname!=='/login'&& location.pathname!=='/register'){
        return <Navigate to='/login' replace></Navigate>
    }else{
        return <>{children}</>
    }
}
