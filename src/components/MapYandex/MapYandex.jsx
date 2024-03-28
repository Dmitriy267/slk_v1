import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

export const MapYandex = ({ width, height }) => {
  const defaultState = {
    center: [53.524348, 49.30036],
    zoom: 15,
    width: width,
    height: height
  };

  return (
    <YMaps
      query={{
        apikey: process.env.REACT_APP_YANDEX_KEY,
        lang: 'ru_RU',
        load: 'package.full'
      }}
    >
      <Map defaultState={defaultState} width={defaultState.width} height={defaultState.height}>
        <Placemark geometry={[53.524348, 49.30036]} />
      </Map>
    </YMaps>
  );
};
