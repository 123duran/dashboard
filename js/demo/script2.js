// Function to fetch current Bitcoin price
function getBitcoinPrice(callback) {
    // API endpoint for Bitcoin price in USD (you can change to other currencies)
    var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';

    // Making an AJAX request to the API
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // On success, extract Bitcoin price from the response
            var bitcoinPrice = data.bitcoin.usd;
            
            // Invoke the callback function with the Bitcoin price as argument
            callback(bitcoinPrice);
        },
        error: function() {
            // Error handling
            callback(null); // Pass null if there's an error
        }
    });
}
// Function to fetch current Bitcoin price
function getBitcoinPriceReais(callback) {
    // API endpoint for Bitcoin price in USD (you can change to other currencies)
    var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=BRL';

    // Making an AJAX request to the API
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // On success, extract Bitcoin price from the response
            console.log(data.bitcoin);
            console.log("passou aqui");
            var bitcoinPrice = data.bitcoin.brl;
            
            // Invoke the callback function with the Bitcoin price as argument
            callback(bitcoinPrice);
        },
        error: function() {
            // Error handling
            callback(null); // Pass null if there's an error
        }
    });
}

// Function to display current Bitcoin price
function displayBitcoinPrice() {
    getBitcoinPrice(function(price) {
        if (price !== null) {
            // Format price to 2 decimal places
            var formattedPrice =  price.toFixed(2);

            // Update the text of the element with id="bitcoin-price"
            $('#bitcoin-price').text(formattedPrice);
        } else {
            // Handle error fetching data
            $('#bitcoin-price').text('Error fetching data');
        }
    });
}

// Function to calculate Bitcoin value in dollars based on input amount
function calculateBitcoinValue() {
    // Get input value from textbox
    var bitcoinAmount = parseFloat($('#bitcoin-input').val());

    // Validate input
    if (isNaN(bitcoinAmount) || bitcoinAmount <= 0) {
        $('#bitcoin-value').text('Invalid input');
        return;
    }

    getBitcoinPriceReais(function(price) {
        if (price !== null) {
            // Calculate value in dollars
            var bitcoinValueInDollars = bitcoinAmount * price;

            // Format to 2 decimal places
            var formattedValue = '$' + bitcoinValueInDollars.toFixed(2);

            // Update the text of the element with id="bitcoin-value"
            $('#bitcoin-value').text(formattedValue);
        } else {
            // Handle error fetching data
            $('#bitcoin-value').text('Error fetching data');
        }
    });


}

// Document ready function to initialize
$(document).ready(function() {
    // Display current Bitcoin price initially when the page loads
    displayBitcoinPrice();

    // Optionally, you can set up an interval to update the price periodically (e.g., every minute)
    // setInterval(displayBitcoinPrice, 60000); // 60000 milliseconds = 1 minute
});
