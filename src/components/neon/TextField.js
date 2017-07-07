import React, { Component } from 'react';
import styled from 'styled-components';

/*
	ToDo 
	1. use theme
	2. use rem (for flexible UI)
*/

const TextField = styled.input`
	margin: 7px;
	font: 13px Arial;
	order: 0;
	padding: 5px;
	display: block;
	color: #00BCD4;
	outline: none;
	border: 1px solid #56ffd8;
	background-color: transparent;
	box-shadow: none;
	transition: box-shadow 0.3s;
	border-radius: 5px;

	&:focus, &:hover {
		box-shadow: 0 0 18px 3px #00BCD4;
	}

	&:active {
		box-shadow: 0 0 18px 3px white;
	}

	&::placeholder {
		font: 13px Arial;
		color: rgba(0, 188, 212, 0.8);
		opacity: 1;
		transition: opacity 0.5s;
	}

	&:focus::placeholder {
		opacity: 0;
	}
`;

export default TextField;