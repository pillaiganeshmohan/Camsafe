
function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
  
    // Basic form validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }
  
    // Display success message
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';
  
    // resetting the form after 15 seconds
    setTimeout(function() {
      document.getElementById('contactForm').reset();
      document.getElementById('contactForm').style.display = 'block';
      document.getElementById('successMessage').style.display = 'none';
    }, 15000);
  }