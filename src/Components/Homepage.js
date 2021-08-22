import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slider1 from "../image/Homepage-slider.jpeg";
import slider2 from "../image/Homepage-slider1.jpeg";
import slider3 from "../image/Homepage-slider2.jpeg";
import slider4 from '../image/hotcombo.jpeg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import actionMovie from '../Redux/actions';
import {Link} from "react-router-dom";
import movieService from '../Service/Movies';
import Movie from './Movie';



const Homepage = () => {
    const { arrHotMovie, arrReadyMovie, arrComingSoonMovie } = useSelector(state => state.movie);
    const [ arrFoundMovie, setFoundMovie ] = useState([]);
    const [ searchText, setSearchText ] = useState('');
    const [ showSearchSection, setShowSearchSection ] = useState(false);
    const [ showSearchLoading, setShowSearchLoading ] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(actionMovie.getMovie({ type: "hot" }));
        dispatch(actionMovie.getMovie({ type: "coming_soon" }));
        dispatch(actionMovie.getMovie({ type: "ready" }));
    }, []);

    const handleFind = async () => {

        if(searchText){
            setShowSearchLoading(true);
            const movies = await movieService.getFoundMovie(searchText);

            setShowSearchLoading(false);
            
            setShowSearchSection(true);
            setFoundMovie(movies);
            
        } else {
            setShowSearchSection(false);
            setFoundMovie([]);
        }
        
    };

    return (
        <div>
            <section className="banner-slider">
                <Carousel>
                <Carousel.Item>
                        <div className="carousel__slider"
                            style={{ backgroundImage: "url(" + slider4 + ")" }}>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel__slider"
                            style={{ backgroundImage: "url(" + slider1 + ")" }}>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel__slider"
                            style={{ backgroundImage: "url(" + slider2 + ")" }}>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel__slider"
                            style={{ backgroundImage: "url(" + slider3 + ")" }}>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </section>
            <section className="bestchoice">
                <div className="container">
                    <div className="movie-rate">
                        <span>PHIM HOT NHẤT</span>
                    </div>
                    <div className="row">
                        {
                            arrHotMovie.length && arrHotMovie.map((movie) =>

                                <Link key={movie.id} className="col-sm" style={{ backgroundImage: "url(" + movie.poster_url + ")" }} to ={`/filmdetail/${movie.id}`}></Link>
                            )
                        }

                    </div>
                    <div className="movie-rate">
                        <span>PHIM HOT NHẤT</span>
                    </div>
                </div>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col className="mt-5 d-flex justify-content-between flex-md-wrap">
                            <div className="mega-select-marker mb-5">
                                <div className="marker-indecator">
                                    <p className="select-marker"><span>find your </span> <br/>cinema</p>
                                </div>
                            </div>

                            <div className="mega-select d-flex mb-5">
                                <input name="search-input" type='text' 
                                    placeholder="Nhập tên phim cần tìm."
                                    className="select__field" onInput={(e) => setSearchText(e.target.value)}/>
                                <div class="select__btn">
                                    <button class="btn btn-danger" onClick={handleFind}>Tìm kiếm</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            { showSearchLoading && 
            <div class="d-flex justify-content-center">
                <div class="spinner-border text-danger"></div>
            </div>}

           { (showSearchSection) ?   
                    
            <section className="container current-movie mt-4 mb-4">

                { arrFoundMovie.length > 0 ?
                
                <Movie movies={arrFoundMovie} title="Kết quả tìm kiếm"/>
                
                : 
                
                <>
                    <h4 className="mb-3 page-heading">Kết quả tìm kiếm</h4>
                    <div className="text-center">Không có phim nào phù hợp</div>
                </>
                }
            </section>

            :

            <>
                <Movie movies={arrReadyMovie} title="PHIM ĐANG CHIẾU"/>
                <Movie movies={arrComingSoonMovie} title="PHIM SẮP CHIẾU"/>
            </>
            }
        </div>
    );
};

export default Homepage;