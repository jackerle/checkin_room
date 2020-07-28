

export function change_date_format (date){
    let _d = date
    let [y,m,d] = _d.split('T')[0].split('-')
    let [h,mi,s] = _d.split('T')[1].split(':')
    return(h+":"+mi+"น. "+" "+d+" "+change_month_format(m)+" "+(parseInt(y)+543))
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


function change_month_format (month){
    switch(parseInt(month)){
        case 1 :
            return 'ม.ค.'
            break
        case 2 :
            return 'ก.พ.'
            break
        case 3 :
            return 'มี.ค.'
            break
        case 4 :
            return 'เม.ย.'
            break
        case 5 :
            return 'พ.ค.'
            break
        case 6 :
            return 'มิ.ย.'
            break
        case 7 :
            return 'ก.ค.'
            break
        case 8 :
            return 'ส.ต.'
            break
        case 9 :
            return 'ก.ย.'
            break
        case 10 :
            return 'ต.ค.'
            break
        case 11 :
            return 'พ.ย.'
            break
        case 12 :
            return 'ธ.ค.'
            break
    }
}