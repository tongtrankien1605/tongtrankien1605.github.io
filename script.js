document.getElementById('toggle-theme').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundColor = '#343a40';
        this.innerText = 'Chế độ sáng';
    } else {
        document.body.style.backgroundColor = '#f8f9fa';
        this.innerText = 'Chế độ tối';
    }
});
