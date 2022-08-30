let input = document.getElementById('input');
tds = document.querySelectorAll('td');
let inputValue = '';

function evaluate(operator, figure){
    
}

for(item of tds){
    item.addEventListener('click', (e)=>{
        buttonText = e.target.innerText;
        if(buttonText=='X'){
            buttonText = '* ';
            inputValue += buttonText;
            input.value = inputValue;
        }
        else if (buttonText == 'C'){
            inputValue = "";
            input.value = inputValue;
        }
        else if(buttonText == '√'){
            inputValue += '√ ';
            input.value = inputValue
        }
        else if(buttonText == 'log'){
            inputValue += "log( "
            // inputValue = Math.log(inputValue);
            input.value = inputValue
        }
        else if(buttonText == 'sin'){
            inputValue += "sin( "
            input.value = inputValue
        }
        else if(buttonText == 'cos'){
            inputValue += "cos( "
            input.value = inputValue
        }
        else if(buttonText == 'tan'){
            inputValue += "tan( "
            input.value = inputValue
        }
        else if(buttonText == 'π'){
            buttonText = 'π';
            inputValue += 'π ';
            input.value = inputValue
        }
        else if (buttonText == '='){
            input.value = eval(inputValue);
        }
        else{
            inputValue += buttonText + " ";
            input.value = inputValue;
        }
    })
}

function backspc() {
    screen.value = screen.value.substr(0, screen.value.length - 1);
}