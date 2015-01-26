//
//this.cache = {
//    panel:{}
//};
this.throwError = function(msg) {
    Errors.insert({
        msg: msg,
        seen: false
    });
};

this.clearErrors = function() {
    Errors.remove({
        seen: true
    });
};

this.getEditorData = function($el) {
    var str = '';
    var divArr = $el.children();
    for(var i = 0; i< divArr.length; i++) {
        console.log(divArr[0].textContent)
        str += divArr[i].html() + '\n';
    }
    return str;
}
// for editor extend in the future, should write here
var cMeteorEditor = function(id) {
    this.editor = this._createEditor(id);
    this.mk = this._convertMd();
};
(function() {
    this._createEditor = function(id) {
        //if (root.cache.panel[id]) {
        //    return root.cache.panel[id]
        //}
        var editor = ace.edit(id);
        //var renderer = require("ace/virtual_renderer").VirtualRenderer;
        editor.renderer.setShowGutter(false);
        editor.setShowPrintMargin(false);
        editor.$blockScrolling = Infinity;
        editor.renderer.setHighlightGutterLine(false);
        editor.$mouseHandler.$focusWaitTimout = 0;
        editor.$highlightTagPending = true;
        editor.setTheme('ace/theme/chrome');
        editor.getSession().setMode('ace/mode/markdown');
        editor.getSession().setUseWrapMode(true);
        editor.focus();
        editor.setFontSize('16px');
        //root.cache.panel[id] = editor;
        return editor;
    };
    this._convertMd = function() {
        return function(str) {
            var markedOPtion = {
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false,
                langPrefix: 'language-'
            };
            return marked(str, markedOPtion);
        }
    };
}).call(cMeteorEditor.prototype);

this.cEdor = function(id) {
    return new cMeteorEditor(id);
};
