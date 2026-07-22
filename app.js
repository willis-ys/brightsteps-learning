"use strict";

const APP_VERSION = "2.1.2";
const STORAGE_KEY = "brightsteps-2-progress";
const PHONEME_BASE = "./audio/phonemes/";
const SOUND_FILE_MAP = { k:"c", ck:"c", ff:"f", ll:"l", ss:"s", zz:"z", "oo-long":"ooo" };
const EXPECTED_AUDIO = ["a","ai","air","ar","b","c","ch","d","e","ear","ee","er","f","g","h","i","igh","j","l","m","n","ng","o","oa","oi","oo","ooo","or","ow","p","qu","r","s","sh","t","th","u","ur","ure","v","w","x","y","z"];
const PLANT_STAGES = [
 {emoji:"🌰",name:"Sleepy seed"},{emoji:"🌱",name:"Tiny sprout"},{emoji:"🌿",name:"Leafy plant"},
 {emoji:"🌷",name:"Flower bud"},{emoji:"🌻",name:"Sunny flower"},{emoji:"🌳",name:"Garden tree"}
];
const PET_STAGES = [
 {emoji:"🐣",name:"Tiny chick"},{emoji:"🐥",name:"Growing chick"},{emoji:"🐤",name:"Happy bird"},{emoji:"🐔",name:"Garden hen"}
];
const GARDEN_COSTS = {water:3,feed:2,newPlant:5};

const TRAILS = [
  {name:"Woodland Start", emoji:"🌱", sounds:["s","a","t","p"]},
  {name:"Mushroom Path", emoji:"🍄", sounds:["i","n","m","d"]},
  {name:"Owl Hollow", emoji:"🦉", sounds:["g","o","c","k"]},
  {name:"Rabbit Run", emoji:"🐇", sounds:["ck","e","u","r"]},
  {name:"Fox Den", emoji:"🦊", sounds:["h","b","f","ff","l","ll","ss"]},
  {name:"Firefly Bridge", emoji:"✨", sounds:["j","v","w","x","y","z","zz","qu"]},
  {name:"Whispering Trees", emoji:"🌳", sounds:["ch","sh","th","ng"]},
  {name:"Rainbow River", emoji:"🌈", sounds:["ai","ee","igh","oa"]},
  {name:"Moonlit Meadow", emoji:"🌙", sounds:["oo","oo-long","ar","or","ur"]},
  {name:"Cloud Castle", emoji:"☁️", sounds:["ow","oi","ear","air","ure","er"]}
];

const SOUND_META = {
 s:{emoji:"🐍",hint:"snake"},a:{emoji:"🍎",hint:"apple"},t:{emoji:"🐯",hint:"tiger"},p:{emoji:"🐧",hint:"penguin"},
 i:{emoji:"🦎",hint:"iguana"},n:{emoji:"🪺",hint:"nest"},m:{emoji:"🌙",hint:"moon"},d:{emoji:"🐶",hint:"dog"},
 g:{emoji:"🐐",hint:"goat"},o:{emoji:"🐙",hint:"octopus"},c:{emoji:"🐈",hint:"cat"},k:{emoji:"🪁",hint:"kite"},ck:{emoji:"🦆",hint:"duck"},
 e:{emoji:"🥚",hint:"egg"},u:{emoji:"☂️",hint:"umbrella"},r:{emoji:"🐇",hint:"rabbit"},h:{emoji:"🎩",hint:"hat"},b:{emoji:"⚽",hint:"ball"},
 f:{emoji:"🐟",hint:"fish"},ff:{emoji:"🦒",hint:"giraffe"},l:{emoji:"🦁",hint:"lion"},ll:{emoji:"🔔",hint:"bell"},ss:{emoji:"👗",hint:"dress"},
 j:{emoji:"🫙",hint:"jam"},v:{emoji:"🚐",hint:"van"},w:{emoji:"🌊",hint:"wave"},x:{emoji:"📦",hint:"box"},y:{emoji:"🟡",hint:"yellow"},z:{emoji:"🦓",hint:"zebra"},zz:{emoji:"🐝",hint:"buzz"},qu:{emoji:"👑",hint:"queen"},
 ch:{emoji:"🧀",hint:"cheese"},sh:{emoji:"🚢",hint:"ship"},th:{emoji:"👍",hint:"thumb"},ng:{emoji:"💍",hint:"ring"},
 ai:{emoji:"🌧️",hint:"rain"},ee:{emoji:"🐝",hint:"bee"},igh:{emoji:"🌙",hint:"night"},oa:{emoji:"🛶",hint:"boat"},
 oo:{emoji:"📖",hint:"book"},"oo-long":{emoji:"🌙",hint:"moon"},ar:{emoji:"⭐",hint:"star"},or:{emoji:"🦄",hint:"horn"},ur:{emoji:"🐦",hint:"bird"},
 ow:{emoji:"🦉",hint:"owl"},oi:{emoji:"🪙",hint:"coin"},ear:{emoji:"👂",hint:"ear"},air:{emoji:"🪑",hint:"chair"},ure:{emoji:"🧴",hint:"cure"},er:{emoji:"🔨",hint:"hammer"}
};

