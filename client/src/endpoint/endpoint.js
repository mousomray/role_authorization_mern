export const endpoints = {

    auth: {
        register: "auth/signup",
        login: "auth/signin",
        otpverify: "auth/verifyotp",
        emailverify: "auth/emailverify",
        forgetpassword: "auth/forgetpassword",
        updatepassword: "auth/updatepassword",
        dashboard: "auth/dashboard"
    },

    cms: {
        addblog: "api/createblog",
        bloglist: "api/blogs",
        singleblog: "api/singleblog",
        updateblog: "api/updateblog",
        deleteblog: "api/deleteblog",
        recentblog: "api/recentblogs",
        search: "api/blogs/search",
        showcomment: "api/showcomment",
        addcomment: "api/addcomment"
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
    endpoints.auth.otpverify, //Index number 7
    endpoints.cms.recentblog, //Index number 8
    endpoints.cms.search, //Index number 9
    endpoints.cms.showcomment, // Index number 10
    endpoints.cms.addcomment, // Index number 11
    endpoints.auth.emailverify, // Index number 12
    endpoints.auth.forgetpassword, // Index number 13
    endpoints.auth.updatepassword, // Index number 14
    endpoints.auth.dashboard // Index number 15
]