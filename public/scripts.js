document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Your message has been sent successfully!');
            } else {
                alert('There was an error sending your message. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message. Please try again.');
        });
    } else {
        alert('Please fill in all fields.');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('/map-url')
      .then(response => response.json())
      .then(data => {
        document.getElementById('map-frame').src = data.mapUrl;
      })
      .catch(error => console.error('Error fetching map URL:', error));
  });

