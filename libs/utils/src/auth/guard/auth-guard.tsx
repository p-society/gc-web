"use client";
import { useCallback, useEffect, useState } from 'react';

import { useRouter } from '@gc-broadcast-web/utils/routes/hooks';

import { SplashScreen } from '@gc-broadcast-web/components/loading-screen';
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "@gc-broadcast-web/redux/global/global.selector";
import { setUserInfo } from "@gc-broadcast-web/redux/global/global.action";
import { UserRole, UserRolesEnum } from "@gc-broadcast-web/redux/constants/UserRole";
import restApp, { authCookieName } from "@gc-broadcast-web/utils/request/rest.app";
import { CookieStorage } from 'cookie-storage';
import config from "@gc-broadcast-web/config/env";
import axios from 'axios';


// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  roles?: UserRole[];
};

export const ValidateToken = ({ children }: { children: React.ReactNode; }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const cookieStorage = new CookieStorage();
  const dispatch = useDispatch();

  const validateToken = useCallback(async () => {
    try {
      const access_token = cookieStorage.getItem(authCookieName);
      console.log({ caccess_token: access_token })
      if (!access_token) {
        location.href = config.paths.auth;
        // setLoading(false);
        return;
      }
      const resp = await axios.get("http://localhost:3030/authentication/verify", {
        headers: {
          "Authorization": "Bearer " + access_token
        }
      });
      console.log({ x: resp });
      // const res = await restApp.authenticate({
      //   strategy: 'jwt',
      //   accessToken: access_token,
      // }, {
      //   query: {
      //     $populate: 'organization',
      //   }
      // });
      // @ts-ignore 
      dispatch(setUserInfo(resp?.data));
      setLoading(false);
    } catch (err) {
      // setLoading(false);
      location.href = config.paths.auth;
    }
  }, []);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  if (loading) {
    return <SplashScreen />;
  }

  return children;
};

export default function AuthGuard({ children, roles = UserRolesEnum }: Props) {
  const router = useRouter();
  const cookieStorage = new CookieStorage();
  const dispatch = useDispatch();

  const userInfo = useSelector(getUserInfo, shallowEqual);

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const check = useCallback(async () => {

    const checkRole = (roles: UserRole[], userRole: UserRole) => {
      if (roles?.includes(userRole)) {
        setChecked(true);
        setLoading(false);
      } else {
        const notFoundPath = '/not-found';
        router.replace(notFoundPath);
      }
    }

    // const handleError = () => {
    //   setChecked(false);
    //   setLoading(false);
    //   const searchParams = new URLSearchParams({
    //     returnTo: window.location.pathname,
    //   }).toString();
    //   const loginPath = '/login';
    //   const href = `${loginPath}?${searchParams}`;
    //   router.replace(href);
    // }

    if (userInfo) {
      checkRole(roles, userInfo?.type);
      return;
    }

    // try {
    //   const access_token = cookieStorage.getItem(authCookieName);
    //   if(!access_token) {
    //     handleError();
    //     return;
    //   }
    //   // console.log('token',access_token);
    //   // const res = await restApp.authenticate({
    //   //   strategy: 'jwt',
    //   //   accessToken: access_token,
    //   // }, {
    //   //   query: {
    //   //     $populate: 'organization',
    //   //   }
    //   // });
    //   // console.log(res);
    //   // dispatch(setUserInfo(res?.user));
    //   // checkRole(roles, res?.user?.type);
    // } catch (err) {
    //   handleError();
    // }
  }, [userInfo, roles]);

  useEffect(() => {
    if (userInfo) check();
  }, [check, userInfo]);

  if (loading) {
    return <SplashScreen />;
  }

  if (!checked) {
    return null;
  }

  if (!userInfo?.organization) {
    return null;
  }

  return children;
}
