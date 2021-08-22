import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from "react-router-dom";


const Movie = (props) => {
  const {movies, title} = props;

    return (
      <section className="container current-movie mt-4 mb-4">

                <h4 className="mb-3 page-heading">{title}</h4>

                <Container>
                    <Row>
                        {movies.length && movies.map((movie) => (
                            <Col className="col-12 col-lg-6 mb-3" key={movie.id}>
                                <Row>
                                    <Link className="current-movie-img col" style={{ backgroundImage: "url(" + movie.poster_url + ")" }}
                                        to ={`/filmdetail/${movie.id}`}></Link>
                                    <Col className="current-movie-detail">
                                        <Link to ={`/filmdetail/${movie.id}`}>{movie.name}</Link><br />
                                        <span className="fa fa-clock-o"> {movie.duration} min</span>
                                        <p>{movie.types}</p>
                                        <div className="movie-rate d-flex align-items-baseline justify-content-between">
                                            <div className="start-rating d-flex flex-row-reverse justify-content-end">
                                                <span className={"fa fa-star-o "+ (parseInt(movie.ranking) === 5 ? 'active' : '')}></span>
                                                <span className={"fa fa-star-o "+ (parseInt(movie.ranking) === 4 ? 'active' : '')}></span>
                                                <span className={"fa fa-star-o "+ (parseInt(movie.ranking) === 3 ? 'active' : '')}></span>
                                                <span className={"fa fa-star-o "+ (parseInt(movie.ranking) === 2 ? 'active' : '')}></span>
                                                <span className={"fa fa-star-o "+ (parseInt(movie.ranking) === 1 ? 'active' : '')}></span>
                                            </div>
                                            <span className="circle-rating d-flex align-items-center justify-content-center">{movie.ranking}</span>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))}

                    </Row>

                </Container>
            </section>
    );
  };

export default Movie;