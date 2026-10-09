import test from 'node:test';
import assert from 'node:assert/strict';
import {menuForDay,shoppingForDay,workoutForDay,cravingAdvice} from '../src/data.js';
test('30 días con tres recetas completas y listas sin productos duplicados',()=>{
 const plans=new Set();for(let day=1;day<=30;day++){const menu=menuForDay(day);assert.equal(Object.keys(menu).length,3);Object.values(menu).forEach(m=>{assert.ok(m.ingredients.length>=3);assert.ok(m.steps.length>=3);assert.ok(m.minutes>0);});plans.add(Object.values(menu).map(m=>m.name).join('|'));const shop=shoppingForDay(day);assert.equal(new Set(shop.map(i=>i.name)).size,shop.length);for(const m of Object.values(menu))for(const i of m.ingredients)assert.ok(shop.some(s=>s.name===i.split(' · ')[0]));}assert.equal(plans.size,30);
});
test('rutinas progresivas, recuperación y adaptación por edad',()=>{for(let day=1;day<=30;day++)for(const mode of ['home','gym']){const r=workoutForDay(day,mode,{age:35,level:'regular'});assert.ok(r.exercises.length>=2);assert.ok(r.rounds>=1&&r.rounds<=3);r.exercises.forEach(e=>assert.equal(e.steps.length,3));}assert.equal(workoutForDay(30,'home',{age:65,level:'regular'}).rounds,1);assert.equal(workoutForDay(4,'gym',{}).recovery,true);assert.equal(workoutForDay(29,'gym',{age:30,level:'regular'}).rounds,3);});
test('el semáforo atiende hambre, estrés y disfrute',()=>{assert.equal(cravingAdvice('hungry','stress').color,'green');assert.equal(cravingAdvice('unsure','stress').color,'amber');assert.equal(cravingAdvice('craving','happy').color,'rose');});
