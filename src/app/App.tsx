import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import {
  ArrowUpRight, Mail, Linkedin, Github, Instagram,
  Download, MapPin, Menu, X,
  Palette, Monitor, Globe, Layout,
  Briefcase, Award, Star, ExternalLink, ChevronRight, ChevronLeft,
  Play, Search,
} from "lucide-react";

/* ── Photo imports ─────────────────────────────────────────────────── */
import imgHero        from "../imports/WhatsApp_Image_2023-12-11_at_08.14.37.jpg";
import imgAbout       from "../imports/yo_bonita.png";
import imgLogo24Horas      from "../imports/24_Horas.jpg";
import imgLogoBioBio       from "../imports/biobiolaradio.jpeg";
import imgMermelada2       from "../imports/Mermelada_sta_laura_2.png";
import imgMitchel          from "../imports/logo-mitchel.png";
import imgElReemplazante   from "../imports/EL_REEMPLAZANTE_.png";
import imgJeannette        from "../imports/jeanne.jpg";
import imgUnabLogo         from "../imports/unab-logo.png";
import imgDuocLogo         from "../imports/Logo-duoc.jpg";
import cvPDF               from "../imports/CV_Natalia_Mabel_Farias.pdf";

/* ── Portfolio image imports ───────────────────────────────────────── */
import imgAppWeb         from "../imports/app_web.png";
import imgBannerSuricata from "../imports/banner_suricata.png";
import imgBolsaMiriam    from "../imports/bolsa-miriam.png";
import imgBookQueen      from "../imports/Book_queen_.png";
import imgBrandbookManos from "../imports/brandbook_mockup_manos_creadoras.png";
import imgDuocDesktop    from "../imports/duoc_laboral-pantallas_web.png";
import imgClickRingEtiq  from "../imports/etiqueta-click.jpeg";
import imgFlyerMiriam    from "../imports/Flyer-miriam.png";
import imgMermelada      from "../imports/go_ndola_mermelada-sta_Laura.jpg";
import imgLibroQueenBack from "../imports/libro_queen_parte_de_atras.png";
import imgWebApp         from "../imports/web_app.png";
import imgWireframe      from "../imports/wireframe.png";
import imgPenClick       from "../imports/pen-click.jpeg";
import imgTarjetasClick  from "../imports/tarjetas-click.jpeg";
import imgSpotify        from "../imports/spotify1.jpg";
import imgTesla          from "../imports/tesla.png";
import imgTarjetaMiriam  from "../imports/tarjeta-miriam.png";
import imgSuricata       from "../imports/suricata.png";
import imgPolera         from "../imports/producto-polera.png";
import imgSeparados      from "../imports/separados.jpeg";
import imgMeaCulpa       from "../imports/mea-culpa.jpeg";
import imgOvni           from "../imports/ovni.jpeg";
import imgPapeleriaMuseo from "../imports/papeleria-museo.png";

/* ── Design tokens ─────────────────────────────────────────────────── */
const F  = "'Plus Jakarta Sans', sans-serif";
const MO = "'JetBrains Mono', monospace";

const V   = "#7C3AED"; // violet
const A   = "#D97706"; // amber
const T   = "#0D9488"; // teal
const D   = "#0D0B18"; // near-black
const CR  = "#F7F4EE"; // warm cream

// Brand-accurate colors — extracted from official logos
const TVN_RED  = "#E8001C"; // 24 Horas TVN red (from logo)
const BIO_BLUE = "#3A5FA8"; // Bio Bio La Radio blue (from logo)

const GV    = `linear-gradient(135deg,${V},#4338CA)`;
const GA    = `linear-gradient(135deg,${A},#EA580C)`;
const GT    = `linear-gradient(135deg,${T},${V})`;
const GTEXT = `linear-gradient(135deg,${V} 0%,${A} 100%)`;

/* ── TYPES ─────────────────────────────────────────────────────────── */
interface Piece {
  title: string;
  tools: string[];
  img: string;
  desc: string;
}
interface ProjectGroup {
  id: string;
  title: string;
  cats: string[];
  year: string;
  cover: string;
  summary: string;
  catColor: string;
  pieces: Piece[];
}

/* ── DATA ──────────────────────────────────────────────────────────── */
const NAV = [
  { label:"Sobre mí",       id:"sobre"         },
  { label:"En Medios",      id:"medios"         },
  { label:"Experiencia",    id:"experiencia"    },
  { label:"Portafolio",     id:"portafolio"     },
  { label:"Servicios",      id:"servicios"      },
  { label:"Contacto",       id:"contacto"       },
];

const ROLES = [
  "Periodismo",
  "Diseño gráfico",
  "Comunicación",
  "Medios digitales",
  "Branding",
  "Identidad visual",
  "Diseño editorial",
  "UX/UI",
  "Contenido digital",
  "Conocimientos en desarrollo web full stack JavaScript",
  "Visual Studio Code",
  "Claude",
  "IA generativa",
  "SEO",
  "Edición de video",
  "Live Streaming",
  "YouTube Studio",
  "Mediastream",
  "Conocimientos en Prontus",
  "Creatividad",
  "Estrategia",
  "Innovación"

];

const SKILLS = [
  { cat:"Diseño",               color:V,        items:["Illustrator","Photoshop","InDesign","Premiere","DaVinci Resolve","Figma"] },
  { cat:"Desarrollo Web",       color:"#4338CA", items:["Visual Studio Code","HTML5","CSS3","Bootstrap 5","WordPress","Git"] },
  { cat:"Medios & Comunicación",color:A,         items:["YouTube Studio","Mediastream","SEO","UX/UI","Branding","Marketing Digital"] },
  { cat:"Gestión",              color:T,         items:["Metodologías ágiles","Coordinación editorial","Growth Hacking","Excel · Word"] },
];

const TIMELINE = [
  {
    org:"24 Horas - TVN",
    role:"Periodista (práctica)",
    period:"2026 · 3 meses",
    brandColor: TVN_RED,
    color: TVN_RED,
    featured:true,
    bullets:[
      "Edición, actualización y publicación de contenidos de contingencia nacional para YouTube.",
      "Selección de información noticiosa.",
      "Adaptación de contenidos periodísticos para publicación en YouTube.",
      "Coordinación con el equipo de 24 Horas y TVN Digital.",
    ],
  },
  {
    org:"Radio BioBío",
    role:"Asistente de prensa",
    period:"16 Nov 2025",
    brandColor: BIO_BLUE,
    color: BIO_BLUE,
    featured:true,
    bullets:[
      "Cobertura periodística en terreno · primera vuelta elecciones presidenciales 2025.",
      "Apoyo operativo en puntos de prensa y entrevistas a candidatos.",
      "Registro audiovisual con dispositivo móvil para BioBío TV.",
      "Seleccionada por mejor rendimiento académico de la carrera.",
    ],
  },
  {
    org:"Diseñadora gráfica",
    role:"Independiente",
    period:"2021 – Actualidad",
    brandColor:V, color:V, featured:false,
    bullets:[
      "Identidad visual · Branding · Rebranding.",
      "Diseño editorial y piezas digitales e impresas.",
      "Diseño UX/UI · Campañas comunicacionales · Material publicitario.",
    ],
  },
  {
    org:"Planet Sport SPA",
    role:"Publicidad y visual merchandising",
    period:"Jun 2018 – Sep 2024",
    brandColor:A, color:A, featured:false,
    bullets:[
      "Desarrollo y mantención de imagen corporativa y coherencia visual.",
      "Supervisión de exhibiciones, vitrinas y campañas promocionales.",
      "Reportes visuales internos mediante fotografías e informes de layout.",
    ],
  },
  {
    org:"Museo de Sitio Castillo de Niebla",
    role:"Diseñadora gráfica en práctica",
    period:"May – Jun 2023",
    brandColor:T, color:T, featured:false,
    bullets:[
      "Piezas gráficas para productos y servicios institucionales del museo.",
      "Propuestas de mejora presentadas a la jefatura de extensión.",
    ],
  },
  {
    org:"Intersport Chile Ltda.",
    role:"Analista de recursos humanos",
    period:"Mar 2016 – Abr 2018",
    brandColor:"#6B7280", color:"#6B7280", featured:false,
    bullets:[
      "Contratos, finiquitos y documentación laboral.",
      "Incorporación de colaboradores · Sistemas Previred y AFC.",
    ],
  },
];

const EDUCATION = [
  { inst:"Universidad Andrés Bello",      prog:"Periodismo",          icon:imgUnabLogo, color:V },
  { inst:"Instituto Profesional Duoc UC", prog:"Diseño gráfico",    icon:imgDuocLogo, color:A },
];

const CERTS = [
  { title:"Desarrollo web full stack JavaScript",           org:"Desafío Latam · Talento Digital", year:"2024", hours:"472 hrs.", color:V },
  { title:"Proyectos Ágiles",     org:"SENCE · Fundación Movistar",      year:"2023", hours:"40 hrs.",  color:A },
  { title:"Marketing Digital",    org:"AIEP · Fundación Movistar",       year:"2023", hours:"30 hrs.",  color:T },
  { title:"Growth Hacking",       org:"AIEP · Fundación Movistar",       year:"2023", hours:"30 hrs.",  color:"#4338CA" },
  { title:"Presentaciones",       org:"SENCE",                           year:"2023", hours:"30 hrs.",  color:"#D97706" },
  { title:"WordPress",            org:"SENCE",                           year:"2023", hours:"30 hrs.",  color:"#0D9488" },
];

