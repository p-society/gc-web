import { useNavigate } from "react-router-dom";

import "./onboard.css";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="onboard_wrapper">
            <div>
                <div className="onboard_header">
                    <h1>INTRODUCING FOR THE FIRST TIME</h1>
                    <p>The all-new grand championship app that will update your score like never before</p>
                </div>
            </div>
            <div className="crousal_next">
                <button>Next</button>
            </div>
            <div className="skip_button">
                <a onClick={() => navigate('/onboarding-last')} className="skip_button_link"> SKIP → </a>
            </div>
        </div>
    );
};

export default Dashboard;
