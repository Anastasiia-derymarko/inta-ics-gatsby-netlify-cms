function encode(data) {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}


const HandleSubmit = ({
                          event: e,
                          body,
                          setPopupOpen,
                          name}) => {
    e.preventDefault();

    if(body.phone && body.phone.includes("_")){
        return;
    }
    //https://crm.inta.group/clients/newlead
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
            'form-name': name,
            ...body
        }),
    })
        .then(() => setPopupOpen(true))
        .catch(error => alert(error))
};

export default HandleSubmit;