import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../ui';
import { CanvasWrapper } from '../3d';
import { useDeviceCapabilities } from '../../hooks';

const MobileHeroBackground = () => (
  <div className="absolute inset-0">
    {/* Animated gradient background (CSS only) */}
    <div className="absolute inset-0 bg-animated-gradient opacity-20" />
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-grid opacity-30" />
  </div>
);

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const { isDesktop } = useDeviceCapabilities();
  const isSpanish = i18n.language === 'es';
  const servicesPath = isSpanish ? '/es/servicios' : '/services';
  const contactPath = isSpanish ? '/es/contacto' : '/contact';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mobile: Static background */}
      <div className="lg:hidden absolute inset-0">
        <MobileHeroBackground />
      </div>

      {/* Desktop: 3D Canvas */}
      <div className="hidden lg:block absolute inset-0">
        <CanvasWrapper fallback={<MobileHeroBackground />} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom w-full">
        <div className="max-w-3xl">
          <motion.h1
            className="heading-1 text-white mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gradient">{t('hero.title')}</span>
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl text-primary mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {t('hero.tagline')}
          </motion.p>

          <motion.p
            className="body-text mb-8 max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to={contactPath}>
              <Button variant="primary">{t('hero.cta_primary')}</Button>
            </Link>
            <Link to={servicesPath}>
              <Button variant="secondary">{t('hero.cta_secondary')}</Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
