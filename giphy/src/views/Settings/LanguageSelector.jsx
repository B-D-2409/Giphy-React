import { useTranslation } from 'react-i18next';
import styles from './Settings.module.css';
export default function LanguageSelector() {
    const { i18n, t } = useTranslation();

    const handleChange = (e) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className={styles["language-selector"]}>
            <h3>{t('settings.language')}</h3>
            <select value={i18n.language} onChange={handleChange}>
                <option value="en">🇬🇧 English</option>
                <option value="bg">🇧🇬 Български</option>
                <option value="fr">🇫🇷 Français</option>
            </select>
        </div>
    );
}
