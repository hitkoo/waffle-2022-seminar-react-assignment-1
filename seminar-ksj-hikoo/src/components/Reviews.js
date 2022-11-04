import React, { useState } from 'react';
import '../css/Reviews.css';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { rateToStar, timeForToday} from './function';
import editicon from '../asset/edit.svg';
import deleteicon from '../asset/delete.svg';
import logo from '../asset/waffle_logo.svg'
import { Rating } from 'react-simple-star-rating'
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useInView } from "react-intersection-observer"

function Reviews({ ThisPageMenu }) {

    const [Load, setLoad] = useState(true);
    const [input, setInputs] = useState("");
    const [EditEnter, setEditEnter] = useState({ input: "", rating: null });
    const [rating, setRating] = useState(null)
    const [reviews, setReviews] = useState([]);
    const [nextReview, setNextReview] = useState(null);
    const [ref, inView] = useInView({
        threshold: 0.7,
        delay: 200,
    });
    const [selectReview, setSelectReview] = useState("");
    const navigate = useNavigate();
    const changeInput = (e) => {
        const review = e.target.value
        setInputs(review)
    }
    const changeEditInput = (e) => {
        const review = e.target.value
        setEditEnter({ ...EditEnter, input: review })
    }

    const getReviews = () => {
        setLoad(true)
        axios
            .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, { params: { count: 10, menu: ThisPageMenu.id } })
            .then((res) => {
                setReviews(res.data.data)
                setLoad(false)
                setNextReview(res.data.next)
            })
            .catch((error) => {
                toast.warn('리뷰 목록을 가져오지 못했습니다');
            })
    }

    const getMoreReviews = () => {
        axios
            .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, { params: { from: nextReview, count: 10, menu: ThisPageMenu.id } })
            .then((res) => {
                setReviews([...reviews, ...res.data.data])
                setNextReview(res.data.next)
            })
            .catch((error) => {
                toast.warn('리뷰 목록을 가져오지 못했습니다');
            })
    }

    useEffect(() => {
        getReviews()
    }, [])

    useEffect(() => {
        if (inView && !Load) {
            getMoreReviews()
        }
    }, [inView, Load])

    const PostReview = () => {
        const content = input
        const menu = ThisPageMenu.id
        if (input === "" || rating == null) {
            toast.warn('별점과 리뷰를 입력해주세요');
        } else {
            if (JSON.parse(localStorage.getItem('login')) != null) {
                axios
                    .post(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, {
                        content: content, rating: (rating * 2).toFixed(), menu: menu
                    }, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
                        }
                    })
                    .then(() => {
                        setInputs("")
                        setRating(null)
                        getReviews()
                    })
                    .catch((error) => {
                        toast.error('리뷰 생성 실패');
                    })
            } else {
                toast.warn('로그인 후 이용해주세요');
                navigate('/login')
            }
        }
    }

    const EditReview = () => {
        const content = EditEnter.input
        const rate = Number(EditEnter.rating)
        if (JSON.parse(localStorage.getItem('login')) != null) {
            axios
                .patch(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/${selectReview.id}`, {
                    content: content, rating: (rate * 2).toFixed()
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
                    },
                    params: { id: selectReview.id }
                })
                .then(() => {
                    setEditEnter({ input: "", rating: null })
                    setSelectReview("")
                    getReviews()
                })
                .catch((error) => {
                    toast.error('리뷰 수정 실패');
                })
        } else {
            toast.warn('로그인 후 이용해주세요');
            navigate('/login')
        }
    }

    const DeleteReview = (id) => {
        if (JSON.parse(localStorage.getItem('login')) != null) {
            axios
                .delete(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/${id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
                    },
                    params: { id: id }
                })
                .then((res) => {
                    getReviews()
                })
                .catch((error) => {
                    toast.error('리뷰 삭제 실패');
                })
        } else {
            toast.warn('로그인 후 이용해주세요');
            navigate('/login')
        }
    }

    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleEditRating = (rate) => {
        setEditEnter({ ...EditEnter, rating: rate })
    }
    const ShowReviews = (list) => {
        return (
            list.map((e, idx) => (
                ((selectReview === "") || (selectReview.id !== e.id)) ?
                    <div key={e.id}>
                        <div className='reviewContent'>
                            <div className='reviewTop'>
                                <div className='reviewTopLeft'>
                                    <span className='reviewAuthor'>{e.author.username}</span>
                                    <span className='reviewRate'>{rateToStar(e.rating)}</span>
                                    <span className='reviewTime'>{timeForToday(e.created_at)}
                                        <span className='isEdit'>{(e.created_at === e.updated_at) ? "" : " 수정됨"}</span>
                                    </span>
                                </div>
                                {JSON.parse(localStorage.getItem('login')) != null &&
                                    e.author.id === JSON.parse(localStorage.getItem('login')).owner.id &&
                                    <div className='reviewTopRight'>
                                        <img className='reviewEdit' src={editicon} alt={logo} onClick={() => { setSelectReview(e); setEditEnter({ input: e.content, rating: e.rating / 2 }); }} />
                                        <img className='reviewDelete' src={deleteicon} alt={logo} onClick={() => DeleteReview(e.id)} />
                                    </div>
                                }
                            </div>
                            <div className='reviewBottom'>{e.content}</div>
                        </div>
                        {list.length - 1 === idx && list.length >= 10 &&
                            <div className='scrollTarget' ref={ref}></div>}
                    </div> :
                    <div key={e.id} className='reviewEditBox'>
                        <div>
                            <Rating
                                initialValue={EditEnter.rating}
                                onClick={handleEditRating}
                                size='25'
                                allowFraction={true}
                            /><span className='reviewinputrate'>{EditEnter.rating}</span></div>
                        <textarea id='reviewinput' type='text' placeholder='리뷰를 입력하세요' value={EditEnter.input} onChange={changeEditInput}></textarea>
                        <div className='reviewPostButton'>
                            <button className='reviewadd' onClick={() => EditReview()}>저장</button>
                            <button className='reviewEditCancle' onClick={() => setSelectReview("")}>취소</button>
                        </div>
                    </div>

            )))
    }
    return (
        Load ? <Loading /> :
            <div>
                <div className='reviewContainer'>
                    <div className='rateAverage'>
                        <span>평균 별점</span>
                        {rateToStar(9)}
                        <span className='Average'>4.5</span>
                    </div>
                    <div className='reviewBox'>
                        <div className='reviewList'>
                            {reviews.length === 0 ?
                                <div>
                                    <p>등록된 리뷰가 없습니다. 첫 리뷰를 등록해주세요!</p>
                                </div> :
                                ShowReviews(reviews)}
                        </div>
                        {JSON.parse(localStorage.getItem('login')) != null && selectReview === "" &&
                            <div className='reviewPost'>
                                <div>
                                    <Rating
                                        onClick={handleRating}
                                        size='25'
                                        allowFraction={true}
                                    /><span className='reviewinputrate'>{rating}</span>
                                </div>
                                <textarea id='reviewinput' type='text' placeholder='리뷰를 입력하세요' value={input} onChange={changeInput}></textarea>
                                <div className='reviewPostButton'>
                                    <button className='reviewadd' onClick={() => PostReview()}>저장</button>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
    );
}

export default Reviews;
