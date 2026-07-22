"use strict";

const APP_VERSION = "3.0.0";
const STORAGE_KEY = "brightsteps-2-progress";
const PHONEME_BASE = "./audio/phonemes/";
const SOUND_FILE_MAP = { k: "c", ck: "c", ff: "f", ll: "l", ss: "s", zz: "z", "oo-long": "ooo" };
const EXPECTED_AUDIO = ["a","ai","air","ar","b","c","ch","d","e","ear","ee","er","f","g","h","i","igh","j","l","m","n","ng","o","oa","oi","oo","ooo","or","ow","p","qu","r","s","sh","t","th","u","ur","ure","v","w","x","y","z"];

const TRAILS = [
  {name:"Woodland Start",emoji:"🌱",sounds:["s","a","t","p"],words:["sat","pat","tap"]},
  {name:"Mushroom Path",emoji:"🍄",sounds:["i","n","m","d"],words:["sit","pin","map","dip"]},
  {name:"Owl Hollow",emoji:"🦉",sounds:["g","o","c","k"],words:["dog","got","cat","cot","kit"]},
  {name:"Rabbit Run",emoji:"🐇",sounds:["ck","e","u","r"],words:["duck","red","run","sun"]},
  {name:"Fox Den",emoji:"🦊",sounds:["h","b","f","ff","l","ll","ss"],words:["bus","bug","hut","fun","log","leg"]},
  {name:"Firefly Bridge",emoji:"✨",sounds:["j","v","w","x","y","z","zz","qu"],words:["jam","van","win","box","yes","zip","quiz"]},
  {name:"Whispering Trees",emoji:"🌳",sounds:["ch","sh","th","ng"],words:["chat","chip","ship","shop","thin","ring"]},
  {name:"Rainbow River",emoji:"🌈",sounds:["ai","ee","igh","oa"],words:["rain","feet","night","boat"]},
  {name:"Moonlit Meadow",emoji:"🌙",sounds:["oo","oo-long","ar","or","ur"],words:["book","moon","star","fork","bird"]},
  {name:"Cloud Castle",emoji:"☁️",sounds:["ow","oi","ear","air","ure","er"],words:["owl","coin","ear","chair","cure"]}
];

const SOUND_META = {
  s:{emoji:"🐍",word:"snake"},a:{emoji:"🍎",word:"apple"},t:{emoji:"🐯",word:"tiger"},p:{emoji:"🐧",word:"penguin"},
  i:{emoji:"🦎",word:"iguana"},n:{emoji:"🪺",word:"nest"},m:{emoji:"🌙",word:"moon"},d:{emoji:"🐶",word:"dog"},
  g:{emoji:"🐐",word:"goat"},o:{emoji:"🐙",word:"octopus"},c:{emoji:"🐈",word:"cat"},k:{emoji:"🪁",word:"kite"},ck:{emoji:"🦆",word:"duck"},
  e:{emoji:"🥚",word:"egg"},u:{emoji:"☂️",word:"umbrella"},r:{emoji:"🐇",word:"rabbit"},h:{emoji:"🎩",word:"hat"},b:{emoji:"⚽",word:"ball"},
  f:{emoji:"🐟",word:"fish"},ff:{emoji:"🦒",word:"giraffe"},l:{emoji:"🦁",word:"lion"},ll:{emoji:"🔔",word:"bell"},ss:{emoji:"👗",word:"dress"},
  j:{emoji:"🫙",word:"jam"},v:{emoji:"🚐",word:"van"},w:{emoji:"🌊",word:"wave"},x:{emoji:"📦",word:"box"},y:{emoji:"🟡",word:"yellow"},z:{emoji:"🦓",word:"zebra"},zz:{emoji:"🐝",word:"buzz"},qu:{emoji:"👑",word:"queen"},
  ch:{emoji:"🧀",word:"cheese"},sh:{emoji:"🚢",word:"ship"},th:{emoji:"👍",word:"thumb"},ng:{emoji:"💍",word:"ring"},
  ai:{emoji:"🌧️",word:"rain"},ee:{emoji:"🐝",word:"bee"},igh:{emoji:"🌙",word:"night"},oa:{emoji:"🛶",word:"boat"},
  oo:{emoji:"📖",word:"book"},"oo-long":{emoji:"🌙",word:"moon"},ar:{emoji:"⭐",word:"star"},or:{emoji:"🍴",word:"fork"},ur:{emoji:"🐦",word:"bird"},
  ow:{emoji:"🦉",word:"owl"},oi:{emoji:"🪙",word:"coin"},ear:{emoji:"👂",word:"ear"},air:{emoji:"🪑",word:"chair"},ure:{emoji:"🧴",word:"cure"},er:{emoji:"🔨",word:"hammer"}
};

const WORDS = [
  {word:"sat",tokens:["s","a","t"],emoji:"🪑"},{word:"pat",tokens:["p","a","t"],emoji:"🖐️"},{word:"tap",tokens:["t","a","p"],emoji:"🚰"},
  {word:"sit",tokens:["s","i","t"],emoji:"🪑"},{word:"pin",tokens:["p","i","n"],emoji:"📌"},{word:"map",tokens:["m","a","p"],emoji:"🗺️"},{word:"dip",tokens:["d","i","p"],emoji:"🥣"},
  {word:"dog",tokens:["d","o","g"],emoji:"🐶"},{word:"got",tokens:["g","o","t"],emoji:"🎁"},{word:"cat",tokens:["c","a","t"],emoji:"🐈"},{word:"cot",tokens:["c","o","t"],emoji:"🛏️"},{word:"kit",tokens:["k","i","t"],emoji:"🧰"},
  {word:"duck",tokens:["d","u","ck"],emoji:"🦆"},{word:"red",tokens:["r","e","d"],emoji:"🔴"},{word:"run",tokens:["r","u","n"],emoji:"🏃"},{word:"sun",tokens:["s","u","n"],emoji:"☀️"},
  {word:"bus",tokens:["b","u","s"],emoji:"🚌"},{word:"bug",tokens:["b","u","g"],emoji:"🐞"},{word:"hut",tokens:["h","u","t"],emoji:"🛖"},{word:"fun",tokens:["f","u","n"],emoji:"🎉"},{word:"log",tokens:["l","o","g"],emoji:"🪵"},{word:"leg",tokens:["l","e","g"],emoji:"🦵"},
  {word:"jam",tokens:["j","a","m"],emoji:"🫙"},{word:"van",tokens:["v","a","n"],emoji:"🚐"},{word:"win",tokens:["w","i","n"],emoji:"🏆"},{word:"box",tokens:["b","o","x"],emoji:"📦"},{word:"yes",tokens:["y","e","s"],emoji:"✅"},{word:"zip",tokens:["z","i","p"],emoji:"🤐"},{word:"quiz",tokens:["qu","i","z"],emoji:"❓"},
  {word:"ship",tokens:["sh","i","p"],emoji:"🚢"},{word:"shop",tokens:["sh","o","p"],emoji:"🏪"},{word:"chat",tokens:["ch","a","t"],emoji:"💬"},{word:"chip",tokens:["ch","i","p"],emoji:"🍟"},{word:"thin",tokens:["th","i","n"],emoji:"📏"},{word:"ring",tokens:["r","i","ng"],emoji:"💍"},
  {word:"rain",tokens:["r","ai","n"],emoji:"🌧️"},{word:"feet",tokens:["f","ee","t"],emoji:"🦶"},{word:"night",tokens:["n","igh","t"],emoji:"🌙"},{word:"boat",tokens:["b","oa","t"],emoji:"🛶"},
  {word:"book",tokens:["b","oo","k"],emoji:"📖"},{word:"moon",tokens:["m","oo-long","n"],emoji:"🌙"},{word:"star",tokens:["s","t","ar"],emoji:"⭐"},{word:"fork",tokens:["f","or","k"],emoji:"🍴"},{word:"bird",tokens:["b","ur","d"],emoji:"🐦"},
  {word:"owl",tokens:["ow","l"],emoji:"🦉"},{word:"coin",tokens:["c","oi","n"],emoji:"🪙"},{word:"ear",tokens:["ear"],emoji:"👂"},{word:"chair",tokens:["ch","air"],emoji:"🪑"},{word:"cure",tokens:["c","ure"],emoji:"🧴"}
];

