function reorderUXProjectsForMobile() {
    const isMobile = window.innerWidth < 800;
    const rightSections = document.querySelectorAll('.project-containers-right');

    rightSections.forEach(section => {
        const textBlock = section.querySelector(':scope > div');
        const imageBlock = section.querySelector(':scope > img, :scope > a');

        if (!textBlock || !imageBlock) return;

        if (isMobile) {
            if (section.firstElementChild !== imageBlock) {
                section.insertBefore(imageBlock, textBlock);
            }
        } else {
            if (section.firstElementChild !== textBlock) {
                section.insertBefore(textBlock, imageBlock);
            }
        }
    });
}

window.addEventListener('load', reorderUXProjectsForMobile);
window.addEventListener('resize', reorderUXProjectsForMobile);