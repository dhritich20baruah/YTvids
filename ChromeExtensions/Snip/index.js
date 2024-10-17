document.getElementById('captureBtn').addEventListener('click', () => {
    const snipArea = document.getElementById('snipArea');
    snipArea.classList.remove('hidden');
    
    let isSelecting = false;
    let startX, startY;

    // Start the selection on mousedown
    document.addEventListener('mousedown', (e) => {
        if (!snipArea.classList.contains('hidden')) {
            isSelecting = true;
            startX = e.clientX;
            startY = e.clientY;

            snipArea.style.left = `${startX}px`;
            snipArea.style.top = `${startY}px`;
            snipArea.style.width = '0px';
            snipArea.style.height = '0px';
        }
    });

    // Update the snipArea dimensions while moving the mouse
    document.addEventListener('mousemove', (e) => {
        if (isSelecting) {
            let currentX = e.clientX;
            let currentY = e.clientY;

            // Calculate the width and height of the selection area
            let width = Math.abs(currentX - startX);
            let height = Math.abs(currentY - startY);

            // Update snipArea dimensions and position
            snipArea.style.width = `${width}px`;
            snipArea.style.height = `${height}px`;

            // Adjust position if selection is dragging upwards or leftwards
            snipArea.style.left = `${Math.min(startX, currentX)}px`;
            snipArea.style.top = `${Math.min(startY, currentY)}px`;
        }
    });

    // Finalize selection on mouseup and trigger screenshot capture
    document.addEventListener('mouseup', async (e) => {
        if (isSelecting) {
            isSelecting = false;

            // Get final selection coordinates and dimensions
            const x = parseInt(snipArea.style.left);
            const y = parseInt(snipArea.style.top);
            const width = parseInt(snipArea.style.width);
            const height = parseInt(snipArea.style.height);

            // Capture the selected area using html2canvas
            html2canvas(document.body, {
                x: x,
                y: y,
                width: width,
                height: height,
                scrollX: 0, // Disable scrolling during capture
                scrollY: 0
            }).then(canvas => {
                // Convert canvas to image data
                const imgData = canvas.toDataURL('image/png');

                // Create a download link and trigger it
                const downloadLink = document.getElementById('downloadLink');
                downloadLink.href = imgData;
                downloadLink.classList.remove('hidden');
                downloadLink.click(); // Automatically download the image

                // Reset selection area after capture
                snipArea.classList.add('hidden');
                snipArea.style.width = '0px';
                snipArea.style.height = '0px';
            });
        }
    });
});
