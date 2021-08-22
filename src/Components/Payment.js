import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import bookingService from '../Service/Booking';
import { useHistory } from "react-router-dom";
import actionSeat from '../Redux/actions';

const Payment = () => {
    const { arrSeat, arrPrice } = useSelector(state => state.seat);
    const dispatch = useDispatch();
    const { orderedMovie } = useSelector(state => state.movie);
    const history = useHistory();

    let totalPrice = 0;

    if (arrPrice.length) {
        totalPrice = arrPrice.reduce((total, num) => {
            return total + num;
        });
    }

    const handleClick = (data, seat) => {
        bookingService.createBooking(data, seat).then(resp => {
            if (resp.success) {
                Swal.fire({
                    title: 'Đặt chỗ thành công!',
                    text: 'Chúc bạn xem phim vui vẻ.',
                    icon: 'success',
                    confirmButtonText: 'Cám ơn!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(actionSeat.resetSeat());
                        history.push("./")
                    }
                })
            }
        })
    };

    return (
        <div className="container payment">
            <div className="payment-infor mb-5">
                <h4 className="page-heading">THÔNG TIN ĐẶT VÉ:</h4>
                <div>Phim đã chọn: <span className="ticket-choice">{orderedMovie.movie.name}</span></div>
                <div>Ngày đã chọn: <span className="ticket-choice">{orderedMovie.orderedDate}</span></div>
                <div>Xuất chiếu: <span className="ticket-choice">{orderedMovie.orderedTime}</span></div>
                <div className="d-flex">
                    <div>Tổng số vé: <span className="ticket-choice">{arrSeat.length}</span></div>
                    <div className="ml-5">Số ghế đã chọn:
                        {!!arrSeat.length &&
                            <span className="ticket-choice">{" " + arrSeat.join(", ")}</span>
                        }
                    </div>
                    <div className="ml-5">Tổng số tiền: <span className="total-amount">{totalPrice + ".000 VNĐ"}</span></div>
                </div>
            </div>
            <div className="payment-method">
                <h4 className="page-heading">PHƯƠNG THỨC THANH TOÁN</h4>
                <h6> Bằng tiền mặt tại quầy vé.</h6>
                <div>
                    <h6>Thanh toán chuyển khoản qua ngân hàng.</h6>
                    <div className="bank-details">
                        <div>Số tài khoản: 058100355648</div>
                        <div>Công ty TNHH A. Cinema</div>
                        <div>Ngân hàng Thương Mại Cổ phần Ngoại Thương Việt Nam - Vietcombank</div>
                        <div>Chi nhánh Bình Thạnh</div>
                    </div>
                </div>
            </div>

            <Button variant="warning" className="mt-5" onClick={() => handleClick(orderedMovie, arrSeat)}>Thanh toán</Button>
        </div>
    );
};

export default Payment;