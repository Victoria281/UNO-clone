import { NavLink } from 'react-router-dom'

function Account(props) {
    if (props.isLoggedIn !== null) {
        return (
            <NavLink to="/logout" exact activeClassName="activeIcon">
                <div className="borderHover" style={{ borderColor: '#F5F93C' }}>
                    <p className="nav-link navBarWord">
                        Logout
                    </p>
                </div>
            </NavLink>
        );
    } else {
        return (
            <NavLink to="/login" exact activeClassName="activeIcon">
                <div className="borderHover" style={{ borderColor: '#F5F93C' }}>
                    <p className="nav-link navBarWord">
                        Login
                    </p>
                </div>
            </NavLink>
        );
    }
}


export default Account;