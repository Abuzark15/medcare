import React from 'react'

function Footer() {
  return (
    <>
    <footer className="footer">
                <div className="footer__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <div className="footer__logo">
                                    <a href="#"><img src="img/footer-logo.png" alt="" /></a>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-8">
                                <div className="footer__newslatter">
                                    <form action="#">
                                        <input type="text" placeholder="Email" />
                                        <button type="submit" className="site-btn">Subscribe</button>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12">
                                <div className="footer__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h5>Company</h5>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Departments</a></li>
                                    <li><a href="#">Find a Doctor</a></li>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">News</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h5>Quick links</h5>
                                <ul>
                                    <li><a href="#">Facial Fillers</a></li>
                                    <li><a href="#">Breast Surgery</a></li>
                                    <li><a href="#">Body Lifts</a></li>
                                    <li><a href="#">Face & Neck</a></li>
                                    <li><a href="#">Fat Reduction</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="footer__address">
                                <h5>Contact Us</h5>
                                <ul>
                                    <li><i className="fa fa-map-marker"></i> Los Angeles Gournadi, 1230 Bariasl</li>
                                    <li><i className="fa fa-phone"></i> 1-677-124-44227</li>
                                    <li><i className="fa fa-envelope"></i> Support@gmail.com</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-6">
                            <div className="footer__map">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48158.305462977965!2d-74.13283844036356!3d41.02757295168286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e440473470d7%3A0xcaf503ca2ee57958!2sSaddle%20River%2C%20NJ%2007458%2C%20USA!5e0!3m2!1sen!2sbd!4v1575917275626!5m2!1sen!2sbd"
                                    height="190" allowFullScreen=""></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">

                                <div className="footer__copyright__text">
                                    <p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
                                </div>

                            </div>
                            <div className="col-lg-5">
                                <ul>
                                    <li>All Rights Reserved</li>
                                    <li>Terms & Use</li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
    </>

  )
}

export default Footer