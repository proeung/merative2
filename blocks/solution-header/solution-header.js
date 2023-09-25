export default function decorate(block) {
  const blockName = block.getAttribute('data-block-name');
  if (!blockName) {
    return;
  }

  [...block.children].forEach((element) => {
    element.classList.add(`${blockName}__inner`);

    // Find all the div elements within the inner content class
    const innerElements = element.querySelectorAll(`.${blockName}__inner div`);

    // Add the class to column and append a number to each of these div elements
    let counter = 1;
    innerElements.forEach((divElement) => {
      const newClass = `${blockName}__col-${counter}`;
      divElement.classList.add(`${blockName}__col`, newClass);
      counter += 1;
    });
  });

  // Add page scroll listener to know when header turns to sticky
  const header = block.parentNode;
  window.addEventListener('scroll', () => {
    const scrollAmount = window.scrollY;
    if (scrollAmount > header.offsetHeight) {
      header.classList.add('is-sticky');
    } else {
      header.classList.remove('is-sticky');
    }
  });

// Define the list of navigation links
const navigationLinks = document.querySelectorAll('.solution-header__col-2 ul li a');

// Extract section IDs from navigation links
const sectionIds = Array.from(navigationLinks).map((link) => {
  return link.getAttribute('href').substring(1);
});

// Define the Intersection Observer options
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5, // Trigger when 50% of the element is in the viewport
};

// Create Intersection Observer callback function
const handleIntersection = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const targetId = entry.target.getAttribute('id');
      const correspondingLink = document.querySelector(`.solution-header__col-2 ul li a[href="#${targetId}"]`);

      // Remove 'active' class from all links
      navigationLinks.forEach((link) => {
        link.classList.remove('active');
      });

      // Add 'active' class to the corresponding link
      correspondingLink.classList.add('active');
    }
  });
};

// Create Intersection Observer instance
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Add observer to each section
sectionIds.forEach((sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    observer.observe(section);
  }
});

// Smooth scroll to anchor when a navigation link is clicked
navigationLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth',
      });
    }
  });
});



}
