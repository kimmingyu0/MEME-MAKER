const SAVEBTN = document.getElementById("save");
const TEXTINPUT = document.getElementById("text");
const FILEINPUT = document.getElementById("file");
const MODEBTN = document.getElementById("mode-btn");
const DESTROYBTN = document.getElementById("destroy-btn");
const ERASERBTN = document.getElementById("eraser-btn");
const COLOROPTION = Array.from(document.getElementsByClassName("color-option"));
const COLOR = document.querySelector("#color");
const LINEWIDTH = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = LINEWIDTH.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false;

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
const onColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
};

const onColorClick = (event) => {
  const colorValue = event.target.dataset.color;
  console.dir(colorValue);
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  COLOR.value = colorValue;
};

const onModeClick = (event) => {
  if (isFilling) {
    isFilling = false;
    MODEBTN.innerText = "채우기";
  } else {
    isFilling = true;
    MODEBTN.innerText = "그리기";
  }
};

const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
};

const onDestroyClick = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const onEraserClick = () => {
  ctx.strokeStyle = "white";
  isFilling = false;
  MODEBTN.innerText = "채우기";
};

const onFileChange = (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    FILEINPUT.value = null;
  };
};

// 현재 더블클릭 후 오류 발생 -> 문제 해결 중

// const onDoubleClick = (event) => {
//   const text = TEXTINPUT.value;
//   if (text.trim().length > 0) {
//     ctx.save(); // ctx 현재상태 저장
//     ctx.lineWidth = 1;
//     ctx.font = "48px serif";
//     ctx.fillText(text, event.offsetX, event.offsetY);
//     ctx.restore(); // ctx 저장한 상태로 되돌림
//   }
// };

const onSaveClick = () => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
};

// canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
LINEWIDTH.addEventListener("change", onLineWidthChange);
COLOR.addEventListener("change", onColorChange);

COLOROPTION.forEach((color) => color.addEventListener("click", onColorClick));
MODEBTN.addEventListener("click", onModeClick);
DESTROYBTN.addEventListener("click", onDestroyClick);
ERASERBTN.addEventListener("click", onEraserClick);
FILEINPUT.addEventListener("change", onFileChange);
SAVEBTN.addEventListener("click", onSaveClick);
