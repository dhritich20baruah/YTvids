(function() {
    const snipArea = document.createElement('div');
    snipArea.id = 'snipArea';
    snipArea.style.position = 'absolute';
    snipArea.style.border = '2px dashed #000';
    snipArea.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    snipArea.style.cursor = 'crosshair';
    document.body.appendChild(snipArea);

    let isSelecting = false;
    let startX, startY;

    document.addEventListener('mousedown', (e) => {
        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;

        snipArea.style.left = `${startX}px`;
        snipArea.style.top = `${startY}px`;
        snipArea.style.width = '0px';
        snipArea.style.height = '0px';
    });

    document.addEventListener('mousemove', (e) => {
        if (isSelecting) {
            let currentX = e.clientX;
            let currentY = e.clientY;

            let width = Math.abs(currentX - startX);
            let height = Math.abs(currentY - startY);

            snipArea.style.width = `${width}px`;
            snipArea.style.height = `${height}px`;
            snipArea.style.left = `${Math.min(startX, currentX)}px`;
            snipArea.style.top = `${Math.min(startY, currentY)}px`;
        }
    });

    document.addEventListener('mouseup', async (e) => {
        isSelecting = false;

        const x = parseInt(snipArea.style.left);
        const y = parseInt(snipArea.style.top);
        const width = parseInt(snipArea.style.width);
        const height = parseInt(snipArea.style.height);

        html2canvas(document.body, {
            x: x,
            y: y,
            width: width,
            height: height
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgData;
            downloadLink.download = 'snip.png';
            downloadLink.click();

            document.body.removeChild(snipArea);
        });
    });
})();
