import './assets/scss/main.scss';

import { Route, Routes, Navigate } from 'react-router-dom';

import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';

import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import { PasswordReset } from './pages/PasswordReset';

import { Home } from './pages/Home';
import { Monitoring } from './pages/Monitoring';

import { checkUser } from './config/checkAuth';
import { useState, useEffect } from 'react';

function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			const currentUser = await checkUser();
			setUser(currentUser);
			setLoading(false);
		};

		fetchUser();
	}, []);

	if (loading) return <div>Загрузка...</div>; // Показываем лоадер во время проверки

	return (
		<Routes>
			{/* Защищённые маршруты */}
			<Route
				path='/'
				element={user ? <MainLayout /> : <Navigate to='/login' replace />}
			>
				<Route index element={<Home />} />
				<Route path='monitoring' element={<Monitoring />} />
			</Route>

			{/* Маршруты авторизации */}
			<Route path='' element={<AuthLayout />}>
				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/forgot_password'
					element={<PasswordReset stage={'email'} />}
				/>
				<Route
					path='/password_reset'
					element={<PasswordReset stage={'password'} />}
				/>
			</Route>

			{/* Перенаправление на авторизацию для неизвестных маршрутов */}
			<Route
				path='*'
				element={<Navigate to={user ? '/' : '/login'} replace />}
			/>
		</Routes>
	);
}

export default App;
