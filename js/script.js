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

  // remove attributes by check values
  generation_order = check_and_remove(generation_order, date_check, "Date");
  generation_order = check_and_remove(generation_order, organization_check, "Organization");
  generation_order = check_and_remove(generation_order, author_check, "Author");
  generation_order = check_and_remove(generation_order, category_check, "Category");
  generation_order = check_and_remove(generation_order, title_check, "Title");
  generation_order = check_and_remove(generation_order, version_check, "Version");
  console.log("checked attributes: " + generation_order);

  // loop over attributes
  output = [];
  for (var i = 0; i < generation_order.length; i++) {
    console.log(i + ": " + generation_order[i])
    switch (generation_order[i]) {
      case "Date":
        // generate different timestamps
        var year = (dateEntered.getFullYear()).toString();
        var month = (dateEntered.getMonth()+1).toString();
        var day = (dateEntered.getDate()).toString();
        switch (date_format) {
          case "YYYYMMDD":
            output.push(('0000'+year).slice(-4) +
                        ('00'+month).slice(-2) + 
                        ('00'+day).slice(-2));
            break;
          case "YYYY-MM-DD":
            output.push(('0000'+year).slice(-4) + "-" +
                        ('00'+month).slice(-2) + "-" +
                        ('00'+day).slice(-2));
            break;
          case "YYYYMM":
            output.push(('0000'+year).slice(-4) +
                        ('00'+month).slice(-2));
            break;
          case "YYYY-MM":
            output.push(('0000'+year).slice(-4) + "-" +
                        ('00'+month).slice(-2));
            break;
          case "YYYY":
            output.push(('0000'+year).slice(-4));
            break;
          case "YY":
            output.push(('0000'+year).slice(-4).slice(-2));
            break;
        }
        break;
      case "Organization":
        output.push(convertByTechnicalNamingConventions(organization_text));
        break;
      case "Author":
         output.push(convertByTechnicalNamingConventions(author_text));
        break;
      case "Category":
        output.push(convertByTechnicalNamingConventions(category_text));
        break;
      case "Title":
        output.push(convertByTechnicalNamingConventions(title_text));
        break;
      case "Version":
        output.push(convertByTechnicalNamingConventions(version_text));
        break;
    }
  }

  // get joint character and make output
  switch (joint_character) {
    case "\"_\" underscore":
      joint_character = "_";
      break;
    case "\"-\" hyphen":
      joint_character = "-";
      break;
    case "\"+\" plus":
      joint_character = "+";
      break;
    case "\" \" space":
      joint_character = " ";
      break;
  }

  // create output and send to form
  if (joint_character != "CamelCase") {
    // concatinate output string
    output_string = output.join(joint_character);

    // remove joint_character at specific position
    if (joint_exception > 0 && joint_exception < output.length) {
      String.prototype.removeStr = removeStr;
      output_string = removeStr(output_string, joint_character, joint_exception);
    }
  }
  else {
    // create CamelCase
    for (var i = 0; i < output.length; i++) {
      output[i] = output[i].charAt(0).toUpperCase() + output[i].slice(1)
    }
    output_string = output.join("");
  }

  // output to form
  document.getElementById('output_generated_file_name').value = output_string;
}

function convertText() {
  var text = document.getElementById("input_old_name").value;
  if (text.length > 0) {
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

function check_and_remove(list, check, listelement) {
  if (!check) {
    const index = list.indexOf(listelement);
    if (index > -1) {
      list.splice(index, 1);
    }
    return list;
  }
  else {
    return list;
  }
}

// source: https://www.tutorialspoint.com/string-function-to-replace-nth-occurrence-of-a-character-in-a-string-javascript
function removeStr(text, subStr, num){
   if(!text.includes(subStr)){
      return text;
   }
   var start = 0; 
   var end = subStr.length;
   var occurences = 0;
   for(; ;end < text.length){
      if(text.substring(start, end) == subStr){
         occurences++;
      };
      if(occurences == num){
         return text.substring(0, start) + text.substring(end, text.length);
      };
      end++;
      start++;
   }
   return text;
}