const STORIES = [
  {title:"Tap, Tap, Tap",emoji:"🚰",unlock:0,lines:["Pat sat.","Tap, tap, tap.","Pat sat and tapped."]},
  {title:"Sam and Dad",emoji:"👨‍👧",unlock:1,lines:["Sam sat.","Dad sat.","Sam and Dad sat."]},
  {title:"The Cat and Dog",emoji:"🐈",unlock:2,lines:["A cat sat on a cot.","A dog got a hat.","The cat and dog sat."]},
  {title:"The Red Duck",emoji:"🦆",unlock:3,lines:["The red duck can run.","The sun is up.","Run, duck, run!"]},
  {title:"The Fox in a Box",emoji:"🦊",unlock:5,lines:["The fox is in a box.","The van can zip.","Yes! The fox can win."]},
  {title:"The Ship Shop",emoji:"🚢",unlock:6,lines:["The ship is at the shop.","The ring is thin.","Chip can chat."]}
];

const PLANTS = {
  daisy:{name:"Daisy",cost:4,stages:["🫘","🌱","🌿","🌼"],colour:"yellow"},
  sunflower:{name:"Sunflower",cost:6,stages:["🫘","🌱","🌿","🌻"],colour:"orange"},
  apple:{name:"Apple tree",cost:10,stages:["🫘","🌱","🪴","🌳"],colour:"green"},
  blossom:{name:"Blossom tree",cost:12,stages:["🫘","🌱","🌿","🌸"],colour:"pink"},
  cactus:{name:"Cactus",cost:8,stages:["🫘","🌱","🌵","🌵"],colour:"teal"}
};
const ANIMALS = {
  robin:{name:"Robin",emoji:"🐦",cost:0,food:"🍓"},
  rabbit:{name:"Rabbit",emoji:"🐰",cost:14,food:"🥕"},
  duck:{name:"Duck",emoji:"🦆",cost:18,food:"🌽"},
  hedgehog:{name:"Hedgehog",emoji:"🦔",cost:22,food:"🍎"}
};
const GARDEN_COSTS = {water:3,feed:2};

const BADGES = [
  {id:"first-trail",emoji:"🌱",name:"Forest Starter",test:s=>s.completedTrails.length>=1},
  {id:"five-trails",emoji:"🗺️",name:"Trail Explorer",test:s=>s.completedTrails.length>=5},
  {id:"word-blender",emoji:"🧩",name:"Word Blender",test:s=>s.stats.wordsBlended>=15},
  {id:"maths-climber",emoji:"⛰️",name:"Maths Climber",test:s=>s.stats.mathSessions>=1},
  {id:"green-thumb",emoji:"🌻",name:"Green Thumb",test:s=>s.garden.plants.length>=3},
  {id:"animal-friend",emoji:"🐾",name:"Animal Friend",test:s=>s.stats.feedings>=10}
];

function defaultState(){
  return {
    name:"Explorer",stars:0,streak:0,lastPlay:null,phonics:{},completedTrails:[],unlockedTrail:0,
    mathLevel:1,badges:[],settings:{readAloud:true,voiceName:""},
    garden:{activePlant:{type:"daisy",stage:0},plants:[],animals:[{type:"robin",happiness:0}],selectedAnimal:"robin"},
    stats:{phonicsCorrect:0,phonicsAttempts:0,wordsBlended:0,mathCorrect:0,mathAttempts:0,mathSessions:0,starsEarned:0,starsSpent:0,waterings:0,feedings:0,storiesRead:0},
    mathDomains:{counting:{c:0,a:0},addition:{c:0,a:0},subtraction:{c:0,a:0},bonds:{c:0,a:0},order:{c:0,a:0},patterns:{c:0,a:0},compare:{c:0,a:0},shapes:{c:0,a:0},measure:{c:0,a:0},stories:{c:0,a:0}}
  };
}

let state = loadState();
let current = {view:"home",trail:0,lesson:null,math:null,story:null};
let activeAudio = null;
let preferredVoice = null;
migrateState();

function loadState(){
  try{return merge(defaultState(),JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}"));}
  catch{return defaultState();}
}
function merge(base,extra){
  for(const [key,value] of Object.entries(extra||{})){
    if(value&&typeof value==="object"&&!Array.isArray(value)&&base[key]&&typeof base[key]==="object"&&!Array.isArray(base[key])) merge(base[key],value);
    else base[key]=value;
  }
  return base;
}
function migrateState(){
  state.settings=merge({readAloud:true,voiceName:""},state.settings||{});
  if(typeof state.settings.mathsSpeech==="boolean"&&typeof state.settings.readAloud!=="boolean") state.settings.readAloud=state.settings.mathsSpeech;
  if(typeof state.settings.readAloud!=="boolean") state.settings.readAloud=true;
  state.stats=merge(defaultState().stats,state.stats||{});
  state.mathDomains=merge(defaultState().mathDomains,state.mathDomains||{});
  state.completedTrails=Array.isArray(state.completedTrails)?state.completedTrails:[];
  state.phonics=state.phonics||{};
  state.badges=Array.isArray(state.badges)?state.badges:[];

  const oldGarden=state.garden||{};
  if(!Array.isArray(oldGarden.plants)){
    const completed=Math.max(0,Number(oldGarden.blooms)||0)+(Number(oldGarden.plantStage)>=5?1:0);
    const legacyTypes=["daisy","sunflower","apple","blossom"];
    oldGarden.plants=Array.from({length:completed},(_,i)=>({id:`legacy-${i}-${Date.now()}`,type:legacyTypes[i%legacyTypes.length]}));
    oldGarden.activePlant=Number(oldGarden.plantStage)>=5?null:{type:"daisy",stage:clamp(Math.round((Number(oldGarden.plantStage)||0)/5*3),0,2)};
  }
  if(!Array.isArray(oldGarden.animals)) oldGarden.animals=[{type:"robin",happiness:clamp(Math.floor((Number(oldGarden.petFeeds)||0)/2),0,5)}];
  oldGarden.selectedAnimal=oldGarden.selectedAnimal||oldGarden.animals[0]?.type||"robin";
  if(oldGarden.activePlant&&(!PLANTS[oldGarden.activePlant.type]||!Number.isFinite(Number(oldGarden.activePlant.stage)))) oldGarden.activePlant={type:"daisy",stage:0};
  oldGarden.plants=oldGarden.plants.filter(item=>item&&PLANTS[item.type]);
  oldGarden.animals=oldGarden.animals.filter(item=>item&&ANIMALS[item.type]).map(item=>({...item,happiness:clamp(Number(item.happiness)||0,0,5)}));
  if(!oldGarden.animals.length) oldGarden.animals=[{type:"robin",happiness:0}];
  state.garden=oldGarden;

  state.stats.starsEarned=Math.max(Number(state.stats.starsEarned)||0,Number(state.stars)||0);
  reconcileTrailProgress();
  saveRaw();
}
function reconcileTrailProgress(){
  const repaired=[];
  TRAILS.forEach((trail,index)=>{
    if(trail.sounds.every(sound=>(state.phonics[sound]||0)>=1)) repaired.push(index);
  });
  state.completedTrails=[...new Set([...state.completedTrails,...repaired])].filter(i=>Number.isInteger(i)&&i>=0&&i<TRAILS.length).sort((a,b)=>a-b);
  let unlocked=clamp(Number(state.unlockedTrail)||0,0,TRAILS.length-1);
  for(const index of state.completedTrails) if(index<TRAILS.length-1) unlocked=Math.max(unlocked,index+1);
  state.unlockedTrail=unlocked;
}
function saveRaw(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function save(){reconcileTrailProgress();awardBadges();saveRaw();}
function addStars(amount){const n=Math.max(0,Number(amount)||0);state.stars+=n;state.stats.starsEarned+=n;}
function spendStars(amount){const n=Math.max(0,Number(amount)||0);if(state.stars<n)return false;state.stars-=n;state.stats.starsSpent+=n;return true;}
function today(){return new Date().toISOString().slice(0,10);}
function updateStreak(){
  const t=today();if(state.lastPlay===t)return;
  const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
  state.streak=state.lastPlay===yesterday.toISOString().slice(0,10)?state.streak+1:1;
  state.lastPlay=t;saveRaw();
}
function awardBadges(){
  for(const badge of BADGES){
    if(!state.badges.includes(badge.id)&&badge.test(state)){
      state.badges.push(badge.id);
      setTimeout(()=>toast(`Badge earned: ${badge.name} ${badge.emoji}`),50);
    }
  }
}

const app=()=>document.getElementById("app");
function shell(html){app().innerHTML=html;bind();}
function esc(value){return String(value).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));}
function shuffle(items){const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
function pick(items){return items[Math.floor(Math.random()*items.length)];}
function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
function rand(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600);}
function progressBar(value,label=""){return `<div class="progress-wrap" aria-label="${esc(label)}"><div class="progress-track"><span style="width:${clamp(value,0,100)}%"></span></div>${label?`<small>${esc(label)}</small>`:""}</div>`;}
function topBar(){return `<header class="topbar"><button class="brand" data-action="home" aria-label="Home"><span class="brand-mark">🌟</span><span>BrightSteps</span></button><div class="status-row"><span class="status-pill" title="Learning streak">🔥 <b>${state.streak}</b></span><span class="status-pill" title="Stars available">⭐ <b>${state.stars}</b></span></div></header>`;}
function screenHeader(title,subtitle,back="home"){return `<div class="screen-head"><button class="round-button" data-action="${back}" aria-label="Back">←</button><div><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div><span class="mini-stars">⭐ ${state.stars}</span></div>`;}
function bottomNav(active="home"){return `<nav class="bottom-nav" aria-label="Main navigation"><button data-action="home" class="${active==="home"?"active":""}"><span>🏠</span>Home</button><button data-action="phonics" class="${active==="phonics"?"active":""}"><span>🌳</span>Phonics</button><button data-action="maths-menu" class="${active==="maths"?"active":""}"><span>⛰️</span>Maths</button><button data-action="garden" class="${active==="garden"?"active":""}"><span>🌼</span>Garden</button></nav>`;}

