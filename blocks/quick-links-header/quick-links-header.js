export default function decorate(block) {
  [...block.children].forEach((element) => {
    element.classList.add('quick-links-header__inner');

    // Find all the div elements within the inner content class
    const innerElements = element.querySelectorAll('.quick-links-header__inner div');

    // Add the class to column and append a number to each of these div elements
    let counter = 1;
    innerElements.forEach((divElement) => {
      const newClass = `quick-links-header__col-${counter}`;
      divElement.classList.add('quick-links-header__col', newClass);
      counter += 1; // Use prefix notation to increment the counter
    });
  });
}
