

import React from 'react'

// docs: https://getbootstrap.com/docs/4.5/components/spinners/
/**
 * 
 * @param {object} param
 * @param {string} param.paddingTop
 * @param {string} param.spinnerType
 * @param {string} param.color
 * @param {import('react').CSSProperties} param.custom
 */
export default function Loading({
	paddingTop = 'pt-4',
	spinnerType = 'spinner-border',
	color = 'text-primary',
	custom
}) {
	return (
		<div className={`text-center ${paddingTop}`}>
			<div className={`${spinnerType} ${color}`} style={custom} role="status">
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	)
}