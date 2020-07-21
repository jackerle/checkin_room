const Axios  = require('axios')
const { data } = require('jquery')

export function change_date_format (date){
    let _d = date
    let [y,m,d] = _d.split('T')[0].split('-')
    let [h,mi,s] = _d.split('T')[1].split(':')
    return(h+":"+mi+" "+" "+d+"/"+m+"/"+y)
}

export function change_day_format (day){
    if(day==0)return "วันอาทิตย์"
    else if(day==1)return "วันจันทร์"
    else if(day==2)return "วันอังคาร"
    else if(day==3)return "วันพุธ"
    else if (day==4)return "วันพฤหัสบดี"
    else if (day==5)return "วันศุกร์"
    else if(day==6)return "วันเสาร์"
    else return "ไม่ถูก Format"
}


export async function send_discord (message){
    let payload = {
        'content':message
    }

    const response = await Axios({
        method:'post',
        url:'https://discordapp.com/api/webhooks/735171037913940039/5MQc1QeaEWn4rPM5yyYXv4MTENUy7AZTbQ5u5gtMOuPJv44_Tly2aS0DGIzJHU3FxAZe',
        data :{
            payload_json : JSON.stringify(payload)
        }
    })
    console.log(response)
    

}