show = function dropDawn() {
    
    document.onclick = function(event){
        var element = event.target.id;
        console.log('Это ' + element);
        document.getElementById(element +'Content').classList.toggle('show');
    }
}