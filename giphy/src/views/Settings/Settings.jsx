import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import EmailPreferences from './EmailPreferences';
import styles from './Settings.module.css';

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className={styles[`settings-container`]}>
      <h1>{t(styles[`settings.title`])}</h1>
      <LanguageSelector />
      <EmailPreferences />
    </div>
  );
}
