/**
 * Main function to encode or decode text using the Rolling Caesar Cipher
 * Handles input validation, error messages, and output generation
 */
function enDeCode() {
  // Get input elements and values
  let userString = document.getElementById("userMessage").value;
  let encode = document.getElementById("encode");
  let baseKey = document.getElementById("baseKey");
  let incrementKey = document.getElementById("incrementKey");
  let keyError = document.getElementById("keyError");
  let successMessage = document.getElementById("successMessage");
  let output = document.getElementById("output");
  
  // Hide previous messages
  keyError.style.display = "none";
  successMessage.style.display = "none";
  output.value = "";

  // Validate base key input
  const baseKeyValue = parseInt(baseKey.value.trim());
  if (isNaN(baseKeyValue) || baseKeyValue < 0 || baseKeyValue > 25) {
    keyError.style.display = "block";
    keyError.textContent = "Base key must be an integer between 0 and 25";
    return;
  }

  // Validate increment key input
  const incrementKeyValue = parseInt(incrementKey.value.trim());
  if (isNaN(incrementKeyValue) || incrementKeyValue < 0 || incrementKeyValue > 25) {
    keyError.style.display = "block";
    keyError.textContent = "Increment key must be an integer between 0 and 25";
    return;
  }

  // Handle empty input
  if (!userString.trim()) {
    return;
  }

  // Process each character in the input string
  const flag = encode.checked;
  let outputMessage = [];
  for (let i = 0; i < userString.length; i++) {
    // Calculate the current key by adding the increment for each position
    const currentKey = (baseKeyValue + (i * incrementKeyValue)) % 26;
    outputMessage.push(codeLetter(userString[i], currentKey, flag));
  }

  // Display results
  const result = outputMessage.join("");
  output.value = result;
  
  // Show success message if there's actual output
  if (result.trim()) {
    successMessage.style.display = "block";
  }
}

/**
 * Clears all form inputs and resets the UI state
 */
function clearForm() {
  document.getElementById("userMessage").value = "";
  document.getElementById("output").value = "";
  document.getElementById("baseKey").value = "1";
  document.getElementById("incrementKey").value = "1";
  document.getElementById("encode").checked = true;
  document.getElementById("keyError").style.display = "none";
  document.getElementById("successMessage").style.display = "none";
  
  // Focus on the message input after clearing
  document.getElementById("userMessage").focus();
}

/**
 * Converts a numeric index to its corresponding letter in the alphabet
 * @param {number} index - The index to convert (0-25)
 * @returns {string} The corresponding letter
 */
function convertIndexToLetter(index) {
  const alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z"];
  return alphabet[index];
}

/**
 * Converts a letter to its corresponding index in the alphabet
 * @param {string} letter - The letter to convert
 * @returns {number} The corresponding index (0-25)
 */
function convertLetterToIndex(letter) {
  const alphabet = ["a", "b", "c", "d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x", "y","z"];
  return alphabet.indexOf(letter);
}

/**
 * Calculates the new index after applying the Caesar Cipher shift
 * @param {string} letter - The letter to shift
 * @param {number} userKey - The shift key (0-25)
 * @param {boolean} encode - Whether to encode (true) or decode (false)
 * @returns {number} The new index after shifting
 */
function calculateNewIndex(letter, userKey, encode) {
  let index = Number(convertLetterToIndex(letter));

  // Apply shift based on encode/decode
  if (encode) { 
    index = index + Number(userKey); 
  } else {
    index = index - Number(userKey);
  }  
  
  // Handle wrapping around the alphabet using modulo
  index = ((index % 26) + 26) % 26;
  return index;
}

/**
 * Applies the Caesar Cipher to a single character
 * @param {string} letter - The character to process
 * @param {number} userKey - The shift key (0-25)
 * @param {boolean} flag - Whether to encode (true) or decode (false)
 * @returns {string} The processed character
 */
function codeLetter(letter, userKey, flag) {
  // Check if the character is a letter
  const letterRegEx = /[a-zA-Z]/;
  
  if (!letterRegEx.test(letter)) {
    return letter;
  }
  
  // Check if the letter is uppercase
  const isUpperCase = letter === letter.toUpperCase();
  letter = letter.toLowerCase();
  
  // Calculate and apply the shift
  let newIndex = calculateNewIndex(letter, userKey, flag);
  let codedLetter = convertIndexToLetter(newIndex);
  
  // Restore original case
  return isUpperCase ? codedLetter.toUpperCase() : codedLetter;
}

/**
 * Updates the character counter display
 */
function updateCharCount() {
  const textarea = document.getElementById("userMessage");
  const counter = document.getElementById("charCounter");
  const count = textarea.value.length;
  counter.textContent = `${count}/1000`;
}

