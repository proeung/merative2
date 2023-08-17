export default function decorate(block) {
  [...block.children].forEach((element) => {
    element.classList.add('quick-links-socials__item');
  });
}
