
fetch('messages.json')
  .then(response => response.json())
  .then(data => {
    const button = document.getElementById('messageBtn');
    const messageDiv = document.getElementById('message');
    button.addEventListener('click', () => {
      const random = data[Math.floor(Math.random() * data.length)];
      messageDiv.textContent = random;
    });
  });
