const emojis=['😀','😃','😄','😁','😆','😅','😂','🤣','🥲','🥹','☺️','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🫪','🤨','🧐','🤓','😎','🥸','🤩','🥳','🙂‍↕️','😏','😒','🙂‍↔️','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😮‍💨','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🫣','🫡','🤔','🫢','🤭','🤫','🤥','😶','😶‍🌫️','😐','😑','😬','🫨','🫠','🙄','😯','😦','😧','😮','😲','🥱','😴','🫩','🤤','😪','😵','😵‍💫','🫥','🤐'];
const home=document.querySelector('#emojiHome');
const activeEmoji=document.querySelector('#activeEmoji');
let drag=null;
const extraEmojis=['🤡','💩','👻','💀','☠️','👽','👾','🤖','🎃','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🤳','💪','🦾','🦵','🦿','🦶','👣','🫆','👂','🦻','👃','🫀','🫁','🧠','🦷','🦴','👀','👁','👅','👄','🫦','💋','🩸'];
function shuffled(items){const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
let emojiBags=[[],[]],nextCategory=Math.random()<.5?0:1;
function nextEmoji(previous){const category=nextCategory;nextCategory=1-nextCategory;if(!emojiBags[category].length)emojiBags[category]=shuffled(category?extraEmojis:emojis);if(emojiBags[category].at(-1)===previous)emojiBags[category].unshift(emojiBags[category].pop());return emojiBags[category].pop()}
function makeThrown(character,x,y){const node=document.createElement('span');node.className='thrown-emoji';node.textContent=character;node.style.left=`${x}px`;node.style.top=`${y}px`;document.body.appendChild(node);return node}
function throwEmoji(node,from,velocity){const duration=680,started=performance.now();const dx=Math.max(-620,Math.min(620,velocity.x*16));const dy=Math.max(-420,Math.min(360,velocity.y*14));const targetX=Math.max(45,Math.min(innerWidth-45,from.x+dx));const targetY=Math.max(65,Math.min(innerHeight-55,from.y+dy+120));const arc=Math.max(80,Math.min(230,95+Math.abs(dx)*.2));function frame(now){const t=Math.min(1,(now-started)/duration),e=1-Math.pow(1-t,3);node.style.left=`${from.x+(targetX-from.x)*e}px`;node.style.top=`${from.y+(targetY-from.y)*e-Math.sin(Math.PI*t)*arc}px`;node.style.transform=`translate(-50%,-50%) rotate(${t*(dx<0?-300:300)}deg)`;if(t<1)requestAnimationFrame(frame);else{node.style.left=`${targetX}px`;node.style.top=`${targetY}px`;node.style.transform='translate(-50%,-50%)';setTimeout(()=>{node.style.transition='opacity .4s ease, transform .4s ease';node.style.opacity='0';node.style.transform='translate(-50%,-50%) scale(.35)';setTimeout(()=>node.remove(),420)},30000)}}requestAnimationFrame(frame)}
home.addEventListener('pointerdown',event=>{if(event.button!==0&&event.pointerType!=='touch')return;event.preventDefault();home.setPointerCapture(event.pointerId);const rect=home.getBoundingClientRect();const node=makeThrown(activeEmoji.textContent,rect.left+rect.width/2,rect.top+rect.height/2);activeEmoji.style.opacity='0';drag={node,id:event.pointerId,lastX:event.clientX,lastY:event.clientY,lastTime:performance.now(),velocity:{x:0,y:0}}});
home.addEventListener('pointermove',event=>{if(!drag||drag.id!==event.pointerId)return;const now=performance.now(),dt=Math.max(8,now-drag.lastTime);drag.velocity={x:(event.clientX-drag.lastX)/dt,y:(event.clientY-drag.lastY)/dt};drag.lastX=event.clientX;drag.lastY=event.clientY;drag.lastTime=now;drag.node.style.left=`${event.clientX}px`;drag.node.style.top=`${event.clientY}px`});
function release(event){if(!drag||drag.id!==event.pointerId)return;const released=drag;drag=null;throwEmoji(released.node,{x:event.clientX,y:event.clientY},released.velocity);activeEmoji.textContent=nextEmoji(released.node.textContent);activeEmoji.animate([{opacity:0,transform:'scale(.2)'},{opacity:1,transform:'scale(1.25)',offset:.65},{opacity:1,transform:'scale(1)'}],{duration:580,easing:'cubic-bezier(.2,.9,.25,1)',fill:'forwards'})}
home.addEventListener('pointerup',release);home.addEventListener('pointercancel',release);

const windowEl=document.querySelector('.album-window');
const track=document.querySelector('#albumTrack');
const originals=[...track.children];
originals[9].dataset.project='knock';
originals[9].setAttribute('role','link');
originals[9].setAttribute('aria-label','查看敲敲 KNOCK KNOCK 完整作品');
originals[7].dataset.project='landscape';
originals[7].setAttribute('role','link');
originals[7].setAttribute('aria-label','查看山水脉完整作品');
originals[6].dataset.project='posters';
originals[6].setAttribute('role','link');
originals[6].setAttribute('aria-label','查看海报设计完整作品');
originals[5].dataset.project='awards';
originals[5].setAttribute('role','link');
originals[5].setAttribute('aria-label','查看获奖海报设计完整作品');
originals[4].dataset.project='internship';
originals[4].setAttribute('role','link');
originals[4].setAttribute('aria-label','查看实习产出完整作品');
originals[3].dataset.project='dayeight';
originals[3].setAttribute('role','link');
originals[3].setAttribute('aria-label','查看星期八没有说明书完整作品');
originals[2].dataset.project='scrappy';
originals[2].setAttribute('role','link');
originals[2].setAttribute('aria-label','查看破烂日常完整作品');
originals[8].dataset.project='mcdonalds';
originals[8].setAttribute('role','link');
originals[8].setAttribute('aria-label','查看麦门永存完整作品');
originals[0].dataset.project='odyssey';
originals[0].setAttribute('role','link');
originals[0].setAttribute('aria-label','查看奥德赛正在绕路完整作品');
originals[1].dataset.project='doomie';
originals[1].setAttribute('role','link');
originals[1].setAttribute('aria-label','查看完蛋酱和哦哦完整作品');
originals.forEach(item=>track.append(item.cloneNode(true)));originals.forEach(item=>track.append(item.cloneNode(true)));
track.addEventListener('click',event=>{if(!matchMedia('(hover: none)').matches)return;const album=event.target.closest('.album');if(!album)return;const wasOpen=album.classList.contains('is-open');track.querySelectorAll('.is-open').forEach(item=>item.classList.remove('is-open'));album.classList.toggle('is-open',!wasOpen)});
track.addEventListener('keydown',event=>{if(event.key==='Escape'){event.target.classList.remove('is-open');event.target.blur()}});
track.addEventListener('wheel',event=>{const details=event.target.closest('.album-details');if(details&&details.scrollHeight>details.clientHeight){const down=event.deltaY>0;if(down?details.scrollTop+details.clientHeight<details.scrollHeight-1:details.scrollTop>0)event.stopPropagation()}},{passive:true});
let offset=0,target=0,setWidth=0;
function measure(){if(document.querySelector('.cover').hidden)return;setWidth=track.scrollWidth/3;if(!offset)offset=target=-setWidth;track.style.transform=`translate3d(${offset}px,0,0)`}
function normalize(){if(target>-setWidth*.35){target-=setWidth;offset-=setWidth}if(target<-setWidth*1.65){target+=setWidth;offset+=setWidth}}
function animateTrack(){offset+=(target-offset)*.13;if(Math.abs(target-offset)<.08)offset=target;track.style.transform=`translate3d(${offset}px,0,0)`;normalize();requestAnimationFrame(animateTrack)}
windowEl.addEventListener('wheel',event=>{event.preventDefault();target-=(Math.abs(event.deltaY)>Math.abs(event.deltaX)?event.deltaY:event.deltaX)*.82},{passive:false});
let pointerStart=null,albumDragged=false;windowEl.addEventListener('pointerdown',event=>{if(event.button===0){albumDragged=false;pointerStart={x:event.clientX,target}}});windowEl.addEventListener('pointermove',event=>{if(pointerStart){if(Math.abs(event.clientX-pointerStart.x)>6)albumDragged=true;target=pointerStart.target+(event.clientX-pointerStart.x)}});addEventListener('pointerup',()=>pointerStart=null);addEventListener('pointercancel',()=>pointerStart=null);addEventListener('resize',measure);measure();requestAnimationFrame(animateTrack);

const projects={
  knock:{page:document.querySelector('#knockPage'),title:'敲敲',label:'KNOCK KNOCK'},
  landscape:{page:document.querySelector('#landscapePage'),title:'山水脉',label:'Ink-Washed Clouds and Mists'},
  posters:{page:document.querySelector('#postersPage'),title:'海报设计',label:'Poster Design'},
  awards:{page:document.querySelector('#awardsPage'),title:'获奖海报设计',label:'Award-winning Posters'},
  internship:{page:document.querySelector('#internshipPage'),title:'实习产出作品',label:'SHEIN & BIGO'},
  dayeight:{page:document.querySelector('#dayeightPage'),title:'星期八没有说明书',label:'DAY EIGHT'},
  scrappy:{page:document.querySelector('#scrappyPage'),title:'破烂日常',label:'SCRAPPY DAYS'},
  mcdonalds:{page:document.querySelector('#mcdonaldsPage'),title:'麦门永存',label:"McDonald's"},
  odyssey:{page:document.querySelector('#odysseyPage'),title:'奥德赛正在绕路',label:'Odyssey'},
  doomie:{page:document.querySelector('#doomiePage'),title:'完蛋酱和哦哦',label:'Doomie & oh'}
};
const homeCover=document.querySelector('.cover');
const playerSelect=document.querySelector('.player-select');
let openedFrom=null;
function renderProject(){
  const project=projects[location.hash.slice(1)];
  const isProject=Boolean(project);
  document.body.classList.toggle('project-open',isProject);
  Object.values(projects).forEach(item=>item.page.hidden=item!==project);
  homeCover.hidden=isProject;
  playerSelect.textContent=isProject?`${project.label}⌄`:'Home⌄';
  document.title=isProject?`${project.title} — QIWI Portfolio`:'何秋微 QIWI — Visual Designer';
  window.scrollTo(0,0);
  if(isProject){offset=target;project.page.querySelector('h1').focus({preventScroll:true})}
  else{measure();if(openedFrom){openedFrom.focus({preventScroll:true});openedFrom=null}}
}
function openProject(album){openedFrom=album;location.hash=album.dataset.project}
track.addEventListener('click',event=>{const album=event.target.closest('[data-project]');if(album&&!albumDragged)openProject(album)});
track.addEventListener('keydown',event=>{const album=event.target.closest('[data-project]');if(album&&(event.key==='Enter'||event.key===' ')){event.preventDefault();openProject(album)}});
playerSelect.addEventListener('click',()=>{if(projects[location.hash.slice(1)])location.hash=''});
addEventListener('hashchange',renderProject);
renderProject();

const toast=document.querySelector('#contactToast');
let toastTimer,contactRequest=0;
function showContact(message,duration=5000){
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>toast.classList.remove('show'),duration);
}
const contactValues={phone:'13558741259',email:'379899591@qq.com',wechat:'hqw322324'};
async function copyContact(value){
  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(value);
      return true;
    }
  }catch{}
  const field=document.createElement('textarea');
  field.value=value;
  field.setAttribute('readonly','');
  field.style.cssText='position:fixed;left:-9999px;top:0';
  const focused=document.activeElement;
  document.body.append(field);
  field.select();
  let copied=false;
  try{copied=document.execCommand('copy')}catch{}
  field.remove();
  focused?.focus({preventScroll:true});
  return copied;
}
document.querySelectorAll('[data-contact]').forEach(link=>{
  link.addEventListener('click',async event=>{
    event.preventDefault();
    const request=++contactRequest;
    const value=contactValues[link.dataset.contact];
    if(!value){showContact('CONTACT DETAILS COMING SOON',1500);return}
    showContact(value);
    const copied=await copyContact(value);
    if(request===contactRequest)showContact(value+(copied?' · 已复制':' · 自动复制失败，请手动复制'),copied?5000:15000);
  });
  if(contactValues[link.dataset.contact])link.addEventListener('keydown',event=>{
    if(event.key===' '){event.preventDefault();link.click()}
  });
});
