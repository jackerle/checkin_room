/// <reference path="../../../@types/api.d.ts"/>

import React, { Component } from 'react'
import { Bar, HorizontalBar } from 'react-chartjs-2'
import axios from 'axios'
import env from '../../../../env.json'
import Loading from '../Loading'




export default class infoRoom extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true
		}
	}

	async componentDidMount() {

		/** @type {import('axios').AxiosResponse<getRoom_in[]>} */
		const dataRoom = await axios({
			method: 'GET',
			url: env.API + '/getroom_in'
		})



		const labels = []
		// [0] use | [1] space
		const datasets = [{
			label: 'use slot',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [],
			stack: 'stack1'
		},
		{
			label: 'free slot',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [],
			stack: 'stack1'
		}]

		for (const room of dataRoom.data) {
			labels.push(room.room_name)
			datasets[0].data.push(room.count)
			datasets[1].data.push(room.capacity - room.count)
			// datasets[0].data.push(room.capacity)
		}
		this.setState({
			labels,
			datasets,
			isLoading: false
		})

	}

	render() {
		if (this.state.isLoading)
			return <Loading custom={{ width: '3rem', height: '3rem' }} />

		return (
			<HorizontalBar data={this.state}></HorizontalBar>
		)
	}
}