function phonicsProgress(){return Math.round(state.completedTrails.length/TRAILS.length*100);}
function mathsAccuracy(){return state.stats.mathAttempts?Math.round(state.stats.mathCorrect/state.stats.mathAttempts*100):0;}
function nextTrailIndex(){for(let i=0;i<TRAILS.length;i++)if(!state.completedTrails.includes(i)&&i<=state.unlockedTrail)return i;return Math.min(state.unlockedTrail,TRAILS.length-1);}

function renderHome(){
  current.view="home";updateStreak();save();
  const next=TRAILS[nextTrailIndex()];
  shell(`<div class="screen home-screen">${topBar()}
    <section class="welcome-card">
      <div><span class="eyebrow">Continue your adventure</span><h1>Hello, ${esc(state.name)}!</h1><p>Follow the next forest path, climb the mountain, then use your stars in the garden.</p><button class="cta white" data-action="continue-learning">Continue with ${esc(next.name)} <span>→</span></button></div>
      <div class="welcome-world"><span class="fox">🦊</span><span class="tree">🌳</span><span class="sparkle">✨</span></div>
    </section>
    <div class="section-title"><div><h2>Choose a place</h2><p>Every activity is made for tapping, listening and playing.</p></div></div>
    <section class="adventure-grid">
      <button class="adventure-card forest" data-action="phonics"><span class="scene">🌲🦉🌲</span><span class="tag">Reading</span><h3>Phonics Forest</h3><p>Hear sounds, learn whole words and blend them together.</p>${progressBar(phonicsProgress(),`${state.completedTrails.length}/${TRAILS.length} trails`)}</button>
      <button class="adventure-card mountain" data-action="maths-menu"><span class="scene">☁️⛰️☁️</span><span class="tag">Numbers</span><h3>Maths Mountain</h3><p>Listen to questions and solve them with pictures and hints.</p>${progressBar(mathsAccuracy(),state.stats.mathAttempts?`${mathsAccuracy()}% correct`:"Ready to climb")}</button>
      <button class="adventure-card garden" data-action="garden"><span class="scene">🌼🐰🌳</span><span class="tag">Create</span><h3>My Garden</h3><p>Grow permanent plants, unlock animals and care for your world.</p><div class="card-stat"><b>${state.garden.plants.length}</b> plants · <b>${state.garden.animals.length}</b> animals</div></button>
      <button class="adventure-card stories" data-action="stories"><span class="scene">📚🏡✨</span><span class="tag">Read together</span><h3>Story House</h3><p>Open short stories and hear every sentence read aloud.</p><div class="card-stat"><b>${STORIES.filter(s=>state.completedTrails.some(t=>t>=s.unlock)).length}</b> stories open</div></button>
    </section>
    <button class="parent-link" data-action="parent">⚙️ Parent Corner</button>
    ${bottomNav("home")}
  </div>`);
}

function renderTrails(){
  current.view="trails";reconcileTrailProgress();
  const trailCards=TRAILS.map((trail,index)=>{
    const unlocked=index<=state.unlockedTrail;
    const complete=state.completedTrails.includes(index);
    const practised=trail.sounds.filter(s=>(state.phonics[s]||0)>0).length;
    return `<button class="trail-card ${unlocked?"":"locked"} ${complete?"complete":""}" data-trail="${index}" ${unlocked?"":"disabled"}>
      <span class="trail-icon">${trail.emoji}</span><span class="trail-step">${complete?"✓":index+1}</span>
      <h3>${esc(trail.name)}</h3><div class="sound-row">${trail.sounds.map(s=>`<span>${esc(s)}</span>`).join("")}</div>
      <p>${complete?"Trail completed · replay any time":`${practised}/${trail.sounds.length} sounds practised`}</p>${unlocked?"":"<span class='lock-badge'>🔒</span>"}
    </button>`;
  }).join("");
  shell(`<div class="screen">${screenHeader("Phonics Forest","Choose a path and learn through listening, words and blending.")}
    <div class="forest-banner"><span>🦊</span><div><strong>${state.completedTrails.length} paths completed</strong><p>The next path opens as soon as the current one is finished.</p></div></div>
    <section class="trail-grid">${trailCards}</section>${bottomNav("phonics")}</div>`);
}

