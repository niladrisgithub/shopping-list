const BASE_URL = 'http://localhost:3001/api/shoppingList'

function fetchListItems() {
    return fetch(`${BASE_URL}`).then(res => res.json());
}

function updateList({item, quantity, unit, _id}) {
    return fetch (`${BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'Application/json'
        },
        body: JSON.stringify({ item, quantity, unit })
    }).then(res => res.json());
}

function createItem(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type' : 'Application/json'
        },
        body: JSON.stringify({...data})
    }).then(res => res.json());
}



export{
    fetchListItems,
    updateList,
    createItem,
    
}