import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode, RefObject } from 'react'

// Imagens do briefing copiadas localmente; fontes originais em design/referencias.md.
const images = {
  hero: `${import.meta.env.BASE_URL}img/hero_image.webp`,
  smile: `${import.meta.env.BASE_URL}img/section2_image.webp`,
  implant: `${import.meta.env.BASE_URL}img/section3_img1.webp`,
  care: `${import.meta.env.BASE_URL}img/section3_img2.webp`,
  portrait: `${import.meta.env.BASE_URL}img/section3_bg.webp`,
  portrait480: `${import.meta.env.BASE_URL}img/section3_bg_480.webp`,
  portrait800: `${import.meta.env.BASE_URL}img/section3_bg_800.webp`,
}
const services = [
  { name: 'Facetas dentárias', short: <>Facetas<br />dentárias</>, text: 'Detalhes que fazem a diferença.', description: 'Uma proposta estética personalizada, que considera o formato, a cor e a harmonia do sorriso. A indicação depende de uma avaliação individual.', points: ['Conversa sobre suas expectativas', 'Planejamento do sorriso', 'Orientações de cuidado e manutenção'] },
  { name: 'Coroas dentárias', short: <>Coroas<br />dentárias</>, text: 'Cuidado para seguir sorrindo.', description: 'Restaurações planejadas para recuperar a forma e a função de dentes que precisam de uma reconstrução mais abrangente.', points: ['Avaliação da estrutura do dente', 'Escolha individualizada da restauração', 'Acompanhamento após o tratamento'] },
  { name: 'Clareamento dental', short: <>Clareamento<br />dental</>, text: 'A luminosidade do seu sorriso.', description: 'Um cuidado estético orientado por um dentista, com planejamento de acordo com as características e necessidades de cada sorriso.', points: ['Avaliação antes de começar', 'Definição da abordagem adequada', 'Acompanhamento e orientações'] },
  { name: 'Implantes dentários', short: <>Implantes<br />dentários</>, text: 'Novos motivos para sorrir.', description: 'Um caminho de reabilitação para quem perdeu um ou mais dentes. O planejamento considera suas necessidades e as condições individuais de saúde bucal.', points: ['Escuta e avaliação individual', 'Planejamento da reabilitação', 'Cuidados e acompanhamento contínuos'] },
]
const faqs = [
  ['Como funciona a primeira consulta?', 'Na proposta da Dentora, tudo começa com uma conversa: entender suas expectativas, conhecer sua história e avaliar seu sorriso. Depois, o plano de cuidado é explicado com clareza, para que as decisões sejam tomadas em conjunto.'],
  ['Quais tratamentos a Dentora oferece?', 'Este conceito apresenta facetas, coroas, clareamento e implantes dentários. Em uma clínica real, a indicação de cada tratamento dependeria de uma avaliação profissional individual.'],
  ['Posso conhecer a clínica antes de decidir?', 'A experiência foi pensada para acolher desde o primeiro contato. Neste portfólio, você pode conhecer a proposta, explorar os tratamentos e experimentar a interface de agendamento.'],
  ['Como funciona o agendamento neste site?', 'O agendamento é uma demonstração interativa. Você escolhe uma preferência de atendimento e vê um resumo. Nenhuma consulta é marcada e nenhum dado é enviado ou armazenado.'],
  ['As fotos mostram pacientes reais da Dentora?', 'Não. A Dentora é uma clínica fictícia criada para um projeto de portfólio. As imagens são ilustrativas e não representam pacientes, equipe ou resultados de tratamentos da clínica.'],
]

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={diagonal ? 'arrow diagonal' : 'arrow'}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function Tooth() {
  return <svg aria-hidden="true" viewBox="0 0 40 44" fill="none"><path d="M8 5c5-4 9 1 12 1s7-5 12-1c9 7-1 32-6 32-4 0-1-17-6-17S18 37 14 37C9 37-1 12 8 5Z" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" /><path d="M15 8c4 2 7 2 10 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
}
function Logo() { return <a href="#inicio" className="logo" aria-label="Dentora, início"><Tooth /><span>dentora<span className="logo-caption">ODONTOLOGIA COM PROPÓSITO</span></span></a> }
function useMedia(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => { const media = window.matchMedia(query); const update = () => setMatches(media.matches); media.addEventListener('change', update); update(); return () => media.removeEventListener('change', update) }, [query])
  return matches
}
type Position = { x: number; y: number; sw: number; sh: number }
function useMaskPositions(container: RefObject<HTMLDivElement | null>, cards: RefObject<(HTMLDivElement | null)[]>) {
  const [positions, setPositions] = useState<Position[]>([])
  useLayoutEffect(() => {
    const el = container.current
    if (!el) return
    const update = () => {
      const section = el.getBoundingClientRect()
      setPositions(cards.current.map(card => { const rect = card?.getBoundingClientRect(); return { x: rect ? rect.left - section.left : 0, y: rect ? rect.top - section.top : 0, sw: section.width, sh: section.height } }))
    }
    update()
    const observer = new ResizeObserver(update); observer.observe(el)
    return () => observer.disconnect()
  }, [container, cards])
  return positions
}
function useImageWidth(src: string, position?: Position) {
  const [ratio, setRatio] = useState(1280 / 724)
  useEffect(() => { const img = new Image(); img.onload = () => setRatio(img.naturalWidth / img.naturalHeight); img.src = src; return () => { img.onload = null } }, [src])
  return position ? Math.max(position.sw, position.sh * ratio) : 0
}
function MaskedCard({ bgImage, position, imageWidth, focalX, className = '', children, cardRef, style }: { bgImage: string; position?: Position; imageWidth: number; focalX: number; className?: string; children: ReactNode; cardRef: (el: HTMLDivElement | null) => void; style?: CSSProperties }) {
  const background: CSSProperties = position ? { backgroundImage: `url("${bgImage}")`, backgroundSize: `${imageWidth}px auto`, backgroundPosition: `${-(position.x + Math.max(0, imageWidth - position.sw) * focalX)}px ${-position.y}px` } : { backgroundImage: `url("${bgImage}")`, backgroundSize: 'cover' }
  return <div ref={cardRef} className={`masked-card ${className}`} style={{ ...background, ...style }}>{children}</div>
}
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { threshold: .12 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect() }, [])
  return <div ref={ref} className={`reveal ${visible ? 'visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>{children}</div>
}
function Splash({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem('dentora-intro')) { onComplete(); return }
    let frame = 0; let fade: ReturnType<typeof setTimeout>; let done: ReturnType<typeof setTimeout>
    const start = performance.now()
    const tick = (now: number) => { const value = Math.min(100, Math.floor((now - start) / 20)); setCount(value); if (value < 100) frame = requestAnimationFrame(tick); else { fade = setTimeout(() => setExiting(true), 200); done = setTimeout(() => { sessionStorage.setItem('dentora-intro', 'seen'); onComplete() }, 900) } }
    frame = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(frame); clearTimeout(fade); clearTimeout(done) }
  }, [onComplete])
  return <div className={`splash ${exiting ? 'exiting' : ''}`} aria-hidden="true"><span className="splash-brand">dentora®</span><span className="splash-count">{count}<small> / 100</small></span><span className="splash-message">Um novo motivo para sorrir.</span></div>
}
function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => { const dialog = ref.current!; const previous = document.activeElement as HTMLElement; dialog.showModal(); const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { dialog.close(); document.body.style.overflow = previousOverflow; previous?.focus() } }, [])
  return <dialog ref={ref} className="modal" aria-labelledby="modal-title" onCancel={onClose} onClick={e => { if (e.target === ref.current) onClose() }}><div className="modal-inner"><button className="close-button" aria-label="Fechar janela" onClick={onClose}>×</button><span className="eyebrow">DENTORA · UM OLHAR PARA VOCÊ</span><h2 id="modal-title">{title}</h2>{children}</div></dialog>
}
type Booking = { service: string; date: string; period: string }
function Appointment({ onClose }: { onClose: () => void }) {
  const [result, setResult] = useState<Booking | null>(null)
  const today = new Date(); const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const data = new FormData(e.currentTarget); setResult({ service: String(data.get('service')), date: String(data.get('date')), period: String(data.get('period')) }) }
  return <Modal title={result ? 'Que bom dar esse primeiro passo.' : 'Vamos cuidar do seu sorriso?'} onClose={onClose}>{result ? <div className="booking-result" role="status"><span className="success-mark">✓</span><p>Você concluiu a demonstração de agendamento.</p><dl><div><dt>Tratamento</dt><dd>{result.service}</dd></div><div><dt>Preferência de data</dt><dd>{new Date(`${result.date}T12:00:00`).toLocaleDateString('pt-BR')}</dd></div><div><dt>Período</dt><dd>{result.period}</dd></div></dl><p className="demo-note">Nenhuma consulta foi marcada. Suas escolhas não foram enviadas nem armazenadas.</p><button className="button dark" onClick={() => setResult(null)}>Experimentar novamente <Arrow /></button></div> : <><p>Escolha como você gostaria de começar. O primeiro passo é sempre uma boa conversa.</p><p className="demo-note">Projeto de portfólio: esta é uma simulação, sem coleta de dados pessoais e sem reserva de horário.</p><form onSubmit={submit}><label htmlFor="service">O que você procura?</label><select id="service" name="service" required defaultValue=""><option value="" disabled>Selecione um tratamento</option><option>Avaliação inicial</option>{services.map(s => <option key={s.name}>{s.name}</option>)}</select><label htmlFor="date">Data de preferência</label><input id="date" name="date" type="date" min={minDate} required /><fieldset><legend>Qual período combina com você?</legend><label className="radio"><input type="radio" name="period" value="Manhã" required /> Manhã</label><label className="radio"><input type="radio" name="period" value="Tarde" required /> Tarde</label></fieldset><button className="button dark submit" type="submit">Simular agendamento <Arrow /></button></form></>}</Modal>
}
function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [booking, setBooking] = useState(false)
  const [detail, setDetail] = useState<number | null>(null)
  const [privacy, setPrivacy] = useState(false)
  const [faq, setFaq] = useState<number | null>(0)
  const isMobile = useMedia('(max-width: 767px)')
  const menuDialog = useRef<HTMLDialogElement>(null)
  const menuTrigger = useRef<HTMLButtonElement>(null)
  const heroRef = useRef<HTMLDivElement>(null), heroCards = useRef<(HTMLDivElement | null)[]>([])
  const galleryRef = useRef<HTMLDivElement>(null), galleryCards = useRef<(HTMLDivElement | null)[]>([])
  const heroPos = useMaskPositions(heroRef, heroCards), galleryPos = useMaskPositions(galleryRef, galleryCards)
  const heroWidth = useImageWidth(images.hero, heroPos[0]), galleryWidth = useImageWidth(images.smile, galleryPos[0])
  const completeSplash = useRef(() => setShowSplash(false)).current
  const path = window.location.pathname
  const notFound = !path.endsWith('/') && !path.endsWith('/index.html')
  useEffect(() => {
    if (!menuOpen) return
    const dialog = menuDialog.current!; dialog.showModal(); const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = previous; menuTrigger.current?.focus() }
  }, [menuOpen])
  useEffect(() => { if (!isMobile) setMenuOpen(false) }, [isMobile])
  const openBooking = () => { setMenuOpen(false); setBooking(true) }
  const links = [['A clínica', '#clinica'], ['Tratamentos', '#tratamentos'], ['Nosso cuidado', '#cuidado'], ['Dúvidas', '#duvidas']]
  const bookButton = (label = 'Agendar avaliação', dark = true) => <button className={`button ${dark ? 'dark' : 'light'}`} onClick={openBooking}>{label}<span className="button-icon"><Arrow diagonal /></span></button>
  if (notFound) return <main className="not-found"><Logo /><span className="eyebrow">404 · PÁGINA NÃO ENCONTRADA</span><h1>Vamos voltar<br />a sorrir?</h1><p>Esse endereço não faz parte do nosso site.</p><a className="button dark" href={import.meta.env.BASE_URL}>Voltar ao início <Arrow /></a><a href={`${import.meta.env.BASE_URL}#contato`}>Ir para contato</a></main>
  return <>
    {showSplash && <Splash onComplete={completeSplash} />}
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <header className="header"><Logo /><nav className="desktop-nav" aria-label="Navegação principal">{links.map(([name, href]) => <a key={href} href={href}>{name}</a>)}</nav><div className="header-actions"><span className="header-note"><i /> Seu sorriso, em boas mãos.</span>{bookButton()}<button ref={menuTrigger} className="menu-toggle" aria-label="Abrir menu" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(true)}><span /><span /><span /></button></div></header>
    <dialog ref={menuDialog} id="mobile-menu" className="mobile-menu" onCancel={() => setMenuOpen(false)} onClick={e => { if (e.target === menuDialog.current) setMenuOpen(false) }}><div className="mobile-menu-panel"><div className="mobile-menu-top"><Logo /><button className="close-button" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button></div><nav aria-label="Navegação móvel">{[['Início', '#inicio'], ...links].map(([name, href], i) => <a href={href} key={href} style={{ '--i': i } as CSSProperties} onClick={() => setMenuOpen(false)}>{name}<Arrow diagonal /></a>)}</nav><p>Cuidado humano.<br />Sorrisos de verdade.</p>{bookButton()}<small>Clínica fictícia · Projeto de portfólio</small></div></dialog>
    <main id="conteudo">
      <section id="inicio" className="hero-section" aria-labelledby="hero-title"><div className={`hero-mosaic ${!showSplash ? 'intro-ready' : ''}`} ref={heroRef}>
        {['Tecnologia que cuida.', 'Cuidado que acolhe.', 'Sorrisos que conectam.'].map((feature, i) => <MaskedCard key={feature} bgImage={images.hero} position={heroPos[i]} imageWidth={heroWidth} focalX={isMobile ? .7 : .8} cardRef={el => { heroCards.current[i] = el }} className="feature-bar" style={{ '--i': i } as CSSProperties}><span className="feature-index">0{i + 1}</span><span>{feature}</span><span className="feature-plus">+</span></MaskedCard>)}
        <MaskedCard bgImage={images.hero} position={heroPos[3]} imageWidth={heroWidth} focalX={isMobile ? .7 : .8} cardRef={el => { heroCards.current[3] = el }} className="hero-card"><div className="hero-top"><span className="eyebrow">ODONTOLOGIA COM UM OLHAR PARA VOCÊ</span><span className="tiny-label">CUIDAR É A NOSSA ESSÊNCIA ↗</span></div><div className="hero-copy"><span className="hero-kicker">Mais leveza. Mais confiança. Mais você.</span><h1 id="hero-title">Seu sorriso.<br />Sua melhor<br /><span>versão.</span></h1><div className="hero-cta">{bookButton('Vamos cuidar de você')}<span>Um novo motivo<br />para sorrir todos os dias.</span></div></div><div className="hero-bottom-right"><span className="hero-badge">Um cuidado que<br />começa na escuta.</span><a href="#clinica" className="scroll-link" aria-label="Explorar a clínica"><span>EXPLORE A DENTORA</span><Arrow /></a></div></MaskedCard>
      </div><div className="hero-caption"><span>SAÚDE, ESTÉTICA E BEM-ESTAR.</span><span>FEITO PARA O SEU MELHOR SORRISO.</span><span>ROLE PARA DESCOBRIR ↓</span></div></section>
      <section id="clinica" className="about-section section-space" aria-labelledby="about-title"><Reveal className="about-grid"><div><span className="section-label"><i /> A clínica</span><span className="section-number">01 — ESSÊNCIA</span></div><div><h2 id="about-title">A gente cuida dos dentes.<br /><span>E de quem está por trás<br className="desktop-break" /> do sorriso.</span></h2><div className="about-bottom"><p>Escuta atenta, escolhas conscientes e cuidado em cada detalhe. Uma odontologia que une tecnologia e acolhimento para você se sentir bem, do começo ao fim.</p><a className="text-link" href="#cuidado">Conheça nosso jeito de cuidar <Arrow diagonal /></a></div></div></Reveal><Reveal className="values-strip"><span><b>01</b> Você no centro do cuidado</span><span><b>02</b> Precisão em cada detalhe</span><span><b>03</b> Leveza em cada encontro</span></Reveal></section>
      <section id="tratamentos" className="gallery-section section-shell" aria-labelledby="services-title"><div className="section-heading"><span className="section-label"><i /> Nossos tratamentos</span><span className="section-number">02 — POSSIBILIDADES</span></div><div className="gallery-mosaic" ref={galleryRef}>
        <MaskedCard bgImage={images.smile} position={galleryPos[0]} imageWidth={galleryWidth} focalX={isMobile ? .65 : .8} cardRef={el => { galleryCards.current[0] = el }} className="gallery-intro"><Reveal><span className="eyebrow">UM SORRISO QUE É SÓ SEU</span><h2 id="services-title">Naturalmente<br />você.</h2><p>O melhor sorriso é aquele<br />que faz você se reconhecer.</p></Reveal></MaskedCard>
        <MaskedCard bgImage={images.smile} position={galleryPos[1]} imageWidth={galleryWidth} focalX={isMobile ? .65 : .8} cardRef={el => { galleryCards.current[1] = el }} className="gallery-portrait" style={{ '--mobile-photo': `url("${images.smile}")` } as CSSProperties}><span className="photo-tag">SINGULAR COMO VOCÊ</span><div className="portrait-bottom"><span>Pequenos detalhes.<br />Novas possibilidades.</span>{bookButton('Encontre seu cuidado', false)}</div></MaskedCard>
        <MaskedCard bgImage={images.smile} position={galleryPos[2]} imageWidth={galleryWidth} focalX={isMobile ? .65 : .8} cardRef={el => { galleryCards.current[2] = el }} className="gallery-message"><span className="gallery-star">✳</span><p>Seu tempo.<br />Seu jeito.<br /><b>Seu sorriso.</b></p><a href="#cuidado" className="circle-link" aria-label="Conhecer nosso cuidado"><Arrow diagonal /></a></MaskedCard>
        <MaskedCard bgImage={images.smile} position={galleryPos[3]} imageWidth={galleryWidth} focalX={isMobile ? .65 : .8} cardRef={el => { galleryCards.current[3] = el }} className="services-row">{services.map((s, i) => <button key={s.name} className={`service-card ${i === 0 ? 'active' : ''}`} onClick={() => setDetail(i)} aria-label={`Conhecer ${s.name}`}><span className="service-top">0{i + 1}<Arrow diagonal /></span><h3>{s.short}</h3><span className="service-description">{s.text}</span></button>)}</MaskedCard>
      </div><p className="image-disclaimer">Imagens ilustrativas. Cada sorriso tem sua história; a indicação de tratamento é individual.</p></section>
      <section id="implantes" className="implant-section section-shell" aria-labelledby="implant-title"><div className="implant-left"><Reveal className="implant-heading rounded-card"><span className="eyebrow">PRECISÃO EM CADA DETALHE</span><h2 id="implant-title">Volte a sorrir<br />por inteiro.</h2><p>Implantodontia com planejamento,<br />acolhimento e um olhar para você.</p></Reveal><div className="implant-photos"><Reveal className="treatment-photo" delay={120}><img src={images.implant} alt="Representação ilustrativa de um tratamento odontológico" loading="lazy" decoding="async" width="640" height="480" /><span>Planejamento individual</span></Reveal><Reveal className="treatment-photo" delay={240}><img src={images.care} alt="Detalhe ilustrativo de cuidado e restauração dentária" loading="lazy" decoding="async" width="640" height="480" /><span>Cuidado em cada detalhe</span></Reveal></div><Reveal className="consult-card rounded-card"><div><span className="eyebrow">VAMOS CONVERSAR?</span><h3>O primeiro passo é<br />uma boa conversa.</h3></div>{bookButton('Agendar avaliação', false)}</Reveal></div><Reveal className="implant-portrait rounded-card" delay={180}><img src={images.portrait} srcSet={`${images.portrait480} 480w, ${images.portrait800} 800w, ${images.portrait} 1100w`} sizes="(max-width: 767px) calc(100vw - 24px), 50vw" alt="Retrato ilustrativo de uma mulher sorrindo" loading="lazy" decoding="async" width="1100" height="1656" /><span className="portrait-label">SORRIR É SE SENTIR EM CASA.</span><div className="implant-overlays"><button onClick={() => setDetail(3)}><span>Entenda<br />o caminho<br />dos implantes.</span><span className="circle-link"><Arrow diagonal /></span></button><a href="#cuidado"><span>Cuidado<br />que continua<br />com você.</span><span className="circle-link"><Arrow diagonal /></span></a></div></Reveal></section>
      <section id="cuidado" className="care-section section-space" aria-labelledby="care-title"><Reveal className="care-heading"><span className="section-label"><i /> Nosso jeito de cuidar</span><div><h2 id="care-title">Escutar. Planejar.<br /><span>Cuidar de você.</span></h2><p>Para nós, um bom tratamento começa muito antes da cadeira. Começa na confiança.</p></div></Reveal><div className="care-steps">{[['Uma conversa de verdade', 'Queremos conhecer você, suas expectativas e o que faz seu sorriso ser único.'], ['Um plano que faz sentido', 'Cada possibilidade é explicada com clareza. As escolhas são construídas com você.'], ['Presença em cada etapa', 'Da primeira conversa às orientações de cuidado, atenção aos detalhes que importam.']].map(([title, text], i) => <Reveal className="care-step" key={title} delay={i * 120}><span className="step-number">0{i + 1}<Arrow /></span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>
      <section id="duvidas" className="faq-section section-shell" aria-labelledby="faq-title"><div className="faq-inner"><Reveal><span className="section-label"><i /> Sem dúvidas, mais sorrisos</span><h2 id="faq-title">Antes de sorrir,<br /><span>vamos conversar?</span></h2><p>A informação também<br />faz parte do cuidado.</p></Reveal><div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${faq === i ? 'open' : ''}`} key={question}><h3><button aria-expanded={faq === i} aria-controls={`answer-${i}`} id={`question-${i}`} onClick={() => setFaq(faq === i ? null : i)}><span>{question}</span><span className="faq-plus" aria-hidden="true">+</span></button></h3><div className="faq-answer" id={`answer-${i}`} role="region" aria-labelledby={`question-${i}`} inert={faq !== i}><div><p>{answer}</p></div></div></div>)}</div></div></section>
      <section id="contato" className="contact-section section-shell" aria-labelledby="contact-title"><Reveal className="contact-inner"><div className="contact-top"><span className="section-label"><i /> O próximo passo é seu</span><span className="contact-mini">CUIDADO HUMANO.<br />SORRISOS DE VERDADE.</span></div><div className="contact-main"><h2 id="contact-title">Seu próximo sorriso<br />começa <span>aqui.</span></h2>{bookButton('Agendar uma conversa', false)}</div><div className="contact-bottom"><span>Um conceito de odontologia mais próxima de você.</span><span>EXPERIMENTE NOSSO AGENDAMENTO DEMONSTRATIVO ↗</span></div></Reveal></section>
    </main>
    <footer className="footer"><div className="footer-top"><Logo /><p>Saúde, estética e bem-estar.<br />Com um olhar para você.</p><a className="back-top" href="#inicio">Voltar ao topo <Arrow /></a></div><div className="footer-wordmark" aria-hidden="true">dentora<span>®</span></div><div className="footer-bottom"><span>© 2026 Dentora · Clínica fictícia, projeto de portfólio.</span><button onClick={() => setPrivacy(true)}>Privacidade</button><a href="https://www.onlinewebfonts.com/fonts" target="_blank" rel="noopener noreferrer">Fonte: OnlineWebFonts · CC BY 4.0</a><span>Design que faz sorrir.</span></div></footer>
    <div className="mobile-booking">{bookButton('Agendar avaliação')}</div>
    {booking && <Appointment onClose={() => setBooking(false)} />}
    {detail !== null && <Modal title={services[detail].name} onClose={() => setDetail(null)}><p>{services[detail].description}</p><ul className="detail-list">{services[detail].points.map(p => <li key={p}><span>✓</span>{p}</li>)}</ul><p className="demo-note">Conteúdo ilustrativo de uma clínica fictícia. Não substitui uma avaliação odontológica.</p><button className="button dark" onClick={() => { setDetail(null); setBooking(true) }}>Experimentar agendamento <Arrow /></button></Modal>}
    {privacy && <Modal title="Sua privacidade, com clareza." onClose={() => setPrivacy(false)}><p>Este é um projeto demonstrativo de portfólio. O formulário não pede dados pessoais, não envia informações e não reserva consultas.</p><p>As preferências selecionadas existem apenas na memória da página e são descartadas ao fechar a janela. O armazenamento de sessão guarda somente se a animação de entrada já foi exibida.</p><p>Não utilizamos ferramentas de análise, publicidade ou cookies de rastreamento. As fontes e fotografias são servidas junto com o site, sem conexão necessária a esses fornecedores.</p><p>As fotografias são ilustrativas. Este site não representa um estabelecimento de saúde em funcionamento.</p></Modal>}
  </>
}
export default App
