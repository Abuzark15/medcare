import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation after successful login
import { login } from '../services/authService'; // Assuming your service file is called authService.js

function Login() {
  // State to store email, password, and any errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use navigate to redirect after login
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      const response = await login(email, password); // Call the login function
      console.log('Login successful:', response);

      // Redirect user after successful login (you can customize the path
      navigate('/'); // Redirect to a secure route like a dashboard
    } catch (err) {
      setError(err.message); // Handle any error that occurred during login
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            {/* Form section */}
            <div className="col-sm-6 text-black">
              <div className="px-5 ms-xl-4">
                {/* You can add your branding or logo here */}
              </div>

              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: '23rem' }} onSubmit={handleLogin}>
                  <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Log in
                  </h3>

                  {/* Email input */}
                  <div className="form-outline ">
                    <input
                      type="email"
                      id="form2Example18"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example18">
                      Email address
                    </label>
                  </div>

                  {/* Password input */}
                  <div className="form-outline ">
                    <input
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="form2Example28">
                      Password
                    </label>
                  </div>

                  {/* Error message */}
                  {error && <div className="alert alert-danger">{error}</div>}

                  {/* Login button */}
                  <div className="pt-1 ">
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>

                  {/* Forgot password link */}
                  <p className="small mb-5 pb-lg-2">
                    <a className="text-muted" href="#!">
                      Forgot password?
                    </a>
                  </p>

                  {/* Register link */}
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="link-info">
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>

            {/* Image section (hidden on smaller screens) */}
            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                alt="Login image"
                className="w-100 vh-100"
                style={{ objectFit: 'cover', objectPosition: 'left' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
