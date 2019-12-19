import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import loadGoogleMaps from 'load-google-maps-api';
import clsx from 'clsx';
import { push } from 'connected-react-router';
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from '@material-ui/core';

import { getBuildings } from '../../../selectors/buildings';
import { ROUTES } from '../../../constants';

import s from './index.module.scss';

// TODO:
let maps;
let map;
let geocoder;

function BuildingList() {
  const dispatch = useDispatch();
  const buildings = useSelector(getBuildings);

  const mapRef = useCallback((node) => {
    if (process.env.NODE_ENV === 'development') return;

    loadGoogleMaps({
      key: process.env.REACT_APP_FIREBASE_API_KEY,
      libraries: [
        'places',
      ],
    }).then((m) => {
      maps = m;
      map = new maps.Map(node, {
        center: {
          lat: 0,
          lng: 0,
        },
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 12,
      });
      geocoder = new maps.Geocoder();
    });
  }, []);

  useEffect(() => {
    if (!map || !geocoder) {
      return;
    }

    buildings.forEach((building) => {
      const address = `${building.address} ${building.city} ${building.country}`;
      geocoder.geocode({
        address,
      }, (results, status) => {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
          // eslint-disable-next-line no-unused-vars
          const marker = new maps.Marker({
            map,
            position: results[0].geometry.location,
          });
        } else {
          alert(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  }, [buildings]);

  const itemList = buildings.map((building) => (
    <React.Fragment key={building.id}>
      <ListItem
        alignItems="flex-start"
        button
        disableRipple
        onClick={() => dispatch(push(ROUTES.building.main(building.id)))}
      >
        <ListItemAvatar>
          <Avatar alt={building.name} className={s.avatar} src={building.coverPath} variant="square" />
        </ListItemAvatar>
        <ListItemText
          primary={building.name}
          secondary={(
            <>
              <Typography
                className={s.company}
                component="span"
                variant="body2"
              >
                {building.company}
              </Typography>
              {`${building.address}, ${building.city}`}
            </>
          )}
        />
      </ListItem>
      <Divider component="li" />
    </React.Fragment>
  ));

  return (
    <Grid
      className={s.root}
      container
      spacing={4}
    >
      <Grid className={s.item} item>
        <List>
          {itemList}
        </List>
      </Grid>
      <Grid className={clsx(s.mapWrapper, s.item)} item>
        <div className={s.map} ref={mapRef} />
      </Grid>
    </Grid>
  );
}

export default BuildingList;
