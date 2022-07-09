export const checkAccess = async () => {
    const role = localStorage.getItem("userRole");
    const isLogin = localStorage.getItem("isLoggedIn");
    if(isLogin && role === "ADMIN"){
        return true;
    }
    return false;
};


export const checkLogin = async () => {
    const isLogin = localStorage.getItem("isLoggedIn");
    if(isLogin){
        return true;
    }
    return false;
};


export const findIndex = (list, id) => {
    console.log(list);
    console.log(id);
    let result = -1;
    list.forEach ((item, index) => {
        if(item.id === id){
            result = index;
        }
    });
    return result;
}

export const findIndexNotification = (list, id) => {
    console.log(list);
    console.log(id);
    let result = -1;
    list.forEach ((item, index) => {
        if(item.idNotification === id){
            result = index;
        }
    });
    return result;
}
