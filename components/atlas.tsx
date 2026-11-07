'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, Download, FileText, Moon, Play, Sparkles, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Destination = { id: string; label: string; eyebrow: string; description: string; x: number; y: number; accent: string; icon: typeof Sparkles }

const destinations: Destination[] = [
  { id: 'about', label: 'About me', eyebrow: 'the person behind the work', description: 'A curious technologist grounded in people, learning, and possibility.', x: 21, y: 31, accent: '#f0c5d3', icon: Sparkles },
  { id: 'experience', label: 'Experience', eyebrow: 'the work so far', description: 'Roles, leadership, and the moments that shaped my practice.', x: 73, y: 24, accent: '#d99cae', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', eyebrow: 'where ideas become real', description: 'Selected experiments across AI, data, mobile, and the web.', x: 83, y: 67, accent: '#c4a7e7', icon: Sparkles },
  { id: 'skills', label: 'Skills', eyebrow: 'my working vocabulary', description: 'A growing toolkit for thoughtful, useful technology.', x: 62, y: 86, accent: '#b7d8c0', icon: Sparkles },
  { id: 'journey', label: 'My journey', eyebrow: 'the through-line', description: 'A branching path through study, leadership, and what comes next.', x: 27, y: 80, accent: '#e9c38f', icon: Sparkles },
  { id: 'pitch', label: 'Elevator pitch', eyebrow: 'meet me in 60 seconds', description: 'A short video introduction to who I am and what I’m building toward.', x: 12, y: 63, accent: '#d4b4ed', icon: Play },
  { id: 'linkedin', label: 'LinkedIn', eyebrow: 'professional orbit', description: 'Connect with me on LinkedIn.', x: 88, y: 42, accent: '#9cc6d9', icon: ArrowUpRight },
  { id: 'github', label: 'GitHub', eyebrow: 'the code archive', description: 'Browse my projects and experiments.', x: 38, y: 15, accent: '#c7c3e5', icon: ArrowUpRight },
  { id: 'resume', label: 'Resume', eyebrow: 'a concise overview', description: 'Download my current resume as a PDF.', x: 67, y: 10, accent: '#d8b5e8', icon: FileText },
  { id: 'cover-letter', label: 'Cover letter', eyebrow: 'the longer story', description: 'Read my cover letter and what I am looking for.', x: 8, y: 36, accent: '#e4b5c6', icon: FileText },
]

// Drop your video file into /public and set the path here, e.g. '/elevator-pitch.mp4'.
// Leave empty to show the "coming soon" placeholder.
const PITCH_VIDEO_SRC = '/elevator-pitch.mp4'

const skillGroups = [
  { name: 'Languages', items: ['Python', 'Java', 'HTML', 'CSS', 'JavaScript', 'SQL'] },
  { name: 'AI & Data', items: ['Machine Learning', 'Computer Vision', 'YOLOv8', 'Feature Engineering', 'Prediction Models'] },
  { name: 'Frameworks', items: ['Next.js', 'React Native'] },
  { name: 'Tools', items: ['Android Studio', 'VS Code', 'PyCharm', 'GitHub', 'Unity'] },
  { name: 'Databases', items: ['SQLite', 'Firebase'] },
  { name: 'Software', items: ['Adobe Creative Suite', 'Excel'] },
  { name: 'Foundations', items: ['Data Structures', 'Algorithms'] },
  { name: 'Strengths', items: ['Communication', 'Teaching', 'Event leadership'] },
]

const projects = [
  { title: 'Family Expense Parser', type: 'AI · Web application', description: 'A web application that turns bank and credit card PDF statements into structured family spending data, with AI-powered categorization and budgeting insights.', tech: 'Next.js · TypeScript · Claude API · PDF parsing' },
  { title: 'Room Decor Recommendation App', type: 'Computer vision · Mobile', description: 'A mobile app that analyzes room imagery with object detection and recommends decor based on user preferences, with a shopping cart flow.', tech: 'React Native · YOLOv8 · Firebase' },
  { title: 'Autonomous Agent Navigation', type: 'Reinforcement learning · Simulation', description: 'A simulated agent trained to locate a target using reward shaping, refined boundaries, and more efficient training loops.', tech: 'Python · Unity ML-Agents · Reinforcement learning' },
]

function Stars() {
  return <div className="starfield" aria-hidden="true">{Array.from({ length: 34 }).map((_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, top: `${(i * 61) % 100}%`, animationDelay: `${(i % 7) * 0.45}s`, opacity: 0.25 + (i % 5) * 0.1 }} />)}</div>
}

