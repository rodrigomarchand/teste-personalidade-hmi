import { useState, useEffect } from 'react';

// --- ICONS (SVG) ---
const Icons = {
  Brain: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
  Refresh: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>,
  Activity: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Target: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
};

// --- DATA ---
const profiles = {
  ISTJ: { title: "O Maestro", description: "Prático, atento, confiável e meticuloso. É uma pessoa tranquila e reservada que preza pela segurança, paz e tem um forte senso de dever e organização.", traits: ["Foco", "Dever", "Tradição", "Lógica"] },
  ISFJ: { title: "O Defensor", description: "Protetor, dedicado e atencioso. Está sempre pronto para defender e ajudar as pessoas que ama, valorizando a harmonia.", traits: ["Cuidado", "Lealdade", "Paciência", "Apoio"] },
  INFJ: { title: "O Conselheiro", description: "Idealista, profundo e inspirador. Possui uma intuição afiada sobre as pessoas e procura conexões autênticas.", traits: ["Intuição", "Empatia", "Visão", "Idealismo"] },
  INTJ: { title: "O Arquiteto", description: "Estrategista, lógico e inovador. Tem uma sede insaciável por conhecimento e prefere criar sistemas complexos.", traits: ["Estratégia", "Intelecto", "Independência", "Visão"] },
  ISTP: { title: "O Cirúrgico", description: "Lógico, pragmático e experimentador. Gosta de entender como as coisas funcionam na prática, resolvendo problemas no momento.", traits: ["Pragmatismo", "Adaptação", "Lógica", "Ação"] },
  ISFP: { title: "O Artista", description: "Gracioso, flexível e sensível. Vive no momento presente e gosta de explorar novas experiências de forma autêntica.", traits: ["Estética", "Sensibilidade", "Espontaneidade", "Harmonia"] },
  INFP: { title: "O Mediador", description: "Altruísta, poético e idealista. É guiado por valores profundos e está sempre em busca do bem comum.", traits: ["Valores", "Criatividade", "Compaixão", "Autenticidade"] },
  INTP: { title: "O Lógico", description: "Inovador interno, analítico e curioso. Ama padrões, detetar discrepâncias e desenvolver teorias intelectuais.", traits: ["Análise", "Lógica", "Curiosidade", "Inovação"] },
  ESTP: { title: "O Empreendedor", description: "Audacioso, prático e enérgico. Gosta de viver no limite, é focado na ação e resolve os problemas rapidamente.", traits: ["Ação", "Audácia", "Percepção", "Realismo"] },
  ESFP: { title: "O Animador", description: "Espontâneo, enérgico e entusiasta. A vida nunca é aborrecida perto de si. Ama estar com pessoas e viver o agora.", traits: ["Energia", "Espontaneidade", "Carisma", "Otimismo"] },
  ENFP: { title: "O Inspirador", description: "Entusiasta, criativo e sociável. É um espírito livre que encontra motivos para sorrir e se conectar emocionalmente.", traits: ["Entusiasmo", "Criatividade", "Conexão", "Curiosidade"] },
  ENTP: { title: "O Inovador", description: "Pragmático, intelectual e debatedor. Adora o desafio intelectual e conectar ideias complexas de forma original.", traits: ["Debate", "Intelecto", "Inovação", "Desafio"] },
  ESTJ: { title: "O Executivo", description: "Administrador, direto e dedicado. Valoriza a tradição e a ordem, utilizando a sua compreensão clara para liderar.", traits: ["Ordem", "Gestão", "Responsabilidade", "Praticidade"] },
  ESFJ: { title: "O Integrador", description: "Sociável, prestativo e popular. É extraordinariamente atencioso, garantindo que todos estejam bem e cuidados.", traits: ["Cuidado", "Sociabilidade", "Dever", "Harmonia"] },
  ENFJ: { title: "O Mentor", description: "Líder carismático e inspirador. É movido pela paixão, assumindo papéis de liderança para ajudar os outros a crescerem.", traits: ["Liderança", "Carisma", "Empatia", "Inspiração"] },
  ENTJ: { title: "O Estrategista", description: "Líder audacioso, imaginativo e determinado. Encontra sempre uma via estratégica para alcançar objetivos de longo prazo.", traits: ["Estratégia", "Liderança", "Lógica", "Determinação"] }
};

const letterExercises = {
  I: { title: "Desenvolver a Introversão (I)", tasks: ["Praticar meditação Mindfulness deixando a mente vazia.", "Ficar algumas horas sozinho(a) em silêncio."] },
  E: { title: "Desenvolver a Extroversão (E)", tasks: ["Puxar assunto com 3 desconhecidos na semana.", "Participar de um evento social ou seminário."] },
  S: { title: "Desenvolver a Sensação (S)", tasks: ["Praticar Meditação Pranayama focando nos sentidos físicos."] },
  N: { title: "Desenvolver a Intuição (N)", tasks: ["Pela manhã fazer ensaio mental de cenários futuros."] },
  T: { title: "Desenvolver o Pensamento (T)", tasks: ["Fazer exercícios de lógica como Sudoku ou Xadrez."] },
  F: { title: "Desenvolver o Sentimento (F)", tasks: ["Expressar gratidão a alguém.", "Dedicar tempo para ouvir as emoções de outra pessoa."] },
  J: { title: "Desenvolver o Julgamento (J)", tasks: ["Fazer check-list de todas as tarefas do dia.", "Organizar o ambiente de trabalho."] },
  P: { title: "Desenvolver a Percepção (P)", tasks: ["Fazer um caminho diferente para o trabalho.", "Decidir algo de forma espontânea hoje."] }
};

