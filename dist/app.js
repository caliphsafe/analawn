'use strict';
const projects={
 leaves:{title:'A fresh start for fall.',description:'Fallen leaves cleared from the lawn and front of the property.',before:'Front lawn covered in autumn leaves before cleanup',after:'The same lawn after A & A removed the leaves'},
 hedges:{title:'A little breathing room.',description:'Overgrowth cleared and shrubs tidied around the front of the home.',before:'Overgrown front shrubs and planting beds',after:'The same home with tidied shrubs and clearer beds'},
 courtyard:{title:'The courtyard, rediscovered.',description:'Weeds and overgrowth cleared from the stone courtyard.',before:'Stone courtyard with weeds and overgrowth',after:'Same courtyard after weeds and overgrowth were cleared'},
 flowerbed:{title:'Fresh mulch. A fresh welcome.',description:'Fresh red mulch finishes the flower bed around the entrance marker.',before:'Flower bed before mulch was added',after:'Flower bed after new red mulch was installed'},
 porch:{title:'A tidier welcome home.',description:'The planting bed beside the porch refreshed with red mulch.',before:'Bare planting bed by porch before mulching',after:'The same porch bed with fresh red mulch'},
 stonebed:{title:'Let the planting shine.',description:'Overgrowth removed from a stone-edged bed, showing the hostas and natural border.',before:'Overgrown stone-edged foundation planting bed',after:'Stone-edged bed with cleared plants and tidied border'}
};
const tabs=[...document.querySelectorAll('[data-project]')];
function selectProject(tab){const key=tab.dataset.project,p=projects[key];if(!p)return;tabs.forEach(t=>{const active=t===tab;t.classList.toggle('active',active);t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1});document.querySelector('#project-panel').setAttribute('aria-labelledby',tab.id);for(const stage of ['before','after']){const img=document.querySelector('#'+stage+'-photo');img.src='assets/'+key+'-'+stage+'.webp';img.alt=p[stage]}document.querySelector('#project-title').textContent=p.title;document.querySelector('#project-description').textContent=p.description;document.querySelector('#project-number').textContent=String(tabs.indexOf(tab)+1).padStart(2,'0')+' / 06'}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectProject(tab));tab.addEventListener('keydown',e=>{let i;if(e.key==='ArrowRight'||e.key==='ArrowDown')i=(index+1)%tabs.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')i=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')i=0;else if(e.key==='End')i=tabs.length-1;else return;e.preventDefault();tabs[i].focus();selectProject(tabs[i])})});
const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('#site-nav');const closeMenu=()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open')};menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const form=document.querySelector('#quote-form'),steps=[...form.querySelectorAll('.form-step')],error=document.querySelector('#form-error');let currentStep=0;
let sending=false, submitted=false;
function showError(text,field){error.textContent=text;error.hidden=false;(field||error).focus()}
function validateStep(){error.hidden=true;if(currentStep===0&&!form.querySelector('[name=services]:checked')){showError('Please choose at least one service.',form.querySelector('[name=services]'));return false}for(const field of steps[currentStep].querySelectorAll('input:not([type=checkbox]),select,textarea')){if(field.required&&!field.value.trim()){showError('Please complete all required fields.',field);return false}if(!field.checkValidity()){showError(field.validationMessage,field);return false}}if(currentStep===1){const digits=form.elements.phone.value.replace(/\D/g,'');if(!/^(?:1)?\d{10}$/.test(digits)){showError('Please enter a valid 10-digit US phone number.',form.elements.phone);return false}if(form.elements.reply.value==='Email'&&!form.elements.email.value.trim()){showError('Add an email address if you prefer an email reply.',form.elements.email);return false}}return true}
function buildMessage(){const d=new FormData(form),v=k=>String(d.get(k)||'').trim(),out=['QUOTE REQUEST — A & A Lawn & More','','Name: '+v('name'),'Phone: '+v('phone')];if(v('email'))out.push('Email: '+v('email'));out.push('Property: '+v('address')+', '+v('city')+', '+v('zip'),'Type: '+v('property'),'Yard size: '+v('size'),'Condition: '+v('condition'),'Services: '+d.getAll('services').join('; '),'Frequency: '+v('frequency'),'Start: '+v('timing'),'Reply by: '+v('reply')+' / '+v('contactTime'),'','Work requested: '+v('details'));if(v('access'))out.push('Access notes: '+v('access'));if(v('photos'))out.push('Photos: '+v('photos'));return out.join('\n')}
function showStep(n,focus=true){currentStep=n;steps.forEach((s,i)=>s.hidden=i!==n);error.hidden=true;document.querySelector('#step-count').textContent='STEP '+(n+1)+' / 3';document.querySelectorAll('.step-track span').forEach((s,i)=>s.classList.toggle('active',i<=n));if(n===2){const m=buildMessage();document.querySelector('#message-preview').value=m;document.querySelector('#submit-status').hidden=true}if(focus){const heading=steps[n].querySelector('h3');heading.tabIndex=-1;heading.focus({preventScroll:true});document.querySelector('.quote-card').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}}
form.querySelectorAll('.next').forEach(btn=>btn.addEventListener('click',()=>{if(validateStep())showStep(currentStep+1)}));form.querySelectorAll('.back').forEach(btn=>btn.addEventListener('click',()=>showStep(currentStep-1)));form.addEventListener('submit',submitRequest);
document.querySelectorAll('[data-service]').forEach(a=>a.addEventListener('click',()=>{const option=[...form.querySelectorAll('[name=services]')].find(c=>c.value===a.dataset.service);if(sending)return;if(submitted){submitted=false;document.querySelector('#send-request').disabled=false;document.querySelector('#send-request').textContent='Send quote request';form.querySelectorAll('.back').forEach(b=>b.disabled=false)}if(option)option.checked=true;showStep(0,false)}));
async function submitRequest(event){
 event.preventDefault();
 if(sending||submitted)return;
 if(currentStep<2){if(validateStep())showStep(currentStep+1);return;}
 // Recheck both completed steps before transmitting anything.
 for(let n=0;n<2;n++){currentStep=n;if(!validateStep()){const message=error.textContent;showStep(n);showError(message);return;}}
 currentStep=2;
 if(form.elements._honey.value){showError('Unable to submit this request. Please email us directly.');return;}
 const button=document.querySelector('#send-request'),status=document.querySelector('#submit-status');
 const d=new FormData(form),email=String(d.get('email')||'').trim();
 const payload={name:String(d.get('name')||'').trim(),email,_replyto:email,_subject:'New quote request — A & A Lawn & More',_template:'table',_honey:'',message:buildMessage()};
 sending=true;button.disabled=true;button.textContent='Sending…';form.setAttribute('aria-busy','true');error.hidden=true;status.hidden=true;
 form.querySelectorAll('.back').forEach(b=>b.disabled=true);
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);
 try{
  const response=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
  const result=await response.json();
  if(!response.ok || !(result.success===true||result.success==='true'))throw new Error('Request not accepted');
  submitted=true;button.textContent='Request submitted';status.textContent='Thank you. Your request has been accepted for processing. Aaron or Alvin will follow up using your contact details.';status.hidden=false;status.focus();
 }catch{
  button.disabled=false;button.textContent='Try sending again';form.querySelectorAll('.back').forEach(b=>b.disabled=false);
  showError('We could not confirm submission. Your details are still here. You can try again or email aandalawnguys@gmail.com directly. If you retry, the team may receive a duplicate.');
 }finally{clearTimeout(timer);sending=false;form.removeAttribute('aria-busy');}
}
document.querySelector('#year').textContent=new Date().getFullYear();const floating=document.querySelector('.mobile-quote');if('IntersectionObserver'in window){new IntersectionObserver(entries=>floating.classList.toggle('is-hidden',entries[0].isIntersecting)).observe(document.querySelector('#quote'))}

