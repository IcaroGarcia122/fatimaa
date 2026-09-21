import { motion } from 'motion/react';

export default function ExperienceSection() {
  const steps = [
    {
      number: '01',
      title: 'Conversa & Conexão',
      description:
        'Antes de qualquer clique, entendemos a história de vocês, gostos e estilo, escolhendo o local ideal ou nosso estúdio.',
    },
    {
      number: '02',
      title: 'Direção Leve & Natural',
      description:
        'Nada de poses congeladas. Conduzimos com gentileza, criando brincadeiras e conversas onde o riso e o afeto surgem naturalmente.',
    },
    {
      number: '03',
      title: 'Sensibilidade na Luz',
      description:
        'Trabalhamos tanto a luz natural quanto a iluminação suave de estúdio para valorizar as expressões e os detalhes com verdade.',
    },
    {
      number: '04',
      title: 'Memórias para Sempre',
      description:
        'Entrega em galeria online privativa com tratamento minucioso de cores atemporais, prontas para álbuns e quadros.',
    },
  ];

  return (
    <section id="experiencia" className="py-24 bg-[#fcfbf9] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-semibold tracking-[0.25em] text-[#01590d] uppercase block mb-3">
            A EXPERIÊNCIA COM FÁTIMA SAMPAIO
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-neutral-900 leading-tight">
            Como transformamos um ensaio em um{' '}
            <span className="italic font-normal text-[#01590d]">
              encontro leve e inesquecível
            </span>
          </h2>
          <p className="mt-4 text-base text-neutral-600 font-light leading-relaxed">
            Muitas pessoas chegam dizendo que são tímidas ou que não sabem posar.
            Aqui, você não precisa se preocupar com isso: nossa missão é acolher
            e conduzir cada momento com afeto e tranquilidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="bg-white p-7 sm:p-8 rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-semibold tracking-widest text-[#01590d] uppercase px-3 py-1 rounded-full bg-[#01590d]/10">
                      Passo {step.number}
                    </span>
                    <span className="font-display text-3xl font-light text-neutral-300 group-hover:text-[#01590d]/60 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
