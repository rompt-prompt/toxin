var exception = [
    'searchDateFrom',
    'searchDateTo',
    'bookingDateFrom',
    'bookingDateTo',
]

show = function dropDawn() {
    
    document.onclick = function(event){
        var element = event.target.id;
        if (exception.includes(element)) {}
        else {
            document.getElementById(element).classList.toggle('dropdawn__btn_opened-border');
        }
        document.getElementById(element).classList.toggle('dropdawn__btn_opened-arrow');
        document.getElementById(element +'Content').classList.toggle('show');
    }
}