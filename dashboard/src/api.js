import env from '../../env.json'
import axios from 'axios'


// axios.defaults.h
/**
 * 
 * @param {object} params
 * @param {string} params.username
 * @param {string} params.password
 * @param {string} params.name
 * @param {string} params.invite_code
 * @returns {import('axios').AxiosResponse<{success: boolean}>}
 */
export function Register(params) {
	return axios.post(env.API, ...params)
}