// 引入uuid 
import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机的字符串，且每次执行不能发生变化，游客身份要持久存储
export const getUUID = () => {
    // 先从本地存储获取uuid，看看本地存储是否已经有数据
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 如果没有，就生成(id只会生成一次)
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token = uuidv4();
        // 写入本地存储
        localStorage.setItem("UUIDTOKEN",uuid_token);
    }
    // 一定一定要有返回值！！！！
    return uuid_token;
};