function startTrail(index){
  const trail=TRAILS[index];
  const steps=[];
  for(const sound of trail.sounds){steps.push({type:"introduce",sound});steps.push({type:"recognise",sound});}
  const words=trail.words.map(name=>WORDS.find(w=>w.word===name)).filter(Boolean);
  for(const word of words.slice(0,4)){steps.push({type:"blend",word});steps.push({type:"meaning",word});}
  current.trail=index;
  current.lesson={steps,index:0,correct:0,answered:false};
  renderLesson();
}
function renderLesson(){
  const lesson=current.lesson;if(!lesson||lesson.index>=lesson.steps.length)return finishTrail();
  current.view="lesson";
  const step=lesson.steps[lesson.index];
  const pct=Math.round((lesson.index/lesson.steps.length)*100);
  let content="";
  if(step.type==="introduce")content=renderSoundIntro(step.sound);
  if(step.type==="recognise")content=renderSoundChoice(step.sound);
  if(step.type==="blend")content=renderBlend(step.word);
  if(step.type==="meaning")content=renderMeaning(step.word);
  shell(`<div class="screen lesson-screen">${screenHeader(TRAILS[current.trail].name,`Activity ${lesson.index+1} of ${lesson.steps.length}`,"phonics")}
    <div class="lesson-progress">${progressBar(pct,`${pct}%`)}</div>
    <section class="lesson-stage">${content}</section>
  </div>`);
}
function renderSoundIntro(sound){
  const meta=SOUND_META[sound];
  return `<div class="guide-row"><span class="guide-avatar">🦉</span><div class="speech-bubble">Meet a new sound</div></div>
    <div class="sound-hero"><div class="grapheme">${esc(sound)}</div><button class="word-picture" data-speak="${esc(meta.word)}" aria-label="Hear ${esc(meta.word)}"><span>${meta.emoji}</span><strong>${esc(meta.word)}</strong><small>Tap to hear the word</small></button></div>
    <div class="dual-actions"><button class="cta purple" data-play-sound="${esc(sound)}" data-repeat="2">🔊 Hear sound twice</button><button class="cta soft" data-speak="${esc(meta.word)}">▶ Hear “${esc(meta.word)}”</button></div>
    <p class="child-prompt">Listen, say the sound, then say the whole word.</p>
    <button class="cta green wide" data-action="lesson-next">I’m ready <span>→</span></button>`;
}
function renderSoundChoice(target){
  const pool=shuffle(Object.keys(SOUND_META).filter(s=>s!==target)).slice(0,3);
  const options=shuffle([target,...pool]);
  return `<div class="guide-row"><span class="guide-avatar">🦊</span><div class="speech-bubble">Which letters make the sound?</div></div>
    <div class="listen-orb">👂</div><button class="cta purple" data-play-sound="${esc(target)}" data-repeat="2">🔊 Play the sound</button>
    <div class="choice-grid sound-choice">${options.map(value=>`<button class="choice-button" data-phonics-answer="${esc(value)}" data-correct="${esc(target)}">${esc(value)}</button>`).join("")}</div>
    <div id="feedback" class="feedback" aria-live="assertive"></div>`;
}
function renderBlend(word){
  return `<div class="guide-row"><span class="guide-avatar">🐿️</span><div class="speech-bubble">Sound it out, then hear the whole word</div></div>
    <div class="meaning-picture">${word.emoji}</div>
    <div class="blend-chips">${word.tokens.map((token,index)=>`<span data-token-index="${index}">${esc(token)}</span>`).join("<i>+</i>")}</div>
    <div class="dual-actions"><button class="cta purple" data-blend-word="${esc(word.word)}">🔊 Sound it out</button><button class="cta soft" data-speak="${esc(word.word)}">▶ Hear whole word</button></div>
    <div id="wordReveal" class="whole-word hidden">${esc(word.word)}</div>
    <p class="child-prompt">The picture shows <strong>${esc(word.word)}</strong>.</p>
    <div id="feedback" class="feedback" aria-live="assertive"></div>
    <button class="cta green wide hidden" id="blendNext" data-action="blend-next">Next activity <span>→</span></button>`;
}
function renderMeaning(word){
  const distractors=shuffle(WORDS.filter(w=>w.word!==word.word&&w.emoji!==word.emoji)).slice(0,2);
  const options=shuffle([word,...distractors]);
  return `<div class="guide-row"><span class="guide-avatar">🐰</span><div class="speech-bubble">Which picture matches the word?</div></div>
    <button class="word-listen" data-speak="${esc(word.word)}">🔊 ${esc(word.word)}</button>
    <div class="picture-grid">${options.map(option=>`<button class="picture-choice" data-meaning-answer="${esc(option.word)}" data-correct="${esc(word.word)}"><span>${option.emoji}</span><small>${esc(option.word)}</small></button>`).join("")}</div>
    <div id="feedback" class="feedback" aria-live="assertive"></div>`;
}
function nextLesson(){current.lesson.index++;current.lesson.answered=false;renderLesson();}
function answerPhonics(button,kind){
  if(current.lesson.answered)return;
  const answer=kind==="meaning"?button.dataset.meaningAnswer:button.dataset.phonicsAnswer;
  const correct=button.dataset.correct;
  const good=answer===correct;
  state.stats.phonicsAttempts++;
  if(good){
    current.lesson.answered=true;current.lesson.correct++;state.stats.phonicsCorrect++;addStars(kind==="meaning"?1:2);
    if(kind!=="meaning")state.phonics[correct]=clamp((state.phonics[correct]||0)+1,0,3);
    button.classList.add("correct");feedback(`Great listening! +${kind==="meaning"?1:2} star${kind==="meaning"?"":"s"} ⭐`,"good");save();
    setTimeout(nextLesson,900);
  }else{
    button.classList.add("wrong");button.disabled=true;feedback("Good try. Listen again and choose another one.","try");save();
  }
}
function feedback(text,kind){const el=document.getElementById("feedback");if(el){el.textContent=text;el.className=`feedback ${kind}`;}}
function finishTrail(){
  const trail=TRAILS[current.trail];
  for(const sound of trail.sounds)state.phonics[sound]=Math.max(1,state.phonics[sound]||0);
  if(!state.completedTrails.includes(current.trail))state.completedTrails.push(current.trail);
  if(current.trail<TRAILS.length-1)state.unlockedTrail=Math.max(state.unlockedTrail,current.trail+1);
  addStars(5);save();
  const next=current.trail<TRAILS.length-1?TRAILS[current.trail+1]:null;
  shell(`<div class="screen celebration-screen">${screenHeader("Trail complete!","Your forest has opened another path.","phonics")}
    <section class="celebration-card"><div class="celebration-art">🌳✨🦊</div><h2>${esc(trail.name)} completed</h2><p>You listened to sounds, heard whole words and blended words together.</p><div class="reward-burst">+5 ⭐</div>${next?`<div class="unlock-card"><span>${next.emoji}</span><div><small>New path open</small><strong>${esc(next.name)}</strong></div></div>`:"<div class='unlock-card'><span>🏆</span><div><small>All paths open</small><strong>Forest explorer</strong></div></div>"}
    <button class="cta green wide" data-action="phonics">Choose a path</button><button class="text-button" data-action="home">Back home</button></section>
  </div>`);
}

function audioFile(sound){return `${PHONEME_BASE}${SOUND_FILE_MAP[sound]||sound}.m4a`;}
function stopAudio(){if(activeAudio){try{activeAudio.pause();activeAudio.currentTime=0;}catch{}activeAudio=null;}}
function playOne(src,rate=1){return new Promise((resolve,reject)=>{const audio=new Audio(src);activeAudio=audio;audio.preload="auto";audio.playbackRate=rate;audio.onended=()=>{activeAudio=null;resolve();};audio.onerror=()=>{activeAudio=null;reject(new Error("audio"));};const p=audio.play();if(p)p.catch(reject);});}
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function playSound(sound,repeat=1){
  stopAudio();
  try{for(let i=0;i<repeat;i++){await playOne(audioFile(sound),.94);if(i<repeat-1)await wait(220);}}
  catch{toast("The phonics file is not available in the published app.");}
}
async function playBlend(wordName){
  const word=WORDS.find(item=>item.word===wordName);if(!word)return;
  stopSpeech();stopAudio();
  try{
    for(let i=0;i<word.tokens.length;i++){
      const chip=document.querySelector(`[data-token-index="${i}"]`);chip?.classList.add("active");
      await playOne(audioFile(word.tokens[i]),.9);await wait(170);chip?.classList.remove("active");
    }
    document.getElementById("wordReveal")?.classList.remove("hidden");
    await wait(120);speakText(word.word,{rate:.72});
    document.getElementById("blendNext")?.classList.remove("hidden");
    feedback(`Now say the whole word: ${word.word}`,"good");
  }catch{toast("One of the local sound files is missing.");}
}