// Grouped portfolio — projects with same name are one card, click opens modal
const PROJECT_GROUPS: ProjectGroup[] = [
  {
    id:"duoc-laboral",
    title:"Duoc Laboral",
    cats:["UX/UI","Diseño"],
    year:"2024",
    cover:imgWebApp,
    catColor:V,
    summary:"Diseño UX/UI completo para el programa Duoc UC: wireframes, prototipos y diseño de interfaces para app móvil y plataforma e-commerce.",
    pieces:[
      { title:"App Móvil — UX/UI",  tools:["Figma","UX/UI","Prototype"],   img:imgWebApp,      desc:"Diseño de la app móvil Duoc Laboral: navegación por categorías, ficha de producto y flujo de compra para iPhone." },
      { title:"Wireframes",          tools:["Figma","Wireframing","UX"],     img:imgWireframe,   desc:"Wireframes de baja y media fidelidad. Arquitectura de información completa para la plataforma Duoc Laboral Emprendedores." },
      { title:"Plataforma Web",      tools:["Figma","Diseño UI","Mockup"],   img:imgAppWeb,      desc:"Diseño de interfaz del e-commerce para emprendedores Duoc UC: catálogo, fichas de producto y carrito." },
      { title:"Vista Desktop",       tools:["Figma","Diseño UI","Mockup"],   img:imgDuocDesktop, desc:"Diseño de pantallas desktop: catálogo completo, fichas de producto, inicio de sesión y carrito." },
    ],
  },
  {
    id:"suricata-foods",
    title:"Suricata Foods",
    cats:["Web"],
    year:"2024",
    cover:imgSuricata,
    catColor:"#4338CA",
    summary:"Diseño web y material digital para empresa de alimentos saludables. Identidad visual vibrante aplicada a plataforma digital.",
    pieces:[
      { title:"Sitio Web Desktop", tools:["HTML","CSS","Bootstrap"], img:imgSuricata,       desc:"Vista desktop completa: home, catálogo de productos y métodos de pago." },
      { title:"Banner Hero",       tools:["Figma","HTML"],           img:imgBannerSuricata, desc:"Hero section con tipografía expresiva y composición de color que invita al usuario." },
    ],
  },
  {
    id:"tesla-insurtech",
    title:"Seguros Tesla Insurtech",
    cats:["Web"],
    year:"2024",
    cover:imgTesla,
    catColor:"#4338CA",
    summary:"Sitio web corporativo para Seguros Tesla Insurtech. Seguro vehicular, hogar y plataforma de contratación 100% online.",
    pieces:[
      { title:"Sitio Corporativo", tools:["Figma","HTML","CSS"], img:imgTesla, desc:"Diseño web multi-pantalla: seguros vehicular y hogar, formularios de cotización y contratación en línea." },
    ],
  },
  {
    id:"miriam-costuras",
    title:"Miriam Costuras",
    cats:["Branding","Diseño"],
    year:"2023",
    cover:imgTarjetaMiriam,
    catColor:A,
    summary:"Identidad visual completa para emprendedora de confecciones. Logotipo, tarjeta de presentación, packaging y material publicitario.",
    pieces:[
      { title:"Tarjeta de presentación", tools:["Illustrator","Photoshop"], img:imgTarjetaMiriam, desc:"Diseño de tarjeta de presentación con identidad visual limpia y elegante." },
      { title:"Bolsa packaging",   tools:["Illustrator","Photoshop"], img:imgBolsaMiriam,   desc:"Aplicación de identidad en packaging kraft: logotipo, paleta y tipografía coherentes." },
      { title:"Flyer publicitario",tools:["Photoshop","Illustrator"],  img:imgFlyerMiriam,   desc:"Material publicitario impreso con jerarquía visual clara y composición limpia." },
    ],
  },
  {
    id:"el-reemplazante",
    title:"El Reemplazante - Serie de TVN",
    cats:["Diseño","Medios"],
    year:"2026",
    cover:imgElReemplazante,
    catColor:TVN_RED,
    summary:"Diseño gráfico para la serie El Reemplazante de TVN, adaptado para formato maratón en vivo 24/7 en el canal de YouTube de TVN. Portadas y material visual para la emisión digital.",
    pieces:[
      { title:"Diseño para maratón YouTube", tools:["Photoshop","Illustrator"], img:imgElReemplazante, desc:"Diseño de identidad visual para la transmisión de El Reemplazante en formato maratón en el canal YouTube de TVN · 24 Horas." },
    ],
  },
  {
    id:"mitchel-santander",
    title:"Defensa Legal Abogados",
    cats:["Branding","Identidad"],
    year:"2023",
    cover:imgMitchel,
    catColor:"#1E3A8A",
    summary:"Branding completo para Defensa Legal Abogados. Logotipo institucional comunicando autoridad y confianza.",
    pieces:[
      { title:"Logotipo institucional", tools:["Illustrator","Photoshop"], img:imgMitchel, desc:"Diseño de logotipo para Defensa Legal Abogados" },
    ],
  },
  {
    id:"separados",
    title:"Separados",
    cats:["Medios","Diseño"],
    year:"2026",
    cover:imgSeparados,
    catColor:A,
    summary:"Separados: diseño gráfico para portada de YouTube - Serie de TVN campañas de streaming live.",
    pieces:[
      { title:"Separados", tools:["Illustrator","Photoshop"], img:imgSeparados, desc:"Diseñé la imagen gráfica de una comedia nocturna que se convirtió en un fenómeno de audiencia. Trabajé la portada y los assets para transmitir el tono irreverente de la serie: cinco hombres, una casa en Ñuñoa y el relato de la crisis de los 40 contado con humor y exageración. El resultado refuerza el contraste entre la rutina frustrada de Pedro y la fiesta permanente de su nueva convivencia masculina." },
    ],
  },
  {
    id:"mea-culpa",
    title:"Mea Culpa",
    cats:["Medios","Diseño"],
    year:"2026",
    cover:imgMeaCulpa,
    catColor:A,
    summary:"Diseño gráfico para la serie Mea Culpa de TVN, adaptado para formato maratón en vivo 24/7 en el canal de YouTube de TVN.",
    pieces:[
      { title:"Mea Culpa", tools:["Illustrator","Photoshop"], img:imgMeaCulpa, desc:"Creé una identidad visual para una serie que explora los secretos y conflictos detrás de cada episodio. El trabajo se enfocó en imágenes de alto impacto, uso de texturas y tipografías sobrias que transmiten misterio, revelación y el pulso periodístico de un programa que apuesta por el análisis serio y la narrativa visual cargada de tensión." },
    ],
  },
  {
    id:"ovni",
    title:"Ovni",
    cats:["Medios","Diseño"],
    year:"2026",
    cover:imgOvni,
    catColor:A,
    summary:"OVNI: Diseño gráfico para campaña de streaming de una serie documental que reconstruye la ufología chilena.",
    pieces:[
      { title:"Ovni", tools:["Illustrator","Photoshop"], img:imgOvni, desc:"Diseñé la identidad visual de un documental que exploró la ufología con estilo periodístico. Mi trabajo destaca la dimensión investigativa del programa, con una imagen que combina misterio, autoridad y un aura de descubrimiento para una serie conducida por Patricio Bañados, donde cada capítulo se siente como una pieza clave del archivo televisivo chileno." },
    ],
  },
  {
    id:"brandbook-manos",
    title:"Brandbook Manos Creadoras",
    cats:["Branding"],
    year:"2023",
    cover:imgBrandbookManos,
    catColor:A,
    summary:"Manual de identidad visual para agrupación de emprendedoras de la Municipalidad de Cerrillos: logotipo, variantes tipográficas, colores y guía de uso.",
    pieces:[
      { title:"Manual de Identidad", tools:["Illustrator","InDesign"], img:imgBrandbookManos, desc:"Brandbook completo con logotipo, variantes, paleta cromática, tipografías y guía de aplicación." },
    ],
  },
  {
    id:"papeleria-museo",
    title:"Papelería Museo de Sitio Castillo de Niebla",
    cats:["Branding","Diseño"],
    year:"2023",
    cover:imgPapeleriaMuseo,
    catColor:T,
    summary:"Diseño de papelería institucional para el Museo de Sitio Castillo de Niebla (Valdivia, Chile) con identidad visual coherente para documentos y materiales de difusión.",
    pieces:[
      { title:"Papelería institucional", tools:["Illustrator","InDesign"], img:imgPapeleriaMuseo, desc:"Diseño de papelería institucional para el museo, incluyendo formatos de comunicación visual y documentos de difusión con identidad coherente." },
    ],
  },
  {
    id:"mermeladas",
    title:"Mermeladas Sta. Laura",
    cats:["Branding"],
    year:"2023",
    cover:imgMermelada,
    catColor:A,
    summary:"Branding y diseño de punto de venta para mermeladas artesanales. Identidad, etiquetas y góndola de exhibición en retail.",
    pieces:[
      { title:"Góndola y punto de venta", tools:["Illustrator","Photoshop"], img:imgMermelada,  desc:"Branding completo: identidad de marca, diseño de góndola y exhibición para retail." },
      { title:"Packaging frutilla",        tools:["Illustrator","Photoshop"], img:imgMermelada2, desc:"Etiqueta para frasco de mermelada artesanal de frutilla 0% azúcar. Diseño con fotografía de producto artesanal, tipografía y composición de mockup." },
    ],
  },
  {
    id:"chile-turistico",
    title:"Chile turístico",
    cats:["Identidad"],
    year:"2023",
    cover:imgPolera,
    catColor:T,
    summary:"Identidad de Chile Turístico aplicada en polera para campaña de turismo nacional.",
    pieces:[
      { title:"Aplicación en polera", tools:["Illustrator","Photoshop"], img:imgPolera, desc:"Identidad de Chile Turístico aplicada en polera para campaña de turismo nacional." },
    ],
  },
  {
    id:"libro-queen",
    title:"Libro Queen",
    cats:["Editorial"],
    year:"2023",
    cover:imgLibroQueenBack,
    catColor:"#7C3AED",
    summary:"Diseño editorial completo del libro 'Queen: La historia de la verdadera leyenda del rock'. Portada, contratapa e interior.",
    pieces:[
      { title:"Portada y contratapa",   tools:["InDesign","Illustrator"], img:imgLibroQueenBack, desc:"Portada premium en negro con escudo icónico de Queen, tipografía clásica y alto contraste." },
      { title:"Interior editorial",      tools:["InDesign","Photoshop"],   img:imgBookQueen,      desc:"Maquetación de interiores: tipografía editorial, fotografías históricas y jerarquía visual." },
    ],
  },
  {
    id:"spotify-maluma",
    title:"Maluma - fotomontaje para simulación de Spotify",
    cats:["Diseño"],
    year:"2023",
    cover:imgSpotify,
    catColor:"#EA580C",
    summary:"Fotomontaje artístico para el sencillo 'Felices los 4' de Maluma. Composición con fuego, cielo estrellado y branding Spotify.",
    pieces:[
      { title:"Fotomontaje", tools:["Photoshop"], img:imgSpotify, desc:"Composición artística de alta complejidad: fusión de fotografía, efectos de fuego, cielo estrellado y branding Spotify." },
    ],
  },
];

