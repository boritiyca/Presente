
const startISO = '2024-11-02T00:00:00-03:00';
const startDate = new Date(startISO);


const pad2 = n => String(n).padStart(2, '0');


function getCalendarDiff(from, to) {
  if (to < from) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0, totalHours: 0, totalMin: 0 };
  }
  let y = to.getFullYear() - from.getFullYear();
  let temp = new Date(from);
  temp.setFullYear(temp.getFullYear() + y);
  if (temp > to) { y--; temp.setFullYear(temp.getFullYear() - 1); }

  let m = to.getMonth() - temp.getMonth();
  if (m < 0) m += 12;
  temp.setMonth(temp.getMonth() + m);
  if (temp > to) { m--; temp.setMonth(temp.getMonth() - 1); }

  const msAfterMonths = to - temp;
  const dayMs = 24 * 60 * 60 * 1000;
  const d = Math.floor(msAfterMonths / dayMs);

  const afterDays = new Date(temp.getTime() + d * dayMs);
  let rest = to - afterDays;

  const h = Math.floor(rest / (60 * 60 * 1000)); rest -= h * 60 * 60 * 1000;
  const min = Math.floor(rest / (60 * 1000));    rest -= min * 60 * 1000;
  const s = Math.floor(rest / 1000);

 
  const totalMs = to - from;
  const totalDays = Math.floor(totalMs / dayMs);
  const totalHours = Math.floor(totalMs / (60 * 60 * 1000));
  const totalMin = Math.floor(totalMs / (60 * 1000));

  return { years: y, months: m, days: d, hours: h, minutes: min, seconds: s, totalDays, totalHours, totalMin };
}

function tick() {
  const now = new Date();

  const diff = getCalendarDiff(startDate, now);

  
  document.getElementById('yy').textContent  = diff.years;
  document.getElementById('mm').textContent  = diff.months;
  document.getElementById('dd').textContent  = diff.days;
  document.getElementById('hh').textContent  = pad2(diff.hours);
  document.getElementById('mi').textContent  = pad2(diff.minutes);
  document.getElementById('ss').textContent  = pad2(diff.seconds);

 
  document.getElementById('totalDias').textContent  = diff.totalDays.toLocaleString('pt-BR');
  document.getElementById('totalHoras').textContent = diff.totalHours.toLocaleString('pt-BR');
  document.getElementById('totalMin').textContent   = diff.totalMin.toLocaleString('pt-BR');
}


tick();
setInterval(tick, 1000);
