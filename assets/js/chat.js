function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const chatContainer = document.getElementById('chat-container');

function ai_message(message) {
    timestamp = getCurrentTime();

    const messageContainer = document.createElement('div');
    messageContainer.className = 'row no-margin left-chat';

    const col12 = document.createElement('div');
    col12.className = 'col-12';
    messageContainer.appendChild(col12);

    const chatBlock = document.createElement('div');
    chatBlock.className = 'chat-block';
    col12.appendChild(chatBlock);

    const row = document.createElement('div');
    row.className = 'row';
    chatBlock.appendChild(row);

    const col = document.createElement('div');
    col.className = 'col';
    col.innerText = message;
    row.appendChild(col);

    const timeCol12 = document.createElement('div');
    timeCol12.className = 'col-12';
    messageContainer.appendChild(timeCol12);

    const timeParagraph = document.createElement('p');
    timeParagraph.className = 'text-muted small time';
    timeParagraph.innerHTML = `<i class="bi bi-check"></i> ${timestamp}`;
    timeCol12.appendChild(timeParagraph);

    chatContainer.appendChild(messageContainer);
}

function user_message(message) {
    timestamp = getCurrentTime();

    const messageContainer = document.createElement('div');
    messageContainer.className = 'row no-margin right-chat';

    const col12 = document.createElement('div');
    col12.className = 'col-12';
    messageContainer.appendChild(col12);

    const chatBlock = document.createElement('div');
    chatBlock.className = 'chat-block';
    col12.appendChild(chatBlock);

    const row = document.createElement('div');
    row.className = 'row';
    chatBlock.appendChild(row);

    const col = document.createElement('div');
    col.className = 'col';
    col.innerText = message;
    row.appendChild(col);

    const timeCol12 = document.createElement('div');
    timeCol12.className = 'col-12 text-end';
    messageContainer.appendChild(timeCol12);

    const timeParagraph = document.createElement('p');
    timeParagraph.className = 'text-muted small time';
    timeParagraph.innerHTML = `<i class="bi bi-check"></i> ${timestamp}`;
    timeCol12.appendChild(timeParagraph);

    chatContainer.appendChild(messageContainer);
}

var send_button = document.getElementById('send_buttoon');
var message_input = document.getElementById('message_input');


// send button click action pipeline

send_button.onclick = function() {
    var message = message_input.value;
    if (message.length > 0) {
        user_message(message);
        message_input.value = '';
        message_input.focus();
    }

    // send message to server
    sendMessage(message);
};

// portal 
const portal_pass = [19, 11, 73, 15, 59, 6, 26, 8, 41, 39, 6, 54, 47, 13, 49, 21, 5, 55, 30, 47, 6, 29, 54, 46, 56, 28, 12, 2, 11, 32, 36, 2, 12, 29, 41, 22, 41, 11, 2, 26, 37, 4, 15, 24, 7, 28, 24, 54, 10, 30, 51];
function reverseMapNumbersToCharacters(numberArray) {
    const reverseCharMap = {
        1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i', 10: 'j',
        11: 'k', 12: 'l', 13: 'm', 14: 'n', 15: 'o', 16: 'p', 17: 'q', 18: 'r', 19: 's', 20: 't',
        21: 'u', 22: 'v', 23: 'w', 24: 'x', 25: 'y', 26: 'z',
        27: 'A', 28: 'B', 29: 'C', 30: 'D', 31: 'E', 32: 'F', 33: 'G', 34: 'H', 35: 'I', 36: 'J',
        37: 'K', 38: 'L', 39: 'M', 40: 'N', 41: 'O', 42: 'P', 43: 'Q', 44: 'R', 45: 'S', 46: 'T',
        47: 'U', 48: 'V', 49: 'W', 50: 'X', 51: 'Y', 52: 'Z',
        53: '0', 54: '1', 55: '2', 56: '3', 57: '4', 58: '5', 59: '6', 60: '7', 61: '8', 62: '9',
        63: '!', 64: '@', 65: '#', 66: '$', 67: '%', 68: '^', 69: '&', 70: '*', 71: '(', 72: ')',
        73: '-', 74: '_', 75: '+', 76: '=', 77: '[', 78: ']', 79: '{', 80: '}', 81: ';', 82: ':',
        83: ',', 84: '.', 85: '/', 86: '?', 87: '<', 88: '>', 89: '|', 90: '\\', 91: '`', 92: '~'
        // Add more characters as needed
    };

    let result = '';
    for (let i = 0; i < numberArray.length; i++) {
        let number = numberArray[i];
        if (reverseCharMap.hasOwnProperty(number)) {
            result += reverseCharMap[number];
        }
    }
    return result;
}



function sendMessage(message) {
    var typing_status = document.getElementById('typing_status');

    // Display typing statue to "typing..."
    typing_status.innerHTML = 'typing...';

    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${reverseMapNumbersToCharacters(portal_pass)}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ]
        })
    };

    var aiMessage = 'Hi there! I am a chatbot. How can I help you today?';
    // Send POST request to OpenAI API, get a response, and set the response as paragraph text
    fetch(API_URL, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.json();
    })
    .then(data => {
        aiMessage = data.choices[0].message.content.trim();
    })
    .catch(error => {
        // Handle specific errors and display a user-friendly message
        if (error.message.includes('HTTP error!')) {
            aiMessage = 'Sorry, there was an issue connecting to the communication server. Please try again later.';
        } else {
            aiMessage = 'Sorry, I am unable to process your request at the moment.';
        }
    })
    .finally(() => {
        ai_message(aiMessage);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
        message_input.value = ''; // Clear the input field

        // Remove typing status
        typing_status.innerHTML = 'online';
    });

}

