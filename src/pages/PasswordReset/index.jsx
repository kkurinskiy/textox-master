import { useState } from 'react';

import styles from './PasswordReset.module.scss';
import logo from '../../assets/img/logo.svg';

export const PasswordReset = ({ stage }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [error, setError] = useState('');

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
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,24}$/;
		return passwordRegex.test(password);
	};

	// Проверка совпадения паролей
	const validateConfirmPassword = (password, confirmPassword) => {
		return password === confirmPassword;
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (stage === 'email') {
			// Валидация e-mail
			if (!validateEmail(formData.email)) {
				setError('Введите корректный адрес электронной почты.');
				return;
			}
			setError('');
			// Здесь можно добавить логику для отправки e-mail на сервер
		} else if (stage === 'password') {
			// Валидация пароля
			if (!validatePassword(formData.password)) {
				setError(
					'Пароль должен содержать от 12 до 24 символов, включать как минимум одну заглавную букву, одну строчную букву, одну цифру, один спецсимвол, и может состоять только из латинских букв.'
				);
				return;
			}

			// Проверка подтверждения пароля
			if (
				!validateConfirmPassword(formData.password, formData.confirmPassword)
			) {
				setError('Пароли не совпадают.');
				return;
			}

			setError('');
			// Здесь нужно добавить логику для сброса пароля на сервере
		}
	};

	if (stage === 'email')
		return (
			<div className={styles.reset}>
				<img className={styles.resetLogo} src={logo} alt='logo' />
				<form className={styles.resetForm}>
					<h5 className={styles.resetForm__title}>Введите электронную почту</h5>
					<div className={styles.resetForm__inputs}>
						<input
							className={styles.resetForm__inputsItem}
							type='email'
							placeholder='Электронная почта'
							name='email'
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					{error && <p className={styles.resetForm__error}>{error}</p>}
					<button className={styles.resetForm__submit} type='submit'>
						Продолжить
					</button>
				</form>
			</div>
		);
	else if (stage === 'password')
		return (
			<div className={styles.reset}>
				<img className={styles.resetLogo} src={logo} alt='logo' />
				<form className={styles.resetForm}>
					<h5 className={styles.resetForm__title}>Придумайте новый пароль</h5>
					<div className={styles.resetForm__inputs}>
						<input
							className={styles.resetForm__inputsItem}
							type='password'
							placeholder='Создайте пароль'
							name='password'
							value={formData.password}
							onChange={handleChange}
						/>
						<input
							className={styles.resetForm__inputsItem}
							type='password'
							placeholder='Повторите пароль'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
					</div>
					{error && <p className={styles.resetForm__error}>{error}</p>}
					<button className={styles.resetForm__submit} type='submit'>
						Продолжить
					</button>
				</form>
			</div>
		);

	return <p>Что-то пошло не так</p>;
};
