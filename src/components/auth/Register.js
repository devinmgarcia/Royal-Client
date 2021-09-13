import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Auth.css";
const api = "http://localhost:8000"

export const Register = (props) => {
	const email = useRef();
	const password = useRef();
	const verifyPassword = useRef();
	const passwordDialog = useRef();
	const history = useHistory();

	const handleRegister = (e) => {
		e.preventDefault();
		if (password.current.value === verifyPassword.current.value) {
			const newUser = {
				email: email.current.value,
				password: password.current.value,  
			};

			return fetch(`${api}/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(newUser),
			})
				.then((res) => res.json())
				.then((res) => {
					localStorage.setItem("rare_user_id", res.token);
					history.push("/");
				});
		} else {
			passwordDialog.current.showModal();
		}
	};

	return (
		<main style={{ textAlign: "center" }}>
			<dialog className="dialog dialog--password" ref={passwordDialog}>
				<div>Passwords do not match</div>
				<button
					className="button--close"
					onClick={(e) => passwordDialog.current.close()}
				>
					Close
				</button>
			</dialog>

			<h1 className="h3 mb-3 font-weight-normal">Register</h1>
			<form className="form--login--wrap" onSubmit={handleRegister}>
				<div className="registerColumn1 form--login">
					<div className="profileImageDiv">
						REGISTER
					</div>
					<fieldset>
						<input
							ref={email}
							type="email"
							name="email"
							className="form-control"
							placeholder="Email address"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={password}
							type="password"
							name="password"
							className="form-control"
							placeholder="Password"
							required
						/>
					</fieldset>
					<fieldset>
						<input
							ref={verifyPassword}
							type="password"
							name="verifyPassword"
							className="form-control"
							placeholder="Verify password"
							required
						/>
					</fieldset>
				</div>
				<button className="btn btn-1 btn-sep icon-send" type="submit">
					Register
				</button>
			</form>
			<section className="link--register">
				Already registered? <Link to="/login">Login</Link>
			</section>
		</main>
	);
};