import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui';

const techStack = {
  computational: [
    'Rhinoceros 3D',
    'Grasshopper',
    'Kangaroo Physics',
    'Ladybug/Honeybee',
    'Karamba3D',
    'Galapagos'
  ],
  programming: [
    'C#',
    'Python',
    'TypeScript/JavaScript',
    'React',
    'Node.js'
  ],
  platforms: [
    'ShapeDiver',
    'Rhino.Compute',
    'Speckle',
    'Three.js',
    'WebGL',
    'Rhino.Inside Revit'
  ],
  ai: [
    'Claude API (Anthropic)',
    'OpenAI API',
    'Claude Code',
    'Cursor IDE',
    'MCP (Model Context Protocol)'
  ]
};

const categoryColors = {
  computational: 'from-blue-500 to-blue-600',
  programming: 'from-green-500 to-green-600',
  platforms: 'from-purple-500 to-purple-600',
  ai: 'from-orange-500 to-orange-600'
};

export const Technology = () => {
  const { t } = useTranslation();

  const categories = ['computational', 'programming', 'platforms', 'ai'];

  return (
    <section className="section-dark" id="technology">
      <div className="container-custom">
        <SectionTitle>{t('technology.title')}</SectionTitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <div className={`w-full h-1 rounded-full bg-gradient-to-r ${categoryColors[category]} mb-4`} />

              <h3 className="text-lg font-semibold text-white mb-4">
                {t(`technology.categories.${category}`)}
              </h3>

              <ul className="space-y-2">
                {techStack[category].map((tech, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-400 flex items-center gap-2"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${categoryColors[category]}`} />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technology;
