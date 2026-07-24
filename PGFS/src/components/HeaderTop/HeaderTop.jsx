import "./HeaderTop.css";

function HeaderTop() {
    return (
        <div className="container-fluid bg-dark text-white-50 py-2 px-0 d-none d-lg-block">
            <div className="row gx-0 align-items-center">

                <div className="col-lg-7 px-5 text-start">

                    <div className="d-inline-flex align-items-center me-4">
                        <small className="fa fa-phone-alt me-2"></small>

                        <small>
                            <a
                                href="tel:+917276865443"
                                className="text-white-50 text-decoration-none"
                            >
                                +91-7276865443
                            </a>
                        </small>
                    </div>

                    <div className="d-inline-flex align-items-center me-4">
                        <small className="far fa-envelope-open me-2"></small>

                        <small>
                            <a
                                href="mailto:sales@plantglobal.com"
                                className="text-white-50 text-decoration-none"
                            >
                                sales@plantglobal.com
                            </a>
                        </small>
                    </div>

                    <div className="d-inline-flex align-items-center me-4">
                        <small className="far fa-clock me-2"></small>

                        <small>
                            Sun - Sat : 09 AM - 09 PM
                        </small>
                    </div>

                </div>

                <div className="col-lg-5 px-5 text-end">

                    <div className="d-inline-flex align-items-center">

                        <a className="text-white-50 ms-4" href="#">
                            <i className="fab fa-facebook-f"></i>
                        </a>

                        <a className="text-white-50 ms-4" href="#">
                            <i className="fab fa-twitter"></i>
                        </a>

                        <a className="text-white-50 ms-4" href="#">
                            <i className="fab fa-linkedin-in"></i>
                        </a>

                        <a className="text-white-50 ms-4" href="#">
                            <i className="fab fa-instagram"></i>
                        </a>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default HeaderTop;