import { useLocation } from "react-router-dom";
import { loginHandler, logoutHandler } from "../slices/isLoginSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { customAxios } from "../lib/customAxios";

const Token = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    customAxios
      .get(`/users/token`)
      .then((res) => {
        if (res.status === 200) dispatch(loginHandler());
      })
      .catch((err) => {
        if (err.response.status === 403) dispatch(logoutHandler());
        else console.log(err);
      });
  }, [location]);

  return null;
};

export default Token;
