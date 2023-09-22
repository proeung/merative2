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

  // Get all the list items within the ul
const listItems = document.querySelectorAll('.solution-header__col-2 ul li');

// Get all the sections on the page with IDs that match the href values in the list items
const sections = Array.from(listItems).map((item) => {
  const targetId = item.querySelector('a').getAttribute('href').substring(1);
  return document.getElementById(targetId);
});

// Function to add the active class to the corresponding list item
function setActiveClass(index) {
  listItems.forEach((listItem, i) => {
    if (i === index) {
      listItem.classList.add('active');
      listItem.querySelector('a').classList.add('active');
    } else {
      listItem.classList.remove('active');
      listItem.querySelector('a').classList.remove('active');
    }
  });
}

// Function to handle scrolling and active class removal
function handleScroll() {
  const scrollPosition = window.scrollY;
  let activeSectionIndex = -1;

  // Find the index of the currently active section
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSectionIndex = i;
        break;
      }
    }
  }

  setActiveClass(activeSectionIndex);
}

// Add an event listener to run the function when scrolling
window.addEventListener('scroll', handleScroll);

// Function to handle anchor links in the URL
function handleAnchorLink() {
  const currentHash = window.location.hash;
  const targetIndex = Array.from(listItems).findIndex((item) => {
    return item.querySelector('a').getAttribute('href') === currentHash;
  });

  setActiveClass(targetIndex);
}

// Add an event listener to run the function when the hash changes
window.addEventListener('hashchange', handleAnchorLink);

// Call the functions initially to set the active class based on the current scroll position and URL hash
handleScroll();
handleAnchorLink();


}