const constellationCoordinates: Record<string, [number, number]> = {
  about: [150, 310], experience: [375, 310], projects: [600, 310], skills: [825, 310], journey: [1050, 310],
  resume: [150, 580], 'cover-letter': [375, 580], github: [600, 580], linkedin: [825, 580], pitch: [1050, 580],
}

function openDestination(item: Destination, onSelect: (destination: Destination) => void) {
  if (item.id === 'github') window.open('https://github.com/farhana-07', '_blank', 'noopener,noreferrer')
  else if (item.id === 'linkedin') window.open('https://www.linkedin.com/in/farhana-ashiq', '_blank', 'noopener,noreferrer')
  else if (item.id === 'resume') window.open('/resume-farhana-ashiq.pdf', '_blank', 'noopener,noreferrer')
  else if (item.id === 'cover-letter') window.open('/cover-letter-farhana-ashiq.pdf', '_blank', 'noopener,noreferrer')
  else onSelect(item)
}

function Atlas({ onSelect }: { onSelect: (destination: Destination) => void }) {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  return <section className="atlas" aria-labelledby="atlas-heading">
    <div className="atlas-glow" />
    <div className="hero-copy">
      <p className="kicker">Portfolio</p>
      <h1 id="atlas-heading">Constellation<br /><em>of Experiences.</em></h1>
      <p className="hero-intro">I’m <strong>Farhana Ashiq</strong> — a computer science, data science, and economics student exploring how technology can make everyday life more useful, human, and full of possibility.</p>
      <p className="scroll-note"><span className="scroll-line" /> Scroll to explore the atlas</p>
    </div>
    <div className="constellation-panel">
      <div className="constellation-intro"><span className="kicker">the atlas</span><span>one center · ten directions</span></div>
      <svg className="constellation-svg" viewBox="0 0 1200 750" role="navigation" aria-label="Portfolio sections">
        <g className="constellation-lines" aria-hidden="true">
          {['about', 'experience', 'projects', 'skills', 'journey'].map((id) => { const [x, y] = constellationCoordinates[id]; return <path key={id} d={`M 600 100 C 600 160, ${x} 220, ${x} ${y}`} style={{ stroke: destinations.find((item) => item.id === id)?.accent }} className={hovered === id ? 'active' : ''} /> })}
          {['about', 'experience', 'projects', 'skills', 'journey'].map((from, index) => { const [x1, y1] = constellationCoordinates[from]; const [x2, y2] = constellationCoordinates[['resume', 'cover-letter', 'github', 'linkedin', 'pitch'][index]]; return <path key={`${from}-child`} d={`M ${x1} ${y1} C ${x1} 390, ${x2} 500, ${x2} ${y2}`} style={{ stroke: destinations.find((item) => item.id === from)?.accent }} className={hovered === from ? 'active' : ''} /> })}
        </g>
        <motion.g className="svg-center-node" animate={reducedMotion ? undefined : { scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <circle cx="600" cy="100" r="55" />
          <text x="600" y="108" className="center-initials">FA</text>
          <text x="600" y="178" className="center-caption">THE CENTER{`\n`}OF IT ALL</text>
        </motion.g>
        {destinations.map((item) => { const [x, y] = constellationCoordinates[item.id]; const Icon = item.icon; return <g key={item.id} className={`svg-destination ${hovered === item.id ? 'is-hovered' : ''}`} role="button" tabIndex={0} aria-label={`Open ${item.label}`} onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(item.id)} onBlur={() => setHovered(null)} onClick={() => openDestination(item, onSelect)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openDestination(item, onSelect) } }}>
          <circle cx={x} cy={y} r="33" className="svg-node-halo" /><circle cx={x} cy={y} r="28" className="svg-node" style={{ stroke: item.accent }} /><Icon x={x - 9} y={y - 9} size={18} strokeWidth={1.5} className="svg-node-icon" style={{ color: item.accent }} /><text x={x} y={y + 61} className="svg-label">{item.label.toUpperCase()}</text>
        </g> })}
      </svg>
      <p className="atlas-caption">Ten places to begin · <span>follow your curiosity</span></p>
    </div>
  </section>
}

