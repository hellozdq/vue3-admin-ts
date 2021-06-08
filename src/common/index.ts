// 连接路径 局限于 /home 、home 格式的路径
export const connectPath = (path1:string, path2:string):string => {
    const reg = /^\/.*$/
    if(reg.test(path2)){
        return path2;
    }else{
        return path1 + (path2 ? ('/' + path2) : '');
    }
}

// 自定义localStorage 用于防止存储的类型和获取的类型不一致
export const cusLocalStorage = {
    get: (name:string) => {
        const item:string|null = localStorage.getItem(name);
        if(item){
            const result = JSON.parse(item);
            return result.value;
        }else{
            return null;
        }
    },
    set: (name:string, value:any) => {
        const obj = {
            type: (typeof value),
            value: value
        }
        localStorage.setItem(name,JSON.stringify(obj));
    }

}