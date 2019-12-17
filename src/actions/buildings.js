import { ENDPOINTS } from '../constants';
import { getAuthToken } from '../selectors/user';
import {
  RECEIVE_GET_BUILDINGS,
  RECEIVE_PATCH_BUILDING,
  RECEIVE_PATCH_BUILDING_PERMISSION,
  RECEIVE_POST_BUILDING_PERMISSION,
  RECEIVE_DELETE_BUILDING_PERMISSION,
} from './types';
import { fetchWithAuth } from './helpers';

export const addNewBuilding = (userData) => fetch(ENDPOINTS.buildings.many(), {
  body: JSON.stringify(userData),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
})
  .then((res) => res.json())
  .then((data) => data);
  // TODO: Dispatch RECEIVE_POST_BUILDING action

export const fetchBuildings = () => (dispatch) => {
  const url = ENDPOINTS.buildings.many();

  return dispatch(fetchWithAuth({
    url,
  }))
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_GET_BUILDINGS,
      });
    });
};

export const updateBuilding = (buildingId, values) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  const formBody = {
    address: values.address,
    city: values.city,
    company: values.company,
    country: values.country,
    name: values.name,
  };

  return fetch(ENDPOINTS.buildings.one(buildingId), {
    body: JSON.stringify(formBody),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_PATCH_BUILDING,
      });
    });
};

export const updateBuildingPermission = (permissionId, buildingId, userId, role) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  const formBody = {
    role,
    userId,
  };

  return fetch(ENDPOINTS.buildings.permissions(buildingId), {
    body: JSON.stringify(formBody),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
  }).then((res) => res.json())
    .then(() => {
      dispatch({
        payload: {
          id: permissionId,
          role,
        },
        type: RECEIVE_PATCH_BUILDING_PERMISSION,
      });
    });
};

export const addBuildingPermission = (buildingId, email, role) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  const formBody = {
    email,
    role,
  };

  return fetch(ENDPOINTS.buildings.permissions(buildingId), {
    body: JSON.stringify(formBody),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_POST_BUILDING_PERMISSION,
      });
      return data;
    });
};

export const deleteBuildingPermission = (buildingId, userId, permissionId) => (dispatch, getState) => {
  const state = getState();
  const token = getAuthToken(state);

  const formBody = {
    userId,
  };

  return fetch(ENDPOINTS.buildings.permissions(buildingId), {
    body: JSON.stringify(formBody),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
  }).then((res) => res.json())
    .then(() => {
      dispatch({
        payload: {
          id: permissionId,
        },
        type: RECEIVE_DELETE_BUILDING_PERMISSION,
      });
    });
};

export const uploadBuildingCoverImage = (buildingId, file) => (dispatch) => {
  const url = ENDPOINTS.buildings.cover(buildingId);

  const formData = new FormData();
  formData.append('file', file);

  return dispatch(fetchWithAuth({
    body: formData,
    method: 'POST',
    skipContentType: true,
    url,
  }))
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        payload: data,
        type: RECEIVE_PATCH_BUILDING,
      });
    });
};
