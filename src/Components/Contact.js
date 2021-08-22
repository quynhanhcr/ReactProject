import React from 'react';

const Contact = () => {
    return (
        <div className="contact">
            <div className="container">
                <h4 className="page-heading mt-4">THÔNG TIN LIÊN HỆ:</h4>
                <div className="contact-detail">
                    <h2>Nếu bạn cần thông tin gì hay trợ giúp gì,</h2>
                    <p>vui lòng liên hệ với chúng tôi</p>
                    <div className="mt-5 mb-5">
                        <span className="fa fa-phone">1900 8056</span>
                        <span className="fa fa-envelope ml-5">quynhanhcr@gmail.com</span>
                    </div>
                </div>
             </div>
             <iframe className="address-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.0963474616647!2d106.71823194979379!3d10.727051863000243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f8bcb7893df%3A0x330a8b35833f5896!2zMTA1IFTDtG4gROG6rXQgVGnDqm4sIFTDom4gUGjDuiwgUXXhuq1uIDcsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1627571366890!5m2!1sen!2s"></iframe>
        </div>
        
    );
};

export default Contact;