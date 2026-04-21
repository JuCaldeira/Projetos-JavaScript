function limpar(){
    let carrinho = document.getElementById('lista-produtos');
    let total = document.getElementById('valor-total');
    carrinho.textContent = "";
    total.textContent = "R$0";
}

let totalGeral = 0;

function adicionar(){
    //recupero o valor. Ex:Fone de ouvido - R$100 e divido em duas Strings
    let produto = document.getElementById('produto').value;
    let nomeProduto = produto.split('-')[0];
    let valorUnitario = produto.split('R$')[1];
    //pego o valor digitado na input QTDE
    let quantidade = document.getElementById('quantidade').value;//.value pega o valor

    if(quantidade == ""){
        alert('Favor inserir uma quantidade');
    } else{
        let preco = quantidade * valorUnitario;
   
        //cada item no carrinho é representado pela tag section
        let carrinho = document.getElementById('lista-produtos');
        //apago a descrição atual e adiciono uma nova section completa dentro dessa tag
        carrinho.innerHTML = carrinho.innerHTML + `<section class="carrinho__produtos__produto">
        <span class="texto-azul">${quantidade}x</span> ${nomeProduto} <span class="texto-azul">R$${preco}</span>
    </section>`
    
        //para gerar o valor QTDE
        document.getElementById('quantidade').value = '';
        totalGeral = totalGeral + preco;
        let total = document.getElementById('valor-total');
        total.innerText = `R$ ${totalGeral}`;
        
    }

    
        
   


    
    
         
    


}