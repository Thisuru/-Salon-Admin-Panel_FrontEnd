// Actions
import { createAction } from 'redux-actions';
import types from './types';

export default {
  createAppoinment: createAction(types.CREATE_APPOINMENT),
  createAppoinmentSuccess: createAction(types.CREATE_APPOINMENT_SUCCESS),
  createAppoinmentFail: createAction(types.CREATE_APPOINMENT_FAILED),

  getAppoinmentByDay: createAction(types.GET_APPOINMENT_BY_DAY),
  getAppoinmentByDaySuccess: createAction(types.GET_APPOINMENT_BY_DAY_SUCCESS),
  getAppoinmentByDayFail: createAction(types.GET_APPOINMENT_BY_DAY_FAILED),

  updateAppoinment: createAction(types.UPDATE_APPOINMENT),
  updateAppoinmentSuccess: createAction(types.UPDATE_APPOINMENT_SUCCESS),
  updateAppoinmentFail: createAction(types.UPDATE_APPOINMENT_FAILED),

  deleteAppoinment: createAction(types.DELETE_APPOINMENT),
  deleteAppoinmentSuccess: createAction(types.DELETE_APPOINMENT_SUCCESS),
  deleteAppoinmentFail: createAction(types.DELETE_APPOINMENT_FAILED),

  getEmployees: createAction(types.GET_EMPLOYEES), // team member ?? + current appointments for specific day
  getEmployeesSuccess: createAction(types.GET_EMPLOYEES_SUCCESS),
  getEmployeesFail: createAction(types.GET_EMPLOYEES_FAILED),

  // Wendy Smith isn’t working between 06:45 and 07:35, but your team member can still book appointments for them.

  selectSlot: createAction(types.SELECT_SLOT),

  getAllServices: createAction(types.GET_ALL_SERVICES), // service name(time), price and duration
  getAllServicesSuccess: createAction(types.GET_ALL_SERVICES_SUCCESS),
  getAllServicesFail: createAction(types.GET_ALL_SERVICES_FAILED),
};
