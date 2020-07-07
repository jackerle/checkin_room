/// <reference path="../../../@types/api.d.ts"/>

import React, { Component } from 'react'
import { Bar, HorizontalBar } from 'react-chartjs-2'
import axios from 'axios'
import env from '../../../../env.json'

export default class infoRoom extends Component {
	constructor(props) {
		super(props)
		// /** @type {{ allRoom: getRoom[] }} */
		// this.setState({

		// })
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
			datasets
		})




		/*
		this.setState({
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'My First dataset',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: [10, 20, 30],
					stack: 'stack1'
				},
				{
					label: 'My Second dataset',
					backgroundColor: 'rgba(255,99,132,0.2)',
					borderColor: 'rgba(255,99,132,1)',
					borderWidth: 1,
					hoverBackgroundColor: 'rgba(255,99,132,0.4)',
					hoverBorderColor: 'rgba(255,99,132,1)',
					data: [50, 100],
					stack: 'stack1'
				}
			]
		})
		*/
		//
	}

	render() {
		return (
			<HorizontalBar data={this.state}></HorizontalBar>
		)
	}
}
