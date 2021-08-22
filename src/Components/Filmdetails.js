import React, { useEffect, useState } from 'react';
import { Col, Container, Row, ListGroup, Button } from 'react-bootstrap';
// import Datepicker from './Datepicker';
import Collapse from 'react-bootstrap/Collapse';
import { Link, useParams } from "react-router-dom";
import movies from '../Service/Movies';
import fb from '../Service/Fb';
import { useDispatch, useSelector } from 'react-redux';
import actionMovie from '../Redux/actions';



const Filmdetails = () => {

    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState({});
    const [date, setDate] = useState();
    const dispatch = useDispatch();
    const {access_token} = useSelector(state => state.user);

    const handleClick = (date) => {
        setDate(date);
        setShow(true);
    };

    const handleSubmit = (movieDetail, date, time, access_token)=>{
        dispatch(actionMovie.getOrderedMovie({
            movie: movieDetail,
            orderedDate: date,
            orderedTime: time,
            access_token: access_token
        }));

        if(!access_token){
            dispatch(actionMovie.backUrl({
                url: '/filmdetail/'+id
            }));
        }
    }

    useEffect(() => {
        fb.initFb();
        movies.getMovieDetail(id).then((detail) => {
            setMovieDetail(detail);
        });
    }, [id]);
  
    return (
        <div className="container film-detail">
            <div className="film-detail-header d-flex justify-content-between">
                <h4 className="page-heading">{movieDetail.name}</h4>
                <button className="book-ticket" type="submit" onClick={() => setOpen(!open)}>ĐẶT VÉ</button>
            </div>
            <Collapse in={open}>
                <div className="film-detail__body" id="example-collapse-text">
                    <Container className="mt-4 mb-4">
                        <Row>
                            <Col sm={4} className="film-detail-img" style={{ backgroundImage: "url(" + movieDetail.poster_url + ")" }}></Col>
                            <Col sm={8}>

                                <span className="fa fa-clock-o">  {movieDetail.duration} min</span>

                                <div className="film-detail-overview">
                                    <p><strong>Country:</strong> New Zeland, USA</p>
                                    <p><strong>Year:</strong> 2012</p>
                                    <p><strong>Category::</strong> Adventure, Fantazy</p>
                                    <p><strong>Director:</strong> Peter Jackson</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <div className="film-plot">
                        <h5 className="page-heading">NỘI DUNG PHIM: </h5>
                        <p>{movieDetail.description}</p>
                    </div>
                </div>
            </Collapse>
            <div className="film-time my-4">
                <h5 className="page-heading mb-3">XUẤT CHIẾU:</h5>
                <div className="mb-3">Bấm chọn ngày để biết xuất chiếu.</div>
                <div className="mb-2">
                    <span className="fa fa-calendar mr-3">  Date: </span>
                    {Object.keys(movieDetail).length && Object.keys(movieDetail.watch_times).map((date, i) => (
                        <Button key={i} variant="outline-warning" size="sm" className="mr-3" onClick={() => handleClick(date)}>{date}</Button>
                    ))}

                    {/* <Datepicker className="chosen-date" /> */}
                </div>
                <ListGroup horizontal className="time-select">
                    {show && movieDetail.watch_times[date].map((time, i) => (

                        <Link key={i} to={ access_token ? "/purchase" : "/log-in"} >
                            <ListGroup.Item className="time-select__item" onClick = {()=> handleSubmit(movieDetail, date, time, access_token)}>{time}</ListGroup.Item>
                        </Link>

                    ))}
                </ListGroup>
            </div>
            <div className="comment">
                <h5 className="page-heading mb-5">BÌNH LUẬN: </h5>
                <div className="fb-comments" data-href={"https://quynhanh.tudomuaban.com/filmdetail/"+id} data-width="" data-numposts="5"></div>
            </div>  
        </div>
    );
};

export default Filmdetails;