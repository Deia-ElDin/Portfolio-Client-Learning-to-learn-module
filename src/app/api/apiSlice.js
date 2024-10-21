import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../../features/auth/authSlice";

// export const BASE_URL = 'https://p8-portfolio-v2-restapi.cyclic.app';
export const BASE_URL = "http://localhost:5000/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery("auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const username = api.getState().auth.username;
      api.dispatch(setCredentials({ username, ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: [
    "Login",
    "Profile",
    "Skills",
    "Jobs",
    "Projects",
    "Contacts",
    "Medias",
  ],
});
