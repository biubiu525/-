//文章相关的
import request from "@/utils/request.js";
//封装请求函数，方便复用
export const getAListAPI = function(_page, _limit) {
    //返回promise实例对象
    return request.get("/articles", {
        params: {
            _page: _page,
            _limit: _limit,
        },
    });
};