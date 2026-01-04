import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionTitle, Button, Card } from '../ui';

export const Product = () => {
  const { t } = useTranslation();

  return (
    <section className="section-dark" id="product">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-2 text-white mb-6">
              <span className="text-gradient">{t('product.title')}</span>
            </h2>

            <p className="body-text mb-6">{t('product.description')}</p>

            <h3 className="text-lg font-semibold text-white mb-4">
              {t('product.capabilities_title')}
            </h3>

            <ul className="space-y-2 mb-6">
              {t('product.capabilities', { returnObjects: true }).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400">
                  <span className="text-secondary">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Button variant="accent">{t('product.cta')}</Button>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t('product.use_cases_title')}
                </h3>

                <blockquote className="border-l-4 border-primary pl-4 italic text-gray-300 mb-6">
                  {t('product.example_quote')}
                </blockquote>

                <ul className="space-y-3">
                  {t('product.use_cases', { returnObjects: true }).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-400">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm flex-shrink-0">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mock terminal */}
              <div className="bg-dark rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-gray-500">$ claude</div>
                <div className="text-primary mt-1">Creating slider component...</div>
                <div className="text-secondary mt-1">✓ Slider created (0-100)</div>
                <div className="text-primary mt-1">Connecting to circle radius...</div>
                <div className="text-secondary mt-1">✓ Connection established</div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Product;