const questions = [
  { text: "Recarrego as minhas energias passando tempo sozinho, em ambientes calmos.", axis: 'EI', dir: -1 },
  { text: "Em eventos sociais, costumo tomar a iniciativa de conversar com pessoas desconhecidas.", axis: 'EI', dir: 1 },
  { text: "Prefiro comunicar-me por escrito em vez de falar em público.", axis: 'EI', dir: -1 },
  { text: "Sinto-me energizado após passar muito tempo num grupo grande e animado.", axis: 'EI', dir: 1 },
  { text: "Foco muito mais no que é real, factual e tangível do que no que 'poderia ser'.", axis: 'SN', dir: -1 },
  { text: "Frequentemente perco-me em pensamentos a imaginar o futuro ou cenários teóricos.", axis: 'SN', dir: 1 },
  { text: "Prefiro instruções claras, práticas e passo-a-passo para realizar uma nova tarefa.", axis: 'SN', dir: -1 },
  { text: "Confio muito na minha intuição para entender o significado oculto das situações.", axis: 'SN', dir: 1 },
  { text: "Ao tomar decisões difíceis, priorizo a lógica e os factos acima das emoções.", axis: 'TF', dir: 1 },
  { text: "Levo muito em consideração como as minhas escolhas afetarão os sentimentos dos outros.", axis: 'TF', dir: -1 },
  { text: "Acredito que ser justo e imparcial é mais importante do que ser compassivo.", axis: 'TF', dir: 1 },
  { text: "Tento evitar debates e conflitos para manter a harmonia do grupo.", axis: 'TF', dir: -1 },
  { text: "Gosto de ter um plano estruturado e sinto-me mal quando imprevistos mudam a rotina.", axis: 'JP', dir: 1 },
  { text: "Prefiro deixar as minhas opções em aberto e decidir espontaneamente.", axis: 'JP', dir: -1 },
  { text: "Faço listas rigorosas de tarefas e organizo o meu ambiente frequentemente.", axis: 'JP', dir: 1 },
  { text: "O meu estilo de trabalho é flexível, adaptando-me conforme a necessidade.", axis: 'JP', dir: -1 },
];

