const numeroPersonagens = 3;
const conteudo = document.querySelector('#conteudo');
const botao = document.querySelector('button');

traduzirCondicao = (data) => {
    if (data.status == 'unknown') {
        return 'Não sabemos';
    } else if (data.status == 'Alive') {
        return 'Sim';
    } else {
        return 'Não. Está morto';
    }
}

gerarValorAleatorio = () => {
    return Math.floor(Math.random() * 671);
}

criarItem = (texto) => {
    const li = document.createElement("li");
    const element = document.createElement("p");
    element.innerHTML = texto;
    li.appendChild(element);
    return li;
}

pegarPersonagem = () => {
    conteudo.innerHTML = "";
    for (i = 0; i < numeroPersonagens; i++) {
        let numeroAleatorio = gerarValorAleatorio();
        fetch(`https://rickandmortyapi.com/api/character/${numeroAleatorio}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Content-type": 'application/json'
            }
        }).then((response) => response.json()).then((data) => {
            const imagem = document.createElement("img");
            imagem.src = data.image;
            imagem.alt = data.name;
            const container = document.createElement("ul");
            container.classList.add("detalhes-container");
            const nomeDoPersonagem = criarItem(data.name);
            const especie = criarItem(data.species);
            const condicao = criarItem(traduzirCondicao(data));
            container.appendChild(nomeDoPersonagem);
            container.appendChild(especie);
            container.appendChild(condicao);
            const personagem = document.createElement("artiicle");
            personagem.appendChild(imagem);
            personagem.appendChild(container);
            conteudo.appendChild(personagem);
        });
    }
}

botao.onclick = pegarPersonagem;