document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-theme');
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.style.backgroundColor = '#343a40';
        toggleButton.innerText = 'Chế độ sáng';
    } else {
        document.body.classList.remove('dark-mode');
        document.body.style.backgroundColor = '#f8f9fa';
        toggleButton.innerText = 'Chế độ tối';
    }

    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            document.body.style.backgroundColor = '#343a40';
            this.innerText = 'Chế độ sáng';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.body.style.backgroundColor = '#f8f9fa';
            this.innerText = 'Chế độ tối';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
