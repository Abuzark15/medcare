import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation after successful registration
import { register } from '../services/authService'; // Import the register function

function Register() {
  // State to store form values and errors
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Use navigate to redirect after successful registration
  const navigate = useNavigate();

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validation
    if (!name || !email || !phone || !gender || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const response = await register({ name, email, phone, gender, password }); 
      console.log('Registration successful:', response);

      // Redirect to login page after successful registration
      navigate('/');
    } catch (err) {
      // Handle registration errors
      setError(err.message); 
    }
  };

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 text-black">
              <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                <form style={{ width: '23rem' }} onSubmit={handleRegister}>
                  <h3 className="fw-normal mt-4 pb-2" style={{ letterSpacing: '1px' }}>
                    Register
                  </h3>

                  {/* Name input */}
                  <div className="form-outline">
                    <input
                      type="text"
                      id="formName"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="form-label" htmlFor="formName">Name</label>
                  </div>

                  {/* Email input */}
                  <div className="form-outline">
                    <input
                      type="email"
                      id="formEmail"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="formEmail">Email address</label>
                  </div>

                  {/* Phone input */}
                  <div className="form-outline">
                    <input
                      type="text"
                      id="formPhone"
                      className="form-control form-control-lg"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <label className="form-label" htmlFor="formPhone">Phone number</label>
                  </div>

                  {/* Gender input */}
                  <div className="form-outline">
                    <select
                      id="formGender"
                      className="form-control form-control-lg"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <label className="form-label" htmlFor="formGender">Gender</label>
                  </div>

                  {/* Password input */}
                  <div className="form-outline">
                    <input
                      type="password"
                      id="formPassword"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="formPassword">Password</label>
                  </div>

                  {/* Display error message */}
                  {error && <div className="alert alert-danger">{error}</div>}

                  <div className="pt-1">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>

                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="link-info">
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-sm-6 px-0 d-none d-sm-block">
              <img
                src="/img/high-angle-professional-putting-hair-net.jpg"
                alt="Register image"
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

export default Register;
