document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('createListingForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;

    alert(`Item "${title}" added successfully!`);
    form.reset();
  });
});