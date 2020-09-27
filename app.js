const loanForm = document.getElementById("loan-form");
loanForm.addEventListener('submit',results);

function results(e) {
  e.preventDefault();
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculate,2000);
}

function calculate() {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) /100/12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //Compute Monthly payment

  const x = Math.pow(1+calculatedInterest,calculatedPayment);
  const monthly = (principal * x *calculatedInterest) / (x-1);

if (isFinite(monthly)) {
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * calculatedPayment).toFixed(2);
  totalInterest.value = ((monthly*calculatedPayment)-principal).toFixed(2);

  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'block';
} else {
  showError('please check your numbers');
  document.getElementById('loading').style.display = 'none';
}

  
}

function showError(error) {
  const errorDiv = document.createElement ('div');
  errorDiv.className = 'alert alert-danger';
  const errorText = document.createTextNode(error);
  errorDiv.appendChild(errorText);

  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  card.insertBefore(errorDiv,heading);

  setTimeout(removeAlert,3000);

}

function removeAlert() {
  document.querySelector('.alert').remove();
}