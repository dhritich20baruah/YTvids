let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let screenValue = '';

for (item of buttons) {
    item.addEventListener('click', async (e) => {
        buttonText = e.target.innerText;

        if (buttonText == 'DEL') {
            screen.value = screen.value.slice(0, -1);
            screenValue = screen.value;
        }
        else if (buttonText == 'C') {
            screenValue = "";
            screen.value = screenValue;
        }
        else if (buttonText == '=') {
            const expression = screen.value.replace(/X/g, "*");

            try {
                const response = await fetch("http://localhost:5000/calculator", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ expression }),
                });

                const data = await response.json();

                if (data.result !== undefined){
                    screen.value = data.result;
                    screenValue = data.result.toString();
                } else {
                    screen.value = "Error";
                    screenValue = "";
                }
            } catch (error) {
                screen.value = "Error";
                screenValue = "";
            }
        }
        else {
            screenValue += buttonText;
            screen.value = screenValue;
        }
    })
}

