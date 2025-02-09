import styles from './CheckTable.module.scss';

export const CheckTable = ({ result }) => {
	// Если данных нет, выводим сообщение
	if (!result) {
		return <p>Нет данных для отображения.</p>;
	}

	// Достаем данные из JSON
	const { text, results } = result;

	// Карта по умолчанию для всех меток
	const defaultData = {
		'Нецензурная лексика': '0.00%',
		'Опасный контент': '0.00%',
		Оскорбление: '0.00%',
		Угроза: '0.00%',
		'В тексте не найдены метки диструктивной информации': '0.00%',
	};

	// Обновляем данные из results, игнорируя избыточные метки
	results.forEach(item => {
		if (defaultData.hasOwnProperty(item.label)) {
			defaultData[item.label] = `${item.percentage}%`;
		}
	});

	return (
		<table className={styles.table}>
			<thead className={styles.tableHead}>
				<tr className={styles.tableHead__item}>
					<th className={styles.tableHead__item1}>Текст</th>
					<th className={styles.tableHead__item2}>Нецензурная лексика</th>
					<th className={styles.tableHead__item3}>Опасный контент</th>
					<th className={styles.tableHead__item4}>Оскорбления</th>
					<th className={styles.tableHead__item5}>Угроза</th>
					<th className={styles.tableHead__item6}>
						В тексте не найдены метки деструктивной информации
					</th>
				</tr>
			</thead>
			<tbody className={styles.tableBody}>
				<tr className={styles.tableBody__item}>
					{/* Вывод текста */}
					<td className={styles.tableBody__item1}>{text || '—'}</td>
					{/* Вывод значений по категориям */}
					<td className={styles.tableBody__item2}>
						{defaultData['Нецензурная лексика']}
					</td>
					<td className={styles.tableBody__item3}>
						{defaultData['Опасный контент']}
					</td>
					<td className={styles.tableBody__item4}>
						{defaultData['Оскорбление']}
					</td>
					<td className={styles.tableBody__item5}>{defaultData['Угроза']}</td>
					<td className={styles.tableBody__item6}>
						{defaultData['В тексте не найдены метки диструктивной информации']}
					</td>
				</tr>
			</tbody>
		</table>
	);
};
