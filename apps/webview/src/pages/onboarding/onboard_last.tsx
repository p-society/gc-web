import { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./onboard.css";

const OnboardingLast: FC = () => {
    const navigate = useNavigate();

    return (
        <div className="onboarding_last_content">
            <h1>Join us for <br /> catching the <br />live experience</h1>
            <p>Log in or create a new account <br /> to continue</p>
            <div className="onboarding_actions">
                <button onClick={() => navigate('/login')}>LOGIN</button>
                <button onClick={() => navigate('/register')}>CREATE NEW ACCOUNT</button>
            </div>
            <img className="onboard_vector1" src="images/onboard_last/Vector1.png" alt="Vector 1"/>
            <img className="onboard_vector2" src="images/onboard_last/Vector2.png" alt="Vector 2"/>
        </div>
    );
};

export default OnboardingLast;
