import { useRef, useEffect } from 'react';
import styles from './InsertLink.module.scss';

export const InsertLink = ({
	setInsertLinkOpen,
	setStage,
	linkContent,
	setLinkContent,
}) => {
	const insertRef = useRef();
	const insertBlockRef = useRef();
	useEffect(() => {
		const handleClickAddOutside = event => {
			if (
				event.composedPath().includes(insertRef.current) &&
				!event.composedPath().includes(insertBlockRef.current)
			) {
				setInsertLinkOpen(false);
			}
		};

		document.body.addEventListener('click', handleClickAddOutside);
		return () => {
			document.body.removeEventListener('click', handleClickAddOutside);
		};
	});

	useEffect(() => {
		const handleKeyPress = event => {
			if (event.key === 'Escape') {
				setInsertLinkOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const validateUrl = url => {
		const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		return regex.test(url);
	};

	const handleUploadLinkClick = e => {
		e.preventDefault();

		if (linkContent && validateUrl(linkContent)) {
			setStage('linkResult');
			setInsertLinkOpen(false);
		}
	};

	return (
		<div className={styles.insert} ref={insertRef}>
			<form className={styles.insertBlock} ref={insertBlockRef}>
				<h6 className={styles.insertBlock__title}>Вставьте ссылку</h6>
				<input
					className={styles.insertBlock__input}
					type='text'
					placeholder='Вставьте ссылку'
					value={linkContent}
					onChange={e => setLinkContent(e.target.value)}
				/>
				<button
					className={styles.insertBlock__submit}
					onClick={handleUploadLinkClick}
				>
					Загрузить
				</button>
			</form>
		</div>
	);
};