const WORDS = [
 {word:"sat",tokens:["s","a","t"],emoji:"🪑"},{word:"pat",tokens:["p","a","t"],emoji:"🖐️"},{word:"tap",tokens:["t","a","p"],emoji:"🚰"},
 {word:"sit",tokens:["s","i","t"],emoji:"🪑"},{word:"pin",tokens:["p","i","n"],emoji:"📌"},{word:"tin",tokens:["t","i","n"],emoji:"🥫"},
 {word:"map",tokens:["m","a","p"],emoji:"🗺️"},{word:"man",tokens:["m","a","n"],emoji:"👨"},{word:"dip",tokens:["d","i","p"],emoji:"🥣"},{word:"dad",tokens:["d","a","d"],emoji:"👨"},
 {word:"dog",tokens:["d","o","g"],emoji:"🐶"},{word:"got",tokens:["g","o","t"],emoji:"🎁"},{word:"cat",tokens:["c","a","t"],emoji:"🐈"},{word:"cot",tokens:["c","o","t"],emoji:"🛏️"},
 {word:"kit",tokens:["k","i","t"],emoji:"🧰"},{word:"kid",tokens:["k","i","d"],emoji:"🧒"},{word:"duck",tokens:["d","u","ck"],emoji:"🦆"},
 {word:"red",tokens:["r","e","d"],emoji:"🔴"},{word:"run",tokens:["r","u","n"],emoji:"🏃"},{word:"sun",tokens:["s","u","n"],emoji:"☀️"},{word:"bus",tokens:["b","u","s"],emoji:"🚌"},
 {word:"bug",tokens:["b","u","g"],emoji:"🐞"},{word:"hut",tokens:["h","u","t"],emoji:"🛖"},{word:"fun",tokens:["f","u","n"],emoji:"🎉"},{word:"log",tokens:["l","o","g"],emoji:"🪵"},
 {word:"leg",tokens:["l","e","g"],emoji:"🦵"},{word:"lip",tokens:["l","i","p"],emoji:"👄"},{word:"jam",tokens:["j","a","m"],emoji:"🫙"},{word:"van",tokens:["v","a","n"],emoji:"🚐"},
 {word:"win",tokens:["w","i","n"],emoji:"🏆"},{word:"box",tokens:["b","o","x"],emoji:"📦"},{word:"yes",tokens:["y","e","s"],emoji:"✅"},{word:"zip",tokens:["z","i","p"],emoji:"🤐"},
 {word:"quiz",tokens:["qu","i","z"],emoji:"❓"},{word:"ship",tokens:["sh","i","p"],emoji:"🚢"},{word:"shop",tokens:["sh","o","p"],emoji:"🏪"},
 {word:"chat",tokens:["ch","a","t"],emoji:"💬"},{word:"chip",tokens:["ch","i","p"],emoji:"🍟"},{word:"thin",tokens:["th","i","n"],emoji:"📏"},{word:"ring",tokens:["r","i","ng"],emoji:"💍"},
 {word:"rain",tokens:["r","ai","n"],emoji:"🌧️"},{word:"feet",tokens:["f","ee","t"],emoji:"🦶"},{word:"night",tokens:["n","igh","t"],emoji:"🌙"},{word:"boat",tokens:["b","oa","t"],emoji:"🛶"},
 {word:"book",tokens:["b","oo","k"],emoji:"📖"},{word:"moon",tokens:["m","oo-long","n"],emoji:"🌙"},{word:"star",tokens:["s","t","ar"],emoji:"⭐"},{word:"fork",tokens:["f","or","k"],emoji:"🍴"},
 {word:"coin",tokens:["c","oi","n"],emoji:"🪙"},{word:"chair",tokens:["ch","air"],emoji:"🪑"}
];

const BADGES = [
 {id:"first-sound",emoji:"🌱",name:"First Sound",desc:"Learn your first phoneme",test:s=>Object.keys(s.phonics).some(k=>s.phonics[k]>=1)},
 {id:"sound-scout",emoji:"🧭",name:"Sound Scout",desc:"Master 10 sounds",test:s=>masteredSounds(s)>=10},
 {id:"word-blender",emoji:"🧪",name:"Word Blender",desc:"Blend 15 words",test:s=>s.stats.wordsBlended>=15},
 {id:"maths-climber",emoji:"⛰️",name:"Maths Climber",desc:"Finish a maths session",test:s=>s.stats.mathSessions>=1},
 {id:"number-hero",emoji:"🦸",name:"Number Hero",desc:"Answer 100 maths questions",test:s=>s.stats.mathCorrect>=100},
 {id:"green-thumb",emoji:"💧",name:"Green Thumb",desc:"Water the garden 10 times",test:s=>s.stats.waterings>=10},
 {id:"animal-friend",emoji:"🐥",name:"Animal Friend",desc:"Feed the garden animal 10 times",test:s=>s.stats.feedings>=10},
 {id:"spark",emoji:"🔥",name:"Seven Day Spark",desc:"Reach a 7-day streak",test:s=>s.streak>=7},
 {id:"star",emoji:"⭐",name:"Star Collector",desc:"Earn 100 stars in total",test:s=>s.stats.starsEarned>=100}
];

function defaultState(){return {name:"Explorer",stars:0,gems:0,streak:0,lastPlay:null,dailyDate:null,dailyStep:0,phonics:{},completedTrails:[],unlockedTrail:0,mathLevel:1,badges:[],settings:{mathsSpeech:true},garden:{plantStage:0,waterProgress:0,blooms:0,petFeeds:0},stats:{phonicsCorrect:0,phonicsAttempts:0,wordsBlended:0,mathCorrect:0,mathAttempts:0,mathSessions:0,dailyCompleted:0,starsEarned:0,starsSpent:0,waterings:0,feedings:0},mathDomains:{counting:{c:0,a:0},addition:{c:0,a:0},subtraction:{c:0,a:0},bonds:{c:0,a:0},order:{c:0,a:0},patterns:{c:0,a:0},compare:{c:0,a:0},shapes:{c:0,a:0},measure:{c:0,a:0},stories:{c:0,a:0}}};}
let state = loadState();
let current = {view:"home",trail:0,lesson:null,math:null};
let activeAudio = null;
let preferredMathVoice = null;
migrateState();

