import React, {useState} from 'react';
import classNames from 'classnames';
import styles from './List.scss';
import Resize from '@/components/Resize';
import Title from '@/components/Title';
import ListItem from '@/components/ListItem';
import {connect} from "react-redux";
import { getCountry, getParameter, getActiveScreen } from '@/store/app/selector';
import { ActionCreator } from '@/store/app/app';
import { Parameter, Screen } from '@/constants/constants';
import { CountryDataInterface, StateInterface } from '@/types/entities';
import { Dispatch } from 'redux';
import { getCountriesData } from '@/store/data/selector';
import getShownCountriesData from '@/utils/countries-data';

interface ListProps {
  fullScreen: Screen;
  country: string;
  parameter: Parameter;
  countriesData: Array<CountryDataInterface>;
  changeCountry(country: string): void;
  changeActiveScreen(screen: Screen): void;
}

const List: React.FC<ListProps> = (props: ListProps) => {
  const { fullScreen, country, parameter, countriesData, changeCountry, changeActiveScreen } = props;
  const shownCountriesData = getShownCountriesData(countriesData, parameter);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const changeScreenView = () => {
    isFullScreen ? changeActiveScreen(Screen.ALL) : changeActiveScreen(Screen.LIST);
    setIsFullScreen(prev => !prev);
  };

  let listClass = '';
  if (isFullScreen) {
    listClass = classNames(styles['list'], styles['grid__element'], styles['grid__element--show']);
  } else if (!isFullScreen && fullScreen !== Screen.ALL) {
    listClass = classNames(styles['list'], styles['grid__element'], styles['grid__element--hide']);
  } else {
    listClass = classNames(styles['list'], styles['grid__element']);
  }

  return (
    <div className={listClass}>
      <Resize isFullScreen={isFullScreen} onClick={changeScreenView}/>
      <Title/>
      <ul className={styles['list__items']}>
        {shownCountriesData.map((countryData) =>
          <ListItem
            key={countryData.country}
            countryData={countryData}
            activeCountry={country}
            onCountryClick={changeCountry}
          />
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state: StateInterface) => ({
  fullScreen: getActiveScreen(state),
  country: getCountry(state),
  parameter: getParameter(state),
  countriesData: getCountriesData(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeCountry(country: string) {
    dispatch(ActionCreator.changeCountry(country));
  },
  changeActiveScreen(screen: Screen) {
    dispatch(ActionCreator.changeActiveScreen(screen));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
