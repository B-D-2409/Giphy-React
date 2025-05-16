import { getAuth, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
export default function Verify({ children }) {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    const [disabled, setDisabled] = useState(false);

    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000)
        } else {
            setDisabled(false);
        }
        return () => clearTimeout(timer);
    }, [countdown])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        })

        return () => unsubscribe()
    }, [])

    const sendEmailVerificationLink = () => {

        if (user && !disabled) {
            setDisabled(true);
            setCountdown(60);


            sendEmailVerification(user)
                .then(() => {
                    console.log('"Email verification sent! Check your inbox."');
                    setTimeout(() => setDisabled(false), 60000);
                })
                .catch((error) => {
                    console.error("Error sending email verification:", error);
                });
        }
    }

    if (!user) {
        return <div>Loading user data...</div>;
    }


    if (!user.emailVerified) {
        return (
            <div>
                <p>Please confirm your email to continue</p>
                <button onClick={sendEmailVerificationLink} disabled={disabled}>
                    {disabled ? `Please wait ${countdown} seconds` : "Resend Email Verification"}
                </button>
            </div>
        );
    }

    return (
        <div>
            {children}
        </div>
    )
}