function loadState(){try{return merge(defaultState(),JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}"));}catch{return defaultState();}}
function merge(base,extra){for(const [k,v] of Object.entries(extra||{})){if(v&&typeof v==="object"&&!Array.isArray(v)&&base[k]&&typeof base[k]==="object")merge(base[k],v);else base[k]=v;}return base;}
function reconcileTrailProgress(){
 if(!Array.isArray(state.completedTrails))state.completedTrails=[];
 // Versions before 2.0.3 marked every sound in a fully completed trail at level 1.
 // Use that legacy marker to repair already-completed trails after this update.
 TRAILS.forEach((trail,index)=>{
  const legacyComplete=trail.sounds.every(sound=>(state.phonics[sound]||0)>=1);
  if(legacyComplete&&!state.completedTrails.includes(index))state.completedTrails.push(index);
 });
 state.completedTrails=[...new Set(state.completedTrails)].filter(i=>Number.isInteger(i)&&i>=0&&i<TRAILS.length);
 let highest=clamp(Number(state.unlockedTrail)||0,0,TRAILS.length-1);
 for(const completed of state.completedTrails){if(completed<TRAILS.length-1)highest=Math.max(highest,completed+1);}
 state.unlockedTrail=highest;
}
function migrateState(){
 state.settings=state.settings||{mathsSpeech:true};
 if(typeof state.settings.mathsSpeech!=="boolean")state.settings.mathsSpeech=true;
 state.garden=merge({plantStage:0,waterProgress:0,blooms:0,petFeeds:0},state.garden||{});
 state.stats=merge({starsEarned:0,starsSpent:0,waterings:0,feedings:0},state.stats||{});
 state.stats.starsEarned=Math.max(Number(state.stats.starsEarned)||0,Number(state.stars)||0);
 state.garden.plantStage=clamp(Number(state.garden.plantStage)||0,0,PLANT_STAGES.length-1);
 state.garden.waterProgress=clamp(Number(state.garden.waterProgress)||0,0,1);
 state.garden.blooms=Math.max(0,Number(state.garden.blooms)||0);
 state.garden.petFeeds=Math.max(0,Number(state.garden.petFeeds)||0);
}
function addStars(amount){const n=Math.max(0,Number(amount)||0);state.stars+=n;state.stats.starsEarned+=n;}
function spendStars(amount){const n=Math.max(0,Number(amount)||0);if(state.stars<n)return false;state.stars-=n;state.stats.starsSpent+=n;return true;}
function save(){migrateState();reconcileTrailProgress();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));updateStreak();awardBadges();}
function today(){return new Date().toISOString().slice(0,10)}
function updateStreak(){const t=today();if(state.lastPlay===t)return;const y=new Date();y.setDate(y.getDate()-1);const ys=y.toISOString().slice(0,10);state.streak=state.lastPlay===ys?state.streak+1:1;state.lastPlay=t;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function masteredSounds(s=state){return Object.values(s.phonics).filter(v=>v>=3).length}
function phonicsProgress(){return Math.round(masteredSounds()/Object.keys(SOUND_META).length*100)}
function mathsAccuracy(){return state.stats.mathAttempts?Math.round(state.stats.mathCorrect/state.stats.mathAttempts*100):0}
function awardBadges(){let changed=false;for(const b of BADGES){if(!state.badges.includes(b.id)&&b.test(state)){state.badges.push(b.id);state.gems++;changed=true;toast(`New badge: ${b.name}!`);}}if(changed)localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function toast(msg){const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),2500)}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]))}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function clamp(n,a,b){return Math.max(a,Math.min(b,n))}
function header(title,subtitle){return `<div class="screen-head"><button class="icon-button" data-action="back" aria-label="Back">←</button><div class="screen-title"><h1>${title}</h1><p>${subtitle}</p></div><div class="pill">⭐ ${state.stars}</div></div>`}
function shell(content){document.getElementById("app").innerHTML=content;bind();}

function renderHome(){current.view="home";const pp=phonicsProgress();const ma=mathsAccuracy();shell(`<div class="screen"><div class="topbar"><div class="brand"><span class="brand-mark">🌟</span><span>BrightSteps</span></div><div class="status-row"><span class="pill streak" title="Learning streak: consecutive active days" aria-label="${state.streak} day learning streak">🔥 ${state.streak} day${state.streak===1?"":"s"}</span><span class="pill" title="Stars available to spend in the Reward Garden" aria-label="${state.stars} stars available">⭐ ${state.stars} stars</span><span class="pill" title="Badges earned" aria-label="${state.badges.length} badges earned">🏅 ${state.badges.length}</span></div></div>
<section class="hero"><div class="hero-grid"><div><div class="eyebrow">Today's 15-minute adventure</div><h1>Hello, ${esc(state.name)}!</h1><p>Learn one sound trail, climb Maths Mountain, and grow your reward garden.</p><button class="primary" data-action="daily">${state.dailyDate===today()&&state.dailyStep>=2?"Adventure complete ✓":"Start today's adventure"}</button></div><div class="hero-emoji">🦊</div></div></section>
<div class="section-heading"><div><h2>Choose an adventure</h2><p>Short, touch-friendly lessons with progress saved on this device.</p></div></div>
<div class="cards"><button class="card phonics" data-action="phonics"><span class="card-icon">🌳</span><h3>Phonics Forest</h3><p>Learn sounds, recognise letters and blend words.</p><div class="card-meta"><div class="progress-track"><span style="width:${pp}%"></span></div><span>${pp}%</span></div></button>
<button class="card maths" data-action="maths"><span class="card-icon">⛰️</span><h3>Maths Mountain</h3><p>Thirty playful questions with read-aloud help across counting and reasoning.</p><div class="card-meta"><div class="progress-track"><span style="width:${ma}%"></span></div><span>${ma||0}% accuracy</span></div></button>
<button class="card rewards" data-action="rewards"><span class="card-icon">🏡</span><h3>Reward Garden</h3><p>Spend stars to water plants, grow flowers and feed your garden animal.</p><div class="card-meta"><span>${state.badges.length}/${BADGES.length} badges</span><span>🌼</span></div></button>
<button class="card parent" data-action="parent"><span class="card-icon">📊</span><h3>Parent Dashboard</h3><p>Review mastery, audio health, maths domains and learning data.</p><div class="card-meta"><span>Local & private</span><span>🔒</span></div></button></div>
<div class="footer-note">BrightSteps stores progress only in this browser. Phonics audio is bundled locally in the deployed app.</div></div>`)}

