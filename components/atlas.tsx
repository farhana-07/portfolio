'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, Download, Github, Linkedin, Mail, Moon, Play, Sparkles, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type Destination = { id: string; label: string; eyebrow: string; description: string; x: number; y: number; accent: string; icon: typeof Sparkles }

const destinations: Destination[] = [
  { id: 'about', label: 'About me', eyebrow: 'the person behind the work', description: 'A curious technologist grounded in people, learning, and possibility.', x: 21, y: 31, accent: '#f0c5d3', icon: Sparkles },
  { id: 'experience', label: 'Experience', eyebrow: 'the work so far', description: 'Roles, leadership, and the moments that shaped my practice.', x: 73, y: 24, accent: '#d99cae', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', eyebrow: 'where ideas become real', description: 'Selected experiments across AI, data, mobile, and the web.', x: 83, y: 67, accent: '#c4a7e7', icon: Sparkles },
  { id: 'skills', label: 'Skills', eyebrow: 'my working vocabulary', description: 'A growing toolkit for thoughtful, useful technology.', x: 62, y: 86, accent: '#b7d8c0', icon: Sparkles },
  { id: 'journey', label: 'My journey', eyebrow: 'the through-line', description: 'A branching path through study, leadership, and what comes next.', x: 27, y: 80, accent: '#e9c38f', icon: Sparkles },
  { id: 'connect', label: 'Connect', eyebrow: 'the next constellation', description: 'Let’s build something meaningful together.', x: 12, y: 63, accent: '#d4b4ed', icon: Mail },
]

const projects = [
  { title: 'Family Expense Parser', type: 'AI · Web application', description: 'A web application that turns bank and credit card PDF statements into structured family spending data, with AI-powered categorization and budgeting insights.', tech: 'Next.js · TypeScript · Claude API · PDF parsing' },
  { title: 'Room Decor Recommendation App', type: 'Computer vision · Mobile', description: 'A mobile app that analyzes room imagery with object detection and recommends decor based on user preferences, with a shopping cart flow.', tech: 'React Native · YOLOv8 · Firebase' },
  { title: 'Autonomous Agent Navigation', type: 'Reinforcement learning · Simulation', description: 'A simulated agent trained to locate a target using reward shaping, refined boundaries, and more efficient training loops.', tech: 'Python · Unity ML-Agents · Reinforcement learning' },
]

function Stars() {
  return <div className="starfield" aria-hidden="true">{Array.from({ length: 34 }).map((_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${(i % 7) * 0.45}s`, opacity: 0.25 + (i % 5) * 0.1 }} />)}</div>
}

function Atlas({ onSelect }: { onSelect: (destination: Destination) => void }) {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  const lines = [[50, 51, 21, 31], [50, 51, 73, 24], [50, 51, 83, 67], [50, 51, 62, 86], [50, 51, 27, 80], [50, 51, 12, 63]]
  return <section className="atlas" aria-labelledby="atlas-heading">
    <div className="atlas-glow" />
    <div className="hero-copy">
      <p className="kicker">Portfolio · 2026 <span className="rule" /> New Brunswick, NJ</p>
      <h1 id="atlas-heading">A constellation<br /><em>of experiences.</em></h1>
      <p className="hero-intro">I’m <strong>Farhana Ashiq</strong> — a computer science, data science, and economics student exploring how technology can make everyday life more useful, human, and full of possibility.</p>
      <p className="scroll-note"><span className="scroll-line" /> Explore the atlas</p>
    </div>
    <div className="constellation" role="navigation" aria-label="Portfolio sections">
      <svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{lines.map(([x1, y1, x2, y2], i) => <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`} className={hovered === destinations[i].id ? 'active' : ''} style={{ stroke: destinations[i].accent }} />)}</svg>
      <motion.div className="me-star" animate={reducedMotion ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><span>FA</span><small>the center<br />of it all</small></motion.div>
      {destinations.map((item) => { const Icon = item.icon; return <motion.button key={item.id} className={`destination ${hovered === item.id ? 'is-hovered' : ''}`} style={{ left: `${item.x}%`, top: `${item.y}%`, '--accent': item.accent } as React.CSSProperties} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(item.id)} onBlur={() => setHovered(null)} onClick={() => onSelect(item)} whileHover={reducedMotion ? undefined : { scale: 1.08 }} aria-label={`Open ${item.label}`}><span className="node-halo" /><span className="node"><Icon size={16} strokeWidth={1.5} /></span><span className="destination-label">{item.label}</span><AnimatePresence>{hovered === item.id && <motion.span className="tooltip" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}><small>{item.eyebrow}</small>{item.description}</motion.span>}</AnimatePresence></motion.button> })}
    </div>
    <p className="atlas-caption">Six places to begin · <span>follow your curiosity</span></p>
  </section>
}

