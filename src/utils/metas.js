/**
 * Created by UKfire on 17/2/7.
 */

var CodeMirrorMetas = {
    modeInfo: [
        {name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h"]},
        {name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"]},
        {name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp"]},
        {name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists.txt$/},
        {name: "CSS", mime: "text/css", mode: "css", ext: ["css"]},
        {name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"]},
        {name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"]},
        {name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"]},
        {name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"]},
        {name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"]},
        {name: "MySQL", mime: "text/x-mysql", mode: "sql"},
        {name: "Objective C", mime: "text/x-objectivec", mode: "clike", ext: ["m", "mm"], alias: ["objective-c", "objc"]},
        {name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"]},
        {name: "PHP", mime: "application/x-httpd-php", mode: "php", ext: ["php", "php3", "php4", "php5", "phtml"]},
        {name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"]},
        {name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/},
        {name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r", "R"], alias: ["rscript"]},
        {name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"]},
        {name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"]},
        {name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"]},
        {name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"]},
        {name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"]},
        {name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"]},
        {name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"]},
        {name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"]},
        {name: "Vue.js Component", mimes: ["script/x-vue", "text/x-vue"], mode: "vue", ext: ["vue"]},
        {name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd"], alias: ["rss", "wsdl", "xsd"]},
    ]
}

// Ensure all modes have a mime property for backwards compatibility
for (var i = 0; i < CodeMirrorMetas.modeInfo.length; i++) {
    var info = CodeMirrorMetas.modeInfo[i];
    if (info.mimes) info.mime = info.mimes[0];
}

CodeMirrorMetas.findModeByMIME = function(mime) {
    mime = mime.toLowerCase()
    for (var i = 0; i < CodeMirrorMetas.modeInfo.length; i++) {
        var info = CodeMirrorMetas.modeInfo[i]
        if (info.mime == mime) return info
        if (info.mimes) for (var j = 0; j < info.mimes.length; j++)
            if (info.mimes[j] == mime) return info
    }
}

CodeMirrorMetas.findModeByExtension = function(ext) {
    for (var i = 0; i < CodeMirrorMetas.modeInfo.length; i++) {
        var info = CodeMirrorMetas.modeInfo[i]
        if (info.ext) for (var j = 0; j < info.ext.length; j++)
            if (info.ext[j] == ext) return info
    }
}

CodeMirrorMetas.findModeByFileName = function(filename) {
    for (var i = 0; i < CodeMirrorMetas.modeInfo.length; i++) {
        var info = CodeMirrorMetas.modeInfo[i]
        if (info.file && info.file.test(filename)) return info
    }
    var dot = filename.lastIndexOf(".")
    var ext = dot > -1 && filename.substring(dot + 1, filename.length)
    if (ext) return CodeMirrorMetas.findModeByExtension(ext)
}

CodeMirrorMetas.findModeByName = function(name) {
    name = name.toLowerCase()
    for (var i = 0; i < CodeMirrorMetas.modeInfo.length; i++) {
        var info = CodeMirrorMetas.modeInfo[i]
        if (info.name.toLowerCase() == name) return info
        if (info.alias) for (var j = 0; j < info.alias.length; j++)
            if (info.alias[j].toLowerCase() == name) return info
    }
}

module.exports = CodeMirrorMetas