/**
 * Copies the output text to the clipboard
 */
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

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  body.setAttribute("data-theme", newTheme);
  
  // Save theme preference
  localStorage.setItem("theme", newTheme);
}

/**
 * Toggles the visibility of the help section
 */
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

/**
 * Initializes the theme from localStorage
 */
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-theme", savedTheme);
}

// Initialize the application when the page loads
window.onload = function() {
  initTheme();
  testCipher();
  updateCharCount();
};

/**
 * Test function to verify cipher functionality
 */
function testCipher() {
  console.log("Running cipher tests...");
  
  // Test cases for rolling cipher
  const testCases = [
    {
      name: "Basic Encoding with Rolling Key",
      input: "hello",
      baseKey: 1,
      incrementKey: 1,
      encode: true,
      expected: "igpmo"
    },
    {
      name: "Basic Decoding with Rolling Key",
      input: "igpmo",
      baseKey: 1,
      incrementKey: 1,
      encode: false,
      expected: "hello"
    },
    {
      name: "Alphabet Wrap with Rolling Key",
      input: "xyz",
      baseKey: 1,
      incrementKey: 2,
      encode: true,
      expected: "yac"
    },
    {
      name: "Special Characters with Rolling Key",
      input: "Hello, World!",
      baseKey: 1,
      incrementKey: 1,
      encode: true,
      expected: "Igpmo, Xpsme!"
    },
    {
      name: "Empty Input",
      input: "",
      baseKey: 1,
      incrementKey: 1,
      encode: true,
      expected: ""
    },
    {
      name: "Large Keys",
      input: "hello",
      baseKey: 25,
      incrementKey: 25,
      encode: true,
      expected: "gdkkn"
    },
    {
      name: "Zero Keys",
      input: "hello",
      baseKey: 0,
      incrementKey: 0,
      encode: true,
      expected: "hello"
    },
    {
      name: "Mixed Case with Rolling Key",
      input: "HeLlO",
      baseKey: 1,
      incrementKey: 1,
      encode: true,
      expected: "IgPmO"
    }
  ];

  // Test error handling
  const errorTests = [
    {
      name: "Empty Base Key",
      baseKey: "",
      incrementKey: "1",
      shouldError: true
    },
    {
      name: "Empty Increment Key",
      baseKey: "1",
      incrementKey: "",
      shouldError: true
    },
    {
      name: "Invalid Base Key (Negative)",
      baseKey: "-1",
      incrementKey: "1",
      shouldError: true
    },
    {
      name: "Invalid Base Key (Too Large)",
      baseKey: "26",
      incrementKey: "1",
      shouldError: true
    },
    {
      name: "Invalid Increment Key (Decimal)",
      baseKey: "1",
      incrementKey: "1.5",
      shouldError: true
    }
  ];

  // Run all tests
  let allTestsPassed = true;

  // Test cipher functionality
  for (const test of testCases) {
    const result = testCipherCase(test.input, test.baseKey, test.incrementKey, test.encode);
    if (result !== test.expected) {
      console.error(`❌ Test Failed: ${test.name}
        Input: "${test.input}"
        Base Key: ${test.baseKey}
        Increment Key: ${test.incrementKey}
        Encode: ${test.encode}
        Expected: "${test.expected}"
        Got: "${result}"`);
      allTestsPassed = false;
    } else {
      console.log(`✅ Test Passed: ${test.name}`);
    }
  }

  // Test error handling
  for (const test of errorTests) {
    const errorElement = document.getElementById("keyError");
    errorElement.style.display = "none";
    document.getElementById("baseKey").value = test.baseKey;
    document.getElementById("incrementKey").value = test.incrementKey;
    enDeCode();
    const errorShown = errorElement.style.display === "block";
    
    if (errorShown !== test.shouldError) {
      console.error(`❌ Error Test Failed: ${test.name}`);
      allTestsPassed = false;
    } else {
      console.log(`✅ Error Test Passed: ${test.name}`);
    }
  }

  if (allTestsPassed) {
    console.log("🎉 All tests passed successfully!");
  } else {
    console.log("⚠️ Some tests failed. Please check the error messages above.");
  }
}

/**
 * Helper function to test a single cipher case
 * @param {string} input - The input text to process
 * @param {number} baseKey - The base shift key
 * @param {number} incrementKey - The increment for each position
 * @param {boolean} encode - Whether to encode (true) or decode (false)
 * @returns {string} The processed text
 */
function testCipherCase(input, baseKey, incrementKey, encode) {
  let outputMessage = [];
  for (let i = 0; i < input.length; i++) {
    const currentKey = (Number(baseKey) + (i * Number(incrementKey))) % 26;
    outputMessage.push(codeLetter(input[i], currentKey, encode));
  }
  return outputMessage.join("");
}
