window.addEventListener('load', () => {
    
    const form = document.querySelector('#formulario');
    const usuario = document.querySelector('#usuario');
    const email = document.querySelector('#email');

    form.addEventListener('submit', (e) =>{

        e.preventDefault()
        validarCampos()

    })


    const validarCampos = () => {

        const usuarioValor = usuario.value.trim();
        const emailValor = email.value.trim();

        if(!usuarioValor){
            validaFalla(usuario,'Campo vacío')
        }else{
            validaOk(usuario)
        }
       
        if(!emailValor){
            validaFalla(email, 'Campo vacío')
        }else if (!validaEmail (emailValor)){
            validaFalla(email, 'El email no es valido')
        }else{
            validaOk(email)
        }
        
    }

    const validaFalla = (input, msje) =>{

        const formControl = input.parentElement;
        const aviso = formControl.querySelector('p');
        aviso.innerText = msje

        formControl.className = 'form-control falla'

    }

    const validaOk = (input, msje) =>{

        const formControl =input.parentElement;
        formControl.className ='form-control ok'

        Swal.fire({
            text: 'Enviado, enseguida nos comunicamos con usted!',
            showConfirmButton: false
          })
    
    }

    const validaEmail = (email) =>{

        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i .test(email);
    
    }

})