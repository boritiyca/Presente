document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.musica-play');

  function pauseOthers(exceptId){
    document.querySelectorAll('audio').forEach(a=>{
      if(a.id!==exceptId){ a.pause(); a.currentTime=0; }
    });
    buttons.forEach(b=>{
      if(b.dataset.audio!==exceptId) b.textContent='▶ Play';
    });
  }

  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const audioId = btn.dataset.audio;
      const audioEl = document.getElementById(audioId);
      if(!audioEl) return;

      if(audioEl.paused){
        pauseOthers(audioId);
        audioEl.play().then(()=>{ btn.textContent='⏸ Pause'; })
        .catch(console.error);
      }else{
        audioEl.pause();
        btn.textContent='▶ Play';
      }
    });
  });

  
  document.querySelectorAll('.volume-slider').forEach(slider=>{
    const id = slider.dataset.audio;
    const audio = document.getElementById(id);
    const label = slider.parentElement.querySelector('.volume-value');
    if(!audio) return;
    audio.volume = parseFloat(slider.value);
    slider.addEventListener('input', ()=>{
      audio.volume = parseFloat(slider.value);
      if(label) label.textContent = Math.round(slider.value*100)+'%';
    });
  });
});