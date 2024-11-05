// Select all the elements with the ID 'calc' and find their child 'span' elements
var keys = document.querySelectorAll('#calc span');

// Define an array of operators
var operators = ['+', '-', 'x', '÷'];

// Initialize a flag to track if a decimal point has been added
var decimalAdded = false;

// Loop through all the buttons with the ID 'calc'
for (var i = 0; i < keys.length; i++) {
    // Attach a click event listener to each button
    keys[i].onclick = function (e) {
        // Select the element with the class 'display' to display the input and results
        var input = document.querySelector('.display');
        // Get the current content of the display
        var inputVal = input.innerHTML;
        // Get the text content of the clicked button
        var btnVal = this.innerHTML;

        // Handle different button clicks

        // Clear the display if 'C' button is clicked
        if (btnVal == 'C') {
            input.innerHTML = '';
            decimalAdded = false;
        } 
        // Evaluate the expression and display the result if '=' is clicked
        else if (btnVal == '=') {
            var equation = inputVal;
            var lastChar = equation[equation.length - 1];

            // Replace 'x' with '*' and '÷' with '/' for evaluation
            equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

            // Remove the last character if it's an operator or a decimal point
            if (operators.indexOf(lastChar) > -1 || lastChar == '.')
                equation = equation.replace(/.$/, '');

            // Evaluate the expression and display the result
            if (equation)
                input.innerHTML = eval(equation);

            decimalAdded = false;
        } 
        // Handle operator buttons
        else if (operators.indexOf(btnVal) > -1) {
            var lastChar = inputVal[inputVal.length - 1];

            // Append the operator if it's not empty and the last character is not an operator
            if (inputVal != '' && operators.indexOf(lastChar) == -1)
                input.innerHTML += btnVal;
            // If the input is empty and the operator is '-', append it (for negative numbers)
            else if (inputVal == '' && btnVal == '-')
                input.innerHTML += btnVal;
            
            // If the last character is an operator, replace it with the new operator
            if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                input.innerHTML = inputVal.replace(/.$/, btnVal);
            }

            decimalAdded = false;
        } 
        // Handle decimal point
        else if (btnVal == '.') {
            // Add the decimal point if it hasn't been added before in the current input
            if (!decimalAdded) {
                input.innerHTML += btnVal;
                decimalAdded = true;
            }
        } 
        // Handle numeric buttons and other characters
        else {
            input.innerHTML += btnVal;
        }

        // Prevent the default behavior of the clicked button (e.g., page jumps)
        e.preventDefault();
    }
}

// Select the theme switch input element
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Function to switch between light and dark themes based on the input state
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark'); // Apply dark theme
    } else {
        document.documentElement.setAttribute('data-theme', 'light'); // Apply light theme
    }
}

// Add an event listener to the theme switch input
toggleSwitch.addEventListener('change', switchTheme, false);
