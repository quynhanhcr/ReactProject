import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Container, Row, Col } from 'react-bootstrap';
import Payment from './Payment';
import { useDispatch, useSelector } from 'react-redux';
import actionSeat from '../Redux/actions';
import { useHistory } from "react-router-dom";

const Buyticket = () => {

    const seatTypes = {
        cheap: ["A", "B", "C", "D"],
        middle: ["E", "F", "G", "H"],
        expensive: ["I", "J", "K", "L"]
    };
    const seatPrices = {
        cheap: 75,
        middle: 100,
        expensive: 150
    };


    let seatNumberList = [];
    for (let i = 1; i <= 18; i++) {
        seatNumberList.push(i);
    }
    //hide or show the payment
    const [step, setStep] = useState(1);

    const { arrSeat, arrPrice } = useSelector(state => state.seat);
    const { unavailableSeat } = useSelector(state => state.booking);
    const dispatch = useDispatch();
    const history = useHistory();


    let totalPrice = 0;

    if (arrPrice.length) {
        totalPrice = arrPrice.reduce((total, num) => {
            return total + num;
        });
    }

    const handleClick = (seatName, seatNumber, type) => {
        if (!arrSeat.some((seat) => (seatName + seatNumber) === seat)) {
            dispatch(actionSeat.addSeat({
                selectedSeat: seatName + seatNumber,
                seatType: type,
                seatPrice: seatPrices[type]
            }))
        } else {
            dispatch(actionSeat.deleteSeat({
                deletedSeat: seatName + seatNumber,
                seatPrice: seatPrices[type]
            }))
        }
    };

    const selectedSeat = (selectedSeat) => {
        return arrSeat.some((seat) => (selectedSeat) === seat
        )
    };

    const unreadySeat = (selectedSeat) => {
        return unavailableSeat.some((seat) => (selectedSeat) === seat)
    }

    return (
        <div className="container container-responsive">
            <div className="ticket-order">
                <div className="order-img"></div>
                <h3 className="mt-3 mb-0">ĐẶT VÉ</h3>
                <div>Chúc bạn xem phim vui vẻ.</div>
            </div>
            {
                step === 1 && (
                    <div className="seat-price-details">
                        <Container className="my-3">
                            <Row>
                                <Col className="border-right border-dark">
                                    <ListGroup horizontal className="seat-type">
                                        <ListGroup.Item><strong>Giá vé: </strong></ListGroup.Item>
                                        <ListGroup.Item className="seat-price seat-price__cheap">70.000 VNĐ</ListGroup.Item>
                                        <ListGroup.Item className="seat-price seat-price__middle">100.000 VNĐ</ListGroup.Item>
                                        <ListGroup.Item className="seat-price seat-price__expensive">150.000 VNĐ</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col>
                                    <ListGroup horizontal className="seat-avaibility">
                                        <ListGroup.Item className="seat-status seat-status__available">Còn trống</ListGroup.Item>
                                        <ListGroup.Item className="seat-status seat-status__unavailable">Đã có người đặt</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Container>
                        <div className="seat-choice">
                            <div className="screen">
                                <span>Screen</span>
                            </div>
                            <div className="seats d-flex justify-content-between">
                                <div className="seat-line">
                                    {Object.keys(seatTypes).map((type, i) => (
                                        seatTypes[type].map((seatName, j) => (
                                            <span className="seat-indication" key={i+j}>{seatName}</span>
                                        ))
                                    ))}

                                </div>
                                <div className="seat-row">

                                    {Object.keys(seatTypes).map((type, i) => (
                                        seatTypes[type].map((seatName, j) => (
                                            <div key={i+j}>
                                                {seatNumberList.map((seatNumber, k) => (
                                                    unreadySeat(seatName+ seatNumber) ?
                                                    <span className='seat-position unready' key={i+j+k}>{seatName+seatNumber}</span> :

                                                    <span key={i+j+k} className={"seat-position seat-price-" + type + (selectedSeat(seatName + seatNumber) ? " active" : " ")}
                                                        onClick={() => handleClick(seatName, seatNumber, type)}>
                                                        {selectedSeat(seatName + seatNumber) ?
                                                            <i className="fa fa-check"></i>
                                                            :
                                                            seatName + seatNumber}
                                                    </span>
                                                   
                                                ))}
                                            </div>
                                        ))
                                    ))}
                                </div>
                                <div className="yourchoice">
                                    {!!arrSeat.length && arrSeat.map((seat, i) => (
                                        <div className="seat-checked" key={i}>{seat}</div>
                                    ))}
                                    {totalPrice !== 0 && <div className="seat-amount">{totalPrice}</div>}
                                </div>
                            </div>
                            <div className="seat-number">
                                {seatNumberList.map((seatNumber, i) => (
                                    <span className="seat-number-indication" key={i}>{seatNumber}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            {
                step === 2 && <Payment />
            }
            <div className="booking-pagination mb-5">
                {
                    (step === 2) && (
                        <a href="#" className="booking-pagination-prev" onClick={() => setStep(1)}>
                            <span className="arrow-text">Quay lại</span>
                            <span className="arrow-text1">Previous step</span>
                        </a>
                    )
                }
                {
                    step === 1 && (
                        <a className="booking-pagination-next" onClick={() => setStep(2)}>
                            <span className="arrow-text">Tiếp tục</span>
                            <span className="arrow-text1">Next step</span>
                        </a>
                    )
                }
            </div>

        </div>
    );
};

export default Buyticket;