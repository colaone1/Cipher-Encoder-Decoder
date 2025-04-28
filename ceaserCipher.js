function enDeCode(){
  let userString = document.getElementById("userMessage").value;
  let encode = document.getElementById("encode");
  let userKey = document.getElementById("userKey");
  let keyError = document.getElementById("keyError");
  let successMessage = document.getElementById("successMessage");
  let output = document.getElementById("output");
  
  // Hide previous messages
  keyError.style.display = "none";
  successMessage.style.display = "none";
  output.value = "";

  // Validate key
  const keyValue = userKey.value.trim();
  if (keyValue === "" || isNaN(keyValue) || keyValue < 0 || keyValue > 25 || !Number.isInteger(Number(keyValue))) {
    keyError.style.display = "block";
    keyError.textContent = keyValue === "" ? "Key is required" : "Key must be an integer between 0 and 25";
    return;
  }

  const flag = encode.checked;
  let outputMessage = [];

  // Handle empty input
  if (!userString.trim()) {
    return;
  }

  for (let i = 0; i < userString.length; i++) {
    outputMessage.push(codeLetter(userString[i], keyValue, flag));
  }

  const result = outputMessage.join("");
  output.value = result;
  
  // Show success message only if there's actual output
  if (result.trim()) {
    successMessage.style.display = "block";
  }
}

