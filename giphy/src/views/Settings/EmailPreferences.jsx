export default function EmailPreferences() {

    return (
        <div className='email-preferences'>
            <h3>Email Preferences</h3>
            <form>
                <label>
                    <input type="checkbox" />
                    Daily Giphy Digest
                </label>
                <label>
                    <input type="checkbox" />
                    Weekly Giphy Highlights
                </label>
                <label>
                    <input type="checkbox" />
                    Promotional Emails
                </label>
            </form>
        </div>
    )
}