import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { changeRedirectPath } from "../slices/redirectPathSlice";
import { useQueryClient } from "react-query";
import { useTokenValidationQuery } from "../api/user";

const Token = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const path = useSelector<RootState>((state) => state.redirectPath.value);

  const token = useTokenValidationQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location.pathname !== "/login")
      dispatch(changeRedirectPath(location.pathname));
    if (token.isSuccess) queryClient.invalidateQueries("userInfo");
    else if (token.isError) queryClient.invalidateQueries("userInfo");
  }, [location, path]);

  return null;
};

export default Token;
