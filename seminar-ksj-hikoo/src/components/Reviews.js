
import React, { useState } from 'react';
import '../css/Reviews.css';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';
import { rateToStar, timeForToday, rateToStarBig } from './function';
import editicon from '../asset/edit.svg';
import deleteicon from '../asset/delete.svg';
import logo from '../asset/waffle_logo.svg'
import { Rating } from 'react-simple-star-rating'

function Reviews({ ThisPageMenu }) {

    const [Load, setLoad] = useState(true);
    const [input, setInputs] = useState("");
    const [rating, setRating] = useState(0)
    const [reviews, setReviews] = useState();
    const changeInput = (e) => {
        const review = e.target.value
        setInputs(review)
    }

    useEffect(() => {
        axios
            .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, { params: { menu: ThisPageMenu.id } })
            .then((res) => {
                setReviews(res.data.data)
                setLoad(false)
                console.log("리뷰가져오기성공")
            })
            .catch((error) => {
                console.log("리뷰가져오기실패")
            })
    }, [])

    const PostReview = () => {
        const content = input
        const rating = 10
        const menu = ThisPageMenu.id
        if (JSON.parse(localStorage.getItem('login')) != null) {
            axios
                .post(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, {
                    content: content, rating: rating, menu: menu
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
                    }
                })
                .then(() => {
                    console.log("리뷰쓰기성공")
                    window.location.reload()
                })
                .catch((error) => {
                    console.log("리뷰쓰기실패")
                })
        } else {
            window.location.reload()
        }
    }

    const EditReview = () => {
        const content = input
        const rating = 10
        const menu = ThisPageMenu.id
        if (JSON.parse(localStorage.getItem('login')) != null) {
            axios
                .post(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, {
                    content: content, rating: rating, menu: menu
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('login')).access_token}`
                    }
                })
                .then((res) => {
                    console.log("리뷰쓰기성공")
                    window.location.reload()
                })
                .catch((error) => {
                    console.log("리뷰쓰기실패")
                })
        } else {
            window.location.reload()
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
                    console.log("리뷰삭제성공")
                    window.location.reload()
                })
                .catch((error) => {
                    console.log("리뷰삭제실패")
                })
        } else {
            window.location.reload()
        }
    }

    const ShowReviews = (list) => {
        return (
            list.map((e) => (
                <div key={e.id} author={e.author.id} className='reviewContent'>
                    <div className='reviewTop'>
                        <div className='reviewTopLeft'>
                            <span className='reviewAuthor'>{e.author.username}</span>
                            <span className='reviewRate'>{rateToStar(e.rating)}</span>
                            <span className='reviewTime'>{timeForToday(e.updated_at)}</span>
                        </div>
                        {JSON.parse(localStorage.getItem('login')) != null &&
                            e.author.id == JSON.parse(localStorage.getItem('login')).owner.id &&
                            <div className='reviewTopRight'>
                                <img className='reviewEdit' src={editicon} alt={logo} />
                                <img className='reviewDelete' src={deleteicon} alt={logo} onClick={() => DeleteReview(e.id)} />
                            </div>
                        }
                    </div>
                    <div className='reviewBottom'>{e.content}</div>
                </div>
            )))
    }
    const handleRating = (rate) => {
        setRating(rate)
    }
    return (Load ? <Loading /> :
        <div className={`reviewContainer${JSON.parse(localStorage.getItem('login')) == null ? "" : "Login"}`}>
            <div className='rateAverage'>
                <span>평균 별점</span>
                {rateToStar(9)}
                <span className='Average'>4.5</span>
            </div>
            {ShowReviews(reviews)}
            {JSON.parse(localStorage.getItem('login')) != null &&
                <div className='reviewPost'>
                    <div>
                        <Rating
                            onClick={handleRating}
                            size='25'
                            allowFraction={true}
                        /><span className='reviewinputrate'>{rating}</span></div>
                    <input id='reviewinput' type='text' placeholder='리뷰를 입력하세요' value={input} onChange={changeInput}></input>
                    <div className='reviewPostButton'>
                        <button className='reviewadd' onClick={() => PostReview()}>저장</button>
                    </div>
                </div>}
        </div>
    );
}

export default Reviews;
