const socket=io('http://localhost:80');




const messagecontainer=document.getElementById('container');
const messageform=document.getElementById('send-container');
const messageinput=document.getElementById('input');
function messageappend(msg){
    const messageElement=document.createElement('div')
    document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
    // messageElement.innerText=msg;
    // messagecontainer.append(messageElement)
}

const name=prompt('Please enter your name')
messageappend('you joined');
socket.emit('new-user',name);

socket.on('chat-message',data=>{
    // console.log(data);
messageappend(`${data.name}:${data.message}`)
   

})
socket.on('user-connected',name=>{
    // console.log(data);
messageappend(`${name} user connected`)

})
socket.on('user-disconnected',name=>{
    // console.log(data);
messageappend(`${name} user disconnected`)

})


 
  
messageform.addEventListener('submit',e=>{
    e.preventDefault();
    const message=messageinput.value
    messageappend(`you:${message}`)
    socket.emit('send-chat-message',message);
    messageinput.value=''}
);


    
