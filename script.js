const header=document.querySelector('.topbar');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>24),{passive:true});

const menu=document.querySelector('.menu');
const nav=document.querySelector('.topbar nav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));

document.querySelectorAll('[data-tabs]').forEach(tabset=>{
  const buttons=[...tabset.querySelectorAll('[role="tab"]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
    buttons.forEach(b=>b.setAttribute('aria-selected','false'));
    tabset.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    button.setAttribute('aria-selected','true');
    document.getElementById(button.dataset.tab).classList.add('active');
  }));
});

const dialog=document.getElementById('lightbox');
const dialogImage=dialog.querySelector('img');
document.querySelectorAll('.view-image').forEach(button=>button.addEventListener('click',()=>{
  dialogImage.src=button.dataset.image;
  dialogImage.alt=button.querySelector('img')?.alt||'Expanded project visual';
  dialog.querySelector('p').textContent=button.querySelector('span')?.textContent||'';
  dialog.showModal();
}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
addEventListener('keydown',event=>{if(event.key==='Escape'&&dialog.open)dialog.close()});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
