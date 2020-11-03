import axios from "axios";

const instance = axios.create({
    baseURL: "http://api.kele8.cn/agent/https://app.vmovier.com/",
    timeout: 40000,
});

const request = {
    getDetailByPostId: function (postId) {
        return instance.get("/apiv3/post/view", {
            params: {
                postid: postId,
            },
        });
    },
    getCateList: function () {
        return instance.get("/apiv3/cate/getList");
    },

    // https://app.vmovier.com/apiv3/post/getPostByTab?p=2&size=1&tab=hot
    // https://app.vmovier.com/apiv3/post/getPostByTab?p=2&size=1&id=1
    getCate: function (options) {
        if (!options) {
            return new Promise((resolve, reject) => reject());
        }

        const params = {p: options.p ? options.p : 1, size: options.size ? options.size : 10};

        if (options.tab) {
            params.tab = options.tab;
            return instance.get("/apiv3/post/getPostByTab", {params});
        } else {
            params.cateid = options.cateid;
            // console.log(params);
            return instance.get("/apiv3/post/getPostInCate", {params});
        }
        // https://app.vmovier.com/apiv3/post/getPostInCate?p=1&size=10&cateid=7

    },
    // https://app.vmovier.com/apiv3/series/getList
    getSeries: function () {
        return instance.get("/apiv3/series/getList")
    },
    // https://app.vmovier.com/apiv3/backstage/getCate
    getBackstage() {
        return instance.get("/apiv3/backstage/getCate")
    },
    // https://app.vmovier.com/apiv3/backstage/getPostByCate?p=1&&size=10&&cateid=47
    getBackstageDetail(options) {
        if (!options) {
            return new Promise((resolve, reject) => reject());
        }

        const params = {p: options.p ? options.p : 1, size: options.size ? options.size : 10};

        // if (options.tab) {
        //     params.tab = options.tab;
        //     return instance.get("/apiv3/backstage/getPostByCate", {params});
        // } else {
        params.cateid = options.cateid;
        return instance.get("/apiv3/backstage/getPostByCate", {params});
        // }
    },
    // http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=%E7%A7%91%E6%AF%94
    getHotSearch() {
        return instance.get('/apiv3/search')
    },
    // http://api.kele8.cn/agent/https://app.vmovier.com/apiv3/search?kw=NEW ERA
    getHotDetail(kw) {
        return instance.get(`/apiv3/search?kw=${kw}`)
    }
};

export default request;
