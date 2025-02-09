import { useState } from 'react';
import axios from 'axios'; // Для отправки запросов к API Hugging Face
import styles from './Home.module.scss';

import { CheckTable } from '../../components/CheckTable';

export const Home = () => {
	const [fileName, setFileName] = useState('');
	const [stage, setStage] = useState('text');
	const [text, setText] = useState('');
	const [toxicityResult, setToxicityResult] = useState(null);
	const [jsonResult, setJsonResult] = useState(null); // Состояние для хранения JSON результата

	// API ключ для Hugging Face
	const API_KEY = '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'; // Замените на ваш API ключ Hugging Face

	// Маппинг меток на русский язык
	const labelMap = {
		obscenity: 'Нецензурная лексика',
		dangerous: 'Опасный контент',
		insult: 'Оскорбление',
		threat: 'Угроза',
		'non-toxic': 'В тексте не найдены метки диструктивной информации',
	};

	// Функция для обработки файла
	const handleFileUpload = async event => {
		const file = event.target.files[0]; // Получаем выбранный файл
		if (!file) return;

		const fileExtension = file.name.split('.').pop().toLowerCase(); // Расширение файла

		try {
			if (fileExtension === 'txt') {
				// Чтение текстового файла
				const fileText = await readTextFile(file);
				setText(fileText);
				setFileName(file.name);
			} else {
				alert('Поддерживаются только файлы .txt');
			}
		} catch (err) {
			console.error('Ошибка чтения файла:', err);
			alert('Ошибка при загрузке файла.');
		}
	};

	// Функция для чтения текстового файла
	const readTextFile = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = () =>
				reject(new Error('Ошибка чтения текстового файла.'));
			reader.readAsText(file);
		});
	};

	// Функция для проверки токсичности текста
	const checkToxicity = async () => {
		try {
			const response = await axios.post(
				'https://api-inference.huggingface.co/models/cointegrated/rubert-tiny-toxicity', // Используем модель для токсичности на русском
				{ inputs: text },
				{
					headers: {
						Authorization: `Bearer ${API_KEY}`, // Передаем API ключ
					},
				}
			);

			// Получаем результат из ответа
			const result = response.data[0];

			// Преобразуем score в проценты и проверяем токсичные метки
			const toxicLabels = result.map(item => ({
				label: labelMap[item.label] || item.label, // Переводим метку на русский
				percentage: (item.score * 100).toFixed(2), // Переводим в проценты
			}));

			// Формируем итоговый объект с результатами
			const resultObj = {
				text: text, // Исходный текст
				toxicityDetected: toxicLabels.length > 0,
				results:
					toxicLabels.length > 0
						? toxicLabels
						: [
								{
									label: 'Текст не содержит диструктивной информации.',
									percentage: '0.00',
								},
						  ],
			};

			// Сохраняем результаты в состояние
			setToxicityResult(resultObj.results);
			setJsonResult(resultObj); // Сохраняем JSON результат
			setStage('result');
		} catch (error) {
			alert('Error checking toxicity:', error);
			const errorResult = {
				text: text,
				toxicityDetected: false,
				results: [
					{
						label: 'Произошла ошибка при проверке токсичности.',
						percentage: '0.00',
					},
				],
			};
			setToxicityResult(errorResult.results);
			setJsonResult(errorResult); // Сохраняем ошибку в JSON
		}
	};

	return (
		<div className={styles.home}>
			<div className={styles.homeBtns}>
				<div className={styles.homeBtns__item}>
					<label className={styles.homeBtns__itemBtn}>
						Загрузить файл
						<input
							type='file'
							accept='.txt'
							style={{ display: 'none' }}
							onChange={handleFileUpload}
						/>
					</label>
					{!fileName ? (
						<p className={styles.homeBtns__itemPlaceholder}>
							Вы не загрузили ни один файл
						</p>
					) : (
						<p className={styles.homeBtns__itemText}>{fileName}</p>
					)}
				</div>
			</div>

			<form
				className={styles.homeForm}
				onSubmit={e => {
					e.preventDefault();
					checkToxicity(); // Запускаем проверку при отправке формы
				}}
			>
				{stage === 'text' ? (
					<textarea
						className={styles.homeForm__textarea}
						placeholder='Вставьте текст для определения деструктивной составляющей текста'
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				) : stage === 'result' ? (
					<CheckTable result={jsonResult} />
				) : stage === 'linkResult' ? (
					<CheckTable stage={stage} />
				) : (
					<></>
				)}

				<button className={styles.homeForm__submit} type='submit'>
					Проверить
				</button>
			</form>

			{/* Вывод JSON результата */}
			{jsonResult && (
				<div className={styles.jsonResult}>
					<h3>JSON Результат:</h3>
					<pre>{JSON.stringify(jsonResult, null, 2)}</pre>
				</div>
			)}
		</div>
	);
};
