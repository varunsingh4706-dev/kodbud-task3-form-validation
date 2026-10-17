const form=document.getElementById('contactForm');
const fields=['name','email','phone','message'];
const validators={
 name:v=>v.trim().length>=2?'':'Please enter your name (at least 2 characters).',
 email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())?'':'Enter a valid email address.',
 phone:v=>{const digits=v.replace(/\D/g,'');return digits.length>=10&&digits.length<=15?'':'Enter a phone number containing 10–15 digits.'},
 message:v=>v.trim().length>=10?'':'Please enter a message of at least 10 characters.'
};
function validate(id){const input=document.getElementById(id);const error=document.getElementById(id+'Error');const message=validators[id](input.value);error.textContent=message;input.classList.toggle('invalid',Boolean(message));input.setAttribute('aria-invalid',String(Boolean(message)));return !message}
fields.forEach(id=>document.getElementById(id).addEventListener('input',()=>{validate(id);document.getElementById('status').textContent='';document.getElementById('status').className=''}));
form.addEventListener('submit',event=>{event.preventDefault();const valid=fields.map(validate).every(Boolean);const status=document.getElementById('status');if(!valid){status.textContent='Please fix the highlighted fields and try again.';status.className='failure';const first=fields.find(id=>document.getElementById(id).classList.contains('invalid'));if(first)document.getElementById(first).focus();return;}status.textContent='Validation successful. This demo does not send or store your message.';status.className='success';form.reset();fields.forEach(id=>{document.getElementById(id+'Error').textContent='';document.getElementById(id).classList.remove('invalid');document.getElementById(id).setAttribute('aria-invalid','false')})});
