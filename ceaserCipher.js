function enDeCode(){
  let userString = document.getElementById("userMessage").value;
  let encode = document.getElementById("encode");
  let userKey = document.getElementById("userKey").value;
  let cleanString = userString.trim().toLowerCase();
  let outputMessage = [];
  let flag = true;

  // Validate key
  if (userKey < 0 || userKey > 25) {
    document.getElementById("output").value = "Error: Key must be between 0 and 25";
    return;
  }

  if (encode.checked) {
    flag = true;
  } else{
  flag = false;
  }
  for (let i = 0; i < cleanString.length; i++){
    outputMessage.push(codeLetter(cleanString[i], userKey, flag));
  }

  document.getElementById("output").value = outputMessage.join("");
}

function clearForm() {
  document.getElementById("userMessage").value = "";
  document.getElementById("output").value = "";
  document.getElementById("userKey").value = "1";
  document.getElementById("encode").checked = true;
}

function convertIndexToLetter(index){
  let alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z"];
  let letter = alphabet[index];
  return letter;
}

function convertLetterToIndex(letter){
  let alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z"];
  index = alphabet.indexOf(letter);
  return index;
}

function calculateNewIndex(letter, userKey, encode){
  let index = Number(convertLetterToIndex(letter));

  if (encode) { 
    index = index + Number(userKey); 
  } else {
    index = index - Number(userKey);
  }  
  
  // Handle wrapping around the alphabet
  if (index > 25) {
    index = index % 26;
  } else if (index < 0) {
    index = (index % 26 + 26) % 26;
  }
  return index;
}

function codeLetter(letter, userKey, flag){
  //deal with non letter like space or number
  let letterRegEx = /[^a-z]/;
  
  if (letterRegEx.test(letter)){
    return letter;
  } else {
    let newIndex = calculateNewIndex(letter, userKey, flag);
    let codedLetter = convertIndexToLetter(newIndex);
    return codedLetter;
  }
};

// Test function to verify cipher functionality
function testCipher() {
  const testCases = [
    {
      input: "hello world",
      key: 1,
      encode: true,
      expected: "ifmmp xpsme"
    },
    {
      input: "ifmmp xpsme",
      key: 1,
      encode: false,
      expected: "hello world"
    },
    {
      input: "xyz",
      key: 3,
      encode: true,
      expected: "abc"
    },
    {
      input: "abc",
      key: 3,
      encode: false,
      expected: "xyz"
    },
    {
      input: "Hello, World! 123",
      key: 1,
      encode: true,
      expected: "ifmmp, xpsme! 123"
    }
  ];

  let allTestsPassed = true;
  for (const test of testCases) {
    const result = testCipherCase(test.input, test.key, test.encode);
    if (result !== test.expected) {
      console.error(`Test failed:
        Input: ${test.input}
        Key: ${test.key}
        Encode: ${test.encode}
        Expected: ${test.expected}
        Got: ${result}`);
      allTestsPassed = false;
    }
  }

  if (allTestsPassed) {
    console.log("All cipher tests passed!");
  }
}

function testCipherCase(input, key, encode) {
  let outputMessage = [];
  const cleanString = input.trim().toLowerCase();
  
  for (let i = 0; i < cleanString.length; i++) {
    outputMessage.push(codeLetter(cleanString[i], key, encode));
  }
  
  return outputMessage.join("");
}

// Run tests when the page loads
window.onload = function() {
  testCipher();
};