function renderTrails(){current.view="trails";reconcileTrailProgress();const cards=TRAILS.map((t,i)=>{const unlocked=i<=state.unlockedTrail;const completed=state.completedTrails.includes(i);const vals=t.sounds.map(s=>state.phonics[s]||0);const learned=vals.filter(v=>v>=1).length;const mastered=vals.filter(v=>v>=3).length;let status;if(completed){status=`Trail completed · ${learned}/${t.sounds.length} learned${mastered?` · ${mastered}/${t.sounds.length} mastered`:" · repeat to build mastery"}`}else{status=`${learned}/${t.sounds.length} learned${mastered?` · ${mastered}/${t.sounds.length} mastered`:""}`}return `<button class="trail ${unlocked?"":"locked"}" data-trail="${i}" ${unlocked?"":"disabled"}><span class="trail-number">${completed?"✓":i+1}</span>${unlocked?"":"<span class='lock'>🔒</span>"}<h3>${t.emoji} ${t.name}</h3><div class="sound-chips">${t.sounds.map(s=>`<span class="sound-chip">${s}</span>`).join("")}</div><div class="mastery">${status}</div></button>`}).join("");shell(`<div class="screen">${header("Phonics Forest","A structured journey from first sounds to digraphs.")}<div class="panel"><strong>How progression works</strong><p class="helper">Finishing a trail marks every sound as learned and unlocks the next path. A sound becomes mastered after three successful recognition practices, so children can revisit completed trails without blocking progress.</p></div><div class="trail-grid">${cards}</div></div>`)}

function startTrail(index,{daily=false}={}){const trail=TRAILS[index];const items=[];for(const s of shuffle(trail.sounds)){items.push({type:"learn",sound:s});items.push({type:"choose",sound:s});}
 const available=WORDS.filter(w=>w.tokens.every(x=>knownThroughTrail(x,index)));for(const w of shuffle(available).slice(0,Math.max(2,Math.min(5,trail.sounds.length))))items.push({type:"blend",word:w});
 current.trail=index;current.lesson={items:daily?shuffle(items).slice(0,6):items,index:0,correct:0,daily,answered:false};renderLesson();}
function knownThroughTrail(sound,index){return TRAILS.slice(0,index+1).some(t=>t.sounds.includes(sound)) || (sound==="k"&&index>=2)}
function renderLesson(){const L=current.lesson;if(!L||L.index>=L.items.length)return finishPhonics();const item=L.items[L.index];const pct=Math.round(L.index/L.items.length*100);let body="";
 if(item.type==="learn")body=learnSound(item.sound);
 if(item.type==="choose")body=chooseSound(item.sound);
 if(item.type==="blend")body=blendWord(item.word);
 shell(`<div class="screen">${header(TRAILS[current.trail].name,`Activity ${L.index+1} of ${L.items.length}`)}<div class="lesson-card"><div class="lesson-progress"><div class="progress-track"><span style="width:${pct}%"></span></div><strong>${pct}%</strong></div>${body}</div></div>`)}
function learnSound(s){const m=SOUND_META[s];return `<div class="lesson-kicker">Meet the sound</div><div class="big-sound">${s}</div><div class="sound-picture">${m.emoji}</div><div class="instruction">${esc(m.hint)} uses this sound</div><button class="secondary sound-button" data-play-sound="${s}" data-repeat="2"><span class="sound-wave"><i></i><i></i><i></i><i></i></span> Hear sound twice</button><p class="helper">Listen, then say the pure sound without adding “uh”.</p><button class="primary" data-action="lesson-next">I said it! Continue</button>`}
function chooseSound(target){const pool=shuffle(Object.keys(SOUND_META).filter(s=>s!==target)).slice(0,3);const options=shuffle([target,...pool]);return `<div class="lesson-kicker">Listen and choose</div><div class="sound-picture">👂</div><div class="instruction">Which grapheme makes this sound?</div><button class="secondary sound-button" data-play-sound="${target}" data-repeat="2"><span class="sound-wave"><i></i><i></i><i></i><i></i></span> Hear it again</button><div class="answers">${options.map(o=>`<button class="answer" data-answer="${o}" data-correct="${target}">${o}</button>`).join("")}</div><div id="feedback" class="feedback"></div>`}
function blendWord(w){return `<div class="lesson-kicker">Blend a word</div><div class="sound-picture">${w.emoji}</div><div class="instruction">Say each sound, then sweep them together.</div><div class="blend-row">${w.tokens.map((t,i)=>`<span class="blend-token" data-token-index="${i}">${t}</span>`).join("<strong>·</strong>")}</div><button class="secondary sound-button" data-play-word="${w.word}"><span class="sound-wave"><i></i><i></i><i></i><i></i></span> Play the sounds</button><div class="word-reveal hidden" id="wordReveal">${w.word}</div><div id="feedback" class="feedback"></div><button class="primary hidden" id="blendNext" data-action="blend-next">I blended it!</button>`}
function answerPhonics(btn){if(current.lesson.answered)return;const good=btn.dataset.answer===btn.dataset.correct;current.lesson.answered=good;state.stats.phonicsAttempts++;document.querySelectorAll(".answer").forEach(b=>{b.disabled=true;if(b.dataset.answer===btn.dataset.correct)b.classList.add("correct")});if(good){current.lesson.correct++;state.stats.phonicsCorrect++;addStars(2);state.phonics[btn.dataset.correct]=clamp((state.phonics[btn.dataset.correct]||0)+1,0,3);feedback("Brilliant listening! +2 stars","good");save();setTimeout(nextLesson,900)}else{btn.classList.add("wrong");feedback("Good try. Listen once more, then tap the glowing answer.","try");current.lesson.answered=false;document.querySelectorAll(".answer").forEach(b=>b.disabled=false);save()}}
function feedback(text,kind){const f=document.getElementById("feedback");if(f){f.textContent=text;f.className=`feedback ${kind}`}}
function nextLesson(){current.lesson.index++;current.lesson.answered=false;renderLesson()}
function finishPhonics(){const L=current.lesson;const trail=TRAILS[current.trail];let unlockedNext=false;if(!L.daily){for(const s of trail.sounds){if((state.phonics[s]||0)<1)state.phonics[s]=1}if(!state.completedTrails.includes(current.trail))state.completedTrails.push(current.trail);const previousUnlock=state.unlockedTrail;if(current.trail<TRAILS.length-1)state.unlockedTrail=Math.max(state.unlockedTrail,current.trail+1);unlockedNext=state.unlockedTrail>previousUnlock}addStars(5);save();if(L.daily){state.dailyDate=today();state.dailyStep=Math.max(1,state.dailyStep);save();startMaths(10,true);return}const nextName=current.trail<TRAILS.length-1?TRAILS[current.trail+1].name:"Every phonics trail";shell(`<div class="screen">${header("Trail complete!","Your phonics forest is growing.")}<div class="panel session-complete"><div class="trophy">🌳✨</div><h2>Beautiful sound work!</h2><p>You completed ${L.items.length} activities, learned every sound in this trail and earned bonus stars.</p><p class="helper">Come back later for extra listening practice. Three successful recognition practices mark a sound as mastered.</p>${current.trail<TRAILS.length-1?`<p><strong>${esc(nextName)}</strong> is now unlocked${unlockedNext?"!":" for more practice."}</p>`:`<p>Every phonics trail is now open. Wonderful work!</p>`}<button class="secondary" data-action="phonics">Choose another trail</button> <button class="ghost" data-action="home">Home</button></div></div>`)}

