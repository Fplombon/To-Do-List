let input = document.querySelector('input[name=tarefa]');
let btn = document.querySelector('#botao');
let lista = document.querySelector('#lista');
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function incluirTarefa(){

    lista.innerHTML = '';

    for(tarefa of tarefas){
        let itemLista = document.createElement('li');
        itemLista.setAttribute('class','list-group-item list-group-item-action');
        itemLista.ondblclick = function(){
            deletarTarefa(this);
        }
        let itemTexto = document.createTextNode(tarefa);
        itemLista.appendChild(itemTexto);
        lista.appendChild(itemLista);

    }
}

incluirTarefa();

btn.onclick = function() {
    let novaTarefa = input.value;

    if(novaTarefa !== ''){
    tarefas.push(novaTarefa);
    incluirTarefa();

    input.value = '';

    removerSpans();

    salvarDados()

    }else{

        removerSpans();        

        let span = document.createElement('span');

        span.setAttribute('class', 'alert, alert-warning');

        let msg = document.createTextNode('Você precisa informar a tarefa');

        span.appendChild(msg);

        card.appendChild(span);
    }


}


function removerSpans(){
    let spans = document.querySelectorAll('span');
    
    for(let i=0; i < spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tarefa){

    tarefas.splice(tarefas.indexOf(tarefa.textContent),1);

    incluirTarefa();

    salvarDados()
}

function salvarDados(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}




