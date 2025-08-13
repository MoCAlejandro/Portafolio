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
      modalContent.innerHTML = `<h3 style="margin-top:0">${title}</h3><p>${desc}</p><p class='muted'>Stack: ${stack}</p><p style='margin-top:12px'><a href='#' class='link'>Código / Demo</a></p>`;
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