const SERVICES = [
  { icon:<Palette size={22}/>, title:"Diseño gráfico",       grad:GV, desc:"Sistemas de identidad visual coherentes: desde el logo hasta el manual de marca completo, editorial y material publicitario.", tags:["Branding","Identidad","Editorial","Publicidad"] },
  { icon:<Monitor size={22}/>, title:"Contenido para medios", grad:GA, desc:"Produzco y gestiono contenido periodístico y visual para YouTube, redes sociales, portales de noticias y streaming.", tags:["YouTube","SEO","Mediastream","Noticias"] },
  { icon:<Layout  size={22}/>, title:"Diseño UX / UI",        grad:GT, desc:"Interfaces centradas en el usuario: wireframes hasta prototipos interactivos en Figma con pruebas de usabilidad.", tags:["Figma","Prototipos","Wireframes","Testing"] },
  { icon:<Globe   size={22}/>, title:"Desarrollo web",         grad:"linear-gradient(135deg,#4338CA,#0D9488)", desc:"Sitios web responsivos con HTML, CSS, Bootstrap y WordPress.", tags:["HTML/CSS","Bootstrap","WordPress","Responsive"] },
];

const TESTIMONIALS = [
  { name:"Jeannette Peña",  role:"Diseñadora gráfica",   quote:"Logra un equilibrio perfecto entre estética y funcionalidad. Su mirada creativa hace la diferencia en cada entrega.", photo:null, realPhoto:imgJeannette, color:V },
  { name:"Jean Paul Araya", role:"CEO · Tesla Insurtech",  quote:"Su enfoque estratégico construyó una imagen corporativa sólida. Entiende tanto el diseño como el negocio.", photo:"1472099645785-5658abf4ff4e", color:T },
  { name:"Miriam Costuras", role:"Emprendedora",           quote:"Creatividad, puntualidad y detalle excepcionales. Transformó mi marca en algo que conecta de verdad con mis clientes.", photo:"1534528741775-53994a69daeb", color:"#4338CA" },
  { name:"Defensa Legal Abogados", role:"Estudio jurídico",         quote:"Natalia me resolvió el problema de mi marca, ya que no sabía cómo expresar lo que necesitaba para verme profesional.", photo:null, realPhoto:imgMitchel, color:"#1E3A8A" },
];

