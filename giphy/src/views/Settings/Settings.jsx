import LanguageSelector from './LanguageSelector';
import EmailPreferences from './EmailPreferences';
import styles from './Settings.module.css';
export default function Settings() {

    return (
        <div>
            <div>Settings</div>
            <div className={styles[`settings-container`]}>
                <h1>Settings</h1>
                <LanguageSelector />
                <EmailPreferences />
            </div>
        </div>
    )
}