import React, { Component } from 'react';
import styled from 'styled-components';

export const Button = styled.button`
	font: 13px Arial;
	color: #00BCD4;
	background-color: rgba(0, 188, 212, 0.45);
	border: 1px solid #56ffd8;
	box-shadow: none;
	border: 1px solid #56ffd8;
	outline: none;
	border-radius: 5px;
	padding: 5px;
	margin: 7px;
	transition: box-shadow 0.3s;
	transition: background-color 0.3s;
	transition: color 0.3s;

	&:hover, &:focus {
		box-shadow: 0 0 18px 3px #00BCD4;
		background-color: rgba(0, 188, 212, 0.8);
		color: white;
	}

	&:active {
		box-shadow: 0 0 18px 3px white;
		transition: box-shadow 0.1s;
		color: #00BCD4;
		background-color: rgba(0, 188, 212, 0.45);
	}
`;

export default Button;