function audioFile(sound){const f=SOUND_FILE_MAP[sound]||sound;return `${PHONEME_BASE}${f}.m4a`}
function stopAudio(){if(activeAudio){try{activeAudio.pause();activeAudio.currentTime=0}catch{}activeAudio=null}}
async function playSound(sound,repeat=1){stopAudio();const wave=document.querySelector(".sound-wave");wave?.classList.add("playing");try{for(let i=0;i<repeat;i++){await playOne(audioFile(sound),.92);if(i<repeat-1)await wait(220)}}catch(e){toast("The published audio is missing. Open the GitHub Actions run and confirm the deployment completed successfully.")}finally{wave?.classList.remove("playing")}}
function playOne(src,rate=1){return new Promise((resolve,reject)=>{const a=new Audio(src);activeAudio=a;a.preload="auto";a.playbackRate=rate;a.onended=()=>{activeAudio=null;resolve()};a.onerror=()=>{activeAudio=null;reject(new Error("audio"))};const p=a.play();if(p)p.catch(reject)})}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function playWord(word){const w=WORDS.find(x=>x.word===word);if(!w)return;stopAudio();const wave=document.querySelector(".sound-wave");wave?.classList.add("playing");try{for(let i=0;i<w.tokens.length;i++){document.querySelector(`[data-token-index="${i}"]`)?.classList.add("active");await playOne(audioFile(w.tokens[i]),.9);await wait(190);document.querySelector(`[data-token-index="${i}"]`)?.classList.remove("active")}document.getElementById("wordReveal")?.classList.remove("hidden");document.getElementById("blendNext")?.classList.remove("hidden");feedback(`Sweep it together: ${w.word}`,"good")}catch{toast("One of this word's local sound files is missing.")}finally{wave?.classList.remove("playing")}}

