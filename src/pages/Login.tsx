import React, { useState } from "react";
// import Logo from "../../public/logo.svg";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();
    if (response.ok) {
      setMessage(`✅ ${data}`);
    } else {
      setMessage(`❌ ${data}`);
    }
  };

  return (
    <section className="hero is-fullheight ">
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
                <h1 className="title is-4 has-text-centered">Login</h1>
                <form onSubmit={handleSubmit}>
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
                  <div className="field my-2">
                    <div className="control columns my-3">
                      <button className="button is-warning column is-two-fifths m-auto">
                        Login
                      </button>
                      <a href="/register" className="button is-warning is-outlined column is-two-fifths  m-auto">
                        Register
                      </a>
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
};

export default LoginPage;