function stopSpeech(){if("speechSynthesis" in window)window.speechSynthesis.cancel();}
function loadVoice(){
  if(!("speechSynthesis" in window))return null;
  const voices=window.speechSynthesis.getVoices();
  if(preferredVoice&&voices.includes(preferredVoice))return preferredVoice;
  if(state.settings.voiceName){preferredVoice=voices.find(v=>v.name===state.settings.voiceName)||null;}
  if(!preferredVoice){
    const english=voices.filter(v=>String(v.lang).toLowerCase().startsWith("en"));
    preferredVoice=english.find(v=>String(v.lang).toLowerCase().startsWith("en-gb")&&/serena|martha|kate|susan|daniel|oliver|siri/i.test(v.name))
      ||english.find(v=>String(v.lang).toLowerCase().startsWith("en-gb"))
      ||english.find(v=>String(v.lang).toLowerCase().startsWith("en-au"))
      ||english[0]||null;
    if(preferredVoice){state.settings.voiceName=preferredVoice.name;saveRaw();}
  }
  return preferredVoice;
}
function speakText(text,{rate=.8,onend=null}={}){
  if(!text||!("speechSynthesis" in window)){toast("Read-aloud is not available on this device.");return;}
  stopSpeech();const utterance=new SpeechSynthesisUtterance(String(text));const voice=loadVoice();
  if(voice)utterance.voice=voice;utterance.lang=voice?.lang||"en-GB";utterance.rate=rate;utterance.pitch=1.02;utterance.volume=1;
  if(onend)utterance.onend=onend;window.speechSynthesis.speak(utterance);
}
if("speechSynthesis" in window){speechSynthesis.onvoiceschanged=()=>loadVoice();setTimeout(loadVoice,100);}

