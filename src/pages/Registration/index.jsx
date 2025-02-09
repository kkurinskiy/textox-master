import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Registration.module.scss';
import logo from '../../assets/img/logo.svg';

import supabase from '../../config/supabaseConfig';

export const Registration = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
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

	// Валидация никнейма
	const validateUsername = username => {
		const usernameRegex = /^(?!.*\.\.)([a-zA-Z0-9._]{6,})$/;
		return usernameRegex.test(username);
	};

	// Валидация e-mail
	const validateEmail = email => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Валидация пароля
	const validatePassword = password => {
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,24}$/;
		return passwordRegex.test(password);
	};

	// Проверка совпадения паролей
	const validateConfirmPassword = (password, confirmPassword) => {
		return password === confirmPassword;
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const { username, email, password, confirmPassword } = formData;

		// Проверка на пустые поля
		if (!username || !email || !password || !confirmPassword) {
			setError('Все поля обязательны для заполнения.');
			return;
		}

		// Проверка никнейма
		if (!validateUsername(username)) {
			setError(
				'Никнейм должен содержать минимум 6 символов, может включать только латинские буквы, цифры, точки, символ "_", и не может содержать две точки подряд.'
			);
			return;
		}

		// Проверка e-mail
		if (!validateEmail(email)) {
			setError('Введите корректный e-mail.');
			return;
		}

		// Проверка пароля
		// if (!validatePassword(password)) {
		// 	setError(
		// 		'Пароль должен содержать от 12 до 24 символов, включать как минимум одну заглавную букву, одну строчную букву, одну цифру, один спецсимвол, и может состоять только из латинских букв.'
		// 	);
		// 	return;
		// }

		// Проверка подтверждения пароля
		if (!validateConfirmPassword(password, confirmPassword)) {
			setError('Пароли не совпадают.');
			return;
		}

		// Если все проверки пройдены, очищаем ошибки
		setError('');

		// Отправка данных на сервер
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { username },
				},
			});

			if (error) {
				setError(error.message);
			} else {
				setSuccess(true); // Успешная регистрация
				navigate('/login');
			}
		} catch (err) {
			setError('Произошла ошибка при регистрации.');
		}
	};

	return (
		<div className={styles.registration}>
			<img className={styles.registrationLogo} src={logo} alt='logo' />
			<form className={styles.registrationForm} onSubmit={handleSubmit}>
				<h5 className={styles.registrationForm__title}>Регистрация</h5>
				{error && <p className={styles.registrationError}>{error}</p>}
				{success && (
					<p className={styles.registrationSuccess}>
						Регистрация успешна! Проверьте почту для подтверждения.
					</p>
				)}
				<div className={styles.registrationForm__inputs}>
					<input
						className={styles.registrationForm__inputsItem}
						type='text'
						placeholder='Создайте никнейм'
						name='username'
						value={formData.username}
						onChange={handleChange}
					/>
					<input
						className={styles.registrationForm__inputsItem}
						type='email'
						placeholder='Введите e-mail'
						name='email'
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						className={styles.registrationForm__inputsItem}
						type='password'
						placeholder='Создайте пароль'
						name='password'
						value={formData.password}
						onChange={handleChange}
					/>
					<input
						className={styles.registrationForm__inputsItem}
						type='password'
						placeholder='Повторите пароль'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				<div className={styles.registrationForm__links}>
					<div className={styles.registrationForm__linksItem}>
						<p className={styles.registrationForm__linksItem__text}>
							Есть аккаунт?
						</p>
						<Link
							className={styles.registrationForm__linksItem__link}
							to='/login'
						>
							Войти
						</Link>
					</div>
				</div>
				<button type='submit' className={styles.registrationForm__submit}>
					Продолжить
				</button>
			</form>
		</div>
	);
};
