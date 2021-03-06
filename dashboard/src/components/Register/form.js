import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ({ handleSubmit }) {

	const [formValidate, setFormValidate] = useState(false)

	const _handleSubmit = (event) => {
		event.preventDefault()
		event.stopPropagation()

		setFormValidate(true)
		const inputs = Array.prototype.filter.call(event.target, function (input) {
			if (input.checkValidity() === false) {
				return input
			}
		})
		
		if (inputs.length === 0)
			handleSubmit(event)

	}
	return (
		<div className="card">
			<form className={"card-body" + (formValidate ? " was-validated" : "")} onSubmit={_handleSubmit} noValidate>
				<h3 className="text-center mb-3">Register</h3>
				<div className="form-group">
					<label for="username">Username</label>
					<input type="text" className="form-control" name="username" required autofocus
						pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{6,30}$"
					/>
					<div className="invalid-feedback">
						What's your username?
					</div>
				</div>

				<div className="form-group">
					<label for="password">Password</label>
					<input type="password" className="form-control" name="password" required
						pattern="^[\w]{6,}$"
					/>
					<div className="invalid-feedback">
						Password is required
					</div>
				</div>

				<div className="form-group">
					<label for="name">Name</label>
					<input type="text" className="form-control" name="name" required autofocus
						pattern=".{3,}"
					/>
					<div className="invalid-feedback">
						What's your name?
					</div>
				</div>

				<div className="form-group">
					<label for="invite">Invite Code</label>
					<input type="text" className="form-control" name="invite" required autofocus
						minLength={6}
					/>
					<div className="invalid-feedback">
						Your invite code is invalid
					</div>
				</div>

				{/* <div className="form-group">
					<div className="custom-checkbox custom-control">
						<input type="checkbox" name="agree" id="agree" className="custom-control-input" required="" />
						<label for="agree" className="custom-control-label">I agree to the <a href="#">Terms and Conditions</a></label>
						<div className="invalid-feedback">
							You must agree with our Terms and Conditions
						</div>
					</div>
				</div> */}

				<div className="form-group mt-4">
					<button type="submit" className="btn btn-primary btn-block">
						Register
					</button>
				</div>
				<div className="mt-4 text-center">
					Already have an account? <Link to="/">Login</Link>
				</div>
			</form>
		</div>
	)
}
