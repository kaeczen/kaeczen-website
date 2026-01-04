import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="section-dark" id="about">
      <div className="container-custom">
        <SectionTitle>{t('about.title')}</SectionTitle>

        <div className="max-w-4xl mx-auto space-y-6">
          <motion.p
            className="body-text text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('about.description')}
          </motion.p>

          <motion.p
            className="body-text text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('about.experience')}
          </motion.p>

          <motion.p
            className="body-text text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('about.operations')}
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <StatCard number="14+" label="Years Experience" />
          <StatCard number="10K+" label="End Users" />
          <StatCard number="500+" label="Custom Orders" />
          <StatCard number="5+" label="ShapeDiver Apps" />
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = ({ number, label }) => (
  <div className="text-center p-6 glass rounded-xl">
    <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{number}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

export default About;
