const starter = [
  {name:"Mathématiques", grades:[{value:12,outOf:20,coef:1,label:"Dernière note"}]},
  {name:"Physique-chimie", grades:[{value:12.5,outOf:20,coef:1,label:"Évaluation"},{value:4,outOf:20,coef:1,label:"Contrôle"}]},
  {name:"SVT", grades:[{value:6.5,outOf:10,coef:1,label:"Évaluation"},{value:7.5,outOf:20,coef:1,label:"Contrôle"}]}
];
let subjects = JSON.parse(localStorage.getItem("myschool-subjects") || "null") || starter;
const $ = id => document.getElementById(id);
const average = grades => {
  if (!grades.length) return null;
  const totalCoef = grades.reduce((s,g)=>s+Number(g.coef||1),0);
  return grades.reduce((s,g)=>s+(Number(g.value)/Number(g.outOf)*20)*Number(g.coef||1),0)/totalCoef;
};
const fmt = n => n===null ? "—" : n.toLocaleString("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2});
function save(){localStorage.setItem("myschool-subjects",JSON.stringify(subjects));render();}
function render(){
  $("subjects-list").innerHTML = subjects.map((s,i)=>{
    const avg=average(s.grades), pct=avg===null?0:Math.max(0,Math.min(100,avg/20*100));
    return `<article class="subject-card"><div class="subject-top"><div class="subject-name">${escapeHtml(s.name)}</div><span class="muted">${s.grades.length} note(s)</span></div><div class="subject-average">${fmt(avg)} <small>/20</small></div><div class="progress"><span style="width:${pct}%"></span></div><div class="grade-list">${s.grades.map(g=>`<div class="grade-row"><span>${escapeHtml(g.label||"Évaluation")} · coeff. ${g.coef}</span><strong>${fmt(Number(g.value)/Number(g.outOf)*20)}/20</strong></div>`).join("") || '<div class="grade-row">Aucune note</div>'}</div></article>`;
  }).join("");
  const avgs=subjects.map(s=>average(s.grades)).filter(v=>v!==null);
  $("overall-average").innerHTML=(avgs.length?fmt(avgs.reduce((a,b)=>a+b,0)/avgs.length):"—")+'<small>/20</small>';
  $("subject-count").textContent=subjects.length;
  $("grade-count").textContent=subjects.reduce((n,s)=>n+s.grades.length,0);
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("add-grade").addEventListener("click",()=>$("grade-dialog").showModal());
$("grade-form").addEventListener("submit",e=>{
  e.preventDefault();
  const name=$("grade-subject").value, value=Number($("grade-value").value), outOf=Number($("grade-out-of").value), coef=Number($("grade-coef").value);
  if(!Number.isFinite(value)||!Number.isFinite(outOf)||value<0||value>outOf||outOf<=0||coef<=0)return;
  let subject=subjects.find(s=>s.name===name);
  if(!subject){subject={name,grades:[]};subjects.push(subject);}
  subject.grades.push({value,outOf,coef,label:$("grade-label").value.trim()||"Nouvelle note"});
  save(); $("grade-dialog").close(); $("grade-form").reset(); $("grade-out-of").value=20; $("grade-coef").value=1;
  notify(`Nouvelle note en ${name}`,`${value}/${outOf} · coefficient ${coef}`);
});
async function enableNotifications(){
  if(!("Notification" in window)){ $("notification-status").textContent="Les notifications ne sont pas prises en charge par ce navigateur.";return;}
  const permission=await Notification.requestPermission();
  $("notification-status").textContent=permission==="granted"?"Notifications autorisées sur cet appareil.":"Autorisation de notification non accordée.";
}
function notify(title,body){
  if("Notification" in window && Notification.permission==="granted"){
    if(navigator.serviceWorker?.controller){navigator.serviceWorker.ready.then(reg=>reg.showNotification(title,{body,icon:"icon.svg",badge:"icon.svg"}));}
    else new Notification(title,{body});
  }
}
$("enable-notifications").addEventListener("click",enableNotifications);
$("enable-notifications-2").addEventListener("click",enableNotifications);
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
render();
