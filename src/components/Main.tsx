import {Link, Navigate} from "react-router-dom";

// 로그인 후 임시 페이지 컴포넌트
const Main = () => {
    const token =localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
    }

    return (
        <div>
            {token === null && <Navigate replace to="/login" />}
            <Link to="/login" onClick={handleLogout}>로그 아웃</Link>
        </div>
    );
}

export default Main;