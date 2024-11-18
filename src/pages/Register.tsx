import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Register() {
  
    const api = process.env.REACT_APP_API_URL;

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    

    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetch(`${api}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name,
          email,
          password
        }),
      });
  
      const data = await response.text();
      if (response.ok) {
        setMessage(``);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setLoading(false);
        toast.success("Account created successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        let datajson = JSON.parse(data);
        localStorage.setItem("jwt", datajson.jwt);

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage(``);
        setLoading(false);
        toast.error(data, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    };
  
    return (
      <section className="hero is-fullheight ">
        <ToastContainer/>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5">
                <div className="mb-3">
                  <h1 className="title is-2 has-text-centered">
                    <img className="" src="/logo.png" alt="Logo" width="250" height="150" />
                  </h1>
                </div>
                <div className="box column is-10 m-auto">
                  <h1 className="title is-4 has-text-centered">Register</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <label className="label">Name</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="e.g. John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Email</label>
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="e.g. johndoe@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field mb-3">
                      <label className="label">Password</label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field mb-3">
                      <label className="label">Confirm Password</label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            if (password !== e.target.value) {
                              setMessage("❌ Passwords do not match");
                            } else {
                              setMessage("");
                            }
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div className="field my-2">
                      <div className="control columns my-3">
                        <button className="button is-warning column m-auto is-two-thirds"  >
                          {
                            loading ? (
                              <span className="icon is-small">
                                <i className="fas fa-spinner fa-spin"></i>
                              </span>
                            ) : (
                              <span>Register</span>
                            )
                          }
                        </button>
                      </div>
                    </div>
                  </form>
                  {message && (
                    <div className="has-text-centered mt-4">{message}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  
}
