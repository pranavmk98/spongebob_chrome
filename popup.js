$(function(){
    $('#paste').click(function(){pasteSelection();});
});


function replaceSelectedText(replacementText) {
    var sel, range;
    // alert(1);
    // console.log("in here 0");
    chrome.extension.getBackgroundPage().console.log('foo');
    if (window.getSelection()) {
        alert("in here");
        var range = window.getSelection().getRangeAt(0);
        var selectionContents = range.extractContents();
        // sel = window.getSelection().toString();
        // console.log("in here");
        alert(selectionContents);
        // if (sel.rangeCount) {
            // alert(3);
        // range = sel.getRangeAt(0);
        // range.deleteContents();
        // range.insertNode(document.createTextNode(replacementText));
        // }
    } else if (document.selection && document.selection.createRange) {
        alert("in there");
        range = document.selection.createRange();
        range.text = replacementText;
    }
}

function pasteSelection() {
    // console.log("in here 0");
    chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
    function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
        function(response){
            // console.log("got here");
            // alert(0);
            var text = document.getElementById('text');
            // replaceSelectedText("llerler");
            // text.innerHTML = response.data;
        });
    });
}