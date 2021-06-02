const BASE_URL = 'http://localhost:3001/api/shoppingList'

function fetchListItems(uid) {
    return fetch(`${BASE_URL}?uid=${uid}`).then(res => res.json());
}

function updateList({item, quantity, unit, _id, uid}) {
    return fetch (`${BASE_URL}/${_id}?uid=${uid}`, {
        method: 'PUT',
        headers: {
            'Content-type' : 'Application/json'
        },
        body: JSON.stringify({ item, quantity, unit })
    }).then(res => res.json());
}

function createItem(data, uid) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...data, uid})
    }).then(res => res.json());
}

function deleteListItem(listItemId, uid) {
    return fetch (`${BASE_URL}/${listItemId}?uid=${uid}`, {
        method: 'DELETE'
    }).then(res => res.json());
}


export{
    fetchListItems,
    updateList,
    createItem,
    deleteListItem,
}