(function () {
    fetch(chrome.runtime.getURL("sidebar.html"))
        .then((r) => r.text())
        .then((html) => {
            const sidebar = document.createElement("div");
            sidebar.innerHTML = html;
            document.body.appendChild(sidebar);
            initNoteTaker();
        });

    function initNoteTaker() {
        const addNoteBtn = document.getElementById("addNoteBtn");
        const noteInput = document.getElementById("noteInput");
        const notesList = document.getElementById("notesList");
        const video = document.querySelector("video");

        let videoId = new URL(location.href).searchParams.get("v");

        //Load saved notes
        chrome.storage.sync.get([videoId], (data) => {
            const savedNotes = data[videoId] || [];
            savedNotes.forEach(renderNote);
        });

        //Add note button
        addNoteBtn.addEventListener("click", () => {
            const text = noteInput.ariaValueMax.trim();
            if (!text) return;
            const time = video.currentTime;
            const note = { time, text };

            //save note
            chrome.storage.sync.get([videoId], (data) => {
                const notes = data[videoId] || [];
                notes.push(note);
                chrome.storage.sync.set({ [videoId]: notes });
            });

            renderNote(note);
            noteInput.value = "";
        });

        //Render a single note
        function renderNote(note) {
            const div = document.createElement("div");
            div.className = "noteItem";
            div.innerHTML = `<span class="timestamp">[${formatTime(note.time)}]</span> ${note.text}`;
            div.addEventListener("click", () => {
                video.currentTime = note.time;
                video.play();
            });
            notesList.appendChild(div);
        }

        function formatTime(seconds) {
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}:${s.toString().padStart(2, "0")}`;
        }
    }
})