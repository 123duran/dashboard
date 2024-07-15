// Function to fetch and return Bitcoin price formatted as string
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
            
            // Format price to 2 decimal places
            // var formattedPrice = 'U$' + bitcoinPrice.toFixed(2);
            var formattedPrice = 'U$' + bitcoinPrice.toFixed(2);

            // Invoke the callback function with the formatted price as argument
            callback(formattedPrice);
        },
        error: function() {
            // Error handling
            callback('Error fetching data');
        }
    });
}

// Function to fetch current Bitcoin price in reais
function getBitcoinPriceReais(callback) {
    // API endpoint for Bitcoin price in brl (you can change to other currencies)
    var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=BRL';

    // Making an AJAX request to the API
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // On success, extract Bitcoin price from the response
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
            var formattedPrice = price;

            // Update the text of the element with id="bitcoin-price"
            $('#bitcoin-price').text(formattedPrice);
        } else {
            // Handle error fetching data
            $('#bitcoin-price').text('Error fetching data');
        }
    });
}

// Function to calculate Bitcoin value in REIAS based on input amount
function calculateBitcoinValue() {
    // Get input value from textbox
    var bitcoinAmount = parseFloat($('#bitcoin-input').val());
    console.log(bitcoinAmount);

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

// Function to update Bitcoin price on the webpage
function updateBitcoinPrice() {
    getBitcoinPrice(function(price) {
        // Update the text of the element with id="bitcoin-price"
        $('#bitcoin-price').text(price);
    });
}


// Function to fetch and return Ethereum price formatted as string
function getEthereumPrice(callback) {
    // API endpoint for Ethereum price in USD (you can change to other currencies)
    var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

    // Making an AJAX request to the API
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // On success, extract Ethereum price from the response
            var ethereumPrice = data.ethereum.usd;
            
            // Format price to 2 decimal places
            var formattedPrice = 'U$' + ethereumPrice.toFixed(2);

            // Invoke the callback function with the formatted price as argument
            callback(formattedPrice);
        },
        error: function() {
            // Error handling
            callback('Error fetching data');
        }
    });
}


// Function to update Ethereum price on the webpage
function updateEthereumPrice() {
    getEthereumPrice(function(price) {
        // Update the text of the element with id="ethereum-price"
        $('#ethereum-price').text(price);
    });
}

// Function to calculate Bitcoin value in reais based on input amount
function calculateBitcoinValue() {
    // Get input value from textbox
    var bitcoinAmount = parseFloat($('#bitcoin-input').val());
 
    // Validate input
    if (isNaN(bitcoinAmount) || bitcoinAmount <= 0) {
        $('#bitcoin-value').text('Invalid input');
        return;
    }

    // Fetch current Bitcoin price
    getBitcoinPriceReais(function(price) {
        if (price !== null) {
            // Calculate value in dollars
            var bitcoinValueInDollars = bitcoinAmount * price;

            // Format to 2 decimal places
            var formattedValue = 'R$' + bitcoinValueInDollars.toFixed(2);

            // Update the text of the element with id="bitcoin-value"
            $('#bitcoin-value').text(formattedValue);
        } else {
            // Handle error fetching data
            $('#bitcoin-value').text('Error fetching data');
        }
    });
}

// Function to calculate Etheremum value in dollars based on input amount
function calculateEthereumValue() {
    // Get input value from textbox
    var ethereumAmount = parseFloat($('#ethereum-input').val());

    // Validate input
    if (isNaN(ethereumAmount) || ethereumAmount <= 0) {
        $('#ethereum-value').text('Invalid input');
        return;
    }

    getEthereumPriceReais(function(price) {
        if (price !== null) {
            // Calculate value in dollars
            var ethereumValueInDollars = ethereumAmount * price;

            // Format to 2 decimal places
            var formattedValue = '$' + ethereumValueInDollars.toFixed(2);

            // Update the text of the element with id="bitcoin-value"
            $('#ethereum-value').text(formattedValue);
        } else {
            // Handle error fetching data
            $('#ethereum-value').text('Error fetching data');
        }
    });
}


// Function to fetch current Etherem price
function getEthereumPriceReais(callback) {
    // API endpoint for Bitcoin price in USD (you can change to other currencies)
    var apiUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=BRL';

    // Making an AJAX request to the API
    $.ajax({
        url: apiUrl,
        type: 'GET',
        success: function(data) {
            // On success, extract ethereum price from the response
            var ethereumPrice = data.ethereum.brl;
            
            // Invoke the callback function with the Ethereum price as argument
            callback(ethereumPrice);
        },
        error: function() {
            // Error handling
            callback(null); // Pass null if there's an error
        }
    });
}


// Update Bitcoin price initially when the page loads
$(document).ready(function() {
    displayBitcoinPrice();
    updateEthereumPrice();
    //Just because I want to know how much my BTC  and ETH is worth ;)
    $('#bitcoin-input').val( 0.00387384 );
    $('#ethereum-input').val( 0.03835377 );
    calculateEthereumValue();
    calculateBitcoinValue();
});
