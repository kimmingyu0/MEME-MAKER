const LINEWIDTH = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = LINEWIDTH.value;
let isPainting = false;
const onMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};
const startPainting = (event) => {
  isPainting = true;
};
const cancelPainting = (event) => {
  ctx.beginPath();
  isPainting = false;
};
const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
LINEWIDTH.addEventListener("change", onLineWidthChange);
