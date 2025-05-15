import { Outlet } from 'react-router-dom'

function LoginLayout() {
  return (
    <div className="login">
      <Outlet />
    </div>
  );
}

export default LoginLayout;
