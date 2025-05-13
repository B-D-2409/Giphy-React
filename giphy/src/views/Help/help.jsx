import { Link } from "react-router-dom"
import Faq from "./Faq"
export default function Help() {

    return (
        <div className="help-page" style={{ padding: "30px" }}>
            <h1>Help & Support</h1>
            <p><strong>Contact Email:</strong> borislav.2404g@gmail.com</p>
            <p><strong>FAQs:</strong> You can find answers to common questions <Link to="/faq">here</Link>.</p>
            <p><strong>Working Hours:</strong> Monday to Friday, 9:00 - 17:00</p>
        </div>
    )
}