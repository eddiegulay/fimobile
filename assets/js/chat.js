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


function sendMessage(message) {
    var typing_status = document.getElementById('typing_status');

    // Display typing statue to "typing..."
    typing_status.innerHTML = 'typing...';

    const API_URL = 'https://api.openai.com/v1/chat/completions';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
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

