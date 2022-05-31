import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginHandler, logoutHandler } from "../slices/isLoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { customAxios } from "../lib/customAxios";
import { useTokenValidationQuery, useUserInfoQuery } from "../api/user";
import { useQueryClient } from "react-query";
import { changeRedirectPath } from "../slices/redirectPathSlice";
import { RootState } from "../store/store";

const Token = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = useSelector<RootState>((state) => state.redirectPath.value);
  const path = useSelector<RootState>((state) => state.redirectPath.value);

  const token = useTokenValidationQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    // if (token.isSuccess) dispatch(loginHandler());
    // else if (token.isError) dispatch(logoutHandler());
    if (location.pathname !== "/login")
      dispatch(changeRedirectPath(location.pathname));
    if (token.isSuccess) queryClient.invalidateQueries("userInfo");
    else if (token.isError) queryClient.invalidateQueries("userInfo");

    // customAxios
    //   .get(`/users/token`)
    //   .then((res) => {
    //     if (res.status === 200) dispatch(loginHandler());
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 403) dispatch(logoutHandler());
    //     else console.log(err);
    //   });
  }, [location, path]);

  return null;
};

export default Token;
