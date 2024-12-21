'use client';
import { shallowEqual, useSelector } from "react-redux";
import { getUserInfo } from "@gc-broadcast-web/redux/global/global.selector";
import { useNavData } from "../config-navigation";
import DashboardLayout from "@gc-broadcast-web/utils/layouts/dashboard";


export const DashboardLayoutWIthNav = ({ children }: { children: React.ReactNode; }) => {
  const userInfo = useSelector(getUserInfo, shallowEqual);
  const navData = useNavData();

  if (!userInfo) return null;

  return <DashboardLayout navData={navData}>{children}</DashboardLayout>;
};
