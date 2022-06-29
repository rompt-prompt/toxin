show = function dropDawn() {
    
    document.onclick = function(event){
        var element = event.target.id;
        console.log('Это ' + element);
        document.getElementById(element).classList.toggle('dropdawn__btn_opened');
        document.getElementById(element +'Content').classList.toggle('show');
    }
}