document.addEventListener("DOMContentLoaded", function () {
  // Get all required elements
  const categoryButtons = document.querySelectorAll(".category");
  const coffeeItems = document.querySelectorAll(".coffee-item");
  const coffeeMenu = document.querySelector(".coffee-menu");
  const prevButton = document.querySelector(".carousel-nav.prev");
  const nextButton = document.querySelector(".carousel-nav.next");
  const dots = document.querySelectorAll(".dot");
  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  // Variables to track current state
  let currentCategory = "coffee";
  let currentSlideIndex = 0;
  let itemsPerCategory = {}; // Store items count for each category
  let items = [];

  // Count items per category
  categoryButtons.forEach((btn) => {
    const category = btn.getAttribute("data-category");
    itemsPerCategory[category] = document.querySelectorAll(
      `.coffee-item[data-category="${category}"]`
    ).length;
  });

  // Function to update active category
  function updateCategory(category) {
    currentCategory = category;
    currentSlideIndex = 0; // Reset slide index when changing categories

    // Update active class on category buttons
    categoryButtons.forEach((btn) => {
      if (btn.getAttribute("data-category") === category) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // First, hide ALL items and remove all classes
    coffeeItems.forEach((item) => {
      item.classList.remove("category-active", "active", "middle");
      item.style.display = "none";
    });

    // Then, find and mark items of the current category
    items = Array.from(
      document.querySelectorAll(`.coffee-item[data-category="${category}"]`)
    );
    
    // Add category-active class to current category items
    items.forEach(item => {
      item.classList.add("category-active");
    });

    // Make sure we have items to display
    if (items.length === 0) {
      console.log("No items found for category:", category);
    } else {
      console.log(`Found ${items.length} items for category: ${category}`);
    }

    updateCarousel();
    updateDots();
  }

  // Function to move the carousel
  function updateCarousel() {
    if (items.length === 0) return;

    // Reset all items to normal size and opacity
    items.forEach((item) => {
      item.classList.remove("active", "middle");
      item.style.transform = "scale(1)";
      item.style.opacity = "0.7";
      item.style.zIndex = "1";
      item.style.display = "none"; // Hide all first
    });

    // Calculate indices for the 3 visible items with wrapping
    const prevIndex = (currentSlideIndex - 1 + items.length) % items.length;
    const nextIndex = (currentSlideIndex + 1) % items.length;

    // Make the three items visible and set middle one to be larger
    if (items[prevIndex]) {
      items[prevIndex].classList.add("active");
      items[prevIndex].style.display = "block";
      items[prevIndex].style.left = "0";
      items[prevIndex].style.transform = "translateX(0)";
    }

    if (items[currentSlideIndex]) {
      items[currentSlideIndex].classList.add("active", "middle");
      items[currentSlideIndex].style.display = "block";
      items[currentSlideIndex].style.opacity = "1";
      items[currentSlideIndex].style.zIndex = "2";
      items[currentSlideIndex].style.left = "50%";
      items[currentSlideIndex].style.transform = "translateX(-50%) scale(1.2)";
    }

    if (items[nextIndex]) {
      items[nextIndex].classList.add("active");
      items[nextIndex].style.display = "block";
      items[nextIndex].style.left = "100%";
      items[nextIndex].style.transform = "translateX(-100%)";
    }
  }

  // Function to update pagination dots
  function updateDots() {
    if (items.length === 0) return;

    // Always show exactly 5 dots regardless of item count
    for (let i = 0; i < dots.length; i++) {
      if (i < 5) {
        dots[i].style.display = "inline-block";
        // Calculate which dot should be active based on modulo position
        const dotPosition = Math.floor(currentSlideIndex % 5);
        dots[i].classList.toggle("active", i === dotPosition);
      } else {
        dots[i].style.display = "none";
      }
    }
  }

  // Add event listeners for category buttons
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      updateCategory(category);
    });
  });

  // Add event listeners for carousel navigation
  prevButton.addEventListener("click", () => {
    if (items.length === 0) return;
    currentSlideIndex = (currentSlideIndex - 1 + items.length) % items.length;
    updateCarousel();
    updateDots();
  });

  nextButton.addEventListener("click", () => {
    if (items.length === 0) return;
    currentSlideIndex = (currentSlideIndex + 1) % items.length;
    updateCarousel();
    updateDots();
  });

  // Add event listeners for pagination dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (items.length > 0) {
        // Calculate the appropriate slide based on dot index and current position
        const currentPage = Math.floor(currentSlideIndex / 5);
        currentSlideIndex = (currentPage * 5 + index) % items.length;
        updateCarousel();
        updateDots();
      }
    });
  });

  // Add event listeners for favorite buttons
  favoriteButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent any default behavior
      this.classList.toggle("active");

      // Get the SVG element
      const svg = this.querySelector("svg");

      if (this.classList.contains("active")) {
        // If favorited, fill the heart with white
        svg.setAttribute("fill", "white");
      } else {
        // If unfavorited, remove the fill
        svg.setAttribute("fill", "none");
      }
    });
  });

  // Initialize with default category
  updateCategory(currentCategory);
});