import React from 'react';
import classNames from 'classnames';
import styles from './Table.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';

const Table: React.FC = () => {
  return (
    <div className={classNames(
      styles['table'],
      styles['grid__element']
    )}>
      <Resize/>
      <Title/>
      <table className={styles['table__content']}>
        <tbody>
          <tr className={classNames(
            styles['table__row'],
            styles['table__row--active']
          )}>
            <th className={styles['table__title']}>Confirmed</th>
            <td className={styles['table__info']}>496 156</td>
          </tr>
          <tr className={styles['table__row']}>
            <th className={styles['table__title']}>Deaths</th>
            <td className={styles['table__info']}>8 443</td>
          </tr>
          <tr className={styles['table__row']}>
            <th className={styles['table__title']}>Recovered</th>
            <td className={styles['table__info']}>245 021 </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;