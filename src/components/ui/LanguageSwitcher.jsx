import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const routeMap = {
  en: {
    '/': '/',
    '/services': '/services',
    '/products': '/products',
    '/technology': '/technology',
    '/projects': '/projects',
    '/contact': '/contact'
  },
  es: {
    '/': '/es',
    '/services': '/es/servicios',
    '/products': '/es/productos',
    '/technology': '/es/tecnologia',
    '/projects': '/es/proyectos',
    '/contact': '/es/contacto'
  }
};

const reverseRouteMap = {
  '/es': '/',
  '/es/servicios': '/services',
  '/es/productos': '/products',
  '/es/tecnologia': '/technology',
  '/es/proyectos': '/projects',
  '/es/contacto': '/contact'
};

export const LanguageSwitcher = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const currentLang = i18n.language;

  const switchLanguage = (lang) => {
    if (lang === currentLang) return;

    i18n.changeLanguage(lang);

    // Get current English route
    let englishRoute = location.pathname;
    if (currentLang === 'es') {
      englishRoute = reverseRouteMap[location.pathname] || '/';
    }

    // Navigate to the new language route
    const newPath = routeMap[lang][englishRoute] || (lang === 'es' ? '/es' : '/');
    navigate(newPath);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          currentLang === 'en'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
      <span className="text-gray-500">|</span>
      <button
        onClick={() => switchLanguage('es')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          currentLang === 'es'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        ES
      </button>
    </div>
  );
};

export default LanguageSwitcher;
