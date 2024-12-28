import React from 'react'
import Wrapper from '../Common/Wrapper'
import Sidebar from './Sidebar'
import Comment from './Comment'
import { singleblog } from './apicall'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const Blogdetails = () => {

  const { id } = useParams();

  const getData = async () => {
    const response = await singleblog(id)
    return response
  }

  const { isLoading, isError, data: singledata } = useQuery({
    queryKey: ["singledata", id],
    queryFn: getData
  })

  if (isLoading) {
    return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>Loading...</h1>
  }

  console.log("Single...", singledata)

  return (
    <>
      <Wrapper>
        {/* <!-- ======= Blog Section ======= --> */}
        <section id="blog" class="blog" style={{ marginTop: '50px' }}>
          <div class="container">

            <div class="row">

              <div class="col-lg-8 entries">

                <article class="entry entry-single" data-aos="fade-up">

                  <div class="entry-img">
                    <img src={`${process.env.REACT_APP_BASE_URL}${singledata?.image}`} alt="" class="img-fluid" />
                  </div>

                  <h2 class="entry-title">
                    <a href="blog-single.html">{singledata?.title}</a>
                  </h2>

                  <div class="entry-meta">
                    <ul>
                      <li class="d-flex align-items-center"><i class="icofont-user"></i> <a href="blog-single.html">{singledata?.author}</a></li>
                      <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">{singledata?.createdAt ? new Date(singledata?.createdAt).toLocaleDateString() : 'N/A'}</time></a></li>
                      <li class="d-flex align-items-center"><i class="icofont-comment"></i> <a href="blog-single.html">{singledata?.comments.length}</a></li>
                    </ul>
                  </div>

                  <div class="entry-content">
                    <p>
                      Similique neque nam consequuntur ad non maxime aliquam quas. Quibusdam animi praesentium. Aliquam et laboriosam eius aut nostrum quidem aliquid dicta.
                      Et eveniet enim. Qui velit est ea dolorem doloremque deleniti aperiam unde soluta. Est cum et quod quos aut ut et sit sunt. Voluptate porro consequatur assumenda perferendis dolore.
                    </p>
                  </div>

                  <div class="entry-footer clearfix">
                    <div class="float-left">
                      <i class="icofont-folder"></i>
                      <ul class="cats">
                        <li><a href="#">Business</a></li>
                      </ul>

                      <i class="icofont-tags"></i>
                      <ul class="tags">
                        <li><a href="#">Creative</a></li>
                        <li><a href="#">Tips</a></li>
                        <li><a href="#">Marketing</a></li>
                      </ul>
                    </div>

                    <div class="float-right share">
                      <a href="" title="Share on Twitter"><i class="icofont-twitter"></i></a>
                      <a href="" title="Share on Facebook"><i class="icofont-facebook"></i></a>
                      <a href="" title="Share on Instagram"><i class="icofont-instagram"></i></a>
                    </div>

                  </div>

                </article>
                {/* <!-- End blog entry --> */}

                <Comment />

                {/* <!-- End blog comments --> */}

              </div>
              {/* <!-- End blog entries list --> */}

              <div class="col-lg-4">

                <Sidebar />

              </div>
              {/* <!-- End blog sidebar --> */}

            </div>

          </div>
        </section>
        {/* <!-- End Blog Section --> */}
      </Wrapper>
    </>
  )
}

export default Blogdetails 
