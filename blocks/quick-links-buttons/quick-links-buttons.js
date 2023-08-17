export default function decorate(block) {
  [...block.children].forEach((element) => {
    element.classList.add('quick-links-buttons__item');
  });
}
