(function(){
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const cvBtn = document.getElementById('cvBtn');
  const neonWrap = document.getElementById('neonWrap');

  const saved = localStorage.getItem('am_theme');
  if(saved === 'dark') root.classList.add('dark');
  function setTheme(dark){
    if(dark){
      root.classList.add('dark');
      themeBtn.textContent = 'Modo claro';
      themeBtn.setAttribute('aria-pressed','true');
      localStorage.setItem('am_theme','dark');
      runNeonSequence();
    }else{
      root.classList.remove('dark');
      themeBtn.textContent = 'Modo oscuro';
      themeBtn.setAttribute('aria-pressed','false');
      localStorage.setItem('am_theme','light');
    }
  }
  themeBtn.addEventListener('click', ()=> setTheme(!root.classList.contains('dark')));

  cvBtn.addEventListener('click', ()=>{
    const a = document.createElement('a'); a.href='./CV/CV.html'; a.download='CV_Alejandro_Moreno.pdf'; document.body.appendChild(a); a.click(); a.remove();
  });

  document.querySelectorAll('a.nav-link, .nav-link').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href').slice(1);
      if(!document.getElementById(id)) return;
      document.getElementById(id).scrollIntoView({behavior:'smooth',block:'start'});
      document.querySelectorAll('nav a').forEach(n=>n.classList.remove('active'));
      a.classList.add('active');
    });
  });

  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  document.querySelectorAll('[data-action="open"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const card = e.target.closest('.card');
      const title = card.dataset.title;
      const desc = card.dataset.desc;
      const stack = card.dataset.stack;
      modalContent.innerHTML = `<h3 style="margin-top:0">${title}</h3><p>${desc}</p><p class='muted'>Stack: ${stack}</p><p style='margin-top:12px'><a href='https://github.com/MoCAlejandro/${title}' class='link'>Código / Demo</a></p>`;
      modal.style.display='flex'; modal.setAttribute('aria-hidden','false');
    });
  });
  document.getElementById('closeModal').addEventListener('click', ()=>{modal.style.display='none';modal.setAttribute('aria-hidden','true');});

  function createNeonDots(){
    neonWrap.innerHTML='';
    const coords = [
      {left:'8%',top:'12%'},{left:'22%',top:'8%'},{left:'40%',top:'6%'},{left:'62%',top:'10%'},{left:'80%',top:'14%'},
      {left:'10%',top:'70%'},{left:'30%',top:'78%'},{left:'50%',top:'82%'},{left:'72%',top:'76%'},{left:'88%',top:'68%'}
    ];
    coords.forEach((c,i)=>{
      const d = document.createElement('div');
      d.className='neon-dot';
      d.style.left=c.left; d.style.top=c.top; d.style.background='radial-gradient(circle at 30% 30%, rgba(0,209,255,0.95), rgba(15,76,129,0.9))';
      neonWrap.appendChild(d);
    });
  }

  const langBtn = document.getElementById('langBtn');

// Diccionario de traducciones
const translations = {
  es: {
    aboutTitle: "Sobre mí",
    aboutText: "Me especializo en Angular y Django. Diseño y construyo aplicaciones web y móviles con foco en usabilidad y rendimiento. Tengo formación técnica en desarrollo fullstack y aplicaciones móviles.",
    projectsTitle: "Proyectos",
    educationTitle: "Formación Reglada",
    contactTitle: "Contacto",
    contactText: "¿Quieres trabajar conmigo o ver el código de los proyectos? Escríbeme.",
    cvText: "Descargar CV (PDF)",
    themeDark: "Modo oscuro",
    themeLight: "Modo claro"
  },
  en: {
    aboutTitle: "About Me",
    aboutText: "I specialize in Angular and Django. I design and build web and mobile applications focused on usability and performance. I have technical training in fullstack and mobile app development.",
    projectsTitle: "Projects",
    educationTitle: "Education",
    contactTitle: "Contact",
    contactText: "Want to work with me or see the project code? Get in touch.",
    cvText: "Download CV (PDF)",
    themeDark: "Dark mode",
    themeLight: "Light mode"
  }
};

let currentLang = localStorage.getItem("am_lang") || "es";

function applyLanguage(lang) {
  const t = translations[lang];
  document.querySelector("#sobre-title").textContent = t.aboutTitle;
  document.querySelector("#sobre p").textContent = t.aboutText;
  document.querySelector("#proj-title").textContent = t.projectsTitle;
  document.querySelector("#edu-title").textContent = t.educationTitle;
  document.querySelector("#contacto-title").textContent = t.contactTitle;
  document.querySelector("#contacto .contact p").textContent = t.contactText;
  document.querySelector("#cvBtn").textContent = t.cvText;
  themeBtn.textContent = root.classList.contains("dark") ? t.themeLight : t.themeDark;
  langBtn.textContent = lang === "es" ? "EN" : "ES";
  localStorage.setItem("am_lang", lang);
}

applyLanguage(currentLang);

langBtn.addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  applyLanguage(currentLang);
});

  function runNeonSequence(){
    createNeonDots();
    const dots = Array.from(document.querySelectorAll('.neon-dot'));
    dots.forEach((dot,i)=>{
      setTimeout(()=>{
        dot.style.transition='transform .6s cubic-bezier(.2,.9,.2,1),opacity .6s';
        dot.style.transform='scale(1)';
        dot.style.opacity='1';
        dot.style.boxShadow='0 0 24px rgba(0,209,255,0.9)';
      }, 200 * i);
    });
    setTimeout(()=>{
      dots.forEach((dot,i)=>{
        dot.animate([{opacity:1, transform:'scale(1)'},{opacity:0.6, transform:'scale(0.92)'},{opacity:1, transform:'scale(1)'}],{duration:3000 + (i*100),iterations:Infinity,direction:'alternate'});
      });
    }, 200 * dots.length + 300);
  }

  if(root.classList.contains('dark')) runNeonSequence();

})();
