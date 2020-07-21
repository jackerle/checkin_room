

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


