document.addEventListener('DOMContentLoaded', () => {
  // Block and Unblock Action
  const blockButtons = document.querySelectorAll('.btn-submit');

  blockButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const statusBadge = row.querySelector('.form-note');
      
      if (statusBadge.classList.contains('success')) {
        statusBadge.classList.remove('success');
        statusBadge.classList.add('error');
        statusBadge.textContent = 'Blocked';
        
        button.innerHTML = '<i class="fa-solid fa-check"></i> Unblock';
      } else {
        statusBadge.classList.remove('error');
        statusBadge.classList.add('success');
        statusBadge.textContent = 'Active';
        
        button.innerHTML = '<i class="fa-solid fa-ban"></i> Block';
      }
    });
  });

  // Delete Record Action
  const deleteButtons = document.querySelectorAll('.btn-danger');

  deleteButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const row = e.target.closest('tr');
      const userName = row.cells[0].textContent;

      if (confirm(`Are you sure you want to delete ${userName}?`)) {
        row.remove();
      }
    });
  });
});