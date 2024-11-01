import { SetStateAction, useState } from "react";
import './login-form.css';
// import { useNavigate} from 'react-router-dom';


export default function LoginForm(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        // Prevent default form submission
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        

    };

    function Scam(){
        setTimeout(() => {
            location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQß'
        }, 2000
        )
    }
    // let navigate() = useNavigate()

    return(
        <>  
            <div>
                <div className="form-container" >
                    <form onSubmit={handleSubmit} action="https://google.com">
                        <h2>Log In</h2> 
                        <div className="input-container">
                            <input className = "form-input" type="email" placeholder="Email" onChange={handleEmailChange} />
                        </div>
                        <br/>
                        <div className="input-container">
                            <input className = "form-input" type="password" placeholder="Password" onChange={handlePasswordChange} />
                            {/* <button>Forgot?</button> */}
                        </div>
                        <br/>
                        <button type="submit" onClick={() => Scam()}>Log in</button>
                        <br/><br/>
                        <div className="remember-me-container">
                            <input type="checkbox" />
                            <label>Remember Me</label>
                        </div>
                    </form>
                </div>
                {/* <div className="botton-buttons">
                    <button>Don't have an account?</button>
                    <button>Having an issues logging in?</button>
                </div> */}
            </div>
        </>
    );
}
