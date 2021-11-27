import "./SignUp.scss"
import {Link, Navigate} from "react-router-dom";
import * as React from "react";

const SignUp = () => {
    const token : string | null = localStorage.getItem("token");


    return(
        <div>
            {token && (<Navigate replace to="/main" />)}
            <div className="signup-page-wrapper">
                <form>
                    <input/>
                    <Link to="/login">뒤로</Link>
                </form>
            </div>
        </div>
    );
}

export default SignUp;