const centipede = document.querySelector(".centipede");
const segments = document.querySelectorAll(".segment");
const segmentPositions = [];
const segmentSpacing = 10;

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  segmentPositions.unshift({ x: mouseX, y: mouseY });

  if (segmentPositions.length > segments.length * segmentSpacing) {
    segmentPositions.pop();
  }

  segments.forEach((segment, index) => {
    const position = segmentPositions[index * segmentSpacing];
    if (position) {
      segment.style.left = `${position.x}px`;
      segment.style.top = `${position.y}px`;
    }
  });
});
