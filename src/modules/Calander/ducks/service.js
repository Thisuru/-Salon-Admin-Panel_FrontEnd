import { createLogic } from 'redux-logic';
import actions from './actions';
import types from './types';
import API from '../../../util/HTTPClient';
import EndPoints from '../../../util/EndPoints';
// import { NotificationManager } from "react-notifications";

const createAppoinment = createLogic({
  type: types.CREATE_APPOINMENT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, getState, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log('Running signIn Service');

    HTTPClient.Post(EndPoints.LOGIN, action.payload.signInDto)
      .then((resp) => resp.data)
      .then((data) => {
        // NotificationManager.success("Title", "Message");
        dispatch(actions.createAppoinmentSuccess(data));
      })
      .catch((err) => {
        var errorMessage = err?.response?.data?.error || 'Sign in failed.';

        dispatch(
          actions.createAppoinmentFail({
            title: 'Error!',
            message: errorMessage,
          }),
        );
      })
      .then(() => done());
  },
});

const getAppoinmentByDay = createLogic({
  type: types.GET_APPOINMENT_BY_DAY,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, getState, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log('Running signIn Service');

    HTTPClient.Post(EndPoints.LOGIN, action.payload.signInDto)
      .then((resp) => resp.data)
      .then((data) => {
        // NotificationManager.success("Title", "Message");
        dispatch(actions.getAppoinmentByDaySuccess(data));
      })
      .catch((err) => {
        var errorMessage = err?.response?.data?.error || 'Sign in failed.';
        dispatch(
          actions.getAppoinmentByDayFail({
            title: 'Error!',
            message: errorMessage,
          }),
        );
      })
      .then(() => done());
  },
});

const updateAppoinment = createLogic({
  type: types.UPDATE_APPOINMENT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, getState, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log('Running signIn Service');

    HTTPClient.Post(EndPoints.LOGIN, action.payload.signInDto)
      .then((resp) => resp.data)
      .then((data) => {
        // NotificationManager.success("Title", "Message");
        dispatch(actions.updateAppoinmentSuccess(data));
      })
      .catch((err) => {
        var errorMessage = err?.response?.data?.error || 'Sign in failed.';

        dispatch(
          actions.updateAppoinmentFail({
            title: 'Error!',
            message: errorMessage,
          }),
        );
      })
      .then(() => done());
  },
});

const deleteAppoinment = createLogic({
  type: types.DELETE_APPOINMENT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, getState, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log('Running signIn Service');

    HTTPClient.Post(EndPoints.LOGIN, action.payload.signInDto)
      .then((resp) => resp.data)
      .then((data) => {
        // NotificationManager.success("Title", "Message");
        dispatch(actions.deleteAppoinmentSuccess(data));
      })
      .catch((err) => {
        var errorMessage = err?.response?.data?.error || 'Sign in failed.';
        dispatch(
          actions.deleteAppoinmentFail({
            title: 'Error!',
            message: errorMessage,
          }),
        );
      })
      .then(() => done());
  },
});

const getEmployees = createLogic({
  type: types.DELETE_APPOINMENT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, getState, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log('Running signIn Service');

    HTTPClient.Post(EndPoints.LOGIN, action.payload.signInDto)
      .then((resp) => resp.data)
      .then((data) => {
        // NotificationManager.success("Title", "Message");
        dispatch(actions.getEmployeesSuccess(data));
      })
      .catch((err) => {
        var errorMessage = err?.response?.data?.error || 'Sign in failed.';
        dispatch(
          actions.getEmployeesFail({
            title: 'Error!',
            message: errorMessage,
          }),
        );
      })
      .then(() => done());
  },
});

const getAllServices = createLogic({
  type: types.GET_ALL_SERVICES,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, getState, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log('Running get All services Service');

    HTTPClient.Post(EndPoints.LOGIN, action.payload.signInDto)
      .then((resp) => resp.data)
      .then((data) => {
        // NotificationManager.success("Title", "Message");
        dispatch(actions.getAllServicesSuccess(data));
      })
      .catch((err) => {
        var errorMessage = err?.response?.data?.error || 'get all services failed.';

        dispatch(
          actions.getAllServicesFail({
            title: 'Error!',
            message: errorMessage,
          }),
        );
      })
      .then(() => done());
  },
});

export default [
  createAppoinment,
  getAppoinmentByDay,
  updateAppoinment,
  deleteAppoinment,
  getEmployees,
];
