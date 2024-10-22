document.getElementById('captureBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];

        // Check if the tab URL is a restricted page
        if (currentTab.url.startsWith('chrome://') || currentTab.url.startsWith('chrome-extension://')) {
            alert('This extension cannot work on chrome:// or chrome-extension:// pages.');
            return; // Do not execute the script
        }

        // Inject the content script to the active tab
        chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            files: ['content.js']
        });
    });
});
