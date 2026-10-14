import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js';
const canvas=document.querySelector('#hero-canvas'),status=document.querySelector('#scene-status');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
try{
const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(39,1,.1,100);camera.position.set(0,2.6,11);camera.lookAt(0,1.8,0);
scene.add(new THREE.HemisphereLight(0xb6d6ff,0x101522,2.5));
const key=new THREE.DirectionalLight(0xffd493,4);key.position.set(-4,8,6);scene.add(key);
const rim=new THREE.DirectionalLight(0x5b9cff,5);rim.position.set(5,5,-4);scene.add(rim);
const mat=(c,metal=.05)=>new THREE.MeshStandardMaterial({color:c,roughness:.58,metalness:metal});
const suit=mat(0x202b3e),armor=mat(0x0f1726),gold=mat(0xf4ba58,.35),skin=mat(0xd5a17a),floorMat=mat(0x131d2d);
const fighter=new THREE.Group();scene.add(fighter);fighter.position.set(2.45,-.6,0);
function mesh(geo,m,parent,x=0,y=0,z=0){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);parent.add(o);return o}
function sphere(parent,m,r,x,y,z,sx=1,sy=1,sz=1){const o=mesh(new THREE.SphereGeometry(r,24,16),m,parent,x,y,z);o.scale.set(sx,sy,sz);return o}
function cylinder(parent,m,rt,rb,h,x,y,z){return mesh(new THREE.CylinderGeometry(rt,rb,h,18),m,parent,x,y,z)}
// A stylized original 3D martial-arts fighter assembled from actual lit meshes.
sphere(fighter,suit,.85,0,2.7,0,.76,1.1,.48);
sphere(fighter,armor,.58,0,2.12,.02,1,.72,.64);
cylinder(fighter,gold,.46,.47,.16,0,2.05,.04);
sphere(fighter,skin,.47,0,3.82,0,.87,1.1,.84);
sphere(fighter,armor,.49,0,4.13,-.03,1.01,.5,.98);
const mask=sphere(fighter,armor,.46,0,3.7,.27,.9,.4,.55);
const eyes=mat(0xffdc83,.1);sphere(fighter,eyes,.09,-.18,3.88,.39,1.3,.38,.45);sphere(fighter,eyes,.09,.18,3.88,.39,1.3,.38,.45);
const headband=mesh(new THREE.BoxGeometry(1.03,.11,.15),gold,fighter,0,4.04,.34);
const leftArm=new THREE.Group(),rightArm=new THREE.Group(),leftLeg=new THREE.Group(),rightLeg=new THREE.Group();
leftArm.position.set(-.65,3.13,0);rightArm.position.set(.65,3.13,0);leftLeg.position.set(-.31,1.9,0);rightLeg.position.set(.31,1.9,0);
fighter.add(leftArm,rightArm,leftLeg,rightLeg);
function limb(group,length,thickness,m,glove=false){sphere(group,m,thickness,0,-length*.44,0,.95,length/(thickness*2),.92);sphere(group,glove?gold:armor,thickness*1.1,0,-length*.93,.08,1.15,.7,1.05)}
limb(leftArm,1.28,.24,suit,true);limb(rightArm,1.28,.24,suit,true);limb(leftLeg,1.62,.32,suit);limb(rightLeg,1.62,.32,suit);
sphere(leftLeg,armor,.34,0,-1.58,.23,1.15,.44,1.6);sphere(rightLeg,armor,.34,0,-1.58,.23,1.15,.44,1.6);
leftArm.rotation.z=-.8;rightArm.rotation.z=1.25;leftLeg.rotation.z=-.26;rightLeg.rotation.z=.28;
const belt=mesh(new THREE.BoxGeometry(1.05,.17,.66),gold,fighter,0,2.04,.1);
const badge=mesh(new THREE.BoxGeometry(.3,.3,.07),gold,fighter,0,2.95,.48);badge.rotation.z=Math.PI/4;
const platform=mesh(new THREE.CylinderGeometry(3.3,3.65,.25,64),floorMat,scene,2.45,-.88,0);
const ringMat=new THREE.MeshBasicMaterial({color:0xe3ae5b,transparent:true,opacity:.65});
const ring=mesh(new THREE.TorusGeometry(3.25,.017,8,100),ringMat,scene,2.45,-.73,0);ring.rotation.x=Math.PI/2;
const rings=[];for(let i=0;i<3;i++){const o=mesh(new THREE.TorusGeometry(3.9+i*.6,.009,6,100),new THREE.MeshBasicMaterial({color:i%2?0x4d79a6:0xf5b85c,transparent:true,opacity:.16}),scene,2.45,1.6,0);o.rotation.y=.35+i*.35;rings.push(o)}
const particles=new THREE.BufferGeometry(),points=[];for(let i=0;i<180;i++){points.push((Math.random()-.5)*14,Math.random()*8-1,(Math.random()-.5)*9)}particles.setAttribute('position',new THREE.Float32BufferAttribute(points,3));const stars=new THREE.Points(particles,new THREE.PointsMaterial({color:0xffdba1,size:.026,transparent:true,opacity:.55}));scene.add(stars);
let pointerX=0,pointerY=0;window.addEventListener('pointermove',e=>{pointerX=(e.clientX/innerWidth-.5)*2;pointerY=(e.clientY/innerHeight-.5)*2},{passive:true});
function resize(){const w=canvas.clientWidth,h=canvas.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=w<600?15:w<950?13:11;camera.position.x=w<600?1.2:0;camera.updateProjectionMatrix()}window.addEventListener('resize',resize,{passive:true});resize();
const clock=new THREE.Clock();let raf;
function frame(){const t=clock.getElapsedTime();if(!reduced){fighter.position.y=-.6+Math.sin(t*1.7)*.085;fighter.rotation.y=Math.sin(t*.65)*.2+pointerX*.12;fighter.rotation.z=Math.sin(t*1.2)*.025;leftArm.rotation.z=-.8+Math.sin(t*2)*.17;rightArm.rotation.z=1.25+Math.sin(t*2+1)*.16;leftLeg.rotation.z=-.26+Math.sin(t*1.5)*.055;rightLeg.rotation.z=.28-Math.sin(t*1.5)*.055;rings.forEach((r,i)=>{r.rotation.z=t*(i%2?-.08:.06)});camera.position.y=2.6-pointerY*.18;camera.lookAt(0,1.8,0)}renderer.render(scene,camera);if(!reduced)raf=requestAnimationFrame(frame)}
frame();status.remove();document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf)}else if(!reduced){clock.getDelta();frame()}});
}catch(err){console.error('3D scene unavailable:',err);status.textContent='3D preview unavailable on this device';}
