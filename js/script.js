// author: Kevin Lang
// email:  kevin.lang@uni-weimar.de

function convertText() {
  var text = document.getElementById("input_old_name").value;
  if(text.length > 0) {
    text = convertByTechnicalNamingConventions(text);
    document.getElementById('output_converted_file_name').value = text;
    document.getElementById('error_length').innerHTML = '';
    if(text.length > 200) {
      document.getElementById('error_length').innerHTML = 'WARNING: length of name is ' + text.length + ' characters. Total max size including path is 256 on most operating systems.';
    }
  }
  else{
    document.getElementById('output_converted_file_name').value = 'nothing to convert';
  }
}

function convertByTechnicalNamingConventions(str) {
  // lower case
  str = str.toLowerCase();
  // no special characters
  str = str.replace(/[#\”‘'"*,;=!?&%$<>(){}\[\]|\\\/]/g,'');
  // all seperators to underscore
  str = str.replace(/[.:~ +-]/g,'_').replace(/__+/g, '_');
  // replace umlauts and language specific characters
  str = substituteLanguageSecificCharacters(str);

  return str;
}

//source: https://gist.github.com/marcelo-ribeiro/abd651b889e4a20e0bab558a05d38d77
function substituteLanguageSecificCharacters(str) {
    var map = {
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|Ú|Ù|Û',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ',

        'ae': 'ä',
        'Ae': 'Ä',
        'oe': 'ö',
        'Oe': 'Ö',
        'ue': 'ü',
        'Ue': 'Ü',
        'ss': 'ß'
    };
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
}