import types from './types';
import { handleActions } from 'redux-actions';
import { events, resourceMap } from '../dumy_data';

const initialState = {
  createAppoinment: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },

  getAppoinmentByDay: {
    loading: true,
    pending: false,
    hasError: false,
    // data: [],
    data: events,
    error: {},
  },

  updateAppoinment: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },

  deleteAppoinment: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },

  getEmployees: {
    loading: true,
    pending: false,
    hasError: false,
    // data: [],
    data: resourceMap,
    error: {},
  },

  getAllServices: {
    loading: true,
    pending: false,
    hasError: false,
    data: [],
    error: {},
  },

  selectSlot: {
    data: {},
  },
};

// Reducers from redux-actions
export default handleActions(
  {
    // ------------------ SELECT_SLOT -------------------
    [types.SELECT_SLOT]: (state, { payload }) => ({
      ...state,
      selectSlot: {
        ...state.selectSlot,
        data: payload?.event,
      },
    }),
    // ------------------ CREATE_APPOINMENT -------------------
    [types.CREATE_APPOINMENT]: (state, { payload }) => ({
      ...state,
      createAppoinment: {
        ...state.createAppoinment,
        loading: true,
        pending: true,
        hasError: false,
        error: {},
      },
    }),
    [types.CREATE_APPOINMENT_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        createAppoinment: {
          ...state.createAppoinment,
          loading: false,
          pending: false,
          data: payload,
        },
      };
    },
    [types.CREATE_APPOINMENT_FAILED]: (state, { payload }) => {
      return {
        ...state,
        createAppoinment: {
          ...state.createAppoinment,
          loading: false,
          pending: false,
          hasError: true,
          error: { payload },
        },
      };
    },

    // ------------------ GET_APPOINMENT_BY_DAY -------------------
    [types.GET_APPOINMENT_BY_DAY]: (state, { payload }) => ({
      ...state,
      getAppoinmentByDay: {
        ...state.getAppoinmentByDay,
        loading: true,
        pending: true,
        hasError: false,
        error: {},
      },
    }),
    [types.GET_APPOINMENT_BY_DAY_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        getAppoinmentByDay: {
          ...state.getAppoinmentByDay,
          loading: false,
          pending: false,
          data: payload,
        },
      };
    },

    [types.GET_APPOINMENT_BY_DAY_FAILED]: (state, { payload }) => {
      return {
        ...state,
        getAppoinmentByDay: {
          ...state.getAppoinmentByDay,
          loading: false,
          pending: false,
          hasError: true,
          error: { payload },
        },
      };
    },

    // ------------------ UPDATE_APPOINMENT -------------------
    [types.UPDATE_APPOINMENT]: (state, { payload }) => ({
      ...state,
      updateAppoinment: {
        ...state.updateAppoinment,
        loading: true,
        pending: true,
        hasError: false,
        error: {},
      },
    }),
    [types.UPDATE_APPOINMENT_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        updateAppoinment: {
          ...state.updateAppoinment,
          loading: false,
          pending: false,
          data: payload,
        },
      };
    },

    [types.UPDATE_APPOINMENT_FAILED]: (state, { payload }) => {
      return {
        ...state,
        updateAppoinment: {
          ...state.updateAppoinment,
          loading: false,
          pending: false,
          hasError: true,
          error: { payload },
        },
      };
    },

    // ------------------ DELETE_APPOINMENT -------------------
    [types.DELETE_APPOINMENT]: (state, { payload }) => ({
      ...state,
      deleteAppoinment: {
        ...state.deleteAppoinment,
        loading: true,
        pending: true,
        hasError: false,
        error: {},
      },
    }),
    [types.DELETE_APPOINMENT_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        deleteAppoinment: {
          ...state.deleteAppoinment,
          loading: false,
          pending: false,
          data: payload,
        },
      };
    },

    [types.DELETE_APPOINMENT_FAILED]: (state, { payload }) => {
      return {
        ...state,
        deleteAppoinment: {
          ...state.deleteAppoinment,
          loading: false,
          pending: false,
          hasError: true,
          error: { payload },
        },
      };
    },

    // ------------------ GET_EMPLOYEES -------------------
    [types.GET_EMPLOYEES]: (state, { payload }) => ({
      ...state,
      getEmployees: {
        ...state.getEmployees,
        loading: true,
        pending: true,
        hasError: false,
        error: {},
      },
    }),
    [types.GET_EMPLOYEES_SUCCESS]: (state, { payload }) => {
      return {
        ...state,
        getEmployees: {
          ...state.getEmployees,
          loading: false,
          pending: false,
          data: payload,
        },
      };
    },
    [types.GET_EMPLOYEES_FAILED]: (state, { payload }) => {
      return {
        ...state,
        getEmployees: {
          ...state.getEmployees,
          loading: false,
          pending: false,
          hasError: true,
          error: { payload },
        },
      };
    },



        // ------------------ GET_ALL_SERVICES -------------------
        [types.GET_ALL_SERVICES]: (state, { payload }) => ({
          ...state,
          getAllServices: {
            ...state.getAllServices,
            loading: true,
            pending: true,
            hasError: false,
            error: {},
          },
        }),
        [types.GET_ALL_SERVICES]: (state, { payload }) => {
          return {
            ...state,
            getAllServices: {
              ...state.getAllServices,
              loading: false,
              pending: false,
              data: payload,
            },
          };
        },
        [types.GET_ALL_SERVICES]: (state, { payload }) => {
          return {
            ...state,
            getAllServices: {
              ...state.getAllServices,
              loading: false,
              pending: false,
              hasError: true,
              error: { payload },
            },
          };
        },

  },
  initialState,
);
