import { NavLink, useNavigate } from 'react-router-dom';
import children from '../../path/children';
import { useAuthContext, useUpdateTabContext } from '../../hooks/useCustomContext';
import { ReactComponent as LogoutIcon } from '../../assets/icons/logout.svg'
import { logout } from '../../api/auth';
import adminChildren from '../../path/adminChildren';
import { ADMIN_USER } from '../../constants/Global';
import Dropdown from './Dropdown';
import analysisChildren from '../../path/analysisChildren';

export default function Sidebar({ showSidebar }) {
    const updateTabs = useUpdateTabContext()
    const navigate = useNavigate()
    const { auth } = useAuthContext()

    const handleClick = (newTab, event) => {
        event.stopPropagation();
        updateTabs({ type: "ADD_TAB", tab: newTab })
    }

    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return (
        <div className={`sidebar col ${showSidebar ? "" : "hidden"}`}>
            <nav className="col">
                {children.map((obj, i) =>
                    obj.name !== "用户主页" &&
                    obj.name !== "新增询单" &&
                    obj.name !== "修改询单" &&
                    obj.name !== "404" &&
                    <NavLink
                        key={i}
                        to={"/" + obj.path}
                        className="sidebar-item"
                        onClick={(e) => handleClick(obj, e)}
                    >
                        {obj.name}
                    </NavLink>)}
                {
                    auth?.userType == ADMIN_USER &&
                    adminChildren.map((obj, i) =>
                        obj.inSidebar && <NavLink
                            key={i}
                            to={"/admin/" + obj.path}
                            className="sidebar-item"
                            onClick={!obj.menu && ((e) => handleClick(obj, e))}
                        >
                            {obj.name}
                        </NavLink>)
                }

                <Dropdown
                    items={analysisChildren}
                    label="数据分析"
                    type="analysis"
                />
                {
                    auth?.userType == ADMIN_USER &&
                    <Dropdown
                        items={adminChildren.filter((item) => !item.inSidebar)}
                        label="数据管理"
                        type="admin"
                    />
                }

            </nav >
            <div className='row flex-center mb1 user-info-container'>
                <h1>用户：{auth?.username ?? ""}</h1>
                <button onClick={handleLogout} >
                    <LogoutIcon />
                </button>
            </div>
        </div>
    )
}
