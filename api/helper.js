const Axios  = require('axios')
const { data } = require('jquery')

exports.send_discord = async function (message){
    let payload = {
        'content':String(message)
    }

    const response = await Axios({
        method:'post',
        url:'https://discordapp.com/api/webhooks/735171037913940039/5MQc1QeaEWn4rPM5yyYXv4MTENUy7AZTbQ5u5gtMOuPJv44_Tly2aS0DGIzJHU3FxAZe',
        data :{
            payload_json : JSON.stringify(payload)
        }
    })
    

}