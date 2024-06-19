import { urlHelper } from "../helper/urlHelper";
import jwtDecode from "jwt-decode";
import axiosInstance from "../helper/setAuthToken";
import axios from "axios";
import Cookies from "js-cookie";
// import { useAlert } from "react-alert";

export const userLoginHelper = (data) => {
  return (dispatch) => {
    // Decode the token
    const decodedToken = jwtDecode(data);
    // Dispatch an action to set the user data and decoded token
    dispatch({
      type: "SET_USERS_DATA",
      payload: decodedToken?._doc,
    });
  };
};
// to search
export const searchQueryText = (query) => ({
  type: "SET_SEARCH_QUERY",
  payload: query,
});

export const userLogout = (
  navigate,
  clearCookieFromAllDomains,
  removeCookie,
  callback,
) => {
  return (dispatch) => {
    clearCookieFromAllDomains();
    removeCookie("token");
    delete axios.defaults.headers.common["x-access-token"];
    dispatch({
      type: "USER_LOGOUT",
    });
    navigate("/");
    callback("Logout Successfully");
  };
};

export const userLogin = (userLoginCredentials, navigate, callback) => {
  return async () => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/deployer/login`,
        data: userLoginCredentials,
      });

      if (data.success) {
        const { drivetoken } = data;
        if (data) {
          userLoginHelper(drivetoken);
          Cookies.set("account_token", drivetoken);
          // Cookies.set('dev_account_token', drivetoken);

          window.location.reload();
          callback(data.message);
        }
      }
    } catch (err) {
      if (err?.response) {
        callback(err?.response?.data?.message);
      }
    }
  };
};

// Get User Profile
export const getProfile = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Get",
        url: `${urlHelper}/drive/user/getProfile`,
      });

      if (data.data) {
        dispatch({
          type: "SET_USERS_DATA",
          payload: data.data,
        });
      }
    } catch (err) {
      if (err?.response) {
        alert(err?.response?.data?.message);
      }
    }
  };
};
export const editProfile = (userData, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/user/editUserProfile`,
        data: userData,
      });
      if (data.data) {
        dispatch(getProfile());
        callback(data.message, "success");
      }
    } catch (err) {
      if (err?.response) {
        callback(err?.response?.data?.message, "error");
      }
    }
  };
};

// Reset Password
export const resetPassword = (body, callback) => {
  return async () => {
    try {
      const data = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/user/resetPass`,
        data: body,
      });

      if (data.status === 200) {
        callback(`${data?.data?.message}`, "success");
      }
    } catch (err) {
      callback(`${err?.response?.data.message}`, "error");
    }
  };
};

// WORKSPACE

export const getAllWorkspace = (selected) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post(
      `${urlHelper}/drive/workspace/getAllWorkspace`,
      {
        page_size: 40,
        page_number: selected,
      },
    );
    if (data.data) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: data.data,
      });
    }
  } catch (err) {
    console.error("Error fetching workspace:", err);
  }
};
export const getCountWorkspace = () => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(
      `${urlHelper}/drive/workspace/dashboard/countData`,
    );
    if (data.data) {
      dispatch({
        type: "SET_DASHBOARDDATA",
        payload: data?.data,
      });
    }
  } catch (err) {
    console.error("Error fetching workspace:", err);
  }
};
// tempDeleteWorkspace
export const tempDeleteWorkspace =
  (appId, id, callback) => async (dispatch) => {
    try {
      const { data } = await axiosInstance.get(
        `${urlHelper}/drive/workspace/tempDeleteWorkspace/${id}/${appId}`,
      );
      if (data.message) {
        dispatch({
          type: "DELETE_WORKSPACES",
          payload: id,
        });
        dispatch({
          type: "DELETE_SHARE_WORKSPACES",
          payload: id,
        });
        callback(data.message);
      }
    } catch (err) {
      console.error("Error in restoring workspaces.", err);
    }
  };
// Restore Workspace
export const restoreWorkspace = (id, appId, callback) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.get(
      `${urlHelper}/drive/workspace/restoreWorkspace/${id}/${appId}`,
    );
    if (data.message) {
      dispatch({
        type: "UPDATE_TRASH",
        payload: id,
      });
      callback(data.message);
    }
  } catch (err) {
    console.error("Error in restoring workspaces.", err);
  }
};

// Delete Workspace
export const deleteWorkspace = (id, appId, callback) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.delete(
      `${urlHelper}/drive/workspace/deleteWorkspace/${id}/${appId}`,
    );

    if (data.message) {
      dispatch({
        type: "UPDATE_TRASH",
        payload: id,
      });
      callback(data.message);
    }
  } catch (err) {
    if (err) {
      console.error("failed to restore workspace");
    }
  }
};

// EMPLOYEE
export const addEmployee = (employeeCredentials, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/user/add`,
        data: employeeCredentials,
      });

      if (data.message === "User added successfully.") {
        callback(data.message, "success");
        dispatch(getEmployees());
      }
    } catch (err) {
      callback(`${err?.response?.data.message}`, "error");
    }
  };
};

export const editEmployee = (employeeCredentials, _id, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Put",
        url: `${urlHelper}/drive/user/update/${_id}`,
        data: employeeCredentials,
      });

      if (data) {
        dispatch({
          type: "UPDATE_EMPLOYEE",
          payload: data.result,
        });
        callback(data.message);
        dispatch(getEmployees());
      }
    } catch (err) {
      callback(`${err?.response?.data.message}`, "error");
    }
  };
};

