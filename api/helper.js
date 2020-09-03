const Axios  = require('axios')
const env = require('./../env.json')



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

exports.watcher_auto_reject =  function(){
    setInterval(async ()=>{
        let d = new Date().getHours();
        //in 00.00 o'clock
        if(d == 17){
            //todo
            await Axios({
                method:'post',
                url:env.API+'/auto_reject_all'
            }).then(()=>{
                console.log('auto reject success')
            })
            
        }
    },3000000)
    
    
}