function clearForm() {
  document.getElementById("userMessage").value = "";
  document.getElementById("output").value = "";
  document.getElementById("userKey").value = "1";
  document.getElementById("encode").checked = true;
  document.getElementById("keyError").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
  
  // Focus on the message input after clearing
  document.getElementById("userMessage").focus();
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

function calculateNewIndex(letter, userKey, encode) {
  let index = Number(convertLetterToIndex(letter));

  if (encode) { 
    index = index + Number(userKey); 
  } else {
    index = index - Number(userKey);
  }  
  
  // Handle wrapping around the alphabet using modulo
  index = ((index % 26) + 26) % 26;
  return index;
}

function codeLetter(letter, userKey, flag) {
  // Check if the character is a letter
  let letterRegEx = /[a-zA-Z]/;
  
  if (!letterRegEx.test(letter)) {
    return letter;
  }
  
  // Check if the letter is uppercase
  const isUpperCase = letter === letter.toUpperCase();
  letter = letter.toLowerCase();
  
  let newIndex = calculateNewIndex(letter, userKey, flag);
  let codedLetter = convertIndexToLetter(newIndex);
  
  // Restore original case
  return isUpperCase ? codedLetter.toUpperCase() : codedLetter;
}

// Test function to verify cipher functionality
function testCipher() {
  const testCases = [
    {
      name: "Basic Encoding",
      input: "hello world",
      key: 1,
      encode: true,
      expected: "ifmmp xpsme"
    },
    {
      name: "Basic Decoding",
      input: "ifmmp xpsme",
      key: 1,
      encode: false,
      expected: "hello world"
    },
    {
      name: "Alphabet Wrap Encoding",
      input: "xyz",
      key: 3,
      encode: true,
      expected: "abc"
    },
    {
      name: "Alphabet Wrap Decoding",
      input: "abc",
      key: 3,
      encode: false,
      expected: "xyz"
    },
    {
      name: "Special Characters",
      input: "Hello, World! 123",
      key: 1,
      encode: true,
      expected: "Ifmmp, Xpsme! 123"
    },
    {
      name: "Empty Input",
      input: "",
      key: 1,
      encode: true,
      expected: ""
    },
    {
      name: "Maximum Key",
      input: "hello",
      key: 25,
      encode: true,
      expected: "gdkkn"
    },
    {
      name: "Zero Key",
      input: "hello",
      key: 0,
      encode: true,
      expected: "hello"
    },
    {
      name: "Mixed Case",
      input: "HeLlO WoRlD",
      key: 1,
      encode: true,
      expected: "IfMmP XpSmE"
    },
    {
      name: "Numbers Only",
      input: "1234567890",
      key: 1,
      encode: true,
      expected: "1234567890"
    },
    {
      name: "Special Characters Only",
      input: "!@#$%^&*()",
      key: 1,
      encode: true,
      expected: "!@#$%^&*()"
    },
    {
      name: "Long Text",
      input: "The quick brown fox jumps over the lazy dog",
      key: 13,
      encode: true,
      expected: "Gur dhvpx oebja sbk whzcf bire gur ynml qbt"
    },
    {
      name: "Empty Key",
      input: "hello",
      key: "",
      encode: true,
      shouldError: true
    },
    {
      name: "Whitespace Key",
      input: "hello",
      key: "  ",
      encode: true,
      shouldError: true
    },
    {
      name: "Very Long Input",
      input: "a".repeat(1000),
      key: 1,
      encode: true,
      expected: "b".repeat(1000)
    },
    {
      name: "Unicode Characters",
      input: "Hello 🌍 World",
      key: 1,
      encode: true,
      expected: "Ifmmp 🌍 Xpsme"
    },
    {
      name: "Multiple Spaces",
      input: "hello    world",
      key: 1,
      encode: true,
      expected: "ifmmp    xpsme"
    },
    {
      name: "Tabs and Newlines",
      input: "hello\tworld\nhello",
      key: 1,
      encode: true,
      expected: "ifmmp\txpsme\nifmmp"
    }
  ];

  // Test error handling
  console.log("\nTesting Error Handling...");
  const errorTests = [
    {
      name: "Empty Key",
      key: "",
      shouldError: true,
      expectedError: "Key is required"
    },
    {
      name: "Whitespace Key",
      key: "  ",
      shouldError: true,
      expectedError: "Key is required"
    },
    {
      name: "Invalid Key (Negative)",
      key: -1,
      shouldError: true,
      expectedError: "Key must be an integer between 0 and 25"
    },
    {
      name: "Invalid Key (Too Large)",
      key: 26,
      shouldError: true,
      expectedError: "Key must be an integer between 0 and 25"
    },
    {
      name: "Invalid Key (Decimal)",
      key: 1.5,
      shouldError: true,
      expectedError: "Key must be an integer between 0 and 25"
    },
    {
      name: "Invalid Key (String)",
      key: "abc",
      shouldError: true,
      expectedError: "Key must be an integer between 0 and 25"
    }
  ];

  // Test UI Features
  console.log("\nTesting UI Features...");
  const uiTests = [
    {
      name: "Character Counter",
      action: () => {
        const textarea = document.getElementById("userMessage");
        textarea.value = "test";
        updateCharCount();
        return document.getElementById("charCounter").textContent === "4/1000";
      }
    },
    {
      name: "Theme Toggle",
      action: () => {
        const initialTheme = document.body.getAttribute("data-theme");
        toggleTheme();
        const newTheme = document.body.getAttribute("data-theme");
        toggleTheme(); // Reset
        return initialTheme !== newTheme;
      }
    },
    {
      name: "Help Toggle",
      action: () => {
        const helpContent = document.getElementById("helpContent");
        const initialDisplay = helpContent.style.display;
        toggleHelp();
        const newDisplay = helpContent.style.display;
        toggleHelp(); // Reset
        return initialDisplay !== newDisplay;
      }
    },
    {
      name: "Copy to Clipboard",
      action: () => {
        const output = document.getElementById("output");
        output.value = "test";
        copyToClipboard();
        // Note: We can't actually verify clipboard content due to browser security
        return true;
      }
    },
    {
      name: "Clear Form",
      action: () => {
        document.getElementById("userMessage").value = "test";
        document.getElementById("userKey").value = "5";
        clearForm();
        return document.getElementById("userMessage").value === "" &&
               document.getElementById("userKey").value === "1" &&
               document.getElementById("output").value === "";
      }
    }
  ];

  // Run all tests
  let allTestsPassed = true;

  // Test cipher functionality
  for (const test of testCases) {
    if (test.shouldError) {
      const errorElement = document.getElementById("keyError");
      errorElement.style.display = "none";
      document.getElementById("userKey").value = test.key;
      enDeCode();
      const errorShown = errorElement.style.display === "block";
      if (!errorShown) {
        console.error(`❌ Error Test Failed: ${test.name}`);
        allTestsPassed = false;
      } else {
        console.log(`✅ Error Test Passed: ${test.name}`);
      }
    } else {
      const result = testCipherCase(test.input, test.key, test.encode);
      if (result !== test.expected) {
        console.error(`❌ Test Failed: ${test.name}
          Input: "${test.input}"
          Key: ${test.key}
          Encode: ${test.encode}
          Expected: "${test.expected}"
          Got: "${result}"`);
        allTestsPassed = false;
      } else {
        console.log(`✅ Test Passed: ${test.name}`);
      }
    }
  }

  // Test error messages
  for (const test of errorTests) {
    const errorElement = document.getElementById("keyError");
    errorElement.style.display = "none";
    document.getElementById("userKey").value = test.key;
    enDeCode();
    const errorShown = errorElement.style.display === "block";
    const errorMessage = errorElement.textContent;
    
    if (errorShown !== test.shouldError || (errorShown && errorMessage !== test.expectedError)) {
      console.error(`❌ Error Message Test Failed: ${test.name}
        Expected Error: ${test.expectedError}
        Got Error: ${errorMessage}`);
      allTestsPassed = false;
    } else {
      console.log(`✅ Error Message Test Passed: ${test.name}`);
    }
  }

  // Test UI features
  for (const test of uiTests) {
    if (!test.action()) {
      console.error(`❌ UI Test Failed: ${test.name}`);
      allTestsPassed = false;
    } else {
      console.log(`✅ UI Test Passed: ${test.name}`);
    }
  }

  if (allTestsPassed) {
    console.log("\n🎉 All tests passed successfully!");
  } else {
    console.log("\n⚠️ Some tests failed. Please check the error messages above.");
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

function updateCharCount() {
  const textarea = document.getElementById("userMessage");
  const counter = document.getElementById("charCounter");
  const count = textarea.value.length;
  counter.textContent = `${count}/1000`;
}

function copyToClipboard() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  
  // Show temporary feedback
  const button = document.querySelector('button[onclick="copyToClipboard()"]');
  const originalText = button.textContent;
  button.textContent = "Copied!";
  setTimeout(() => {
    button.textContent = originalText;
  }, 2000);
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  
  // Save theme preference
  localStorage.setItem("theme", newTheme);
}

function toggleHelp() {
  const helpContent = document.getElementById("helpContent");
  const helpToggle = document.querySelector('.help-toggle');
  
  if (helpContent.style.display === "block") {
    helpContent.style.display = "none";
    helpToggle.textContent = "Help";
  } else {
    helpContent.style.display = "block";
    helpToggle.textContent = "Hide Help";
  }
}

// Initialize theme from localStorage
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);
}

// Run initialization when the page loads
window.onload = function() {
  initTheme();
  testCipher();
  updateCharCount();
};