export default function App() {
  const [step, setStep] = useState('splash');
  const [qIndex, setQIndex] = useState(0);
  const [scores, setScores] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });
  const [activeSelection, setActiveSelection] = useState(null);
  const [result, setResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (step === 'splash') {
      const timer = setTimeout(() => {
        setStep('intro');
        setTimeout(() => setFadeIn(true), 50);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const startTest = () => {
    setScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setQIndex(0);
    setFadeIn(false);
    setTimeout(() => {
      setStep('test');
      setFadeIn(true);
      window.scrollTo(0, 0);
    }, 300);
  };

  const handleAnswer = (val) => {
    if (isAnimating) return;
    setActiveSelection(val);
    setIsAnimating(true);
    
    setTimeout(() => {
      const question = questions[qIndex];
      const newScores = { ...scores };
      newScores[question.axis] += (val * question.dir);
      setScores(newScores);

      if (qIndex < questions.length - 1) {
        setFadeIn(false);
        setTimeout(() => {
          setQIndex(qIndex + 1);
          setActiveSelection(null);
          setIsAnimating(false);
          setFadeIn(true);
        }, 200);
      } else {
        processResults(newScores);
      }
    }, 500);
  };

  const goBack = () => {
    if (qIndex > 0 && !isAnimating) {
      setFadeIn(false);
      setTimeout(() => {
        setQIndex(qIndex - 1);
        setActiveSelection(null);
        setFadeIn(true);
      }, 200);
    }
  };

  const processResults = (finalScores) => {
    setStep('loading');
    window.scrollTo(0, 0);
    
    const EorI = finalScores.EI >= 0 ? 'E' : 'I';
    const NorS = finalScores.SN >= 0 ? 'N' : 'S';
    const TorF = finalScores.TF >= 0 ? 'T' : 'F';
    const JorP = finalScores.JP >= 0 ? 'J' : 'P';
    
    setTimeout(() => {
      setResult(`${EorI}${NorS}${TorF}${JorP}`);
      setStep('result');
      setIsAnimating(false);
      setTimeout(() => setFadeIn(true), 50);
    }, 2500);
  };

  // UI Components
  if (step === 'splash') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mb-6 animate-pulse border border-indigo-500/30">
          <Icons.Brain />
        </div>
        <h1 className="text-2xl font-light tracking-[0.3em] uppercase">Método HMI</h1>
      </div>
    );
  }

  if (step === 'intro') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
        <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-center px-4 sticky top-0 z-10 shadow-sm">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Acesso Cognitivo</span>
        </div>

        <div className={`flex-1 flex flex-col p-6 max-w-lg mx-auto w-full transition-all duration-700 transform ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-indigo-600/20 mt-10">
            <Icons.Target />
          </div>
          
          <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-4 leading-tight">
            Descubra sua <br /><span className="font-semibold text-indigo-600">Mestria Interna.</span>
          </h1>
          <p className="text-slate-500 mb-10 text-lg leading-relaxed">
            Mapeamento focado em traços comportamentais e sociológicos.
          </p>

          <div className="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
              <Icons.Activity /> Instruções
            </h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-4 items-center font-medium"><span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">1</span> 16 questões situacionais rápidas.</li>
              <li className="flex gap-4 items-center font-medium"><span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">2</span> Seja o mais honesto possível.</li>
              <li className="flex gap-4 items-center font-medium"><span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs">3</span> Obtenha seu arquétipo personalizado.</li>
            </ul>
          </div>

          <button 
            onClick={startTest}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl text-sm font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95"
          >
            COMEÇAR TESTE <Icons.ChevronRight />
          </button>
        </div>
      </div>
    );
  }

  if (step === 'test') {
    const q = questions[qIndex];
    const progress = ((qIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <div className="h-16 bg-white border-b border-slate-100 flex items-center px-4 sticky top-0 z-10">
          <button onClick={goBack} disabled={qIndex === 0 || isAnimating} className="p-2 text-slate-400 disabled:opacity-20">
            <Icons.ChevronLeft />
          </button>
          <div className="flex-1 text-center pr-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">Questão {qIndex + 1} / {questions.length}</span>
          </div>
        </div>

        <div className="h-1 w-full bg-slate-100">
          <div className="h-full bg-indigo-500 transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 w-full max-w-xl mx-auto">
          <div className={`w-full bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-14 mb-8 transition-all duration-300 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 leading-snug text-center mb-16 min-h-30 flex items-center justify-center">
              "{q.text}"
            </h2>

            <div className="flex flex-col gap-8">
              <div className="flex justify-between items-center w-full relative px-2">
                <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-100 z-0"></div>
                {[-2, -1, 0, 1, 2].map((val) => {
                  const isSelected = activeSelection === val;
                  const size = val === 0 ? "w-10 h-10" : Math.abs(val) === 1 ? "w-12 h-12" : "w-14 h-14";
                  const color = val < 0 ? "border-rose-300 hover:bg-rose-50" : val > 0 ? "border-teal-300 hover:bg-teal-50" : "border-slate-200 hover:bg-slate-50";
                  const selectedColor = val < 0 ? "bg-rose-500 border-rose-500 shadow-rose-200" : val > 0 ? "bg-teal-500 border-teal-500 shadow-teal-200" : "bg-slate-500 border-slate-500 shadow-slate-200";

                  return (
                    <button
                      key={val}
                      onClick={() => handleAnswer(val)}
                      disabled={activeSelection !== null}
                      className={`rounded-full border-2 z-10 transition-all duration-300 bg-white ${size} ${color} ${isSelected ? `${selectedColor} scale-110 shadow-xl text-white` : ''} ${activeSelection !== null && !isSelected ? 'opacity-20 grayscale' : ''}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between w-full text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className="text-rose-400">Discordo</span>
                <span className="text-teal-500">Concordo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="animate-spin text-indigo-400 mb-6"><Icons.Refresh /></div>
        <h2 className="text-xl font-light tracking-widest">Processando Padrões...</h2>
      </div>
    );
  }

  if (step === 'result') {
    const profile = profiles[result] || profiles['ISTJ'];
    const letters = result.split('');

    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
          <span className="text-xs font-bold tracking-widest uppercase">Resultado</span>
          <button onClick={startTest} className="text-xs font-bold text-indigo-600 uppercase hover:underline">Reiniciar</button>
        </div>

        <div className={`flex-1 p-6 md:p-10 max-w-2xl mx-auto w-full transition-all duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-white rounded-4xl shadow-sm border border-slate-100 p-10 text-center mb-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-indigo-500 to-teal-400"></div>
            <p className="text-[10px] font-bold text-indigo-600 tracking-[0.3em] uppercase mb-4">Arquétipo HMI</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-6">{profile.title}</h1>
            <div className="inline-block px-6 py-2 bg-slate-50 rounded-full font-mono text-xl tracking-[0.4em] mb-8 border border-slate-100">{result}</div>
            <p className="text-lg font-light text-slate-600 leading-relaxed text-left">{profile.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            {profile.traits.map((trait, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 text-center text-xs font-bold uppercase tracking-widest text-slate-700 shadow-sm">{trait}</div>
            ))}
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2 mb-4">Plano de Treino</h3>
            {letters.map(l => (
              <div key={l} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">{l}</div>
                  <h4 className="text-xs font-bold uppercase tracking-widest">{letterExercises[l].title}</h4>
                </div>
                <ul className="space-y-3 pl-14">
                  {letterExercises[l].tasks.map((t, i) => (
                    <li key={i} className="text-sm text-slate-600 font-light flex gap-3"><span className="text-teal-400 mt-1">•</span>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}