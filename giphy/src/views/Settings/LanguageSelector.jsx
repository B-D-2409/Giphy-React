import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector">
      <h3>{t('settings.language')}</h3>
      <select value={i18n.language} onChange={handleChange}>
        <option value="en">🇬🇧 English</option>
        <option value="bg">🇧🇬 Български</option>
      </select>
    </div>
  );
}