function SectionView({ destination, onBack }: { destination: Destination; onBack: () => void }) {
  const [open, setOpen] = useState<string | null>(destination.id === 'experience' ? 'AIMHA' : null)
  const isDark = destination.id === 'projects' || destination.id === 'connect'
  return <motion.section className={`section-view section-${destination.id} ${isDark ? 'dark-section' : ''}`} style={{ '--accent': destination.accent } as React.CSSProperties} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .45 }}>
    <button className="back-button" onClick={onBack}><span>←</span> Back to atlas</button>
    <div className="section-heading"><p className="kicker">{destination.eyebrow}</p><h2>{destination.label}<em>.</em></h2></div>
    {destination.id === 'about' && <div className="about-grid"><div className="portrait-frame"><div className="portrait-placeholder"><span>FA</span><small>portrait<br />coming soon</small></div><span className="annotation">curious by nature ↗</span></div><div className="prose"><p className="lead">I like standing at the intersection of <em>systems and stories.</em></p><p>I’m currently studying Computer Science, Data Science, and Economics at Rutgers University–New Brunswick, where I’m learning to pair technical rigor with a grounded understanding of people and the world around them.</p><p>From machine learning and mobile development to teaching Sunday school, I’m drawn to work that makes complex ideas feel clear, accessible, and useful.</p><div className="fact-card"><Sparkles size={18} /><div><span>Beyond the resume</span><p>I’m a co-founder and treasurer of AI in Medicine and Healthcare — exploring how predictive models can support better clinical decisions.</p></div></div></div></div>}
    {destination.id === 'experience' && <div className="timeline">{[{ company: 'AI in Medicine & Healthcare', role: 'Treasurer · Co-founder', date: 'Fall 2026 — Present', text: 'Co-founded an interdisciplinary student organization exploring applied AI, predictive analytics, and machine learning in clinical diagnostics and healthcare.' }, { company: 'Muslim Tech Collaboration', role: 'Board Member · Social Team', date: 'Spring 2026 — Present', text: 'Plan events and attendee experience; co-organized an 8-hour hackathon with 20+ teams, guest speakers, and judges.' }, { company: 'Regain AI', role: 'AI & Android App Development Intern', date: 'Summer 2024', text: 'Helped develop an AI algorithm to classify apps as addictive or non-addictive, achieving 95% accuracy by analyzing time-use patterns and app descriptions.' }].map((item) => <button className={`timeline-item ${open === item.company ? 'open' : ''}`} key={item.company} onClick={() => setOpen(open === item.company ? null : item.company)}><div className="timeline-meta"><span>{item.date}</span><span>↗</span></div><h3>{item.company}</h3><p className="role">{item.role}</p><AnimatePresence>{open === item.company && <motion.p className="timeline-detail" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>{item.text}</motion.p>}</AnimatePresence></button>)}</div>}
    {destination.id === 'projects' && <div className="project-grid">{projects.map((project, i) => <article className={`project-card project-${i}`} key={project.title}><div className="project-art"><span>0{i + 1}</span><div className="art-orbit" /></div><div className="project-info"><p className="kicker">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><small>{project.tech}</small></div></article>)}</div>}
    {destination.id === 'skills' && <div className="skills-layout"><div className="skill-orbit"><span className="skill-core">how<br />I work</span>{['Python', 'Java', 'AI / ML', 'Data', 'JavaScript', 'Design'].map((skill, i) => <span className={`skill-node sn-${i}`} key={skill}>{skill}</span>)}</div><div className="prose"><p className="lead">A toolkit that is always <em>in progress.</em></p><p>I’m most energized by the space between learning a new technical system and finding a clear way to use it. My current vocabulary includes Python, Java, JavaScript, SQL, machine learning, computer vision, React Native, Firebase, Unity, and more.</p><div className="tag-list">{['Problem solving', 'Communication', 'Feature engineering', 'Data structures', 'Teaching', 'Event leadership'].map(tag => <span key={tag}>{tag}</span>)}</div></div></div>}
    {destination.id === 'journey' && <div className="journey-layout"><div className="journey-list">{[['2024', 'Regain AI', 'First deep dive into AI and Android development.'], ['2025', 'Rutgers University', 'Started a multidisciplinary path across CS, data science, and economics.'], ['2026', 'AIMHA + MTC', 'Stepped into leadership, community-building, and AI in healthcare.'], ['Next', 'The horizon', 'Looking for meaningful opportunities to learn, contribute, and build.']].map((item, i) => <div className="journey-item" key={item[0]}><span className="journey-year">{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></div>)}</div><p className="journey-quote">“Technology is not just something we build. It is something we build <em>for people.</em>”</p></div>}
    {destination.id === 'connect' && <div className="connect-layout"><div><p className="lead">Let&apos;s build something <em>meaningful.</em></p><p className="connect-copy">Have a question, an idea, or an opportunity that might be a fit? I&apos;d love to hear from you.</p><div className="connect-links"><a href="mailto:farhanaashiq07@gmail.com"><Mail size={17} /> Email <ArrowUpRight size={14} /></a><a href="https://github.com/farhana-07" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/farhana-ashiq" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a></div></div><div className="video-card"><div className="video-mark"><Play size={22} fill="currentColor" /></div><p>Meet Me in 60 Seconds</p><small>elevator pitch video · coming soon</small></div></div>}
    {destination.id === 'experience' && <div className="resource-row"><a href="#" onClick={(e) => e.preventDefault()}><Download size={15} /> Resume PDF <small>coming soon</small></a><a href="#" onClick={(e) => e.preventDefault()}><Download size={15} /> Cover letter <small>coming soon</small></a></div>}
  </motion.section>
}

export default function AtlasExperience() {
  const [selected, setSelected] = useState<Destination | null>(null)
  const [daylight, setDaylight] = useState(false)
  useEffect(() => { const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])
  useEffect(() => { document.body.classList.toggle('daylight', daylight) }, [daylight])
  return <main className={daylight ? 'portfolio daylight' : 'portfolio'}><Stars /><header className="site-header"><a className="brand" href="#" onClick={(e) => { e.preventDefault(); setSelected(null) }}>FA<span>/</span>26</a><div className="header-actions"><nav aria-label="Main navigation">{destinations.slice(0, 4).map(d => <button key={d.id} onClick={() => setSelected(d)}>{d.label}</button>)}</nav><button className="theme-button" onClick={() => setDaylight(!daylight)} aria-label="Toggle theme">{daylight ? <Moon size={16} /> : <Sun size={16} />}</button></div></header><AnimatePresence mode="wait">{selected ? <SectionView key={selected.id} destination={selected} onBack={() => setSelected(null)} /> : <Atlas key="atlas" onSelect={setSelected} />}</AnimatePresence><footer className="site-footer"><span>© Farhana Ashiq</span><span>CS · DS · Economics</span><span>Made with intention <span className="footer-dot">✦</span></span></footer></main>
}