/* ── HOOKS ─────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, on };
}

/* ── SMALL COMPONENTS ──────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, on } = useReveal();
  return (
    <div ref={ref} className={className}
      style={{ opacity:on?1:0, transform:on?"translateY(0)":"translateY(24px)", transition:`opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionTag({ light, children }: { light?: boolean; children: React.ReactNode }) {
  const grad = light ? "linear-gradient(135deg,#C4B5FD,#FDE68A)" : GTEXT;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
      <div style={{ width:24, height:2, background:grad, borderRadius:99, flexShrink:0 }} />
      <span style={{ fontFamily:MO, fontSize:11, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        {children}
      </span>
    </div>
  );
}

/* ── PROJECT MODAL (Nielsen UX/UI heuristics) ─────────────────────── */
function ProjectModal({ group, onClose }: { group: ProjectGroup; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"gallery" | "full">("gallery");

  useEffect(() => { setActiveIdx(0); setViewMode("gallery"); }, [group]);

  // Heuristic: Esc closes; body scroll lock; focus management
  useEffect(() => {
    closeBtnRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowLeft") return setActiveIdx((i: number) => (i - 1 + group.pieces.length) % group.pieces.length);
      if (e.key === "ArrowRight") return setActiveIdx((i: number) => (i + 1) % group.pieces.length);
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [group.pieces.length, onClose]);

  // Focus trap
  useEffect(() => {
    const modal = modalRef.current; if (!modal) return;
    const focusable = modal.querySelectorAll<HTMLElement>('button,a,[tabindex="0"]');
    const first = focusable[0]; const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
      else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, []);

  const activePiece = group.pieces[activeIdx] ?? group.pieces[0];
  const canNavigate = group.pieces.length > 1;
  const previewLabel = `${activeIdx + 1} / ${group.pieces.length}`;

  if (!activePiece) return null;

  const prevPiece = () => {
    if (!canNavigate) return;
    setActiveIdx((i: number) => (i - 1 + group.pieces.length) % group.pieces.length);
  };
  const nextPiece = () => {
    if (!canNavigate) return;
    setActiveIdx((i: number) => (i + 1) % group.pieces.length);
  };
  const showFullImage = () => setViewMode("full");
  const hideFullImage = () => setViewMode("gallery");
  const goBackToPortfolio = () => { setViewMode("gallery"); onClose(); };

  return (
    <div
      role="dialog" aria-modal="true" aria-labelledby="modal-title"
      style={{ position:"fixed", inset:0, zIndex:200, display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"4vh 1rem", overflowY:"auto" }}>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{ position:"fixed", inset:0, background:"rgba(13,11,24,.85)", backdropFilter:"blur(12px)", zIndex:0 }}
        aria-hidden="true"/>
      {/* panel */}
      <div ref={modalRef}
        style={{ position:"relative", zIndex:1, background:CR, borderRadius:"1.5rem", width:"100%", maxWidth:940, overflow:"hidden", boxShadow:"0 40px 120px rgba(13,11,24,.4)" }}>
        {/* modal header */}
        <div style={{ background:D, padding:"1.75rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem", borderBottom:"1px solid rgba(255,255,255,.06)" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <button
              onClick={onClose}
              style={{ alignSelf:"flex-start", fontSize:12, color:"rgba(255,255,255,.7)", background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.12)", borderRadius:99, padding:"8px 14px", cursor:"pointer" }}>
              Volver al portafolio
            </button>
            <div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
                {group.cats.map(c => (
                  <span key={c} style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99, background:`${group.catColor}25`, color:group.catColor, fontFamily:MO, letterSpacing:"0.1em" }}>{c}</span>
                ))}
                <span style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99, background:"rgba(255,255,255,.08)", color:"rgba(255,255,255,.4)", fontFamily:MO }}>{group.year}</span>
              </div>
              <h2 id="modal-title" style={{ fontWeight:900, fontSize:"1.6rem", color:"#fff", letterSpacing:"-0.02em", lineHeight:1.1 }}>{group.title}</h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,.45)", marginTop:8, maxWidth:560, lineHeight:1.7 }}>{group.summary}</p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Cerrar proyecto"
            style={{ width:40, height:40, borderRadius:10, background:"rgba(255,255,255,.08)", border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.6)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, transition:"background .15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.15)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.08)"; }}>
            <X size={18}/>
          </button>
        </div>

        {/* gallery + navigation */}
        <div style={{ padding:"2rem", display:"grid", gridTemplateColumns:"1fr", gap:"1.25rem" }}>
          {viewMode === "gallery" ? (
            <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:"1rem" }}>
              <div style={{ position:"relative", borderRadius:"1.25rem", overflow:"hidden", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 20px 60px rgba(13,11,24,.08)", background:"#fff" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"min(70vh, 560px)", background:"linear-gradient(135deg, #f8f5ef 0%, #f1ebdd 100%)", padding:"1rem" }}>
                  <img src={activePiece.img} alt={activePiece.title} style={{ display:"block", width:"100%", height:"auto", maxHeight:"min(70vh, 560px)", objectFit:"contain", borderRadius:"1rem" }} />
                </div>
                <div style={{ position:"absolute", top:16, right:16, display:"flex", gap:8, flexWrap:"wrap" }}>
                  <button
                    onClick={showFullImage}
                    style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.95)", border:"1px solid rgba(13,11,24,.08)", borderRadius:999, padding:"10px 14px", fontSize:12, fontWeight:700, color:D, cursor:"pointer" }}>
                    <Search size={16} /> Ver foto completa
                  </button>
                </div>
                {canNavigate && (
                  <>
                    <button
                      onClick={prevPiece}
                      aria-label="Imagen anterior"
                      style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:99, border:"none", background:"rgba(255,255,255,.92)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 14px 30px rgba(0,0,0,.12)" }}>
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextPiece}
                      aria-label="Imagen siguiente"
                      style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:99, border:"none", background:"rgba(255,255,255,.92)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 14px 30px rgba(0,0,0,.12)" }}>
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                <span style={{ position:"absolute", bottom:16, left:16, background:"rgba(0,0,0,.65)", color:"#fff", padding:"7px 12px", borderRadius:99, fontSize:11, fontWeight:700, letterSpacing:"0.08em" }}>
                  {previewLabel}
                </span>
              </div>

              {group.pieces.length > 1 && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"0.875rem" }}>
                  {group.pieces.filter((_, i) => i !== activeIdx).map((p) => {
                    const thumbIndex = group.pieces.findIndex(piece => piece.title === p.title);
                    return (
                      <button
                        key={p.title}
                        onClick={() => setActiveIdx(thumbIndex)}
                        aria-label={`Ver ${p.title}`}
                        style={{
                          display:"flex", flexDirection:"column", alignItems:"flex-start", gap:10,
                          background:"#fff",
                          border:"1px solid rgba(124,58,237,.12)",
                          borderRadius:"1rem", padding:"0.85rem", cursor:"pointer", textAlign:"left",
                        }}>
                        <div style={{ width:"100%", aspectRatio:"16/10", overflow:"hidden", borderRadius:"1rem" }}>
                          <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                        </div>
                        <div style={{ width:"100%" }}>
                          <h3 style={{ fontSize:12, fontWeight:800, color:D, marginBottom:4 }}>{p.title}</h3>
                          <p style={{ fontSize:11, color:"rgba(13,11,24,.55)", lineHeight:1.5, margin:0 }}>{p.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div style={{ display:"grid", gap:"1rem" }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", justifyContent:"space-between" }}>
                <button
                  onClick={hideFullImage}
                  style={{ fontSize:13, fontWeight:700, color:D, background:"rgba(255,255,255,.95)", border:"1px solid rgba(13,11,24,.16)", borderRadius:99, padding:"10px 18px", cursor:"pointer" }}>
                  Atrás
                </button>
                <button
                  onClick={goBackToPortfolio}
                  style={{ fontSize:13, fontWeight:700, color:"#fff", background:GV, border:"none", borderRadius:99, padding:"10px 18px", cursor:"pointer" }}>
                  Portafolio
                </button>
              </div>
              <div style={{ position:"relative", borderRadius:"1.25rem", overflow:"hidden", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 20px 60px rgba(13,11,24,.08)", background:"#000" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"min(78vh, 760px)", padding:"1rem", background:"radial-gradient(circle at top, #1f1b2e 0%, #05040b 100%)" }}>
                  <img src={activePiece.img} alt={activePiece.title} style={{ display:"block", width:"100%", maxWidth:"100%", height:"auto", maxHeight:"min(78vh, 760px)", objectFit:"contain" }} />
                </div>
                {canNavigate && (
                  <>
                    <button
                      onClick={prevPiece}
                      aria-label="Imagen anterior"
                      style={{ position:"absolute", left:16, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:99, border:"none", background:"rgba(255,255,255,.92)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 14px 30px rgba(0,0,0,.12)" }}>
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextPiece}
                      aria-label="Imagen siguiente"
                      style={{ position:"absolute", right:16, top:"50%", transform:"translateY(-50%)", width:44, height:44, borderRadius:99, border:"none", background:"rgba(255,255,255,.92)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", boxShadow:"0 14px 30px rgba(0,0,0,.12)" }}>
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                <span style={{ position:"absolute", bottom:16, left:16, background:"rgba(0,0,0,.65)", color:"#fff", padding:"7px 12px", borderRadius:99, fontSize:11, fontWeight:700, letterSpacing:"0.08em" }}>
                  {previewLabel}
                </span>
              </div>
              <div style={{ padding:"0.75rem 0 0", display:"grid", gap:6 }}>
                <h3 style={{ fontSize:14, fontWeight:900, color:D, margin:0 }}>{activePiece.title}</h3>
                <p style={{ fontSize:12, color:"rgba(13,11,24,.55)", lineHeight:1.6, margin:0 }}>{activePiece.desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [displayedText, setDisplayedText] = useState(ROLES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [menu, setMenu]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup | null>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRole = ROLES[roleIdx];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIdx((i: number) => (i + 1) % ROLES.length);
        }
      }
    }, isDeleting ? 40 : 70);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIdx]);

  useEffect(() => {
    setDisplayedText(ROLES[roleIdx].slice(0, 0));
    setIsDeleting(false);
  }, [roleIdx]);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      if (heroBgRef.current) {
        heroBgRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = useCallback((id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  }, []);

  return (
    <div style={{ fontFamily:F, background:CR, color:D }}>
      <style>{`
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:linear-gradient(${V},${A});border-radius:99px}
        ::selection{background:rgba(124,58,237,.18)}
        .dotgrid{background-image:radial-gradient(circle,rgba(124,58,237,.11) 1px,transparent 1px);background-size:26px 26px}
        *:focus-visible{outline:2px solid ${V};outline-offset:2px;border-radius:4px}
        @keyframes colorFlow {
          0%   { background-position: 0px center; }
          100% { background-position: -660px center; }
        }
        @keyframes blink {
          0%, 50% { border-color: transparent; }
          51%, 100% { border-color: rgba(255,255,255,.7); }
        }
        .title-hero {
          text-align: center;
          background-image: url('https://cdn.pixabay.com/photo/2017/07/03/20/17/abstract-2468874_960_720.jpg');
          background-attachment: fixed;
          background-size: 960px auto;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.03em;
          line-height: 1.30;
          padding-bottom: 0.08em;
          animation: colorFlow 20s linear infinite;
        }
        .title-hero .line1 { display: block; font-size: 6vw; }
        .title-hero .line2 { display: block; font-size: 5vw; margin: 0.2em 0; }
        .title-hero .line3 { display: block; font-size: 6vw; }
        @media (max-width: 768px) {
          .title-hero .line1 { font-size: 8vw; }
          .title-hero .line2 { font-size: 6.5vw; }
          .title-hero .line3 { font-size: 6vw; }
        }
        @media (max-width: 480px) {
          .title-hero .line1 { font-size: 10vw; }
          .title-hero .line2 { font-size: 8vw; }
          .title-hero .line3 { font-size: 7.5vw; }
        }
      `}</style>

      {/* ══ NAV ══════════════════════════════════════════════════════ */}
      <nav role="navigation" aria-label="Navegación principal"
        style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, transition:"all .3s",
          background: scrolled ? "rgba(13,11,24,.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(124,58,237,.15)" : "none" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-[58px]">
          <button onClick={() => go("hero")} aria-label="Ir al inicio">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:GV, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontFamily:MO, color:"#fff", fontSize:11, fontWeight:900 }}>NF</span>
              </div>
              <span style={{ fontWeight:900, fontSize:14, color:"#fff" }}>Natalia Farías</span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {NAV.map(l => (
              <button key={l.id} onClick={() => go(l.id)}
                style={{ position:"relative", fontSize:13, fontWeight:600, color:"rgba(255,255,255,.5)", background:"none", border:"none", cursor:"pointer", padding:"4px 0", transition:"color .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.5)"; }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go("contacto")}
              style={{ fontSize:13, fontWeight:800, color:"#fff", padding:"10px 22px", borderRadius:99, background:GV, border:"none", cursor:"pointer", transition:"opacity .2s, transform .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity=".85"; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity="1"; (e.currentTarget as HTMLElement).style.transform=""; }}>
              Contratar
            </button>
          </div>

          <button className="md:hidden" aria-label={menu ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenu((v: boolean) => !v)}
            style={{ color:"#fff", background:"none", border:"none", cursor:"pointer", padding:4 }}>
            {menu ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>

        {menu && (
          <div style={{ background:D, borderTop:"1px solid rgba(124,58,237,.15)", padding:"1.5rem 1.25rem", display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            {NAV.map(l => (
              <button key={l.id} onClick={() => go(l.id)}
                style={{ textAlign:"left", fontSize:14, fontWeight:600, color:"rgba(255,255,255,.6)", background:"none", border:"none", cursor:"pointer" }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => go("contacto")}
              style={{ color:"#fff", fontSize:14, fontWeight:800, padding:"12px", borderRadius:99, background:GV, border:"none", cursor:"pointer" }}>
              Contratar
            </button>
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════ */}
      <section id="hero" aria-label="Presentación"
        style={{ background:D, minHeight:"100vh", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", paddingTop:58, textAlign:"center" }}>

        {/* premium ambient light */}
        <div ref={heroBgRef} style={{ position:"absolute", inset:"-20%", pointerEvents:"none", willChange:"transform" }}>
          <div style={{ position:"absolute", top:"22%", left:"12%", width:760, height:760, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,.16),transparent 70%)", filter:"blur(90px)" }}/>
          <div style={{ position:"absolute", bottom:"16%", right:"12%", width:620, height:620, borderRadius:"50%", background:"radial-gradient(circle,rgba(217,119,6,.12),transparent 70%)", filter:"blur(100px)" }}/>
          <div style={{ position:"absolute", top:"58%", left:"50%", width:460, height:460, borderRadius:"50%", background:"radial-gradient(circle,rgba(13,148,136,.10),transparent 72%)", filter:"blur(90px)" }}/>
        </div>

        {/* soft editorial haze */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at top left, rgba(255,255,255,.04), transparent 36%), radial-gradient(circle at bottom right, rgba(255,255,255,.03), transparent 38%), linear-gradient(135deg, rgba(255,255,255,.025), transparent 40%, rgba(255,255,255,.015))", pointerEvents:"none" }}/>

        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full py-16 relative" style={{ zIndex:1 }}>

          {/* main animated title */}
          <h1 className="title-hero" style={{ marginBottom:"2.25rem" }}>
            <span className="line1">Periodista</span>
            <span className="line2">&amp;</span>
            <span className="line3">Diseñadora gráfica</span>
          </h1>

          {/* cycling role */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:"2.5rem", height:36 }}>
            <div style={{ width:3, height:28, borderRadius:99, background:GV, flexShrink:0 }}/>
            <span aria-live="polite" aria-atomic="true"
              style={{ fontSize:"1rem", fontWeight:700, color:"rgba(255,255,255,.45)", transition:"opacity .25s, transform .25s", opacity:1, transform:"translateY(0)" }}>
              {displayedText}
              <span style={{ display:"inline-block", width:"0.6ch", marginLeft:2, borderRight:"2px solid rgba(255,255,255,.7)", animation:"blink 0.8s steps(1) infinite" }} />
            </span>
            <div style={{ width:3, height:28, borderRadius:99, background:GA, flexShrink:0 }}/>
          </div>

          {/* CTAs */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center" }}>
            <button onClick={() => go("portafolio")}
              style={{ display:"inline-flex", alignItems:"center", gap:8, background:GV, color:"#fff", fontWeight:800, fontSize:14, padding:"14px 30px", borderRadius:99, border:"none", cursor:"pointer", boxShadow:"0 12px 32px rgba(124,58,237,.45)", transition:"all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity=".85"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity="1"; (e.currentTarget as HTMLElement).style.transform=""; }}>
              Ver portafolio <ArrowUpRight size={15}/>
            </button>
            <a href={cvPDF} download="CV-Natalia-Farias.pdf"
              style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1.5px solid rgba(255,255,255,.15)", color:"rgba(255,255,255,.55)", fontWeight:700, fontSize:14, padding:"13px 26px", borderRadius:99, textDecoration:"none", background:"rgba(255,255,255,.04)", transition:"all .2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.35)"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.15)"; (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.55)"; }}>
              <Download size={14}/> Descargar CV
            </a>
          </div>
        </div>
      </section>

      {/* ══ SOBRE MÍ ═════════════════════════════════════════════════ */}
      <section id="sobre" aria-label="Sobre mí" style={{ background:"#F0EBF8", padding:"6rem 0", position:"relative", overflow:"hidden" }}>
        <div className="dotgrid" style={{ position:"absolute", inset:0, opacity:.4, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", top:"5%", right:"-5%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(124,58,237,.09),transparent 70%)", pointerEvents:"none", filter:"blur(60px)" }}/>

        <div className="max-w-6xl mx-auto px-5 md:px-10 relative">
          <Reveal>
            <SectionTag>Sobre mí</SectionTag>
            <h2 style={{ fontSize:"clamp(2rem,4.5vw,3.2rem)", fontWeight:900, lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:"2.5rem" }}>
              Comunicación visual{" "}
              <em style={{ fontStyle:"italic", background:GTEXT, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>con propósito.</em>
            </h2>

            {/* ── ROW 1: foto + bio ── */}
            <div className="grid md:grid-cols-[300px_1fr] gap-6 mb-6">

              {/* Foto card */}
              <div style={{ background:"#fff", borderRadius:"1rem", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 4px 16px rgba(13,11,24,.07)", overflow:"hidden", position:"relative" }}>
                <div style={{ aspectRatio:"3/4", overflow:"hidden" }}>
                  <img src={imgAbout} alt="Natalia Farías" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", display:"block" }}/>
                </div>
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(13,11,24,.82),transparent)", padding:"1.5rem 1.25rem 1.25rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:6 }}> 
                  </div>
                </div>
              </div>

              {/* Bio + stats card */}
              <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>

                {/* bio card */}
                <div style={{ background:"#fff", borderRadius:"1rem", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 4px 16px rgba(13,11,24,.06)", padding:"1.75rem" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.25rem" }}>
                    <div style={{ width:22, height:3, borderRadius:99, background:GV }}/>
                    <span style={{ fontFamily:MO, fontSize:10, fontWeight:700, color:"rgba(13,11,24,.35)", letterSpacing:"0.18em", textTransform:"uppercase" }}>Perfil profesional</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"0.95rem", fontSize:14, color:"rgba(13,11,24,.62)", lineHeight:1.85 }}>
                    <p>Soy <strong style={{ color:D, fontWeight:800 }}>Natalia Farías</strong>, periodista y diseñadora gráfica. Mi perfil combina comunicación periodística, diseño gráfico, comunicación visual, branding, producción de contenidos y medios digitales.</p>
                    <p>Trabajé en entornos de alta exigencia como <strong style={{ color:D, fontWeight:800 }}>TVN · 24 Horas</strong> y <strong style={{ color:D, fontWeight:800 }}>Radio BioBío</strong>, con experiencia en edición audiovisual y gestión de contenido digital, incluyendo live stream en YouTube y manejo de Mediastream.</p>
                    <p>Como diseñadora gráfica cuento con más de 3 años de experiencia profesional en identidad visual, branding, diseño editorial y UX/UI, con formación complementaria en desarrollo web y certificaciones en marketing digital.</p>
                  </div>
                </div>

                {/* stats row — 3 mini cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { n:"+3", label:"Años de experiencia.", grad:GV },
                    { n:"2",  label:"Medios nacionales de comunicación.", grad:GA },
                    { n:"+15",label:"Clientes satisfechos.",    grad:GT },
                  ].map(s => (
                    <div key={s.label} style={{ background:"#fff", borderRadius:"1rem", border:"1px solid rgba(124,58,237,.1)", boxShadow:"0 4px 12px rgba(13,11,24,.05)", padding:"1.25rem", textAlign:"center" }}>
                      <p style={{ fontSize:"2.25rem", fontWeight:900, background:s.grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:1, marginBottom:6 }}>{s.n}</p>
                      <p style={{ fontSize:11, color:"rgba(13,11,24,.5)", lineHeight:1.4, fontWeight:600 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 2: Formación + Certificaciones ── */}
            <div className="grid md:grid-cols-[1fr_1fr] gap-6 mb-6">

              {/* Formación card */}
              <div style={{ background:"#fff", borderRadius:"1rem", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 4px 16px rgba(13,11,24,.06)", padding:"1.75rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.25rem" }}>
                  <div style={{ width:22, height:3, borderRadius:99, background:GV }}/>
                  <span style={{ fontFamily:MO, fontSize:10, fontWeight:700, color:"rgba(13,11,24,.35)", letterSpacing:"0.18em", textTransform:"uppercase" }}>Formación académica</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                  {EDUCATION.map(e => (
                    <div key={e.inst} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"1rem", borderRadius:"0.75rem", background:`${e.color}08`, border:`1px solid ${e.color}18`, transition:"all .2s" }}
                      onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.background=`${e.color}14`; }}
                      onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.background=`${e.color}08`; }}>
                      <div style={{ width:50, height:50, borderRadius:"999px", background:"#fff", border:`1px solid ${e.color}22`, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", flexShrink:0, padding:6, boxShadow:"0 6px 16px rgba(13,11,24,.06)" }}>
                        {e.icon && typeof e.icon === "string" ? (
                          <img src={e.icon} alt={e.inst} style={{ width:"100%", height:"100%", objectFit:"contain", objectPosition:"center", display:"block" }} />
                        ) : (
                          <span style={{ fontSize:22 }}>{e.icon}</span>
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize:14, fontWeight:800, color:D, lineHeight:1.2 }}>{e.prog}</p>
                        <p style={{ fontSize:12, color:"rgba(13,11,24,.45)", marginTop:3 }}>{e.inst}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certificaciones card */}
              <div style={{ background:"#fff", borderRadius:"1rem", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 4px 16px rgba(13,11,24,.06)", padding:"1.75rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.25rem" }}>
                  <div style={{ width:22, height:3, borderRadius:99, background:GA }}/>
                  <span style={{ fontFamily:MO, fontSize:10, fontWeight:700, color:"rgba(13,11,24,.35)", letterSpacing:"0.18em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:6 }}>
                    <Award size={11}/> Certificaciones
                  </span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                  {CERTS.map(c => (
                    <div key={c.title} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0.6rem 0.875rem", borderRadius:"0.6rem", border:`1px solid ${c.color}20`, background:`${c.color}06`, transition:"all .15s" }}
                      onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.background=`${c.color}12`; }}
                      onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.background=`${c.color}06`; }}>
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:c.color, flexShrink:0 }}/>
                        <div>
                          <span style={{ fontSize:12, fontWeight:700, color:D }}>{c.title}</span>
                          <span style={{ fontSize:10, color:"rgba(13,11,24,.4)", marginLeft:6 }}>{c.org}</span>
                        </div>
                      </div>
                      <span style={{ fontFamily:MO, fontSize:10, fontWeight:700, color:c.color, flexShrink:0, marginLeft:8 }}>{c.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ROW 3: Herramientas ── */}
            <div style={{ background:"#fff", borderRadius:"1rem", border:"1px solid rgba(124,58,237,.12)", boxShadow:"0 4px 16px rgba(13,11,24,.06)", padding:"1.75rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"1.5rem" }}>
                <div style={{ width:22, height:3, borderRadius:99, background:GT }}/>
                <span style={{ fontFamily:MO, fontSize:10, fontWeight:700, color:"rgba(13,11,24,.35)", letterSpacing:"0.18em", textTransform:"uppercase" }}>Herramientas y competencias</span>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                {SKILLS.map(({ cat, color, items }) => (
                  <div key={cat}>
                    <p style={{ fontFamily:MO, fontSize:10, fontWeight:800, color, marginBottom:"0.6rem", letterSpacing:"0.08em", textTransform:"uppercase" }}>{cat}</p>
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      {items.map(s => (
                        <span key={s} style={{ fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:"0.5rem", border:`1px solid ${color}22`, color, background:`${color}08`, transition:"all .15s", display:"block" }}
                          onMouseEnter={ev => { (ev.currentTarget as HTMLElement).style.background=`${color}18`; }}
                          onMouseLeave={ev => { (ev.currentTarget as HTMLElement).style.background=`${color}08`; }}>{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ EN MEDIOS — TVN 24 Horas ══════════════════════════════════ */}
      <section id="medios" aria-label="Trabajo en medios" style={{ background:"#0F0404", padding:"6rem 0", position:"relative", overflow:"hidden" }}>
        {/* red glow behind */}
        <div style={{ position:"absolute", top:"-20%", left:"-5%", width:600, height:600, borderRadius:"50%", background:`radial-gradient(circle,rgba(216,31,38,.2),transparent 65%)`, pointerEvents:"none", filter:"blur(40px)" }}/>
        <div style={{ position:"absolute", bottom:"-15%", right:"-5%", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,rgba(0,82,165,.12),transparent 65%)`, pointerEvents:"none", filter:"blur(40px)" }}/>

        <div className="max-w-6xl mx-auto px-5 md:px-10 relative" style={{ zIndex:1 }}>
          <Reveal>
            <div className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
              {/* TVN column */}
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:"1.75rem" }}>
                  <img src={imgLogo24Horas} alt="24 Horas TVN" style={{ width:48, height:48, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
                  <div style={{ height:1, flex:1, background:"rgba(232,0,28,.3)" }}/>
                  <span style={{ fontFamily:MO, fontSize:11, color:"rgba(255,255,255,.3)" }}>TVN Chile</span>
                </div>

                <SectionTag light>En Medios</SectionTag>
                <h2 style={{ fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:900, lineHeight:1.08, letterSpacing:"-0.02em", color:"#fff", marginBottom:"1rem" }}>
                  Periodismo de<br/>
                  <span style={{ color:TVN_RED }}>alto impacto.</span>
                </h2>
                <p style={{ fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.8, marginBottom:"1.75rem", maxWidth:440 }}>
                  Practicante en   <strong style={{ color:"#fff" }}>  24 Horas</strong>, el canal de noticias de TVN, Televisión Nacional de Chile.</p>
                  <p style={{ fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.8, marginBottom:"1.75rem", maxWidth:440 }}>Producción de contenido periodístico digital de contingencia nacional.
                </p>

                <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:10, marginBottom:"2rem" }}>
                  {[
                    "Edición y publicación de contenidos para plataformas digitales.",
                    "Búsqueda, verificación y selección de información noticiosa.",
                    "Adaptación de contenidos para web y redes sociales.",
                    "Coordinación con el equipo editorial digital de TVN.",
                  ].map((b,i) => (
                    <li key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"rgba(255,255,255,.5)" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:TVN_RED, flexShrink:0, marginTop:5 }}/>
                      {b}
                    </li>
                  ))}
                </ul>

                <a href="https://www.youtube.com/@24Horas_TVNChile/videos" target="_blank" rel="noopener noreferrer" aria-label="Ver canal de YouTube de 24 Horas TVN Chile (abre en nueva pestaña)"
                  style={{ display:"inline-flex", alignItems:"center", gap:8, background:TVN_RED, color:"#fff", fontWeight:800, fontSize:13, padding:"12px 22px", borderRadius:99, textDecoration:"none", transition:"opacity .2s, transform .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity=".85"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity="1"; (e.currentTarget as HTMLElement).style.transform=""; }}>
                  <Play size={14}/> Ver canal de YouTube <ExternalLink size={13}/>
                </a>
              </div>

              {/* content cards — contingencia nacional only */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.875rem" }}>
                {[
                  { topic:"Política nacional",       tag:"Contingencia", c:TVN_RED   },
                  { topic:"Economía & Finanzas",     tag:"Contingencia", c:"#B91C1C" },
                  { topic:"Seguridad pública",        tag:"Contingencia", c:TVN_RED   },
                  { topic:"Sociedad",                 tag:"Contingencia", c:"#7F1D1D" },
                  { topic:"Medio ambiente",           tag:"Contingencia", c:TVN_RED   },
                  { topic:"Contingencia regional",    tag:"Contingencia", c:"#991B1B" },
                ].map((card, i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,.04)", borderRadius:"0.875rem", padding:"1rem", border:"1px solid rgba(216,31,38,.15)" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.5rem" }}>
                      <span style={{ fontFamily:MO, fontSize:9, fontWeight:700, color:card.c, letterSpacing:"0.1em", textTransform:"uppercase" }}>{card.tag}</span>
                      <div style={{ width:8, height:8, borderRadius:"50%", background:TVN_RED }}/>
                    </div>
                    <p style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,.7)", lineHeight:1.4 }}>{card.topic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BioBío row */}
            <div style={{ marginTop:"3.5rem", paddingTop:"3rem", borderTop:"1px solid rgba(255,255,255,.06)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:"1.5rem" }}>
                <img src={imgLogoBioBio} alt="Bio Bio La Radio" style={{ width:48, height:48, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
                <div style={{ height:1, flex:1, background:"rgba(58,95,168,.3)" }}/>
                <span style={{ fontFamily:MO, fontSize:11, color:"rgba(255,255,255,.3)" }}>Radio BioBío · Nov 2025</span>
              </div>
              <div className="grid md:grid-cols-[1fr_1fr] gap-8 items-center">
                <div>
                  <h3 style={{ fontWeight:900, fontSize:"1.3rem", color:"#fff", marginBottom:"0.75rem" }}>
                    Cobertura electoral presidencial 2025
                  </h3>
                  <p style={{ fontSize:14, color:"rgba(255,255,255,.4)", lineHeight:1.8 }}>
                    Seleccionada por excelencia académica para integrar el equipo de cobertura de <strong style={{ color:"#fff" }}>Radio BioBío</strong> durante la primera vuelta de las elecciones presidenciables. Registro audiovisual para BioBío TV, entrevistas ciudadanas y apoyo operativo en puntos de prensa.
                  </p>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {["Cobertura periodística en terreno · primera vuelta 2025.","Entrevistas a ciudadanos y candidatos presidenciales.","Registro audiovisual para BioBío TV con dispositivo móvil.","Selección de información noticiosa."].map((b,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:13, color:"rgba(255,255,255,.45)" }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:BIO_BLUE, flexShrink:0, marginTop:5 }}/>
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ EXPERIENCIA ═══════════════════════════════════════════════ */}
      <section id="experiencia" aria-label="Experiencia profesional" style={{ background:"#EEEAF8", padding:"6rem 0" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <div className="max-w-xl mb-12">
              <SectionTag>Trayectoria</SectionTag>
              <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, lineHeight:1.1, letterSpacing:"-0.02em" }}>
                Experiencia<br/>
                <span style={{ background:GTEXT, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>profesional.</span>
              </h2>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem" }}>
              {TIMELINE.map((t, i) => (
                <Reveal key={i} delay={i * 50}>
                  <article style={{ background:"#fff", borderRadius:"1rem", padding:"1.25rem 1.5rem", border:`1px solid ${t.featured ? t.color + "30" : "rgba(124,58,237,.08)"}`,
                    boxShadow: t.featured ? `0 4px 20px ${t.color}12` : "none" }}>
                    <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:"0.75rem" }}>
                      <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:10 }}>
                        <div style={{ width:10, height:10, borderRadius:"50%", background:t.color, flexShrink:0 }}/>
                        <h3 style={{ fontWeight:900, fontSize:15, color:D }}>{t.org}</h3>
                        {t.featured && <span style={{ fontFamily:MO, fontSize:10, fontWeight:800, color:"#fff", background:t.color, padding:"2px 10px", borderRadius:99 }}>Destacado</span>}
                      </div>
                      <span style={{ fontFamily:MO, fontSize:11, color:"rgba(13,11,24,.35)", flexShrink:0 }}>{t.period}</span>
                    </div>
                    <p style={{ fontSize:12, color:"rgba(13,11,24,.45)", marginBottom:"0.75rem", paddingLeft:20 }}><strong style={{ color:D, fontWeight:800 }}>{t.role}</strong></p>
                    <ul style={{ listStyle:"none", padding:0, margin:0, paddingLeft:20, display:"flex", flexDirection:"column", gap:4 }}>
                      {t.bullets.map((b, bi) => (
                        <li key={bi} style={{ display:"flex", alignItems:"flex-start", gap:8, fontSize:12, color:"rgba(13,11,24,.5)" }}>
                          <span style={{ width:4, height:4, borderRadius:"50%", background:t.color, flexShrink:0, marginTop:6 }}/>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ PORTAFOLIO ════════════════════════════════════════════════ */}
      <section id="portafolio" aria-label="Portafolio de proyectos" style={{ background:CR, padding:"6rem 0" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <div style={{ marginBottom:"2.5rem" }}>
              <SectionTag>Portafolio</SectionTag>
              <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, lineHeight:1.1, letterSpacing:"-0.02em" }}>
                <span style={{ background:GTEXT, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Trabajos</span><br/>
                seleccionados.
              </h2>
            </div>

            {/* grouped project grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECT_GROUPS.map(g => (
                <article key={g.id}>
                  <button
                    onClick={() => setSelectedGroup(g)}
                    aria-label={`Ver proyecto: ${g.title}`}
                    style={{ width:"100%", textAlign:"left", background:"#fff", borderRadius:"1.125rem", overflow:"hidden", border:"1px solid rgba(124,58,237,.1)", cursor:"pointer", display:"block", transition:"transform .3s, box-shadow .3s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-7px)"; (e.currentTarget as HTMLElement).style.boxShadow=`0 22px 52px ${g.catColor}25`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow=""; }}>
                    {/* cover image full bleed */}
                    <div style={{ position:"relative", aspectRatio:"16/10", overflow:"hidden" }}>
                      <img src={g.cover} alt={g.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .5s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform="scale(1.06)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform="scale(1)"; }}/>
                      <div
                        style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0)", opacity:0, transition:"opacity .2s, background .2s", cursor:"zoom-in" }}
                        onMouseEnter={e => { const target = e.currentTarget as HTMLElement; target.style.opacity = "1"; target.style.background = "rgba(0,0,0,.28)"; }}
                        onMouseLeave={e => { const target = e.currentTarget as HTMLElement; target.style.opacity = "0"; target.style.background = "rgba(0,0,0,0)"; }}>
                        <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:44, height:44, borderRadius:99, background:"rgba(255,255,255,.92)", boxShadow:"0 14px 30px rgba(0,0,0,.18)", color:D }}>
                          <Search size={20} />
                        </div>
                      </div>
                      {/* "n pieces" badge — pieces count only, no total project number */}
                      {g.pieces.length > 1 && (
                        <div style={{ position:"absolute", top:"0.875rem", right:"0.875rem", background:"rgba(13,11,24,.75)", color:"#fff", borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700, fontFamily:MO, backdropFilter:"blur(8px)" }}>
                          {g.pieces.length} piezas
                        </div>
                      )}
                      {/* hover CTA */}
                      <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${g.catColor}E8 0%,transparent 55%)`, opacity:0, transition:"opacity .3s", display:"flex", alignItems:"flex-end", padding:"1.25rem", pointerEvents:"none" }}>
                        <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#fff", color:g.catColor, fontSize:12, fontWeight:900, padding:"8px 16px", borderRadius:10 }}>
                          Ver proyecto <ChevronRight size={13}/>
                        </span>
                      </div>
                    </div>
                    {/* info */}
                    <div style={{ padding:"1rem 1.25rem" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:6 }}>
                        <h3 style={{ fontWeight:900, fontSize:14, color:D, lineHeight:1.3 }}>{g.title}</h3>
                        <span style={{ fontFamily:MO, fontSize:10, color:"rgba(13,11,24,.3)", flexShrink:0 }}>{g.year}</span>
                      </div>
                      <p style={{ fontSize:12, color:"rgba(13,11,24,.45)", lineHeight:1.65, marginBottom:"0.75rem" }}>{g.summary}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                        {g.cats.map(c => (
                          <span key={c} style={{ fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:99, background:`${g.catColor}14`, color:g.catColor }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SERVICIOS ════════════════════════════════════════════════ */}
      <section id="servicios" aria-label="Servicios" style={{ background:"#110E22", padding:"6rem 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 15% 50%,rgba(124,58,237,.18),transparent 45%),radial-gradient(circle at 85% 20%,rgba(217,119,6,.12),transparent 40%)", pointerEvents:"none" }}/>
        <div className="max-w-6xl mx-auto px-5 md:px-10 relative">
          <Reveal>
            <div className="max-w-xl mb-12">
              <SectionTag light>Servicios</SectionTag>
              <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, lineHeight:1.1, letterSpacing:"-0.02em", color:"#fff" }}>
                ¿En qué puedo<br/>
                <span style={{ background:"linear-gradient(135deg,#C4B5FD,#FDE68A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>ayudarte?</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {SERVICES.map(s => (
                <div key={s.title} style={{ borderRadius:"1.125rem", padding:"1.75rem", border:"1px solid rgba(255,255,255,.07)", background:"rgba(255,255,255,.04)", transition:"all .25s", cursor:"default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(124,58,237,.1)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(124,58,237,.28)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,.04)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.07)"; }}>
                  <div style={{ width:46, height:46, borderRadius:11, background:s.grad, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", marginBottom:"1.125rem" }}>{s.icon}</div>
                  <h3 style={{ fontWeight:900, fontSize:"1.05rem", color:"#fff", marginBottom:"0.6rem" }}>{s.title}</h3>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,.42)", lineHeight:1.75, marginBottom:"1.125rem" }}>{s.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                    {s.tags.map(t => <span key={t} style={{ fontSize:11, fontWeight:700, padding:"3px 11px", borderRadius:99, border:"1px solid rgba(255,255,255,.1)", color:"rgba(255,255,255,.38)" }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TESTIMONIOS ═══════════════════════════════════════════════ */}
      <section aria-label="Testimonios" style={{ background:"#EEEAF8", padding:"6rem 0" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <Reveal>
            <div className="max-w-xl mb-12">
              <SectionTag>Testimonios</SectionTag>
              <h2 style={{ fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:900, lineHeight:1.1, letterSpacing:"-0.02em" }}>
                Lo que dicen<br/>
                <span style={{ background:GTEXT, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>de mi trabajo.</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TESTIMONIALS.map(t => (
                <article key={t.name} style={{ background:"#fff", borderRadius:"1.125rem", padding:"1.5rem", border:`1px solid ${t.color}18`, display:"flex", flexDirection:"column", transition:"transform .25s, box-shadow .25s", cursor:"default" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-5px)"; (e.currentTarget as HTMLElement).style.boxShadow=`0 16px 40px ${t.color}20`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow=""; }}>
                  <div style={{ display:"flex", gap:2, marginBottom:"0.875rem" }}>
                    {Array.from({length:5}).map((_,i) => <Star key={i} size={11} style={{ fill:"#FBBF24", color:"#FBBF24" }}/>)}
                  </div>
                  <p style={{ fontSize:34, fontWeight:900, color:`${t.color}28`, lineHeight:1, marginBottom:2 }}>"</p>
                  <p style={{ fontSize:13, color:"rgba(13,11,24,.58)", lineHeight:1.75, flex:1, marginBottom:"1.125rem" }}>{t.quote}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:10, paddingTop:"1rem", borderTop:`1px solid ${t.color}14` }}>
                    <img src={(t as any).realPhoto ?? `https://images.unsplash.com/photo-${t.photo}?w=80&h=80&fit=crop&auto=format&crop=faces`}
                      alt={t.name} style={{ width:36, height:36, borderRadius:"50%", objectFit:"cover", objectPosition:"center top", flexShrink:0, outline:`2px solid ${t.color}28` }}/>
                    <div>
                      <p style={{ fontSize:12, fontWeight:900, color:D }}>{t.name}</p>
                      <p style={{ fontSize:10, color:"rgba(13,11,24,.38)", marginTop:1 }}>{t.role}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACTO ══════════════════════════════════════════════════ */}
      <section id="contacto" aria-label="Contacto" style={{ background:D, padding:"6rem 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(circle at 5% 50%,rgba(124,58,237,.16),transparent 45%),radial-gradient(circle at 95% 50%,rgba(13,148,136,.1),transparent 45%)`, pointerEvents:"none" }}/>
        <div className="max-w-6xl mx-auto px-5 md:px-10 relative">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-14 items-start">
              <div>
                <SectionTag light>Contacto</SectionTag>
                <h2 style={{ fontSize:"clamp(2rem,4.5vw,3rem)", fontWeight:900, lineHeight:1.08, letterSpacing:"-0.02em", color:"#fff", marginBottom:"1rem" }}>
                  <span style={{ background:"linear-gradient(135deg,#C4B5FD,#FDE68A)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Construyamos</span><br/>
                  juntos.
                </h2>
                <p style={{ fontSize:14, color:"rgba(255,255,255,.38)", lineHeight:1.8, marginBottom:"2.25rem" }}>Disponible para proyectos de diseño gráfico, contenido periodístico, branding, UX/UI y desarrollo web.</p>

                <address style={{ fontStyle:"normal", display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"2rem" }}>
                  {[
                    { icon:<Mail size={14}/>,      label:"n.nataliafariasm@gmail.com",       href:"mailto:n.nataliafariasm@gmail.com",               g:GV },
                    { icon:<Linkedin size={14}/>,  label:"linkedin.com/in/natalia-farias",   href:"https://linkedin.com/in/natalia-farias-graphicd", g:GT },
                    { icon:<Github size={14}/>,    label:"graphicdesignernatalia",            href:"https://github.com/graphicdesignernatalia",       g:"linear-gradient(135deg,#374151,#111827)" },
                    { icon:<Instagram size={14}/>, label:"@nataliafarias.diseno",             href:"https://www.instagram.com/nataliafarias.diseno",   g:GA },
                    { icon:<MapPin size={14}/>,    label:"Estación Central, Santiago, Chile",                                               g:GT },
                  ].map(s => (
                    <a key={s.label}
                      href={s.href ?? undefined}
                      target={typeof s.href === "string" && s.href.startsWith("http") ? "_blank" : undefined}
                      rel={typeof s.href === "string" && s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none", color:"rgba(255,255,255,.42)", transition:"color .2s" }} className="group"
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#fff"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.42)"; }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:s.g, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexShrink:0, transition:"transform .2s" }}>{s.icon}</div>
                      <span style={{ fontSize:13 }}>{s.label}</span>
                    </a>
                  ))}
                </address>

                <a href={cvPDF} download="CV-Natalia-Farias.pdf" style={{ display:"inline-flex", alignItems:"center", gap:8, background:GV, color:"#fff", fontSize:13, fontWeight:800, padding:"11px 22px", borderRadius:99, textDecoration:"none", boxShadow:"0 8px 24px rgba(124,58,237,.35)" }}>
                  <Download size={13}/> Descargar CV
                </a>
              </div>

              {/* form — envía a Gmail vía mailto */}
              <form onSubmit={e => {
                e.preventDefault();
                const fd      = new FormData(e.currentTarget);
                const name    = String(fd.get("name")    ?? "");
                const email   = String(fd.get("email")   ?? "");
                const subject = String(fd.get("subject") ?? "Contacto desde portafolio");
                const message = String(fd.get("message") ?? "");
                const body    = encodeURIComponent("Nombre: " + name + "\nEmail: " + email + "\n\n" + message);
                window.location.href = "mailto:n.nataliafariasm@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + body;
              }} noValidate
                style={{ background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)", borderRadius:"1.25rem", padding:"2rem", display:"flex", flexDirection:"column", gap:"1.125rem" }}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[{ id:"name", label:"Nombre completo", type:"text", ph:"Tu nombre" },{ id:"email", label:"Email", type:"email", ph:"tu@email.com" }].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:6 }}>{f.label}</label>
                      <input id={f.id} name={f.id} type={f.type} placeholder={f.ph} autoComplete={f.id === "email" ? "email" : "name"}
                        style={{ width:"100%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:9, padding:"10px 13px", fontSize:13, color:"#fff", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }}
                        onFocus={e => { e.currentTarget.style.borderColor=V; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; }}/>
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="subject" style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Asunto</label>
                  <input id="subject" name="subject" type="text" placeholder="¿En qué puedo ayudarte?"
                    style={{ width:"100%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:9, padding:"10px 13px", fontSize:13, color:"#fff", outline:"none", boxSizing:"border-box", transition:"border-color .2s" }}
                    onFocus={e => { e.currentTarget.style.borderColor=V; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; }}/>
                </div>
                <fieldset style={{ border:"none", padding:0, margin:0 }}>
                  <legend style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Tipo de proyecto</legend>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {["Diseño Gráfico","Medios Digitales","UX/UI","Desarrollo Web","Branding","Contenido"].map(s => (
                      <label key={s} style={{ display:"flex", alignItems:"center", gap:7, cursor:"pointer" }}>
                        <input type="checkbox" style={{ accentColor:V, width:14, height:14, cursor:"pointer" }}/>
                        <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,.42)" }}>{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div>
                  <label htmlFor="message" style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.3)", letterSpacing:"0.12em", textTransform:"uppercase", display:"block", marginBottom:6 }}>Mensaje</label>
                  <textarea id="message" name="message" rows={4} placeholder="Cuéntame sobre tu proyecto..."
                    style={{ width:"100%", background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:9, padding:"10px 13px", fontSize:13, color:"#fff", outline:"none", boxSizing:"border-box", resize:"none", transition:"border-color .2s", fontFamily:F }}
                    onFocus={e => { e.currentTarget.style.borderColor=V; }} onBlur={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.1)"; }}/>
                </div>
                <button type="submit"
                  style={{ background:GV, color:"#fff", fontWeight:900, fontSize:14, padding:"14px", borderRadius:99, border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 10px 30px rgba(124,58,237,.4)", transition:"opacity .2s, transform .2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity=".85"; (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity="1"; (e.currentTarget as HTMLElement).style.transform=""; }}>
                  Enviar mensaje <ArrowUpRight size={15}/>
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════════ */}
      <footer style={{ background:"#07050F", borderTop:"1px solid rgba(255,255,255,.04)", padding:"2.5rem 0" }}>
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:34, height:34, borderRadius:8, background:GV, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:"inset 0 1px 0 rgba(255,255,255,.25)" }}>
              <span style={{ fontFamily:MO, fontSize:10, fontWeight:900, letterSpacing:"0.18em", color:"#fff" }}>NF</span>
            </div>
            <div>
              <p style={{ fontWeight:900, fontSize:13, color:"#fff" }}>Natalia Farías</p>
              <p style={{ fontSize:11, color:"rgba(255,255,255,.22)" }}>Diseñadora gráfica · Periodista</p>
            </div>
          </div>
          <p style={{ fontFamily:MO, fontSize:11, color:"rgba(255,255,255,.16)", textAlign:"center" }}>© 2026 · Santiago, Chile</p>
          <div style={{ display:"flex", gap:7 }}>
            {[
              { icon:<Mail size={13}/>, href:"mailto:n.nataliafariasm@gmail.com", label:"Email" },
              { icon:<Linkedin size={13}/>, href:"https://linkedin.com/in/natalia-farias-graphicd", label:"LinkedIn" },
              { icon:<Github size={13}/>, href:"https://github.com/graphicdesignernatalia", label:"GitHub" },
              { icon:<Instagram size={13}/>, href:"https://www.instagram.com/nataliafarias.diseno", label:"Instagram" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ width:34, height:34, border:"1px solid rgba(255,255,255,.07)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,.28)", textDecoration:"none", transition:"all .2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#fff"; (e.currentTarget as HTMLElement).style.borderColor=`rgba(124,58,237,.45)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,.28)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,.07)"; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* ══ PROJECT MODAL ════════════════════════════════════════════ */}
      {selectedGroup && (
        <ProjectModal group={selectedGroup} onClose={() => setSelectedGroup(null)}/>
      )}
    </div>
  );
}
