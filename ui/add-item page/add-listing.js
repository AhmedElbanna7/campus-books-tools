document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addListingForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const title = document.getElementById('title').value;
      const itemType = document.getElementById('itemType').value;
      const category = document.getElementById('category').value;
      const condition = document.getElementById('condition').value;
      const priceVal = Number(document.getElementById('price').value);
      const phone = document.getElementById('phone').value;
      const description = document.getElementById('description').value;
      
      const imageInput = document.getElementById('images');
      const imagesArray = Array.from(imageInput.files).map(file => file.name);

      // Construct Payload exactly matching Schema
      const listingData = {
        title,
        description,
        itemType,
        category,
        condition,
        isFree: priceVal === 0,
        price: priceVal,
        images: imagesArray,
        status: 'available',
        phone
      };

      console.log('Schema Matched Listing Payload:', listingData);

      alert('Listing created successfully!');

      form.reset();
    });
  }
});