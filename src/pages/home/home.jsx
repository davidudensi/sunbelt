import React, { Fragment } from "react";
// import IParty from "../../dto/IParty";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <div>
                <div>
                    <h1>Welcome to Party Planner</h1>
                </div>
                <div>
                    <Link to="/manage">
                        <span>Get Started</span>
                    </Link>
                </div>
            </div>
        </Fragment>
    )
}

export default Home;