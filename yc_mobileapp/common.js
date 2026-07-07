/* Young차 - 공통 JavaScript */
'use strict';

// Theme
const Theme = {
  init(){
    const t = localStorage.getItem('yc-theme')||'light';
    this.apply(t);
    document.querySelectorAll('.theme-toggle input').forEach(el=>{
      el.checked = t==='dark';
      el.addEventListener('change',()=>this.toggle());
    });
  },
  apply(t){
    document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'');
    localStorage.setItem('yc-theme',t);
  },
  toggle(){
    const cur=localStorage.getItem('yc-theme')||'light';
    const nxt=cur==='light'?'dark':'light';
    this.apply(nxt);
    document.querySelectorAll('.theme-toggle input').forEach(el=>el.checked=nxt==='dark');
    return nxt;
  }
};

// Bottom Sheet
const BS = {
  open(id){
    document.getElementById(id+'-ov')?.classList.add('open');
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow='hidden';
  },
  close(id){
    document.getElementById(id+'-ov')?.classList.remove('open');
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow='';
  }
};

// Modal
const Modal = {
  open(id){
    document.getElementById(id)?.classList.add('open');
    document.body.style.overflow='hidden';
  },
  close(id){
    document.getElementById(id)?.classList.remove('open');
    document.body.style.overflow='';
  }
};

// Toast
const Toast = {
  show(msg, dur=2500){
    const wrap = document.querySelector('.toast-wrap') || (() => {
      const d=document.createElement('div');
      d.className='toast-wrap';
      document.body.appendChild(d);
      return d;
    })();
    const t=document.createElement('div');
    t.className='toast'; t.textContent=msg;
    wrap.appendChild(t);
    setTimeout(()=>{
      t.style.cssText='opacity:0;transform:translateY(-8px);transition:all .3s ease';
      setTimeout(()=>t.remove(),300);
    },dur);
  }
};

// Ripple
function ripple(el){
  el.style.position='relative'; el.style.overflow='hidden';
  el.addEventListener('click',e=>{
    const r=document.createElement('span');
    const rect=el.getBoundingClientRect();
    const sz=Math.max(rect.width,rect.height);
    r.style.cssText=`position:absolute;width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px;background:rgba(255,255,255,.25);border-radius:50%;transform:scale(0);animation:ripple .6s linear;pointer-events:none`;
    const style=document.createElement('style');
    style.textContent='@keyframes ripple{to{transform:scale(4);opacity:0}}';
    document.head.appendChild(style);
    el.appendChild(r);
    setTimeout(()=>r.remove(),600);
  });
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded',()=>{
  Theme.init();
  document.querySelectorAll('.btn-primary,.btn-secondary').forEach(ripple);
  // Close overlay click
  document.querySelectorAll('.bs-overlay').forEach(ov=>{
    ov.addEventListener('click',()=>{
      const id=ov.id.replace('-ov','');
      BS.close(id);
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(m=>{
    m.addEventListener('click',e=>{
      if(e.target===m) Modal.close(m.id);
    });
  });
});
