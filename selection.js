chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getSelection") {
        // console.log("entered get selection");
        var count = window.getSelection().rangeCount;
        // console.log("range count is: ", count);
        // alert(string);
        // alert(window.getSelection().rangeCount);
        if (count > 0) {
            var selection = window.getSelection();
            var range = selection.getRangeAt(0);
            var startPos = range.startOffset;
            var endPos = range.endOffset;
            console.log("start position is", startPos, range);

            var mainString = selection.focusNode.parentElement.innerHTML;
            var finalString = mock_case(mainString, startPos, endPos);
            var string = "testo";
            // console.log("string is", range.toString());
            // range.deleteContents();
            // console.log("replacing contents with", string)
            var newNode = document.createTextNode('p');
            // var newNode = document.createElement('p');
            // newNode.innerHTML = string;
            console.log(selection);
            console.log(selection.anchorNode.id);
            console.log(finalString);
            alert(finalString);
            // selection.empty();
            selection.focusNode.parentElement.innerHTML = finalString;
            // range.insertNode(newNode);
        }
            // var selectionContents = range.extractContents();
        // alert("on the gang");
        // alert(selectionContents.innerHTML);
        sendResponse({data: window.getSelection().toString()});
    }
    else
        sendResponse({}); // snub them.
});

function mock_case(string, start, end) {
    var final = "";
    for (i = 0; i < string.length; i++) {
        var char = string[i];
        if (i < start || i >= end) {
            final += char;
        } else {
            var rand = Math.floor(Math.random() * 2);
            if (rand == 0) {
                final += char.toUpperCase();
            } else {
                final += char.toLowerCase();
            }
        }
    }
    return final;
}