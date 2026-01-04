import { Product, Contact } from '../components/sections';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Products = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="heading-1 text-white mb-4">
              <span className="text-gradient">{t('nav.products')}</span>
            </h1>
            <p className="body-text">
              Innovative tools and solutions for computational design and AI integration.
            </p>
          </motion.div>
        </div>
      </section>

      <Product />
      <Contact />
    </>
  );
};

export default Products;
