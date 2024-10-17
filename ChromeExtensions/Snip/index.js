document.getElementById('captureBtn').addEventListener('click', () => {
    const snipArea = document.getElementById('snipArea');
    snipArea.classList.remove('hidden');

    let startX, startY, endX, endY;

    document.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        startY = e.clientY;
        snipArea.style.left = `${startX}px`;
        snipArea.style.top = `${startY}px`;
        snipArea.style.widht = '0px';
        snipArea.style.height = '0px';
    });

    document.addEventListener('mousemove', (e) => {
        if (startX !== undefined && startY !== undefined){
            endX = e.clientX;
            endY = e.clientY;

            snipArea.style.width = `${Math.abs(endX - startX)}px`;
            snipArea.style.height = `${Math.abs(endY - startY)}px`;

            if (endX < startX) snipArea.style.left = `${endX}px`;
            if (endY < startY) snipArea.style.top = `${endY}px`;
        }
    })

    document.addEventListener('mouseup', async () => {
        if (startX !== undefined && startY !== undefined){
            //Stop capturing the area
            document.removeEventListener('mousemove', null)
            document.removeEventListener('mouseup', null)

             // Capture the selected area using html2canvas
             const canvas = await html2canvas(document.body, {
                x: Math.min(startX, endX),
                y: Math.min(startY, endY),
                width: Math.abs(endX - startX),
                height: Math.abs(endY - startY),
            });

            const downloadLink = document.getElementById('downloadLink');
            const imgData = canvas.toDataURL('image/png');
            downloadLink.href = imgData;
            downloadLink.classList.remove('hidden');
            downloadLink.click(); // Automatically download the image

            // Reset
            snipArea.classList.add('hidden');
            startX = startY = endX = endY = undefined;
        }
    })
})