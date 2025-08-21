const Notification = ({notification}) =>{
    if(notification == null) {return null}
    if(notification.message === "updated"){
        return <div className ="error">{`${notification.personName} has been updated`}</div>
    }
    else if(notification.message === "404"){
        return <div className="error">{`${notification.personName} has already been deleted from the server`}</div>
    }
    else if(notification.message === "added"){
        return <div className="error">{`${notification.personName} has been added to the server`}</div>
    }
    else if(notification.message === "deleted"){
        return <div className="error">{`${notification.personName} has been deleted from the server`}</div>
    }
    else if(notification.message === "Error"){
        return <div className="error">{`${notification.errorMessage}`}</div>
    }
    else return null
}

export default Notification