function SectionView({ destination, onBack }: { destination: Destination; onBack: () => void }) {
  const [open, setOpen] = useState<string | null>(destination.id === 'experience' ? 'AIMHA' : null)
  const isDark = destination.id === 'projects' || destination.id === 'pitch'
  return <motion.section className={`section-view section-${destination.id} ${isDark ? 'dark-section' : ''}`} style={{ '--accent': destination.accent } as React.CSSProperties} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .45 }}>
    <button className="back-button" onClick={onBack}><span>←</span> Back to atlas</button>
    <div className="section-heading"><p className="kicker">{destination.eyebrow}</p><h2>{destination.label}<em>.</em></h2></div>
    {destination.id === 'about' && <div className="about-grid"><div className="portrait-frame"><img className="portrait-photo" src="/portrait.jpg" alt="Portrait of Farhana Ashiq" width={1000} height={1500} /></div><div className="prose"><p className="lead">I like standing at the intersection of <em>systems and stories.</em></p><p>I’m currently studying Computer Science, Data Science, and Economics at Rutgers University–New Brunswick graduating December 2028, where I’m learning to pair technical rigor with a grounded understanding of people and the world around them.</p><p>From machine learning and mobile development to teaching Sunday school, I’m drawn to work that makes complex ideas feel clear, accessible, and useful.</p><div className="fact-card"><Sparkles size={18} /><div><span>Beyond the resume</span><p>I’m a co-founder and treasurer of AI in Medicine and Healthcare — exploring how predictive models can support better clinical decisions.</p></div></div></div></div>}
    {destination.id === 'experience' && <div className="timeline">{[{ company: 'AI in Medicine & Healthcare', role: 'Treasurer · Co-founder', date: 'Fall 2026 — Present', text: 'Co-founded an interdisciplinary student organization exploring applied AI, predictive analytics, and machine learning in clinical diagnostics and healthcare.' }, { company: 'Muslim Tech Collaboration', role: 'Board Member · Social Team', date: 'Spring 2026 — Present', text: 'Plan events and attendee experience; co-organized an 8-hour hackathon with 20+ teams, guest speakers, and judges.' }, { company: 'Regain AI', role: 'AI & Android App Development Intern', date: 'Summer 2024', text: 'Helped develop an AI algorithm to classify apps as addictive or non-addictive, achieving 95% accuracy by analyzing time-use patterns and app descriptions.' }].map((item) => <button className={`timeline-item ${open === item.company ? 'open' : ''}`} key={item.company} onClick={() => setOpen(open === item.company ? null : item.company)}><div className="timeline-meta"><span>{item.date}</span><span>↗</span></div><h3>{item.company}</h3><p className="role">{item.role}</p>{open === item.company && <p className="timeline-detail">{item.text}</p>}</button>)}</div>}
    {destination.id === 'projects' && <><article className="project-card sample-work"><div className="project-info"><p className="kicker">Sample work · Group presentation · Nov 2026</p><h3>AI in Health and Medicine: Lessons for Higher Education</h3><p>A team presentation on AI in Higher Education for the University Librarian’s Symposium at Rutgers. It uses real tensions from AI in healthcare — reliability, privacy, transparency, equity, and legal liability — to ask how universities should handle AI in teaching and learning. I presented the equity and access, conflicts of interest, and legal sections. I also took part in the Q&A, where professors asked students for their views on AI in their education.</p><p className="sample-presenters">Co-presented with Saanvika Polosa, Anudi Perera, and Mihira Vudata</p><p className="sample-skills">Research · Public speaking · Team collaboration · AI ethics &amp; policy</p><div className="sample-links"><a href="/aimha-symposium-ai-in-health-and-medicine.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open the AIMHA symposium presentation PDF in a new tab"><FileText size={15} /> View presentation</a><a href="/aimha-symposium-ai-in-health-and-medicine.pdf" download aria-label="Download the AIMHA symposium presentation PDF"><Download size={15} /> Download PDF <small>13 MB</small></a></div></div></article><div className="project-grid">{projects.map((project, i) => <article className={`project-card project-${i}`} key={project.title}><div className="project-art"><span>0{i + 1}</span><div className="art-orbit" /></div><div className="project-info"><p className="kicker">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p><small>{project.tech}</small></div></article>)}</div></>}
    {destination.id === 'skills' && <div className="skills-layout"><div className="skill-orbit"><span className="skill-core">how<br />I work</span>{['Python', 'Java', 'AI / ML', 'Data', 'JavaScript', 'Design'].map((skill, i) => <span className={`skill-node sn-${i}`} key={skill}>{skill}</span>)}</div><div className="prose"><p className="lead">A toolkit that is always <em>in progress.</em></p><p>I’m most energized by the space between learning a new technical system and finding a clear way to use it. My current vocabulary includes Python, Java, JavaScript, SQL, machine learning, computer vision, React Native, Firebase, Unity, and more.</p><div className="skill-groups">{skillGroups.map(group => <section className="skill-group" key={group.name}><h3>{group.name}</h3><div className="skill-items">{group.items.map(item => <span key={item}>{item}</span>)}</div></section>)}</div></div></div>}
    {destination.id === 'journey' && <div className="journey-layout"><div className="journey-list">{[['2024', 'Regain AI', 'First deep dive into AI and Android development.'], ['2025', 'Rutgers University', 'Started a multidisciplinary path across CS, data science, and economics.'], ['2026', 'AIMHA + MTC', 'Stepped into leadership, community-building, and AI in healthcare.'], ['Nov 2026', 'University Librarian’s Symposium', 'Co-presented on AI ethics and law in healthcare — and what they mean for higher education — at Rutgers’ University Librarian’s Symposium.'], ['Next', 'The horizon', 'Looking for meaningful opportunities to learn, contribute, and build.']].map((item, i) => <div className="journey-item" key={item[0]}><span className="journey-year">{item[0]}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></div>)}</div><p className="journey-quote">“Technology is not just something we build. It is something we build <em>for people.</em>”</p></div>}
    {(destination.id === 'linkedin' || destination.id === 'github') && <div className="connect-layout social-destination"><div><p className="lead">Follow the <em>work.</em></p><p className="connect-copy">Find the latest projects, experiments, and professional updates.</p><div className="connect-links">{destination.id === 'github' ? <a href="https://github.com/farhana-07" target="_blank" rel="noreferrer"><span aria-hidden="true">GH</span> Open GitHub <ArrowUpRight size={14} /></a> : <a href="https://www.linkedin.com/in/farhana-ashiq" target="_blank" rel="noreferrer"><span aria-hidden="true">in</span> Open LinkedIn <ArrowUpRight size={14} /></a>}</div></div></div>}
    {destination.id === 'pitch' && <div className="pitch-layout"><div className="video-card">{PITCH_VIDEO_SRC ? <video src={PITCH_VIDEO_SRC} controls playsInline preload="metadata" aria-label="Farhana Ashiq elevator pitch video" /> : <div><div className="video-mark"><Play size={22} fill="currentColor" /></div><p>Meet Me in 60 Seconds</p><small>elevator pitch video · coming soon</small></div>}</div></div>}
    {destination.id === 'experience' && <div className="resource-row"><a href="/resume-farhana-ashiq.pdf" download><Download size={15} /> Resume PDF <small>download</small></a><a href="/cover-letter-farhana-ashiq.pdf" download><Download size={15} /> Cover letter <small>download</small></a></div>}
  </motion.section>
}

export default function AtlasExperience() {
  const [selected, setSelected] = useState<Destination | null>(null)
  const [daylight, setDaylight] = useState(false)
  useEffect(() => { const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])
  useEffect(() => { document.body.classList.toggle('daylight', daylight) }, [daylight])
  return <main className={daylight ? 'portfolio daylight' : 'portfolio'}><Stars /><header className="site-header"><a className="brand" href="#" onClick={(e) => { e.preventDefault(); setSelected(null) }}>FA</a><div className="header-actions"><nav aria-label="Main navigation">{destinations.slice(0, 4).map(d => <button key={d.id} onClick={() => setSelected(d)}>{d.label}</button>)}</nav><button className="theme-button" onClick={() => setDaylight(!daylight)} aria-label="Toggle theme">{daylight ? <Moon size={16} /> : <Sun size={16} />}</button></div></header><AnimatePresence mode="wait">{selected ? <SectionView key={selected.id} destination={selected} onBack={() => setSelected(null)} /> : <Atlas key="atlas" onSelect={setSelected} />}</AnimatePresence><footer className="site-footer"><span>© Farhana Ashiq</span><span>CS · DS · Economics</span><span>Made with intention <span className="footer-dot">✦</span></span></footer></main>
}