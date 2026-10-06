// Programmatic interface smoke checks with a small DOM mock.
// This does not replace a real browser visual/accessibility check.
'use strict';
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const nodes=new Map(),intervals=new Map();let intervalCounter=0;
function element(id){if(nodes.has(id))return nodes.get(id);const classes=new Set();const el={id,value:'',textContent:'',hidden:false,disabled:false,innerHTML:'',style:{},dataset:{},events:{},classList:{toggle:(c,on)=>on?classes.add(c):classes.delete(c)},setAttribute(){},addEventListener(t,fn){this.events[t]=fn},click(){this.onclick?.()},scrollIntoView(){},focus(){},remove(){}};nodes.set(id,el);return el;}
const presets=['shop','reverse','ties'].map(x=>Object.assign(element('preset-'+x),{dataset:{preset:x}}));
const pages=['workspace','learn'].map(element),navigation=['workspace','learn'].map(x=>Object.assign(element('nav-'+x),{dataset:{page:x}}));
const radios=['merge','quick'].map(x=>Object.assign(element('radio-'+x),{value:x}));
const document={getElementById:element,querySelectorAll:q=>q==='[data-preset]'?presets:q==='[data-page]'?navigation:q==='.page'?pages:q==='input[name="algorithm"]'?radios:[],createElement:()=>element('download'),body:{appendChild(){}}};
element('field').value='price';element('direction').value='asc';element('speed').value='650';
let exported;
class MockBlob{constructor(parts){exported=parts.join('');}}
const context=vm.createContext({document,window:{matchMedia:()=>({matches:false})},localStorage:{getItem:()=>null,setItem(){}},console,Blob:MockBlob,URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},setTimeout:()=>1,clearTimeout(){},setInterval:fn=>{intervals.set(++intervalCounter,fn);return intervalCounter;},clearInterval:id=>intervals.delete(id)});
for(const file of ['algorithms.js','app.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
assert.equal(element('count').textContent,'8 / 24 PRODUCTS');assert.equal(element('step-label').textContent.slice(0,7),'Step 0 ');
element('next').click();assert.equal(element('event-title').textContent,'Split the current group');element('prev').click();assert.equal(element('event-title').textContent,'Ready to begin');
element('finish').click();assert.equal(element('result-panel').hidden,false);assert.match(element('sorted-records').innerHTML,/Sticky notes/);element('restart').click();assert.equal(element('result-panel').hidden,true);
radios[1].onchange();element('next').click();assert.equal(element('event-title').textContent,'Choose the pivot');
element('direction').value='desc';element('direction').onchange();assert.equal(element('step-label').textContent.slice(0,7),'Step 0 ');element('field').value='stock';element('field').onchange();element('finish').click();assert.match(element('result-copy').textContent,/stock quantity, descending/);
presets[2].click();assert.equal(element('count').textContent,'6 / 24 PRODUCTS');
element('new-name').value='Test <product>';element('new-price').value='123.45';element('new-stock').value='3';element('add-form').events.submit({preventDefault(){}});assert.equal(element('count').textContent,'7 / 24 PRODUCTS');assert.match(element('records').innerHTML,/Test &lt;product&gt;/);
element('records').events.change({target:{dataset:{index:'0',field:'stock'},value:'4.5'}});assert.match(element('toast').textContent,/whole stock/);
element('records').events.change({target:{dataset:{index:'0',field:'name'},value:'=1+1'}});element('finish').click();element('export').click();assert.equal(element('download').download,'StockStudio-Sorted-Inventory.csv');assert.match(exported,/"'=1\+1"/);
element('shuffle').click();assert.equal(element('result-panel').hidden,true);element('play').click();assert.equal(element('play').textContent,'Ⅱ Pause');element('play').click();assert.equal(intervals.size,0);element('play').click();let safety=10000;while(intervals.size&&safety-->0)[...intervals.values()][0]();assert(safety>0);assert.equal(element('status').textContent,'SORTED');
element('timeline').value='1';element('timeline').oninput();assert.equal(element('result-panel').hidden,true);navigation[1].click();assert.equal(element('learn').hidden,false);element('try-it').click();assert.equal(element('workspace').hidden,false);
element('restore').click();assert.equal(element('count').textContent,'6 / 24 PRODUCTS');
console.log('PASS: startup, navigation, stepping/back/restart, final result, algorithms, order/field changes, edit validation, custom products, escaping, CSV export, shuffle, Play/Pause, full playback, and scrubbing (DOM mock).');
