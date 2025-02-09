import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Login.module.scss';
import logo from '../../assets/img/logo.svg';

import supabase from '../../config/supabaseConfig';

export const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Валидация e-mail
	const validateEmail = email => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Валидация пароля
	const validatePassword = password => {
		return password.length >= 6;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const { email, password } = formData;

		// Проверка на пустые поля
		if (!email || !password) {
			setError('Все поля обязательны для заполнения.');
			return;
		}

		// Проверка корректности e-mail
		if (!validateEmail(email)) {
			setError('Введите корректный e-mail.');
			return;
		}

		// Проверка длины пароля
		if (!validatePassword(password)) {
			setError('Пароль должен содержать минимум 6 символов.');
			return;
		}

		// Очистка ошибки
		setError('');

		try {
			// Авторизация через Supabase
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});

			if (error) {
				setError('Неверный e-mail или пароль.');
			} else {
				setSuccess(true);
				setTimeout(() => {
					navigate('/'); // Перенаправление на главную страницу
				}, 3000);
			}
		} catch (err) {
			setError('Произошла ошибка при входе.');
		}
	};

	return (
		<div className={styles.login}>
			<img className={styles.loginLogo} src={logo} alt='logo' />
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<h5 className={styles.loginForm__title}>Авторизация</h5>
				<div className={styles.loginForm__inputs}>
					<input
						className={styles.loginForm__inputsItem}
						type='email'
						placeholder='Введите e-mail'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						className={styles.loginForm__inputsItem}
						type='password'
						placeholder='Введите пароль'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
				</div>
				{/* Отображение ошибки */}
				{error && <p className={styles.loginForm__error}>{error}</p>}
				{/* Отображение успеха */}
				{success && (
					<p className={styles.loginForm__success}>
						Вход успешен! Перенаправляем...
					</p>
				)}
				<div className={styles.loginForm__links}>
					<div className={styles.loginForm__linksItem}>
						<p className={styles.loginForm__linksItem__text}>Нет аккаунта?</p>
						<Link
							className={styles.loginForm__linksItem__link}
							to='/registration'
						>
							Создать
						</Link>
					</div>
				</div>
				<button className={styles.loginForm__submit} type='submit'>
					Войти
				</button>
			</form>
		</div>
	);
};
