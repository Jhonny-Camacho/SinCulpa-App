import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {menuForDay,shoppingForDay,workoutForDay,cravingAdvice} from '../src/data.js';

test('150 preparaciones únicas: 30 días con tres comidas y dos snacks',()=>{
 const names=new Set(),ids=new Set(),photos=new Set();
 for(let day=1;day<=30;day++){
  const menu=menuForDay(day);assert.deepEqual(Object.keys(menu),['breakfast','morningSnack','lunch','afternoonSnack','dinner']);
  Object.values(menu).forEach(m=>{assert.ok(!names.has(m.name),`Receta repetida: ${m.name}`);names.add(m.name);ids.add(m.id);assert.ok(m.ingredients.length>=3);assert.equal(m.steps.length,3);assert.ok(m.minutes>0);assert.equal(m.photo.index,day-1);photos.add(`${m.photo.src}:${m.photo.index}`);m.ingredients.forEach(i=>assert.equal(i.split(' · ').length,2));});
  assert.equal(menu.morningSnack.optional,true);assert.equal(menu.afternoonSnack.optional,true);assert.equal(menu.lunch.optional,false);
  const shop=shoppingForDay(day);assert.equal(new Set(shop.map(i=>i.name)).size,shop.length);
  for(const m of Object.values(menu))for(const i of m.ingredients)assert.ok(shop.some(s=>s.name===i.split(' · ')[0]));
 }
 assert.equal(names.size,150);assert.equal(ids.size,150);assert.equal(photos.size,150);
});
test('los cinco archivos de fotos existen y cada receta tiene su posición propia',()=>{
 for(const m of Object.values(menuForDay(1)))assert.ok(existsSync(new URL('../public'+m.photo.src,import.meta.url)),m.photo.src);
 assert.throws(()=>menuForDay(0),RangeError);assert.throws(()=>menuForDay(31),RangeError);
});
test('ningún ejercicio se repite entre los 30 días de cada modalidad',()=>{
 for(const mode of ['home','gym']){
  const keys=new Set(),names=new Set();
  for(let day=1;day<=30;day++){
   const r=workoutForDay(day,mode,{age:35,level:'regular'});assert.equal(r.exercises.length,2);assert.ok(r.rounds>=1&&r.rounds<=3);assert.ok(r.minutes>=5);
   r.exercises.forEach(e=>{assert.ok(!keys.has(e.key),`${mode}: ${e.key} repetido`);keys.add(e.key);assert.ok(!names.has(e.name));names.add(e.name);assert.equal(e.steps.length,3);assert.ok(e.sets>=1);});
  }assert.equal(keys.size,60);
 }
 assert.equal(workoutForDay(30,'home',{age:65,level:'regular'}).rounds,1);assert.equal(workoutForDay(4,'gym',{}).recovery,true);assert.equal(workoutForDay(29,'gym',{age:30,level:'regular'}).rounds,3);
});
test('el semáforo propone alimentos y cantidades para todos los sabores y estados',()=>{
 for(const hunger of ['hungry','unsure','craving'])for(const feeling of ['calm','stress','happy'])for(const taste of ['sweet','salty','fresh','chocolate']){
  const advice=cravingAdvice(hunger,feeling,taste);assert.equal(advice.options.length,3);advice.options.forEach(o=>{assert.ok(o.food.length>5);assert.match(o.portion,/[0-9¼½¾]/);});assert.match(advice.note,/no un límite/);
 }
 assert.equal(cravingAdvice('hungry','stress').color,'green');assert.equal(cravingAdvice('unsure','stress').color,'amber');assert.equal(cravingAdvice('craving','happy').color,'rose');assert.match(cravingAdvice('craving','happy','chocolate').options[0].portion,/20–30 g/);
});
