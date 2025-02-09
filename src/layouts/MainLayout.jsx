import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const MainLayout = () => {
	return (
		<div className='main'>
			<Header />
			<div className='container'>
				<Outlet />
			</div>
		</div>
	);
};
