export async function exportPitchAsImage(
  element: HTMLElement,
  filename: string = "super-lig-ilk-11.png"
) {
  const html2canvas = (await import("html2canvas-pro")).default;
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: null,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
