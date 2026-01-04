import { motion } from 'framer-motion';

export const SectionTitle = ({
  children,
  subtitle,
  centered = true,
  className = ''
}) => {
  return (
    <motion.div
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="heading-2 text-white mb-4">{children}</h2>
      {subtitle && (
        <p className="body-text max-w-2xl mx-auto">{subtitle}</p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
