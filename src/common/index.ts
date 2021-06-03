// 连接路径 局限于 /home 、home 格式的路径
export const connectPath = (path1:string, path2:string):string => {
    const reg = /^\/.*$/
    if(reg.test(path2)){
        return path2;
    }else{
        return path1 + (path2 ? ('/' + path2) : '');
    }
}