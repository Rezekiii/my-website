// ambient sparks
const sky = document.getElementById('sky');
const n = window.innerWidth < 500 ? 16 : 28;
for(let i=0;i<n;i++){
  const s = document.createElement('div');
  s.className = 'spark';
  const size = 1.5 + Math.random()*2.5;
  s.style.width = size+'px';
  s.style.height = size+'px';
  s.style.left = Math.random()*100+'vw';
  s.style.top = Math.random()*100+'vh';
  s.style.animationDuration = (10+Math.random()*14)+'s, '+(2+Math.random()*3)+'s';
  s.style.animationDelay = (-Math.random()*10)+'s, '+(-Math.random()*3)+'s';
  sky.appendChild(s);
}

// ---------- background music ----------
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
music.volume = 0.55;

function playMusic(){
  music.play().then(()=>{
    musicToggle.classList.add('playing');
  }).catch(()=>{
    // autoplay diblokir browser; tombol tetap muncul agar user bisa tekan manual
    musicToggle.classList.remove('playing');
  });
}
function pauseMusic(){
  music.pause();
  musicToggle.classList.remove('playing');
}
musicToggle.addEventListener('click', ()=>{
  if(music.paused){ playMusic(); } else { pauseMusic(); }
});

// lock / seal
const seal = document.getElementById('seal');
const lock = document.getElementById('lock');
const body = document.body;

function openSeal(){
  if(seal.classList.contains('cracked')) return;
  seal.classList.add('cracked');
  setTimeout(()=>{
    lock.classList.add('unlocked');
    body.classList.remove('locked');
    document.getElementById('intro').scrollIntoView({behavior:'smooth'});
  }, 750);
  // klik segel dihitung sebagai interaksi user pertama -> aman untuk mulai audio
  musicToggle.classList.add('show');
  playMusic();
}
seal.addEventListener('click', openSeal);
seal.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openSeal(); }});

// replay
document.getElementById('replay').addEventListener('click', ()=>{
  seal.classList.remove('cracked');
  lock.classList.remove('unlocked');
  body.classList.add('locked');
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
});

// reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); }
  });
}, {threshold:.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// constellation draw
const constellation = document.getElementById('constellation');
const io2 = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ constellation.classList.add('draw'); }
  });
}, {threshold:.4});
io2.observe(constellation);