function stopSpeech(){if("speechSynthesis" in window)window.speechSynthesis.cancel()}
function getBritishMathVoice(){
 if(!("speechSynthesis" in window))return null;
 const voices=window.speechSynthesis.getVoices();
 if(preferredMathVoice&&voices.includes(preferredMathVoice))return preferredMathVoice;
 const uk=voices.filter(v=>String(v.lang).toLowerCase().startsWith("en-gb"));
 preferredMathVoice=uk.find(v=>/serena|daniel|martha|kate|oliver|susan|siri/i.test(v.name))||uk[0]||voices.find(v=>String(v.lang).toLowerCase().startsWith("en-au"))||voices.find(v=>String(v.lang).toLowerCase().startsWith("en"))||null;
 return preferredMathVoice;
}
function speakMathQuestion(q){
 if(!q||!("speechSynthesis" in window)){toast("Speech is not available on this device.");return}
 stopSpeech();
 const utterance=new SpeechSynthesisUtterance(q.spoken||String(q.prompt).replace(/<[^>]+>/g," "));
 utterance.lang="en-GB";utterance.rate=.82;utterance.pitch=1.03;utterance.volume=1;
 const voice=getBritishMathVoice();if(voice)utterance.voice=voice;
 window.speechSynthesis.speak(utterance);
}
function startMaths(count=30,daily=false){stopSpeech();current.math={questions:Array.from({length:count},()=>makeMathQuestion()),index:0,correct:0,daily,answered:false};renderMath()}
function makeMathQuestion(){const level=state.mathLevel;const domains=Object.keys(state.mathDomains);const weak=[...domains].sort((a,b)=>domainAccuracy(a)-domainAccuracy(b)).slice(0,4);const domain=Math.random()<.6?pick(weak):pick(domains);return generators[domain](level)}
function domainAccuracy(d){const x=state.mathDomains[d];return x.a?x.c/x.a:0}
const generators={
 counting(level){const max=level<2?10:20;const n=rand(1,max);return {domain:"counting",prompt:"How many dots are there?",spoken:"How many dots are there? Count them, then choose the answer.",visual:"● ".repeat(n),answer:n,options:numOptions(n,0,max)}},
 addition(level){const max=level<2?10:20;const a=rand(0,max),b=rand(0,max-a);return {domain:"addition",prompt:`${a} + ${b} = ?`,spoken:`What is ${a} plus ${b}?`,answer:a+b,options:numOptions(a+b,0,max)}},
 subtraction(level){const max=level<2?10:20;const a=rand(1,max),b=rand(0,a);return {domain:"subtraction",prompt:`${a} − ${b} = ?`,spoken:`What is ${a} take away ${b}?`,answer:a-b,options:numOptions(a-b,0,max)}},
 bonds(level){const total=level<2?10:20;const a=rand(0,total);return {domain:"bonds",prompt:`${a} + ? = ${total}`,spoken:`${a} plus what number makes ${total}?`,answer:total-a,options:numOptions(total-a,0,total)}},
 order(level){const max=level<2?15:30,n=rand(2,max-2),type=pick(["before","after","between"]);if(type==="before")return {domain:"order",prompt:`What comes before ${n}?`,spoken:`What number comes before ${n}?`,answer:n-1,options:numOptions(n-1,0,max)};if(type==="after")return {domain:"order",prompt:`What comes after ${n}?`,spoken:`What number comes after ${n}?`,answer:n+1,options:numOptions(n+1,0,max)};return {domain:"order",prompt:`${n-1}, ?, ${n+1}`,spoken:`What number goes between ${n-1} and ${n+1}?`,answer:n,options:numOptions(n,0,max)}},
 patterns(level){const step=level<2?pick([1,2]):pick([2,5,10]),start=rand(0,10),seq=[start,start+step,start+2*step];return {domain:"patterns",prompt:`${seq.join(", ")}, ?`,spoken:`What number comes next in this pattern? ${seq.join(", ")}.`,answer:start+3*step,options:numOptions(start+3*step,0,50)}},
 compare(level){const max=level<2?10:30,a=rand(0,max),b=rand(0,max);return {domain:"compare",prompt:`Which sign makes this true?  ${a}  ?  ${b}`,spoken:`Compare ${a} and ${b}. Is ${a} greater than, less than, or equal to ${b}?`,answer:a>b?">":a<b?"<":"=",options:shuffle([">","<","="])}},
 shapes(){const shape=pick([{n:"circle",e:"●",s:0},{n:"triangle",e:"▲",s:3},{n:"square",e:"■",s:4},{n:"pentagon",e:"⬟",s:5}]);return {domain:"shapes",prompt:`How many sides does a ${shape.n} have?`,spoken:`How many sides does a ${shape.n} have?`,visual:shape.e,answer:shape.s,options:shuffle([0,3,4,5])}},
 measure(level){const a=rand(1,level<2?10:20),b=rand(1,level<2?10:20);return {domain:"measure",prompt:"Which is longer?",spoken:`Which is longer? The ruler is ${a} centimetres. The pencil is ${b} centimetres.`,visual:`📏 ${a} cm     ✏️ ${b} cm`,answer:a>b?`${a} cm`:b>a?`${b} cm`:"same",options:shuffle([...new Set([`${a} cm`,`${b} cm`,"same","cannot tell"])]).slice(0,3)}},
 stories(level){const max=level<2?10:15,a=rand(1,max),add=Math.random()>.5,b=rand(1,add?max-a:a);const prompt=add?`You have ${a} apples and get ${b} more. How many?`:`You have ${a} apples and eat ${b}. How many are left?`;return {domain:"stories",prompt,spoken:prompt,visual:"🍎",answer:add?a+b:a-b,options:numOptions(add?a+b:a-b,0,max)}}
};
function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function numOptions(ans,min,max){const s=new Set([ans]);while(s.size<4){s.add(clamp(ans+pick([-4,-3,-2,-1,1,2,3,4]),min,max))}return shuffle([...s])}
function renderMath(){const M=current.math;if(M.index>=M.questions.length)return finishMath();const q=M.questions[M.index],pct=Math.round(M.index/M.questions.length*100);shell(`<div class="screen">${header("Maths Mountain",`Question ${M.index+1} of ${M.questions.length}`)}<div class="panel"><div class="question-meta"><span class="domain-tag">${q.domain}</span><span>${M.correct} correct</span></div><div class="lesson-progress"><div class="progress-track"><span style="width:${pct}%"></span></div><strong>${pct}%</strong></div><div class="math-read-row"><button class="math-speaker" data-action="read-math" aria-label="Read the question aloud">🔊 <span>Read question</span></button><button class="math-auto ${state.settings.mathsSpeech?"on":""}" data-action="toggle-math-speech">${state.settings.mathsSpeech?"Auto-read on":"Auto-read off"}</button></div><div class="math-prompt">${q.prompt}</div><div class="math-visual">${q.visual||""}</div><div class="answers">${q.options.map(o=>`<button class="answer" data-math-answer="${esc(o)}">${o}</button>`).join("")}</div><div id="feedback" class="feedback"></div></div></div>`);if(state.settings.mathsSpeech)setTimeout(()=>{if(current.math===M&&M.questions[M.index]===q)speakMathQuestion(q)},260)}
function answerMath(btn){stopSpeech();const M=current.math;if(M.answered)return;const q=M.questions[M.index];const val=isNaN(Number(btn.dataset.mathAnswer))?btn.dataset.mathAnswer:Number(btn.dataset.mathAnswer);const good=val===q.answer;state.stats.mathAttempts++;state.mathDomains[q.domain].a++;if(good){M.answered=true;M.correct++;state.stats.mathCorrect++;state.mathDomains[q.domain].c++;addStars(1);btn.classList.add("correct");feedback("Correct! One step higher. +1 star","good");save();setTimeout(()=>{M.index++;M.answered=false;renderMath()},650)}else{btn.classList.add("wrong");feedback("Nearly. Try a different answer.","try");save()}}
function finishMath(){stopSpeech();const M=current.math;const pct=Math.round(M.correct/M.questions.length*100);state.stats.mathSessions++;if(pct>=85)state.mathLevel=clamp(state.mathLevel+1,1,3);if(pct<55)state.mathLevel=clamp(state.mathLevel-1,1,3);addStars(Math.round(M.correct/5));if(M.daily){state.dailyDate=today();state.dailyStep=2;state.stats.dailyCompleted++;}save();shell(`<div class="screen">${header("Mountain complete!","Great effort and steady thinking.")}<div class="panel session-complete"><div class="trophy">${pct>=80?"🏆":"⛰️"}</div><div class="score-ring" style="--score:${pct*3.6}deg"><strong>${pct}%</strong></div><h2>${M.correct} of ${M.questions.length} correct</h2><p>${pct>=80?"Super climbing! Your next questions will gently stretch you.":"Every try builds number confidence. Your next session will practise the right level."}</p><button class="secondary" data-action="maths">New 30-question session</button> <button class="ghost" data-action="home">Home</button></div></div>`)}

