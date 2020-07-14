import React, { Component } from 'react'
import { Register } from '../../api'
import FormCompoment from './form'

export default class Register_Page extends Component {

	constructor(props) {
		super(props)
		document.body.style.backgroundColor = '#f7f9fb'

		/**
		 * 
		 */
		this.state = {
			invite_code: '',
			username: '',
			password: '',
			name: ''
		}

		// Binding
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleInputChange(event) {
		const target = event.target
		this.setState({
			[target.name]: target.value
		})
	}

	async handleSubmit(event) {
		event.preventDefault()
		// TODO: validate data
		const req = await Register({
			invite_code: this.state.invite_code,
			name: this.state.name,
			username: this.state.username
		})
		if (req.data.success) {
			this.setState({
				showRegisterSuccess: true
			})
		} else {
			this.setState({
				showRegisterFailure: true
			})
		}
	}






	render() {
		return (
			<div className="container">
				<div className="row min-vh-100 align-items-center pb-5">
					<div className="col col-sm-5 col-md-7 col-lg-7 col-xl-5 mx-auto">
							<FormCompoment handleSubmit={this.handleSubmit} />
					</div>
				</div>
			</div>
		)
	}
}
