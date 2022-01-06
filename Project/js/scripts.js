var kindle = [];
var audible = [];
var both = [];
var currenttab = "kindle";

$('document').ready(
    function(){
        getData(currenttab);

        $("ul#booktype li a").click(function(){
        //    alert(this.text);
            $("ul#booktype li").each(function(){
                $(this).removeClass("active");
            });
            $(this).parent().addClass("active");
            $("#content h2").text(this.text);

            currenttab = this.text.toLowerCase();
            
            if(window[currenttab] && window[currenttab].length == 0){
                getData(currenttab);
            } else {
                buildTable(window[currenttab]);
            }

        });
    }
);

function getData(booktype){
   // http://api.jquery.com/jQuery.getJSON/
   var bookurl = "datastorage/" + booktype + ".json";
   $.getJSON( bookurl, function( data ) {
        window[booktype] = data.books;
        buildTable(data.books);
   });
}
function buildTable(books){
    var thtml = '';
    for(var i = 0; i < books.length; i++){
        var book = books[i];
        thtml += '<tr>';
        thtml += '<td>' + book.title + '</td>';
        thtml += '<td>' + book.author + '</td>';
        thtml += '<td><img src="' + book.image + '" /></td>';
        thtml += '</tr>';
    }
    $('table#listing tbody').html(thtml);
}