let items = [
  {
    name: "Programming Book",
    category: "book",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  },

  {
    name: "Anatomy Book",
    category: "book",
    faculty: "medicine",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
  },

  {
    name: "Scientific Calculator",
    category: "device",
    faculty: "science",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620",
  },

  {
    name: "Engineering Drawing Tools",
    category: "tool",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
  },

  {
    name: "Mathematics Book",
    category: "book",
    faculty: "science",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904",
  },

  {
    name: "Physics Book",
    category: "book",
    faculty: "science",
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa",
  },

  {
    name: "Chemistry Book",
    category: "book",
    faculty: "science",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
  },

  {
    name: "Advanced Programming Book",
    category: "book",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },

  {
    name: "Database Book",
    category: "book",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
  },

  {
    name: "Networking Book",
    category: "book",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  },

  {
    name: "Study Laptop",
    category: "device",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  },

  {
    name: "Study Tablet",
    category: "device",
    faculty: "medicine",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
  },

  {
    name: "Headphones",
    category: "device",
    faculty: "commerce",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },

  {
    name: "Mechanical Keyboard",
    category: "device",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },

  {
    name: "Wireless Mouse",
    category: "device",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
  },

  {
    name: "Pharmacology Book",
    category: "book",
    faculty: "medicine",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831",
  },

  {
    name: "Biology Book",
    category: "book",
    faculty: "medicine",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8",
  },

  {
    name: "Surgery Book",
    category: "book",
    faculty: "medicine",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
  },

  {
    name: "Accounting Book",
    category: "book",
    faculty: "commerce",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },

  {
    name: "Economics Book",
    category: "book",
    faculty: "commerce",
    image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105",
  },

  {
    name: "Business Administration Book",
    category: "book",
    faculty: "commerce",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  },

  {
    name: "Engineering Ruler",
    category: "tool",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1581091215367-59ab6b3a7c8c",
  },

  {
    name: "Engineering Drawing Set",
    category: "tool",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  },

  {
    name: "Lecture Notebook",
    category: "tool",
    faculty: "arts",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db",
  },

  {
    name: "Colored Pencils",
    category: "tool",
    faculty: "arts",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },

  {
    name: "Psychology Book",
    category: "book",
    faculty: "arts",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
  },

  {
    name: "History Book",
    category: "book",
    faculty: "arts",
    image: "https://images.unsplash.com/photo-1461360228754-6e81c478b882",
  },

  {
    name: "Bluetooth Headphones",
    category: "device",
    faculty: "commerce",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1",
  },

  {
    name: "External Hard Drive",
    category: "device",
    faculty: "engineering",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b",
  },

  {
    name: "USB Flash Drive",
    category: "device",
    faculty: "science",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
  },
];

// Select Elements

let cards = document.getElementById("cards");
let search = document.getElementById("search");
let category = document.getElementById("category");
let faculty = document.getElementById("faculty");

// Display Cards

function showItems(data) {
  cards.innerHTML = "";

  data.forEach(function (item) {
    cards.innerHTML += `
            <div class="card">

                <img src="${item.image}" alt="${item.name}">

                <h3>${item.name}</h3>

                <p>Faculty: ${item.faculty}</p>

                <p>Type: ${item.category}</p>

                <button>View Details</button>

            </div>
        `;
  });
}

// Filtering

function filterItems() {
  let text = search.value.toLowerCase();

  let categoryValue = category.value;

  let facultyValue = faculty.value;

  let result = items.filter(function (item) {
    let searchMatch = item.name.toLowerCase().includes(text);

    let categoryMatch =
      categoryValue === "all" || item.category === categoryValue;

    let facultyMatch = facultyValue === "all" || item.faculty === facultyValue;

    return searchMatch && categoryMatch && facultyMatch;
  });

  showItems(result);
}

// Search

search.addEventListener("input", filterItems);

// Category Filter

category.addEventListener("change", filterItems);

// Faculty Filter

faculty.addEventListener("change", filterItems);

// Display Items

showItems(items);