export const deleteEmployee = (_id, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Delete",
        url: `${urlHelper}/drive/user/delete/${_id}`,
      });
      if (data) {
        dispatch({
          type: "DELETE_EMPLOYEE",
          payload: _id,
        });
        callback("Employee deleted successfully.");
        dispatch(getEmployees());
      }
    } catch (err) {
      callback("Error in deleting Employee.");
    }
  };
};

export const getEmployees = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Get",
        url: `${urlHelper}/drive/user`,
      });
      if (data.data) {
        dispatch({
          type: "SET_EMPLOYEES",
          payload: data.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};

// ROLE
export const createRole = (roleCredential, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/role/add`,
        data: roleCredential,
      });
      if (data.success) {
        dispatch({
          type: "SET_ROLE",
          payload: data.result,
        });
        callback("Role added successfully!!", "success");
      }
    } catch (err) {
      callback(`${err?.response?.data.message}`, "error");
    }
  };
};

export const editRole = (roleCredential, callback) => {
  return async (dispatch) => {
    try {
      //
      const { data } = await axiosInstance({
        method: "Put",
        url: `${urlHelper}/drive/role/update`,
        data: roleCredential,
      });

      if (data.success) {
        dispatch({
          type: "UPDATE_ROLE",
          payload: data.result,
        });
        callback("Role updated successfully!", "success");
      }
    } catch (err) {
      callback(`${err?.response?.data.message}`, "error");
    }
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Get",
        url: `${urlHelper}/drive/role`,
      });
      if (data.success) {
        dispatch({
          type: "SET_ROLES",
          payload: data.data,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};
export const getRoleById = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Get",
        url: `${urlHelper}/drive/role`,
      });

      if (data.success) {
        dispatch({
          type: "SET_ROLE_BY_ID",
          payload: data.result,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteRole = (roleId, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Delete",
        url: `${urlHelper}/drive/role/delete/${roleId}`,
      });
      //
      if (data.success) {
        dispatch({
          type: "DELETE_ROLE",
          payload: data.result,
        });
        callback("Role deleted successfully!!");
        dispatch(getRoles());
      }
    } catch (err) {
      callback("Error in Role deleting");
    }
  };
};

// GROUP
export const createGroup = (groupCredential, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/group/add`,
        data: groupCredential,
      });
      if (data.success) {
        dispatch({
          type: "SET_GROUP",
          payload: data.result,
        });
        dispatch(getGroups());
        callback("Group added successfully!");
      }
    } catch (err) {
      callback(`${err?.response?.data?.message}`);
    }
  };
};

export const getGroups = () => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Get",
        url: `${urlHelper}/drive/group/`,
      });
      if (data.success) {
        dispatch({
          type: "SET_GROUPS",
          payload: data.result,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteGroup = (groupId, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Delete",
        url: `${urlHelper}/drive/group/delete/${groupId}`,
      });
      if (data.success) {
        dispatch({
          type: "DELETE_GROUP",
          payload: data,
        });
        dispatch(getGroups());
        callback("Group deleted successfully!");
      }
    } catch (err) {
      callback("Error in group deleting");
    }
  };
};

export const updateGroup = (groupCredential, groupId, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Put",
        url: `${urlHelper}/drive/group/update/${groupId}`,
        data: groupCredential,
      });

      if (data.success) {
        dispatch({
          type: "UPDATE_GROUP",
          payload: data.result,
        });
        dispatch(getGroups());
        callback("Group Updated successfully!");
      }
    } catch (err) {
      callback("Error in Group updating");
    }
  };
};

export const updateRemoveUserFromGroup = (
  groupCredential,
  groupId,
  callback,
) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Put",
        url: `${urlHelper}/drive/group/remove/${groupId}`,
        data: groupCredential,
      });
      if (data.success) {
        dispatch({
          type: "UPDATE_GROUP",
          payload: data.result,
        });
        callback("group updated successfully.");
        dispatch(getGroups());
      }
    } catch (err) {
      callback("Error in group updating .");
    }
  };
};

export const getGroupById = (groupId) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/permission/role`,
        data: groupId,
      });

      dispatch({
        type: "SET_GROUP",
        payload: data.user,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

// Share with me

export const shareWithMe = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/workspace/sharedWithMe`,
        data: {
          page_size: 40,
          page_number: page,
        },
      });

      if (data.data) {
        dispatch({
          type: "SHARE_WITH_ME",
          payload: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const makeWorkspaceCopy = (workspaceData, callback) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/workspace/makeWorkspaceCopy`,
        data: workspaceData,
      });

      if (data.data) {
        dispatch(getAllStars());
        callback(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Trash
export const getTrash = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/workspace/trashWorkspace`,
        data: {
          page_size: 40,
          page_number: page,
        },
      });

      if (data.data) {
        dispatch({
          type: "SET_TRASH",
          payload: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Stars
export const getAllStars = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/workspace/starredWorkspace`,
        data: {
          page_size: 40,
          page_number: page,
        },
      });

      if (data.data) {
        dispatch({
          type: "SET_STARS",
          payload: data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// Add/Remove Star
export const updateStars = (appId, workspaceId, starred, callback) => {
  return async (dispatch) => {
    try {
      console.log(appId, workspaceId, starred, "testing");
      const { data } = await axiosInstance({
        method: "Post",
        url: `${urlHelper}/drive/workspace/updatestarredWorkspace`,
        data: {
          starred: starred,
          workspaceId: workspaceId,
          appId: appId,
        },
      });

      if (data) {
        dispatch({
          type: "UPDATE_WORKSPACE",
          payload: { starred, workspaceId },
        });
        dispatch({
          type: "UPDATE_STAR",
          payload: { starred, workspaceId },
        });
        callback(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
