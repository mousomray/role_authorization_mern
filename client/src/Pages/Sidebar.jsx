import React from 'react'
import { recentblog } from './apicall'
import { useQuery } from '@tanstack/react-query';
import Search from './Search';

const Sidebar = () => {

    const recentData = async () => {
        const response = await recentblog();
        console.log("Recent response...", response);
        return response;
    }

    const { isLoading, isError, data: mydata } = useQuery({
        queryKey: ["recentdata"],
        queryFn: recentData
    })

    console.log("Amar data..", mydata)

    return (
        <>
            <div class="sidebar" data-aos="fade-left">

                <Search />

                {/* <!-- End sidebar categories--> */}
                <h3 class="sidebar-title">Recent Posts</h3>
                <div class="sidebar-item recent-posts">

                    {mydata?.slice(0, mydata.length).reverse().slice(0, 5).map((value) => {
                        return (
                            <>
                                <div class="post-item clearfix">
                                    <img src={`${process.env.REACT_APP_BASE_URL}${value?.image}`} alt="" />
                                    <h4><a href="blog-single.html">{value?.title}</a></h4>
                                    <time datetime="2020-01-01">{value?.createdAt ? new Date(value?.createdAt).toLocaleDateString() : 'N/A'}</time>
                                </div>
                            </>
                        )
                    })}

                </div>
                {/* <!-- End sidebar recent posts--> */}
            </div>
        </>
    )
}

export default Sidebar
