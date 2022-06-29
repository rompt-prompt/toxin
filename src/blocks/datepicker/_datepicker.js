import AirDatepicker from 'air-datepicker'

let apply = {
    content: 'Применить',    
}

let navTitle = {
    days: 'MMMM yyyy',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2' 
}

new AirDatepicker('#dpContent', {
    inline: true,
    range: true,
    multipleDatesSeparator: ' - ',
    dateFormat: 'd MMM',
    buttons: ['clear', apply],
    navTitles: navTitle,
    prevHtml: 'arrow_back',
    nextHtml: 'arrow_forward',
    toggleSelected: false,
});