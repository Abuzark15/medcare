import React, { useEffect, useState } from 'react'
import Loader from './component/Loader';

function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);  // Hide loader after 2 seconds
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    });
    return (
        <div>
             {loading && <Loader />}

            <div className="offcanvas-menu-overlay"></div>
            <div className="offcanvas-menu-wrapper">
                <div className="offcanvas__logo">
                    <a href="./index.html"><img src="img/logo.png" alt="" /></a>
                </div>
                <div id="mobile-menu-wrap"></div>
                <div className="offcanvas__btn">
                    <a href="#" className="primary-btn">Appointment</a>

                </div>

                <ul className="offcanvas__widget">
                    <li><i className="fa fa-phone"></i> 1-677-124-44227</li>
                    <li><i className="fa fa-map-marker"></i> Los Angeles Gournadi, 1230 Bariasl</li>
                    <li><i className="fa fa-clock-o"></i> Mon to Sat 9:00am to 18:00pm</li>
                </ul>
                <div className="offcanvas__social">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-dribbble"></i></a>
                </div>
            </div>
        
            <section className="hero spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="hero__text">
                                <span>Eiusmod tempor incididunt </span>
                                <h2>Take the world's best quality Treatment</h2>
                                <a href="#" className="primary-btn normal-btn">Contact us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="consultation">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="consultation__form">
                                <div className="section-title">
                                    <span>REQUEST FOR YOUR</span>
                                    <h2>Consultation</h2>
                                </div>
                                <form action="#">
                                    <input type="text" placeholder="Name" />
                                    <input type="text" placeholder="Email" />
                                    <div className="datepicker__item">
                                        <input type="text" placeholder="Date" className="datepicker" />
                                        <i className="fa fa-calendar"></i>
                                    </div>
                                    <select>
                                        <option value="">Type of service</option>
                                        <option value="">Advanced equipment</option>
                                        <option value="">Qualified doctors</option>
                                        <option value="">Certified services</option>
                                        <option value="">Emergency care</option>
                                    </select>
                                    <button type="submit" className="site-btn">Book appoitment</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="consultation__text">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="consultation__text__item">
                                            <div className="section-title">
                                                <span>Welcon to Aesthetic</span>
                                                <h2>Find Best Doctors With <b>AESTHETIC</b></h2>
                                            </div>
                                            <p>30 Years of experience in Cosmetic Surgery.Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                                dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="consultation__video set-bg" data-setbg="img/consultation-video.jpg">
                                            <a href="https://www.youtube.com/watch?v=PXsuI67s2AA" className="play-btn video-popup"><i className="fa fa-play"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="chooseus spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title">
                                <span>Why choose us?</span>
                                <h2>Offer for you</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="chooseus__item">
                                <img src="img/icons/ci-1.png" alt="" />
                                <h5>Advanced equipment</h5>
                                <p>Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod tempor cididunt facilisis.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="chooseus__item">
                                <img src="img/icons/ci-2.png" alt="" />
                                <h5>Qualified doctors</h5>
                                <p>Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod tempor cididunt facilisis.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="chooseus__item">
                                <img src="img/icons/ci-3.png" alt="" />
                                <h5>Certified services</h5>
                                <p>Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod tempor cididunt facilisis.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="chooseus__item">
                                <img src="img/icons/ci-4.png" alt="" />
                                <h5>Emergency care</h5>
                                <p>Lorem ipsum amet, consectetur adipiscing elit, sed do eiusmod tempor cididunt facilisis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services spad set-bg" data-setbg="img/services-bg.jpg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-6">
                            <div className="section-title">
                                <span>Our services</span>
                                <h2>Offer for you</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="services__btn">
                                <a href="#" className="primary-btn">Contact us</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="services__item">
                                <div className="services__item__icon">
                                    <span className="flaticon-044-aesthetic"></span>
                                </div>
                                <div className="services__item__text">
                                    <h5>Body procedures</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="services__item">
                                <div className="services__item__icon">
                                    <span className="flaticon-027-beauty"></span>
                                </div>
                                <div className="services__item__text">
                                    <h5>Facial Procedures</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="services__item">
                                <div className="services__item__icon">
                                    <span className="flaticon-031-anatomy"></span>
                                </div>
                                <div className="services__item__text">
                                    <h5>Breast procedures</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="services__item">
                                <div className="services__item__icon">
                                    <span className="flaticon-008-abdominoplasty"></span>
                                </div>
                                <div className="services__item__text">
                                    <h5>Skin care & Beauty</h5>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor aliqua.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="team spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-title">
                                <span>Our Team</span>
                                <h2>Our Expert Doctors</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="img/team/team-1.jpg" alt="" />
                                <h5>Caroline Grant</h5>
                                <span>Plastic surgeon</span>
                                <div className="team__item__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="img/team/team-2.jpg" alt="" />
                                <h5>Dr. Maria Angel</h5>
                                <span>Plastic surgeon</span>
                                <div className="team__item__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="team__item">
                                <img src="img/team/team-3.jpg" alt="" />
                                <h5>Nathan Mullins</h5>
                                <span>Plastic surgeon</span>
                                <div className="team__item__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                    <a href="#"><i className="fa fa-dribbble"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <div className="gallery">
</div> */}

            <section className="latest spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-sm-6">
                            <div className="section-title">
                                <span>Our News</span>
                                <h2>Skin care tips</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-6">
                            <div className="latest__btn">
                                <a href="#" className="primary-btn">View all news</a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="latest__item">
                                <h5><a href="#">Here’s how you can get a natural glow this party season</a></h5>
                                <p>Lorem ipsum, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                <ul>
                                    <li><img src="img/blog/blog-author.jpg" alt="" /> John Doe</li>
                                    <li>Dec 06, 2019</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="latest__item">
                                <h5><a href="#">Get better skin with these top 10 tips for skin care</a></h5>
                                <p>Lorem ipsum, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                <ul>
                                    <li><img src="img/blog/blog-author.jpg" alt="" /> John Doe</li>
                                    <li>Dec 06, 2019</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="latest__item">
                                <h5><a href="#">8 Ways to Save Your Skin if You Exercise Outside This Winter</a></h5>
                                <p>Lorem ipsum, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                                <ul>
                                    <li><img src="img/blog/blog-author.jpg" alt="" /> John Doe</li>
                                    <li>Dec 06, 2019</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;