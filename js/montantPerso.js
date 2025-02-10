function formatPrice(price) {
  return price.toFixed(2);
}

function toggleCustomInput() {
  // Helper functions to remove/add commas
  function removeCommas(number) {
    return number.replace(/,/g, '');
  }
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var customText = document.getElementById('custom-text');
  var customDescription = document.getElementById('custom-description');
  var customCase = document.getElementById('custom-case');

  // If the input already exists, just focus it
  if (customText.querySelector('input')) {
    customText.querySelector('input').focus();
    return;
  }

  // Create the input element and immediately clear any message text
  var customInput = document.createElement('input');
  customInput.setAttribute('type', 'text');
  customInput.setAttribute('id', 'custom-input');
  customInput.setAttribute('class', 'montant w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500');

  // Clear the custom text and description, then add the input
  customText.innerHTML = '';
  customDescription.innerText = '30 - 2,500,000';
  customText.appendChild(customInput);
  customInput.focus();

  // Define conversion factor: 1 USD = 10.01 Mada
  var conversionFactor = 10.01;

  // Listen for input changes to validate and update the displayed amount
  customInput.addEventListener('input', function () {
    var inputValue = removeCommas(customInput.value);
    var isValid = /^\d+$/.test(inputValue);

    if (!isValid) {
      customInput.value = '';
      // Clear selectedAmount and disable the recharge button
      selectedAmount = null;
      document.getElementById('rechargeBtn').disabled = true;
      document.getElementById('rechargeBtn').classList.add('opacity-50', 'cursor-not-allowed');
    } else {
      var montant = parseInt(inputValue);
      customInput.value = formatNumberWithCommas(montant);

      if (customInput.value === '') {
        customDescription.innerText = '30 - 2,500,000';
        selectedAmount = null;
      } else if (montant < 30) {
        customDescription.innerHTML = '<span style="color: red;">&#10005; Minimum: 30</span>';
        selectedAmount = null;
      } else if (montant > 2500000) {
        customDescription.innerHTML = '<span style="color: red;">&#10005; Maximum: 2,500,000</span>';
        selectedAmount = null;
      } else {
        // Convert the amount from dollars to Mada
        var converted = formatPrice(montant * conversionFactor);
        customDescription.innerText = 'Mad ' + converted;
        selectedAmount = 'Mad ' + converted;
      }

      // Enable or disable the recharge button based on validity
      if (selectedAmount) {
        document.getElementById('rechargeBtn').disabled = false;
        document.getElementById('rechargeBtn').classList.remove('opacity-50', 'cursor-not-allowed');
      } else {
        document.getElementById('rechargeBtn').disabled = true;
        document.getElementById('rechargeBtn').classList.add('opacity-50', 'cursor-not-allowed');
      }

      updateTotalPrice(montant); // Update the total price based on the entered amount
    }
  });

  customInput.addEventListener('focus', function () {
    if (customInput.value === '') {
      customDescription.innerText = '30 - 2,500,000';
    }
  });

  customInput.addEventListener('keypress', function (event) {
    var key = event.keyCode || event.which;
    var isDigit = /\d/.test(String.fromCharCode(key));
    if (!isDigit) {
      event.preventDefault();
    }
  });
}
