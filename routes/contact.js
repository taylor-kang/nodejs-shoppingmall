var express = require('express');
var router  = express.Router();
var ContactsModel = require('../models/ContactsModel');

router.get('/', function (req,res) {
    res.send('admin app');
});

router.get('/contacts', function(req,res){
    ContactsModel.find(function(err,products){
        res.render( 'contacts/' ,
            { contacts : contacts } // DB에서 받은 products를 products변수명으로 내보냄
        );
    });
});

router.get('/contacts/write', function(req,res){
    res.render( 'contacts/form', { product : "" });
});

router.post('/contacts/write', function(req,res){
    var contact = new ContactsModel({
        name : req.body.name,
        description : req.body.description,
    });
    contact.save(function(err){
        res.redirect('/contacts');
    });
});


/*
router.get('/products/detail/:id' , function(req, res){
    //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
    ProductsModel.findOne( { 'id' :  req.params.id } , function(err ,product){
        res.render('admin/productsDetail', { product: product });
    });
});

router.get('/products/edit/:id' ,function(req, res){
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ProductsModel.findOne({ id : req.params.id } , function(err, product){
        res.render('admin/form', { product : product });
    });
});

router.post('/products/edit/:id', function(req, res){
    //넣을 변수 값을 셋팅한다
    var query = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
    };

    //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
    ProductsModel.update({ id : req.params.id }, { $set : query }, function(err){
        res.redirect('/admin/products/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
    });
});

router.get('/products/delete/:id', function(req, res){
    ProductsModel.remove({ id : req.params.id }, function(err){
        res.redirect('/admin/products');
    });
});
*/

module.exports = router;