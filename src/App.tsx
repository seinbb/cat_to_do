import { useState, useEffect } from 'react';
import {
  Cat,
  Clock,
  Calendar,
  BrainCircuit,
  Sparkles,
  Share2,
  Crown,
  LayoutDashboard,
  FileText,
  Target,
  Lightbulb,
  Play,
  Pause,
  Coffee,
  CheckCircle2,
  Circle,
  PawPrint,
  Flame,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Animated Cat Component (Matching the uploaded image style) ---
const CatInBox = ({ state }: { state: 'focus' | 'rest' | 'play' }) => {
  return (
    <div className="relative w-full max-w-[280px] aspect-square mx-auto flex items-center justify-center">
      <motion.svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-xl"
        animate={state === 'play' ? { y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } } : {}}
      >
        {/* Tail */}
        <motion.path
          d="M 140 145 C 150 90, 165 40, 175 30 C 185 35, 170 80, 155 145 Z"
          fill="#1a1a1a"
          style={{ transformOrigin: '150px 145px' }}
          animate={
            state === 'focus' ? { rotate: [-6, 6, -6], transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' } } :
            state === 'play' ? { rotate: [-15, 15, -15], transition: { repeat: Infinity, duration: 0.8, ease: 'easeInOut' } } :
            { rotate: 12 }
          }
        />

        {/* Main Body Parts */}
        <g fill="#1a1a1a">
          {/* Left Ear */}
          <path d="M 30 145 L 50 85 L 75 130 Z" />
          {/* Right Ear */}
          <path d="M 70 130 L 95 85 L 115 130 Z" />
          
          {/* Body Blob */}
          <ellipse cx="115" cy="142" rx="45" ry="22" />
          
          {/* Head Blob */}
          <ellipse cx="70" cy="144" rx="42" ry="18" />
          
          {/* Left front paw */}
          <ellipse cx="28" cy="155" rx="16" ry="7" />
          
          {/* Right front paw */}
          <ellipse cx="108" cy="155" rx="18" ry="7" />
          
          {/* Back paw/butt smoothing */}
          <ellipse cx="152" cy="152" rx="12" ry="9" />
          
          {/* Floor filler to make it look grounded */}
          <path d="M 28 155 Q 90 165 152 155 L 152 145 L 28 145 Z" />
        </g>

        {/* Vertical Stress Lines */}
        {state !== 'play' && (
          <g stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
            <line x1="85" y1="55" x2="85" y2="70" />
            <line x1="90" y1="58" x2="90" y2="78" />
            <line x1="95" y1="55" x2="95" y2="70" />
          </g>
        )}

        {/* Playful Item (Yarn Ball) */}
        {state === 'play' && (
          <motion.g animate={{ x: [-20, 20, -20], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}>
            <circle cx="60" cy="180" r="12" fill="#ef4444" />
            <path d="M 52 173 C 60 177, 68 177, 65 188" fill="none" stroke="#fee2e2" strokeWidth="2" strokeLinecap="round" />
          </motion.g>
        )}

        {/* Eyes (Empty White Outlines) */}
        {state === 'rest' ? (
          <g>
            <path d="M 40 146 Q 55 154 70 146" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 85 146 Q 100 154 115 146" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ) : (
          <motion.g 
            style={{ transformOrigin: '75px 144px' }}
            animate={{ scaleY: [1, 1, 0.1, 1, 1], transition: { repeat: Infinity, duration: 5, times: [0, 0.9, 0.95, 0.98, 1] } }}
          >
            <ellipse cx="55" cy="144" rx="15" ry="7" fill="none" stroke="white" strokeWidth="4" />
            <ellipse cx="98" cy="144" rx="15" ry="7" fill="none" stroke="white" strokeWidth="4" />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
};

// --- App Prototype View ---
function PrototypeView() {
  const [appState, setAppState] = useState<'focus' | 'rest' | 'play'>('focus');
  const [prototypeTab, setPrototypeTab] = useState<'timer' | 'calendar'>('timer');
  const [selectedDate, setSelectedDate] = useState<number | null>(14);
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 minutes
  const [todos, setTodos] = useState([
    { id: 1, text: '수학 모의고사 1회 풀기', done: false },
    { id: 2, text: '영어 단어 day 15 암기', done: true },
    { id: 3, text: '국어 비문학 3지문 분석', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [targetHours, setTargetHours] = useState(6);
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [totalStudied, setTotalStudied] = useState(2 * 3600 + 15 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appState === 'focus' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
        setTotalStudied((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [appState, timeLeft]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo.trim(), done: false }]);
    setNewTodo('');
  };

  const handleResetTodos = () => {
    setTodos([]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const date = i - 2; // Offset for starting day of week
    if (date < 1 || date > 31) return null;
    
    let hours = 0;
    if (date < 14) hours = Math.floor(Math.random() * 5) + 1; 
    if (date === 14) hours = totalStudied / 3600;
    
    return { date, hours };
  });

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-[800px] h-[800px] shadow-2xl rounded-[3rem] overflow-hidden border-[8px] border-slate-900 relative flex flex-col font-sans">
      {/* Dynamic Island / Header */}
      <div className="pt-8 pb-4 px-6 flex justify-between items-center bg-white/50 backdrop-blur-md z-10 shrink-0">
        <div className="font-bold text-slate-800 flex items-center gap-2">
          <Cat size={20} className="text-indigo-600" />
          PauseCat
        </div>
        <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5">
          <Crown size={14} /> 프리미엄
        </div>
      </div>

      {/* Tab Content */}
      {prototypeTab === 'timer' ? (
        <div className="flex-1 flex flex-col relative px-6 py-4 overflow-y-auto custom-scrollbar">
          {/* Cat Animation */}
          <div className="mb-6 shrink-0 mt-4">
            <CatInBox state={appState} />
          </div>

          {/* AI Interaction Bubble (when playing) */}
          <AnimatePresence>
            {appState === 'play' && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-8 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200 text-center z-20"
              >
                <p className="text-slate-700 font-bold text-[0.95rem]">
                  "집사야, 지금 머리 복잡하지?<br/>나랑 딱 5분만 털공 굴리면서 놀자! 🐾"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timer Display */}
          <div className="text-center mb-6 shrink-0">
            <div className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-1">
              {appState === 'focus' ? '집중하는 중' : appState === 'play' ? '안전하게 뇌 식히는 중' : '꿀잠 자는 중'}
            </div>
            <div className={`text-6xl font-black tabular-nums tracking-tighter ${appState === 'focus' ? 'text-slate-800' : 'text-indigo-600'}`}>
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Target Study Time Tracker */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-slate-100 mb-4 shrink-0">
            <div className="flex justify-between items-end mb-2.5">
              <div>
                <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                  <Flame size={16} className="text-orange-500" /> 오늘의 목표 공부량
                  <button onClick={() => setIsEditingTarget(!isEditingTarget)} className="text-slate-400 hover:text-indigo-600 ml-1">
                    <Edit2 size={12} />
                  </button>
                </h3>
                {isEditingTarget ? (
                  <div className="flex items-center gap-2 mt-2">
                    <input 
                      type="number" 
                      value={targetHours || ''} 
                      onChange={(e) => setTargetHours(Number(e.target.value))}
                      className="w-16 px-2 py-1 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white"
                      min="1" max="24"
                    />
                    <span className="text-xs text-slate-500 font-medium">시간</span>
                    <button onClick={() => setIsEditingTarget(false)} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md font-bold hover:bg-indigo-200">확인</button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {targetHours}시간 00분 중 <span className="text-indigo-600 font-bold">{Math.floor(totalStudied / 3600)}시간 {Math.floor((totalStudied % 3600) / 60)}분</span> 달성!
                  </p>
                )}
              </div>
              <div className="text-xl font-black text-indigo-600 tracking-tighter">
                {targetHours > 0 ? Math.min(100, Math.round((totalStudied / (targetHours * 3600)) * 100)) : 0}%
              </div>
            </div>
            <div className="h-3.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${targetHours > 0 ? Math.min(100, Math.round((totalStudied / (targetHours * 3600)) * 100)) : 0}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-indigo-500 rounded-full" 
              />
            </div>
          </div>

          {/* Dashboard Overlay / Todo List */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-slate-100 mb-8 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <Target size={16} className="text-rose-500" />
                오늘의 할 일
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                  {todos.filter(t => t.done).length} / {todos.length} 완료
                </span>
                <button onClick={handleResetTodos} className="text-slate-400 hover:text-rose-500 p-1 transition-colors" title="목록 초기화">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 mb-4 max-h-[140px] overflow-y-auto custom-scrollbar pr-1">
              {todos.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-2">오늘의 할 일을 추가해보세요!</p>
              ) : (
                todos.map(todo => (
                  <button 
                    key={todo.id} 
                    onClick={() => toggleTodo(todo.id)}
                    className="w-full flex items-center gap-3 text-left group"
                  >
                    {todo.done ? (
                      <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                    ) : (
                      <Circle size={20} className="text-slate-300 group-hover:text-slate-400 shrink-0" />
                    )}
                    <span className={`text-sm font-medium break-all ${todo.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                      {todo.text}
                    </span>
                  </button>
                ))
              )}
            </div>

            <form onSubmit={handleAddTodo} className="flex gap-2">
              <input 
                type="text" 
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="새로운 할 일 추가..."
                className="flex-1 bg-slate-50 border border-slate-200 text-sm px-3 py-2.5 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
              />
              <button type="submit" disabled={!newTodo.trim()} className="bg-indigo-600 disabled:bg-slate-300 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-colors">
                <Plus size={18} />
              </button>
            </form>
          </div>

          {/* Controls */}
          <div className="flex gap-3 mt-auto shrink-0 pb-4">
            {appState !== 'focus' ? (
              <button 
                onClick={() => setAppState('focus')}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 transition-all active:scale-95"
              >
                <Play size={20} /> 공부로 복귀하기
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setAppState('rest')}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm border border-slate-200 transition-all active:scale-95"
                >
                  <Pause size={20} /> 일시정지
                </button>
                <button 
                  onClick={() => setAppState('play')}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  <Coffee size={20} /> 고양이랑 놀기
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col relative px-6 py-6 overflow-y-auto custom-scrollbar">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Calendar size={24} className="text-indigo-600"/> 
            학습 캘린더
          </h2>
          
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6 shrink-0">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-bold text-slate-700">2026년 7월</h3>
              <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full flex items-center gap-1">
                <Flame size={14} /> 12일 연속!
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                <div key={d} className="text-[10px] font-bold text-slate-400">{d}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => (
                <div 
                  key={idx} 
                  onClick={() => day && setSelectedDate(day.date)}
                  className={`aspect-square rounded-xl flex items-center justify-center relative cursor-pointer transition-all ${
                    !day ? '' : 
                    selectedDate === day.date ? 'bg-indigo-600 text-white shadow-md scale-110 z-10' : 
                    day.date === 14 ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200' :
                    'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  {day && (
                    <>
                      <span className="text-[13px] font-bold z-10">{day.date}</span>
                      {day.hours > 0 && day.date !== selectedDate && (
                        <PawPrint 
                          size={22} 
                          className={`absolute opacity-20 ${day.hours >= 4 ? 'text-indigo-600 opacity-40' : 'text-slate-400'}`} 
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {selectedDate && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedDate}
              className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100 flex items-center justify-between shrink-0 mb-4"
            >
              <div>
                <div className="text-sm font-bold text-indigo-900 mb-1 flex items-center gap-1.5">
                  <Calendar size={14} /> 7월 {selectedDate}일 기록
                </div>
                <div className="text-3xl font-black text-indigo-600 tracking-tight">
                  {calendarDays.find(d => d?.date === selectedDate)?.hours === 0 
                    ? '휴식일' 
                    : `${Math.floor(calendarDays.find(d => d?.date === selectedDate)?.hours || 0)}시간 ${Math.round(((calendarDays.find(d => d?.date === selectedDate)?.hours || 0) % 1) * 60)}분`}
                </div>
              </div>
              {(calendarDays.find(d => d?.date === selectedDate)?.hours || 0) > 0 ? (
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-indigo-500 shrink-0">
                  <PawPrint size={28} />
                </div>
              ) : (
                <div className="w-14 h-14 bg-white/50 rounded-full flex items-center justify-center text-indigo-300 shrink-0">
                  <Coffee size={24} />
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Bottom Nav */}
      <div className="bg-white border-t border-slate-100 flex justify-around p-3 pb-6 shrink-0 rounded-b-[2.5rem] z-10 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setPrototypeTab('timer')} 
          className={`flex flex-col items-center gap-1.5 w-16 transition-colors ${prototypeTab === 'timer' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Clock size={24} className={prototypeTab === 'timer' ? 'fill-indigo-100' : ''} />
          <span className="text-[10px] font-bold">타이머</span>
        </button>
        <button 
          onClick={() => setPrototypeTab('calendar')} 
          className={`flex flex-col items-center gap-1.5 w-16 transition-colors ${prototypeTab === 'calendar' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <Calendar size={24} className={prototypeTab === 'calendar' ? 'fill-indigo-100' : ''} />
          <span className="text-[10px] font-bold">캘린더</span>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center py-10 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <PrototypeView />
    </div>
  );
}

