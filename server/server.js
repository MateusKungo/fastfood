import express, { json } from 'express'
import mysql from 'mysql'
import cors from 'cors'
const app=express()
app.use(cors())
app.use(json())
const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:'',
    database:'db_fastFood'

})
app.get('/',(req,res)=>{
    const sql='SELECT *FROM tb_produtos'
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:"Erro no servidor"})
        return res.json(result)
    })
})
app.post('/product', (req, res) => {
    const sql = 'INSERT INTO tb_produtos(`nome_produtos`,`preco_produto`,`quantidade_produto`,`data_registo`) VALUES (?)';
    console.log(req.body);
    const values = [
        req.body.Nome_produtos,
        req.body.Preco_produto,
        req.body.Quantidade_produto,
        req.body.Data_registo
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json({ Message: "Erro no servidor" });
        return res.json(result);
    });
});
app.get('/detalhes/:id_produtos',(req,res)=>{
    const sql='SELECT *FROM tb_produtos WHERE id_produtos=?'

    const id_produtos=req.params.id_produtos

    db.query(sql, [id_produtos], (err,result)=>{
        if(err) return res.json({Message:"Erro no servidor"})
        return res.json(result)
    })
})
app.put('/update/:id_produtos',(req,res)=>{

    const sql='UPDATE tb_produtos SET `nome_produtos`=?, `preco_produto`=?,`quantidade_produto`=?,`data_registo`=?, WHERE `id_produtos`=?'
    const id_produto=req.params.id_produto
    const values = [
        req.body.Nome_produtos,
        req.body.Preco_produto,
        req.body.Quantidade_produto,
        req.body.Data_registo
    ];
    db.query(sql,[values, id_produto], (err ,result)=>{
        if(err) return res.json({Message:"Erro no servidor"}) 
        return res.json(result)
    })
})




app.listen(8081,()=>{
    console.log("Liste")
})