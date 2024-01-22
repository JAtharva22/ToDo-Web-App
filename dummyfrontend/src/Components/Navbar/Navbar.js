import { React, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Navbar = () => {
    const [authtoken, setAuthToken] = useState(null);

    useEffect(() => {
        const authToken = Cookies.get('authToken');
        setAuthToken(authToken);
    }, []);

    const handleSignout = () => {
        Cookies.remove('authToken');
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
                <a className="navbar-brand mx-5" href="/">
                    TODO
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                {authtoken && (
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/add">
                                Add Note <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/">
                                View Notes <span className="sr-only">(current)</span>
                            </a>
                        </li>
                    </ul>)}

                    <form className="form-inline my-2 my-lg-0 mx-5">
                        {authtoken ? (
                            <a className="nav-link active  btncolor" aria-current="page" href="/" onClick={handleSignout}>
                                Sign Out
                            </a>
                        ) : (
                            <a className="nav-link active   btncolor" aria-current="page" href="/login">
                                Login
                            </a>
                        )}
                    </form>
                </div>
            </nav>

        </>
    );
};

export default Navbar;