function renderMathMenu(){
  current.view="math-menu";
  shell(`<div class="screen">${screenHeader("Maths Mountain","Choose a short climb or a full session.")}
    <section class="math-menu-hero"><div><span>🦉</span><h2>Ready to climb?</h2><p>Every question can be read aloud. Pictures and gentle hints help along the way.</p></div></section>
    <div class="session-grid"><button class="session-card quick" data-start-math="10"><span>🥾</span><div><small>About 5 minutes</small><h3>Quick Climb</h3><p>10 mixed questions</p></div></button><button class="session-card full" data-start-math="30"><span>🏔️</span><div><small>About 15 minutes</small><h3>Mountain Adventure</h3><p>30 mixed questions</p></div></button></div>
    <section class="mini-stats"><div><strong>${state.stats.mathCorrect}</strong><span>Correct answers</span></div><div><strong>${mathsAccuracy()}%</strong><span>Overall accuracy</span></div><div><strong>${state.stats.mathSessions}</strong><span>Climbs finished</span></div></section>${bottomNav("maths")}
  </div>`);
}
function startMaths(count=30){
  const domains=shuffle(Object.keys(state.mathDomains));const questions=domains.slice(0,Math.min(count,domains.length)).map(makeMathQuestionFor);
  while(questions.length<count)questions.push(makeMathQuestion());
  current.math={questions:shuffle(questions),index:0,correct:0,answered:false,wrongAttempts:0};renderMath();
}
function domainAccuracy(domain){const stats=state.mathDomains[domain];return stats.a?stats.c/stats.a:0;}
function sameAnswer(a,b){return String(a)===String(b);}
function uniqueOptions(values){const result=[];for(const value of values)if(!result.some(item=>sameAnswer(item,value)))result.push(value);return result;}
function validateMathQuestion(question){
  if(!question||!question.domain||!question.prompt||question.answer===undefined||!Array.isArray(question.options))return false;
  question.options=uniqueOptions(question.options);
  if(!question.options.some(option=>sameAnswer(option,question.answer)))question.options.unshift(question.answer);
  question.options=shuffle(uniqueOptions(question.options)).slice(0,4);
  if(!question.options.some(option=>sameAnswer(option,question.answer))){question.options[question.options.length-1]=question.answer;question.options=shuffle(uniqueOptions(question.options));}
  return question.options.length>=2&&question.options.some(option=>sameAnswer(option,question.answer));
}
function makeMathQuestionFor(domain){const q=generators[domain](state.mathLevel);return validateMathQuestion(q)?q:fallbackQuestion();}
function makeMathQuestion(){
  const domains=Object.keys(state.mathDomains);const weak=[...domains].sort((a,b)=>domainAccuracy(a)-domainAccuracy(b)).slice(0,4);
  for(let i=0;i<12;i++){const domain=Math.random()<.6?pick(weak):pick(domains);const q=generators[domain](state.mathLevel);if(validateMathQuestion(q))return q;}
  return fallbackQuestion();
}
function fallbackQuestion(){return {domain:"counting",prompt:"How many stars can you see?",spoken:"How many stars can you see?",visual:makeDotGrid(3,"⭐"),answer:3,options:[2,3,4]};}
function domainLabel(domain){return ({counting:"Counting",addition:"Addition",subtraction:"Subtraction",bonds:"Number bonds",order:"Number order",patterns:"Patterns",compare:"Comparing",shapes:"Shapes",measure:"Measurement",stories:"Story problem"})[domain]||domain;}
function makeDotGrid(n,symbol="●"){return `<div class="counting-grid" aria-label="${n} items">${Array.from({length:n},()=>`<span>${symbol}</span>`).join("")}</div>`;}
function numberOptions(answer,min,max){const values=[answer];for(const offset of shuffle([-5,-4,-3,-2,-1,1,2,3,4,5])){const value=clamp(answer+offset,min,max);if(!values.includes(value))values.push(value);if(values.length===4)break;}return shuffle(values);}
function measureVisual(left,right){const max=Math.max(left.value,right.value,1);const row=item=>`<div class="measure-item"><div class="measure-label"><span>${item.emoji}</span><strong>${esc(item.name)}</strong><b>${item.value} cm</b></div><div class="measure-track"><span style="width:${Math.max(12,Math.round(item.value/max*100))}%"></span></div></div>`;return `<div class="measure-scene">${row(left)}${row(right)}</div>`;}
const generators={
  counting(level){const max=level<2?10:20,n=rand(1,max);return {domain:"counting",prompt:"How many can you see?",spoken:"How many dots can you see? Count them, then choose the answer.",visual:makeDotGrid(n),answer:n,options:numberOptions(n,0,max)};},
  addition(level){const max=level<2?10:20,a=rand(0,max),b=rand(0,max-a),answer=a+b;return {domain:"addition",prompt:`${a} + ${b} = ?`,spoken:`What is ${a} plus ${b}?`,visual:`<div class="counter-groups">${makeDotGrid(a,"●")}<b>+</b>${makeDotGrid(b,"●")}</div>`,answer,options:numberOptions(answer,0,max)};},
  subtraction(level){const max=level<2?10:20,a=rand(1,max),b=rand(0,a),answer=a-b;return {domain:"subtraction",prompt:`${a} − ${b} = ?`,spoken:`What is ${a} take away ${b}?`,visual:`<div class="take-away"><span>${"🍎".repeat(Math.min(a,10))}</span><small>Take away ${b}</small></div>`,answer,options:numberOptions(answer,0,max)};},
  bonds(level){const total=level<2?10:20,a=rand(0,total),answer=total-a;return {domain:"bonds",prompt:`${a} + ? = ${total}`,spoken:`${a} plus what number makes ${total}?`,visual:`<div class="equation-cards"><span>${a}</span><b>+</b><span>?</span><b>=</b><span>${total}</span></div>`,answer,options:numberOptions(answer,0,total)};},
  order(level){const max=level<2?15:30,n=rand(2,max-2),type=pick(["before","after","between"]);if(type==="before")return {domain:"order",prompt:`What comes before ${n}?`,spoken:`What number comes before ${n}?`,visual:`<div class="number-path"><span>?</span><i>→</i><span>${n}</span></div>`,answer:n-1,options:numberOptions(n-1,0,max)};if(type==="after")return {domain:"order",prompt:`What comes after ${n}?`,spoken:`What number comes after ${n}?`,visual:`<div class="number-path"><span>${n}</span><i>→</i><span>?</span></div>`,answer:n+1,options:numberOptions(n+1,0,max)};return {domain:"order",prompt:`${n-1}, ?, ${n+1}`,spoken:`What number goes between ${n-1} and ${n+1}?`,visual:`<div class="number-path"><span>${n-1}</span><i>→</i><span>?</span><i>→</i><span>${n+1}</span></div>`,answer:n,options:numberOptions(n,0,max)};},
  patterns(level){const step=level<2?pick([1,2]):pick([2,5,10]),start=rand(0,10),sequence=[start,start+step,start+step*2],answer=start+step*3;return {domain:"patterns",prompt:`${sequence.join(", ")}, ?`,spoken:`What number comes next? ${sequence.join(", ")}.`,visual:`<div class="number-path">${sequence.map(x=>`<span>${x}</span>`).join("<i>→</i>")}<i>→</i><span>?</span></div>`,answer,options:numberOptions(answer,0,50)};},
  compare(level){const max=level<2?10:30,a=rand(0,max),b=rand(0,max),answer=a>b?">":a<b?"<":"=";return {domain:"compare",prompt:`Compare ${a} and ${b}`,spoken:`Is ${a} greater than, less than, or equal to ${b}?`,visual:`<div class="compare-cards"><span>${a}</span><b>?</b><span>${b}</span></div>`,answer,options:[">","<","="]};},
  shapes(){const shape=pick([{name:"circle",emoji:"●",sides:0},{name:"triangle",emoji:"▲",sides:3},{name:"square",emoji:"■",sides:4},{name:"pentagon",emoji:"⬟",sides:5}]);return {domain:"shapes",prompt:`How many sides does a ${shape.name} have?`,spoken:`How many sides does a ${shape.name} have?`,visual:`<div class="shape-card">${shape.emoji}<small>${shape.name}</small></div>`,answer:shape.sides,options:[0,3,4,5]};},
  measure(level){const pairs=[[{name:"ruler",emoji:"📏"},{name:"pencil",emoji:"✏️"}],[{name:"ribbon",emoji:"🎀"},{name:"crayon",emoji:"🖍️"}],[{name:"rope",emoji:"🪢"},{name:"brush",emoji:"🖌️"}]];const [leftBase,rightBase]=pick(pairs),max=level<2?10:20,same=Math.random()<.18;const left={...leftBase,value:rand(2,max)},right={...rightBase,value:same?left.value:rand(1,max)};if(!same&&right.value===left.value)right.value=left.value===max?left.value-1:left.value+1;const answer=left.value>right.value?left.name:right.value>left.value?right.name:"same length";return {domain:"measure",prompt:"Which object is longer?",spoken:`Which object is longer? The ${left.name} is ${left.value} centimetres. The ${right.name} is ${right.value} centimetres.`,visual:measureVisual(left,right),answer,options:[left.name,right.name,"same length"]};},
  stories(level){const max=level<2?10:15,add=Math.random()>.5,a=rand(1,add?max-1:max),b=rand(1,add?max-a:a),answer=add?a+b:a-b;const prompt=add?`You have ${a} apples and get ${b} more. How many apples now?`:`You have ${a} apples and eat ${b}. How many are left?`;return {domain:"stories",prompt,spoken:prompt,visual:`<div class="story-maths">🍎 <span>${a}</span> ${add?"➕":"➖"} <span>${b}</span></div>`,answer,options:numberOptions(answer,0,max)};}
};
function renderMath(){
  const session=current.math;if(!session||session.index>=session.questions.length)return finishMath();
  current.view="math";const question=session.questions[session.index],pct=Math.round(session.index/session.questions.length*100);
  shell(`<div class="screen math-screen">${screenHeader("Maths Mountain",`${session.questions.length-session.index} questions left`,"maths-menu")}
    <section class="math-stage"><div class="math-coach"><span>🦉</span><div><small>${domainLabel(question.domain)}</small><strong>Take your time</strong></div><button class="speaker-button" data-action="read-math" aria-label="Read question">🔊</button><button class="auto-button ${state.settings.readAloud?"on":""}" data-action="toggle-read">${state.settings.readAloud?"Auto-read on":"Auto-read off"}</button></div>
      ${progressBar(pct,`${session.index+1}/${session.questions.length}`)}
      <div class="math-question"><h2>${esc(question.prompt)}</h2><div class="math-visual">${question.visual||""}</div></div>
      <div class="choice-grid math-choices">${question.options.map(option=>`<button class="choice-button math-choice" data-math-answer="${esc(option)}">${esc(option)}</button>`).join("")}</div>
      <div id="feedback" class="feedback" aria-live="assertive"></div>
    </section>
  </div>`);
  if(state.settings.readAloud)setTimeout(()=>{if(current.math===session&&session.questions[session.index]===question)speakText(question.spoken||question.prompt,{rate:.8});},280);
}
function answerMath(button){
  const session=current.math;if(!session||session.answered||button.disabled)return;stopSpeech();
  const question=session.questions[session.index],raw=button.dataset.mathAnswer,value=isNaN(Number(raw))?raw:Number(raw),good=sameAnswer(value,question.answer);
  state.stats.mathAttempts++;state.mathDomains[question.domain].a++;
  if(good){session.answered=true;session.correct++;state.stats.mathCorrect++;state.mathDomains[question.domain].c++;addStars(1);button.classList.add("correct");document.querySelectorAll("[data-math-answer]").forEach(b=>b.disabled=true);feedback("You got it! +1 star ⭐","good");save();setTimeout(()=>{session.index++;session.answered=false;session.wrongAttempts=0;renderMath();},850);}
  else{session.wrongAttempts=(session.wrongAttempts||0)+1;button.classList.add("wrong");button.disabled=true;feedback(session.wrongAttempts>=2?"Look again — the best choice is glowing.":"Nice try. Look carefully and choose again.","try");if(session.wrongAttempts>=2){const correct=[...document.querySelectorAll("[data-math-answer]")].find(b=>sameAnswer(b.dataset.mathAnswer,question.answer));correct?.classList.add("hint");}save();}
}
function finishMath(){
  stopSpeech();const session=current.math,pct=Math.round(session.correct/session.questions.length*100);state.stats.mathSessions++;if(pct>=85)state.mathLevel=clamp(state.mathLevel+1,1,3);if(pct<55)state.mathLevel=clamp(state.mathLevel-1,1,3);addStars(Math.max(2,Math.round(session.correct/5)));save();
  shell(`<div class="screen celebration-screen">${screenHeader("Climb complete!","Every try makes your number skills stronger.","maths-menu")}
    <section class="celebration-card"><div class="celebration-art">⛰️🏆⭐</div><h2>${session.correct} of ${session.questions.length} correct</h2><div class="score-meter"><span style="width:${pct}%"></span></div><div class="reward-burst">${pct}% · stars earned</div><button class="cta orange wide" data-action="maths-menu">Choose another climb</button><button class="text-button" data-action="home">Back home</button></section>
  </div>`);
}