function plantStage(){return PLANT_STAGES[state.garden.plantStage]||PLANT_STAGES[0]}
function petStage(){return PET_STAGES[clamp(Math.floor(state.garden.petFeeds/4),0,PET_STAGES.length-1)]}
function waterGarden(){
 if(state.garden.plantStage>=PLANT_STAGES.length-1){toast("This plant is fully grown. Plant a new seed next!");return}
 if(!spendStars(GARDEN_COSTS.water)){toast(`Earn ${GARDEN_COSTS.water-state.stars} more star${GARDEN_COSTS.water-state.stars===1?"":"s"} to water the plant.`);return}
 state.stats.waterings++;state.garden.waterProgress++;
 let message="Splash! The plant had a drink.";
 if(state.garden.waterProgress>=2){state.garden.waterProgress=0;state.garden.plantStage++;message=`It grew into a ${plantStage().name.toLowerCase()}!`;}
 save();renderRewards("water");toast(message);
}
function plantNewSeed(){
 if(state.garden.plantStage<PLANT_STAGES.length-1){toast("Help this plant grow first.");return}
 if(!spendStars(GARDEN_COSTS.newPlant)){toast(`A new seed needs ${GARDEN_COSTS.newPlant} stars.`);return}
 state.garden.blooms++;state.garden.plantStage=0;state.garden.waterProgress=0;save();renderRewards("plant");toast("A new seed is ready to grow!");
}
function feedGardenPet(){
 if(!spendStars(GARDEN_COSTS.feed)){toast(`Earn ${GARDEN_COSTS.feed-state.stars} more star${GARDEN_COSTS.feed-state.stars===1?"":"s"} to feed your friend.`);return}
 const before=petStage().name;state.garden.petFeeds++;state.stats.feedings++;const after=petStage().name;save();renderRewards("feed");toast(before!==after?`Your friend grew into a ${after.toLowerCase()}!`:"Yum! Your garden friend is happy.");
}
function renderRewards(effect=""){current.view="rewards";const plant=plantStage(),pet=petStage();const oldPlants=Array.from({length:Math.min(8,state.garden.blooms)},(_,i)=>`<span class="garden-memory">${["🌷","🌻","🌳","🌼"][i%4]}</span>`).join("");const plantMax=state.garden.plantStage>=PLANT_STAGES.length-1;const waterPct=plantMax?100:state.garden.waterProgress*50;const hearts="💛".repeat(Math.min(5,1+Math.floor(state.garden.petFeeds/2)));shell(`<div class="screen">${header("Reward Garden","Use learning stars to care for a living little world.")}<div class="panel"><div class="play-garden ${effect}"><div class="cloud">☁️</div><div class="sun">☀️</div><div class="garden-memories">${oldPlants}</div><div class="plant-plot"><div class="plant-emoji">${plant.emoji}</div><strong>${plant.name}</strong><div class="mini-progress"><span style="width:${waterPct}%"></span></div><small>${plantMax?"Fully grown!":`${state.garden.waterProgress}/2 drinks to grow`}</small></div><div class="pet-plot"><div class="pet-emoji">${pet.emoji}</div><strong>${pet.name}</strong><div class="pet-hearts">${hearts}</div><small>${state.garden.petFeeds} snacks enjoyed</small></div><div class="garden-ground"></div></div><div class="garden-actions">${plantMax?`<button class="garden-button plant-new" data-action="new-plant" ${state.stars<GARDEN_COSTS.newPlant?"disabled":""}>🌰 Plant new seed <span>⭐ ${GARDEN_COSTS.newPlant}</span></button>`:`<button class="garden-button water" data-action="water-garden" ${state.stars<GARDEN_COSTS.water?"disabled":""}>💧 Water plant <span>⭐ ${GARDEN_COSTS.water}</span></button>`}<button class="garden-button feed" data-action="feed-pet" ${state.stars<GARDEN_COSTS.feed?"disabled":""}>🥕 Feed animal <span>⭐ ${GARDEN_COSTS.feed}</span></button></div><p class="garden-tip">Answer questions to earn stars. Spend them here, while lifetime achievements keep counting every star ever earned.</p><div class="stats-grid" style="margin-top:14px"><div class="stat"><strong>${state.stars}</strong><span>Stars available</span></div><div class="stat"><strong>${state.stats.starsEarned}</strong><span>Stars earned</span></div><div class="stat"><strong>${state.stats.waterings}</strong><span>Waterings</span></div><div class="stat"><strong>${state.stats.feedings}</strong><span>Animal feeds</span></div></div></div><div class="section-heading"><div><h2>Badges</h2><p>Milestones earned through steady practice and garden care.</p></div></div><div class="badge-grid">${BADGES.map(b=>`<div class="badge ${state.badges.includes(b.id)?"":"locked"}"><div class="emoji">${b.emoji}</div><h4>${b.name}</h4><p>${b.desc}</p></div>`).join("")}</div></div>`)}

