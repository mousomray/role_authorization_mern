export const endpoints = {

    auth: {
        register: "auth/signup",
        login: "auth/signin",
        verify: "auth/verifyotp",
    },

    cms: {
        addblog: "api/createblog",
        bloglist: "api/blogs",
        singleblog: "api/singleblog",
        updateblog: "api/updateblog",
        deleteblog: "api/deleteblog",
        recentblog: "api/recentblogs",
        search: "api/blogs/search"
    },

}

export const myendpoints = [
    endpoints.auth.register, //Index number 0
    endpoints.auth.login, //Index number 1
    endpoints.cms.addblog, //Index number 2
    endpoints.cms.bloglist, //Index number 3
    endpoints.cms.singleblog, //Index number 4
    endpoints.cms.updateblog, //Index number 5
    endpoints.cms.deleteblog, //Index number 6
    endpoints.auth.verify, //Index number 7
    endpoints.cms.recentblog, //Index number 8
    endpoints.cms.search, //Index number 9
]