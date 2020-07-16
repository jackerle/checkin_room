

export function change_date_format (date){
    let _d = date
    let [y,m,d] = _d.split('T')[0].split('-')
    let [h,mi,s] = _d.split('T')[1].split(':')
    return(h+":"+mi+" "+" "+d+"/"+m+"/"+y)
}

