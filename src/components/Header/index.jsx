import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/img/logo.svg';
import supabase from '../../config/supabaseConfig';

export const Header = () => {
	const navigate = useNavigate();

	const signOut = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) {
				console.error('Ошибка при выходе:', error.message);
				return;
			}
			// Перенаправляем на страницу авторизации после выхода
			navigate('/login');
		} catch (err) {
			console.error('Произошла ошибка при выходе:', err);
		}
	};

	const refreshPage = () => {
		window.location.href = '/'; // Перенаправление на главную страницу
	};

	return (
		<header className={styles.header}>
			<div className='container'>
				<div className={styles.headerWrapper}>
					{/* Логотип с обновлением страницы */}
					<div
						className={styles.headerWrapper__logo}
						onClick={refreshPage}
						style={{ cursor: 'pointer' }} // Указатель мыши для кликабельности
					>
						<img
							className={styles.headerWrapper__logoImg}
							src={logo}
							alt='logo'
						/>
					</div>

					{/* Навигация */}
					<div className={styles.headerWrapper__nav}>
						{/* Кнопка выхода */}
						<button
							className={styles.headerWrapper__navSign_in}
							onClick={signOut}
						>
							Выйти
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};