async function renderParent(){current.view="parent";const audio=await checkAudio();const domains=Object.entries(state.mathDomains).map(([d,x])=>{const p=x.a?Math.round(x.c/x.a*100):0;return `<div class="domain-row"><span>${d}</span><div class="progress-track"><span style="width:${p}%"></span></div><small>${p}%</small></div>`}).join("");shell(`<div class="screen">${header("Parent Dashboard","Progress is stored locally and never sent anywhere.")}<div class="stats-grid"><div class="stat"><strong>${masteredSounds()}</strong><span>Sounds mastered</span></div><div class="stat"><strong>${state.stats.wordsBlended}</strong><span>Words blended</span></div><div class="stat"><strong>${state.stats.mathCorrect}</strong><span>Maths correct</span></div><div class="stat"><strong>${mathsAccuracy()}%</strong><span>Maths accuracy</span></div></div><div class="panel"><h2>Learner settings</h2><div class="settings-row"><label for="childName"><strong>Child's display name</strong></label><input class="text-input" id="childName" maxlength="18" value="${esc(state.name)}"></div><div class="settings-row"><span><strong>Unlock all phonics trails</strong><br><small class="helper">Useful for parent-led review.</small></span><button class="ghost" data-action="unlock-all">Unlock</button></div><div class="settings-row"><span><strong>Read maths questions aloud</strong><br><small class="helper">Uses a clear voice installed on this device.</small></span><button class="ghost" data-action="toggle-math-speech">${state.settings.mathsSpeech?"On":"Off"}</button></div></div><div class="panel"><h2>Local phonics audio</h2><div class="audio-status ${audio.ok?"good":"bad"}">${audio.ok?`✓ ${audio.count}/${EXPECTED_AUDIO.length} phonics files are ready.`:`⚠ ${audio.count}/${EXPECTED_AUDIO.length} files detected. The GitHub Pages deployment did not include the audio. Re-run the GitHub Pages deployment workflow.`}</div><p class="helper">The app never streams phonics audio during lessons. Once deployed, it works offline after the first page load.</p><button class="ghost" data-action="audio-test">Test the “m” sound</button></div><div class="panel"><h2>Maths domains</h2>${domains}</div><div class="panel"><h2>Data controls</h2><div class="settings-row"><span><strong>Export progress</strong><br><small class="helper">Download a JSON backup.</small></span><button class="ghost" data-action="export">Export</button></div><div class="settings-row"><span><strong>Reset all progress</strong><br><small class="helper">This cannot be undone.</small></span><button class="ghost danger" data-action="reset">Reset</button></div></div><div class="panel"><h2>Audio licence</h2><p class="helper">Phonics sound files are adapted from Buzzphonics by Debbie Dann and used under the MIT License. Full attribution is included in THIRD_PARTY_NOTICES.md.</p></div></div>`)}
async function checkAudio(){let count=0;await Promise.all(EXPECTED_AUDIO.map(async f=>{try{const r=await fetch(`${PHONEME_BASE}${f}.m4a`,{method:"HEAD",cache:"no-store"});if(r.ok)count++}catch{}}));return {count,ok:count===EXPECTED_AUDIO.length}}
function daily(){if(state.dailyDate===today()&&state.dailyStep>=2){toast("Today's adventure is already complete — free play is open!");renderHome();return}const i=Math.min(state.unlockedTrail,TRAILS.length-1);startTrail(i,{daily:true})}
function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`brightsteps-progress-${today()}.json`;a.click();URL.revokeObjectURL(a.href)}

function bind(){document.querySelectorAll("[data-action]").forEach(el=>el.addEventListener("click",()=>action(el.dataset.action)));document.querySelectorAll("[data-trail]").forEach(el=>el.addEventListener("click",()=>startTrail(Number(el.dataset.trail))));document.querySelectorAll("[data-play-sound]").forEach(el=>el.addEventListener("click",()=>playSound(el.dataset.playSound,Number(el.dataset.repeat||1))));document.querySelectorAll("[data-play-word]").forEach(el=>el.addEventListener("click",()=>playWord(el.dataset.playWord)));document.querySelectorAll("[data-answer]").forEach(el=>el.addEventListener("click",()=>answerPhonics(el)));document.querySelectorAll("[data-math-answer]").forEach(el=>el.addEventListener("click",()=>answerMath(el)));const n=document.getElementById("childName");if(n)n.addEventListener("change",()=>{state.name=n.value.trim()||"Explorer";save();toast("Name saved")})}
function action(a){if(a==="home"){stopSpeech();return renderHome()}if(a==="back"){stopAudio();stopSpeech();return renderHome()}if(a==="phonics"){stopSpeech();return renderTrails()}if(a==="maths")return startMaths(30,false);if(a==="rewards"){stopSpeech();return renderRewards()}if(a==="parent"){stopSpeech();return renderParent()}if(a==="daily")return daily();if(a==="lesson-next")return nextLesson();if(a==="blend-next"){state.stats.wordsBlended++;addStars(2);save();return nextLesson()}if(a==="read-math")return speakMathQuestion(current.math?.questions[current.math.index]);if(a==="toggle-math-speech"){state.settings.mathsSpeech=!state.settings.mathsSpeech;save();toast(state.settings.mathsSpeech?"Maths auto-read is on":"Maths auto-read is off");return current.view==="parent"?renderParent():renderMath()}if(a==="water-garden")return waterGarden();if(a==="new-plant")return plantNewSeed();if(a==="feed-pet")return feedGardenPet();if(a==="unlock-all"){state.unlockedTrail=TRAILS.length-1;save();toast("All trails unlocked");return renderParent()}if(a==="audio-test")return playSound("m",2);if(a==="export")return exportData();if(a==="reset"&&confirm("Reset every BrightSteps star, badge and progress record?")){stopSpeech();state=defaultState();save();renderHome()}}

window.addEventListener("load",()=>{migrateState();reconcileTrailProgress();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));updateStreak();awardBadges();renderHome();if("speechSynthesis" in window)window.speechSynthesis.onvoiceschanged=()=>{preferredMathVoice=null};if("serviceWorker" in navigator)navigator.serviceWorker.register("./service-worker.js").catch(()=>{})});
