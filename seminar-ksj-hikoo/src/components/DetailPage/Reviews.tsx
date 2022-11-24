import React, { useCallback, useState } from 'react';
import './Reviews.scss';
import { useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { rateToStar, timeForToday } from '../../lib/function';
import editicon from '../../asset/edit.svg';
import deleteicon from '../../asset/delete.svg';
import logo from '../../asset/waffle_logo.svg'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useInView } from "react-intersection-observer"
import { ILoginStatus, IMenu, IOwner, IReview } from '../../lib/Interface';
import Deletemodal from '../DeleteModal/Deletemodal';

type Props = {
    ThisPageMenu: IMenu
    LoginStatus: ILoginStatus
    LoginRefresh: IOwner | null
}


function Reviews({ ThisPageMenu, LoginStatus, LoginRefresh }: Props) {

    const param = useParams();
    const [DeletemodalOpen, setDeletemodalOpen] = useState(false);
    const [deleteId, setdeleteId] = useState<number>(NaN);
    const showDeletemodal = (id: number) => {
        setDeletemodalOpen(true);
        setdeleteId(id)
    };
    const [Load, setLoad] = useState<boolean>(true);
    const [input, setInputs] = useState<string>("");
    const [EditEnter, setEditEnter] = useState<{ input: string, rating: number | undefined }>({ input: "", rating: undefined });
    const [rating, setRating] = useState<number>()
    const [average, setAverage] = useState<number>(NaN)
    const [reviews, setReviews] = useState<IReview[]>({} as IReview[]);
    const [nextReview, setNextReview] = useState<IReview>();
    const [ref, inView] = useInView({
        threshold: 0.7,
        delay: 200,
    });
    const [selectReview, setSelectReview] = useState<IReview>({} as IReview);
    const navigate = useNavigate();
    const changeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const review = e.target.value
        setInputs(review)
    }
    const changeEditInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const review = e.target.value
        setEditEnter({ ...EditEnter, input: review })
    }

    const getReviews = useCallback(() => {
        axios
            .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, { params: { count: 10, menu: ThisPageMenu.id } })
            .then((res) => {
                setReviews(res.data.data)
                setNextReview(res.data.next)
                setLoad(false)
                axios
                    .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${param.id}`)
                    .then((res) => {
                        setAverage(res.data.rating)
                    })
                    .catch((error) => {
                        navigate(-1)
                    })
            })
            .catch((error) => {
                toast.warn('리뷰 목록을 가져오지 못했습니다');
            })
    }, [ThisPageMenu.id, navigate, param.id])

    useEffect(() => {
        setLoad(true)
        getReviews()
    }, [getReviews])

    useEffect(() => {
        if (inView && !Load) {
            axios
                .get(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, { params: { from: nextReview, count: 10, menu: ThisPageMenu.id } })
                .then((res) => {
                    setReviews(prev => [...prev, ...res.data.data])
                    setNextReview(res.data.next)
                })
                .catch((error) => {
                    toast.warn('리뷰 목록을 가져오지 못했습니다');
                })
        }
    }, [inView, Load, ThisPageMenu.id])


    const PostReview = () => {
        const content = input
        const menu = ThisPageMenu.id
        if (input === "" || !rating) {
            toast.warn('별점과 리뷰를 입력해주세요');
        } else {
            if (LoginRefresh) {
                axios
                    .post(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`, {
                        content: content, rating: (rating * 2).toFixed(), menu: menu
                    }, {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${LoginStatus.Token}`
                        }
                    })
                    .then(() => {
                        setInputs("")
                        setRating(undefined)
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
        if (LoginRefresh) {
            axios
                .patch(`https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/${selectReview.id}`, {
                    content: content, rating: (rate * 2).toFixed()
                }, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${LoginStatus.Token}`
                    },
                    params: { id: selectReview.id }
                })
                .then(() => {
                    setEditEnter({ input: "", rating: undefined })
                    setSelectReview({} as IReview)
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


    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const handleEditRating = (rate: number) => {
        setEditEnter({ ...EditEnter, rating: rate })
    }

    const ShowReviews = (list: IReview[]) => {
        return (
            list.map((e, idx) => (
                (Object.keys(selectReview).length === 0 || (selectReview.id !== e.id)) ?
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
                                {LoginRefresh != null &&
                                    e.author.id === LoginRefresh.id &&
                                    <div className='reviewTopRight'>
                                        <img className='reviewEdit' src={editicon} alt={logo} onClick={() => { setSelectReview(e); setEditEnter({ input: e.content, rating: e.rating / 2 }); }} />
                                        <img className='reviewDelete' src={deleteicon} alt={logo} onClick={() => showDeletemodal(e.id)} />
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
                                size={25}
                                allowFraction={true}
                            />
                            <span >{EditEnter.rating}</span>
                        </div>
                        <textarea id='reviewinput' placeholder='리뷰를 입력하세요' value={EditEnter.input} onChange={changeEditInput}></textarea>
                        <div className='reviewPostButton'>
                            <button className='reviewadd' onClick={() => EditReview()}>저장</button>
                            <button className='reviewEditCancle' onClick={() => setSelectReview({} as IReview)}>취소</button>
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
                        {rateToStar(average)}
                        <span className='Average'>{(average / 2).toFixed(1)}</span>
                    </div>
                    <div className='reviewBox'>
                        <div className='reviewList'>
                            {reviews.length === 0 ?
                                <div>
                                    <p>등록된 리뷰가 없습니다. 첫 리뷰를 등록해주세요!</p>
                                </div> :
                                ShowReviews(reviews)}
                        </div>
                        {LoginRefresh != null && Object.keys(selectReview).length === 0 &&
                            <div className='reviewPost'>
                                <div>
                                    <Rating
                                        onClick={handleRating}
                                        size={25}
                                        allowFraction={true}
                                    /><span className='reviewinputrate'>{rating}</span>
                                </div>
                                <textarea id='reviewinput' placeholder='리뷰를 입력하세요' value={input} onChange={changeInput}></textarea>
                                <div className='reviewPostButton'>
                                    <button className='reviewadd' onClick={() => PostReview()}>저장</button>
                                </div>
                            </div>}
                    </div>
                </div>
                {DeletemodalOpen && <Deletemodal setDeletemodalOpen={setDeletemodalOpen} LoginStatus={LoginStatus} MenuOrReview={"Review"} ReviewId={deleteId} getReviews={getReviews} />}
            </div>
    );
}

export default Reviews;
