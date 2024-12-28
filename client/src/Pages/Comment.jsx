import React from 'react'
import { addcomment, showcomment } from './apicall'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const Comment = () => {

    const { id } = useParams();
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const image = localStorage.getItem("image");
    const [loading, setLoading] = useState(false);
    const [loadmore, setLoadmore] = useState(3); // For Loadmore

    const getData = async () => {
        const response = await showcomment(id);
        console.log("Comment response...", response);
        return response
    }
    const { data: commentdata, refetch } = useQuery({
        queryKey: ['commentdata', id],
        queryFn: getData
    })

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = async (data, e) => {
        e.preventDefault(); // For to stop default behavour 
        setLoading(true);
        const com = {
            name: data.name,
            email: data.email,
            image: data.image,
            message: data.message
        }

        try {
            const response = await addcomment(com, id)
            console.log("Comment Create Response...", response);
            if (response && response?.data?.success === true) {
                reset()
                refetch();
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            setLoading(false)
        }
    }

    // Handle Loadmore
    const handleLoadmore = () => {
        setLoadmore(prev => prev + 3);
    };

    return (
        <>
            <div class="blog-comments" data-aos="fade-up">

                <h4 class="comments-count">{commentdata?.length} Comments</h4>

                {commentdata?.slice(0, commentdata.length).reverse().slice(0, loadmore).map((value) => {
                    return (
                        <>
                            <div class="blog-author clearfix" data-aos="fade-up">
                                <img src={value?.image} class="rounded-circle float-left" alt="" />
                                <h4>{value?.name}</h4>
                                <div class="social-links">
                                    <a href="https://twitters.com/#"><i class="icofont-twitter"></i></a>
                                    <a href="https://facebook.com/#"><i class="icofont-facebook"></i></a>
                                    <a href="https://instagram.com/#"><i class="icofont-instagram"></i></a>
                                </div>
                                <p>
                                    {value?.message}
                                </p>
                            </div>
                        </>
                    )
                })}

                {loadmore < commentdata?.length && (
                    <div className="text-center">
                        <button onClick={handleLoadmore} className="btn btn-primary mt-3">Load More</button>
                    </div>
                )}

                <div class="reply-form">
                    <h4>Post Comment</h4>
                    <p>Your email address will not be published. Required fields are marked * </p>
                    <form action="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <input name="name" value={name} readOnly type="text" class="form-control" placeholder="Your Name*" {...register("name")} />
                            </div>
                            <div class="col-md-6 form-group">
                                <input name="email" value={email} readOnly type="email" class="form-control" placeholder="Your Email*" {...register("email")} />
                            </div>
                        </div>

                        <div class="row">
                            <div class="col form-group">
                                <input name="image" value={`${process.env.REACT_APP_BASE_URL}${image}`} readOnly class="form-control" placeholder="Your profile pic*" {...register("image")}></input>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col form-group">
                                <textarea name="message" class="form-control" placeholder="Your Comment*" {...register("message")}></textarea>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">{loading ? 'Posting...' : 'Post'}</button>

                    </form>
                </div>

            </div>
        </>
    )
}

export default Comment
