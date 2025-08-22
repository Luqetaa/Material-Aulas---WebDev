// Dados de exemplo dos posts
let posts = [
    {
        text: "Este é o primeiro post",
        category: "Notícias",
        image: "https://placedog.net/150?random=1",
        date: "12/10/2021 12:00:00"
    },
    {
        text: "Este é o segundo post",
        category: "Dicas",
        image: "https://placedog.net/150?random=2",
        date: "12/10/2022 12:00:00"
    },
    {
        text: "Este é o terceiro post teste",
        category: "Eventos",
        date: "12/10/2023 12:00:00"
    }
];

window.onload = function(){
    carregarPosts();
    mostrarPost();
    document.querySelector('#postForm').addEventListener('submit',addPost)
    document.querySelector('#postList').addEventListener('click', handleClick)

    // localStorage.setItem("nome", "Fulano");
    // console.log(localStorage.getItem("nome"));
    // localStorage.removeItem("nome");
    // localStorage.clear();

}

function handleClick(infosDoEvento){

    const action = infosDoEvento.target.dataset.action;
    const index = infosDoEvento.target.dataset.index;

    if(action === "Editar"){
        editarPost(index)
    }
    else if(action === "Apagar"){
        apagarPost(index)
    }

}

//Create
function addPost(infosDoEvento){
    infosDoEvento.preventDefault();

    const textoPost = document.querySelector("#postText").value;
    const categoriaPost = document.querySelector("#postCategory").value;
    const imagemPost = document.querySelector("#postImage").value;
    const dataPost = new Date().toLocaleString();

    const novoPost = {
        text: textoPost,
        category: categoriaPost,
        image: imagemPost,
        date: dataPost,
    }

    posts.unshift(novoPost);
    salvarPosts();

    document.querySelector('#postForm').reset();

    mostrarPost()

}
//Read
function mostrarPost(){
    //pega a div q vao aparecer os posts
    const listaPosts = document.querySelector("#postList")
    listaPosts.innerHTML = ""

    //passa em cada item do array criando um tweet
    posts.forEach((pegaItem, index) =>{
        const cardPost = document.createElement("div")
        cardPost.classList.add("card")

        cardPost.innerHTML = `
        <h2>${pegaItem.text}</h2>
        <img src="${pegaItem.image}"/>
        <p> Categoria:${pegaItem.category}</p>
        <p> Data e Hora:${pegaItem.date}</p>
        <button data-action="Editar" data-index="${index}">Editar</button>
        <button data-action="Apagar" data-index="${index}">Apagar</button>
        `
        //adiciona o tweet e html
        listaPosts.append(cardPost)

        // mostrarPost()
    })

}
//Update
function editarPost(index){
    const novoTexto = prompt('Edite o conteúdo do post :)');
    posts [index].text = novoTexto;

    mostrarPost();

}
//Delete 
function apagarPost(index){
    const confirmar = confirm("Voce deseja mesmo isso?? 0_o")
    if(confirmar){
        posts.splice(index, 1);
    }
    
    salvarPosts();
    mostrarPost();

}

function salvarPosts(){
    localStorage.setItem("posts", JSON.stringify(posts));
}

function carregarPosts(){
    const postsGuardados = localStorage.getItem("posts");
    if (postsGuardados) {
       posts = JSON.parse(postsGuardados)
    }
}

