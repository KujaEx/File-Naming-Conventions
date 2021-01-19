// author: Kevin Lang
// email:  kevin.lang@uni-weimar.de

function generateText() {
  //get date
  var date_text = document.getElementById("input_date").value;
  var dateEntered = new Date(date_text);
  var date_format = document.getElementById("input_date_format").value;
  var date_check = false;
  if (document.getElementById('input_date_check').checked) {date_check = true;} 
  console.log("input_date_text: " + date_text);
  console.log("input_date_format: " + date_format);
  console.log("input_date_check: " + date_check);

  // get organization
  var organization_text = document.getElementById("input_organization").value;
  var organization_check = false;
  if (document.getElementById('input_organization_check').checked) {organization_check = true;} 
  console.log("input_organization_text: " + organization_text);
  console.log("input_organization_check: " + organization_check);

  // get author
  var author_text = document.getElementById("input_author").value;
  var author_check = false;
  if (document.getElementById('input_author_check').checked) {author_check = true;} 
  console.log("input_author_text: " + author_text);
  console.log("input_author_check: " + author_check);

  // get category
  var category_text = document.getElementById("input_category").value;
  var category_check = false;
  if (document.getElementById('input_category_check').checked) {category_check = true;} 
  console.log("input_category_text: " + category_text);
  console.log("input_category_check: " + category_check);

  // get title
  var title_text = document.getElementById("input_title").value;
  var title_check = false;
  if (document.getElementById('input_title_check').checked) {title_check = true;} 
  console.log("input_title_text: " + title_text);
  console.log("input_title_check: " + title_check);

  // get version
  var version_text = document.getElementById("input_version").value;
  var version_check = false;
  if (document.getElementById('input_version_check').checked) {version_check = true;} 
  console.log("input_version_text: " + version_text);
  console.log("input_version_check: " + version_check);

  // get options: order
  var input_order = Array.prototype.slice.call(document.getElementById("generation_order").getElementsByTagName("li"));
  var generation_order = [];
  for (var i = 0; i < input_order.length; i++) {
    generation_order[i] = input_order[i].innerHTML;
  }
  console.log("generation_order: " + generation_order);

  // get options: joint character
  var joint_character = document.getElementById("input_joint_character").value;
  console.log("joint character: " + joint_character);

  // get options: joint exception
  var joint_exception = document.getElementById("input_joint_exception").value;
  console.log("joint exception at: " + joint_exception);

  // start generating name ...

}

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