const initialState = {
  user: null,
  loader: false,
  workspaces: [],
  employees: [],
  roles: [],
  groups: [],
  shares: [],
  trashes: [],
  stars: [],
  filteredData: [],
  starsFilterData: [],
  trashesFilterData: [],
  workspacesFilterData: [],
  sharesFilterData: [],
  searchQuery: "",
  searchQueryFilter: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS_DATA":
      return {
        ...state,
        user: action.payload,
        loader: false,
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_SEARCH_QUERY_FILTER":
      return { ...state, searchQueryFilter: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        user: null,
        loader: false,
        workspaces: [],
        employees: [],
        roles: [],
        groups: [],
        shares: [],
        trashes: [],
        stars: [],
        filteredData: [],
        dashboardData: {},
      };

    case "SET_WORKSPACES":
      if (action.payload.length === 0) {
        return {
          ...state,
          workspaces: action.payload,
          loading: false,
        };
      } else {
        const WorkspaceData = action.payload.filter(
          (newCard) =>
            !state.workspacesFilterData.some(
              (prevCard) => prevCard._id === newCard._id,
            ),
        );

        return {
          ...state,
          workspaces: action.payload,
          workspacesFilterData: [
            ...state.workspacesFilterData,
            ...WorkspaceData,
          ],
          loading: false,
        };
      }
    case "RESET_STATE_WORKSPACE":
      return {
        ...state,
        workspacesFilterData: action.payload,
      };
    case "UPDATE_WORKSPACE":
      return {
        ...state,
        workspacesFilterData: state.workspacesFilterData.map((item) =>
          item._id === action.payload.workspaceId
            ? { ...item, star: action.payload.starred }
            : item,
        ),
      };

    case "DELETE_WORKSPACES":
      return {
        ...state,
        workspacesFilterData: state.workspacesFilterData.filter(
          (item) => item._id !== action.payload,
        ),
      };
    case "SET_DASHBOARDDATA":
      return {
        ...state,
        dashboardData: action.payload,
        loader: false,
      };
    case "SET_EMPLOYEE":
      return {
        ...state,
        employees: [action.payload, ...state.employees],
        loader: false,
      };
    case "SET_EMPLOYEES":
      return {
        ...state,
        employees: action.payload,
        loader: false,
      };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((obj) => {
          return obj._id !== action.payload;
        }),
        loader: false,
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee._id === action.payload._id ? action.payload : employee,
        ),
        loader: false,
      };
    case "SET_ROLE":
      return {
        ...state,
        roles: [...state.roles, action.payload],
        loader: false,
      };

    case "UPDATE_ROLE":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role._id === action.payload._id ? action.payload : role,
        ),
        loader: false,
      };

    case "SET_ROLES":
      return {
        ...state,
        roles: action.payload,
        loader: false,
      };
    case "DELETE_ROLE":
      return {
        ...state,
        roles: state.roles.map((role) =>
          role._id === action.payload._id ? action.payload : role,
        ),
        loader: false,
      };
    case "SET_GROUP":
      return {
        ...state,
        groups: [...state.groups, action.payload],
        loader: false,
      };
    case "SET_GROUPS":
      return {
        ...state,
        groups: action.payload,
        loader: false,
      };

    case "DELETE_GROUP":
      return {
        ...state,
        groups: state.groups.map((group) =>
          group._id === action.payload._id ? action.payload : group,
        ),
        loader: false,
      };
    case "SHARE_WITH_ME":
      if (action.payload.length === 0) {
        return {
          ...state,
          shares: action.payload,
          loading: false,
        };
      } else {
        const sharesData = action.payload.filter(
          (newCard) =>
            !state.sharesFilterData.some(
              (prevCard) => prevCard._id === newCard._id,
            ),
        );

        return {
          ...state,
          shares: action.payload,
          sharesFilterData: [...state.sharesFilterData, ...sharesData],
          loading: false,
        };
      }
    case "RESET_STATE_SHARE_WITH_ME":
      return {
        ...state,
        sharesFilterData: action.payload,
      };

    case "DELETE_SHARE_WORKSPACES":
      return {
        ...state,
        sharesFilterData: state.sharesFilterData.filter(
          (item) => item._id !== action.payload,
        ),
      };
    case "SET_TRASH":
      if (action.payload.length === 0) {
        return {
          ...state,
          trashes: action.payload,
          loading: false,
        };
      } else {
        const trashData = action.payload.filter(
          (newCard) =>
            !state.trashesFilterData.some(
              (prevCard) => prevCard._id === newCard._id,
            ),
        );

        return {
          ...state,
          trashes: action.payload,
          trashesFilterData: [...state.trashesFilterData, ...trashData],
          loading: false,
        };
      }
    case "RESET_STATE_TRASH":
      return {
        ...state,
        trashesFilterData: action.payload,
      };
    case "UPDATE_TRASH":
      return {
        ...state,
        trashesFilterData: state.trashesFilterData.filter(
          (item) => item._id !== action.payload,
        ),
      };
    case "SET_STARS":
      if (action.payload.length === 0) {
        return {
          ...state,
          stars: action.payload,
          loading: false,
        };
      } else {
        const starData = action.payload.filter(
          (newCard) =>
            !state.starsFilterData.some(
              (prevCard) => prevCard._id === newCard._id,
            ),
        );

        return {
          ...state,
          stars: action.payload,
          starsFilterData: [...state.starsFilterData, ...starData],
          loading: false,
        };
      }
    case "RESET_STATE":
      return {
        ...state,
        starsFilterData: action.payload,
      };
    case "UPDATE_STAR":
      return {
        ...state,
        starsFilterData: state.starsFilterData.filter(
          (item) => item._id !== action.payload.workspaceId,
        ),
      };

    default:
      return state;
  }
};

export default userReducer;
