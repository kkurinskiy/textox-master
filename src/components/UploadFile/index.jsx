import { useRef, useEffect, useState } from 'react';
import mammoth from 'mammoth';

import styles from './UploadFile.module.scss';

export const UploadFile = ({
	setUploadFileOpen,
	setStage,
	fileName,
	setFileName,
}) => {
	const uploadRef = useRef();
	const uploadBlockRef = useRef();
	useEffect(() => {
		const handleClickAddOutside = event => {
			if (
				event.composedPath().includes(uploadRef.current) &&
				!event.composedPath().includes(uploadBlockRef.current)
			) {
				setUploadFileOpen(false);
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
				setUploadFileOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeyPress);

		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	const [fileContent, setFileContent] = useState('');
	const [error, setError] = useState('');

	const handleFileChange = event => {
		const file = event.target.files[0];
		if (!file) return;

		// Проверка поддерживаемых типов файлов
		const allowedTypes = [
			'text/plain',
			'application/pdf',
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'application/msword',
		];
		if (!allowedTypes.includes(file.type)) {
			setError('Неподдерживаемый тип файла!');
			return;
		}

		setError('');
		setFileName(file.name); // Сохраняем имя файла

		const reader = new FileReader();

		if (file.type === 'text/plain') {
			// Чтение текстовых файлов
			reader.onload = e => {
				setFileContent(e.target.result); // Сохраняем содержимое
			};
			reader.readAsText(file);
		} else if (file.type === 'application/pdf') {
			// Обработка PDF (пример, понадобится библиотека pdfjs-dist)
			reader.onload = async e => {
				const pdfContent = 'Обработка PDF здесь'; // Добавьте код для работы с PDF
				setFileContent(pdfContent); // Сохраняем содержимое
			};
			reader.readAsArrayBuffer(file);
		} else if (
			file.type ===
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
			file.type === 'application/msword'
		) {
			// Обработка Word-документов
			reader.onload = async e => {
				try {
					const result = await mammoth.extractRawText({
						arrayBuffer: e.target.result,
					});
					setFileContent(result.value); // Сохраняем содержимое
				} catch (err) {
					setError('Ошибка при чтении Word-файла');
				}
			};
			reader.readAsArrayBuffer(file);
		}
	};

	const handleUploadFileClick = e => {
		e.preventDefault();

		if (fileContent) {
			setStage('fileResult');
			setUploadFileOpen(false);
		}
	};

	return (
		<div className={styles.upload} ref={uploadRef}>
			<form className={styles.uploadBlock} ref={uploadBlockRef}>
				<h6 className={styles.uploadBlock__title}>Загрузите файл</h6>
				<label className={styles.uploadBlock__label} htmlFor='upload-file'>
					{fileName ? fileName : 'Выберите файл'}
				</label>
				<input
					className={styles.uploadBlock__input}
					type='file'
					id='upload-file'
					onChange={handleFileChange}
				/>
				<button
					className={styles.uploadBlock__submit}
					onClick={handleUploadFileClick}
				>
					Загрузить
				</button>
			</form>
		</div>
	);
};