function renderGarden(effect=""){
  current.view="garden";const active=state.garden.activePlant;const plant=active?PLANTS[active.type]:null;
  const permanent=state.garden.plants.map((item,index)=>{const info=PLANTS[item.type];return `<button class="grown-item plant-${info.colour}" data-garden-item="${index}" title="${esc(info.name)}"><span>${info.stages.at(-1)}</span><small>${esc(info.name)}</small></button>`;}).join("");
  const animals=state.garden.animals.map(item=>{const info=ANIMALS[item.type],selected=item.type===state.garden.selectedAnimal;return `<button class="garden-animal ${selected?"selected":""}" data-select-animal="${esc(item.type)}"><span>${info.emoji}</span><div>${"💛".repeat(item.happiness)}${"♡".repeat(5-item.happiness)}</div><small>${esc(info.name)}</small></button>`;}).join("");
  const lockedAnimals=Object.entries(ANIMALS).filter(([type])=>!state.garden.animals.some(a=>a.type===type)).map(([type,info])=>`<button class="shop-item" data-unlock-animal="${type}" ${state.stars<info.cost?"disabled":""}><span>${info.emoji}</span><strong>${esc(info.name)}</strong><small>⭐ ${info.cost}</small></button>`).join("");
  const plantArea=active?`<div class="nursery ${effect}"><small>Growing now</small><span class="nursery-plant">${plant.stages[active.stage]}</span><strong>${esc(plant.name)}</strong>${progressBar(active.stage/(plant.stages.length-1)*100,`${active.stage}/${plant.stages.length-1} grows`)}${active.stage>=plant.stages.length-1?`<button class="cta green" data-action="place-plant">Place in garden</button>`:`<button class="cta blue" data-action="water-plant" ${state.stars<GARDEN_COSTS.water?"disabled":""}>💧 Water · ⭐ ${GARDEN_COSTS.water}</button>`}</div>`:`<div class="nursery empty"><span>🪴</span><strong>Choose a new seed</strong><p>Every fully grown plant stays in your garden.</p></div>`;
  const seedShop=!active?`<section class="shop-panel"><div class="section-title compact"><div><h2>Seed shop</h2><p>Choose what to grow next.</p></div></div><div class="shop-grid">${Object.entries(PLANTS).map(([type,info])=>`<button class="shop-item" data-plant-seed="${type}" ${state.stars<info.cost?"disabled":""}><span>${info.stages.at(-1)}</span><strong>${esc(info.name)}</strong><small>${info.cost===0&&state.garden.plants.length===0?"Free first seed":`⭐ ${info.cost}`}</small></button>`).join("")}</div></section>`:"";
  const selected=state.garden.animals.find(a=>a.type===state.garden.selectedAnimal)||state.garden.animals[0],selectedInfo=ANIMALS[selected.type];
  shell(`<div class="screen garden-screen">${screenHeader("My Garden","Everything you finish growing stays here.")}
    <section class="garden-world ${effect}"><div class="garden-sky"><span>☀️</span><i>☁️</i></div><div class="garden-collection">${permanent||"<p class='empty-garden'>Your first plant will appear here when it is fully grown.</p>"}</div><div class="garden-ground"></div></section>
    <section class="garden-control-grid">${plantArea}<div class="animal-care"><small>Animal friends</small><div class="animal-row">${animals}</div><button class="cta orange" data-action="feed-animal" ${state.stars<GARDEN_COSTS.feed?"disabled":""}>${selectedInfo.food} Feed ${esc(selectedInfo.name)} · ⭐ ${GARDEN_COSTS.feed}</button></div></section>
    ${seedShop}
    <section class="shop-panel"><div class="section-title compact"><div><h2>Animal friends</h2><p>Unlock a friend once, then feed it whenever you like.</p></div></div>${lockedAnimals?`<div class="shop-grid">${lockedAnimals}</div>`:"<p class='all-unlocked'>All animal friends have joined your garden! 🎉</p>"}</section>
    <div class="garden-summary"><span>⭐ ${state.stars} available</span><span>🌱 ${state.garden.plants.length} plants</span><span>🐾 ${state.garden.animals.length} animals</span></div>${bottomNav("garden")}
  </div>`);
}
function plantSeed(type){const info=PLANTS[type];if(!info)return;const cost=state.garden.plants.length===0&&type==="daisy"?0:info.cost;if(!spendStars(cost)){toast("Earn a few more stars first.");return;}state.garden.activePlant={type,stage:0};save();renderGarden("planting");toast(`${info.name} seed planted!`);}
function waterPlant(){const active=state.garden.activePlant;if(!active)return;if(active.stage>=PLANTS[active.type].stages.length-1){toast("This plant is ready to place.");return;}if(!spendStars(GARDEN_COSTS.water)){toast("You need 3 stars to water the plant.");return;}active.stage++;state.stats.waterings++;save();renderGarden("watering");toast(active.stage>=PLANTS[active.type].stages.length-1?"It is fully grown! Place it in your garden.":"Splash! Your plant grew.");}
function placePlant(){const active=state.garden.activePlant;if(!active||active.stage<PLANTS[active.type].stages.length-1)return;state.garden.plants.push({id:`plant-${Date.now()}-${Math.random().toString(16).slice(2)}`,type:active.type});state.garden.activePlant=null;save();renderGarden("placing");toast("Your plant will stay in the garden forever!");}
function selectAnimal(type){if(state.garden.animals.some(a=>a.type===type)){state.garden.selectedAnimal=type;save();renderGarden();}}
function unlockAnimal(type){const info=ANIMALS[type];if(!info||state.garden.animals.some(a=>a.type===type))return;if(!spendStars(info.cost)){toast("Earn more stars to invite this friend.");return;}state.garden.animals.push({type,happiness:0});state.garden.selectedAnimal=type;save();renderGarden("animal-arrive");toast(`${info.name} joined your garden!`);}
function feedAnimal(){const animal=state.garden.animals.find(a=>a.type===state.garden.selectedAnimal)||state.garden.animals[0];if(!animal)return;if(!spendStars(GARDEN_COSTS.feed)){toast("You need 2 stars for a snack.");return;}animal.happiness=clamp(animal.happiness+1,0,5);state.stats.feedings++;save();renderGarden("feeding");toast(animal.happiness===5?`${ANIMALS[animal.type].name} is super happy!`:`Yum! ${ANIMALS[animal.type].name} is happier.`);}

function renderStories(){
  current.view="stories";
  const cards=STORIES.map((story,index)=>{const unlocked=state.completedTrails.some(t=>t>=story.unlock);return `<button class="story-card ${unlocked?"":"locked"}" data-story="${index}" ${unlocked?"":"disabled"}><span>${story.emoji}</span><div><small>${unlocked?"Read together":`Finish trail ${story.unlock+1}`}</small><h3>${esc(story.title)}</h3><p>${unlocked?`${story.lines.length} short pages`:"Locked"}</p></div>${unlocked?"<b>→</b>":"<b>🔒</b>"}</button>`;}).join("");
  shell(`<div class="screen">${screenHeader("Story House","Read together, listen again and point to familiar words.")}
    <div class="story-house-banner">🏡<div><strong>A quiet place for stories</strong><p>Stories open as phonics paths are completed.</p></div></div><section class="story-list">${cards}</section>${bottomNav("home")}</div>`);
}
function openStory(index){current.story={index,page:0};renderStoryPage();}
function renderStoryPage(){
  const story=STORIES[current.story.index],page=current.story.page,line=story.lines[page];
  shell(`<div class="screen story-reader">${screenHeader(story.title,`Page ${page+1} of ${story.lines.length}`,"stories")}
    <section class="book-page"><div class="book-picture">${story.emoji}</div><p>${esc(line)}</p><button class="cta purple" data-speak="${esc(line)}">🔊 Read this page</button></section>
    <div class="page-controls"><button class="cta soft" data-action="story-prev" ${page===0?"disabled":""}>← Back</button><button class="cta green" data-action="story-next">${page===story.lines.length-1?"Finish story":"Next page →"}</button></div>
  </div>`);
}
function nextStoryPage(){const story=STORIES[current.story.index];if(current.story.page<story.lines.length-1){current.story.page++;renderStoryPage();}else{state.stats.storiesRead++;addStars(2);save();shell(`<div class="screen celebration-screen">${screenHeader("Story finished!","Wonderful listening and reading.","stories")}<section class="celebration-card"><div class="celebration-art">📚✨</div><h2>${esc(story.title)}</h2><p>You reached the end of the story.</p><div class="reward-burst">+2 ⭐</div><button class="cta green wide" data-action="stories">Choose another story</button></section></div>`);}}

