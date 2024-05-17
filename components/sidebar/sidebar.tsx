import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { FcBrokenLink } from "react-icons/fc";
import { FcClapperboard } from "react-icons/fc";
import { FcTabletAndroid } from "react-icons/fc";
import { FcBusinesswoman } from "react-icons/fc";
import { FcCommandLine } from "react-icons/fc";
import { FcBinoculars } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="分类">
              <SidebarItem
                isActive={pathname === "/国产嫩妹"}
                title="国产嫩妹"
                icon={<FcBusinesswoman />}
                href="/国产嫩妹"
              />
              <SidebarItem
                isActive={pathname === "/国产自拍"}
                title="国产自拍"
                icon={<FcTabletAndroid />}
                href="/国产自拍"
              />
              <SidebarItem
                isActive={pathname === "/国产黑料"}
                title="国产黑料"
                icon={<FcCommandLine />}
                href="/国产黑料"
              />
              <SidebarItem
                isActive={pathname === "/国产探花"}
                title="国产探花"
                icon={<FcLike />}
                href="/国产探花"
              />
              <SidebarItem
                isActive={pathname === "/国产直播"}
                title="国产直播"
                icon={<FcClapperboard />}
                href="/国产直播"
              />
              <SidebarItem
                isActive={pathname === "/国产偷拍"}
                title="国产偷拍"
                icon={<FcBinoculars />}
                href="/国产偷拍"
              />
            </SidebarMenu>

            <SidebarMenu title="友链">
              <SidebarItem
                isActive={pathname === "/"}
                title="绿色小导航"
                icon={<FcBrokenLink />}
                href="https://玽zj鎊.greendh.link/%e7%a3%a320"
              />
              <SidebarItem
                isActive={pathname === "/"}
                title="找AV导航"
                icon={<FcBrokenLink />}
                href="https://va.zavdh.cc/gs4osh"
              />
              <SidebarItem
                isActive={pathname === "/"}
                title="蓝导航"
                icon={<FcBrokenLink />}
                href="https://d9.landh.guru/697kx"
              />
              <SidebarItem
                isActive={pathname === "/"}
                title="色界吧"
                icon={<FcBrokenLink />}
                href="https://廄訂構.sejie8.de/%e7%9f%af%e6%92%a3%e7%b3%be%e7%af%84"
              />
            </SidebarMenu>

            <SidebarMenu title="待定">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"暂无"} color="primary">
              <div className="max-w-fit">
              <MdEmail size="2em"/>
              </div>
            </Tooltip>
            <Tooltip content={"暂无"} color="primary">
              <div className="max-w-fit">
              <FaTelegramPlane size="2em"/>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
