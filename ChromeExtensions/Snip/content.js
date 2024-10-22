(function() {
    // Check if the script is already running
    if (document.getElementById('snipArea')) {
        return; // Avoid multiple snipping instances
    }

    // Create snipArea element
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
            const currentX = e.clientX;
            const currentY = e.clientY;

            const width = Math.abs(currentX - startX);
            const height = Math.abs(currentY - startY);

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

        console.log('Area selected:', { x, y, width, height });

        // Inject html2canvas if not already loaded
        if (typeof html2canvas === 'undefined') {
            const script = document.createElement('script');
            script.src = chrome.runtime.getURL('html2canvas.min.js');
            script.onload = () => {
                captureArea(x, y, width, height);
            };
            document.body.appendChild(script);
        } else {
            captureArea(x, y, width, height);
        }

        function captureArea(x, y, width, height) {
            console.log('Capturing area with html2canvas:', { x, y, width, height });
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
                console.log('Image captured:', imgData);

                downloadLink.click(); // Trigger download

                document.body.removeChild(snipArea); // Remove selection box after capture
            }).catch(error => {
                console.error('Error capturing with html2canvas:', error);
            });
        }
    });

    // Add keyboard abort handler (Escape key)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(snipArea);
            isSelecting = false;
        }
    });
})();