async function renderParent(){
  current.view="parent";const audio=await checkAudio();
  const domains=Object.entries(state.mathDomains).map(([domain,stats])=>{const pct=stats.a?Math.round(stats.c/stats.a*100):0;return `<div class="domain-row"><span>${domainLabel(domain)}</span>${progressBar(pct,`${pct}%`)}</div>`;}).join("");
  shell(`<div class="screen">${screenHeader("Parent Corner","Progress stays on this device.")}
    <section class="parent-stats"><div><strong>${state.completedTrails.length}</strong><span>Trails complete</span></div><div><strong>${state.stats.wordsBlended}</strong><span>Words blended</span></div><div><strong>${state.stats.mathCorrect}</strong><span>Maths correct</span></div><div><strong>${state.garden.plants.length}</strong><span>Plants grown</span></div></section>
    <section class="settings-panel"><h2>Learner settings</h2><label class="setting-row"><span><strong>Display name</strong><small>Shown on the home screen.</small></span><input id="childName" maxlength="18" value="${esc(state.name)}"></label><div class="setting-row"><span><strong>Read questions aloud</strong><small>Used for maths, whole words and stories.</small></span><button class="toggle ${state.settings.readAloud?"on":""}" data-action="toggle-read">${state.settings.readAloud?"On":"Off"}</button></div><div class="setting-row"><span><strong>Open all phonics paths</strong><small>Useful for parent-led practice.</small></span><button class="small-button" data-action="unlock-all">Unlock</button></div></section>
    <section class="settings-panel"><h2>Phonics audio</h2><div class="audio-check ${audio.ok?"good":"bad"}">${audio.ok?`✓ ${audio.count}/${EXPECTED_AUDIO.length} sound files ready`:`⚠ ${audio.count}/${EXPECTED_AUDIO.length} sound files found`}</div><button class="small-button" data-play-sound="m" data-repeat="2">Test sound</button></section>
    <section class="settings-panel"><h2>Maths progress</h2>${domains}</section>
    <section class="settings-panel"><h2>Data</h2><div class="setting-row"><span><strong>Export progress</strong><small>Download a backup file.</small></span><button class="small-button" data-action="export">Export</button></div><div class="setting-row"><span><strong>Reset everything</strong><small>This cannot be undone.</small></span><button class="small-button danger" data-action="reset">Reset</button></div></section>
    <button class="text-button" data-action="home">Back home</button>
  </div>`);
}
async function checkAudio(){let count=0;await Promise.all(EXPECTED_AUDIO.map(async name=>{try{const response=await fetch(`${PHONEME_BASE}${name}.m4a`,{method:"HEAD",cache:"no-store"});if(response.ok)count++;}catch{}}));return {count,ok:count===EXPECTED_AUDIO.length};}
function exportProgress(){const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),link=document.createElement("a");link.href=url;link.download=`brightsteps-progress-${today()}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),500);}

function action(name){
  if(name==="home")return renderHome();
  if(name==="continue-learning")return startTrail(nextTrailIndex());
  if(name==="phonics")return renderTrails();
  if(name==="maths-menu")return renderMathMenu();
  if(name==="garden")return renderGarden();
  if(name==="stories")return renderStories();
  if(name==="parent")return renderParent();
  if(name==="lesson-next")return nextLesson();
  if(name==="blend-next"){state.stats.wordsBlended++;addStars(2);save();return nextLesson();}
  if(name==="read-math"){const q=current.math?.questions[current.math.index];if(q)speakText(q.spoken||q.prompt,{rate:.8});return;}
  if(name==="toggle-read"){state.settings.readAloud=!state.settings.readAloud;save();toast(state.settings.readAloud?"Read-aloud is on":"Read-aloud is off");return current.view==="parent"?renderParent():renderMath();}
  if(name==="water-plant")return waterPlant();
  if(name==="place-plant")return placePlant();
  if(name==="feed-animal")return feedAnimal();
  if(name==="story-next")return nextStoryPage();
  if(name==="story-prev"){if(current.story.page>0)current.story.page--;return renderStoryPage();}
  if(name==="unlock-all"){state.unlockedTrail=TRAILS.length-1;save();toast("All phonics paths are open.");return renderParent();}
  if(name==="export")return exportProgress();
  if(name==="reset"&&confirm("Reset all BrightSteps progress, stars and garden items?")){state=defaultState();save();return renderHome();}
}
function bind(){
  document.querySelectorAll("[data-action]").forEach(button=>button.addEventListener("click",()=>action(button.dataset.action)));
  document.querySelectorAll("[data-trail]").forEach(button=>button.addEventListener("click",()=>startTrail(Number(button.dataset.trail))));
  document.querySelectorAll("[data-play-sound]").forEach(button=>button.addEventListener("click",()=>playSound(button.dataset.playSound,Number(button.dataset.repeat)||1)));
  document.querySelectorAll("[data-speak]").forEach(button=>button.addEventListener("click",()=>speakText(button.dataset.speak,{rate:.74})));
  document.querySelectorAll("[data-blend-word]").forEach(button=>button.addEventListener("click",()=>playBlend(button.dataset.blendWord)));
  document.querySelectorAll("[data-phonics-answer]").forEach(button=>button.addEventListener("click",()=>answerPhonics(button,"sound")));
  document.querySelectorAll("[data-meaning-answer]").forEach(button=>button.addEventListener("click",()=>answerPhonics(button,"meaning")));
  document.querySelectorAll("[data-start-math]").forEach(button=>button.addEventListener("click",()=>startMaths(Number(button.dataset.startMath))));
  document.querySelectorAll("[data-math-answer]").forEach(button=>button.addEventListener("click",()=>answerMath(button)));
  document.querySelectorAll("[data-plant-seed]").forEach(button=>button.addEventListener("click",()=>plantSeed(button.dataset.plantSeed)));
  document.querySelectorAll("[data-select-animal]").forEach(button=>button.addEventListener("click",()=>selectAnimal(button.dataset.selectAnimal)));
  document.querySelectorAll("[data-unlock-animal]").forEach(button=>button.addEventListener("click",()=>unlockAnimal(button.dataset.unlockAnimal)));
  document.querySelectorAll("[data-story]").forEach(button=>button.addEventListener("click",()=>openStory(Number(button.dataset.story))));
  document.querySelectorAll("[data-garden-item]").forEach(button=>button.addEventListener("click",()=>{button.classList.remove("wiggle");void button.offsetWidth;button.classList.add("wiggle");toast(button.title);}));
  const name=document.getElementById("childName");if(name)name.addEventListener("change",()=>{state.name=name.value.trim()||"Explorer";save();toast("Name saved.");});
}

window.addEventListener("load",()=>{
  if("serviceWorker" in navigator)navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
  renderHome();
});
