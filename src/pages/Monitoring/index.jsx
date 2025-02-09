import styles from './Monitoring.module.scss';
import barChartFirst from '../../assets/img/bar-chart-1.svg';
import barChartSecond from '../../assets/img/bar-chart-2.svg';
import barChartThird from '../../assets/img/bar-chart-3.svg';
import lineChartFirst from '../../assets/img/line-chart-1.svg';
import lineChartSecond from '../../assets/img/line-chart-2.svg';
import lineChartThird from '../../assets/img/line-chart-3.svg';

export const Monitoring = () => {
	return (
		<div className={styles.monitoring}>
			<div className={styles.monitoringWrapper}>
				<div className={styles.monitoringWrapper__item}>
					<div className={styles.monitoringWrapper__itemTop}>
						<p className={styles.monitoringWrapper__itemTop__title}>
							Количество проанализированных документов
						</p>
					</div>
					<img
						className={styles.monitoringWrapper__itemChart}
						src={barChartFirst}
						alt='chart'
					/>
					<div className={styles.monitoringWrapper__itemBottom}>
						<div className={styles.monitoringWrapper__itemBottom__item}>
							<div
								className={styles.monitoringWrapper__itemBottom__itemPurple}
							></div>
							<p className={styles.monitoringWrapper__itemBottom__itemText}>
								В прошлом месяце (24)
							</p>
						</div>
						<div className={styles.monitoringWrapper__itemBottom__item}>
							<div
								className={styles.monitoringWrapper__itemBottom__itemRed}
							></div>
							<p className={styles.monitoringWrapper__itemBottom__itemText}>
								В этом месяце (18)
							</p>
						</div>
					</div>
				</div>
				<div className={styles.monitoringWrapper__line}></div>
				<div className={styles.monitoringWrapper__item}>
					<div className={styles.monitoringWrapper__itemTop}>
						<p className={styles.monitoringWrapper__itemTop__title}>
							Количество проанализированных сайтов
						</p>
					</div>
					<img
						className={styles.monitoringWrapper__itemChart}
						src={barChartSecond}
						alt='chart'
					/>
					<div className={styles.monitoringWrapper__itemBottom}>
						<div className={styles.monitoringWrapper__itemBottom__item}>
							<div
								className={styles.monitoringWrapper__itemBottom__itemPurple}
							></div>
							<p className={styles.monitoringWrapper__itemBottom__itemText}>
								В прошлом месяце (24)
							</p>
						</div>
						<div className={styles.monitoringWrapper__itemBottom__item}>
							<div
								className={styles.monitoringWrapper__itemBottom__itemRed}
							></div>
							<p className={styles.monitoringWrapper__itemBottom__itemText}>
								В этом месяце (18)
							</p>
						</div>
					</div>
				</div>
				<div className={styles.monitoringWrapper__line}></div>
				<div className={styles.monitoringWrapper__item}>
					<div className={styles.monitoringWrapper__itemTop}>
						<p className={styles.monitoringWrapper__itemTop__title}>
							Количество проанализированных текстов
						</p>
					</div>
					<img
						className={styles.monitoringWrapper__itemChart}
						src={barChartThird}
						alt='chart'
					/>
					<div className={styles.monitoringWrapper__itemBottom}>
						<div className={styles.monitoringWrapper__itemBottom__item}>
							<div
								className={styles.monitoringWrapper__itemBottom__itemPurple}
							></div>
							<p className={styles.monitoringWrapper__itemBottom__itemText}>
								В прошлом месяце (24)
							</p>
						</div>
						<div className={styles.monitoringWrapper__itemBottom__item}>
							<div
								className={styles.monitoringWrapper__itemBottom__itemRed}
							></div>
							<p className={styles.monitoringWrapper__itemBottom__itemText}>
								В этом месяце (18)
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.monitoringWrapper}>
				<div className={styles.monitoringWrapper__item}>
					<div className={styles.monitoringWrapper__itemTop}>
						<p className={styles.monitoringWrapper__itemTop__title}>
							Динамика количества проверок
						</p>
						<p className={styles.monitoringWrapper__itemTop__period}>Неделя</p>
					</div>
					<img
						className={styles.monitoringWrapper__itemChart}
						src={lineChartFirst}
						alt='chart'
					/>
				</div>
				<div className={styles.monitoringWrapper__line}></div>
				<div className={styles.monitoringWrapper__item}>
					<div className={styles.monitoringWrapper__itemTop}>
						<p className={styles.monitoringWrapper__itemTop__title}></p>
						<p className={styles.monitoringWrapper__itemTop__period}>Месяц</p>
					</div>
					<img
						className={styles.monitoringWrapper__itemChart}
						src={lineChartSecond}
						alt='chart'
					/>
				</div>
				<div className={styles.monitoringWrapper__line}></div>
				<div className={styles.monitoringWrapper__item}>
					<div className={styles.monitoringWrapper__itemTop}>
						<p className={styles.monitoringWrapper__itemTop__title}></p>
						<p className={styles.monitoringWrapper__itemTop__period}>Месяц</p>
					</div>
					<img
						className={styles.monitoringWrapper__itemChart}
						src={lineChartThird}
						alt='chart'
					/>
				</div>
			</div>
			<div className={styles.monitoringDes}>
				<div className={styles.monitoringDes__item}>
					<div className={styles.monitoringDes__itemFirst}></div>
					<p className={styles.monitoringDes__itemText}>Текст</p>
				</div>
				<div className={styles.monitoringDes__item}>
					<div className={styles.monitoringDes__itemSecond}></div>
					<p className={styles.monitoringDes__itemText}>Сайт</p>
				</div>
				<div className={styles.monitoringDes__item}>
					<div className={styles.monitoringDes__itemThird}></div>
					<p className={styles.monitoringDes__itemText}>Файл</p>
				</div>
			</div>
			<button className={styles.monitoringBtn}>История скачиваний</button>
		</div>
	);
};
