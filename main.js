const fields = document.querySelectorAll('[required]');

function validateField(field){
  function verifyErrors(){
    let foundError = false;

    for(let error in field.validity){
      if(field.validity[error] && !field.validity.valid){
        foundError = error;
      }
    }
    return foundError
  }

  function setCustomMessage(message){
    const spanError = field.parentNode.querySelector('span.error')

    if(message){
      spanError.classList.add('active');
      spanError.innerHTML = 'Campo Obrigatório'
    }else{
      spanError.classList.remove('active');
      spanError.innerHTML = '';
    }
  };

  return function(){
    if(verifyErrors()){
      setCustomMessage('Campo Obrigatório');
    }else{
      setCustomMessage();
    };
  };
};

function customValidation(event){
  const field = event.target;
  const validation = validateField(field);

  validation();
}

for(field of fields){
  field.addEventListener('invalid', event => {
    // eliminar o bubble
    event.preventDefault();
    customValidation(event);
  });

  field.addEventListener('blur', customValidation);
}



document.querySelector('form')
  .addEventListener('submit', event => { 
    console.log('enviar formulário');
    event.preventDefault();
});